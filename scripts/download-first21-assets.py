from pathlib import Path
import json,hashlib,urllib.request,concurrent.futures
p=Path('reference/hero-pack-inputs/first21-assets.json');manifest=json.loads(p.read_text())
def download(r):
 f=Path(r['downloadedPath']);f.parent.mkdir(parents=True,exist_ok=True)
 if not f.exists():
  req=urllib.request.Request(r['url'],headers={'User-Agent':'DotaDuelAssetVerification/1.0'})
  with urllib.request.urlopen(req,timeout=30) as res:
   data=res.read(8*1024*1024)
   if res.status!=200 or not data.startswith(b'\x89PNG\r\n\x1a\n'):raise ValueError('Invalid PNG response '+r['url'])
  f.write_bytes(data)
 data=f.read_bytes();r.update(bytes=len(data),sha256=hashlib.sha256(data).hexdigest(),downloadVerified=True)
 return r
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 futures={pool.submit(download,r):r for r in manifest['records']}
 errors=[]
 for future in concurrent.futures.as_completed(futures):
  try:future.result()
  except Exception as e:errors.append({'file':futures[future]['file'],'error':str(e)})
manifest['errors']=errors;p.write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps({'downloaded':sum(r.get('downloadVerified',False) for r in manifest['records']),'errors':errors}))
if errors:raise SystemExit(1)
