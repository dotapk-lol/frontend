import {NET_VERSION} from './net-version.js';
import {ACTIVE_ROSTER} from './hero-registry.js';

export function connectionError(){const e=Error('网络连接暂不可用，请稍后重试');e.kind='network';return e;}
// One finite deadline covers headers and JSON. AbortSignal.timeout is optional
// on mobile browsers; an AbortController plus timer also cancels the request.
export async function checkedJSON(fetcher,url,timeoutMs=10000){
 const controller=typeof AbortController==='function'?new AbortController():null;let timer;
 const work=(async()=>{const r=await fetcher(url,{method:'GET',cache:'no-store',...(controller?{signal:controller.signal}:{})});if(!r.ok)throw connectionError();return r.json();})();
 try{return await Promise.race([work,new Promise((_,reject)=>{timer=setTimeout(()=>{controller?.abort();reject(connectionError());},timeoutMs);})]);}
 catch(e){if(e.kind==='network')throw e;throw connectionError();}
 finally{clearTimeout(timer);}
}

// Validation belongs to this loaded build, not a room or a persistent cookie.
// The shared MatchAPI keeps the successful strict registry check in memory.
export class EntryVersion {
 constructor({service,fetcher=(...args)=>globalThis.fetch(...args),location=globalThis.location,storage=globalThis.sessionStorage,isActive=()=>false,onchange=()=>{},now=()=>Date.now(),timeoutMs=10000}={}){
  Object.assign(this,{service,fetcher,location,storage,isActive,onchange,now,timeoutMs});this.phase=location?.protocol==='file:'?'local':'checking';this.latest=null;this.task=null;this.lastCheck=null;this.error='';this.refreshing=false;
 }
 info(){return {phase:this.phase,current:NET_VERSION,latest:this.latest?.gameVersion||null,error:this.error,canConnect:this.phase==='ready',canUpdate:this.phase==='update'&&!this.isActive()&&!this.refreshing};}
 emit(){this.onchange(this.info());}
 invalidate(){this.lastCheck=null;this.phase='checking';this.emit();}
 async check({force=false}={}){
  if(this.location?.protocol==='file:'||this.isActive())return this.info();
  if(this.task)return this.task;
  if(!force&&this.phase==='ready'&&this.lastCheck!==null&&this.now()-this.lastCheck<60000)return this.info();
  this.phase='checking';this.error='';this.emit();
  this.task=(async()=>{
   try{
    const manifest=await checkedJSON(this.fetcher,'build-manifest.json',this.timeoutMs);
    if(manifest?.profile!=='heros22'||manifest?.candidate!==false||!/^duel-[a-f0-9]{20}$/.test(manifest?.gameVersion||'')||manifest?.roster?.rosterId!==ACTIVE_ROSTER.rosterId){const e=Error('版本信息暂不可用，请稍后重试');e.kind='compatibility';throw e;}
    this.latest=manifest;
    if(manifest.gameVersion!==NET_VERSION){this.phase='update';return;}
    const registry=await this.service.loadRegistry();
    if(registry.status!=='verified')throw connectionError();
    this.phase='ready';this.lastCheck=this.now();
    try{this.storage?.removeItem('dota-duel-update-target');}catch{}
   }catch(e){this.phase=e.kind==='network'?'offline':'incompatible';this.error=this.phase==='offline'?'网络连接暂不可用，请稍后重试':'当前版本与对战服务不兼容，请稍后重新检查';}
   finally{this.task=null;this.emit();}
  })();
  await this.task;return this.info();
 }
 update(){
  if(!this.info().canUpdate)return false;
  this.refreshing=true;this.emit();
  try{this.storage?.setItem('dota-duel-update-target',this.latest.gameVersion);}catch{}
  const url=new URL(this.location.href);url.searchParams.set('build',this.latest.gameVersion);
  this.location.replace(url.href);return true;
 }
}
