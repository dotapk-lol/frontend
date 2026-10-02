import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

test('standalone build retains root theme after removing remote font import',()=>{
 const root=new URL('../',import.meta.url);
 execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root});
 const html=fs.readFileSync(new URL('release/DOTA_DUEL_1V1_候选版.html',root),'utf8');
 const css=html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
 assert.ok(css,'standalone contains inline styles');
 assert.match(css.trim(),/^:root\{/,'root must be the first valid selector, not a leftover font URL');
 assert.match(css,/--gold:#eac788/);
 assert.match(css,/color:#eaf0ee/);
 assert.doesNotMatch(css,/@import|fonts\.googleapis|display=swap/,'offline stylesheet has no external font dependency');
 assert.doesNotMatch(html,/<script[^>]*\bsrc=|<link[^>]*rel="stylesheet"/,'scripts and styles are embedded');
});
