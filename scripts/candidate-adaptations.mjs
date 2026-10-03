// Explicit 2D contracts and the audited runtime overrides. Never modify official snapshots here.
export function applyCandidateAdaptations(data){
 const find=id=>data.heroes.flatMap(h=>h.abilities).find(a=>a.id===id);
 for(const id of ['axe_hunger','crystal_maiden_frostbite','queen_of_pain_shadow_strike'])find(id).mvp.dispelTier='basic';
 find('witch_doctor_maledict').mvp.dispelTier='none';find('juggernaut_blade_fury').mvp.endDispel='strong';find('witch_doctor_death_ward').mvp.summonWard=true;
 find('sniper_shrapnel').mvp.slow_linger_s=find('sniper_shrapnel').official.specialValues.slow_duration;
 delete find('storm_spirit_vortex').mvp.self_slow;
 const notes={
  juggernaut_blade_fury:'风暴每跳可触发剑舞暴击；开始弱驱散、结束强驱散，巫蛊咒术和嘲讽不被驱散。',
  juggernaut_blade_dance:'35%概率造成200%伤害，适用于普攻、剑刃风暴和本作无敌斩。',
  juggernaut_healing_ward:'每0.2秒按当前最大生命的1%治疗，持续24秒；守卫按178.75WU/s跟随。敌方一次实际普攻命中可摧毁，远程必须弹体抵达；背向挥空、跳过和法术弹体不摧毁。守卫不能复活已被击败的英雄。',
  juggernaut_omnislash:'本作固定10次追踪斩击，基础每斩113并触发剑舞、普攻闪避与攻击格挡；未实现随战斗中攻速变化的动态斩击次数。开始弱驱散，目标离开追踪范围可使后续斩击落空。',
  crystal_maiden_nova:'本作保留伤害与移速减速；攻速降低尚未接入。',
  crystal_maiden_freezing_field:'本作保留随机冰爆和移速减速；攻速降低尚未接入，移动或松开技能终止引导。',
  pudge_dismember:'治疗沿用每跳基础伤害对应的固定值，不随目标抗性或实际失血改变；实际伤害联动治疗仍待核定。',
  axe_hunger:'本作暂按持续减速处理，尚未按目标背向状态动态启停；没有击杀小兵解除机制，命中斧王不会解除。减速不会超出本次持续伤害期限。',
  axe_culling:'本作保留伤害；击杀奖励和永久护甲成长尚未接入。',
  sniper_shrapnel:'离开弹雨后减速至多滞留2秒，不会重置为10秒。',
  sniper_assassinate:'本作直线弹体，采用500魔法基值加基础普攻组件；未接入完整普攻修饰与击杀刷新。',
  drow_ranger_multishot:'本作移动或松开技能会终止引导，不能边移动边持续发射。',
  lion_drain:'施法距离467.5WU，建立后断链距离605WU；无敌或减益免疫阻止并中断吸取。本版仅转移自身空缺法力容量内的敌方法力，满蓝时不削减敌方MP，此契约待核定。',
  lion_finger:'本作保留伤害和暂时近战形态；永久击杀叠伤与分裂攻击尚未接入。',
  mirana_moonlight:'同屏仍显示轮廓；透明度不影响选中或命中。移速、增伤和攻击／施法后1.5秒显形已接入。',
  zeus_jump:'本作保留伤害、移速减速与位移；攻速降低尚未接入。',
  shadow_fiend_feast:'在330WU内每0.5秒检查一次，仅从本轮对手收集一次3个临时灵魂，效果结束扣回实际收集数；不模拟完整先天灵魂系统。',
  shadow_fiend_requiem:'本作保留魂线伤害与控制；魔抗降低尚未接入。',
  storm_spirit_remnant:'触发半径129.25WU，伤害半径165WU；碰撞额外计入22WU角色半宽，两种半径分开结算。',
  storm_spirit_vortex:'本版本不对施法者施加自减速；官网遗留自减速字段是否现行生效待核实，未据此更改行为。',
  storm_spirit_overload:'本作保留附加伤害与移速减速；攻速降低尚未接入。',
  witch_doctor_death_ward:'在施法者275WU内自动朝目标放置独立、不可伤害的守卫；守卫攻击半径357.5WU，每0.25秒120纯粹伤害，最多8秒。松键、移动、控制、失焦或死亡结束引导并移除守卫；额外必中率未单独模拟。'
 };
 const tips={
  juggernaut_blade_fury:'退出风暴范围，等旋转结束再用控制。',juggernaut_omnislash:'前摇时拉开，追踪斩击可因目标超出范围而落空。',crystal_maiden_freezing_field:'用控制打断施法者或退出冰爆区域。',pudge_rot:'保持范围外，等待对手自损。',axe_culling:'看到前摇立即拉开距离或施放防护。',sniper_headshot:'爆头按概率触发；退防或跳跃接近，不按第四枪计数。',anti_mage_blink:'预判落点，在闪烁后的恢复期进攻。',anti_mage_mana_void:'高蓝时伤害较低；前摇期间拉开。',lina_fiery:'错开连续技能，等叠层持续时间结束。',lina_laguna:'前摇时离开范围，或及时施放防护技能。',lion_hex:'保持施法范围外，或预判施放防护。',earthshaker_aftershock:'在余震范围外逼迫对手交技能。',earthshaker_echo:'看到抬地动作就拉开，或提前防御。',mirana_moonlight:'观察轮廓和攻击显形，保持退防。',zeus_bolt:'前摇时拉出施法范围，不能仅依靠跳跃。',queen_of_pain_blink:'预判闪烁落点，在恢复期进攻。',queen_of_pain_scream:'女王闪入时不要留在尖叫范围内。',queen_of_pain_sonic:'利用前摇退防或离开直线弹道。',tidehunter_ravage:'提前拉开或退防，注意扩散震波。',axe_hunger:'保持距离避免继续换血；命中斧王不能提前解除。'
 };
 for(const h of data.heroes)for(const a of h.abilities){a.implementation_status='官网数据已对照；竞技场机制与省略见改编说明';if(notes[a.id])a.mvp.arenaNote=a.mvp.arenaNote.replace(/ 本作实际机制：.*$/,'')+' 本作实际机制：'+notes[a.id];a.mvp.mechanics=a.descriptionZh+' '+a.mvp.arenaNote;a.mvp.counterplay=(tips[a.id]||a.mvp.counterplay).replaceAll('冲刺无敌','防护技能').replaceAll('冲刺','移动或跳跃');}
 for(const k of Object.keys(data.rules))if(k.startsWith('dash_'))delete data.rules[k];
 Object.assign(data.rules,{round_seconds:99,arena_width_wu:1200,mana_max:1200,jump_duration_s:1360/1750,jump_height_wu:680*680/3500,reference_width:1280,reference_height:720});delete data.rules.max_round_heal_fraction;
 return data;
}
