// Explicit arena adapters, separate from executable hero code. No inferred polarity.
// Valve website snapshot 2026-10-02: dispellable 1=strong, 2=basic, 3=none.
// The zero value does not declare a removable modifier. Toggle/innate/internal
// markers are retained even when an ability's *enemy debuff* is dispellable.
const positive=(tier,negativeKeys=[])=>Object.freeze({polarity:'positive',tier,negativeKeys:Object.freeze(negativeKeys)});
const negative=tier=>Object.freeze({polarity:'negative',tier,negativeKeys:Object.freeze([])});
export const LEGACY_STATUS_POLICY=Object.freeze({
 juggernaut_blade_fury:positive('none'),pudge_rot:positive('none'),pudge_meat_shield:positive('none'),
 sniper_take_aim:positive('basic',['self_slow']),anti_mage_counterspell:positive('basic'),
 drow_ranger_frost:positive('none'),earthshaker_totem:positive('basic'),mirana_moonlight:positive('none'),
 sven_warcry:positive('basic'),sven_strength:positive('none'),windranger_windrun:positive('basic'),
 windranger_focus:positive('none'),shadow_fiend_feast:positive('basic'),tidehunter_shell:positive('none'),
 phantom_assassin_strike:positive('basic'),witch_doctor_restoration:positive('none'),
 fiery:positive('none'),overload:positive('basic'),leapSpeed:positive('basic'),
 // Arena-only reward/form/proc markers; they are not an official purge promise.
 counterReward:positive('none'),lionForm:positive('none'),deadlyFocus:positive('none'),helix_cd:positive('none'),
 vulnerable:negative('basic'),weak:negative('basic'),raze:negative('basic'),
});
export function legacyBuffPolicy(e,f,b){
 let key=b.key;
 if(key==='counter'){if(b.m.counter_type)return null;key=e.hero(f.i).id==='anti_mage'?'anti_mage_counterspell':null;}
 if(key==='aura')key=e.hero(f.i).id==='juggernaut'?'juggernaut_blade_fury':e.hero(f.i).id==='pudge'?'pudge_rot':null;
 return LEGACY_STATUS_POLICY[key]||null;
}
export const LEGACY_TIMER_POLICY=Object.freeze({root:'basic',silence:'basic',slow:'basic',stun:'strong',hex:'strong',fear:'strong',taunt:'none'});
export const LEGACY_DOT_POLICY=Object.freeze({crystal_maiden_frostbite:'basic',axe_hunger:'basic',queen_of_pain_shadow_strike:'basic',witch_doctor_maledict:'none',queen_of_pain_sonic:'none'});
export const INVULNERABLE_DISPEL_ABILITIES=Object.freeze(['oracle_fortunes_end']);
