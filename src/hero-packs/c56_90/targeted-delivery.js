// Reviewed delivery metadata only. All reflection routing is owned by ABI2.4 services.
export const DELIVERY_TAGS=Object.freeze({
 huskar_life_break:Object.freeze({targeting:'enemy-unit-charge',reflectable:true}),
 night_stalker_void:Object.freeze({targeting:'enemy-unit',reflectable:true}),
 ogre_magi_fireblast:Object.freeze({targeting:'enemy-unit',reflectable:true}),
 alchemist_unstable_concoction:Object.freeze({targeting:'automatic-enemy-unit-throw',reflectable:true}),
 ogre_magi_ignite:Object.freeze({targeting:'enemy-unit',reflectable:true}),
 jakiro_dual_breath:Object.freeze({targeting:'directional-line',reflectable:false}),
 jakiro_ice_path:Object.freeze({targeting:'point-area',reflectable:false}),
 jakiro_macropyre:Object.freeze({targeting:'point-area',reflectable:false}),
 huskar_burning_spear:Object.freeze({targeting:'attack-modifier',reflectable:false}),
 jakiro_liquid_fire:Object.freeze({targeting:'attack-modifier',reflectable:false}),
 ogre_magi_bloodlust:Object.freeze({targeting:'friendly-self',reflectable:false}),
});
export const reflectionValues=route=>route.reflected?{reflected:true,origin:route.originalOwner}:{};
