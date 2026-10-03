import vm from 'node:vm';
// Native BroadcastChannel deserializes into the receiving Window's realm.
// Node stubs otherwise deliver an outer-realm object and misrepresent this contract.
export function inRealmChannel(Base,context){return class extends Base{
 set onmessage(fn){this.realmHandler=typeof fn==='function'?event=>fn({...event,data:vm.runInContext('JSON',context).parse(JSON.stringify(event.data))}):null;}
 get onmessage(){return this.realmHandler;}
};}
