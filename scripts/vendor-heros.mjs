import {build} from 'esbuild';
await build({entryPoints:['node_modules/@dotapk/heros/index.js'],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:'src/heros-rules.js',legalComments:'none',charset:'utf8'});
