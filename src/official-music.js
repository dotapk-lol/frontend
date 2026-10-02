// Official publisher's video; use only the visible, standard YouTube player.
export const OFFICIAL_ALBUM={title:'Reborn · Dota 2 Official Soundtrack',artist:'Valve Studio Orchestra',publisher:'Ipecac Recordings',videoId:'4oRLslA68Eg',page:'https://www.youtube.com/watch?v=4oRLslA68Eg'};

// Reserve the full player independently of the arena. Small viewports keep the game.
export function officialMusicLayout(width,height,{left=0,right=0,top=0,bottom=0}={}){
 const w=Math.max(0,width-left-right),h=Math.max(0,height-top-bottom),rail=w>=1200?344:224;
 if(w-rail>=520&&h>=330)return {mode:'side',available:true,rail,gameWidth:w-rail,gameHeight:h,left,right,top,bottom};
 if(h>w&&w>=320&&h>=620)return {mode:'bottom',available:true,rail:296,gameWidth:w,gameHeight:h-296,left,right,top,bottom};
 return {mode:'none',available:false,rail:0,gameWidth:w,gameHeight:h,left,right,top,bottom};
}
let officialYouTubeTask=null;
function loadOfficialYouTube(win,doc){
 if(win?.YT?.Player)return Promise.resolve(win.YT);
 if(officialYouTubeTask)return officialYouTubeTask;
 officialYouTubeTask=new Promise((resolve,reject)=>{
  const script=doc.createElement('script'),previous=win.onYouTubeIframeAPIReady;
  let done=false;
  const finish=error=>{if(done)return;done=true;clearTimeout(timeout);if(win.onYouTubeIframeAPIReady===ready)win.onYouTubeIframeAPIReady=previous;if(error){script.remove();officialYouTubeTask=null;reject(error);}else resolve(win.YT);};
  const ready=()=>{try{previous?.();}finally{win.YT?.Player?finish():finish(Error('YouTube API unavailable'));}};
  const timeout=setTimeout(()=>finish(Error('YouTube API timeout')),15000);
  win.onYouTubeIframeAPIReady=ready;script.src='https://www.youtube.com/iframe_api';script.async=true;script.onerror=()=>finish(Error('YouTube API network error'));doc.head.appendChild(script);
 });
 return officialYouTubeTask;
}
export class OfficialAlbumPlayer{
 constructor({root,document:doc,window:win=globalThis.window,onchange=()=>{},apiLoader=()=>loadOfficialYouTube(win,doc),interval=(fn,ms)=>globalThis.setInterval(fn,ms),cancelInterval=id=>globalThis.clearInterval(id)}){
  Object.assign(this,{root,document:doc,window:win,onchange,apiLoader,interval,cancelInterval});
  this.player=null;this.frame=null;this.enabled=false;this.available=false;this.hidden=!!doc.hidden;this.pageAway=false;this.loaded=false;this.intent=false;this.volume=.35;this.generation=0;this.loading=false;this.timer=null;this.readyDeadline=0;this.state='disabled';this.error='';this.playerState=-1;this.currentTime=0;this.duration=0;this.advancing=false;this.observedWraps=0;this.events=[];
 }
 emit(){this.onchange();}
 record(type,extra={}){this.events.push({type,time:this.currentTime,...extra});if(this.events.length>80)this.events.shift();}
 configure(enabled,volume=this.volume){this.enabled=!!enabled;this.setVolume(volume,false);if(!this.enabled){this.intent=false;this.destroy();this.state='disabled';}else if(this.available)this.ensure();else this.state='layout-unavailable';this.emit();}
 setAvailable(available){this.available=!!available;if(!this.available){this.intent=false;this.destroy();this.state=this.enabled?'layout-unavailable':'disabled';}else if(this.enabled)this.ensure();this.emit();}
 setVolume(value,emit=true){if(Number.isFinite(value))this.volume=Math.max(0,Math.min(1,value));if(this.loaded){this.player?.setVolume(Math.round(this.volume*100));if(this.volume===0)this.player?.mute();else this.player?.unMute();}if(emit)this.emit();}
 lifecycle(patch){if(typeof patch.hidden==='boolean')this.hidden=patch.hidden;if(typeof patch.pageAway==='boolean')this.pageAway=patch.pageAway;if(this.hidden||this.pageAway)this.stop('paused');else if(this.enabled&&this.available)this.ensure();this.emit();}
 visible(){const r=this.frame?.getBoundingClientRect?.();if(!r||this.hidden||this.pageAway||!this.available)return false;const v=this.window.visualViewport,left=v?.offsetLeft||0,top=v?.offsetTop||0,w=v?.width||this.window.innerWidth,h=v?.height||this.window.innerHeight;return r.width>=200&&r.height>=200&&r.left>=left-.5&&r.top>=top-.5&&r.right<=left+w+.5&&r.bottom<=top+h+.5;}
 allowed(){return this.enabled&&this.visible();}
 async ensure(){
  if(this.player||this.loading||!this.enabled||!this.available||this.hidden||this.pageAway)return;
  if(this.window?.location?.protocol==='file:'){this.state='error';this.error='官方音乐需要从网站播放；离线文件保留游戏音效。';this.emit();return;}
  const token=++this.generation;this.loading=true;this.state='loading';this.error='';this.emit();
  try{
   const YT=await this.apiLoader();if(token!==this.generation||!this.enabled||!this.available)return;
   const f=this.document.createElement('iframe');f.title='Dota 2 官方音乐 Reborn · YouTube';f.width='100%';f.height='200';f.setAttribute('referrerpolicy','strict-origin-when-cross-origin');f.setAttribute('allow','autoplay; encrypted-media; picture-in-picture');f.setAttribute('allowfullscreen','');
   const origin=this.window?.location?.origin;
   f.src=`https://www.youtube.com/embed/${OFFICIAL_ALBUM.videoId}?enablejsapi=1&autoplay=0&loop=1&playlist=${OFFICIAL_ALBUM.videoId}&playsinline=1&controls=1&disablekb=1${origin&&origin!=='null'?'&origin='+encodeURIComponent(origin):''}`;
   this.frame=f;this.root.appendChild(f);
   const live=()=>token===this.generation;
   this.player=new YT.Player(f,{events:{
    onReady:e=>{if(!live())return;this.player=e.target;this.frame=e.target.getIframe?.()||f;this.loaded=true;this.loading=false;this.state='ready';this.setVolume(this.volume,false);this.record('ready');if(this.intent)this.play();this.emit();},
    onStateChange:e=>{if(live())this.changed(e.data);},
    onAutoplayBlocked:()=>{if(!live())return;this.intent=false;this.advancing=false;this.playerState=-1;this.state='blocked';this.record('autoplay-blocked');this.emit();},
    onError:e=>{if(!live())return;this.intent=false;this.advancing=false;this.playerState=-1;this.state='error';const reasons={100:'视频已移除或设为私有',101:'发布方禁止此视频嵌入',150:'发布方禁止此视频嵌入',153:'播放器无法验证网站来源'};this.error=`官方播放器暂不可用（${e.data}）：${reasons[e.data]||'请检查网络或稍后重试'}。`;this.record('error',{code:e.data});this.emit();}
   }});
   this.readyDeadline=Date.now()+20000;this.timer=this.interval(()=>this.observe(),250);
  }catch(e){if(token===this.generation){this.loading=false;this.intent=false;this.state='error';this.error='官方播放器加载失败，请检查网络后重试。';this.emit();}}
 }
 play(){
  if(!this.enabled||!this.available)return false;
  this.intent=true;
  if(!this.loaded){this.ensure();this.emit();return false;}
  if(!this.allowed()){this.stop('paused');return false;}
  this.error='';this.state='starting';this.record('play-request');this.player.playVideo();this.emit();return true;
 }
 stop(state='stopped'){this.intent=false;this.advancing=false;this.player?.pauseVideo?.();if(this.enabled&&this.available)this.state=state;this.record(state);this.emit();}
 changed(value){
  this.playerState=value;
  if(value===1){if(!this.allowed()){this.stop('paused');return;}this.intent=true;this.state='playing';}
  else if(value===2){this.intent=false;this.advancing=false;if(!['stopped','paused','layout-unavailable','disabled'].includes(this.state))this.state='paused';}
  else if(value===3){this.advancing=false;this.state='buffering';}
  else if(value===0){this.advancing=false;this.state='ended';}
  else if(value===5)this.state='ready';
  this.record('player-state',{value});this.emit();
 }
 observe(){
  if(!this.loaded){if(this.loading&&this.readyDeadline&&Date.now()>this.readyDeadline){this.intent=false;this.loading=false;this.state='error';this.error='官方视频连接超时，请检查网络后重试。';this.record('player-timeout');this.emit();}return;}
  if(!this.allowed()&&(this.intent||this.playerState===1)){this.stop('paused');return;}
  const t=Number(this.player.getCurrentTime?.()),d=Number(this.player.getDuration?.());
  if(Number.isFinite(d)&&d>0)this.duration=d;
  if(Number.isFinite(t)){
   const prior=this.currentTime,wrap=this.duration>0&&prior>=this.duration-2&&t<2&&prior-t>2;
   this.advancing=this.playerState===1&&(t>prior+.01||wrap);
   if(wrap){this.observedWraps++;this.record('observed-wrap',{from:prior,to:t,duration:this.duration});}
   this.currentTime=t;
  }
  this.emit();
 }
 retry(){if(!this.enabled||!this.available)return;this.intent=false;this.destroy();this.ensure();}
 destroy(){++this.generation;this.error='';this.cancelInterval(this.timer);this.timer=null;this.readyDeadline=0;try{this.player?.destroy();}catch{}this.frame?.remove();this.player=null;this.frame=null;this.loaded=false;this.loading=false;this.advancing=false;this.playerState=-1;this.currentTime=0;this.duration=0;}
 status(){return {provider:'YouTube',name:OFFICIAL_ALBUM.title,artist:OFFICIAL_ALBUM.artist,videoId:OFFICIAL_ALBUM.videoId,enabled:this.enabled,available:this.available,state:this.state,error:this.error,playerLoaded:this.loaded,playerState:this.playerState,playing:this.playerState===1&&this.allowed()&&this.advancing,currentTime:this.currentTime,duration:this.duration,volume:this.volume,loop:true,observedWraps:this.observedWraps,visible:this.visible(),requiresInternet:true,events:this.events.map(e=>({...e})),notice:'首次点击播放后循环；需要网络，可能有广告，不保证无缝。切到后台或播放器不可见时暂停。'};}
}
