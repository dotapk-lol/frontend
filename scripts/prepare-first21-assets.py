# Reproducible web asset encoding. Official originals and SHA256 stay in incoming/.
from pathlib import Path
from PIL import Image
import json,hashlib
p=Path('reference/hero-pack-inputs/first21-assets.json');manifest=json.loads(p.read_text());out=Path('assets/first21');out.mkdir(parents=True,exist_ok=True)
for r in manifest['records']:
 source=Path(r['downloadedPath']);data=source.read_bytes()
 if hashlib.sha256(data).hexdigest()!=r['sha256']:raise ValueError('Original asset hash mismatch: '+str(source))
 im=Image.open(source).convert('RGBA');original=im.size
 if r['kind']=='render':
  bbox=im.getbbox()
  if not bbox:raise ValueError('Empty official render')
  im=im.crop(bbox);im.thumbnail((480,480),Image.Resampling.LANCZOS)
 else:im.thumbnail((288,162) if r['kind']=='portrait' else (128,128),Image.Resampling.LANCZOS)
 dest=out/(source.stem+'.webp');im.save(dest,'WEBP',quality=90,method=6)
 r['webAsset']={'file':str(dest),'width':im.width,'height':im.height,'bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'sourceSize':list(original),'operation':'alpha crop and fit 480px' if r['kind']=='render' else 'fit UI resolution','encoding':'WebP quality90'}
p.write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'assets':len(manifest['records']),'sourceBytes':sum(r['bytes'] for r in manifest['records']),'webBytes':sum(r['webAsset']['bytes'] for r in manifest['records'])}))
