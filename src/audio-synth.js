// Deterministic, band-limited in the useful range; no external audio samples.
export function synthEffect(design,sampleRate=22050){
 const kind=design.kind,ult=!!design.ultimate,v=design.variant||0,p=design.pitch||1;
 const duration=design.duration||(ult?1.1+(v%3)*.18:.32+(v%4)*.065),out=new Float32Array(Math.ceil(duration*sampleRate));
 let rng=(19191+v*7919)>>>0,low=0;
 const rand=()=>{rng^=rng<<13;rng^=rng>>>17;rng^=rng<<5;return (rng>>>0)/2147483648-1;};
 for(let i=0;i<out.length;i++){
  const t=i/sampleRate,u=t/duration,n=rand();low+=.12*(n-low);const high=n-low;
  const env=Math.min(1,t/.006)*Math.min(1,(duration-t)/.055),dec=Math.exp(-u*(ult?2.6:4.5));
  const tone=(f)=>Math.sin(2*Math.PI*f*p*t),sweep=(f,delta)=>Math.sin(2*Math.PI*p*(f*t+delta*t*t/(2*duration)));
  let x=0;
  switch(kind){
   case 'fire':x=.7*low*(.6+.4*Math.sin(t*57))+.23*high*Math.exp(-u*9)+.24*sweep(95,-55);break;
   case 'frost':x=.15*high+.26*tone(1109)+.2*tone(1480)+.16*tone(2093)*Math.exp(-u*7);break;
   case 'lightning':x=high*(.2+.6*Math.pow(Math.max(0,Math.sin(t*(ult?71:107))),8))+.22*sweep(65,-35)+.12*tone(1420)*Math.exp(-u*16);break;
   case 'slash':x=.8*high*Math.sin(Math.PI*Math.pow(u,.5))+.2*sweep(900,-750);break;
   case 'arrow':x=.65*high*Math.pow(Math.sin(Math.PI*u),2)+.2*sweep(1400,-1150);break;
   case 'earth':x=.75*low+.55*sweep(88,-56)+.12*tone(43);break;
   case 'metal':x=.32*tone(227)+.22*tone(613)+.14*tone(1289)+.3*high*Math.exp(-u*16);break;
   case 'shadow':x=.4*sweep(170,-110)+.2*tone(73)+.35*low*Math.sin(t*31);break;
   case 'poison':x=.6*low*(.5+.5*Math.sin(t*49))+.2*Math.sin(2*Math.PI*(210*t+4*Math.sin(t*30)));break;
   case 'burst':x=.55*sweep(330,-260)+.5*low+.25*high*Math.exp(-u*11);break;
   case 'heal':case 'star':case 'buff':{const notes=kind==='heal'?[523,659,784]:kind==='star'?[784,1175,1568]:[196,294,392];x=notes.reduce((s,f,j)=>s+.25*tone(f)*Math.max(0,1-Math.abs(u-j*.22)*2),0)+.09*low;break;}
   case 'move':case 'wind':x=.7*low*Math.sin(Math.PI*u)+.23*sweep(kind==='move'?620:1100,-440);break;
   case 'gun':x=.75*high*Math.exp(-u*19)+.6*sweep(125,-82)*Math.exp(-u*4)+.24*low;break;
   case 'water':x=.8*low+.18*Math.sin(2*Math.PI*(145*t+3*Math.sin(t*38)));break;
   case 'wood':x=.55*tone(280)*Math.exp(-u*8)+.24*tone(831)*Math.exp(-u*11)+.25*low;break;
   case 'hex':x=.28*sweep(760,-620)+.3*tone(191)*Math.sin(t*39)+.2*low;break;
   case 'flesh':x=.8*low*Math.exp(-u*7)+.5*sweep(130,-80);break;
   case 'fanfare':{const notes=[196,247,294,392];x=notes.reduce((s,f,j)=>{const q=t-j*duration*.17;return s+(q>0?.22*Math.sin(2*Math.PI*f*p*q)*Math.min(1,q/.02)*Math.exp(-q*1.8):0);},0)+.13*low*Math.exp(-u*8);break;}
  }
  // Ultimate signature: a different pulse count, lower impact and ringing interval per ability.
  if(ult){const pulse=Math.pow(Math.max(0,Math.sin(t*Math.PI*(4+v%5))),6);x=x*(.7+.5*pulse)+.22*tone(46+v%7*5)+.15*tone(220*Math.pow(2,(v%12)/12))*Math.exp(-u*2);}
  out[i]=x*env*dec;
 }
 let mean=0,peak=0;for(const x of out)mean+=x/out.length;
 for(let i=0;i<out.length;i++){out[i]-=mean*Math.sin(Math.PI*i/(out.length-1));peak=Math.max(peak,Math.abs(out[i]));}
 const gain=.72/Math.max(.72,peak);for(let i=0;i<out.length;i++)out[i]*=gain;
 out[0]=out[out.length-1]=0;return out;
}
