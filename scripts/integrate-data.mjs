import fs from 'node:fs';
const source=process.argv[2],root=new URL('../',import.meta.url).pathname;if(!source)throw new Error('Pass the folder containing official heroes.json, combat-overrides.json and assets as the first argument. Normal builds only need npm run build.');
const data=JSON.parse(fs.readFileSync(root+'docs/prototype-data.json','utf8'));
const official=JSON.parse(fs.readFileSync(source+'/heroes.json','utf8'));
const over=JSON.parse(fs.readFileSync(source+'/combat-overrides.json','utf8')).byAbility;
const unit=v=>v*.55;
for(const h of data.heroes){const oh=official.heroes.find(x=>x.key===h.id);h.officialUrl=oh.officialUrl;h.officialStats=oh.officialBaseStats;h.strength=oh.officialBaseStats.str_base+17*oh.officialBaseStats.str_gain;h.combatHp=Math.round(h.hp*2.8);h.combatMana=1200;h.render=`assets/${h.id}-render.png`;
 for(const a of h.abilities){const o=over[a.id],s=o.semantic,k=a.id,oa=oh.skills.find(x=>x.key===k);a.official=o;a.name=o.nameZh;a.en=o.name;a.descriptionZh=oa.descriptionZh.replace(/<[^>]+>/g,'');a.icon=`assets/${k}.png`;fs.copyFileSync(source+'/assets/'+k+'.png',root+a.icon);let m=a.mvp;a.originalAdaptation={...m};m.cooldown_s=o.cooldown_s;m.mana=o.mana;m.duration_s=o.duration_s;m.passive=o.passive;m.damage_type=o.damage_type==='none_or_attack_inherited'?'physical':o.damage_type;m.damage=o.damage;m.startup_frames=Math.round(o.cast_point_s*60);m.range_wu=unit(o.range_dota);m.radius_wu=unit(o.radius_dota);m.officialSemantic=s;m.charges=o.charges;m.charge_restore_s=o.charge_restore_s;m.toggle=o.toggle;m.arenaNote='官网满级基础伤害、耗蓝、冷却及持续时间；距离按0.55映射。格挡、硬控最长1.5秒及脱控保护属于格斗改编。';
  // Remove obsolete prototype formulas that conflict with current official base kit.
  for(const key of ['execute_threshold_pct','execute_damage','attack_bonus','next_attack_override','next_attack_bonus','attack_multiplier','trigger_every_hits','attack_interval_override_s','attack_damage_override','incoming_physical_multiplier','heal_total','block_flat','block_fraction_cap','physical_reduction','magic_reduction','next_attack_range_bonus','charge_damage_per_s','charge_max_s','damage_cap','distance_damage_per_100','self_damage_per_tick','lost_hp_multiplier','burst_cap'])delete m[key];
  m.stun_s=s.stun_s||0;m.slow_pct=Math.abs(s.slow_pct_signed||s.slow_pct||0);m.slow_duration_s=m.duration_s||1;
  if(s.projectile_speed)m.projectile_speed_wu_s=unit(s.projectile_speed);
  if(o.passive){m.effect='passive';m.input='passive';m.duration_s=0;}
  if(o.damage_semantics==='per_second'||o.damage_semantics==='per_second_plus_health_lost_bursts'){m.tick_interval_s=s.tick_interval_s||.2;m.damage=o.damage*m.tick_interval_s;m.ticks=Math.round((m.duration_s||99)/m.tick_interval_s);}
  if(o.damage_semantics==='crit'){m.critChance=(s.crit_chance_pct||s.focus_chance_on_attack_pct)/100;m.critMultiplier=s.crit_total_pct/100;}
  if(s.slow_pct_signed)m.slow_pct=Math.abs(s.slow_pct_signed);
  if(k==='juggernaut_blade_fury'){m.magic_reduction=.8;m.debuffImmune=true;}
  if(k==='juggernaut_healing_ward'){m.tick_interval_s=.2;m.ticks=120;m.heal_total=h.combatHp*.05*24;m.follow=true;}
  if(k==='juggernaut_omnislash'){m.damage=h.attack+35;m.tick_interval_s=h.attack_interval_s/1.4/1.4;m.ticks=Math.floor(3.5/m.tick_interval_s);m.tick_offsets_s=Array.from({length:m.ticks},(_,i)=>i*m.tick_interval_s);m.tracking_break_wu=unit(425);}
  if(k==='crystal_maiden_aura'){m.manaRegenAmp=.8;m.manaRegenBonus=4;}
  if(k==='crystal_maiden_freezing_field'){m.tick_interval_s=.1;m.ticks=100;m.randomExplosion=true;m.explosionRadius=unit(320);m.explosionMin=unit(195);m.explosionMax=unit(785);m.slow_duration_s=1;}
  if(k==='pudge_rot'){m.duration_s=999;m.ticks=4995;m.self_damage_per_tick=24;}
  if(k==='pudge_meat_shield'){m.block_flat=26;m.block_fraction_cap=1;}
  if(k==='pudge_dismember'){m.tick_interval_s=2.75/6;m.ticks=6;m.damage=(120+.9*h.strength)*m.tick_interval_s;m.heal_total=m.damage*6;m.stun_s=2.75;}
  if(k==='axe_call'){m.stun_s=3;m.physical_reduction=15*.06/(1+15*.06);}
  if(k==='axe_helix'){m.trigger_every_received_attacks=4;m.internal_cooldown_s=.3;}
  if(k==='sniper_shrapnel'){m.startup_frames+=72;}
  if(k==='sniper_headshot'){m.procChance=.4;m.knockback_wu=unit(50);m.slow_pct=100;}
  if(k==='sniper_take_aim'){m.attack_range_bonus=unit(300);m.self_slow=.65;m.headshotGuaranteed=true;}
  if(k==='sniper_assassinate'){m.damage=500+h.attack;m.arenaNote+=' 暗杀伤害为500魔法基值加竞技场普攻组件；弹道为可闪避直线。';}
  if(k==='anti_mage_mana_break'){m.mana_burn=40;m.mana_burn_pct=.045;m.mana_damage_ratio=.65;}
  if(k==='anti_mage_mana_void'){m.damage=0;m.missing_mana_multiplier=1;m.damage_cap=1200;}
  if(k==='phantom_assassin_dagger'){m.damage=80+h.attack*.75;}
  if(k==='phantom_assassin_strike'){m.attack_interval_multiplier=1/3;m.buff_duration_s=3;}
  if(k==='phantom_assassin_immaterial'){m.evasion=.55;}
  if(k==='phantom_assassin_coup'){m.focusChance=.17;m.daggerFocusChance=.34;m.critMultiplier=4.5;}
  if(k==='drow_ranger_frost'){m.autocast=true;m.toggle=true;m.duration_s=999;m.attack_bonus=30;m.on_attack_slow=.45;m.on_attack_slow_s=1.5;m.perAttackMana=12;m.mana=0;}
  if(k==='drow_ranger_gust'){m.range_wu=unit(900);m.radius_wu=35;m.silence_s=6;m.knockback_wu=unit(450);}
  if(k==='drow_ranger_multishot'){m.damage=h.attack*1.4;m.slow_pct=45;m.slow_duration_s=1.5;m.ticks=3;m.tick_interval_s=1.75/3;m.range_wu=h.attack_range+unit(475);m.arenaNote+=' 扇面投射到二维为3波，每波至多命中一次，避免4支箭重叠。';}
  if(k==='drow_ranger_marksmanship'){m.procChance=.4;m.attack_bonus=90;m.distance_threshold_wu=unit(300);}
  if(k==='lina_array'){m.startup_frames+=30;}
  if(k==='lina_fiery'){m.max_stacks=7;m.stack_duration_s=16;}
  if(k==='lina_laguna'||k==='lion_finger'){m.startup_frames+=15;}
  if(k==='lion_drain'){m.tick_interval_s=.1;m.ticks=50;m.mana_drain_per_tick=12;m.break_range_wu=unit(1100);}
  if(k==='earthshaker_totem'){m.next_attack_override=h.attack*5;m.next_attack_range_bonus=unit(100);}
  if(k==='earthshaker_aftershock'){m.stun_s=1.3;}
  if(k==='earthshaker_echo'){m.damage=180+110*2;m.arenaNote+=' 单一英雄按初始180与英雄双回音220计算；场上无小兵。';}
  if(k==='mirana_starstorm'){m.ticks=2;m.tick_interval_s=.5;m.tick_offsets_s=[0,.5];m.hit_damages=[300,240];}
  if(k==='mirana_arrow'){m.distance_damage_per_100=180/(1500*.55/100);m.damage_cap=540;m.stun_s=.01;m.stun_cap_s=5;m.arrowStunRate=5/(1500*.55);}
  if(k==='mirana_leap'){m.range_wu=unit(650);m.travelDuration=.5;m.move_multiplier=1.24;m.attack_interval_multiplier=.5;}
  if(k==='mirana_moonlight'){m.move_multiplier=1.15;m.outgoingMultiplier=1.15;m.arenaNote+=' 同屏信息透明，月光显示半透明轮廓；攻击或施法现形1.5秒后重新淡出，不隐藏玩家位置。';}
  if(k==='sven_cleave'){m.arenaNote='官网被动：普攻对次级目标造成90%溅射。单一敌方英雄不重复受伤；本作可摧毁被命中英雄身后的治疗守卫。';}
  if(k==='sven_warcry'){m.physical_reduction=14*.06/(1+14*.06);m.move_multiplier=1.15;}
  if(k==='sven_strength'){m.attack_bonus=h.attack*1.9;m.slow_resistance=.4;}
  if(k==='zeus_jump'){m.range_wu=unit(600);m.travelDuration=.5;}
  if(k==='zeus_wrath'){m.effect='hit';m.input='tap';m.range_wu=1400;m.radius_wu=0;}
  if(k==='windranger_shackle'){m.stun_s=.6;m.wall_bind_stun_s=3.25;}
  if(k==='windranger_powershot'){m.damage=0;m.charge_damage_per_s=470;m.charge_max_s=1;m.duration_s=3;m.input='charge';}
  if(k==='windranger_windrun'){m.move_multiplier=1.5;m.basic_attack_evasion=1;}
  if(k==='windranger_focus'){m.attack_interval_override_s=h.attack_interval_s/6;m.attack_damage_override=h.attack*.75;}
  if(k==='shadow_fiend_raze'){m.input='raze';m.raze_distances=[unit(200),unit(450),unit(700)];m.stack_damage=80;m.max_stacks=20;m.stack_duration_s=6;m.arenaNote+=' 近中远影压映射为三档共用冷却；依当前灵魂和叠层计算伤害。';}
  if(k==='shadow_fiend_feast'){m.attack_interval_multiplier=1/1.8;m.move_multiplier=1.1;m.souls=3;}
  if(k==='shadow_fiend_requiem'){m.stun_s=.6;m.damage=160;m.soulLines=true;m.arenaNote+=' 二维场最多计入3条魂线，每条160；无小兵，灵魂由灵魂盛宴获得。死亡释放与跨回合魂数不接入。';}
  if(k==='storm_spirit_remnant'){m.arming_s=.75;m.walkSpeed=unit(300);m.triggerRadius=unit(235);}
  if(k==='storm_spirit_vortex'){m.stun_s=2;m.pull_to_distance=70;m.self_slow=.5;}
  if(k==='storm_spirit_ball'){m.range_wu=360;m.duration_s=360/unit(2300);m.mana=25+.075*1200+(360/.55/100)*(10+.0065*1200);m.damage=14*(360/.55/100);m.arenaNote+=' 每次飞行360竞技场单位；耗蓝按25+7.5%最大MP，加每100Dota距离10+0.65%最大MP计算。';}
  if(k==='queen_of_pain_shadow_strike'){m.tick_interval_s=3;m.dot_damage=80;m.ticks=6;m.dot_ticks=5;}
  if(k==='queen_of_pain_scream'){m.selfReflection=.25;}
  if(k==='queen_of_pain_sonic'){m.range_wu=unit(900);m.radius_wu=50;m.knockback_wu=unit(350);m.damageOverTime=1.4;}
  if(k==='witch_doctor_restoration'){m.duration_s=999;m.tick_interval_s=.33;m.ticks=999/.33;m.heal_total=50*999;m.mana_per_second=18;}
  if(k==='witch_doctor_maledict'){m.lost_hp_multiplier=.4;m.burst_cap=99999;m.burstInterval=4;}
  if(k==='witch_doctor_death_ward'){m.tick_interval_s=.25;m.ticks=32;m.arenaNote+=' 官网未暴露守卫攻击间隔，本作采用0.25秒；120纯粹伤害/次。';}
  if(k==='tidehunter_gush'){m.vulnerability_physical=6*.06/(1+6*.06);m.vulnerability_s=4.5;}
  if(k==='tidehunter_shell'){m.block_flat=150;m.block_fraction_cap=1;m.physical_only=true;m.self_slow=.4;}
  if(k==='tidehunter_anchor'){m.damage=h.attack+200;m.radius_wu=h.attack_range+unit(225);m.attack_damage_debuff=.4;m.debuff_duration_s=6;}
  if(k==='tidehunter_ravage'){m.wave_speed_wu_s=unit(725);}
  // The visual targeting radii of straight projectiles must not become whole-screen AoE.
  if(['projectile','projectile_dot'].includes(m.effect))m.radius_wu=Math.min(m.radius_wu||18,35);
  m.mechanics=a.descriptionZh+' '+m.arenaNote;a.implementation_status='已实现官网基础值与标注的二维适配';
 }
 fs.copyFileSync(source+'/assets/'+h.id+'-render.png',root+h.render);
}
data.meta.version='1.0.0-fan';data.meta.source_policy='Dota2官网满级基础数据2026-09-30快照；二维格斗适配另列';
fs.writeFileSync(root+'src/data.js','export const DATA='+JSON.stringify(data)+';\nexport const heroes=DATA.heroes;\n');
fs.copyFileSync(source+'/SOURCE_NOTES.md',root+'docs/OFFICIAL_SOURCES.md');fs.copyFileSync(source+'/combat-overrides.json',root+'docs/official-combat-overrides.json');fs.copyFileSync(source+'/validation.json',root+'docs/official-validation.json');
console.log('Integrated official data: 20 heroes,80 skills');
