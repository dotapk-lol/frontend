import {FIGHTER_SPRITES} from './fighter-sprites.js';
import {createImageLoader} from './image-loader.js';
// One stable URL per texture. Persistent release caches survive selection changes.
export function createFighterMaterials({sprites=FIGHTER_SPRITES,loader=null,imageOptions={},persistent=false,onchange=()=>{}}={}){
 const selected=new Set(),watched=new WeakSet();
 const changed=()=>onchange();
 const images=loader||createImageLoader({...imageOptions,onchange:changed});
 if(loader)images.subscribe?.(changed);
 function ensure(id){const spec=sprites[id];if(!spec)return;const record=images.load(spec.primary.src);if(!watched.has(record)){watched.add(record);record.promise.then(changed);}}
 function select(ids){const next=new Set(ids);if(next.size===selected.size&&[...next].every(id=>selected.has(id)))return;selected.clear();for(const id of next)selected.add(id);
  if(!persistent)images.retain([...selected].flatMap(id=>sprites[id]?[sprites[id].primary.src]:[]));
  for(const id of selected)ensure(id);onchange();
 }
 function fighter(id,pose=0){const spec=sprites[id];if(!spec)return {status:'failed',error:'missing fighter metadata'};
  const image=images.ready(spec.primary.src);if(image)return {status:'ready',image,frame:spec.primary.frames?.[pose]||spec.primary.frames?.[0]||null,referenceHeight:spec.primary.referenceHeight,staticFrame:spec.primary.staticFrame};
  return {status:images.status(spec.primary.src)?.status==='failed'?'failed':'loading',image:null,frame:null};
 }
 return {select,fighter,retry(){for(const id of selected){const s=sprites[id];if(!s)continue;if(images.status(s.primary.src)?.status==='failed')images.retry(s.primary.src);ensure(id);}onchange();},info:()=>({heroes:[...selected].map(id=>({id,status:fighter(id).status})),images:images.info()})};
}
