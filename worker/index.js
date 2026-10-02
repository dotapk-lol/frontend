const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...(status===429?{'Retry-After':'60'}:{})}});
const tokenOK=t=>typeof t==='string'&&t.length>=32&&t.length<=160;
const descOK=(d,type)=>d&&d.type===type&&typeof d.sdp==='string'&&d.sdp.length<40000&&d.sdp.startsWith('v=0');
const hash=async s=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('');
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const code=()=>Array.from(crypto.getRandomValues(new Uint8Array(10)),x=>alphabet[x%32]).join('');
async function readBody(request){
 const reader=request.body?.getReader();if(!reader)return '';let size=0,parts=[];
 try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>45000){await reader.cancel();throw new RangeError('body too large');}parts.push(value);}}finally{reader.releaseLock();}
 const bytes=new Uint8Array(size);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length;}return new TextDecoder().decode(bytes);
}
export async function cleanup(DB,now=Date.now()){
 await DB.prepare('DELETE FROM p2p_rooms WHERE expires <= ?').bind(now).run();
 await DB.prepare('DELETE FROM p2p_limits WHERE expires <= ?').bind(now).run();
}
async function allow(DB,now,creating){
 // Deliberately shared, bounded budget for this owner-private prototype. No IP or raw tokens stored.
 const row=await DB.prepare('INSERT INTO p2p_limits (bucket,requests,creates,expires) VALUES (?,1,?,?) ON CONFLICT(bucket) DO UPDATE SET requests=requests+1, creates=creates+excluded.creates WHERE requests < 120 AND creates+excluded.creates <= 6 RETURNING requests').bind(Math.floor(now/60000),creating?1:0,(Math.floor(now/60000)+1)*60000).first();return !!row;
}
export async function signal(request,env){
 const url=new URL(request.url),path=url.pathname.replace('/api/p2p/',''),method=request.method;
 if(request.headers.get('Origin')&&request.headers.get('Origin')!==url.origin)return json({error:'不允许跨站信令请求'},403);
 if(!env.DB)return json({error:'信令服务尚未配置，请使用同屏或双窗口模式'},503);
 if(method==='GET'&&path==='health')return json({ok:true,transport:'webrtc',turn:false});
 const bearer=request.headers.get('Authorization')?.replace(/^Bearer /,'');
 if(!tokenOK(bearer))return json({error:'缺少房间会话凭据'},401);
 const digest=await hash(bearer),now=Date.now();
 await cleanup(env.DB,now);
 if(!await allow(env.DB,now,path==='rooms'&&method==='POST'))return json({error:'信令请求过于频繁，请一分钟后重试'},429);
 let body={};if(method==='POST'){if(Number(request.headers.get('content-length'))>45000)return json({error:'信令过大'},413);let raw;try{raw=await readBody(request);}catch(e){if(e instanceof RangeError)return json({error:'信令过大'},413);throw e;}try{body=JSON.parse(raw);}catch{return json({error:'无效请求'},400);}}
 if(path==='rooms'&&method==='POST'){
  if(!descOK(body.offer,'offer')||typeof body.version!=='string'||body.version.length>100||!body.policy||JSON.stringify(body.policy).length>500)return json({error:'连接描述无效'},400);
  // Only transient SDP, never frames. Expired rooms are inaccessible immediately and lazily removed.
  const room=code();const inserted=await env.DB.prepare('INSERT INTO p2p_rooms (code,host_hash,offer,version,policy,created,expires) SELECT ?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM p2p_rooms) < 100').bind(room,digest,JSON.stringify(body.offer),body.version,JSON.stringify(body.policy),now,now+600000).run();if(!inserted.meta.changes)return json({error:'房间服务繁忙，请稍后重试'},429);return json({code:room,expires:now+600000},201);
 }
 const match=path.match(/^rooms\/([A-Z2-9]{10})(\/answer)?$/);if(!match)return json({error:'房间号无效'},400);const room=await env.DB.prepare('SELECT * FROM p2p_rooms WHERE code = ? AND expires > ?').bind(match[1],now).first();if(!room)return json({error:'房间不存在或已过期，请重新建房'},404);
 if(method==='DELETE'&&!match[2]){if(room.host_hash!==digest)return json({error:'只有房主可关闭房间'},403);await env.DB.prepare('DELETE FROM p2p_rooms WHERE code = ? AND host_hash = ?').bind(room.code,digest).run();return json({ok:true});}
 if(method==='GET'&&!match[2]){if(room.guest_hash&&room.guest_hash!==digest)return json({error:'房间已有两位玩家'},409);return json({offer:JSON.parse(room.offer),version:room.version,policy:JSON.parse(room.policy)});}
 if(method==='GET'&&match[2]){if(room.host_hash!==digest)return json({error:'不是房主会话'},403);return json({answer:room.answer?JSON.parse(room.answer):null});}
 if(method==='POST'&&match[2]){if(body.version!==room.version)return json({error:'双方版本不一致'},409);if(!descOK(body.answer,'answer'))return json({error:'无效应答'},400);if(room.host_hash===digest)return json({error:'请使用另一设备或窗口加入'},409);
  if(room.guest_hash){if(room.guest_hash===digest&&room.answer===JSON.stringify(body.answer))return json({ok:true});return json({error:'应答已锁定，请重新建房'},409);}
  const result=await env.DB.prepare('UPDATE p2p_rooms SET guest_hash = ?, answer = ? WHERE code = ? AND expires > ? AND guest_hash IS NULL').bind(digest,JSON.stringify(body.answer),room.code,now).run();if(!result.meta.changes)return json({error:'房间已有两位玩家'},409);return json({ok:true});
 }
 return json({error:'不支持此操作'},405);
}
export default {async fetch(request,env){try{if(new URL(request.url).pathname.startsWith('/api/p2p/'))return await signal(request,env);return env.ASSETS?env.ASSETS.fetch(request):new Response('Not found',{status:404});}catch{ return json({error:'信令服务暂不可用，请重试'},503);}}};
