// Real HTTP contract smoke test against the dedicated disposable Go/MySQL QA service.
// It creates isolated test sessions/rooms/matches; it never reads credentials or touches other schemas.
import assert from 'node:assert/strict';
import {MatchAPI,resultPayload,matchRequestId} from '../src/match-api.js';
import {NET_VERSION} from '../src/net-version.js';
import {DEFAULT_NET_POLICY} from '../src/net-quality.js';
const base=process.env.DUEL_QA_API||'http://127.0.0.1:18082/api/v1';
if(!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/api\/v1$/.test(base))throw Error('This QA script only accepts an explicit local test service');
const origin='http://127.0.0.1:4173',fetcher=async(url,options)=>{const response=await fetch(url,{...options,headers:{...options.headers,Origin:origin}});assert.equal(response.headers.get('access-control-allow-origin'),origin,'exact browser CORS origin');return response;};
const h=new MatchAPI({base,fetcher}),g=new MatchAPI({base,fetcher}),third=new MatchAPI({base,fetcher}),checks=[];
const check=(name,test)=>{assert(test,name);checks.push({name,pass:true});};
let room;
try{
 const preflight=await fetch(base+'/rooms',{method:'OPTIONS',headers:{Origin:origin,'Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'authorization,content-type'}});check('browser CORS preflight permits the exact frontend',preflight.status===204&&preflight.headers.get('access-control-allow-origin')===origin&&/Authorization/.test(preflight.headers.get('access-control-allow-headers')||''));
 const policy={...DEFAULT_NET_POLICY,direction:'above',rttMs:100},offer={type:'offer',sdp:'v=0\r\no=- 1 1 IN IP4 127.0.0.1\r\ns=DOTA DUEL contract test\r\nt=0 0\r\n'},answer={type:'answer',sdp:'v=0\r\no=- 2 1 IN IP4 127.0.0.1\r\ns=DOTA DUEL contract test\r\nt=0 0\r\n'};
 room=await h.request('rooms',{requestId:matchRequestId(),version:NET_VERSION,hero:0,offer,policy});check('six-digit invite and separate internal id',/^\d{6}$/.test(room.code)&&/^[a-f0-9]{64}$/.test(room.id));
 const joined=await g.request('rooms/join',{code:room.code,version:NET_VERSION,hero:3});check('atomic guest joins same room',joined.id===room.id);
 await assert.rejects(third.request('rooms/join',{code:room.code,version:NET_VERSION,hero:2}),e=>e.status===409);checks.push({name:'third participant rejected',pass:true});
 await g.request('rooms/'+room.id+'/answer',{version:NET_VERSION,answer});const read=await h.request('rooms/'+room.id,null,'GET');check('host sees answer without closing room',read.answer?.type==='answer'&&!read.closed);
 const requestId=matchRequestId(),match=await h.createMatch(room.id,requestId);check('match waits for both ready',match.status==='awaiting_ready');await h.ready(match.id);check('one ready cannot start',(await h.getMatch(match.id)).status==='awaiting_ready');await g.ready(match.id);check('both server ready start match',(await h.getMatch(match.id)).status==='in_progress');
 const result=resultPayload({history:[{winner:0,remaining:65.123},{winner:0,remaining:34.567}]});check('one report remains pending',(await h.submit(match.id,result)).status==='pending');check('two matching reports confirmed',(await g.submit(match.id,result)).status==='confirmed');check('exact result retry is idempotent',(await h.submit(match.id,result)).status==='confirmed');
 check('rematch request gets new server id',(await h.createMatch(room.id,matchRequestId())).id!==match.id);
 const pve=await third.createPVE(1,2,matchRequestId());const saved=await third.submit(pve.id,result);check('PVE is separately labeled',saved.mode==='pve'&&saved.status==='recorded'&&saved.trust==='client_reported');
 for(const transport of ['local','broadcastchannel']){
  const requestId=matchRequestId(),local=await h.createLocal(0,3,transport,requestId);
  check(transport+' single reporter metadata',local.mode==='pvp'&&local.transport===transport&&local.trust==='client_reported'&&local.status==='in_progress'&&local.reporterPlayerId===h.credentials.playerId&&JSON.stringify(local.participantKinds)===JSON.stringify(['local_slot','local_slot']));
  check(transport+' create retry returns same match',(await h.createLocal(0,3,transport,requestId)).id===local.id);
  await assert.rejects(g.getMatch(local.id),e=>[403,404].includes(e.status));checks.push({name:transport+' non-reporter read rejected',pass:true});
  await assert.rejects(g.submit(local.id,result),e=>[403,404].includes(e.status));checks.push({name:transport+' non-reporter result rejected',pass:true});
  const receipt=await h.submit(local.id,result);check(transport+' one result recorded without false peer confirmation',receipt.status==='recorded'&&receipt.trust==='client_reported');
  check(transport+' exact result retry stable',(await h.submit(local.id,result)).status==='recorded');
  const rematch=await h.createLocal(0,3,transport,matchRequestId());check(transport+' new rematch ID',rematch.id!==local.id);
  const aborted=await h.submit(rematch.id,resultPayload({history:[]},'disconnect'));check(transport+' disconnect recorded as aborted',aborted.status==='aborted');
 }
 console.log(JSON.stringify({status:'passed',version:NET_VERSION,base,checks,scope:'Real HTTP contract with fixture SDP, not real WebRTC or browser QA'},null,2));
}catch(e){console.log(JSON.stringify({status:'failed',version:NET_VERSION,base,checks,error:e.message},null,2));process.exitCode=1;}finally{if(room)await h.request('rooms/'+room.id,null,'DELETE').catch(()=>{});}
