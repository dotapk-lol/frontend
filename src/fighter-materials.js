import {FIGHTER_SPRITES} from './fighter-sprites.js';
import {createImageLoader} from './image-loader.js';
export function createFighterMaterials({sprites=FIGHTER_SPRITES,loader=null,onchange=()=>{}}={}){
 const images=loader||createImageLoader({onchange}),selected=new Set();
 function ensure(id){const spec=sprites[id];if(!spec)return;
  const primary=images.load(spec.primary.src);
  // Only decode a backup when the primary exhausted its finite retries.
  primary.promise.then(record=>{if(record.status==='failed'&&selected.has(id)){images.load(spec.fallback.src);onchange();}});
 }
 function select(ids){const next=new Set(ids);if(next.size===selected.size&&[...next].every(id=>selected.has(id)))return;
  selected.clear();for(const id of next)selected.add(id);
  images.retain([...selected].flatMap(id=>{const s=sprites[id];return s?[s.primary.src,s.fallback.src]:[];}));
  for(const id of selected)ensure(id);onchange();
 }
 function fighter(id,pose=0){const spec=sprites[id];if(!spec)return {status:'failed',error:'missing fighter metadata'};
  const primary=images.ready(spec.primary.src);
  if(primary)return {status:'ready',image:primary,frame:spec.primary.frames?.[pose]||spec.primary.frames?.[0]||null,referenceHeight:spec.primary.referenceHeight};
  const backup=images.ready(spec.fallback.src);
  if(backup)return {status:'fallback',image:backup,frame:spec.fallback.frame||null,referenceHeight:spec.fallback.referenceHeight};
  const failed=images.status(spec.primary.src)?.status==='failed'&&images.status(spec.fallback.src)?.status==='failed';
  return {status:failed?'failed':'loading',image:null,frame:null};
 }
 return {select,fighter,retry(){for(const id of selected){const s=sprites[id];if(!s)continue;for(const src of [s.primary.src,s.fallback.src])if(images.status(src)?.status==='failed')images.retry(src);ensure(id);}onchange();},
  info:()=>({heroes:[...selected].map(id=>({id,status:fighter(id).status})),images:images.info()})};
}
