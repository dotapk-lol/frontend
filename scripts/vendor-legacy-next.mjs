// Private readonly consumer; public owned sources and registry remain frozen.
import {build} from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pkg=fs.realpathSync(path.join(root,'node_modules/@dotapk/heros'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'vendor/ab-owned-source-manifest.json')));
const verify=()=>{for(const [file,sha] of Object.entries(manifest))if(createHash('sha256').update(fs.readFileSync(path.join(pkg,file))).digest('hex')!==sha)throw Error('Frozen source mismatch: '+file);};
verify();
const result=await build({stdin:{contents:"export * from './rules/legacy-0-9/next/index.js';",resolveDir:pkg,sourcefile:'private-next-consumer.mjs'},bundle:true,format:'esm',platform:'browser',target:'es2022',write:false,legalComments:'none',plugins:[{name:'canonical-contract',setup(b){b.onResolve({filter:/index\.js$/},a=>path.resolve(a.resolveDir,a.path)===path.join(pkg,'index.js')?{path:'./heros-rules.js',external:true}:null);}}]});
verify();fs.writeFileSync(path.join(root,'src/hero-legacy-next-rules.js'),result.outputFiles[0].contents);
console.log('Readonly review10 legacy next consumer; public mutations=0');
