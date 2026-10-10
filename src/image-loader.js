// Separate a slow transfer from a failed load; only selected records stay alive.
export function createImageLoader({ImageClass=globalThis.Image,timeoutMs=8000,slowMs=8000,loadTimeoutMs=120000,retryDelayMs=350,maxAttempts=2,schedule=setTimeout,cancel=clearTimeout,onchange=()=>{}}={}){
 const records=new Map(),listeners=new Set();
 const changed=()=>{onchange();for(const listener of listeners)listener();};
 function load(src){
  if(!src)return null;
  if(records.has(src))return records.get(src);
  const record={src,image:null,status:'loading',phase:'load',slow:false,attempts:0,error:null,promise:null,dispose:null};
  records.set(src,record);
  record.promise=new Promise(resolve=>{
   let timer,slowTimer,wait,ended=false,generation=0;
   const clearTimers=()=>{cancel(timer);cancel(slowTimer);cancel(wait);};
   const finish=(status,error=null)=>{if(ended)return;ended=true;clearTimers();record.status=status;record.phase='done';record.slow=false;record.error=error;resolve(record);changed();};
   const attempt=()=>{
    if(ended)return;
    const token=++generation;record.attempts++;record.phase='load';record.slow=false;const image=new ImageClass();record.image=image;
    let settled=false,decoding=false;
    const failed=(error,retry=true)=>{if(settled||ended||token!==generation)return;settled=true;clearTimers();image.onload=image.onerror=null;image.src='';record.image=null;record.error=String(error?.message||error||'image load failed');
     // A deadline cannot tell whether transport is stalled or still progressing.
     // Do not automatically discard and restart that body at a second URL.
     if(retry&&record.attempts<maxAttempts){record.phase='retry';wait=schedule(attempt,retryDelayMs);changed();}else finish('failed',record.error);
    };
    const loaded=async()=>{if(settled||ended||token!==generation||decoding)return;decoding=true;cancel(timer);cancel(slowTimer);record.phase='decode';record.slow=false;
     timer=schedule(()=>failed('image decode timed out'),timeoutMs);
     try{if(typeof image.decode==='function')await image.decode();if(!image.naturalWidth||!image.naturalHeight)throw Error('empty decoded image');if(settled||ended||token!==generation)return;settled=true;image.onload=image.onerror=null;finish('ready');}catch(error){failed(error);}
    };
    image.onload=loaded;image.onerror=()=>failed('image load failed');
    slowTimer=schedule(()=>{if(settled||ended||token!==generation||decoding)return;record.slow=true;changed();},slowMs);
    timer=schedule(()=>failed('image load deadline exceeded',false),loadTimeoutMs);
    // Keep cache identity stable. Retrying an actual error is one new Image;
    // repeated controls while loading reuse this record and its current request.
    image.src=src;
    if(image.complete&&image.naturalWidth)loaded();
   };
   record.dispose=()=>{if(record.status==='released')return;++generation;clearTimers();if(record.image){record.image.onload=record.image.onerror=null;record.image.src='';record.image=null;}if(!ended)finish('released');else{record.status='released';record.phase='done';record.slow=false;record.error=null;changed();}};
   attempt();
  });
  return record;
 }
 return {load,ready:src=>records.get(src)?.status==='ready'?records.get(src).image:null,status:src=>records.get(src)||null,
  retry(src){const old=records.get(src);if(old?.status==='loading'||old?.status==='ready')return old;old?.dispose();records.delete(src);return load(src);},
  retain(sources){const keep=new Set(sources);for(const [src,record]of records)if(!keep.has(src)){record.dispose();records.delete(src);}},
  subscribe(listener){listeners.add(listener);return ()=>listeners.delete(listener);},
  info:()=>[...records.values()].map(({src,status,phase,slow,attempts,error})=>({src,status,phase,slow,attempts,error}))};
}
