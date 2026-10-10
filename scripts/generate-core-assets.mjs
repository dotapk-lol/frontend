// Build the released game textures from existing local assets; no network or image dependency install.
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {runtimeHeroes} from '../src/runtime-heroes.js';
import {ACTIVE_ROSTER,lookupRuntimeHero} from '../src/hero-registry.js';
const root=new URL('../',import.meta.url),atlas=JSON.parse(fs.readFileSync(new URL('../assets/atlas.json',import.meta.url)));
const heroes=ACTIVE_ROSTER.heroIds.map(id=>lookupRuntimeHero(runtimeHeroes,id));
const input=heroes.map(h=>{const a=atlas.heroes[h.id];return {id:h.id,primary:a?{src:a.sheet||atlas.sheets[a.sheetId],frames:a.frames,referenceHeight:a.referenceHeight}:{src:h.render},portrait:h.portrait,icons:h.abilities.map(a=>a.icon)};});
const python=String.raw`import sys,json,hashlib
from pathlib import Path
from PIL import Image
heroes=json.load(sys.stdin); out=Path('assets/core');out.mkdir(exist_ok=True)
items=[]
for index,h in enumerate(heroes):
 p=h['primary'];im=Image.open(p['src']).convert('RGBA');frames=p.get('frames')
 for pose,f in enumerate(frames or [[0,0,im.width,im.height,im.width/2,im.height]]):
  x,y,w,hh,*_=f;crop=im.crop((x,y,x+w,y+hh));items.append(dict(id=h['id'],index=index,pose=pose,image=crop,oldFrame=f,referenceHeight=p.get('referenceHeight',im.height),staticFrame=not bool(frames)))
def pack(items,width,name):
 x=y=row=0;positions=[]
 for i in sorted(items,key=lambda x:(-x['image'].height,-x['image'].width,x['id'],x['pose'])):
  w,h=i['image'].size
  if x+w+2>width:x=0;y+=row;row=0
  positions.append((i,x+1,y+1));x+=w+2;row=max(row,h+2)
 im=Image.new('RGBA',(width,y+row));assert max(im.size)<=2048,(name,im.size)
 for i,x,y in positions:im.paste(i['image'],(x,y))
 temp=out/(name+'.temporary.webp');im.save(temp,'WEBP',quality=82,method=6,exact=True);decoded=Image.open(temp).convert('RGBA');assert decoded.getchannel('A').tobytes()==im.getchannel('A').tobytes(),name
 content=temp.read_bytes();digest=hashlib.sha256(content).hexdigest();target=out/(name+'-'+digest[:12]+'.webp');temp.replace(target)
 asset=dict(src=str(target),bytes=len(content),width=im.width,height=im.height,decodedRGBABytes=im.width*im.height*4,sha256=digest);return positions,asset
sprites={};assets=[]
for group,width in [(0,1536),(1,2048)]:
 positions,asset=pack([i for i in items if (i['index']>=10)==bool(group)],width,'fighters-'+str(group+1));assets.append(asset)
 for i,x,y in positions:
  s=sprites.setdefault(i['id'],dict(primary=dict(src=asset['src'],frames=[],referenceHeight=i['referenceHeight'],staticFrame=i['staticFrame'])))
  s['primary']['frames'].append((i['pose'],[x,y,*i['oldFrame'][2:]]))
for s in sprites.values():s['primary']['frames']=[f for _,f in sorted(s['primary']['frames'])]
ui=[]
for f in sorted(set([h['portrait'] for h in heroes]+[i for h in heroes for i in h['icons'] if i])):
 im=Image.open(f).convert('RGBA');ui.append(dict(id=f,pose=0,image=im,oldFrame=[0,0,im.width,im.height]))
positions,asset=pack(ui,2048,'ui');assets.append(asset);uiMap={i['id']:[x,y,i['image'].width,i['image'].height] for i,x,y in positions}
Path('src/fighter-sprites.js').write_text('// Generated from existing artwork by scripts/generate-core-assets.mjs.\nexport const FIGHTER_SPRITES='+json.dumps(sprites,indent=2)+';\n')
Path('src/core-assets.js').write_text('// Generated from existing artwork by scripts/generate-core-assets.mjs.\nexport const CORE_ASSETS='+json.dumps(assets,indent=2)+';\nexport const UI_SPRITES=Object.fromEntries('+json.dumps(list(uiMap.items()),indent=2)+');\n')
print(json.dumps(dict(heroes=len(sprites),frames=len(items),uiImages=len(ui),requiredFiles=len(assets),requiredBytes=sum(a['bytes'] for a in assets),decodedRGBABytes=sum(a['decodedRGBABytes'] for a in assets),assets=assets)))
`;
console.log(execFileSync(process.env.PYTHON||'python3',['-c',python],{cwd:root,input:JSON.stringify(input),encoding:'utf8'}).trim());
