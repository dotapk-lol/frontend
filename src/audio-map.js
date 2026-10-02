import {PACK_AUDIO} from './pack-audio.js';
// Original sound designs. IDs are the actual engine ability IDs, not display names.
const AUDIO_DESIGNS={
 juggernaut:['slash','heal','slash','slash'],crystal_maiden:['frost','frost','heal','frost'],
 pudge:['metal','poison','earth','flesh'],axe:['metal','shadow','slash','earth'],
 sniper:['gun','gun','buff','gun'],anti_mage:['shadow','move','buff','burst'],
 phantom_assassin:['arrow','move','move','slash'],drow_ranger:['frost','wind','arrow','arrow'],
 lina:['fire','fire','fire','lightning'],lion:['earth','hex','shadow','burst'],
 earthshaker:['earth','metal','earth','earth'],mirana:['star','arrow','move','star'],
 sven:['metal','slash','buff','buff'],zeus:['lightning','lightning','move','lightning'],
 windranger:['wood','wind','wind','arrow'],shadow_fiend:['shadow','shadow','shadow','shadow'],
 storm_spirit:['lightning','wind','lightning','move'],queen_of_pain:['poison','move','burst','burst'],
 witch_doctor:['wood','heal','poison','wood'],tidehunter:['water','water','metal','water']
};
const AUDIO_SUFFIXES={juggernaut:['blade_fury','healing_ward','blade_dance','omnislash'],crystal_maiden:['nova','frostbite','aura','freezing_field'],pudge:['hook','rot','meat_shield','dismember'],axe:['call','hunger','helix','culling'],sniper:['shrapnel','headshot','take_aim','assassinate'],anti_mage:['mana_break','blink','counterspell','mana_void'],phantom_assassin:['dagger','strike','immaterial','coup'],drow_ranger:['frost','gust','multishot','marksmanship'],lina:['slave','array','fiery','laguna'],lion:['spike','hex','drain','finger'],earthshaker:['fissure','totem','aftershock','echo'],mirana:['starstorm','arrow','leap','moonlight'],sven:['hammer','cleave','warcry','strength'],zeus:['arc','bolt','jump','wrath'],windranger:['shackle','powershot','windrun','focus'],shadow_fiend:['raze','feast','presence','requiem'],storm_spirit:['remnant','vortex','overload','ball'],queen_of_pain:['shadow_strike','blink','scream','sonic'],witch_doctor:['cask','restoration','maledict','death_ward'],tidehunter:['gush','shell','anchor','ravage']};
const AUDIO_PASSIVES=new Set(['juggernaut_blade_dance','crystal_maiden_aura','axe_helix','sniper_headshot','anti_mage_mana_break','phantom_assassin_immaterial','phantom_assassin_coup','drow_ranger_marksmanship','lina_fiery','earthshaker_aftershock','sven_cleave','shadow_fiend_presence','storm_spirit_overload']);
export const SKILL_AUDIO=Object.freeze(Object.fromEntries(Object.entries(AUDIO_SUFFIXES).flatMap(([hero,ids],hi)=>ids.map((suffix,slot)=>[hero+'_'+suffix,Object.freeze({kind:AUDIO_DESIGNS[hero][slot],pitch:Math.pow(2,((hi*3+slot*5)%13-6)/12),variant:hi*4+slot,ultimate:slot===3,passive:AUDIO_PASSIVES.has(hero+'_'+suffix),priority:slot===3?3:2})]))));
export const EVENT_AUDIO=Object.freeze({select:{kind:'star',duration:.09,pitch:2,priority:0},start:{kind:'fanfare',duration:.9,pitch:1,priority:4},victory:{kind:'fanfare',duration:1.8,pitch:1.26,priority:4},ko:{kind:'earth',duration:.85,pitch:.65,priority:4},attack:{kind:'slash',duration:.16,priority:0},heavy:{kind:'metal',duration:.25,pitch:.7,priority:1},arrow:{kind:'arrow',duration:.2,priority:0},gun:{kind:'gun',duration:.23,priority:0},hit:{kind:'flesh',duration:.14,priority:1},heavyHit:{kind:'earth',duration:.23,priority:1},block:{kind:'metal',duration:.17,pitch:1.8,priority:1},dash:{kind:'move',duration:.23,priority:1},heal:{kind:'heal',duration:.27,priority:0}});
export const CORE4_AUDIO=Object.freeze({"razor_plasma_field":{"kind":"burst","pitch":1,"variant":80,"priority":2,"passive":false},"razor_static_link":{"kind":"lightning","pitch":1,"variant":81,"priority":2,"passive":false},"razor_storm_surge":{"kind":"lightning","pitch":1,"variant":82,"priority":2,"passive":true},"razor_eye_of_the_storm":{"kind":"lightning","pitch":1,"variant":83,"priority":2,"passive":false},"viper_poison_attack":{"kind":"poison","pitch":1,"variant":84,"priority":2,"passive":false},"viper_nethertoxin":{"kind":"poison","pitch":1,"variant":85,"priority":2,"passive":false},"viper_corrosive_skin":{"kind":"poison","pitch":1,"variant":86,"priority":2,"passive":true},"viper_viper_strike":{"kind":"poison","pitch":1,"variant":87,"priority":2,"passive":false},"abaddon_death_coil":{"kind":"shadow","pitch":1,"variant":88,"priority":2,"passive":false},"abaddon_aphotic_shield":{"kind":"buff","pitch":1,"variant":89,"priority":2,"passive":false},"abaddon_frostmourne":{"kind":"frost","pitch":1,"variant":90,"priority":2,"passive":true},"abaddon_borrowed_time":{"kind":"heal","pitch":1,"variant":91,"priority":2,"passive":false},"slardar_sprint":{"kind":"move","pitch":1,"variant":92,"priority":2,"passive":false},"slardar_slithereen_crush":{"kind":"earth","pitch":1,"variant":93,"priority":2,"passive":false},"slardar_bash":{"kind":"metal","pitch":1,"variant":94,"priority":2,"passive":true},"slardar_amplify_damage":{"kind":"shadow","pitch":1,"variant":95,"priority":2,"passive":false}});
export function soundDesign(key){return SKILL_AUDIO[key]||CORE4_AUDIO[key]||PACK_AUDIO[key]||EVENT_AUDIO[key]||null;}
export function soundForLog(log,hero){
 if(log.type==='activate'&&soundDesign(log.skill)&&!soundDesign(log.skill).passive)return log.skill;
 if(log.type==='passive'&&soundDesign(log.skill)?.passive)return log.skill;
 if(log.type==='attack')return log.heavy?'heavy':hero?.id==='sniper'?'gun':hero?.attack_range>200?'arrow':'attack';
 if(log.type==='hit')return log.heavy?'heavyHit':'hit';
 if(log.type==='block')return 'block';if(log.type==='round_end')return 'ko';
 if(log.type==='dash')return 'dash';if(log.type==='heal')return 'heal';
 return null;
}
