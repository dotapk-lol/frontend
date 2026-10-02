// Original DOTA DUEL score. No recordings, samples, MIDI imports or borrowed melodies.
// Deterministic additive/FM percussion + scored voices; render tails modulo loop length.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),SR=22050,TAU=2*Math.PI;
const hz=n=>440*2**((n-69)/12);const specs=[{id:'menu',title:'黑曜之门',bpm:92,bars:16,seed:37109},{id:'battle',title:'灰烬擂台',bpm:126,bars:16,seed:82117}];
function render(spec){const beat=60/spec.bpm,N=Math.round(spec.bars*4*beat*SR),L=new Float64Array(N),R=new Float64Array(N);let seed=spec.seed;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296)*2-1;
 function voice(at,dur,note,amp,pan,kind='pluck'){const start=Math.round(at*beat*SR),len=Math.round(dur*beat*SR),f=hz(note),gl=Math.sqrt((1-pan)/2)*amp,gr=Math.sqrt((1+pan)/2)*amp;let low=0;
  for(let k=0;k<len;k++){const t=k/SR,x=k/len,attack=Math.min(1,t/(kind==='pad'?.16:.008)),release=Math.min(1,(len-k)/SR/.09);let y=0,env=attack*release;
   if(kind==='pad'){env*=Math.sin(Math.PI*x)**.7;for(let h=1;h<=6;h++)y+=Math.sin(TAU*f*h*t+Math.sin(TAU*.31*t)*.06)*(.6/h**1.7);y+=.1*Math.sin(TAU*f*1.003*t);}
   else if(kind==='bass'){env*=Math.exp(-2.8*x);y=.72*Math.sin(TAU*f*t)+.2*Math.sin(TAU*f*2*t)+.08*Math.sin(TAU*f*3*t);}
   else if(kind==='bell'){env*=Math.exp(-4.5*x);y=.65*Math.sin(TAU*f*t+1.4*Math.exp(-6*x)*Math.sin(TAU*f*2*t))+.2*Math.sin(TAU*f*3.01*t)*Math.exp(-3*x);}
   else if(kind==='horn'){env*=Math.sin(Math.PI*Math.min(1,x*1.5))*.65+.35;for(let h=1;h<=8;h++)y+=Math.sin(TAU*f*h*t)/h**1.35; y*=.55;}
   else {env*=Math.exp(-5*x);y=.6*Math.sin(TAU*f*t+1.7*Math.exp(-6*x)*Math.sin(TAU*f*2*t))+.14*Math.sin(TAU*f*3*t);}
   const i=(start+k)%N;L[i]+=y*env*gl;R[i]+=y*env*gr;
  }
 }
 function drum(at,kind,amp,pan=0){const start=Math.round(at*beat*SR),dur=kind==='hat'?.1:kind==='snare'?.22:kind==='cymbal'?.8:.7,len=Math.round(dur*SR);let phase=0,low=0,prev=0;
  for(let k=0;k<len;k++){const t=k/SR,x=k/len,n=rnd();low+=.18*(n-low);const high=n-low;let y;
   if(kind==='hat')y=high*Math.exp(-t*48)*.6;
   else if(kind==='snare')y=(.65*high+.25*Math.sin(TAU*180*t))*Math.exp(-t*18);
   else if(kind==='cymbal')y=(high*.7+.08*Math.sin(TAU*3217*t)+.05*Math.sin(TAU*4739*t))*Math.exp(-t*6);
   else {const f=(kind==='tom'?125:86)*Math.exp(-t*9)+42;phase+=TAU*f/SR;y=(Math.sin(phase)*.7+low*.3)*Math.exp(-t*(kind==='tom'?9:6));}
   y*=Math.min(1,k/(SR*.003))*Math.min(1,(len-k)/(SR*.025))*amp;const i=(start+k)%N;L[i]+=y*Math.sqrt((1-pan)/2);R[i]+=y*Math.sqrt((1+pan)/2);
  }
 }
 const roots=[38,38,34,36,38,41,34,33,38,36,34,33,41,36,34,33];
 const motifs=[[0,7,10,14,12,7],[0,3,7,10,7,3],[0,7,12,15,14,7],[0,4,7,11,7,4]];
 for(let bar=0;bar<16;bar++){const rootNote=roots[bar],at=bar*4,section=Math.floor(bar/4),major=[34,36,41,33].includes(rootNote),third=major?4:3;
  for(const [j,interval] of [0,third,7,14].entries())voice(at,4.8,rootNote+12+interval,spec.id==='menu'?.13:.085,(j-1.5)*.38,'pad');
  voice(at,3.7,rootNote-12,.13,0,'bass');
  if(spec.id==='menu'){
   const notes=motifs[bar%4];for(let k=0;k<6;k++)voice(at+[0,.75,1.5,2.25,3,3.5][k],.8,rootNote+24+notes[k],.085+(section===2?.03:0),Math.sin(k*1.5)*.6,'pluck');
   if(bar%2===0)voice(at+.5,3,rootNote+36+(bar%4===0?7:third),.065,.45,'bell');
   drum(at,'kick',.10);if(section!==0){drum(at+2,'tom',.1,-.3);drum(at+3.5,'hat',.04,.4);}if(bar%4===3){drum(at+3,'tom',.09,.4);drum(at+3.5,'tom',.08,-.4);}
  }else{
   for(let k=0;k<8;k++)voice(at+k*.5,.42,rootNote+(k%4===3?7:0),.16+(k%2?-.03:0),k%2?.1:-.1,'bass');
   for(const b of [0,1.5,2,3.5])drum(at+b,'kick',section===3?.28:.23);
   for(const b of [1,3])drum(at+b,'snare',.17,-.12);
   for(let k=0;k<8;k++)drum(at+k*.5,'hat',k%2?.06:.045,.45);
   const motif=motifs[(bar+section)%4];for(let k=0;k<6;k++)voice(at+[0,.5,1.25,2,2.75,3.5][k],.7,rootNote+24+motif[k],section===0?.08:.125,Math.sin(k)*.45,'pluck');
   if(section>=1&&bar%2===0)for(const iv of [0,7])voice(at+.5,2.5,rootNote+12+iv,.09,iv?-.28:.28,'horn');
   if(section===2)voice(at+1.5,2.3,rootNote+36+(bar%2?third:7),.07,-.45,'bell');
   if(bar%4===3){for(let k=0;k<4;k++)drum(at+3+k*.25,'tom',.12+k*.018,(k-1.5)*.3);}if(bar%4===0)drum(at,'cymbal',.1,.35);
  }
 }
 // Circular multi-tap room: tails wrap into the head instead of a silent seam.
 const dryL=L.slice(),dryR=R.slice();for(const [seconds,gain] of [[.089,.16],[.173,.12],[.281,.09],[.419,.055]]){const delay=Math.round(seconds*SR);for(let i=0;i<N;i++){const j=(i-delay+N)%N;L[i]+=dryR[j]*gain;R[i]+=dryL[j]*gain;}}
 // Remove DC; gently bridge endpoint sample values over 128 samples, retaining rhythm/tails.
 for(const a of [L,R]){let mean=0;for(const v of a)mean+=v;mean/=N;for(let i=0;i<N;i++)a[i]-=mean;const target=(a[0]+a[N-1])/2,d0=target-a[0],d1=target-a[N-1];for(let i=0;i<128;i++){const w=.5+.5*Math.cos(Math.PI*i/128);a[i]+=d0*w;a[N-1-i]+=d1*w;}}
 let peak=0,energy=0;for(let i=0;i<N;i++){peak=Math.max(peak,Math.abs(L[i]),Math.abs(R[i]));energy+=L[i]**2+R[i]**2;}const gain=.68/peak;const b=Buffer.alloc(44+N*4);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(2,22);b.writeUInt32LE(SR,24);b.writeUInt32LE(SR*4,28);b.writeUInt16LE(4,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(N*4,40);for(let i=0;i<N;i++){b.writeInt16LE(Math.round(L[i]*gain*32767),44+i*4);b.writeInt16LE(Math.round(R[i]*gain*32767),46+i*4);}
 return {buffer:b,meta:{...spec,sampleRate:SR,channels:2,frames:N,duration:N/SR,peak:.68,rms:Math.sqrt(energy/(N*2))*gain,seamJump:Math.max(Math.abs(L[0]-L[N-1]),Math.abs(R[0]-R[N-1]))*gain,sections:['call','pulse','lift','return'],sha256:createHash('sha256').update(b).digest('hex')}};
}
fs.mkdirSync(path.join(root,'assets/audio'),{recursive:true});const manifest={origin:'Original algorithmic composition for DOTA DUEL; no third-party recordings or melodies.',renderer:'scripts/render-audio.mjs',tracks:{}};for(const s of specs){const {buffer,meta}=render(s);fs.writeFileSync(path.join(root,'assets/audio',s.id+'.wav'),buffer);manifest.tracks[s.id]={...meta,src:'assets/audio/'+s.id+'.wav'};}fs.writeFileSync(path.join(root,'assets/audio/manifest.json'),JSON.stringify(manifest,null,2)+'\n');fs.writeFileSync(path.join(root,'src/audio-score.js'),'export const AUDIO_SCORE='+JSON.stringify(manifest.tracks)+';\n');console.log(JSON.stringify(manifest));
