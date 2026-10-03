// One authoritative HP lifecycle. Ledgers contain already-mitigated amounts,
// never a second combat simulation. Active only when a pack requests it.
const hpFinite=(n,label)=>{if(!Number.isFinite(n)||n<0)throw Error('Invalid '+label);return n;};
const hpActor=i=>{if(i!==0&&i!==1)throw Error('Invalid HP actor');return i;};
const hpCopy=v=>JSON.parse(JSON.stringify(v));
const hpCause=(cause,target)=>{hpActor(target);if(!cause||!['damage','deferred','external'].includes(cause.kind)||cause.source!==null&&cause.source!==0&&cause.source!==1||typeof cause.abilityId!=='string'||cause.abilityId.length>128||cause.attackId!==null&&!Number.isSafeInteger(cause.attackId)||cause.target!==undefined&&cause.target!==target||cause.kind==='deferred'&&(!Number.isSafeInteger(cause.ledgerId)||cause.ledgerId<1))throw Error('Invalid HP cause');return {...cause,target};};
const hpState=e=>e.packCore??={version:1,ledgerSeq:0,deathSeq:0,life:[0,0],dead:[false,false],causes:[null,null],deaths:[],ledgers:[]};
const hpLiveLedgers=(e,f)=>e.packCore?.ledgers.filter(l=>l.target===f.i&&l.phase==='capture'&&e.t<l.until-1e-8).sort((a,b)=>a.priority-b.priority||a.id-b.id)||[];
const hpFallbackCause=(l)=>({kind:'deferred',source:l.owner,target:l.target,abilityId:l.abilityId,attackId:null,ledgerId:l.id});
// Conservation is about scheduled resolved HP amounts, not only actual debits:
// overkill, nonlethal caps and missing-health caps may consume debt without damage/heal.
const hpLedgerConserved=l=>{
 const netDamage=Math.max(0,l.damage-l.healing),netChip=Math.max(0,l.chip-Math.max(0,l.healing-l.damage)),netHeal=Math.max(0,l.healing-l.damage-l.chip);
 const eps=1e-7*Math.max(1,l.damage+l.chip+l.healing),near=(a,b)=>Math.abs(a-b)<=eps;
 const untouched=l.remainingDamage===0&&l.remainingChip===0&&l.remainingHeal===0&&l.actualDamage===0&&l.actualHeal===0&&l.repayElapsed===0&&l.lastRepayAt===null;
 if(l.phase==='capture')return untouched;
 if(l.phase==='cancelled'&&untouched)return true;
 const factor=l.repayDuration>0?Math.max(0,1-l.repayElapsed/l.repayDuration):(l.lastRepayAt===null?1:0);
 if(!near(l.remainingDamage,netDamage*factor)||!near(l.remainingChip,netChip*factor)||!near(l.remainingHeal,netHeal*factor))return false;
 if(l.actualDamage>netDamage+netChip-l.remainingDamage-l.remainingChip+eps||l.actualHeal>netHeal-l.remainingHeal+eps)return false;
 if(l.lastRepayAt===null&&(l.actualDamage>0||l.actualHeal>0||l.repayElapsed>0))return false;
 return true;
};
export const PackHP={
 enable(e){return hpState(e);},
 syncLife(e){if(!e.packCore)return;for(const f of e.fighters)if(f.hp>0&&e.packCore.dead[f.i]){e.packCore.life[f.i]++;e.packCore.dead[f.i]=false;e.packCore.causes[f.i]=null;}},
 begin(e,f,{owner,abilityId,duration,damageFraction=1,deferHealing=false,healingMultiplier=1,repayDuration=0,nonlethal=false,priority=0}={}){
  if(e.fighters[f?.i]!==f||f.hp<=0)throw Error('Invalid deferred HP target');hpActor(owner);for(const [key,value]of Object.entries({duration,damageFraction,healingMultiplier,repayDuration}))hpFinite(value,key);
  if(duration<=0||damageFraction>1||typeof deferHealing!=='boolean'||typeof nonlethal!=='boolean'||!Number.isFinite(priority)||typeof abilityId!=='string'||!abilityId||abilityId.length>128)throw Error('Invalid deferred HP contract');
  const state=hpState(e);this.syncLife(e);if(state.ledgers.filter(l=>!['settled','cancelled'].includes(l.phase)).length>=16)throw Error('Deferred HP capacity');
  if(state.ledgers.length>=64){const index=state.ledgers.findIndex(l=>['settled','cancelled'].includes(l.phase));if(index<0)throw Error('Deferred HP capacity');state.ledgers.splice(index,1);}
  const ledger={id:++state.ledgerSeq,owner,target:f.i,life:state.life[f.i],abilityId,until:e.t+duration,damageFraction,deferHealing,healingMultiplier,repayDuration,nonlethal,priority,phase:'capture',damage:0,chip:0,healing:0,lastCause:null,lastChipCause:null,remainingDamage:0,remainingChip:0,remainingHeal:0,repayElapsed:0,actualDamage:0,actualHeal:0,lastRepayAt:null};state.ledgers.push(ledger);return ledger.id;
 },
 captureDamage(e,event){if(!e.packCore||event.damage<=0)return 0;let captured=0;for(const ledger of hpLiveLedgers(e,event.target)){const n=event.damage*ledger.damageFraction;if(n<=0)continue;const cause=hpCause({kind:'damage',source:event.attacker.i,abilityId:event.info.skill||'',attackId:event.attackId??null},event.target.i);if(ledger.nonlethal||event.guard||event.m.chip){ledger.chip+=n;ledger.lastChipCause=cause;}else{ledger.damage+=n;ledger.lastCause=cause;}captured+=n;event.damage-=n;}return captured;},
 captureHeal(e,f,amount){const ledger=hpLiveLedgers(e,f).find(l=>l.deferHealing);if(!ledger||amount<=0)return 0;ledger.healing+=amount*ledger.healingMultiplier;return amount;},
 noteDamage(e,f,source,info={},actual=0){if(!e.packCore||actual<=0)return;if(f.hp<=0)e.packCore.causes[f.i]=hpCause({kind:'damage',source,abilityId:info.skill||'',attackId:info.attackId??null},f.i);},
 settle(e,id,{dt=1/60,force=false}={}){
  hpFinite(dt,'settlement dt');if(dt>.05||typeof force!=='boolean')throw Error('Invalid HP settlement step');const l=e.packCore?.ledgers.find(l=>l.id===id);if(!l)return {status:'unknown',actualDamage:0,actualHeal:0};if(l.phase==='settled'||l.phase==='cancelled')return {status:l.phase,actualDamage:0,actualHeal:0};const f=e.fighters[l.target];
  if(f.hp<=0||e.packCore.life[l.target]!==l.life){l.phase='cancelled';return {status:'cancelled',actualDamage:0,actualHeal:0};}if(l.phase==='capture'&&!force&&e.t<l.until-1e-8)return {status:'capturing',actualDamage:0,actualHeal:0};
  if(l.phase==='capture'){l.phase='repay';let heal=l.healing;const normalOffset=Math.min(heal,l.damage);l.remainingDamage=l.damage-normalOffset;heal-=normalOffset;const chipOffset=Math.min(heal,l.chip);l.remainingChip=l.chip-chipOffset;heal-=chipOffset;l.remainingHeal=heal;}
  if(f.invuln>0)return {status:'invulnerable',actualDamage:0,actualHeal:0};
  if(l.lastRepayAt===e.t)return {status:'already_processed',actualDamage:0,actualHeal:0};l.lastRepayAt=e.t;
  const remainingTime=Math.max(0,l.repayDuration-l.repayElapsed),fraction=l.repayDuration>0?Math.min(1,remainingTime>1e-8?dt/remainingTime:1):1;
  const normal=l.remainingDamage*fraction,chip=l.remainingChip*fraction,heal=l.remainingHeal*fraction;l.remainingDamage-=normal;l.remainingChip-=chip;l.remainingHeal-=heal;l.repayElapsed=Math.min(l.repayDuration,l.repayElapsed+dt);
  const before=f.hp;let credit=Math.min(f.maxHp-f.hp,heal);f.hp+=credit;const debit=Math.min(f.hp,normal);f.hp-=debit;const chipDebit=Math.min(Math.max(0,f.hp-1),chip);f.hp-=chipDebit;const actual=debit+chipDebit;l.actualDamage+=actual;l.actualHeal+=credit;
  const cause={...(debit>0?l.lastCause:l.lastChipCause)||hpFallbackCause(l),kind:'deferred',ledgerId:l.id};if(actual>0){f.receivedDamage+=actual;f.cleanseDamage+=actual;f.lastDamageTime=e.t;if(cause.source!==null)e.fighters[cause.source].damage+=actual;e.fx('text',f.x,f.y+165,'#fff1ce',{amount:actual,kind:'damage',target:f.i});}if(credit>0)e.fx('text',f.x,f.y+190,'#91f4b1',{amount:credit,kind:'heal',target:f.i});if(before>0&&f.hp<=0)e.packCore.causes[f.i]=hpCause(cause,f.i);
  if(l.remainingDamage+l.remainingChip+l.remainingHeal<1e-8){l.remainingDamage=0;l.remainingChip=0;l.remainingHeal=0;l.phase='settled';}
  const result={status:l.phase,ledgerId:l.id,target:f.i,actualDamage:actual,actualHeal:credit,cause};if(actual>0||credit>0){e.log('hp_settlement',f.i,{ledgerId:l.id,actualDamage:actual,actualHeal:credit,cause});e.packCombat.hpSettled(e,hpCopy(result));}return result;
 },
 tick(e,dt){if(!e.packCore)return;for(const l of [...e.packCore.ledgers])if(!['settled','cancelled'].includes(l.phase))this.settle(e,l.id,{dt});},
 deaths(e){if(!e.packCore)return;const state=e.packCore;for(const f of e.fighters){if(f.hp>0){if(state.dead[f.i]){state.life[f.i]++;state.dead[f.i]=false;state.causes[f.i]=null;}continue;}if(state.dead[f.i])continue;state.dead[f.i]=true;const cause=state.causes[f.i]||{kind:'external',source:null,target:f.i,abilityId:'',attackId:null};const event={id:++state.deathSeq,actor:f.i,life:state.life[f.i],at:e.t,cause:hpCopy(cause)};state.deaths.push(event);if(state.deaths.length>32)state.deaths.shift();for(const l of state.ledgers)if(l.target===f.i&&!['settled','cancelled'].includes(l.phase))l.phase='cancelled';e.log('death',f.i,{deathId:event.id,cause:event.cause});e.packCombat.death(e,hpCopy(event));}},
 validate(g){const s=g.packCore;if(s===undefined||s===null)return true;try{if(s.version!==1||![s.ledgerSeq,s.deathSeq].every(n=>Number.isSafeInteger(n)&&n>=0)||!Array.isArray(s.ledgers)||s.ledgers.length>64||!Array.isArray(s.deaths)||s.deaths.length>32||![s.life,s.dead,s.causes].every(a=>Array.isArray(a)&&a.length===2)||!s.life.every(n=>Number.isSafeInteger(n)&&n>=0)||!s.dead.every(n=>typeof n==='boolean'))return false;for(let i=0;i<2;i++)if(s.causes[i])hpCause(s.causes[i],i);const ids=new Set();for(const l of s.ledgers){if(!Number.isSafeInteger(l.id)||l.id<1||l.id>s.ledgerSeq||ids.has(l.id))return false;ids.add(l.id);hpActor(l.owner);hpActor(l.target);for(const key of ['life','until','damageFraction','healingMultiplier','repayDuration','damage','chip','healing','remainingDamage','remainingChip','remainingHeal','repayElapsed','actualDamage','actualHeal'])hpFinite(l[key],key);if(!Number.isSafeInteger(l.life)||l.life>s.life[l.target]||l.phase==='settled'&&l.remainingDamage+l.remainingChip+l.remainingHeal>1e-8||l.lastRepayAt!==null&&(!Number.isFinite(l.lastRepayAt)||l.lastRepayAt<0)||l.damageFraction>1||l.repayElapsed>l.repayDuration+1e-8||typeof l.deferHealing!=='boolean'||typeof l.nonlethal!=='boolean'||!Number.isFinite(l.priority)||typeof l.abilityId!=='string'||l.abilityId.length>128||!['capture','repay','settled','cancelled'].includes(l.phase))return false;if(!hpLedgerConserved(l))return false;if(l.lastCause)hpCause(l.lastCause,l.target);if(l.lastChipCause)hpCause(l.lastChipCause,l.target);}for(const d of s.deaths){hpActor(d.actor);hpFinite(d.at,'death time');if(!Number.isSafeInteger(d.id)||d.id<1||d.id>s.deathSeq||!Number.isSafeInteger(d.life)||d.life<0)return false;hpCause(d.cause,d.actor);}return true;}catch{return false;}},
};
