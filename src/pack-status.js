import {legacyBuffPolicy,LEGACY_STATUS_POLICY,LEGACY_TIMER_POLICY,LEGACY_DOT_POLICY,INVULNERABLE_DISPEL_ABILITIES} from './legacy-status-policy.js';
import {PackControl} from './pack-control.js';
const actor=(e,f)=>{if(!f||![0,1].includes(f.i)||e.fighters[f.i]!==f)throw Error('Invalid status actor');};
const tierOK=(record,tier)=>record==='basic'||tier==='strong'&&record==='strong';
const keyOK=s=>typeof s==='string'&&/^[a-z][a-z0-9_-]{0,127}$/.test(s)&&!['constructor','prototype','__proto__'].includes(s);
const policyOK=o=>{if(!o||!['basic','strong'].includes(o.tier??'basic')||typeof (o.hostile??true)!=='boolean'||![0,1].includes(o.source)||!keyOK(o.abilityId)||typeof (o.allowInvulnerable??false)!=='boolean')throw Error('Invalid global dispel contract');if(o.allowInvulnerable&&!INVULNERABLE_DISPEL_ABILITIES.includes(o.abilityId))throw Error('Ability has no invulnerable dispel permission');};
const ref=(namespace,key,polarity,f,id)=>({namespace,key,polarity,target:f.i,...(id===undefined?{}:{id})});
const state=e=>{const s=e.enableHPLifecycle();s.statusResistance??=[];return s;};
// Only admitted effect durations change. Fixed periodic intervals/pulse amounts
// are unchanged: shorter DOTs can deal less total damage. No retroactive scaling.
export const PackStatus={
 resistance(e,f){actor(e,f);let factor=1;for(const r of e.packCore?.statusResistance||[])if(r.target===f.i&&r.life>1e-8&&(!r.requiresPassives||e.fighters[r.source].hp>0&&e.passivesEnabled(e.fighters[r.source])))factor*=1-r.resistance;return 1-factor;},
 project(e,f,{duration,hostile=true,ignoreStatusResistance=false}={}){actor(e,f);if(!Number.isFinite(duration)||duration<0||typeof hostile!=='boolean'||typeof ignoreStatusResistance!=='boolean')throw Error('Invalid status duration request');return duration*(hostile&&!ignoreStatusResistance?1-this.resistance(e,f):1);},
 register(e,f,{source,abilityId,key=abilityId,resistance,duration,dispel='none',requiresPassives=false,allowInvulnerable=false}={}){
  actor(e,f);if(![0,1].includes(source)||!keyOK(abilityId)||!keyOK(key)||!Number.isFinite(resistance)||resistance<0||resistance>1||!Number.isFinite(duration)||duration<=0||duration>3600||!['basic','strong','none'].includes(dispel)||typeof requiresPassives!=='boolean'||typeof allowInvulnerable!=='boolean')throw Error('Invalid status resistance provider');
  if(f.hp<=0||f.invuln>0&&!allowInvulnerable)return null;
  const old=e.packCore?.statusResistance?.find(r=>r.target===f.i&&r.source===source&&r.key===key);
  if((e.packCore?.statusResistance?.length||0)>=64&&!old)throw Error('Status resistance capacity');
  const s=state(e);if(old)s.statusResistance=s.statusResistance.filter(r=>r!==old);
  const r={id:++e.seq,source,target:f.i,abilityId,key,resistance,life:duration,duration,dispel,requiresPassives};s.statusResistance.push(r);return r.id;
 },
 release(e,id){if(!Number.isSafeInteger(id)||id<1)throw Error('Invalid status resistance identity');const s=e.packCore;if(!s?.statusResistance)return false;const n=s.statusResistance.length;s.statusResistance=s.statusResistance.filter(r=>r.id!==id);return n!==s.statusResistance.length;},
 advance(e,dt){if(!e.packCore?.statusResistance)return;for(const r of e.packCore.statusResistance)r.life=Math.max(0,r.life-dt);e.packCore.statusResistance=e.packCore.statusResistance.filter(r=>r.life>1e-8&&e.fighters[r.target].hp>0);},
 cleanup(e){if(e.packCore?.statusResistance)e.packCore.statusResistance=e.packCore.statusResistance.filter(r=>e.fighters[r.target].hp>0);},
 validate(g){
  if(!g.fighters.every(f=>{const fragments=(f.buffs||[]).filter(b=>b.key==='sniper_take_aim_negative');if(fragments.length>1)return false;return fragments.every(b=>Number.isFinite(b.life)&&b.life>0&&b.negativeLife===undefined&&b.statusPolarity===undefined&&b.m&&Object.keys(b.m).length===1&&Object.hasOwn(b.m,'self_slow')&&Number.isFinite(b.m.self_slow)&&b.m.self_slow>=0&&b.m.self_slow<=1&&!(f.buffs||[]).some(other=>other.key==='sniper_take_aim'&&Object.hasOwn(other.m,'self_slow')));} ))return false;
  if(!g.fighters.every(f=>(f.buffs||[]).every(b=>{const p=LEGACY_STATUS_POLICY[b.key];if(b.negativeLife!==undefined&&(!p?.negativeKeys.length||!Number.isFinite(b.negativeLife)||b.negativeLife<0||b.negativeLife>b.life+1e-8))return false;if(b.statusPolarity!==undefined&&(b.statusPolarity!=='negative'||!p?.negativeKeys.length||!Object.keys(b.m).length||Object.keys(b.m).some(k=>!p.negativeKeys.includes(k))))return false;return true;})))return false;
  const records=g.packCore?.statusResistance;if(records===undefined)return true;if(!Array.isArray(records)||records.length>64)return false;const ids=new Set(),keys=new Set();return records.every(r=>{const key=r.target+':'+r.source+':'+r.key;if(ids.has(r.id)||keys.has(key))return false;ids.add(r.id);keys.add(key);return Number.isSafeInteger(r.id)&&r.id>0&&r.id<=g.packClock?.seq&&[0,1].includes(r.source)&&[0,1].includes(r.target)&&keyOK(r.abilityId)&&keyOK(r.key)&&Number.isFinite(r.resistance)&&r.resistance>=0&&r.resistance<=1&&Number.isFinite(r.duration)&&r.duration>0&&r.duration<=3600&&Number.isFinite(r.life)&&r.life>0&&r.life<=r.duration+1e-8&&['basic','strong','none'].includes(r.dispel)&&typeof r.requiresPassives==='boolean';});
 },
 dispel(e,f,options){
  actor(e,f);policyOK(options);const {tier='basic',hostile=true,source,abilityId,allowInvulnerable=false}=options;
  if(f.hp<=0||f.invuln>0&&!allowInvulnerable)return [];
  const polarity=hostile?'negative':'positive',plan=[],after=[],controlIds=[];
  const add=(namespace,key,remove,id,onRemoved)=>{plan.push({ref:ref(namespace,key,polarity,f,id),remove});if(onRemoved)after.push(onRemoved);};
  // Namespace order is deterministic; removal commits before callbacks/procs.
  for(const namespace of Object.keys(f.packModules||{}).sort()){
   const s=f.packModules[namespace];for(const item of [...s.statuses||[]])if(item.life>1e-8&&item.hostile===hostile&&tierOK(item.dispel,tier))add(namespace,item.key,()=>{s.statuses=s.statuses.filter(v=>v!==item);});
  }
  for(const b of [...f.buffs]){
   const p=legacyBuffPolicy(e,f,b);if(!p||b.life<=1e-8||!tierOK(p.tier,tier))continue;
   const negatives=p.negativeKeys.filter(k=>Object.hasOwn(b.m,k)),currentPolarity=b.statusPolarity||p.polarity;
   if(currentPolarity===polarity)add('legacy',b.key,()=>{if(!hostile&&negatives.length){b.m=Object.fromEntries(negatives.map(k=>[k,b.m[k]]));b.statusPolarity='negative';}else{f.buffs=f.buffs.filter(v=>v!==b);if(b.key==='shadow_fiend_feast')f.souls=Math.max(0,f.souls-(b.collectedSouls||0));}});
   else if(hostile&&negatives.length)add('legacy',b.key+'_negative',()=>{for(const k of negatives)delete b.m[k];delete b.negativeLife;});
   else if(hostile&&b.statusPolarity==='negative')add('legacy',b.key+'_negative',()=>{f.buffs=f.buffs.filter(v=>v!==b);});
  }
  if(hostile){
   for(const [key,dispel]of Object.entries(LEGACY_TIMER_POLICY))if(f[key]>0&&tierOK(dispel,tier))add('legacy_timer',key,()=>{f[key]=0;if(key==='slow')f.slowPct=0;});
   for(const d of [...f.dots])if(tierOK(d.m.dispelTier??LEGACY_DOT_POLICY[d.id],tier))add('legacy_dot',d.id,()=>{f.dots=f.dots.filter(v=>v!==d);});
   for(const c of [...e.packCore?.controls||[]])if(c.target===f.i&&tierOK(c.dispel,tier)){controlIds.push(c.id);add('pack_control',c.key,()=>{},c.id);}
  }else for(const r of [...e.packCore?.statusResistance||[]])if(r.target===f.i&&tierOK(r.dispel,tier))add('pack_status_resistance',r.key,()=>{e.packCore.statusResistance=e.packCore.statusResistance.filter(v=>v!==r);},r.id);
  // Core4/custom data must declare polarity explicitly in trusted runtime hooks.
  for(const d of e.packCombat.dispelDescriptors(e,f)||[]){if(!d||!['positive','negative'].includes(d.polarity)||!['basic','strong','none'].includes(d.dispel)||typeof d.namespace!=='string'||typeof d.key!=='string'||typeof d.remove!=='function')throw Error('Invalid system dispel adapter');if(d.polarity===polarity&&tierOK(d.dispel,tier))add(d.namespace,d.key,d.remove,d.id,d.afterRemove);}
  if(plan.length)e.enableHPLifecycle();for(const p of plan)p.remove();const controls=PackControl.detach(e,controlIds,'dispelled');for(const c of controls)PackControl.announce(e,c);for(const callback of after)callback();
  const removed=plan.map(p=>p.ref);e.log('dispel_polarity',f.i,{tier,polarity,source,skill:abilityId,removed});e.packCombat.statusesDispelled(e,f,{tier,polarity,source,abilityId,removed});return removed;
 },
};
