import {execFileSync} from 'node:child_process';
import {RELEASED_ROSTER} from '../src/released-roster.js';
import {createReleasedHeroRegistry} from '../src/released-hero-rules.js';
import {bundleApp} from './bundle-app.mjs';
import fs from 'node:fs';import {createHash} from 'node:crypto';import path from 'node:path';import {fileURLToPath} from 'node:url';
if(process.argv.includes('--candidate')||process.argv.includes('--stable'))throw Error('This release builds arena-heros22-v1 only; use the archived baseline for historical profiles');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist'),pub=path.join(dist,'client');
fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(path.join(pub,'src'),{recursive:true});fs.mkdirSync(path.join(pub,'assets'),{recursive:true});
await import('./generate-catalog.mjs');
// Copy and fingerprint every private client module, including all registry/phase imports.
const clientFiles=fs.readdirSync(path.join(root,'src'),{recursive:true}).filter(f=>/\.(js|css)$/.test(f)).sort();
const fingerprint=createHash('sha256');
for(const f of ['scripts/build.mjs','package-lock.json','scripts/bundle-app.mjs','scripts/generate-catalog.mjs',...clientFiles.filter(f=>f!=='net-version.js').map(f=>'src/'+f),'assets/atlas.json','index.html','manifest.webmanifest']){fingerprint.update(f+'\0');fingerprint.update(fs.readFileSync(path.join(root,f)));fingerprint.update('\0');}
for(const asset of fs.readdirSync(path.join(root,'assets'),{recursive:true}).filter(f=>/\.(png|webp|mp3|json)$/.test(f)&&!f.startsWith('audio/')).sort()){fingerprint.update(asset+'\0');fingerprint.update(fs.readFileSync(path.join(root,'assets',asset)));fingerprint.update('\0');}
fingerprint.update('heros22:'+RELEASED_ROSTER.rosterId);
const netVersion='duel-'+fingerprint.digest('hex').slice(0,20),netSource=`export const NET_VERSION='${netVersion}';\n`;
fs.writeFileSync(path.join(root,'src/net-version.js'),netSource);
for(const f of clientFiles){const target=path.join(pub,'src',f);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,'src',f),target);}
for(const f of ['index.html','manifest.webmanifest'])fs.copyFileSync(path.join(root,f),path.join(pub,f));
for(const f of fs.readdirSync(path.join(root,'assets'))){if(f.endsWith('-render.png')||f==='audio')continue;const p=path.join(root,'assets',f);if(fs.statSync(p).isDirectory())fs.cpSync(p,path.join(pub,'assets',f),{recursive:true});else fs.copyFileSync(p,path.join(pub,'assets',f));}
let data=fs.readFileSync(path.join(root,'src/data.js'),'utf8');data=data.replaceAll(/assets\/[a-z_]+-render\.png/g,m=>m.replace('assets/','assets/portraits/').replace('-render.png','.webp'));fs.writeFileSync(path.join(pub,'src/data.js'),data);
const dataUri=(f)=>{const mime=f.endsWith('.mp3')?'audio/mpeg':f.endsWith('.webp')?'image/webp':'image/png';return `data:${mime};base64,${fs.readFileSync(path.join(root,f)).toString('base64')}`;};
const {code:js}=await bundleApp({offline:true,overrides:{'net-version.js':netSource}});
let css=fs.readFileSync(path.join(root,'src/style.css'),'utf8').replace(/^@import[^\r\n]*(?:\r?\n|$)/,'');let html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace('<link rel="stylesheet" href="src/style.css">','<style>'+css+'</style>').replace('<script type="module" src="src/app.js"></script>','<script type="module">'+js.replaceAll('</script','<\\/script')+'</script>');
html=html.replace('<link rel="manifest" href="manifest.webmanifest">','').replace('href="assets/app-icon-180.png"','href="'+dataUri('assets/app-icon-180.png')+'"');
fs.mkdirSync(path.join(root,'release'),{recursive:true});fs.writeFileSync(path.join(root,'release/DOTA_DUEL_22.html'),html);
fs.copyFileSync(path.join(root,'_headers'),path.join(pub,'_headers'));
const rules=createReleasedHeroRegistry().seal();
fs.writeFileSync(path.join(pub,'build-manifest.json'),JSON.stringify({profile:'heros22',candidate:false,commit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),gameVersion:netVersion,roster:RELEASED_ROSTER,rulesHash:rules.rulesHash,browserAcceptance:false},null,2)+'\n');
console.log(JSON.stringify({build:'passed',profile:'heros22',netVersion,rosterId:RELEASED_ROSTER.rosterId,heroIds:RELEASED_ROSTER.heroIds,rulesHash:rules.rulesHash,standaloneBytes:Buffer.byteLength(html),clientModules:clientFiles.filter(f=>f.endsWith('.js')).length,dist}));
