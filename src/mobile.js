// Input and viewport rules are shared by the UI and source-executing regression tests.
export function mobileViewport(win=globalThis.window){const w=Number(win?.innerWidth)||0,h=Number(win?.innerHeight)||0;return w>0&&h>0&&(win?.matchMedia?.('(pointer: coarse)')?.matches||Math.min(w,h)<=600);}
export function portraitViewport(win=globalThis.window){return mobileViewport(win)&&win.innerHeight>win.innerWidth;}
export function controlSlots(mode,room,mobile=false){return room?[room.player===1?1:0]:mode==='local'&&!mobile?[0,1]:[0];}
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
export function toggleGameFullscreen(doc,screen,onMessage){return (async()=>{
 try{if(doc.fullscreenElement){await doc.exitFullscreen?.();return {fullscreen:false};}
 if(!doc.documentElement.requestFullscreen){onMessage('当前浏览器不支持网页全屏，请横屏游玩；可添加到主屏幕获得更大画面。');return {fullscreen:false,reason:'unsupported'};}
 await doc.documentElement.requestFullscreen();
 try{await screen?.orientation?.lock?.('landscape');}catch{onMessage('已进入全屏；请手动横转设备。');}
 return {fullscreen:!!doc.fullscreenElement};
 }catch{onMessage('未能进入全屏，仍可横屏游玩。');return {fullscreen:false,reason:'denied'};}
})();}
