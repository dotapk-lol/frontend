// Slow strength is a live read projection, independent of duration admission.
// Raw authored status values and clocks remain canonical in every saved frame.
const actor=(e,f)=>{if(!f||![0,1].includes(f.i)||e.fighters[f.i]!==f)throw Error('Invalid slow actor');};
const keyOK=s=>typeof s==='string'&&/^[a-z][a-z0-9_-]{0,127}$/.test(s)&&!['constructor','prototype','__proto__'].includes(s);
const contexts=new WeakMap();
const strengthKeys=new Set(['moveSlow','slow','attackSlow','aspd','attackSpeed','moveFlat','moveBonus']);
const positiveSlow=new Set(['moveSlow','slow','attackSlow']);
export const PackSlow={
 resistance(e,f){actor(e,f);let factor=1;for(const r of e.packCore?.slowResistance||[])if(r.target===f.i&&r.life>1e-8&&(!r.requiresPassives||e.fighters[r.source].hp>0&&e.passivesEnabled(e.fighters[r.source])))factor*=1-r.resistance;return 1-factor;},
 project(e,f,{magnitude,hostile=true,ignoreSlowResistance=false}={}){actor(e,f);if(!Number.isFinite(magnitude)||magnitude<0||typeof hostile!=='boolean'||typeof ignoreSlowResistance!=='boolean')throw Error('Invalid slow magnitude request');return magnitude*(hostile&&!ignoreSlowResistance?1-this.resistance(e,f):1);},
 value(e,f,status,key){actor(e,f);const n=status?.values?.[key];if(!Number.isFinite(n))throw Error('Invalid slow value');if(status.hostile!==true||!strengthKeys.has(key)||contexts.get(e)?.has(f)||!(positiveSlow.has(key)?n>0:n<0))return n;return n*(1-this.resistance(e,f));},
 register(e,f,{source,abilityId,key=abilityId,resistance,duration,dispel='none',requiresPassives=false,allowInvulnerable=false}={}){
  actor(e,f);if(![0,1].includes(source)||!keyOK(abilityId)||!keyOK(key)||!Number.isFinite(resistance)||resistance<0||resistance>1||!Number.isFinite(duration)||duration<=0||duration>3600||!['basic','strong','none'].includes(dispel)||typeof requiresPassives!=='boolean'||typeof allowInvulnerable!=='boolean')throw Error('Invalid slow resistance provider');
  if(f.hp<=0||f.invuln>0&&!allowInvulnerable)return null;
  const old=e.packCore?.slowResistance?.find(r=>r.target===f.i&&r.source===source&&r.key===key);if((e.packCore?.slowResistance?.length||0)>=64&&!old)throw Error('Slow resistance capacity');
  const state=e.enableHPLifecycle();state.slowResistance??=[];if(old)state.slowResistance=state.slowResistance.filter(r=>r!==old);const r={id:++e.seq,source,target:f.i,abilityId,key,resistance,duration,life:duration,dispel,requiresPassives};state.slowResistance.push(r);return r.id;
 },
 release(e,id){if(!Number.isSafeInteger(id)||id<1)throw Error('Invalid slow resistance identity');const s=e.packCore;if(!s?.slowResistance)return false;const n=s.slowResistance.length;s.slowResistance=s.slowResistance.filter(r=>r.id!==id);return n!==s.slowResistance.length;},
 advance(e,dt){if(!e.packCore?.slowResistance)return;for(const r of e.packCore.slowResistance)r.life=Math.max(0,r.life-dt);this.cleanup(e);},
 cleanup(e){if(e.packCore?.slowResistance)e.packCore.slowResistance=e.packCore.slowResistance.filter(r=>r.life>1e-8&&e.fighters[r.target].hp>0);},
 validate(g){const records=g.packCore?.slowResistance;if(records===undefined)return true;if(!Array.isArray(records)||records.length>64)return false;const ids=new Set(),keys=new Set();return records.every(r=>{const key=r.target+':'+r.source+':'+r.key;if(ids.has(r.id)||keys.has(key))return false;ids.add(r.id);keys.add(key);return Number.isSafeInteger(r.id)&&r.id>0&&r.id<=g.packClock?.seq&&[0,1].includes(r.source)&&[0,1].includes(r.target)&&keyOK(r.abilityId)&&keyOK(r.key)&&Number.isFinite(r.resistance)&&r.resistance>=0&&r.resistance<=1&&Number.isFinite(r.duration)&&r.duration>0&&r.duration<=3600&&Number.isFinite(r.life)&&r.life>0&&r.life<=r.duration+1e-8&&['basic','strong','none'].includes(r.dispel)&&typeof r.requiresPassives==='boolean';});},
 // Numeric movement/attack hooks in existing adapters sometimes read values
 // directly instead of api.value. Scope the same projection to those hooks and
 // restore every raw values object in finally. No duration or identity changes.
 withValues(e,f,fn){if(!e.packCore?.slowResistance?.length)return fn();actor(e,f);if(contexts.get(e)?.has(f)||this.resistance(e,f)===0)return fn();const saved=[];for(const state of Object.values(f.packModules||{}))for(const s of state.statuses||[]){if(s.hostile!==true||s.life<=1e-8)continue;const values={...s.values};let changed=false;for(const key of strengthKeys)if(Number.isFinite(values[key])){const value=this.value(e,f,s,key);if(value!==values[key]){values[key]=value;changed=true;}}if(changed){saved.push([s,s.values]);s.values=values;}}
  const set=contexts.get(e)||new Set();contexts.set(e,set);set.add(f);try{return fn();}finally{set.delete(f);if(!set.size)contexts.delete(e);for(const [s,values]of saved)s.values=values;}
 },
};
