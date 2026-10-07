import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {build} from 'esbuild';
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {execFileSync} from 'node:child_process';import {createHash} from 'node:crypto';import {pathToFileURL} from 'node:url';
// Compare against the exact reviewed archive, independent of a shared node_modules install.
const archive=new URL('../vendor/dotapk-heros-0.1.0-review.10-rupture-order.1.tgz',import.meta.url),hash=value=>createHash('sha256').update(value).digest('hex');
assert.equal(hash(fs.readFileSync(archive)),'2885ade8d7eeb06a03045f41ac2907e17d5e753f0b881091515a3afc9005a391');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'dotapk-reviewed-heros-qa-'));
execFileSync('tar',['-xzf',archive.pathname,'-C',temp]);
const approved=JSON.parse(fs.readFileSync(new URL('../vendor/ab-owned-source-manifest.json',import.meta.url)));assert.equal(Object.keys(approved).length,136);
for(const [file,sha]of Object.entries(approved))assert.equal(hash(fs.readFileSync(path.join(temp,'package',file))),sha,'reviewed source '+file);
const {createHeroRegistry:sourceRegistry}=await import(pathToFileURL(path.join(temp,'package/index.js')));
test.after(()=>fs.rmSync(temp,{recursive:true,force:true}));
import {createHeroRegistry as nativeRegistry} from '../src/heros-rules.js';
test('rules hash survives native/standalone bundling and minification',async()=>{const expected=sourceRegistry().seal().rulesHash;assert.equal(nativeRegistry().seal().rulesHash,expected);for(const minify of [false,true]){const result=await build({entryPoints:['src/heros-rules.js'],bundle:true,format:'iife',globalName:'HerosRules',platform:'browser',target:'es2022',write:false,minify});const c={};vm.runInNewContext(result.outputFiles[0].text,c);assert.equal(c.HerosRules.createHeroRegistry().seal().rulesHash,expected);}});
