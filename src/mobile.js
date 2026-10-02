// Input and viewport rules are shared by the UI and source-executing regression tests.
export function mobileViewport(win=globalThis.window){const w=Number(win?.innerWidth)||0,h=Number(win?.innerHeight)||0;return w>0&&h>0&&(win?.matchMedia?.('(pointer: coarse)')?.matches||Math.min(w,h)<=600);}
export function portraitViewport(win=globalThis.window){return mobileViewport(win)&&win.innerHeight>win.innerWidth;}
export function controlSlots(mode,room,mobile=false){return room?[room.player===1?1:0]:mode==='local'&&!mobile?[0,1]:[0];}
export function visualBounds(win=globalThis.window){
 const v=win?.visualViewport,positive=(n,fallback)=>Number.isFinite(n)&&n>0?n:fallback;
 const scale=positive(v?.scale,1),width=positive(v?.width,positive(win?.innerWidth,1280)),height=positive(v?.height,positive(win?.innerHeight,720));
 return {width,height,left:Math.max(0,Number(v?.offsetLeft)||0),top:Math.max(0,Number(v?.offsetTop)||0),scale,gameWidth:width*scale,gameHeight:height*scale};
}
export function displayMode(doc,win=globalThis.window){return doc?.fullscreenElement||doc?.webkitFullscreenElement?'fullscreen':win?.navigator?.standalone||win?.matchMedia?.('(display-mode: standalone)')?.matches||win?.matchMedia?.('(display-mode: fullscreen)')?.matches?'standalone':'browser';}
// Cancel only gestures starting in gameplay. Menus and ordinary toolbar clicks
// keep their native scrolling, focus and activation behavior.
const guardedBattleSurfaces=new WeakSet();
export function protectBattleGestures(surface,isPlaying){
 if(!surface?.addEventListener||guardedBattleSurfaces.has(surface))return;guardedBattleSurfaces.add(surface);
 const cancel=e=>{if(!isPlaying()||e.target?.closest?.('.battle-tools')||e.target?.closest?.('.overlay'))return;if(e.cancelable!==false)e.preventDefault();};
 for(const name of ['touchstart','touchmove','touchend','gesturestart','gesturechange','gestureend'])surface.addEventListener(name,cancel,{capture:true,passive:false});
 surface.addEventListener('contextmenu',cancel);
}
// Text is laid out in screen pixels, below the HUD, with bounded count and
// collision checks. Short viewports drop excess labels instead of covering UI.
export function combatLabelLayout(effects,view,width,height,safe={}){
 const font=Math.max(12,Math.min(18,25*view.scale)),line=font+7,top=(safe.top||0)+(height<=600?74:142),bottom=Math.min(height-(safe.bottom||0)-36,Math.max(top+line,view.ground+22));
 const left=(safe.left||0)+8,right=width-(safe.right||0)-8,placed=[];
 for(const e of effects.slice(-12).reverse()){
  if(placed.length>=6||bottom<top+font)break;
  const text=String(e.text??'').slice(0,14),w=Math.min(right-left,[...text].reduce((n,ch)=>n+(ch.codePointAt(0)>255?1:.66),0)*font+12),x=Math.max(left+w/2,Math.min(right-w/2,view.x+(e.x+40)*view.scale)),progress=1-e.life/(e.maxLife||.5),ideal=view.y+(505-e.y-progress*45)*view.scale;
  for(const step of [0,-1,1,-2,2,-3,3]){const y=Math.max(top+font,Math.min(bottom,ideal+step*line)),box={left:x-w/2,right:x+w/2,top:y-font,bottom:y+4};if(placed.some(p=>box.left<p.box.right+5&&box.right>p.box.left-5&&box.top<p.box.bottom+3&&box.bottom>p.box.top-3))continue;placed.push({text,x,y,font,color:e.color,alpha:Math.min(1,e.life/(e.maxLife||.5)),box});break;}
 }
 return placed;
}
export function arenaViewport(width,height,safe={},controlHeight=0){
 const w=Math.max(1,width),h=Math.max(1,height),left=safe.left||0,right=safe.right||0,top=safe.top||0,bottom=safe.bottom||0;
 const usableW=Math.max(1,w-left-right),usableH=Math.max(1,h-top-bottom),scale=Math.min(usableW/1280,usableH/720);
 const ground=top+Math.min(usableH*505/720,usableH-controlHeight-12);
 return {width:w,height:h,scale,x:left+(usableW-1280*scale)/2,y:ground-505*scale,ground};
}
export class VirtualStick {
 constructor(){this.reset();}
 reset(){this.sector=null;this.upUsed=false;this.upActive=false;return {x:0,y:0,input:{}};}
 update(dx,dy,radius){
  const distance=Math.hypot(dx,dy),r=Math.max(1,radius),amount=distance/r;
  if(amount<(this.sector===null?.22:.15))return this.reset();
  const angle=Math.atan2(dy,dx),step=Math.PI/4;
  if(this.sector===null||Math.abs(Math.atan2(Math.sin(angle-this.sector*step),Math.cos(angle-this.sector*step)))>step/2+.12)this.sector=(Math.round(angle/step)+8)%8;
  const sector=this.sector,v={};if([3,4,5].includes(sector))v.left=true;if([7,0,1].includes(sector))v.right=true;if([1,2,3].includes(sector))v.down=true;
  if([5,6,7].includes(sector)){v.up=true;if(!this.upActive&&!this.upUsed){this.upActive=true;this.upUsed=true;}v.jump=this.upActive;}else this.upActive=false;
  const clamp=Math.min(1,r/distance);return {x:dx*clamp,y:dy*clamp,input:v};
 }
}
export function toggleGameFullscreen(doc,screen,onMessage,win=globalThis.window){return (async()=>{
 try{const mode=displayMode(doc,win);if(mode==='standalone'){onMessage('已在主屏幕独立模式中游玩');return {fullscreen:true,standalone:true};}if(mode==='fullscreen'){const exit=doc.exitFullscreen||doc.webkitExitFullscreen;await exit?.call(doc);return {fullscreen:false};}
 const request=doc.documentElement.requestFullscreen||doc.documentElement.webkitRequestFullscreen;
 if(!request||doc.fullscreenEnabled===false){onMessage('当前浏览器不支持网页全屏；可添加到主屏幕，以独立模式打开。');return {fullscreen:false,reason:'unsupported'};}
 await request.call(doc.documentElement);
 if(displayMode(doc,win)!=='fullscreen'){onMessage('浏览器未进入全屏；可添加到主屏幕游玩。');return {fullscreen:false,reason:'denied'};}
 try{await screen?.orientation?.lock?.('landscape');}catch{onMessage('已进入全屏；请手动横转设备。');}
 return {fullscreen:true};
 }catch{onMessage('未能进入全屏，仍可横屏游玩。');return {fullscreen:false,reason:'denied'};}
})();}
