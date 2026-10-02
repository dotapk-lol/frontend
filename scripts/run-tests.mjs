import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const files=fs.readdirSync('qa',{recursive:true}).filter(f=>f.endsWith('.test.mjs')).sort().map(f=>'qa/'+f);if(!files.length)throw Error('No tests discovered');const result=spawnSync(process.execPath,['--test',...files],{stdio:'inherit'});if(result.error)throw result.error;process.exit(result.status??1);
