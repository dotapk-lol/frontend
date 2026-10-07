// A record settles after load AND decode. Failure is bounded and explicitly retryable.
export function createImageLoader({ImageClass=globalThis.Image,timeoutMs=8000,retryDelayMs=350,maxAttempts=2,schedule=setTimeout,cancel=clearTimeout,onchange=()=>{}}={}){
 const records=new Map();
 function load(src){
  if(!src)return null;
  if(records.has(src))return records.get(src);
  const record={src,image:null,status:'loading',attempts:0,error:null,promise:null,dispose:null};
  records.set(src,record);
  record.promise=new Promise(resolve=>{
   let timer,wait,ended=false,generation=0;
   const finish=(status,error=null)=>{if(ended)return;ended=true;cancel(timer);cancel(wait);record.status=status;record.error=error;resolve(record);onchange();};
   const attempt=()=>{
    if(ended)return;
    const token=++generation;record.attempts++;const image=new ImageClass();record.image=image;
    let settled=false;
    const failed=error=>{if(settled||ended||token!==generation)return;settled=true;cancel(timer);image.onload=image.onerror=null;image.src='';record.error=String(error?.message||error||'image load failed');
     if(record.attempts<maxAttempts){wait=schedule(attempt,retryDelayMs);onchange();}else finish('failed',record.error);
    };
    const loaded=async()=>{if(settled||ended||token!==generation)return;try{if(typeof image.decode==='function')await image.decode();if(!image.naturalWidth||!image.naturalHeight)throw Error('empty decoded image');if(settled||ended||token!==generation)return;settled=true;image.onload=image.onerror=null;finish('ready');}catch(error){failed(error);}};
    image.onload=loaded;image.onerror=()=>failed('image load failed');timer=schedule(()=>failed('image load/decode timed out'),timeoutMs);
    // A new URL can recover a cached transport failure; data URLs need no suffix.
    image.src=record.attempts===1||src.startsWith('data:')?src:src+(src.includes('?')?'&':'?')+'spriteRetry='+record.attempts;
    if(image.complete&&image.naturalWidth)loaded();
   };
   record.dispose=()=>{++generation;if(record.image){record.image.onload=record.image.onerror=null;record.image.src='';}finish('released');};
   attempt();
  });
  return record;
 }
 return {load,ready:src=>records.get(src)?.status==='ready'?records.get(src).image:null,status:src=>records.get(src)||null,
  retry(src){const old=records.get(src);if(old?.status==='loading'||old?.status==='ready')return old;old?.dispose();records.delete(src);return load(src);},
  retain(sources){const keep=new Set(sources);for(const [src,record]of records)if(!keep.has(src)){record.dispose();records.delete(src);}},
  info:()=>[...records.values()].map(({src,status,attempts,error})=>({src,status,attempts,error}))};
}
