// PRIVATE: four existing linear spell profiles; no hero operation enters public ctx.
const stores=new WeakMap(),contacts=new WeakMap();
export const LINEAR_FEATURES=Object.freeze(['legacy-hit-v1','legacy-linear-v1']);
export const LINEAR_SLOTS=new Set(['11:1','12:0','14:0','18:0']);
const copy=x=>structuredClone(x);
const canonical=x=>JSON.stringify(sort(x));
function sort(x){return Array.isArray(x)?x.map(sort):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sort(x[k])])):x;}
const same=(a,b)=>canonical(a)===canonical(b),closed=(x,keys)=>x&&Object.keys(x).sort().join(',')===keys.split(',').sort().join(',');
const num=(x,lo=0,hi=1e7)=>Number.isFinite(x)&&x>=lo&&x<=hi,integer=(x,lo=0)=>Number.isSafeInteger(x)&&x>=lo;
function store(e){let s=stores.get(e);if(!s||s.fighters!==e.fighters){s={fighters:e.fighters,next:1,rows:new Map(),latest:[null,null],counts:[0,0]};stores.set(e,s);}return s;}
export function linearFacts(){return {legacySemantics:'heros-host-events-1',legacyCapabilities:LINEAR_FEATURES};}
export function linearReady(session,heroId,slot){
 const impl=session.sealed.implementation(heroId,slot),m=session.sealed.hero(heroId)?.abilities[slot]?.mvp;
 if(!LINEAR_SLOTS.has(heroId+':'+slot)||!impl||!session.has(heroId,slot,'activate')||!session.has(heroId,slot,'onContact')||!impl.requires.includes('projectile-request')||impl.requires.some(c=>!['projectile-request','damage'].includes(c)))return false;
 if(impl.behaviorId.startsWith('legacy-10-19/remaining/')&&(impl.executionParameters.hostSemantics!=='heros-host-events-1'||!LINEAR_FEATURES.every(f=>impl.executionParameters.hostCapabilities.includes(f))))return false;
 return !!m&&num(m.stun_s??0,0,60)&&num(m.hitstun_s??0,0,60)&&num(m.wall_bind_stun_s??0,0,60)&&(!m.distance_damage_per_100||num(m.damage_cap,0,1e7)&&num(m.stun_cap_s,0,60))&&m.effect==='projectile'&&!m.charges&&!m.toggle&&!m.charge_damage_per_s&&!m.damageOverTime&&!m.slow_pct&&!m.control&&!m.knockback_wu&&!m.pull_to_distance&&!m.selfReflection&&!m.vulnerability_physical;
}
// Re-run the actual sealed activate on detached birth facts. Requests are not a saved authority.
function sourcePlan(session,origin,birth){
 if(!Array.isArray(birth.actors)||birth.actors.length!==2||birth.actors.some((f,i)=>!closed(f,'id,heroId,hp,maxHp,mp,maxMp,x,y,dir,alive,invulnerable,debuffImmune,passivesEnabled,guarding,rooted,silenced')||f.id!==i||!integer(f.heroId)||!num(f.maxHp,Number.MIN_VALUE)||!num(f.hp,0,f.maxHp)||!num(f.maxMp,Number.MIN_VALUE,session.sealed.resources.maxMpByHero[f.heroId])||!num(f.mp,0,f.maxMp)||!num(f.x,45,1155)||!num(f.y,-10000,10000)||![-1,1].includes(f.dir)||['alive','invulnerable','debuffImmune','passivesEnabled','guarding','rooted','silenced'].some(k=>typeof f[k]!=='boolean')||f.alive!==(f.hp>0)))throw Error('Invalid detached birth facts');
 const impl=session.sealed.implementation(origin.heroId,origin.slot);if(!linearReady(session,origin.heroId,origin.slot))throw Error('Unsupported linear source');
 const requests=[],deny=()=>{throw Error('Linear source must be stateless and deterministic');};
 const ctx=Object.freeze({now:birth.at,actor:id=>{if(id!==0&&id!==1)throw Error('Invalid source actor');return Object.freeze(copy(birth.actors[id]));},random:deny,state:Object.freeze({read:deny,write:deny,remove:deny}),target:Object.freeze({distance:deny}),projectile:spec=>{requests.push(copy(spec));return 'linear-plan';},damage:deny});
 const result=impl.activate(ctx,Object.freeze(copy(birth.facts)));
 if(requests.length!==1||!same(result,{projectileHandle:'linear-plan'}))throw Error('Expected one closed linear request');
 const p=requests[0],d=p.data,m=session.sealed.hero(origin.heroId).abilities[origin.slot].mvp;
 if(!closed(p,'owner,abilityId,castId,direction,speed,range,height,contactHandler,data')||!closed(d,'profile,originX,originY,radius,capturedAmount,reflectionPolicy,reflectable,sourceDeathPolicy,originalOwner')||p.owner!==origin.actor||p.abilityId!==origin.abilityId||p.castId!==birth.facts.castId||![-1,1].includes(p.direction)||!num(p.speed,Number.MIN_VALUE,1e5)||!num(p.range,Number.MIN_VALUE,1e5)||!['ground','both','air'].includes(p.height)||p.contactHandler!=='legacy-projectile-contact'||d.profile!=='legacy-linear-v1'||!num(d.originX,-10000,10000)||!num(d.originY,-10000,10000)||!num(d.radius,0,10000)||!num(d.capturedAmount)||typeof d.reflectable!=='boolean'||d.reflectionPolicy!=='consume-counter; flip-owner-dir; reset-travel; target-offset35'||d.sourceDeathPolicy!=='retain'||d.originalOwner!==origin.actor||p.height!==m.height||d.reflectable!==m.reflectable)throw Error('Unsupported linear recipe');
 return p;
}
export function preflightLinear(session,origin,birth){try{sourcePlan(session,origin,birth);return true;}catch{return false;}}
export function spawnLinear(e,session,origin,birth,spec,m){
 const s=store(e),plan=sourcePlan(session,origin,birth);if(!same(spec,plan)||Number(birth.facts.castId)<=(s.latest[origin.actor]?.castId??0)||[...s.rows.values()].some(r=>r.origin.actor===origin.actor&&r.birth.facts.castId===birth.facts.castId))throw Error('Invalid or repeated linear launch');
 const p={owner:spec.owner,x:spec.data.originX,y:spec.data.originY,dir:spec.direction,v:spec.speed,travel:0,range:spec.range,r:spec.data.radius,damage:spec.data.capturedAmount,m:copy(m),id:spec.abilityId,reflected:false};
 s.counts[origin.actor]++;const n=s.next++;s.latest[origin.actor]={n,castId:Number(birth.facts.castId),at:birth.at,frame:birth.frame};const handle='rule-linear:'+e.round+':'+n+':'+birth.facts.castId;
 s.rows.set(handle,{handle,n,origin:copy(origin),birth:copy(birth),record:p,motion:{originX:p.x,firstAt:null,firstDt:0,elapsed:0,steps:0,lastAt:birth.at,lastFrame:birth.frame},redirect:null});e.projectiles.push(p);return handle;
}
export function observeLinearAdvance(e,p,dt){const r=[...store(e).rows.values()].find(r=>r.record===p);if(!r)return;if(r.motion.lastFrame===e.frame&&r.motion.steps)throw Error('Repeated native projectile advance');const c=r.motion;if(c.firstAt===null){c.firstAt=e.t;c.firstDt=dt;}c.elapsed+=dt;c.steps++;c.lastAt=e.t;c.lastFrame=e.frame;}
export function withLinearContact(e,p,collision,callback){
 const r=[...store(e).rows.values()].find(r=>r.record===p);if(!r)return false;
 if(contacts.has(e)||!e.projectiles.includes(p)||collision.type!=='fighter'||collision.target!==e.fighters[1-p.owner]||r.motion.lastFrame!==e.frame||r.motion.lastAt!==e.t)throw Error('Invalid native linear contact');
 const lease={row:r,p,collision,at:e.t,frame:e.frame,damage:false,consumed:false};contacts.set(e,lease);try{callback();return true;}finally{contacts.delete(e);}
}
export function linearDamage(e,origin,spec){const l=contacts.get(e);if(!l||!l.inCallback||l.damage||l.at!==e.t||l.frame!==e.frame||!same(l.row.origin,origin)||spec.source!==l.p.owner||spec.target!==l.collision.target.i||spec.passive||spec.dot||spec.basic||spec.reflected||spec.noReflect||spec.noLifesteal||spec.attackId!==undefined||!same(spec.legacyInfo,{omitReflectedFlag:true})||!same(spec.legacyEffects,{profile:'legacy-hit-v1'}))throw Error('Unleased or repeated linear damage');l.damage=true;return copy(l.p.m);}
export function dispatchLinearContact(e,session,host,p,collision){
 const l=contacts.get(e),r=[...store(e).rows.values()].find(r=>r.record===p);if(!r)return false;
 if(!l||l.row!==r||l.p!==p||l.collision!==collision||l.consumed)return true;
 l.consumed=true;l.inCallback=true;
 const t=collision.target,counter=e.buff(t,'counter'),counterReflects=!!(p.m.reflectable&&!p.reflected&&counter&&!counter.m.counter_type),counterHandle=counterReflects?'linear-counter:'+e.frame+':'+r.handle:null,m=p.m;
 const event={...linearFacts(),owner:r.origin.actor,target:t.i,abilityId:r.origin.abilityId,slot:r.origin.slot,kind:'legacy-projectile-contact',handle:r.handle,effectiveOwner:p.owner,capturedAmount:p.damage,travelDistance:p.travel,direction:p.dir,reflected:p.reflected,counterReflects,counterHandle,wallBound:!!(m.wall_bind_distance_wu&&((p.dir===1?1155-t.x:t.x-45)<m.wall_bind_distance_wu||e.zones.some(z=>z.type==='wall'&&Math.abs(z.x-t.x)<m.wall_bind_distance_wu)))};
 e.updateGuard(t);
 const out=session.invoke(r.origin.heroId,r.origin.slot,'onContact',host(r.origin),event).value;
 if(out?.projectileRedirect){const expected={projectileRedirect:{handle:r.handle,effectiveOwner:t.i,target:p.owner,direction:-p.dir,resetTravel:true,offsetFromTarget:-p.dir*35,consumeCounterHandle:counterHandle,reflected:true},presentation:{kind:'legacy-projectile-reflect',actor:t.i}};
  if(!counterReflects||l.damage||!same(out,expected)||!t.buffs.includes(counter))throw Error('Invalid linear redirect');
  p.owner=t.i;p.dir=-p.dir;p.reflected=true;p.travel=0;p.x=t.x+p.dir*35;t.buffs=t.buffs.filter(x=>x!==counter);e.fx('text',t.x,t.y+190,'#b5dcff',{text:'反制!'});
  r.redirect={at:e.t,frame:e.frame,targetX:t.x};r.motion={originX:p.x,firstAt:null,firstDt:0,elapsed:0,steps:0,lastAt:e.t,lastFrame:e.frame};
 }else{if(!l.damage||!closed(out,'projectileEnd,receipt')||!same(out.projectileEnd,{handle:r.handle}))throw Error('Invalid linear end');p.dead=true;}
 l.inCallback=false;return true;
}
export function snapshotLinear(e,session){const s=store(e);for(const[h,r]of s.rows)if(!e.projectiles.includes(r.record)||r.record.dead)s.rows.delete(h);if(s.next===1)return undefined;return {version:1,rulesHash:session.sealed.rulesHash,round:e.round,next:s.next,counts:copy(s.counts),latest:copy(s.latest),rows:[...s.rows.values()].map(({record,...r})=>({...copy(r),nativeIndex:e.projectiles.indexOf(record)}))};}
function castModel(m){return Object.fromEntries(Object.entries(m).filter(([k])=>!['mana','cooldown_s','startup_frames','recovery_frames'].includes(k)));}
export function validLinear(e,session,g){try{
 const w=g.packClock?.legacyLinear,native=g.projectiles.filter(p=>!p.basic&&g.indices.some((id,i)=>[0,1,2,3].some(slot=>LINEAR_SLOTS.has(id+':'+slot)&&session.sealed.implementation(id,slot)&&session.sealed.hero(id).abilities[slot].id===p.id)));
 if(w===undefined)return native.length===0;
 if(!closed(w,'version,rulesHash,round,next,counts,latest,rows')||w.version!==1||w.rulesHash!==session.sealed.rulesHash||w.round!==g.round||!integer(w.next,2)||!Array.isArray(w.rows)||w.rows.length>256||native.length!==w.rows.length)return false;
 if(!Array.isArray(w.counts)||w.counts.length!==2||!w.counts.every(n=>integer(n))||w.next!==1+w.counts[0]+w.counts[1]||!Array.isArray(w.latest)||w.latest.length!==2)return false;
 for(let i=0;i<2;i++){const l=w.latest[i];if(w.counts[i]>g.fighters[i].casts)return false;if(w.counts[i]===0){if(l!==null)return false;}else if(!closed(l,'n,castId,at,frame')||!integer(l.n,1)||l.n>=w.next||!integer(l.castId,1)||l.castId>g.packClock.seq||!num(l.at,0,g.t)||!integer(l.frame)||l.frame>g.frame)return false;}
 if(w.latest[0]&&w.latest[1]&&(w.latest[0].n===w.latest[1].n||w.latest[0].castId===w.latest[1].castId))return false;
 const seen=new Set(),ns=new Set();for(const r of w.rows){
  if(!closed(r,'handle,n,origin,birth,motion,redirect,nativeIndex')||!integer(r.n,1)||r.n>=w.next||ns.has(r.n)||!integer(r.nativeIndex)||seen.has(r.nativeIndex))return false;ns.add(r.n);seen.add(r.nativeIndex);
  const o=r.origin,b=r.birth,c=r.motion,p=g.projectiles[r.nativeIndex],a=session.sealed.hero(o.heroId)?.abilities[o.slot];
  if(!closed(o,'actor,heroId,slot,abilityId')||![0,1].includes(o.actor)||g.indices[o.actor]!==o.heroId||a?.id!==o.abilityId||!linearReady(session,o.heroId,o.slot)||!p||p.dead||p.basic)return false;
  if(!closed(b,'at,frame,round,actors,facts')||b.round!==g.round||!num(b.at,0,g.t)||!integer(b.frame)||b.frame>g.frame||!Array.isArray(b.actors)||b.actors.length!==2||b.actors.some((f,i)=>f.id!==i||f.heroId!==g.indices[i])||!closed(b.facts,'owner,target,abilityId,slot,castId,direction,aimX,heldSeconds,reflected,legacySemantics,legacyCapabilities')||b.facts.owner!==o.actor||b.facts.target!==1-o.actor||b.facts.abilityId!==o.abilityId||b.facts.slot!==o.slot||!/^\d+$/.test(b.facts.castId)||!integer(Number(b.facts.castId),1)||Number(b.facts.castId)>g.packClock.seq||b.facts.reflected!==false||!num(b.facts.heldSeconds,0,.8)||!num(b.facts.aimX,45,1155)||!same({legacySemantics:b.facts.legacySemantics,legacyCapabilities:b.facts.legacyCapabilities},linearFacts())||r.handle!=='rule-linear:'+g.round+':'+r.n+':'+b.facts.castId)return false;
  if(!w.latest[o.actor]||r.n>w.latest[o.actor].n||Number(b.facts.castId)>w.latest[o.actor].castId||r.n===w.latest[o.actor].n&&!same(w.latest[o.actor],{n:r.n,castId:Number(b.facts.castId),at:b.at,frame:b.frame}))return false;
  const plan=sourcePlan(session,o,b);
  if(!closed(p,'owner,x,y,dir,v,travel,range,r,damage,m,id,reflected')||p.id!==o.abilityId||p.y!==plan.data.originY||p.v!==plan.speed||p.range!==plan.range||p.r!==plan.data.radius||p.damage!==plan.data.capturedAmount||!same(castModel(p.m),castModel(e.ability(o.actor,o.slot).mvp))||!['mana','cooldown_s','startup_frames','recovery_frames'].every(k=>num(p.m[k],0,k==='mana'?1e7:k==='cooldown_s'?3600:216000))||!num(p.x,0,1200)||!num(p.travel,0,p.range)||!closed(c,'originX,firstAt,firstDt,elapsed,steps,lastAt,lastFrame')||!integer(c.steps)||!num(c.elapsed,0,1000)||!num(c.lastAt,b.at,g.t)||!integer(c.lastFrame)||c.lastFrame>g.frame)return false;
  if(r.redirect===null){if(p.reflected!==false||p.owner!==o.actor||p.dir!==plan.direction||c.originX!==plan.data.originX)return false;}
  else{const d=r.redirect;if(!plan.data.reflectable||!closed(d,'at,frame,targetX')||!num(d.at,b.at,g.t)||!integer(d.frame)||d.frame<b.frame||d.frame>g.frame||!num(d.targetX,45,1155)||p.reflected!==true||p.owner!==1-o.actor||p.dir!==-plan.direction||c.originX!==d.targetX+p.dir*35)return false;}
  if(c.steps===0){if(c.firstAt!==null||c.firstDt!==0||c.elapsed!==0||p.travel!==0||p.x!==c.originX||c.lastAt!==(r.redirect?.at??b.at)||c.lastFrame!==(r.redirect?.frame??b.frame))return false;}
  else{if(!num(c.firstAt,r.redirect?.at??b.at,g.t)||!num(c.firstDt,Number.MIN_VALUE,.05)||c.lastAt!==g.t||c.lastFrame>g.frame||Math.abs(c.elapsed-(c.lastAt-c.firstAt+c.firstDt))>1e-7||Math.abs(p.travel-p.v*c.elapsed)>1e-7||Math.abs(p.x-(c.originX+p.dir*p.travel))>1e-7||c.steps>g.frame-(r.redirect?.frame??b.frame)+1)return false;}
 }
 return true;
 }catch{return false;}}
export function restoreLinear(e,w){const s=store(e);s.next=w?.next??1;s.counts=copy(w?.counts??[0,0]);s.latest=copy(w?.latest??[null,null]);s.rows=new Map((w?.rows??[]).map(({nativeIndex,...r})=>[r.handle,{...copy(r),record:e.projectiles[nativeIndex]}]));contacts.delete(e);}
