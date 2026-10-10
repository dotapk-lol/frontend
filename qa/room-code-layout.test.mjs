import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const css=fs.readFileSync(new URL('../src/style.css',import.meta.url),'utf8');
const rule=css.match(/\.invite-code-display\{([^}]+)\}/)?.[1];assert(rule);
const declarations=Object.fromEntries(rule.split(';').filter(Boolean).map(part=>{const colon=part.indexOf(':');return [part.slice(0,colon),part.slice(colon+1)];}));
// CSS cascade and text-space budgets only; native/browser layout is verified separately.
test('selection header spacing cannot override the waiting-room code input',()=>{
 assert(css.includes('.room-header #p2p-room-code{letter-spacing:.16em}'));
 assert(!/(?:^|})#p2p-room-code\{/.test(css),'a bare ID selector would outrank the waiting input class');
 assert.equal(declarations['letter-spacing'],'.06em');assert.equal(declarations.padding,'0');assert.equal(declarations.border,'0');assert.equal(declarations['font-variant-numeric'],'tabular-nums');
});
test('six digits plus every letter-spacing advance fit with native-input spare room',()=>{
 const width=declarations.width.match(/^calc\((\d+)ch \+ ([\d.]+)em\)$/);assert(width);
 const spacing=parseFloat(declarations['letter-spacing']);assert.equal(+width[1],6);
 for(const digitAdvance of [.5,.6,.602,.65,.7]){const field=+width[1]*digitAdvance+ +width[2],text=6*digitAdvance+6*spacing;assert(field-text>=.35,'reserve both digit spacing and input edge tolerance');}
});
test('desktop and narrow portrait/landscape code budgets fit safe-area content without growing short rows',()=>{
 const sizing=declarations.font.match(/^700 min\(clamp\((\d+)px,([\d.]+)dvh,(\d+)px\),([\d.]+)vw\)\/([\d.]+) ui-monospace,monospace$/);assert(sizing);
 const [,min,heightRate,max,widthRate,lineHeight]=sizing.map(Number),width=declarations.width.match(/^calc\((\d+)ch \+ ([\d.]+)em\)$/);
 for(const [w,h,safe]of [[320,568,44],[390,844,0],[430,932,0],[480,240,44],[568,320,44],[844,390,44],[1188,761,0],[1920,1080,0]]){
  const size=Math.min(Math.max(min,h*heightRate/100),max,w*widthRate/100),available=w-2*safe-24;
  // .7em deliberately exceeds the measured .600-.602em monospaced digit advances.
  assert((+width[1]*.7+ +width[2])*size<=available,`${w}x${h} code fits after safe-area and content padding`);
  if(h===240)assert(size*lineHeight<=48*1.05,'existing short-row height budget remains valid');
 }
});
