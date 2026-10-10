[English](ARCHITECTURE.md) | [简体中文](ARCHITECTURE.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# Architecture

The browser is the combat host: UI/input → Engine and pack dispatcher → reviewed hero sessions/providers → rendering and snapshots. The host validates casts, pays resources, owns effect receipts and world state. WebRTC uses a host-authoritative world, guest input/snapshots and reliable control; Go provides room codes/signaling and result storage, not simulation. Same-screen and BC are explicitly separate transports.

| Path | Role |
| --- | --- |
| `src/app.js`, `src/style.css`, `src/i18n.js` | Entry, presentation and display language |
| `src/engine.js`, `src/pack-*.js`, `src/cohort-*.js` | World, host providers/dispatcher, adaptation and rendering |
| `src/released-roster.js`, `src/released-hero-rules.js` | Current22 allowlist and accepted composition |
| `src/hero-registry.js`, `src/compatibility.js` | Frozen identities and exact compatibility checks |
| `src/match-api.js`, `src/p2p.js`, `src/room-selection.js`, `src/net-quality.js` | Anonymous API, P2P lifecycle, round selection and network hints |
| `src/hero-packs/` | Source modules and paused diagnostic candidates; presence does not enable gameplay |
| `vendor/`, `scripts/vendor-*.mjs` | Pinned rules and source inventories; do not hand-edit digests |
| `reference/`, `docs/official-combat-overrides.json` | Retained catalog/parameter provenance and generator inputs |
| `assets/` | Existing media and provenance, separate third-party rights |
| `qa/` | Regression tests/fixtures and optional local tools, not published results |
| `worker/`, `drizzle/`, `scripts/sqlite-d1.mjs` | Historical Worker/D1 regression fixtures; excluded from deployment |

Catalog generators require frozen source JSON. These are source inputs, not raw player reports or a promise of current official balance. Runtime modules for paused heroes remain because active adapters/tests reference them; no new capability or hero is enabled by cleanup.

The client keeps a recent local result display but only a successful server receipt means saved. PVP and self-reported records remain distinct. [Backend architecture](https://github.com/dotapk-lol/backend/blob/main/docs/ARCHITECTURE.md) explains MySQL grain and reconciliation; [manual balance policy](https://github.com/dotapk-lol/heros/blob/main/balance-data/README.md) explains approved public aggregates.

## Room-first PvP

PvP opens with six independent room-code digits and Create room. A complete valid code automatically submits once; there is no pre-room hero selection or extra Join button. Both occupied seats initially use the explicitly published default Crystal Maiden (ID1). Successful native control/frames channels and an exact version/roster hello allow selection, without waiting for a sample window. PVE retains its immediate local selection flow. Language is chosen only in the home header and shared through the persistent front-end i18n controller.

The host begins an authenticated selection epoch, waits for both clients to render and acknowledge that epoch, and owns a20-second monotonic countdown. Preview heroes use ordered P2P messages; each participant locks only their own legal hero through the server before reporting ready. Both locks start early; timeout asks both to lock their current choices (default Crystal Maiden when untouched). Match creation requires the same selection epoch and two server locks, followed by both existing backend ready calls and verified in_progress. No client-only hero substitution is permitted.

Selection/open/preview/lock/clock/rematch/prepare messages are epoch-scoped. Guest time is display-only; only the host expires selection. Background/orientation pauses preserve remaining time; ordinary network variance never resets the clock. The footer occupies its own visual-viewport grid row; the middle hero list scrolls while Ready/Leave remain accessible. Result rematch requires both explicit consents for the previous matchID and a terminal server result, then resets selection under a new epoch while retaining room and WebRTC channels. Every round gets a fresh requestId and server matchID; old matches retain their immutable hero snapshots.

Casual policy keeps seven fields: above/RTT500/jitter250/loss30/minSamples1/window12/maxAge10000. Values are display warnings, not statistical vetoes. Probes run every350ms over12 samples with a3000ms timeout; missing first RTT displays measuring. Reliable control unresponsive for10s or send backlog over262144 bytes sustained6s is a real connection failure. Authoritative snapshots run about30Hz and guest inputs about40Hz; the guest renders host state rather than performing rollback simulation. Held guest input expires after1500ms in this mode, with neutral/release messages clearing it immediately. No claim of physical5G or native iOS acceptance follows from these parameters.
