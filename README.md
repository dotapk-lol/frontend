# DOTA DUEL frontend

Private source for the Cloudflare-hosted Dota hero 1v1 fighting adaptation. Intended frontend: https://dotapk.lol ; API: https://api.dotapk.lol/api/v1 . A deployment is not root-domain launch until domain binding and end-to-end checks pass. Original Sites v5 remains unchanged.

Only 对战 and 人机 are public modes. 对战 offers same-screen, same-browser BroadcastChannel and WebRTC. BroadcastChannel cannot connect different computers. Official Reborn uses the visible publisher YouTube player: click once then loop; no audio file import or downloaded official soundtrack. Ads/network availability remain external dependencies.

## Build and run

Use modern Node supporting node:sqlite. Run `npm ci`, `npm test`, `npm run build`; `npm run dev` serves built assets at127.0.0.1:4173. Local API is127.0.0.1:18082; hosted API isapi.dotapk.lol. The separate Go service owns signaling/results/MySQL. `npm run deploy` uses the operator's existing Wrangler authorization; credentials do not belong in this repository.

Cloudflare receives only dist/client static assets. No D1/R2/database or paid plan is provisioned. worker/ and drizzle/ are historical regression fixtures, excluded from deployment output. Production assets exclude QA pages and all captured QA sessions. The dev server is static-only; it does not start a database or legacy signaling backend.

## Local acceptance baseline

Candidate duel-4bc4267a44e7a9e35c72 passed269 source tests,400 hero pairs,29 GoHTTP checks, real-browser gameplay, two natural music loops,844x390 layout, native timers/IndexedDB, real blur, local/PVE/BC saved results, WebRTC confirmed results, rematch and aborted disconnects on backendv1.2. Deployment adaptation changes API destination and packaging; verify hosted HTTP version and domain end-to-end separately.

Touch-pad swipes were simulated with a mouse. Physical touchscreen/gamepad, cross-network NAT and subjective listening remain unverified; TURN is not provisioned. Local/PVE/BC results use client_reported trust; WebRTC uses peer_agreement. BC only host submits. This fan adaptation does not claim KOF97 commercial quality or Valve endorsement. Official source fields and adaptation notes: src/data.js and docs/OFFICIAL_SOURCES.md.
