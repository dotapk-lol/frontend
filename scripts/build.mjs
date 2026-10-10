import {runtimeHeroes} from '../src/runtime-heroes.js';
import {lookupRuntimeHero} from '../src/hero-registry.js';
import {FIGHTER_SPRITES} from '../src/fighter-sprites.js';
import {CORE_ASSETS} from '../src/core-assets.js';
import {execFileSync} from 'node:child_process';
import {RELEASED_ROSTER} from '../src/released-roster.js';
import {createReleasedHeroRegistry} from '../src/released-hero-rules.js';
import {bundleApp} from './bundle-app.mjs';
import {transform} from 'esbuild';
import {gzipSync} from 'node:zlib';
import fs from 'node:fs';import {createHash} from 'node:crypto';import path from 'node:path';import {fileURLToPath} from 'node:url';
if(process.argv.includes('--candidate')||process.argv.includes('--stable'))throw Error('This release builds arena-heros22-v1 only; use the archived baseline for historical profiles');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist'),pub=path.join(dist,'client');
// A reviewed display-only hotfix can keep its registered wire identity. Refuse
// any changed game, roster, protocol, dependency or asset source in this mode.
// The two explicit material-loading modules affect display readiness only;
// every engine/rules/protocol module and asset remains pinned to the baseline.
const uiBaseArg=process.argv.find(arg=>arg.startsWith('--ui-only-from='));
let uiBase=null,registeredVersion=null;
if(uiBaseArg){
 const git=args=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
 uiBase=git(['rev-parse',uiBaseArg.slice('--ui-only-from='.length)+'^{commit}']);
 const copyOnly={'src/i18n.js':[['邀请码','房间号'],['Invite code','Room code']],'src/p2p.js':[['请输入六位数字口令','请输入六位数字房间号']],'src/local-rooms.js':[['房号','房间号'],['口令','房间号']]};
 const unchangedExceptCopy=f=>copyOnly[f]&&fs.readFileSync(path.join(root,f),'utf8').trim()===copyOnly[f].reduce((text,[before,after])=>text.replaceAll(before,after),git(['show',uiBase+':'+f]));
 const allowed=f=>unchangedExceptCopy(f)||['src/app.js','src/style.css','src/image-loader.js','src/fighter-materials.js','src/fighter-sprites.js','src/core-assets.js','scripts/generate-core-assets.mjs','src/ui-copy-en.js','assets/arena.webp','assets/heroes-01.webp','index.html','scripts/build.mjs','README.md','README.zh-CN.md','docs/ARCHITECTURE.md','docs/ARCHITECTURE.zh-CN.md'].includes(f)||/^assets\/core\/(fighters-[12]|ui)-[a-f0-9]{12}\.webp$/.test(f)||f.startsWith('qa/');
 const changed=git(['diff','--name-only',uiBase,'--']).split('\n').filter(Boolean);
 const untracked=git(['ls-files','--others','--exclude-standard']).split('\n').filter(Boolean);
 if([...changed,...untracked].some(f=>!allowed(f)))throw Error('UI-only build includes non-display changes');
 const baseSource=git(['show',uiBase+':src/net-version.js']);
 if(fs.readFileSync(path.join(root,'src/net-version.js'),'utf8').trim()!==baseSource)throw Error('UI-only wire version must match the registered baseline');
 registeredVersion=baseSource.match(/^export const NET_VERSION='(duel-[a-f0-9]{20})';$/)?.[1];
 if(!registeredVersion)throw Error('Invalid registered baseline wire version');
}
// Every released fighter and backup must resolve before writing a release.
for(const id of RELEASED_ROSTER.heroIds){const hero=lookupRuntimeHero(runtimeHeroes,id),sprite=FIGHTER_SPRITES[hero.id];if(!sprite)throw Error('Missing fighter metadata: '+hero.id);for(const asset of [hero.portrait,hero.render,...hero.abilities.map(a=>a.icon),sprite.primary.src,...(sprite.fallback?[sprite.fallback.src]:[])])if(!asset||!fs.existsSync(path.join(root,asset)))throw Error('Missing released hero asset: '+asset);}
fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(path.join(pub,'src'),{recursive:true});fs.mkdirSync(path.join(pub,'assets'),{recursive:true});
await import('./generate-catalog.mjs');
// Copy and fingerprint every private client module, including all registry/phase imports.
const clientFiles=fs.readdirSync(path.join(root,'src'),{recursive:true}).filter(f=>/\.(js|css)$/.test(f)).sort();
const fingerprint=createHash('sha256');
for(const f of ['scripts/build.mjs','package-lock.json','scripts/bundle-app.mjs','scripts/generate-catalog.mjs',...clientFiles.filter(f=>f!=='net-version.js').map(f=>'src/'+f),'assets/atlas.json','index.html','manifest.webmanifest']){fingerprint.update(f+'\0');fingerprint.update(fs.readFileSync(path.join(root,f)));fingerprint.update('\0');}
for(const asset of fs.readdirSync(path.join(root,'assets'),{recursive:true}).filter(f=>/\.(png|webp|mp3|json)$/.test(f)&&!f.startsWith('audio/')).sort()){fingerprint.update(asset+'\0');fingerprint.update(fs.readFileSync(path.join(root,'assets',asset)));fingerprint.update('\0');}
fingerprint.update('heros22:'+RELEASED_ROSTER.rosterId);
const assetVersion='duel-'+fingerprint.digest('hex').slice(0,20),netVersion=registeredVersion||assetVersion,netSource=`export const NET_VERSION='${netVersion}';\n`;
fs.writeFileSync(path.join(root,'src/net-version.js'),netSource);
for(const f of clientFiles){const target=path.join(pub,'src',f);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,'src',f),target);}
for(const f of ['index.html','manifest.webmanifest'])fs.copyFileSync(path.join(root,f),path.join(pub,f));
for(const f of fs.readdirSync(path.join(root,'assets'))){if(f==='audio')continue;const p=path.join(root,'assets',f);if(fs.statSync(p).isDirectory())fs.cpSync(p,path.join(pub,'assets',f),{recursive:true});else fs.copyFileSync(p,path.join(pub,'assets',f));}

// A single immutable entry contains every game module. A cache can retain an
// old complete build, but cannot assemble a new game from old/new module URLs.
const entry={script:`src/app.${assetVersion}.js`,style:`src/style.${assetVersion}.css`};
const {code:online}=await bundleApp({overrides:{'net-version.js':netSource}});
const compact=(await transform(online,{minifyWhitespace:true,minifyIdentifiers:true,minifySyntax:false,keepNames:true,target:'es2020',charset:'utf8',legalComments:'none'})).code;
// The bundle is self-contained: native defer avoids a module-loader dependency.
// Preserve module strictness and scope for the entire transformed output.
// esbuild may place compiler helpers before the original bundle IIFE. Keep
// those helpers local too, so foreign globals cannot block or change startup.
const native='"use strict";(()=>{if(window.DOTA_STARTUP&&window.DOTA_STARTUP.appStarting)window.DOTA_STARTUP.appStarting();\n'+compact+'\n})();\n';
const appBytes=Buffer.from(native);
fs.writeFileSync(path.join(pub,entry.script),native);
fs.copyFileSync(path.join(root,'src/style.css'),path.join(pub,entry.style));
// One HTML response supplies styles; no CSS request/onload can hold the startup shell.
const cssText=fs.readFileSync(path.join(root,'src/style.css'),'utf8');
if(/@import\b|<\/style/i.test(cssText))throw Error('Hosted inline styles must be self-contained');
const entryHTML=fs.readFileSync(path.join(pub,'index.html'),'utf8').replace(/<link\b[^>]*id="startup-style"[^>]*>/,()=>`<style id="startup-style" data-source="${entry.style}">${cssText}</style>`).replace('src="src/app.js"',`src="${entry.script}"`).replace('<script id="startup-app" type="module"','<script id="startup-app" defer');
fs.writeFileSync(path.join(pub,'index.html'),entryHTML);
const dataUri=(f)=>{const mime=f.endsWith('.svg')?'image/svg+xml':f.endsWith('.mp3')?'audio/mpeg':f.endsWith('.webp')?'image/webp':'image/png';return `data:${mime};base64,${fs.readFileSync(path.join(root,f)).toString('base64')}`;};
const {code:js}=await bundleApp({offline:true,overrides:{'net-version.js':netSource}});
let css=fs.readFileSync(path.join(root,'src/style.css'),'utf8').replace(/^@import[^\r\n]*(?:\r?\n|$)/,'');let html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<link\b[^>]*href="src\/style\.css"[^>]*>/,()=>'<style id="startup-style">'+css+'</style>').replace(/<script\b[^>]*src="src\/app\.js"[^>]*><\/script>/,()=>'<script type="module">'+js.replaceAll(/<\/script/gi,'<\\/script')+'</script>');
html=html.replace('<link rel="manifest" href="manifest.webmanifest">','');
for(const icon of ['app-icon-180.png','favicon.svg','favicon-16.png','favicon-32.png'])html=html.replace('href="assets/'+icon+'"','href="'+dataUri('assets/'+icon)+'"');
fs.mkdirSync(path.join(root,'release'),{recursive:true});fs.writeFileSync(path.join(root,'release/DOTA_DUEL_22.html'),html);
// Keep only the previous complete entry for cached HTML; never copy private files.
const retainArg=process.argv.find(arg=>arg.startsWith('--retain-client-from=')),retained=[];
if(retainArg){
 const prior=path.resolve(retainArg.slice('--retain-client-from='.length)),m=JSON.parse(fs.readFileSync(path.join(prior,'build-manifest.json'),'utf8'));
 if(m.gameVersion!==netVersion||m.rulesHash!==createReleasedHeroRegistry().seal().rulesHash)throw Error('Retained entry must have exact current compatibility');
 for(const field of ['script','style']){const file=m.entry[field];if(!/^src\/(?:app|style)\.duel-[a-f0-9]{20}\.(?:js|css)$/.test(file))throw Error('Unsafe retained entry path');if(file!==entry[field]){fs.copyFileSync(path.join(prior,file),path.join(pub,file));retained.push(file);}}
}
const immutable=[entry.script,entry.style,...retained,...CORE_ASSETS.map(a=>a.src)].map(file=>`/${file}\n  Cache-Control: public, max-age=31536000, immutable\n`).join('\n');
// Avoid conflicting max-age values: unversioned files keep the platform default.
const baseHeaders=fs.readFileSync(path.join(root,'_headers'),'utf8').replace('  Cache-Control: public, max-age=0, must-revalidate\n','');
fs.writeFileSync(path.join(pub,'_headers'),baseHeaders+'\n'+immutable);
const rules=createReleasedHeroRegistry().seal();
fs.writeFileSync(path.join(pub,'build-manifest.json'),JSON.stringify({profile:'heros22',candidate:false,commit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),gameVersion:netVersion,entry,delivery:{script:"native-defer",styles:"inline",immutableEntries:true,retainedEntries:retained},roster:RELEASED_ROSTER,rulesHash:rules.rulesHash,browserAcceptance:false,...(uiBase?{presentationOnly:true,compatibilityBase:uiBase,assetVersion}:{})},null,2)+'\n');
console.log(JSON.stringify({download:{beforeBytes:Buffer.byteLength(online),afterBytes:appBytes.length,beforeGzipBytes:gzipSync(online).length,afterGzipBytes:gzipSync(appBytes).length,delivery:'native-defer',appRequests:1,criticalStylesheetRequests:0,retainedEntries:retained.length},build:'passed',profile:'heros22',netVersion,rosterId:RELEASED_ROSTER.rosterId,heroIds:RELEASED_ROSTER.heroIds,rulesHash:rules.rulesHash,standaloneBytes:Buffer.byteLength(html),clientModules:clientFiles.filter(f=>f.endsWith('.js')).length,dist}));
