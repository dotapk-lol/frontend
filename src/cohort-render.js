// Canvas-only presentation of snapshot data. No gameplay decisions or timers.
export function drawCohortWorld(c,g,now){const p=g.packState;if(!p)return;c.save();
 for(const a of p.areas){c.globalAlpha=a.type==='water'?.24:.35;c.fillStyle=a.type==='water'?'#65aef2':'#79cb36';c.strokeStyle=c.fillStyle;c.lineWidth=2;c.beginPath();c.ellipse(a.x+40,502,a.radius,Math.min(34,a.radius*.18),0,0,Math.PI*2);c.fill();c.globalAlpha=.65;c.stroke();}
 for(const r of p.rings){c.globalAlpha=.85;c.strokeStyle='#75dfff';c.shadowColor=c.strokeStyle;c.shadowBlur=15;c.lineWidth=4;c.beginPath();c.ellipse(r.x+40,475,Math.max(1,r.radius),Math.max(10,r.radius*.3),0,0,Math.PI*2);c.stroke();}
 for(const l of p.links){if(!l.draining)continue;const a=g.fighters[l.owner],b=g.fighters[l.target];c.globalAlpha=.9;c.strokeStyle='#81dcff';c.lineWidth=3;c.beginPath();for(let i=0;i<=12;i++){const x=a.x+(b.x-a.x)*i/12+40,y=405-(a.y+(b.y-a.y)*i/12)+Math.sin(i*2+now*.016)*7;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}
 for(const s of p.storms){if(s.life<=0)continue;const f=g.fighters[s.owner];c.globalAlpha=.3;c.strokeStyle='#75c5ff';c.lineWidth=5;c.beginPath();c.ellipse(f.x+40,265-f.y,110,25,0,0,Math.PI*2);c.stroke();}
 for(const m of p.missiles){c.globalAlpha=.95;c.fillStyle=m.kind==='mist_coil'?'#75ffe3':'#8aff4d';c.shadowColor=c.fillStyle;c.shadowBlur=16;c.beginPath();c.ellipse(m.x+40,505-m.y,20,11,0,0,Math.PI*2);c.fill();}
 c.restore();}
export function drawCohortFighter(c,f){if(!f.pack)return;const p=f.pack,x=f.x+40,y=505-f.y;c.save();if(p.shield||p.borrowed>0){c.strokeStyle=p.borrowed>0?'#adffdf':'#61cfe0';c.lineWidth=p.borrowed>0?5:3;c.shadowColor=c.strokeStyle;c.shadowBlur=18;c.globalAlpha=.65;c.beginPath();c.ellipse(x,y-100,75,110,0,0,Math.PI*2);c.stroke();if(p.shield){c.fillStyle='#182b36';c.fillRect(x-34,y-217,68,5);c.fillStyle='#8de7ee';c.fillRect(x-34,y-217,68*p.shield.amount/210,5);}}if(p.water){c.strokeStyle='#95daff';c.globalAlpha=.75;c.beginPath();c.ellipse(x,y-3,60,12,0,0,Math.PI*2);c.stroke();}c.restore();}
export function validCohortSnapshot(g,{poisonLimit=6}={}){
 const needed=g.indices.some(id=>[25,31,45,100].includes(id)),p=g.packState;
 if(!p)return !needed;
 const player=v=>v===0||v===1,finite=(v,keys)=>v&&keys.every(k=>Number.isFinite(v[k]));
 if(!['areas','missiles','links','storms','rings'].every(k=>Array.isArray(p[k])&&p[k].length<=256))return false;
 if(!p.areas.every(v=>finite(v,['x','radius','life'])&&player(v.owner)&&['water','toxin'].includes(v.type)&&v.radius>=0))return false;
 if(!p.missiles.every(v=>finite(v,['x','y'])&&player(v.owner)&&['nethertoxin','mist_coil','viper_strike'].includes(v.kind)))return false;
 if(!p.rings.every(v=>finite(v,['x','radius','life'])&&player(v.owner)&&v.radius>=-1e-6))return false;
 if(!p.links.every(v=>finite(v,['amount','life'])&&player(v.owner)&&player(v.target)&&v.owner!==v.target&&typeof v.draining==='boolean'))return false;
 if(!p.storms.every(v=>finite(v,['life','tick'])&&player(v.owner)))return false;
 return g.fighters.every(f=>{const a=f.pack;return a&&Array.isArray(a.statuses)&&a.statuses.length<=64&&a.statuses.every(s=>s&&typeof s.key==='string'&&Number.isFinite(s.life)&&s.values&&typeof s.values==='object')&&Array.isArray(a.poison)&&a.poison.length<=poisonLimit&&a.poison.every(s=>s&&player(s.owner)&&Number.isFinite(s.life))&&Number.isFinite(a.borrowed)&&(!a.shield||finite(a.shield,['amount','life']));});
}
