import {packStatusEffective} from './pack-services.js';
const finite=(n,fallback=0)=>Number.isFinite(n)?n:fallback;
const statusContext={property:(f,key)=>f.buffs.reduce((n,b)=>Math.max(n,Number(b.m[key])||0),0)};
export function packVisualState(f,g){
 const statuses=Object.values(f.packModules||{}).flatMap(s=>s.statuses||[]).filter(s=>packStatusEffective(statusContext,f,s));
 const labels=[],flag=key=>statuses.some(s=>s.values?.[key]===true||Number(s.values?.[key])>0);
 for(const [key,label]of [['silence','沉默'],['disarm','缴械'],['break','破被动'],['moveSlow','减速'],['slow','减速']])if(flag(key)&&!labels.includes(label))labels.push(label);
 for(const c of g.packCore?.controls||[])if(c.target===f.i&&c.life>0&&(c.pierces||!statusContext.property(f,'debuffImmune')))labels.push(({stun:'眩晕',root:'禁锢',hex:'妖术',fear:'恐惧',taunt:'嘲讽'})[c.type]);
 const states=Object.values(f.packModules||{}).map(s=>s.data||{}),channel=states.find(s=>s.channel||s.extra?.channel||s.windup);
 if(channel)labels.push('引导中');
 const active=statuses.filter(s=>!s.hostile).map(s=>s.abilityId||s.values?.abilityId||s.key);
 if(active.includes('dragon_knight_elder_dragon_form'))labels.push('龙形态');if(active.includes('night_stalker_darkness'))labels.push('黑夜');
 const barriers=states.reduce((n,s)=>n+(s.barriers||[]).reduce((v,b)=>v+finite(b.amount),0),0);
 return {labels:[...new Set(labels)],positive:statuses.some(s=>!s.hostile),barrier:barriers,channel:!!channel,dragon:active.includes('dragon_knight_elder_dragon_form'),veil:active.some(k=>k.includes('pierce_the_veil'))};
}
export function drawPackFighter(c,f,g,color){const v=packVisualState(f,g);if(!f.packModules&&!g.packCore)return v;c.save();const x=f.x+40,y=505-f.y;
 if(v.positive||v.barrier>0){c.globalAlpha=.5;c.strokeStyle=color;c.lineWidth=v.barrier>0?5:2;c.beginPath();c.ellipse(x,y-96,64,104,0,0,Math.PI*2);c.stroke();}
 if(v.channel){c.strokeStyle=color;c.globalAlpha=.85;c.lineWidth=3;c.beginPath();c.ellipse(x,y-8,69,17,0,0,Math.PI*2);c.stroke();}
 c.restore();return v;}
export function drawPackWorld(c,g,now,heroFor){
 for(const world of Object.values(g.packModules||{}))for(const ent of world.entities||[]){if(ent.life<=0)continue;const d=ent.data||{},f=g.fighters[ent.owner],color=heroFor(g.indices[ent.owner]).color;const x=ent.x+40,y=505-finite(ent.y);c.save();c.strokeStyle=color;c.fillStyle=color;c.shadowColor=color;c.shadowBlur=12;
  if(['homing','orb','spirit'].includes(ent.kind)){c.globalAlpha=.9;c.beginPath();c.ellipse(x,y-(ent.y?0:95),ent.kind==='spirit'?11:18,10,0,0,Math.PI*2);c.fill();const target=g.fighters[d.target];if(target&&ent.kind==='spirit'){c.globalAlpha=.45;c.beginPath();c.moveTo(f.x+40,405-f.y);c.lineTo(target.x+40,405-target.y);c.stroke();}}
  else{let radius=finite(d.radius,90);if(ent.kind==='extra'){const a=heroFor(g.indices[ent.owner]).abilities.find(a=>a.id===d.abilityId),p=a?.official?.params||{};radius=finite(p.radius||p.pit_radius||p.area_of_effect,180)*.55;}radius=Math.min(660,Math.max(18,radius));c.globalAlpha=.16;c.beginPath();c.ellipse(x,502,radius,Math.min(42,radius*.18),0,0,Math.PI*2);c.fill();c.globalAlpha=.7;c.lineWidth=2;c.stroke();for(let j=0;j<5;j++){const px=x+Math.sin(j*7+now*.0007)*radius*.8,py=488-(Math.sin(now*.002+j)+1)*18;c.globalAlpha=.3;c.beginPath();c.arc(px,py,3,0,Math.PI*2);c.fill();}}
  c.restore();
 }
 for(const f of g.fighters){const swarm=f.packModules?.r20_55?.data?.swarm;if(!swarm)continue;c.save();c.fillStyle=heroFor(g.indices[f.i]).color;c.globalAlpha=.65;for(const [i,s]of swarm.spirits.entries()){c.beginPath();c.ellipse(s.x+40,400-f.y+Math.sin(now*.004+i)*30,10,6,0,0,Math.PI*2);c.fill();}c.restore();}
}
export function packSkillUI(f,a,g){const charge=f.packModules?.r91?.data?.extra?.charges?.find(c=>c.abilityId===a.id);return {charges:charge?.count??null,chargeWait:charge?.count===0?Math.max(0,(charge.pending[0]||g.t)-g.t):0,toggle:a.id==='huskar_burning_spear'?!!f.packModules?.c56_90?.data?.spears:null,armed:a.id==='jakiro_liquid_fire'&&!!f.packModules?.c56_90?.data?.liquidFire};}
