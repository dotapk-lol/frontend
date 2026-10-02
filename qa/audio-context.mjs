// Small clocked Web Audio test double. Browser decoding/listening is a separate acceptance step.
export class TestAudioContext{
 constructor(){this.state='suspended';this.currentTime=0;this.destination={};this.nodes=[];this.sources=[];this.resumeCalls=0;this.decodeCalls=0;}
 param(value=0){return {value,cancelScheduledValues(){},setValueAtTime(v){this.value=v;},setTargetAtTime(v){this.value=v;},linearRampToValueAtTime(v){this.value=v;}};}
 node(extra={}){const n={connections:[],disconnected:false,connect(to){this.connections.push(to);},disconnect(){this.disconnected=true;this.connections=[];},...extra};this.nodes.push(n);return n;}
 createGain(){return this.node({gain:this.param(1)});}
 createStereoPanner(){return this.node({pan:this.param()});}
 createDynamicsCompressor(){return this.node(Object.fromEntries(['threshold','knee','ratio','attack','release'].map(k=>[k,this.param()])));}
 createBuffer(channels,length,sampleRate){const data=Array.from({length:channels},()=>new Float32Array(length));return {duration:length/sampleRate,length,sampleRate,getChannelData:i=>data[i]};}
 createBufferSource(){const c=this,n=this.node({loop:false,started:false,start(at=c.currentTime,offset=0){if(this.started)throw Error('source started twice');this.started=true;this.at=at;this.offset=offset;},stop(at=c.currentTime){this.stopAt=at;}});this.sources.push(n);return n;}
 async decodeAudioData(bytes){this.decodeCalls++;return {duration:new DataView(bytes).getFloat64(0)};}
 async resume(){this.resumeCalls++;this.state='running';}
 async close(){this.state='closed';}
 advance(seconds){this.currentTime+=seconds;for(const n of this.sources){if(!n.ended&&n.started&&(n.stopAt<=this.currentTime||!n.loop&&n.at+n.buffer.duration<=this.currentTime)){n.ended=true;n.onended?.();}}}
}
export function fakeAudioFetch(){const requests=[];return {requests,fetcher:async(url)=>{requests.push(url);const bytes=new ArrayBuffer(8);new DataView(bytes).setFloat64(0,url.includes('menu')?41.73913832199546:30.476190476190474);return {ok:true,arrayBuffer:async()=>bytes};}};}
