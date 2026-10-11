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
 positions=[];free=[(0,0,width,2048)];tall=[i for i in items if i['image'].height>200];wide=[i for i in items if i['image'].width>200 and i['image'].height<=200]
 for i in sorted(items,key=lambda x:(-max(x['image'].size),-x['image'].width*x['image'].height,x['id'],x['pose'])):
  w,h=i['image'].size;w+=2;h+=2
  choices=[(min(fw-w,fh-h),max(fw-w,fh-h),fy,fx) for fx,fy,fw,fh in free if w<=fw and h<=fh]
  if not choices:raise ValueError(('Atlas full',name,i['id']))
  _,_,y,x=min(choices)
  if name=='ui' and i in tall:
   n=tall.index(i);x=n%4*276;y=n//4*328
  elif name=='ui' and i in wide:
   n=wide.index(i);x=n%4*258;y=((len(tall)+3)//4)*328+n//4*146
  positions.append((i,x+1,y+1));rects=[]
  for fx,fy,fw,fh in free:
   if x>=fx+fw or x+w<=fx or y>=fy+fh or y+h<=fy:rects.append((fx,fy,fw,fh));continue
   if x>fx:rects.append((fx,fy,x-fx,fh))
   if x+w<fx+fw:rects.append((x+w,fy,fx+fw-x-w,fh))
   if y>fy:rects.append((fx,fy,fw,y-fy))
   if y+h<fy+fh:rects.append((fx,y+h,fw,fy+fh-y-h))
  free=[r for j,r in enumerate(rects) if not any(j!=k and r[0]>=q[0] and r[1]>=q[1] and r[0]+r[2]<=q[0]+q[2] and r[1]+r[3]<=q[1]+q[3] and (r!=q or j>k) for k,q in enumerate(rects))]
 height=max(y+i['image'].height+1 for i,x,y in positions)
 im=Image.new('RGBA',(width,height));assert max(im.size)<=2048,(name,im.size)
 for i,x,y in positions:im.paste(i['image'],(x,y))
 temp=out/(name+'.temporary.webp');im.save(temp,'WEBP',quality=82,method=6,exact=True);decoded=Image.open(temp).convert('RGBA');assert decoded.getchannel('A').tobytes()==im.getchannel('A').tobytes(),name
 content=temp.read_bytes();digest=hashlib.sha256(content).hexdigest();target=out/(name+'-'+digest[:12]+'.webp');temp.replace(target)
 asset=dict(src=str(target),bytes=len(content),width=im.width,height=im.height,decodedRGBABytes=im.width*im.height*4,sha256=digest);return positions,asset
sprites={};assets=[]
groups=[[],[]];pixels=[0,0]
for hero in sorted(heroes,key=lambda h:-sum(i['image'].width*i['image'].height for i in items if i['id']==h['id'])):
 group=0 if pixels[0]<=pixels[1] else 1
 frames=[i for i in items if i['id']==hero['id']];groups[group].extend(frames);pixels[group]+=sum((i['image'].width+2)*(i['image'].height+2) for i in frames)
for group in range(2):
 positions,asset=pack(groups[group],2048,'fighters-'+str(group+1));assets.append(asset)
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
