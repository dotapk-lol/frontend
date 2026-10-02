# DOTA DUEL frontend

Private source for the Cloudflare-hosted Dota hero 1v1 fighting adaptation. Intended frontend: https://dotapk.lol ; API: https://api.dotapk.lol/api/v1 . A deployment is not root-domain launch until domain binding and end-to-end checks pass. Original Sites v5 remains unchanged.

Only 对战 and 人机 are public modes. Phones use landscape play, a continuous drag joystick and a large basic-attack button surrounded by four skills. PVE and network play show only the local player's controls; passive skills remain grey and noninteractive. Desktop users can explicitly select same-screen or same-browser BroadcastChannel play. BroadcastChannel cannot connect different devices.

The built-in MP3s are the unmodified menu and battle tracks from Valve's official TI4 Workshop sample (Chance Thomas). There is no video player or user file import. Music and sound effects have independent switches and volumes. Source URL, SHA-256 and non-commercial-use context are in assets/music/source-manifest.json. This is not a public-domain or unrestricted commercial music license.

## Build and run

Use modern Node supporting node:sqlite. Run `npm ci`, `npm test`, `npm run build`; `npm run dev` serves built assets at127.0.0.1:4173. Local API is127.0.0.1:18082; hosted API isapi.dotapk.lol. The separate Go service owns signaling/results/MySQL. `npm run deploy` uses the operator's existing Wrangler authorization; credentials do not belong in this repository.

Cloudflare receives only dist/client static assets. No D1/R2/database or paid plan is provisioned. worker/ and drizzle/ are historical regression fixtures, excluded from deployment output. Production assets exclude QA pages and all captured QA sessions. The dev server is static-only; it does not start a database or legacy signaling backend.

## Current candidate review

This mobile/audio revision is a local candidate, not a production deployment. The authoritative evidence and outstanding release gates are recorded in docs/MOBILE_CANDIDATE_QA.md. Historical testing from earlier layouts and video playback does not validate the new joystick, radial controls or MP3 player.

Actual isolated Chrome rendering and CDP touch emulation are distinct from physical touchscreen/gamepad tests and subjective listening. Cross-network NAT and public-domain endpoint acceptance require separate checks; TURN is not provisioned. Local/PVE/BC results use client_reported trust; WebRTC uses peer_agreement. Only the BC host submits. This fan adaptation does not claim KOF97 commercial quality or Valve endorsement. Source fields and adaptation notes: src/data.js and docs/OFFICIAL_SOURCES.md.
