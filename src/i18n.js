import {UI_COPY_EN,SERVICE_COPY_ZH} from './ui-copy-en.js';
import {SKILL_COPY_EN} from './skill-copy-en.js';

export const LANGUAGE_KEY='dota-duel-language';
const han=/[\u3400-\u9fff]/;
const quote=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
// One controller per page. Only display copy is localized; game definitions,
// snapshots, service errors, room policies and packets remain canonical.
export function createLanguage({storage,document,onchange=()=>{}}={}){
 let current='zh';try{if(storage?.getItem(LANGUAGE_KEY)==='en')current='en';}catch{}
 const copies=new Map(Object.entries(UI_COPY_EN)),originals=new WeakMap();let tokens;
 const serviceTokens=new RegExp(Object.keys(SERVICE_COPY_ZH).sort((a,b)=>b.length-a.length).map(quote).join('|'),'g');
 const compile=()=>{tokens=new RegExp([...copies.keys()].filter(key=>key.length>1).sort((a,b)=>b.length-a.length).map(quote).join('|'),'g');};
 const add=(zh,en)=>{if(typeof zh==='string'&&zh&&typeof en==='string'&&en)copies.set(zh,en);};
 function registerHeroes(heroes,catalog){
  for(const h of catalog.heroes())add(h.nameZh,h.nameEn);
  for(const a of catalog.abilities())add(a.nameZh,a.nameEn);
  for(const h of heroes){add(h.name,h.en);for(const a of h.abilities){add(a.name,a.en);const copy=SKILL_COPY_EN[a.id];if(copy){add(a.descriptionZh||a.mvp.mechanics,copy.description);add(a.mvp.arenaNote,copy.note);}}}
  compile();
 }
 compile();
 function translate(value){
  const source=String(value??'');if(current==='zh')return source.replace(serviceTokens,key=>SERVICE_COPY_ZH[key]);
  if(source.includes('\n'))return source.split('\n').map(translate).join('\n');
  const trimmed=source.trim();if(copies.has(trimmed))return source.replace(trimmed,copies.get(trimmed));
  const patterns=[
   [/^(\d+) 秒$/,m=>`${m[1]}s`],
   [/^(本端|对端) (.+)$/,m=>`${m[1]==='本端'?'Local':'Peer'}: ${translate(m[2])}`],
   [/^正在为 P(\d+) 选择英雄$/,m=>`Choosing a hero for P${m[1]}`],
   [/^为玩家(\d+)选英雄$/,m=>`Select a hero for player ${m[1]}`],
   [/^邀请码第(\d+)位$/,m=>`Invite code digit ${m[1]}`],
   [/^(\d+) 位已开放(?: · (\d+) 位未发布)? · 三局两胜 · 99 秒回合$/,m=>`${m[1]} released${m[2]?` · ${m[2]} unreleased`:''} · Best of three · 99-second rounds`],
   [/^(\d+) 个回合$/,m=>`${m[1]} rounds`],
   [/^P(\d+)最高 (\d+) 连击$/,m=>`P${m[1]} best: ${m[2]} hits`],
   [/^P(\d+) 拿下本回合\s+(\d+) : (\d+)$/,m=>`P${m[1]} wins the round · ${m[2]} : ${m[3]}`],
   [/^P95 RTT ([<>]) (\d+)ms 禁战 · 抖动≤30ms · 探测丢包≤5%$/,m=>`Start blocked if P95 RTT ${m[1]} ${m[2]}ms · jitter ≤30ms · probe loss ≤5%`],
   [/^样本 (\d+)\/24\s+RTT P95 (.*?)ms\s+抖动 (.*?)ms\s+丢包 (.*?)%$/,m=>`Samples ${m[1]}/24 · RTT P95 ${m[2]}ms · jitter ${m[3]}ms · loss ${m[4]}%`],
  ];
  for(const [pattern,format] of patterns){const match=trimmed.match(pattern);if(match)return source.replace(trimmed,format(match));}
  return source.replace(tokens,key=>copies.get(key));
 }
 function remember(node,key,value){let fields=originals.get(node);if(!fields){fields=new Map();originals.set(node,fields);}const previous=fields.get(key);if(!previous||value!==previous.shown)fields.set(key,{source:value,shown:value});return fields.get(key);}
 function localize(root=document?.body){
  if(!root)return;
  const visit=node=>{
   if(node.nodeType===3){const field=remember(node,'text',node.nodeValue);node.nodeValue=field.shown=translate(field.source);return;}
   if(node.nodeType===1){if(['SCRIPT','STYLE'].includes(node.tagName)||node.hasAttribute?.('data-language-switch'))return;for(const key of ['aria-label','title','alt','placeholder']){const value=node.getAttribute?.(key);if(value!==null&&value!==undefined){const field=remember(node,key,value);node.setAttribute(key,field.shown=translate(field.source));}}}
   for(const child of node.childNodes||[])visit(child);
  };visit(root);
 }
 function displayText(node,value){if(!node)return;node.textContent=String(value??'');localize(node);}
 function setLanguage(next){if(!['zh','en'].includes(next))return false;if(next===current)return true;current=next;try{storage?.setItem(LANGUAGE_KEY,current);}catch{}syncDocument();localize();onchange(current);return true;}
 function syncDocument(){document?.documentElement?.setAttribute?.('lang',current==='zh'?'zh-CN':'en');}
 syncDocument();
 return {get current(){return current;},translate,localize,displayText,registerHeroes,setLanguage,hasTranslation:value=>!han.test(translate(value)),keys:()=>[...copies.keys()]};
}
