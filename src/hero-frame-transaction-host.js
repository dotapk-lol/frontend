// Private ordinary-frame transaction shared by managed effect transports.
// A transport enrolls its live/pending stages before the first frame mutation.
// Public callbacks continue to receive genuine synchronous native receipts.
const leases=new WeakSet();
export const hasManagedFrameLease=engine=>leases.has(engine);
export function withManagedFrame(engine,participants,run){
 if(engine.paused||engine.phase!=='fight'||engine.hitstop>0||!participants.some(required=>required()))return run();
 if(leases.has(engine))throw Error('Nested managed frame transaction');
 const checkpoint=engine.snapshot(),logs=structuredClone(engine.logs);leases.add(engine);
 try{return run();}
 catch(error){engine.restoreSimulation(checkpoint);engine.logs=logs;throw error;}
 finally{leases.delete(engine);}
}
