// Pure admission policy over actual Engine fighters; no resource/state writes.
const selfOnly=new Set(['centaur_stampede','legion_commander_press_the_attack','oracle_false_promise','magnataur_empower','snapfire_firesnap_cookie','snapfire_lil_shredder']);
const targeted=new Set(['centaur_double_edge','bristleback_viscous_nasal_goo','skywrath_mage_arcane_bolt','skywrath_mage_concussive_shot','skywrath_mage_ancient_seal','legion_commander_duel','oracle_fortunes_end','oracle_fates_edict','oracle_purifying_flames']);
export function validateAim(e,f,a,options={}){
 if(e.fighters[f.i]!==f||!a?.mvp)return {ok:false,reason:'invalid_actor_or_ability'};
 if(options.self===true&&!selfOnly.has(a.id)&&!['oracle_fortunes_end','oracle_fates_edict','oracle_purifying_flames'].includes(a.id))return {ok:false,reason:'invalid_self_target'};
 const t=e.fighters[1-f.i],self=selfOnly.has(a.id)||options.self===true;
 if(self)return {ok:f.hp>0,target:f.i,reason:f.hp>0?null:'dead_self'};
 const aim=options.aim??t.x,ground=['skywrath_mage_mystic_flare','snapfire_mortimer_kisses','magnataur_skewer'].includes(a.id);
 if(ground){if(!Number.isFinite(aim)||aim<45||aim>1155||Math.abs(aim-f.x)>a.mvp.range_wu+22)return {ok:false,reason:'invalid_aim'};if(a.id==='snapfire_mortimer_kisses'&&Math.abs(aim-f.x)<a.official.params.min_range*.55)return {ok:false,reason:'minimum_range'};}
 if(targeted.has(a.id)&&(t.hp<=0||t.invuln>0||Math.abs(t.x-f.x)>a.mvp.range_wu+22))return {ok:false,reason:'invalid_target'};
 return {ok:true,target:t.i,aim};
}
