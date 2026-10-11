// Verify every packaged source before generating the consumer bundles.
import {build} from 'esbuild';
import fs from 'node:fs';import path from 'node:path';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),pkg=path.join(root,'node_modules/@dotapk/heros'),hash=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex'),inventory=JSON.parse(fs.readFileSync(path.join(root,'vendor/six-release-source-manifest.json')));
const verify=()=>{if(hash(path.join(root,inventory.archive))!==inventory.sha256)throw Error('Wrong six-hero archive');for(const [file,sha]of Object.entries(inventory.files))if(hash(path.join(pkg,file))!==sha)throw Error('Installed source differs: '+file);};verify();
await build({stdin:{contents:`export * from './index.js';
export {registerA} from './rules/a/register.js';
export {registerLegacy0To9,directHitFactory,passiveProjectionFactory} from './rules/legacy-0-9/index.js';
export {registerLegacy10To19,legacyFactory} from './rules/legacy-10-19/index.js';
export {createBash} from './rules/core4/bash.js';
export {registerB,combineAttack,combineInterval,combineMovement} from './rules/b/register.js';
export {createBRule} from './rules/b/programs.js';
export {extensionCanonicalFactory,A_EXTENSION_DISPATCH,validateExtensionCommands} from './rules/a/extensions/proposal.js';
export {probeFactory} from './test/probes.mjs';`,resolveDir:pkg},bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:path.join(root,'src/heros-rules.js'),legalComments:'none',charset:'utf8'});
for(const [source,out]of [['rules/six/index.js','six-hero-rules.js'],['rules/legacy-0-9/remaining.js','hero-legacy-zero-rules.js']])await build({entryPoints:[path.join(pkg,source)],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:path.join(root,'src',out),plugins:[{name:'shared-sdk',setup(b){b.onResolve({filter:/index\.js$/},a=>path.resolve(a.resolveDir,a.path)===path.join(pkg,'index.js')?{path:'./heros-rules.js',external:true}:null);}}]});verify();console.log('Verified '+Object.keys(inventory.files).length+' packaged files and generated six-hero consumers.');
