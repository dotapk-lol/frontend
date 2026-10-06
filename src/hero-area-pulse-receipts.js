// Private phase receipt. This module is never imported by the public rules package.
const leases=new WeakMap();
export function withNativeAreaPulseReceipt(engine,record,event,callback){
 if(leases.has(engine))throw Error('Nested native area callback');
 const receipt={record,event,actualAt:engine.t,nativeId:record.id,pulse:record.data.pulses,life:record.life,radius:event.radius,contact:event.contact,consumed:false};
 leases.set(engine,receipt);try{return callback();}finally{leases.delete(engine);}
}
export function readNativeAreaPulseReceipt(engine,record,event){
 const r=leases.get(engine);if(!r||r.consumed||r.record!==record||r.event!==event||r.actualAt!==engine.t||r.nativeId!==record.id||r.pulse!==record.data.pulses||r.life!==record.life||r.radius!==event.radius||r.contact!==event.contact||Object.keys(event).sort().join(',')!=='contact,radius')return null;
 return Object.freeze({actualAt:r.actualAt,nativeId:r.nativeId,pulse:r.pulse,nativeExpired:r.life<=1e-8});
}
export function consumeNativeAreaPulseReceipt(engine,record,event){
 if(!readNativeAreaPulseReceipt(engine,record,event))return false;leases.get(engine).consumed=true;return true;
}
export function hasConsumedNativeAreaPulseReceipt(engine,record,event){
 const r=leases.get(engine);return !!r&&r.consumed&&r.record===record&&r.event===event&&r.actualAt===engine.t;
}
