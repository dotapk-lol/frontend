export class LocalMusic{
 constructor({storage=globalThis.localStorage,AudioClass=globalThis.Audio,urls=globalThis.URL,onchange=()=>{},now=()=>performance.now(),schedule=(fn,ms)=>setTimeout(fn,ms),cancel=t=>clearTimeout(t)}={}){
  Object.assign(this,{storage,AudioClass,urls,onchange,now,schedule,cancel});this.track=null;this.url=null;this.name='';this.file=null;this.unlocked=false;this.hidden=false;this.pageAway=false;this.error='';this.phase='empty';this.generation=0;this.attempt=0;this.pending=false;this.playResult='none';this.timer=null;this.events=[];this.released=0;this.lastRelease=null;this.progressCount=0;this.loopCount=0;this.lastTime=0;this.lastProgress=null;this.waitSince=null;
  this.settings={musicEnabled:true,musicVolume:.35,sfxEnabled:true,sfxVolume:.7};try{const p=JSON.parse(storage?.getItem('dota-duel-audio')||'null');if(p){for(const k of ['musicEnabled','sfxEnabled'])if(typeof p[k]==='boolean')this.settings[k]=p[k];for(const k of ['musicVolume','sfxVolume'])if(Number.isFinite(p[k]))this.settings[k]=Math.max(0,Math.min(1,p[k]));}else this.settings.sfxEnabled=JSON.parse(storage?.getItem('dota-duel-sound')||'true')!==false;}catch{}
 }
 record(event,extra={}){const a=this.track;this.events.push({event,at:this.now(),time:a?.currentTime||0,readyState:a?.readyState??null,networkState:a?.networkState??null,...extra});if(this.events.length>40)this.events.shift();}
 save(){try{this.storage?.setItem('dota-duel-audio',JSON.stringify(this.settings));}catch{}this.onchange();}
 wantsPlay(){return this.unlocked&&this.settings.musicEnabled&&!this.hidden&&!this.pageAway;}
 configure(p){const was=this.settings.musicEnabled;for(const k of ['musicEnabled','sfxEnabled'])if(typeof p[k]==='boolean')this.settings[k]=p[k];for(const k of ['musicVolume','sfxVolume'])if(Number.isFinite(p[k]))this.settings[k]=Math.max(0,Math.min(1,p[k]));if(this.track)this.track.volume=this.settings.musicVolume;this.save();if(!was&&this.settings.musicEnabled)this.retry();else this.sync();}
 unlock(){if(this.unlocked)return;this.unlocked=true;this.sync();}
 loadFile(file){
  if(!file||!Number.isFinite(file.size)||file.size<=0||file.size>120*1024*1024||(!file.type?.startsWith('audio/')&&!/\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file.name)))throw Error('请选择120MB以内的非空音频文件');
  this.clear();this.name=file.name;this.file={size:file.size,type:file.type||''};this.url=this.urls.createObjectURL(file);const a=this.track=new this.AudioClass();const generation=this.generation;this.phase='loading';this.progressCount=0;this.loopCount=0;this.lastTime=0;this.lastProgress=null;this.playResult='none';this.events=[];
  a.loop=true;a.preload='auto';a.volume=this.settings.musicVolume;
  for(const event of ['loadstart','loadedmetadata','loadeddata','canplay','play','playing','waiting','stalled','pause','ended','emptied','error','timeupdate'])a['on'+event]=()=>{
   if(this.track!==a||this.generation!==generation)return;
   if(event!=='timeupdate')this.record(event);
   if(event==='error'){this.mediaFailure(a.error?.code);return;}
   if(event==='pause'&&!['error','blocked','stalled'].includes(this.phase))this.phase='paused';
   if(['waiting','stalled'].includes(event)&&this.wantsPlay()&&!this.error)this.phase='loading';
   this.observe();this.onchange();
  };
  // Install handlers before src; explicitly load the selected blob before requesting play.
  a.src=this.url;a.load();this.unlocked=true;this.sync();this.watch();this.onchange();
 }
 mediaFailure(code){this.attempt++;this.pending=false;this.playResult='media-error';this.phase='error';this.error=code===3||code===4?'浏览器无法解码此音频，请换用有效的MP3、WAV或OGG文件':'音频加载失败，请重新导入文件';this.track?.pause();this.onchange();}
 observe(){const a=this.track;if(!a)return;const t=Number.isFinite(a.currentTime)?a.currentTime:0,now=this.now();const advanced=t>this.lastTime+.005,wrapped=a.loop&&this.lastTime>t+.05;
  if(this.wantsPlay()&&!a.paused&&!this.error&&(advanced||wrapped)){this.progressCount++;if(wrapped)this.loopCount++;this.lastProgress=now;this.waitSince=now;this.phase='playing';}
  this.lastTime=t;
  if(this.wantsPlay()&&!this.error&&this.waitSince!==null&&now-this.waitSince>=12000){this.phase='stalled';this.error='音频加载或播放未取得进展，请点击播放音乐重试；若仍无进展，请换用有效音频或检查浏览器播放状态';this.attempt++;this.pending=false;this.playResult='timeout';a.pause();this.record('progress-timeout');}
 }
 watch(){if(this.timer!==null)this.cancel(this.timer);const generation=this.generation;this.timer=this.schedule(()=>{this.timer=null;if(generation!==this.generation||!this.track)return;this.observe();this.onchange();this.watch();},250);}
 sync(){const a=this.track;if(!a)return;
  if(!this.wantsPlay()){this.attempt++;this.pending=false;this.waitSince=null;this.lastProgress=null;a.pause();if(!this.error)this.phase='paused';this.onchange();return;}
  if(this.error||this.pending||(!a.paused&&this.waitSince!==null))return;
  const attempt=++this.attempt,generation=this.generation;this.pending=true;this.playResult='pending';this.phase='starting';this.waitSince=this.now();this.record('play-request');
  const settled=(ok,e)=>{if(this.track!==a||this.generation!==generation||this.attempt!==attempt)return;this.pending=false;this.playResult=ok?'resolved':e?.name||'rejected';this.record(ok?'play-resolved':'play-rejected',{reason:e?.name||null});if(!ok){if(e?.name==='NotSupportedError'){this.mediaFailure(4);return;}if(e?.name==='AbortError'){this.phase='paused';this.waitSince=null;}else{this.phase='blocked';this.error='音乐尚未播放，请点击播放音乐重试';a.pause();}}this.observe();this.onchange();};
  try{Promise.resolve(a.play()).then(()=>settled(true),e=>settled(false,e));}catch(e){settled(false,e);}this.onchange();
 }
 retry(){if(!this.track)return;const reload=['error','stalled'].includes(this.phase);this.attempt++;this.pending=false;this.error='';this.unlocked=true;this.phase='starting';this.lastProgress=null;this.waitSince=null;if(reload){this.track.pause();this.track.load();}this.sync();}
 lifecycle({hidden=this.hidden,pageAway=this.pageAway}={}){const was=this.hidden||this.pageAway;this.hidden=hidden;this.pageAway=pageAway;this.record('lifecycle',{hidden,pageAway});if(was&&!hidden&&!pageAway&&this.phase==='paused')this.lastTime=this.track?.currentTime||0;this.sync();}
 clear(){const a=this.track;this.generation++;this.attempt++;this.pending=false;if(this.timer!==null)this.cancel(this.timer);this.timer=null;
  if(a){for(const event of ['loadstart','loadedmetadata','loadeddata','canplay','play','playing','waiting','stalled','pause','ended','emptied','error','timeupdate'])a['on'+event]=null;a.pause();a.removeAttribute?.('src');a.load?.();this.lastRelease={paused:a.paused,sourceRemoved:!a.getAttribute?.('src'),handlersRemoved:a.ontimeupdate===null,loadReset:true};}
  if(this.url){this.urls.revokeObjectURL(this.url);this.released++;if(this.lastRelease)this.lastRelease.urlRevoked=true;}
  this.track=null;this.url=null;this.name='';this.file=null;this.error='';this.phase='empty';this.playResult='none';this.lastProgress=null;this.waitSince=null;this.progressCount=0;this.loopCount=0;this.onchange();
 }
 status(){const a=this.track;return {name:this.name,playing:!!a&&!a.paused&&this.phase==='playing'&&this.lastProgress!==null&&this.now()-this.lastProgress<1500,state:this.phase,loop:a?.loop||false,time:a?.currentTime||0,volume:this.settings.musicVolume,error:this.error,settings:{...this.settings},diagnostics:{file:this.file?{...this.file}:null,duration:Number.isFinite(a?.duration)?a.duration:null,readyState:a?.readyState??null,networkState:a?.networkState??null,paused:a?.paused??true,mediaError:a?.error?{code:a.error.code,message:a.error.message}:null,actualVolume:a?.volume??null,srcScheme:a?.src?.split(':')[0]||null,playResult:this.playResult,pending:this.pending,progressCount:this.progressCount,loopCount:this.loopCount,released:this.released,lastRelease:this.lastRelease?{...this.lastRelease}:null,events:this.events.map(e=>({...e}))}};}
}
