import {isActiveHero} from './hero-registry.js';
import {compatibleRoom,compatibleMatch} from './compatibility.js';
import {NET_VERSION} from './net-version.js';

export const SELECTION_MS=20000;
export const ROOM_DEFAULT_HERO=1;
const terminal=m=>['confirmed','disputed','aborted'].includes(m?.status);
const uuid=s=>typeof s==='string'&&/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(s);

// The host owns time; each participant owns their authenticated hero lock.
// Preview packets never stand in for a successful backend lock or match ready.
export class RoomSelection {
 constructor(session,{now=()=>performance.now()}={}){
  this.session=session;this.now=now;this.phase='checking';this.epoch='';
  this.hero=ROOM_DEFAULT_HERO;this.peerHero=ROOM_DEFAULT_HERO;
  this.locked=false;this.peerLocked=false;this.entered=false;this.peerEntered=false;
  this.deadline=null;this.remaining=SELECTION_MS;this.clockRevision=0;
  this.localRevision=0;this.peerRevision=0;this.rematch=false;this.peerRematch=false;
  this.busy=false;this.lockTask=null;this.error='';this.retryAt=0;
  this.materials=null;this.peerMaterials=null;this.materialRevision=0;
 }
 send(action,fields={}){return this.session.controlSend({type:'selection',action,epoch:this.epoch,...fields});}
 emit(){this.session.emit();}
 info(){return {phase:this.phase,epoch:this.epoch,hero:this.hero,peerHero:this.peerHero,locked:this.locked,peerLocked:this.peerLocked,remainingMs:this.phase==='selecting'&&this.deadline!==null?Math.max(0,this.deadline-this.now()):this.remaining,clockRunning:this.deadline!==null,expired:!!this.expired,rematch:this.rematch,peerRematch:this.peerRematch,error:this.error,busy:this.busy||!!this.lockTask};}
 materialsMatch(proof,peer=false){return !!proof&&proof.epoch===this.epoch&&proof.hero===(peer?this.peerHero:this.hero)&&proof.peerHero===(peer?this.hero:this.peerHero);}
 materialsReady(){return this.materialsMatch(this.materials)&&this.materials.ready&&this.materialsMatch(this.peerMaterials,true)&&this.peerMaterials.ready;}
 setMaterials(ready){
  if(this.phase!=='selecting'||this.session.stopped)return;ready=!!ready;
  if(this.materialsMatch(this.materials)&&this.materials.ready===ready)return;
  this.materials={epoch:this.epoch,hero:this.hero,peerHero:this.peerHero,ready,revision:++this.materialRevision};
  this.send('materials',this.materials);
 }
 validRoom(room,epoch,hero=this.hero){return compatibleRoom(room,{role:this.session.role,hero})&&room.id===this.session.roomId&&!room.closed&&room.selection?.epoch===epoch&&room.players.every(p=>/^[a-f0-9]{64}$/.test(p?.id||'')&&isActiveHero(p?.hero))&&typeof room.selection.previousEpoch==='string'&&typeof room.selection.previousMatchId==='string'&&Array.isArray(room.selection.locked)&&room.selection.locked.length===2&&room.selection.locked.every(v=>typeof v==='boolean');}
 reset(room){
  const s=this.session,own=s.role==='host'?0:1;
  this.epoch=room.selection.epoch;this.previousEpoch=room.selection.previousEpoch;this.previousMatchId=room.selection.previousMatchId;this.phase='selecting';this.hero=room.players[own].hero;this.peerHero=room.players[1-own].hero;
  this.locked=room.selection.locked[own];this.peerLocked=room.selection.locked[1-own];
  this.entered=this.peerEntered=false;this.deadline=null;this.remaining=SELECTION_MS;
  this.clockRevision=0;this.localRevision=this.peerRevision=0;this.error='';
  this.materials=this.peerMaterials=null;this.materialRevision=0;
  this.rematch=this.peerRematch=false;this.expired=false;
  s.hero=this.hero;s.peerHero=this.peerHero;s.fighting=false;s.ready=this.locked&&s.gate().ok;s.peerReady=this.peerLocked&&s.gate().ok;
  s.match=null;s.matchRequest=null;s.pendingEpoch=null;s.error='';
 }
 async open(){
  const s=this.session;if(s.role!=='host'||this.busy||s.stopped||!s.gate().ok||this.now()<this.retryAt)return;
  if(!['checking','result'].includes(this.phase)||this.phase==='result'&&(!this.rematch||!this.peerRematch))return;
  this.busy=true;const previousEpoch=this.epoch,previousMatchId=s.match?.id||'';
  const epoch=this.openingEpoch||=crypto.randomUUID();this.emit();
  try{
   if(previousMatchId){const m=await s.service.getMatch(previousMatchId);if(s.stopped)return;if(!compatibleMatch(m)||m.id!==previousMatchId||m.roomId!==s.roomId)throw Error('比赛与房间英雄不一致');if(!terminal(m)){this.retryAt=this.now()+2000;return;}}
   const room=await s.api('rooms/'+s.roomId+'/selection',{version:NET_VERSION,action:'begin',epoch,previousEpoch,previousMatchId});
   if(!this.validRoom(room,epoch,ROOM_DEFAULT_HERO)||room.selection.previousEpoch!==previousEpoch||room.selection.previousMatchId!==previousMatchId)throw Error('房间选人状态不一致');
   this.reset(room);this.openingEpoch=null;
   this.openMessage={previousEpoch,previousMatchId};this.openSentAt=this.now();this.send('open',this.openMessage);this.emit();
  }catch(e){if(!s.stopped){this.error='选人服务：'+e.message;this.retryAt=this.now()+2000;this.emit();}}
  finally{this.busy=false;}
 }
 async acceptOpen(m){
  const s=this.session;if(s.role!=='guest'||this.busy||!uuid(m.epoch)||m.epoch===this.epoch||m.previousEpoch!==this.epoch||m.previousMatchId!==(s.match?.id||''))return;
  if(this.phase==='result'&&(!this.rematch||!this.peerRematch)||!['checking','result'].includes(this.phase))return;
  this.busy=true;
  try{const room=await s.api('rooms/'+s.roomId,null,'GET');if(!this.validRoom(room,m.epoch,ROOM_DEFAULT_HERO)||room.selection.previousEpoch!==m.previousEpoch||room.selection.previousMatchId!==m.previousMatchId)throw Error('房间选人状态不一致');this.reset(room);this.emit();}
  catch(e){if(!s.stopped){this.error='选人服务：'+e.message;this.emit();}}
  finally{this.busy=false;}
 }
 enter(){if(this.phase!=='selecting'||this.entered)return;this.entered=true;this.send('entered');}
 choose(hero){if(this.phase!=='selecting'||this.locked||this.lockTask||!isActiveHero(hero)||this.expired)return false;this.hero=hero;this.session.hero=hero;this.send('pick',{hero,revision:++this.localRevision});this.emit();return true;}
 async lock(){
  const s=this.session;if(this.phase!=='selecting'||!s.gate().ok||this.lockTask)return false;
  if(this.locked){s.ready=true;this.send('locked',{hero:this.hero});this.emit();return true;}
  const epoch=this.epoch,hero=this.hero;this.lockTask={epoch,hero};this.emit();
  try{
   const room=await s.api('rooms/'+s.roomId+'/selection',{version:NET_VERSION,action:'lock',epoch,hero});
   if(s.stopped||epoch!==this.epoch)return false;
   if(!this.validRoom(room,epoch,hero)||room.selection.locked[s.role==='host'?0:1]!==true||room.selection.previousEpoch!==this.previousEpoch||room.selection.previousMatchId!==this.previousMatchId)throw Error('房间选人状态不一致');
   this.locked=true;s.hero=hero;s.ready=s.gate().ok;this.error='';
   this.send('locked',{hero});return true;
  }catch(e){if(!s.stopped&&epoch===this.epoch)this.error='选人服务：'+e.message;return false;}
  finally{this.lockTask=null;if(!s.stopped)this.emit();}
 }
 receive(m){
  if(m.action==='open'){this.acceptOpen(m);return;}
  if(m.epoch!==this.epoch||!this.epoch)return;
  const s=this.session;
  if(m.action==='rematch'&&this.phase==='result'&&m.matchId===s.match?.id){this.peerRematch=true;this.emit();return;}
  if(this.phase!=='selecting')return;
  if(m.action==='materials'){
   if(typeof m.ready!=='boolean'||!Number.isSafeInteger(m.revision)||m.revision<1||m.hero!==this.peerHero||m.peerHero!==this.hero||this.peerMaterials&&m.revision<=this.peerMaterials.revision)return;
   this.peerMaterials={epoch:m.epoch,hero:m.hero,peerHero:m.peerHero,ready:m.ready,revision:m.revision};this.emit();return;
  }
  if(m.action==='entered'){this.peerEntered=true;return;}
  if(m.action==='pick'&&!this.peerLocked&&Number.isSafeInteger(m.revision)&&m.revision>this.peerRevision&&isActiveHero(m.hero)){
   this.peerRevision=m.revision;this.peerHero=m.hero;s.peerHero=m.hero;this.emit();return;
  }
  if(m.action==='locked'&&isActiveHero(m.hero)){
   // Ready stays provisional until prepare reads the immutable backend match.
   if(this.peerLocked&&m.hero!==this.peerHero)return;
   this.peerHero=m.hero;s.peerHero=m.hero;this.peerLocked=true;s.peerReady=s.peerAvailable&&s.gate().ok;this.emit();return;
  }
  if(s.role==='guest'&&Number.isSafeInteger(m.clockRevision)&&m.clockRevision>=this.clockRevision){
   if(m.action==='clock'&&Number.isFinite(m.remainingMs)&&m.remainingMs>=0&&m.remainingMs<=SELECTION_MS){this.clockRevision=m.clockRevision;this.remaining=m.remainingMs;this.deadline=this.now()+m.remainingMs;this.emit();return;}
   if(m.action==='cancel-clock'&&Number.isFinite(m.remainingMs)&&m.remainingMs>=0&&m.remainingMs<=SELECTION_MS){this.clockRevision=m.clockRevision;this.deadline=null;this.remaining=m.remainingMs;this.expired=false;s.ready=s.peerReady=false;this.emit();return;}
   if(m.action==='expire'&&m.clockRevision===this.clockRevision){this.expired=true;this.remaining=0;this.deadline=null;this.lock();}
  }
 }
 tick(){
  const s=this.session;if(s.stopped)return;
  if(this.phase==='checking'||this.phase==='result'){this.open();return;}
  if(this.phase!=='selecting')return;
  if(this.session.role==='host'&&!this.peerEntered&&this.openMessage&&this.now()-this.openSentAt>=2000){this.openSentAt=this.now();this.send('open',this.openMessage);}
  // Re-send the same revision until the peer has entered this epoch. Duplicates
  // are ignored; a proof delivered before acceptOpen completed can recover.
  if(this.materialsMatch(this.materials))this.send('materials',this.materials);
  if(this.entered)this.send('entered');
  if(!s.gate().ok){
   s.ready=s.peerReady=false;
   if(this.deadline!==null){this.remaining=Math.max(0,this.deadline-this.now());this.deadline=null;this.expired=false;if(s.role==='host')this.send('cancel-clock',{clockRevision:++this.clockRevision,remainingMs:this.remaining});}
   return;
  }
  if(this.locked&&!s.ready){s.ready=true;this.send('locked',{hero:this.hero});}
  if(s.role!=='host')return;
  if(!this.entered||!this.peerEntered)return;
  if(this.deadline===null&&!this.expired){this.deadline=this.now()+this.remaining;this.clockRevision++;}
  if(this.deadline!==null){this.remaining=Math.max(0,this.deadline-this.now());this.send('clock',{clockRevision:this.clockRevision,remainingMs:this.remaining});}
  if(this.remaining===0&&!this.expired){this.expired=true;this.deadline=null;this.send('expire',{clockRevision:this.clockRevision});this.lock();}
  if(this.locked&&this.peerLocked&&s.ready&&s.peerReady&&!s.pendingEpoch){s.start();}
 }
 finish(){if(this.phase==='result')return;this.phase='result';this.deadline=null;this.remaining=SELECTION_MS;this.session.ready=this.session.peerReady=false;this.emit();}
 requestRematch(){if(this.phase!=='result'||!this.session.match?.id||this.rematch)return false;this.rematch=true;this.send('rematch',{matchId:this.session.match.id});this.emit();return true;}
 started(){this.phase='fighting';this.deadline=null;}
 cancel(){this.deadline=null;this.materials=this.peerMaterials=null;this.phase='failed';}
}
