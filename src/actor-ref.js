export function validActorRef(r){return !!r&&typeof r==='object'&&!Array.isArray(r)&&Object.keys(r).length===4&&['fighter','unit'].includes(r.kind)&&Number.isSafeInteger(r.id)&&(r.kind==='fighter'?[0,1].includes(r.id):r.id>0)&&Number.isSafeInteger(r.epoch)&&r.epoch>0&&Number.isSafeInteger(r.life)&&r.life>=0;}
export const sameActorRef=(a,b)=>validActorRef(a)&&validActorRef(b)&&a.kind===b.kind&&a.id===b.id&&a.epoch===b.epoch&&a.life===b.life;
export function checkActorRef(r){if(!validActorRef(r))throw Error('Invalid ActorRef');return r;}
