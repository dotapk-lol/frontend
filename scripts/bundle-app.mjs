import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
export const projectRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// Preserve module scope in production and VM integration tests. QA hooks are
// appended to the entry module before bundling, never exposed in a release.
export async function bundleApp({append='',offline=false,candidate=false,overrides={}}={}){
 const src=path.join(projectRoot,'src'),assets={},assetNames=new Set();
 const localAsset=/(['"])(assets\/[^'"\\]+\.(?:png|webp|mp3))\1/g;
 const canonical=f=>f.replace('assets/music/reborn-dnb-remix.mp3','assets/music/reborn-dnb-remix-offline.mp3');
 const uri=f=>{const target=canonical(f);if(!fs.existsSync(path.join(projectRoot,target)))throw Error('Missing offline asset: '+target);const mime=target.endsWith('.mp3')?'audio/mpeg':target.endsWith('.webp')?'image/webp':'image/png';return `data:${mime};base64,${fs.readFileSync(path.join(projectRoot,target)).toString('base64')}`;};
 let atlas;
 if(offline){
  atlas=JSON.parse(fs.readFileSync(path.join(projectRoot,'assets/atlas.json'),'utf8'));
  for(const f of fs.readdirSync(src,{recursive:true}).filter(f=>f.endsWith('.js'))){for(const m of fs.readFileSync(path.join(src,f),'utf8').matchAll(localAsset))assetNames.add(m[2]);}
  for(const f of [...Object.values(atlas.sheets),'assets/arena.png'])assetNames.add(f);
  for(const f of [...assetNames].sort())if(fs.existsSync(path.join(projectRoot,canonical(f))))assets[f]=uri(f);
 }
 const result=await build({absWorkingDir:projectRoot,entryPoints:[path.join(src,'app.js')],bundle:true,format:'iife',platform:'browser',target:'es2022',write:false,legalComments:'none',charset:'utf8',plugins:[{name:'duel-entry',setup(b){
  b.onResolve({filter:/^duel:offline-assets$/},()=>({path:'assets',namespace:'duel'}));
  b.onLoad({filter:/.*/,namespace:'duel'},()=>({contents:'export const OFFLINE_ASSETS='+JSON.stringify(assets)+';',loader:'js'}));
  b.onLoad({filter:/\.js$/},args=>{
   let contents=overrides[path.relative(src,args.path)]??fs.readFileSync(args.path,'utf8');
   if(candidate&&args.path===path.join(src,'release-profile.js'))contents='export const CANDIDATE_BUILD=true;export const HEROS22_BUILD=false;';
   if(args.path===path.join(src,'app.js')){
    contents+='\n'+append;
    if(offline)contents=contents.replace('function img(src){','function img(src){src=OFFLINE_ASSETS[src]||src;');
   }
   if(offline){contents=contents.replace(localAsset,(m,_q,f)=>assets[f]?`OFFLINE_ASSETS[${JSON.stringify(f)}]`:m);contents="import {OFFLINE_ASSETS} from 'duel:offline-assets';\n"+contents;}
   return {contents,loader:'js',resolveDir:path.dirname(args.path)};
  });
 }}]});
 return {code:result.outputFiles[0].text,assets};
}
