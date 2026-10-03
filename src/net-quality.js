// A missing RTT rule is intentionally fail-closed until the owner confirms it.
export const DEFAULT_NET_POLICY = {direction:null,rttMs:null,jitterMs:30,lossPct:5,minSamples:24,window:30,maxAgeMs:3000};
export function validPolicy(p){return !!p&&['above','below'].includes(p.direction)&&Number.isFinite(p.rttMs)&&p.rttMs>=1&&p.rttMs<=2000&&p.jitterMs===30&&p.lossPct===5&&p.minSamples===24&&p.window===30&&p.maxAgeMs===3000;}
const percentile=(a,p)=>a.length?[...a].sort((x,y)=>x-y)[Math.min(a.length-1,Math.ceil(a.length*p)-1)]:null;
export function summarizeProbes(rows,now){const done=rows.filter(x=>x.rtt!==null||now-x.sent>=1200).slice(-30),ok=done.filter(x=>Number.isFinite(x.rtt)&&x.rtt>=0),rtts=ok.map(x=>x.rtt),delta=rtts.slice(1).map((x,i)=>Math.abs(x-rtts[i]));return {samples:done.length,received:ok.length,median:percentile(rtts,.5),p95:percentile(rtts,.95),jitter:percentile(delta,.95),loss:done.length?100*(done.length-ok.length)/done.length:100,last:ok.length?Math.max(...ok.map(x=>x.received)):null};}
export function validQuality(q){return !!q&&Number.isInteger(q.samples)&&q.samples>=0&&q.samples<=30&&Number.isInteger(q.received)&&q.received>=0&&q.received<=q.samples&&[q.p95,q.median,q.jitter].every(x=>x===null||(Number.isFinite(x)&&x>=0&&x<1200))&&Number.isFinite(q.loss)&&q.loss>=0&&q.loss<=100;}
export function qualityDecision(q,p,age=0){if(!validPolicy(p))return {ok:false,reason:'尚未确认RTT规则'};if(!validQuality(q))return {ok:false,reason:'检测数据无效'};if(q.samples<p.minSamples||q.received<2)return {ok:false,reason:'正在采集连接质量'};if(!Number.isFinite(age)||age>p.maxAgeMs)return {ok:false,reason:'检测结果已过期'};if(![q.p95,q.median,q.jitter,q.loss].every(Number.isFinite))return {ok:false,reason:'检测数据无效'};if(p.direction==='above'?q.p95>p.rttMs:q.p95<p.rttMs)return {ok:false,reason:'RTT不符合开战规则'};if(q.jitter>p.jitterMs)return {ok:false,reason:'延迟抖动过大'};if(q.loss>p.lossPct)return {ok:false,reason:'探测丢包过多'};return {ok:true,reason:'连接质量合格'};}
export class ProbeWindow{
 constructor(){this.rows=[];this.seq=0;}
 sent(now){const row={id:++this.seq,sent:now,rtt:null,received:null};this.rows.push(row);if(this.rows.length>36)this.rows.shift();return row.id;}
 pong(id,now){const row=this.rows.find(x=>x.id===id);if(!row||row.rtt!==null||now-row.sent>=1200)return false;row.rtt=now-row.sent;row.received=now;return true;}
 summary(now){return summarizeProbes(this.rows,now);}
}
