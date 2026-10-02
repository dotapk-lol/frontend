// DOTA DUEL fixed-step deterministic two-sided combat engine.
// Gameplay units use a 1200-wide arena; skill geometry is adapted to 2D.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const clone=x=>JSON.parse(JSON.stringify(x));
export const FIXED_DT=1/60;
export class Engine {
 constructor(heroes,indices=[0,3],opts={}){this.heroes=heroes;this.indices=indices;this.mode=opts.mode||'local';this.seed=opts.seed||8192;this.score=[0,0];this.round=1;this.history=[];this.logSeq=0;this.resetRound();}
 random(){this.seed=(this.seed*1664525+1013904223)>>>0;return this.seed/4294967296;}
 hero(i){return this.heroes[this.indices[i]];}
 ability(i,s){return this.hero(i).abilities[s];}
 resetRound(){this.time=99;this.t=0;this.frame=0;this.phase='intro';this.phaseTime=2.3;this.winner=null;this.paused=false;this.hitstop=0;this.shake=0;this.events=[];this.projectiles=[];this.zones=[];this.effects=[];this.logs=[];this.seq=0;this.input=[{},{}];this.previous=[{},{}];this.fighters=[0,1].map(i=>{let h=this.hero(i);return {i,x:i===0?320:880,y:0,vy:0,airVx:0,crouching:false,direction:5,jumpKind:'neutral',dir:i===0?1:-1,hp:h.combatHp||h.hp*2.8,maxHp:h.combatHp||h.hp*2.8,mp:h.combatMana||1200,maxMp:h.combatMana||1200,hits:0,received:0,combo:0,comboTime:0,maxCombo:0,damage:0,casts:0,cd:[0,0,0,0],dashCd:0,attackCd:0,recovery:0,stun:0,root:0,silence:0,hex:0,fear:0,taunt:0,slow:0,slowPct:0,invuln:0,ccGrace:0,ccChain:0,guard:0,guardMeter:100,buffs:[],dots:[],animation:'idle',animTime:0,cast:null,channel:null,receivedDamage:0,healBudget:h.hp*20,souls:0,charges:h.abilities.map(a=>a.mvp.charges||0),chargeTimers:[0,0,0,0],lastDamageTime:0,cleanseDamage:0,hitFlash:0,charge:0,chargeSlot:-1,heavyUsed:false,aiDelay:.3};});}
 start(){this.phase='fight';this.phaseTime=0;return this;}
 setInput(i,input){this.input[i]={...input};}
 fx(type,x,y,color='#fff',extra={}){this.effects.push({type,x,y,color,life:.5,maxLife:.5,...extra});}
 log(type,i,detail){this.logs.push({frame:this.frame,logId:++this.logSeq,type,player:i,...detail});if(this.logs.length>200)this.logs.shift();}
 buff(f,key){return f.buffs.find(b=>b.key===key);}
 addBuff(f,key,m,duration){f.buffs=f.buffs.filter(b=>b.key!==key);f.buffs.push({key,m:clone(m),life:duration||m.duration_s||2});}
 property(f,key,fallback=0){return f.buffs.reduce((v,b)=>Math.max(v,b.m[key]||0),fallback);}
 blocked(f){return f.stun>0||f.hex>0||f.fear>0||f.taunt>0;}
 animate(f,name,duration=.35){f.animation=name;f.animTime=duration;}
 interrupt(f){if(f.cast){this.log('interrupted',f.i,{skill:f.cast.slot});f.cast=null;}if(f.channel){this.log('channel_end',f.i,{reason:'interrupted'});f.channel=null;}f.buffs=f.buffs.filter(b=>!b.m.interruptOnCC);f.chargeSlot=-1;}
 control(target,type,duration){if(duration<=0||target.invuln>0||target.ccGrace>0||this.property(target,'debuffImmune'))return;const d=Math.min(duration,1.5-target.ccChain);if(d<=0)return;target[type]=Math.max(target[type]||0,d);target.ccChain+=d;target.lastControl=type;if(['stun','hex','fear','taunt'].includes(type))this.interrupt(target);this.log('control',target.i,{control:type,duration:d});}
 move(f,dx){const old=f.x;let x=clamp(old+dx,45,1155);for(const z of this.zones){if(z.type==='wall'&&f.y<z.height){if(old<z.x&&x>=z.x-35)x=z.x-35;if(old>z.x&&x<=z.x+35)x=z.x+35;}}f.x=x;}
 heal(f,amount){const n=Math.min(f.maxHp-f.hp,amount,f.healBudget);if(n<=0)return;f.hp+=n;f.healBudget-=n;this.fx('text',f.x,f.y+190,'#91f4b1',{text:'+'+Math.round(n),life:.8,maxLife:.8});this.log('heal',f.i,{amount:n});}
 hit(attacker,target,damage,m={},info={}){
  if(target.hp<=0||target.invuln>0){this.log('evade',target.i,{reason:'invulnerable'});return false;}
  const basic=!!info.basic,physical=m.damage_type==='physical';const targetHero=this.hero(target.i);if(basic&&targetHero.id==='phantom_assassin'&&this.random()<targetHero.abilities[2].mvp.evasion){this.fx('text',target.x,target.y+180,'#cfe7ff',{text:'闪避'});return false;}
  if(basic&&this.property(target,'basic_attack_evasion')){this.fx('text',target.x,target.y+170,'#b7ffbd',{text:'闪避'});return false;}
  const evasion=this.buff(target,'counter');if(basic&&physical&&evasion?.m.counter_type==='basic_physical'){target.buffs=target.buffs.filter(b=>b!==evasion);this.addBuff(target,'counterReward',{next_attack_bonus:evasion.m.next_attack_bonus||30},3);this.fx('text',target.x,target.y+170,'#aaf6ff',{text:'闪避反击'});return false;}
  let guard=target.guard>0&&m.blockable!==false&&!info.dot;
  let d=damage*(this.property(attacker,'outgoingMultiplier')||1);if(basic&&physical&&targetHero.id==='tidehunter')d=Math.max(0,d-(this.buff(target,'tidehunter_shell')?150:75));
  if(physical){const armor=Math.max(this.property(target,'physical_reduction'),0);d*=1-armor;const vuln=Math.max(this.property(target,'vulnerability_physical'),this.hero(attacker.i).id==='shadow_fiend'&&Math.abs(target.x-attacker.x)<=this.ability(attacker.i,2).mvp.radius_wu?(7*.06/(1+7*.06)):0);d*=1+vuln;}
  if(m.damage_type==='magical')d*=1-Math.max(this.property(target,'magic_reduction'),targetHero.id==='anti_mage'?.35:0);
  for(const b of target.buffs){if((m.damage_type!=='pure'||b.key==='pudge_meat_shield')&&b.m.block_flat&&b.key!=='tidehunter_shell'&&(!b.m.physical_only||physical))d-=Math.min(b.m.block_flat,d*(b.m.block_fraction_cap||.4));}
  if(guard){target.guardMeter=Math.max(0,target.guardMeter-(info.heavy?35:Math.min(24,8+d*.025)));d*=.2;if(target.guardMeter<=0){target.guard=0;this.control(target,'stun',.8);this.fx('text',target.x,target.y+200,'#ffb462',{text:'破防!'});}d=Math.min(d,Math.max(0,target.hp-1));this.fx('guard',target.x,target.y+95,'#75d8ff');}
  d=Math.max(0,d);if(m.chip)d=Math.min(d,Math.max(0,target.hp-1));target.hp=Math.max(0,target.hp-d);target.hitFlash=.12;target.receivedDamage+=d;attacker.damage+=d;target.cleanseDamage+=d;target.lastDamageTime=this.t;if(targetHero.id==='tidehunter'&&target.cleanseDamage>=450){for(const k of ['stun','root','silence','hex','fear','taunt','slow'])target[k]=0;target.dots=[];target.cleanseDamage=0;this.fx('text',target.x,target.y+190,'#9ff4d9',{text:'强驱散'});}if(m.selfReflection&&d)attacker.hp=Math.max(1,attacker.hp-d*m.selfReflection);
  if(d){this.fx('hit',target.x,target.y+90,guard?'#80d3ee':this.hero(attacker.i).color,{size:info.heavy?65:38});this.fx('text',target.x,target.y+165,guard?'#b5dbe8':'#fff1ce',{text:String(d),life:.7,maxLife:.7});this.shake=Math.max(this.shake,info.heavy?9:4);if(!info.dot)this.hitstop=Math.max(this.hitstop,info.heavy?.055:.028);}
  if(!guard){
   if(!info.dot){attacker.combo=attacker.comboTime>0?attacker.combo+1:1;attacker.comboTime=.95;attacker.maxCombo=Math.max(attacker.maxCombo,attacker.combo);this.animate(target,'hurt',.22);}
   if(m.stun_s)this.control(target,m.control||'stun',m.stun_s);
   if(m.root_s)this.control(target,'root',m.root_s);
   if(m.silence_s&&!this.property(target,'debuffImmune'))target.silence=Math.max(target.silence,m.silence_s);
   if(m.slow_pct&&!this.property(target,'debuffImmune')){target.slow=Math.max(target.slow,m.slow_duration_s||1);target.slowPct=Math.max(target.slowPct,m.slow_pct/100);}
   if(m.knockback_wu)this.move(target,attacker.dir*m.knockback_wu);
   if(m.pull_to_distance){this.move(target,attacker.x+attacker.dir*m.pull_to_distance-target.x);this.control(target,'stun',m.pull_cap_s||.25);}
   if(m.vulnerability_physical)this.addBuff(target,'vulnerable',m,m.vulnerability_s);
   if(m.attack_damage_debuff)this.addBuff(target,'weak',m,m.debuff_duration_s);
   if(basic){attacker.hits++;}
   if(!info.dot&&m.hitstun_s&&!m.stun_s){target.recovery=Math.max(target.recovery,Math.min(.16,m.hitstun_s));}
   if(!basic&&!info.passive&&this.hero(attacker.i).id==='lina'&&!info.linaDone){const b=this.buff(attacker,'fiery');this.addBuff(attacker,'fiery',{stacks:Math.min(7,(b?.m.stacks||0)+1)},16);if((b?.m.stacks||0)<7)this.log('passive',attacker.i,{skill:'lina_fiery'});}
  }
  if(basic){target.received++;const pa=this.hero(target.i).abilities.find(a=>a.mvp.trigger_every_received_attacks);if(pa&&target.received%(pa.mvp.trigger_every_received_attacks||3)===0&&!this.buff(target,'helix_cd')&&Math.abs(target.x-attacker.x)<=pa.mvp.radius_wu+25){this.addBuff(target,'helix_cd',{},pa.mvp.internal_cooldown_s||1);this.log('passive',target.i,{skill:pa.id});this.hit(target,attacker,pa.mvp.damage,{...pa.mvp,blockable:true},{passive:true});this.fx('ring',target.x,target.y+60,this.hero(target.i).color,{size:pa.mvp.radius_wu});}}
  this.log(guard?'block':'hit',attacker.i,{damage:d,target:target.i,basic,heavy:!!info.heavy,skill:info.skill||null});return !guard;
 }
 attack(i,heavy=false){const f=this.fighters[i],t=this.fighters[1-i],h=this.hero(i);if(this.phase!=='fight'||this.paused||this.blocked(f)||f.root>0||f.attackCd>0||f.recovery>0||f.cast||f.channel||(this.buff(f,'aura')&&h.id==='juggernaut'))return false;
  const fiery=this.buff(f,'fiery')?.m.stacks||0;const interval=this.property(f,'attack_interval_override_s')||h.attack_interval_s*(this.property(f,'attack_interval_multiplier')||1)*(1/(1+fiery*.28));const moon=this.buff(f,'mirana_moonlight');if(moon)moon.reveal=1.5;f.attackCd=interval*(heavy?1.65:1);f.recovery=heavy?.45:.22;this.animate(f,heavy?'heavy':'attack',heavy?.45:.32);f.guard=0;
  let range=(this.property(f,'attack_range_override')||h.attack_range)+this.property(f,'attack_range_bonus')+this.property(f,'next_attack_range_bonus');let d=this.property(f,'attack_damage_override')||h.attack;d+=this.property(f,'attack_bonus');if(h.id==='shadow_fiend')d+=f.souls;d*=1-this.property(f,'attack_damage_debuff');if(heavy){d*=1.55;range+=24;}
  const buff=f.buffs.find(b=>b.m.next_attack_override);if(buff)d=buff.m.next_attack_override;
  d+=this.property(f,'next_attack_bonus');
  if(h.id==='drow_ranger'&&Math.abs(t.x-f.x)>=(h.abilities[3].mvp.distance_threshold_wu||165)&&this.random()<.4)d+=h.abilities[3].mvp.attack_bonus||90;
  let extra={damage_type:'physical',blockable:true,hitstun_s:heavy?.18:.1,knockback_wu:heavy?45:6};const passive=h.abilities.find(a=>a.mvp.trigger_every_hits);if(h.id==='juggernaut'&&this.random()<.35){d*=2;extra.critical=true;}if(h.id==='sniper'&&(this.property(f,'headshotGuaranteed')||this.random()<.4)){d+=110;extra.knockback_wu+=27.5;extra.slow_pct=100;extra.slow_duration_s=.5;}if(h.id==='phantom_assassin'){if(this.buff(f,'deadlyFocus')){d*=4.5;f.buffs=f.buffs.filter(b=>b.key!=='deadlyFocus');extra.critical=true;}else if(this.random()<.17)this.addBuff(f,'deadlyFocus',{},10);}
  if(passive&&(f.hits+1)%(passive.mvp.trigger_every_hits||4)===0){d*=passive.mvp.attack_multiplier||1;d+=passive.mvp.damage||0;extra.knockback_wu+=passive.mvp.knockback_wu||0;}
  const id=++this.seq;this.events.push({at:this.t+(heavy?.24:.1),type:'attack',owner:i,damage:d,m:extra,range,heavy,id,dir:f.dir,y:f.y});return true;
 }
 resolveAttack(e){const f=this.fighters[e.owner],t=this.fighters[1-e.owner];if(f.stun>0||f.hex>0||f.fear>0||f.hp<=0)return;this.log('attack',f.i,{heavy:!!e.heavy});let destroyed=false;for(const z of this.zones)if(z.type==='ward'&&z.owner!==f.i&&Math.abs(z.x-f.x)<e.range){z.life=0;destroyed=true;this.fx('hit',z.x,50,'#ffe4a2');}
  if(this.hero(f.i).attack_range>200&&!this.property(f,'melee')){this.projectiles.push({owner:f.i,x:f.x+f.dir*38,y:f.y+100,dir:e.dir,v:980,travel:0,range:e.range,r:10,damage:e.damage,m:e.m,basic:true,heavy:e.heavy,id:e.id});}
  else if(Math.abs(f.x-t.x)<e.range+22&&Math.abs(f.y-t.y)<105&&(t.x-f.x)*e.dir>=-35){this.basicHit(f,t,e);}
  this.fx('slash',f.x+f.dir*45,f.y+100,this.hero(f.i).color,{dir:f.dir,size:e.heavy?125:85});
 }
 basicHit(f,t,e){const h=this.hero(f.i);let d=e.damage,manaBurn=0;const mana=h.abilities.find(a=>a.mvp.mana_burn);if(mana&&!t.guard){const burn=Math.min(t.mp,mana.mvp.mana_burn+(mana.mvp.mana_burn_pct||0)*t.maxMp);manaBurn=burn;d+=burn*mana.mvp.mana_damage_ratio;}
  const frost=this.buff(f,'drow_ranger_frost');if(frost){if(f.mp>=12)f.mp-=12;else{d-=30;f.buffs=f.buffs.filter(b=>b!==frost);}}const ok=this.hit(f,t,d,e.m,{basic:true,heavy:e.heavy});if(ok&&manaBurn){t.mp=Math.max(0,t.mp-manaBurn);this.log('passive',f.i,{skill:mana.id});}if(h.id==='sven'){for(const z of this.zones)if(z.type==='ward'&&z.owner!==f.i&&(z.x-t.x)*f.dir>=0&&Math.abs(z.x-t.x)<330){z.life=0;this.fx('slash',z.x,60,h.color,{size:120,dir:f.dir});this.log('cleave',f.i,{target:'ward'});this.log('passive',f.i,{skill:'sven_cleave'});}}const next=f.buffs.filter(b=>b.m.next_attack_override||b.m.next_attack_bonus);for(const b of next){if(ok||b.key==='earthshaker_totem')f.buffs=f.buffs.filter(x=>x!==b);}
  if(ok){const slow=this.property(f,'on_attack_slow');if(slow){t.slow=Math.max(t.slow,this.property(f,'on_attack_slow_s'));t.slowPct=slow;}
   if(this.buff(f,'overload')){this.log('passive',f.i,{skill:'storm_spirit_overload'});const m=h.abilities[2].mvp;this.hit(f,t,m.damage||30,{damage_type:'magical',blockable:true,slow_pct:80,slow_duration_s:.8},{passive:true});f.buffs=f.buffs.filter(b=>b.key!=='overload');}}
 }
 cast(i,slot,options={}){const f=this.fighters[i],a=this.ability(i,slot),m=a?.mvp;if(m?.toggle&&this.buff(f,m.effect==='aura'?'aura':a.id)){f.buffs=f.buffs.filter(b=>b.key!==(m.effect==='aura'?'aura':a.id));this.zones=this.zones.filter(z=>!(z.owner===i&&z.id===a.id));return true;}if(!m||m.passive||this.phase!=='fight'||this.paused||this.blocked(f)||f.silence>0||f.cd[slot]>0||(m.charges&&f.charges[slot]<=0)||f.mp<m.mana||f.recovery>0||f.cast||f.channel)return false;
  const motion=['blink','blink_strike','leap','leap_hit','dash_hit'].includes(m.effect);if(motion&&(f.root>0||f.y>5))return false;
  const moon=this.buff(f,'mirana_moonlight');if(moon)moon.reveal=1.5;f.mp-=m.mana;f.cd[slot]=m.cooldown_s;if(m.charges){f.charges[slot]--;if(f.chargeTimers[slot]<=0)f.chargeTimers[slot]=m.charge_restore_s;}f.casts++;f.guard=0;const target=this.fighters[1-i];let aim=options.aim??target.x;aim=clamp(aim,f.x-m.range_wu,f.x+m.range_wu);if(m.input==='raze'){const ranges=m.raze_distances||[150,300,450];const range=options.raze??(Math.abs(target.x-f.x)<200?ranges[0]:Math.abs(target.x-f.x)>350?ranges[2]:ranges[1]);aim=f.x+f.dir*range;}
  f.cast={slot,remaining:m.startup_frames/60,m:clone(m),dir:options.dir||((this.input[i].right?1:0)-(this.input[i].left?1:0))||f.dir,aim:clamp(aim,45,1155),charge:clamp(options.charge||0,0,m.charge_max_s||.8),id:++this.seq};this.animate(f,'cast',m.startup_frames/60+.25);
  this.fx('cast',f.x,f.y+100,this.hero(i).color,{life:m.startup_frames/60,maxLife:m.startup_frames/60,size:slot===3?100:60});
  if(['ground','ground_dot','wall','curse'].includes(m.effect))this.fx('warning',f.cast.aim,0,this.hero(i).color,{size:m.radius_wu,life:m.startup_frames/60,maxLife:m.startup_frames/60});
  if(this.hero(i).id==='storm_spirit')this.addBuff(f,'overload',{},4);
  this.log('cast',i,{skill:a.id,slot,cost:m.mana});return true;
 }
 release(i,slot){const f=this.fighters[i];if(f.channel?.slot===slot){f.channel=null;f.recovery=.2;this.log('channel_end',i,{reason:'release'});}if(f.chargeSlot===slot){const amount=f.charge;f.chargeSlot=-1;f.charge=0;this.cast(i,slot,{charge:amount});}}
 activate(f,c){const m=c.m,t=this.fighters[1-f.i],a=this.ability(f.i,c.slot),id=a.id;f.recovery=m.recovery_frames/60;this.animate(f,'cast',.35);const near=(r)=>Math.abs(t.x-f.x)<=r+22&&((m.height!=='ground')||t.y<45);const hit=(d=m.damage,mm=m)=>this.hit(f,t,d,mm,{skill:id});
  const reflect=this.buff(t,'counter');if(reflect&&!reflect.m.counter_type&&['hit','root','hex','dot','pull','blink_strike'].includes(m.effect)&&near(m.range_wu||m.radius_wu)&&!c.reflected){
   if(['root','dot'].includes(m.effect)){f.dots.push({owner:t.i,id,life:m.duration_s,tick:m.tick_interval_s,m,hp0:f.hp,elapsed:0});if(m.effect==='root')f.root=m.duration_s;}
   else if(m.effect==='hex')this.control(f,'hex',m.duration_s);else{let damage=m.missing_mana_multiplier?(f.maxMp-f.mp)*m.missing_mana_multiplier:m.damage;this.hit(t,f,damage,m,{skill:id,reflected:true});}
   this.fx('beam',t.x,t.y+100,'#95dcff',{tx:f.x,ty:f.y+100});this.fx('text',t.x,t.y+180,'#bbf0ff',{text:'法术反制'});this.log('reflect',t.i,{skill:id});return;
  }
  if(id==='lion_finger')this.addBuff(f,'lionForm',{attack_range_override:137.5,attack_bonus:40,move_bonus:16.5,melee:true},20);
  if(this.hero(f.i).id==='earthshaker'&&near(this.ability(f.i,2).mvp.radius_wu)){this.log('passive',f.i,{skill:'earthshaker_aftershock'});this.hit(f,t,this.ability(f.i,2).mvp.damage,{damage_type:'magical',blockable:true,stun_s:1.3},{passive:true});}
  switch(m.effect){
   case 'buff':case 'counter':{this.addBuff(f,m.effect==='counter'?'counter':id,m,m.duration_s);if(m.souls)f.souls=Math.min(20,f.souls+m.souls);if(m.cleanse){for(const k of m.cleanse)f[k]=0;}this.fx('ring',f.x,f.y+70,this.hero(f.i).color,{size:100,life:.7,maxLife:.7});break;}
   case 'blink':this.fx('dash',f.x,f.y+80,this.hero(f.i).color);this.move(f,c.dir*m.range_wu);f.invuln=4/60;break;
   case 'blink_strike':if(near(m.range_wu)){this.move(f,t.x-c.dir*70-f.x);hit();this.addBuff(f,id,m,m.buff_duration_s||2);}break;
   case 'leap':case 'leap_hit':{if(m.effect==='leap_hit'&&near(m.radius_wu))hit();f.vy=650;f.motion={dir:c.dir,speed:m.range_wu/(m.travelDuration||.55),life:m.travelDuration||.55};this.addBuff(f,'leapSpeed',{move_multiplier:m.move_multiplier||1.1,attack_interval_multiplier:m.attack_interval_multiplier||1},m.duration_s||2);break;}
   case 'dash_hit':f.motion={dir:c.dir,speed:m.range_wu/m.duration_s,life:m.duration_s,damage:m.damage,m,id,distance:0,maxDistance:m.range_wu,hit:false};f.invuln=m.duration_s;break;
   case 'ward':this.zones=this.zones.filter(z=>!(z.owner===f.i&&z.type==='ward'));this.zones.push({type:'ward',owner:f.i,x:f.x,life:m.duration_s,tick:m.tick_interval_s,m,id});break;
   case 'heal':this.addBuff(f,id,{...m,interruptOnCC:true},m.duration_s);this.zones.push({type:'heal',owner:f.i,x:f.x,life:m.duration_s,tick:m.tick_interval_s,m,id});break;
   case 'aura':if(m.debuffImmune){for(const k of ['stun','root','silence','hex','fear','taunt','slow'])f[k]=0;f.dots=[];}this.addBuff(f,'aura',m,m.duration_s);this.zones.push({type:'aura',owner:f.i,x:f.x,life:m.duration_s,tick:m.tick_interval_s,m,id});break;
   case 'channel':case 'channel_projectile':case 'drain':case 'grab':{
    if(m.effect==='grab'&&(!near(m.range_wu)||t.invuln>0))break;
    f.channel={slot:c.slot,life:m.duration_s,tick:m.tick_interval_s,m,dir:c.dir,id};f.recovery=0;if(m.effect==='grab'){this.control(t,'stun',m.duration_s);t.grabbedBy=f.i;}break;}
   case 'projectile':case 'projectile_dot':case 'wave':this.spawnProjectile(f,c,m.damage+(m.charge_damage_per_s||0)*c.charge,id);break;
   case 'ground_dot':case 'trap':case 'wall':this.zones.push({type:m.effect,owner:f.i,x:m.effect==='trap'&&m.walkSpeed?f.x:c.aim,life:m.duration_s,tick:m.tick_interval_s||.2,m,id,height:m.wall_height_wu||55,arm:m.arming_s||0,age:0,targetX:c.aim});if(m.effect==='wall'&&Math.abs(t.x-c.aim)<=m.radius_wu+22&&t.y<45)hit();break;
   case 'dot':case 'root':case 'curse':{if((m.effect==='curse'?Math.abs(t.x-c.aim)<=m.radius_wu+22:near(m.range_wu))&&!t.guard&&t.invuln<=0){t.dots=t.dots.filter(d=>d.id!==id);t.dots.push({owner:f.i,id,life:m.duration_s,tick:m.tick_interval_s,m,hp0:t.hp,elapsed:0,nextBurst:m.burstInterval||0});if(m.effect==='root'&&!this.property(t,'debuffImmune')){t.root=m.duration_s;this.fx('root',t.x,t.y+50,this.hero(f.i).color,{life:m.duration_s,maxLife:m.duration_s});}}break;}
   case 'hex':if(near(m.range_wu)&&!t.guard)this.control(t,'hex',m.duration_s);break;
   case 'taunt':if(near(m.radius_wu)&&!t.guard){this.control(t,'taunt',m.duration_s);this.addBuff(f,id,m,m.duration_s);}break;
   case 'pull':if(near(m.range_wu))hit();break;
   case 'multi':{if(m.invulnerable_active&&!near(m.range_wu))break;if(m.invulnerable_active)f.invuln=m.duration_s;for(let n=0;n<m.ticks;n++)this.events.push({type:'skill_hit',at:this.t+(m.tick_offsets_s?.[n]??n*m.tick_interval_s),owner:f.i,m,id,damage:m.hit_damages?.[n]??m.damage,range:m.tracking_break_wu||m.range_wu||m.radius_wu,track:m.invulnerable_active});break;}
   case 'aura_hit':if(m.wave_speed_wu_s){this.zones.push({type:'expanding',owner:f.i,x:f.x,life:m.radius_wu/m.wave_speed_wu_s+.1,m,id,age:0,hit:false});}else if(near(m.radius_wu))hit(m.soulLines?m.damage*Math.max(1,Math.min(3,f.souls)):m.damage);this.fx('ring',f.x,60,this.hero(f.i).color,{size:m.radius_wu,life:.65,maxLife:.65});break;
   case 'ground':if(Math.abs(t.x-c.aim)<=m.radius_wu+22&&(m.height!=='ground'||t.y<45)){let d=m.damage+(id==='shadow_fiend_raze'?f.souls*2:0);if(m.stack_damage){const b=this.buff(t,'raze');d+=(b?.m.stacks||0)*m.stack_damage;this.addBuff(t,'raze',{stacks:Math.min(m.max_stacks,(b?.m.stacks||0)+1)},m.stack_duration_s);}hit(d);}this.fx('pillar',c.aim,0,this.hero(f.i).color,{size:m.radius_wu,life:.6,maxLife:.6});break;
   default:if(near(m.range_wu||m.radius_wu)){let d=m.damage;if(m.missing_mana_multiplier)d=Math.min(m.damage_cap,d+(t.maxMp-t.mp)*m.missing_mana_multiplier);if(m.execute_threshold_pct&&t.hp/t.maxHp<=m.execute_threshold_pct)d=m.execute_damage;if(id==='sven_cleave')d+=this.property(f,'cleave_bonus');hit(d);this.fx('beam',f.x,f.y+100,this.hero(f.i).color,{tx:t.x,ty:t.y+100});}break;
  }
  this.log('activate',f.i,{skill:id,slot:c.slot});
 }
 spawnProjectile(f,c,damage,id){const m=c.m;this.projectiles.push({owner:f.i,x:f.x+f.dir*35,y:f.y+(m.height==='ground'?35:100),dir:c.dir,v:m.projectile_speed_wu_s||800,travel:0,range:m.range_wu,r:Math.max(12,m.radius_wu||18),damage,m,id,reflected:false});}
 dash(i){const f=this.fighters[i];if(this.phase!=='fight'||this.blocked(f)||f.root>0||f.dashCd>0||f.cast||f.channel||f.recovery>0)return false;const inp=this.input[i];f.motion={dir:(inp.right?1:0)-(inp.left?1:0)||f.dir,speed:1000,life:.18};f.invuln=.12;f.dashCd=3;f.recovery=.22;this.animate(f,'dash',.2);this.fx('dash',f.x,f.y+90,this.hero(i).color);this.log('dash',i,{});return true;}
 step(dt=FIXED_DT){if(this.paused||this.phase==='matchEnd')return;dt=Math.min(dt,.05);this.frame++;this.effects=this.effects.filter(e=>(e.life-=dt)>0);this.shake=Math.max(0,this.shake-dt*30);if(this.hitstop>0){this.hitstop-=dt;return;}
  if(this.phase!=='fight'){this.phaseTime-=dt;if(this.phaseTime<=0){if(this.phase==='intro'){this.phase='fight';this.fx('announce',600,310,'#ffe3ab',{text:'FIGHT',life:.8,maxLife:.8});}else if(this.phase==='roundEnd'){if(this.score.some(s=>s>=2))this.phase='matchEnd';else{this.round++;this.resetRound();}}}return;}
  this.t+=dt;if(this.mode!=='training')this.time=Math.max(0,this.time-dt);
  if(this.mode==='cpu')this.ai(1,dt);
  for(const f of this.fighters){const i=f.i,t=this.fighters[1-i],h=this.hero(i),inp=this.input[i],prev=this.previous[i];
   const hard=f.stun>0||f.hex>0||f.fear>0||f.taunt>0;
   for(const k of ['attackCd','recovery','stun','root','silence','hex','fear','taunt','slow','invuln','ccGrace','dashCd','animTime','hitFlash','comboTime'])f[k]=Math.max(0,(f[k]||0)-dt);
   if(hard&&!this.blocked(f)){f.ccGrace=1;f.ccChain=0;}if(f.slow<=0)f.slowPct=0;
   f.cd=f.cd.map(v=>Math.max(0,v-dt));for(const b of f.buffs){b.life-=dt;b.reveal=Math.max(0,(b.reveal||0)-dt);if(b.life<=0&&b.m.souls)f.souls=Math.max(0,f.souls-b.m.souls);}f.buffs=f.buffs.filter(b=>b.life>1e-8);if(f.animTime<=0)f.animation='idle';
   for(let s=0;s<4;s++){const m=this.ability(i,s).mvp;if(m.charges&&f.charges[s]<m.charges){f.chargeTimers[s]-=dt;if(f.chargeTimers[s]<=1e-8){f.charges[s]++;f.chargeTimers[s]=f.charges[s]<m.charges?m.charge_restore_s:0;}}}if(this.t-f.lastDamageTime>7)f.cleanseDamage=0;const regen=h.id==='crystal_maiden'?((h.mana_regen||8)+4)*1.8:(h.mana_regen||8);f.mp=Math.min(f.maxMp,f.mp+regen*dt);f.dir=t.x>=f.x?1:-1;
   const horizontal=(inp.right?1:0)-(inp.left?1:0),vertical=(inp.up||inp.jump?1:0)-(inp.down?1:0);f.direction=(vertical>0?7:vertical<0?1:4)+horizontal+1;f.relativeDirection=horizontal*f.dir;f.crouching=vertical<0&&f.y<=0&&!this.blocked(f)&&!f.cast&&!f.channel&&f.recovery<=0;let move=horizontal;if(f.fear>0)move=-f.dir;if(f.taunt>0)move=f.dir;
   f.guard=!!(inp.guard||f.crouching||move*f.dir<0)&&!this.blocked(f)&&f.y<=0&&!inp.attack&&!inp.heavy&&!f.cast&&!f.channel&&f.recovery<=0&&f.root<=0;
   if(!f.guard)f.guardMeter=Math.min(100,f.guardMeter+dt*18);
   if(f.cast){f.cast.remaining-=dt;if(f.cast.remaining<=0){const c=f.cast;f.cast=null;this.activate(f,c);}}
   if(f.channel){const ch=f.channel,m=ch.m;if(move||!inp['s'+ch.slot]||this.blocked(f)||f.silence>0){f.channel=null;f.recovery=.2;if(m.effect==='grab'){t.stun=0;t.grabbedBy=null;}}else{ch.life-=dt;ch.tick-=dt;this.animate(f,'cast',.1);if(ch.tick<=1e-7){ch.tick+=m.tick_interval_s;const range=m.break_range_wu||m.range_wu||m.radius_wu;if(Math.abs(f.x-t.x)<=range+22){if(m.effect==='drain'){const amt=Math.min(t.mp,m.mana_drain_per_tick||12,f.maxMp-f.mp);t.mp-=amt;f.mp+=amt;t.slow=.4;t.slowPct=t.mp<=0?.45:.3;this.fx('beam',f.x,f.y+100,'#8db7ff',{tx:t.x,ty:t.y+100});}else if(m.effect==='channel_projectile'){this.spawnProjectile(f,{m,dir:ch.dir},m.damage,ch.id);}else{let lands=true;if(m.randomExplosion){const a=this.random()*Math.PI*2,r=m.explosionMin+this.random()*(m.explosionMax-m.explosionMin),ex=f.x+Math.cos(a)*r,ez=Math.sin(a)*r;this.fx('pillar',ex,0,this.hero(f.i).color,{size:35,life:.2,maxLife:.2});lands=Math.hypot(t.x-ex,ez)<m.explosionRadius;}if(lands)this.hit(f,t,m.damage,m,{skill:ch.id,linaDone:true});if(m.heal_total)this.heal(f,m.heal_total/m.ticks);this.fx('ring',f.x,60,h.color,{size:m.radius_wu||90});}}else if(m.effect==='drain'||m.effect==='grab')ch.life=0;}if(ch.life<=1e-7){f.channel=null;f.recovery=.25;t.grabbedBy=null;}}}
   if(f.motion){const mot=f.motion;const before=f.x;this.move(f,mot.dir*mot.speed*Math.min(dt,mot.life));mot.distance=(mot.distance||0)+Math.abs(f.x-before);mot.life-=dt;if(mot.damage&&!mot.hit&&Math.abs(f.x-t.x)<65&&Math.abs(f.y-t.y)<110){this.hit(f,t,mot.damage*Math.min(1,mot.distance/(mot.maxDistance||mot.distance)),mot.m,{skill:mot.id});mot.hit=true;}if(mot.life<=0)f.motion=null;}
   else if(f.stun<=0&&f.root<=0&&!f.cast&&!f.channel&&f.recovery<=0){const fiery=this.buff(f,'fiery')?.m.stacks||0;const multiplier=(this.property(f,'move_multiplier')||1)*(1-this.property(f,'self_slow'))*(1-f.slowPct*(1-this.property(f,'slow_resistance')))*(1+fiery*.025);const groundSpeed=f.hex>0?100:(h.move_speed+this.property(f,'move_bonus'))*multiplier;this.move(f,(f.y>0||f.vy>0?f.airVx:f.crouching?0:move*groundSpeed)*dt);if(f.crouching)this.animate(f,'crouch',.1);else if(move&&f.y<=0)this.animate(f,'walk',.1);}
   if(f.y>0||f.vy>0){f.y+=f.vy*dt;f.vy-=1750*dt;if(f.y<=0){f.y=0;f.vy=0;f.airVx=0;this.fx('dust',f.x,0,'#bfb8a3');}}
   if(!this.blocked(f)){
    if(inp.jump&&!prev.jump&&!inp.down&&f.y<=0&&f.root<=0&&!f.cast&&!f.channel&&f.recovery<=0){f.vy=680;f.airVx=horizontal*(h.move_speed+this.property(f,'move_bonus'))*(this.property(f,'move_multiplier')||1)*(1-this.property(f,'self_slow'))*(1-f.slowPct*(1-this.property(f,'slow_resistance')))*(1+(this.buff(f,'fiery')?.m.stacks||0)*.025);f.jumpKind=horizontal===0?'neutral':horizontal*f.dir>0?'forward':'back';f.guard=false;f.crouching=false;this.animate(f,'jump',.8);}
    if(inp.dash&&!prev.dash)this.dash(i);
    if(inp.attack)this.attack(i,false);if(inp.heavy&&!prev.heavy)this.attack(i,true);
    for(let s=0;s<4;s++){const key='s'+s,m=this.ability(i,s).mvp;if(inp[key]&&!prev[key]){if(m.input==='charge'){f.chargeSlot=s;f.charge=0;}else this.cast(i,s);}
     if(!inp[key]&&prev[key])this.release(i,s);}
    if(f.chargeSlot>=0)f.charge=Math.min(this.ability(i,f.chargeSlot).mvp.charge_max_s||1,f.charge+dt);
   }
   if(f.taunt>0&&f.attackCd<=0){const save=f.taunt;f.taunt=0;this.attack(i);f.taunt=save;}
   for(const dot of f.dots){dot.life-=dt;dot.elapsed=(dot.elapsed||0)+dt;dot.tick-=dt;if(dot.tick<=1e-7){dot.tick+=dot.m.tick_interval_s;this.hit(this.fighters[dot.owner],f,dot.m.damage,{...dot.m,stun_s:0,hitstun_s:0},{dot:true,skill:dot.id,linaDone:true});}if(dot.m.burstInterval&&dot.elapsed+1e-7>=dot.nextBurst){this.hit(this.fighters[dot.owner],f,Math.max(0,dot.hp0-f.hp)*dot.m.lost_hp_multiplier,dot.m,{dot:true,skill:dot.id});dot.nextBurst+=dot.m.burstInterval;}if(dot.life<=1e-7&&dot.m.lost_hp_multiplier&&!dot.m.burstInterval)this.hit(this.fighters[dot.owner],f,Math.min(dot.m.burst_cap,Math.max(0,dot.hp0-f.hp)*dot.m.lost_hp_multiplier),dot.m,{dot:true,skill:dot.id});}
   f.dots=f.dots.filter(d=>d.life>1e-7);this.previous[i]={...inp};
  }
  const [a,b]=this.fighters;if(Math.abs(a.x-b.x)<60&&Math.abs(a.y-b.y)<90&&!a.motion&&!b.motion){const dir=a.x<=b.x?-1:1,mid=(a.x+b.x)/2;a.x=clamp(mid+dir*30,45,1155);b.x=clamp(mid-dir*30,45,1155);}
  const due=this.events.filter(e=>e.at<=this.t);this.events=this.events.filter(e=>e.at>this.t);for(const e of due){if(e.type==='attack')this.resolveAttack(e);else if(e.type==='skill_hit'){const f=this.fighters[e.owner],t=this.fighters[1-e.owner];if(Math.abs(t.x-f.x)<=e.range+22&&!this.blocked(f)){if(e.track){this.move(f,t.x-f.dir*75-f.x);this.fx('slash',t.x,t.y+100,this.hero(f.i).color,{size:160,dir:f.dir});}this.hit(f,t,e.damage,e.m,{skill:e.id,linaDone:true});}}}
  for(const p of this.projectiles){const old=p.x;p.x+=p.dir*p.v*dt;p.travel+=p.v*dt;const f=this.fighters[p.owner],t=this.fighters[1-p.owner];if(p.x<0||p.x>1200||p.travel>p.range){p.dead=true;continue;}const crossed=Math.abs(p.x-t.x)<p.r+28||(old-t.x)*(p.x-t.x)<=0;const yhit=Math.abs(p.y-(t.y+80))<p.r+65&&(p.m.height!=='ground'||t.y<45);
   const ward=this.zones.find(z=>z.type==='ward'&&z.owner!==p.owner&&Math.abs(p.x-z.x)<25);if(ward){ward.life=0;p.dead=true;continue;}
   if(crossed&&yhit){const counter=this.buff(t,'counter');if(!p.basic&&p.m.reflectable&&!p.reflected&&counter&&!counter.m.counter_type){p.owner=t.i;p.dir=-p.dir;p.reflected=true;p.travel=0;p.x=t.x+p.dir*35;t.buffs=t.buffs.filter(x=>x!==counter);this.fx('text',t.x,t.y+190,'#b5dcff',{text:'反制!'});continue;}
    if(p.basic)this.basicHit(f,t,p);else{let m={...p.m},damage=p.damage;if(m.distance_damage_per_100){damage=Math.min(m.damage_cap,damage+p.travel/100*m.distance_damage_per_100);m.stun_s=Math.min(m.stun_cap_s,m.stun_s+(m.arrowStunRate||.0006)*p.travel);}if(m.wall_bind_distance_wu&&((p.dir===1?1155-t.x:t.x-45)<m.wall_bind_distance_wu||this.zones.some(z=>z.type==='wall'&&Math.abs(z.x-t.x)<m.wall_bind_distance_wu)))m.stun_s=m.wall_bind_stun_s;
     const waveTotal=m.damageOverTime?damage:0,waveGuard=!!t.guard,waveEligible=t.invuln<=0;if(m.damageOverTime)damage=0;const ok=this.hit(f,t,damage,m,{skill:p.id});if(m.damageOverTime&&waveEligible){t.dots.push({owner:p.owner,id:p.id,life:m.damageOverTime,tick:.1,m:{...m,damage:waveTotal/(m.damageOverTime/.1)*(waveGuard?.2:1),damageOverTime:0,tick_interval_s:.1,knockback_wu:0,stun_s:0,chip:waveGuard},hp0:t.hp});}if(ok&&p.id==='phantom_assassin_dagger'&&this.random()<.34)this.addBuff(f,'deadlyFocus',{},10);if(ok&&m.effect==='projectile_dot')t.dots.push({owner:p.owner,id:p.id,life:m.duration_s,tick:m.tick_interval_s,m:{...m,damage:m.dot_damage,stun_s:0},hp0:t.hp});}
    p.dead=true;}}
  this.projectiles=this.projectiles.filter(p=>!p.dead);
  for(const z of this.zones){const f=this.fighters[z.owner],t=this.fighters[1-z.owner],m=z.m;z.life-=dt;z.age=(z.age||0)+dt;if(z.type==='trap'&&m.walkSpeed)z.x+=clamp(z.targetX-z.x,-m.walkSpeed*dt,m.walkSpeed*dt);if(z.type==='ward'&&m.follow){z.x+=clamp(f.x-z.x,-178.75*dt,178.75*dt);}if(z.type==='heal'&&m.mana_per_second){f.mp=Math.max(0,f.mp-m.mana_per_second*dt);if(f.mp<=0){z.life=0;f.buffs=f.buffs.filter(b=>b.key!==z.id);}}z.tick=(z.tick||0)-dt;
   if(z.type==='heal'&&!this.buff(f,z.id)){z.life=0;continue;}
   if(z.type==='aura'){if(!this.buff(f,'aura')){z.life=0;continue;}z.x=f.x;}
   if(z.type==='expanding'){if(!z.hit&&Math.abs(t.x-z.x)<=z.age*m.wave_speed_wu_s&&Math.abs(t.x-z.x)<=m.radius_wu){this.hit(f,t,m.damage,m,{skill:z.id});z.hit=true;}continue;}
   if(z.type==='trap'&&z.age>=z.arm&&t.y<45&&Math.abs(t.x-z.x)<=m.radius_wu){this.hit(f,t,m.damage,m,{skill:z.id});this.fx('ring',z.x,50,this.hero(z.owner).color,{size:m.radius_wu});z.life=0;continue;}
   if(z.tick<=1e-7){z.tick+=m.tick_interval_s||.2;if(['ward','heal'].includes(z.type)){if(z.type==='heal'||Math.abs(f.x-z.x)<=m.radius_wu)this.heal(f,m.heal_total/m.ticks);}else if(['aura','ground_dot'].includes(z.type)){if(Math.abs(t.x-z.x)<=m.radius_wu+22&&(z.type!=='ground_dot'||t.y<45))this.hit(f,t,m.damage,m,{dot:true,skill:z.id,linaDone:true});if(m.self_damage_per_tick)f.hp=Math.max(1,f.hp-m.self_damage_per_tick);}}
  }this.zones=this.zones.filter(z=>z.life>1e-7);
  if(this.mode==='training'){for(const f of this.fighters)if(f.hp<=0){f.hp=f.maxHp;f.mp=f.maxMp;this.fx('text',f.x,220,'#fff',{text:'训练重置'});}}
  else if(a.hp<=0||b.hp<=0||this.time<=0){const diff=a.hp/a.maxHp-b.hp/b.maxHp;this.winner=Math.abs(diff)<.0001?-1:diff>0?0:1;if(this.winner>=0)this.score[this.winner]++;this.phase='roundEnd';this.phaseTime=3;this.input=[{},{}];this.history.push({round:this.round,winner:this.winner,remaining:this.time,damage:[a.damage,b.damage]});this.log('round_end',this.winner,{score:[...this.score]});}
 }
 ai(i,dt){const f=this.fighters[i],t=this.fighters[1-i],d=Math.abs(f.x-t.x),inp={};f.aiDelay-=dt;if(f.aiDelay<=0){f.aiDelay=.12+this.random()*.16;f.aiIntent={guard:!!t.cast&&this.random()<.65,attack:d<this.hero(i).attack_range+15,dash:d>500&&this.random()<.25,jump:this.projectiles.some(p=>p.owner!==i&&Math.abs(p.x-f.x)<220)&&this.random()<.4};if(this.random()<.35){const slots=this.hero(i).abilities.map((a,s)=>s).filter(s=>!this.ability(i,s).mvp.passive&&f.cd[s]<=0&&f.mp>=this.ability(i,s).mvp.mana);if(slots.length)f.aiIntent['s'+slots[Math.floor(this.random()*slots.length)]]=true;}}
  Object.assign(inp,f.aiIntent);if(d>this.hero(i).attack_range*.8&&!inp.guard){inp[t.x>f.x?'right':'left']=true;}if(f.channel){for(let s=0;s<4;s++)inp['s'+s]=s===f.channel.slot;delete inp.left;delete inp.right;}this.input[i]=inp;}
 snapshot(){return clone({indices:this.indices,mode:this.mode,score:this.score,round:this.round,time:this.time,t:this.t,frame:this.frame,phase:this.phase,phaseTime:this.phaseTime,winner:this.winner,paused:this.paused,fighters:this.fighters,projectiles:this.projectiles,zones:this.zones,effects:this.effects,shake:this.shake,history:this.history});}
}
