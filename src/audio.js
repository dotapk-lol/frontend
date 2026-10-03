import {AUDIO_SCORE} from './audio-score.js';
import {soundDesign} from './audio-map.js';
import {synthEffect} from './audio-synth.js';

const audioUnit=(x,fallback)=>typeof x==='number'&&Number.isFinite(x)?Math.max(0,Math.min(1,x)):fallback;
export class ArcadeAudio{
 constructor({storage,internalMusic=true,contextFactory=()=>new (globalThis.AudioContext||globalThis.webkitAudioContext)(),fetcher=(url)=>fetch(url),onchange=()=>{}}={}){
  this.internalMusic=internalMusic;this.storage=storage;this.contextFactory=contextFactory;this.fetcher=fetcher;this.onchange=onchange;
  this.settings={musicEnabled:true,musicVolume:.35,sfxEnabled:true,sfxVolume:.7};
  try{const v=JSON.parse(storage?.getItem('dota-duel-audio')||'null');if(v)this.settings={musicEnabled:typeof v.musicEnabled==='boolean'?v.musicEnabled:true,sfxEnabled:typeof v.sfxEnabled==='boolean'?v.sfxEnabled:true,musicVolume:audioUnit(v.musicVolume,.35),sfxVolume:audioUnit(v.sfxVolume,.7)};else if(storage?.getItem('dota-duel-sound')==='false')this.settings.sfxEnabled=false;}catch{}
  this.scene='menu';this.ctx=null;this.unlocked=false;this.hidden=false;this.pageAway=false;this.disposed=false;this.generation=0;this.state='locked';this.error='';
  this.buffers=new Map();this.effects=new Map();this.voices=[];this.musicNodes=new Set();this.seen=new Set();this.cooldown=new Map();this.offsets={menu:0,battle:0};this.current=null;this.pending=null;this.resumeTask=null;
  this.stats={played:0,dropped:0,duplicates:0,peakVoices:0};this.recent=[];
 }
 emit(){this.onchange();}
 ensure(){if(this.ctx)return this.ctx;const c=this.contextFactory();this.ctx=c;this.musicGain=c.createGain();this.sfxGain=c.createGain();this.master=c.createGain();this.limiter=c.createDynamicsCompressor();
  this.musicGain.gain.value=this.settings.musicEnabled?this.settings.musicVolume*.65:0;this.sfxGain.gain.value=this.settings.sfxEnabled?this.settings.sfxVolume*.34:0;this.master.gain.value=.8;
  this.limiter.threshold.value=-8;this.limiter.knee.value=8;this.limiter.ratio.value=12;this.limiter.attack.value=.003;this.limiter.release.value=.15;
  this.musicGain.connect(this.limiter);this.sfxGain.connect(this.limiter);this.limiter.connect(this.master);this.master.connect(c.destination);
  c.onstatechange=()=>{if(this.disposed)return;if(c.state!=='running'){this.state='blocked';this.emit();}else if(this.unlocked)this.sync();};return c;
 }
 async unlock(){if(this.disposed)return false;this.unlocked=true;try{const c=this.ensure();if(c.state!=='running'){this.resumeTask??=Promise.resolve(c.resume()).finally(()=>{this.resumeTask=null;});await this.resumeTask;}if(c.state!=='running'){this.state='blocked';this.emit();return false;}this.error='';await this.sync();return true;}catch(e){this.error='音频暂不可播放，请再次点击开启声音';this.state='blocked';this.emit();return false;}}
 retry(){return this.unlock();}
 gain(node,value){if(!node)return;const p=node.gain,t=this.ctx.currentTime;p.cancelScheduledValues(t);p.setTargetAtTime(value,t,.025);}
 configure(patch){for(const k of ['musicEnabled','sfxEnabled'])if(typeof patch[k]==='boolean')this.settings[k]=patch[k];for(const k of ['musicVolume','sfxVolume'])if(k in patch)this.settings[k]=audioUnit(patch[k],this.settings[k]);try{this.storage?.setItem('dota-duel-audio',JSON.stringify(this.settings));}catch{}
  this.gain(this.musicGain,this.settings.musicEnabled?this.settings.musicVolume*.65:0);this.gain(this.sfxGain,this.settings.sfxEnabled?this.settings.sfxVolume*.34:0);
  if(!this.settings.sfxEnabled)this.stopEffects();this.sync();this.emit();
 }
 setScene(scene){if(!(scene in AUDIO_SCORE)||this.scene===scene)return;this.scene=scene;this.generation++;this.sync();}
 lifecycle(patch){if(typeof patch.hidden==='boolean')this.hidden=patch.hidden;if(typeof patch.pageAway==='boolean')this.pageAway=patch.pageAway;this.generation++;if(this.hidden||this.pageAway)this.stopEffects();this.sync();}
 wanted(){return this.internalMusic&&this.unlocked&&!this.disposed&&!this.hidden&&!this.pageAway&&this.settings.musicEnabled;}
 async buffer(scene){if(!this.buffers.has(scene)){const task=(async()=>{const r=await this.fetcher(AUDIO_SCORE[scene].src);if(!r.ok)throw Error('audio asset');return this.ctx.decodeAudioData(await r.arrayBuffer());})();this.buffers.set(scene,task);task.catch(()=>this.buffers.delete(scene));}return this.buffers.get(scene);}
 position(node){return node?(node.offset+Math.max(0,this.ctx.currentTime-node.started))%node.buffer.duration:0;}
 stopMusic(node,fade=.18){if(!node||(node.stopping&&fade>0))return;if(!node.stopping)this.offsets[node.scene]=this.position(node);node.stopping=true;if(this.current===node)this.current=null;const t=this.ctx.currentTime;node.gain.gain.cancelScheduledValues(t);node.gain.gain.setValueAtTime(Math.max(0,node.gain.gain.value),t);node.gain.gain.linearRampToValueAtTime(0,t+fade);try{node.source.stop(t+fade+.01);}catch{}if(!fade||this.ctx.state!=='running'){node.source.disconnect();node.gain.disconnect();this.musicNodes.delete(node);}}
 async sync(){if(!this.wanted()){this.generation++;if(this.hidden||this.pageAway||this.disposed){for(const n of [...this.musicNodes])this.stopMusic(n,0);}else this.stopMusic(this.current,.1);this.state=this.unlocked?'paused':'locked';this.emit();return;}
  if(!this.ctx||this.ctx.state!=='running'){this.state='blocked';this.emit();return;}
  if(this.current?.scene===this.scene&&!this.current.stopping){this.state='playing';this.emit();return;}
  const scene=this.scene,token=this.generation;if(this.pending?.scene===scene&&this.pending.token===token)return this.pending.task;
  this.state='loading';this.emit();const task=(async()=>{try{const buffer=await this.buffer(scene);if(token!==this.generation||!this.wanted()||this.scene!==scene||this.ctx.state!=='running')return;
    // At most the current track and one fading track, even during rapid scene changes.
    for(const n of this.musicNodes)if(n!==this.current){try{n.source.stop();}catch{}n.source.disconnect();n.gain.disconnect();this.musicNodes.delete(n);}
    this.stopMusic(this.current);const c=this.ctx,source=c.createBufferSource(),gain=c.createGain();source.buffer=buffer;source.loop=true;source.loopStart=0;source.loopEnd=buffer.duration;source.connect(gain);gain.connect(this.musicGain);gain.gain.setValueAtTime(0,c.currentTime);gain.gain.linearRampToValueAtTime(1,c.currentTime+.3);
    const node={source,gain,scene,buffer,offset:this.offsets[scene]%buffer.duration,started:c.currentTime,stopping:false};source.onended=()=>{source.disconnect();gain.disconnect();this.musicNodes.delete(node);};this.musicNodes.add(node);source.start(c.currentTime,node.offset);this.current=node;this.state='playing';this.error='';this.emit();
   }catch(e){if(token===this.generation){this.state='error';this.error='内置音乐加载失败，点击开启声音重试';this.emit();}}finally{if(this.pending?.task===task)this.pending=null;}})();this.pending={scene,token,task};return task;
 }
 stopEffects(){for(const v of [...this.voices])this.stopVoice(v);}
 stopVoice(v){try{v.source.stop();}catch{}v.source.disconnect();v.gain.disconnect();v.pan?.disconnect();this.voices=this.voices.filter(x=>x!==v);}
 resetMatch(){this.seen.clear();this.cooldown.clear();this.stopEffects();}
 playEffect(packet){if(typeof packet==='string')packet={key:packet};if(!packet||typeof packet.key!=='string')return false;const design=soundDesign(packet.key);if(!design)return false;
  if(packet.id!==undefined){if(typeof packet.id!=='string'||packet.id.length>96)return false;if(this.seen.has(packet.id)){this.stats.duplicates++;return false;}this.seen.add(packet.id);if(this.seen.size>512)this.seen.delete(this.seen.values().next().value);}
  if(!this.unlocked||!this.ctx||this.ctx.state!=='running'||!this.settings.sfxEnabled||this.settings.sfxVolume===0||this.hidden||this.pageAway||this.disposed)return false;
  const c=this.ctx,now=c.currentTime,group=packet.key+':'+(packet.player===1?1:0),gap=packet.key==='heal'?.6:packet.key==='hit'?.055:.025;
  if(now-(this.cooldown.get(group)??-Infinity)<gap){this.stats.dropped++;return false;}
  if(this.voices.length>=12||design.priority<3&&this.voices.filter(v=>v.priority<3).length>=8){this.stats.dropped++;return false;}
  let buffer=this.effects.get(packet.key);if(!buffer){const pcm=synthEffect(design);buffer=c.createBuffer(1,pcm.length,22050);buffer.getChannelData(0).set(pcm);this.effects.set(packet.key,buffer);}
  const source=c.createBufferSource(),gain=c.createGain(),pan=c.createStereoPanner?.();source.buffer=buffer;source.connect(gain);if(pan){gain.connect(pan);pan.pan.value=packet.player===0?-.22:packet.player===1?.22:0;pan.connect(this.sfxGain);}else gain.connect(this.sfxGain);
  const voice={source,gain,pan,priority:design.priority||0};source.onended=()=>{source.disconnect();gain.disconnect();pan?.disconnect();this.voices=this.voices.filter(x=>x!==voice);};source.start();this.voices.push(voice);this.cooldown.set(group,now);this.stats.played++;this.stats.peakVoices=Math.max(this.stats.peakVoices,this.voices.length);this.recent.push({key:packet.key,id:packet.id||null,player:packet.player??null,time:now});if(this.recent.length>32)this.recent.shift();return true;
 }
 status(){const n=this.current,time=n?this.position(n):this.offsets[this.scene];return {name:AUDIO_SCORE[this.scene].title,scene:this.scene,state:this.state,error:this.error,playing:!!n&&this.wanted()&&this.ctx?.state==='running',currentTime:time,time,duration:AUDIO_SCORE[this.scene].duration,loop:true,loopCount:n?Math.floor((n.offset+Math.max(0,this.ctx.currentTime-n.started))/n.buffer.duration):0,context:this.ctx?.state||'not-started',musicNodes:this.musicNodes.size,activeVoices:this.voices.length,settings:{...this.settings},stats:{...this.stats},recent:this.recent.map(x=>({...x}))};}
 dispose(){this.disposed=true;this.generation++;for(const n of [...this.musicNodes])this.stopMusic(n,0);this.stopEffects();this.ctx?.close();this.buffers.clear();this.effects.clear();this.state='disposed';}
}
