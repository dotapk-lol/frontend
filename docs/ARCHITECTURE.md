[English](ARCHITECTURE.md) | [简体中文](ARCHITECTURE.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# Architecture

The browser is the combat host: UI/input → Engine and pack dispatcher → reviewed hero sessions/providers → rendering and snapshots. The host validates casts, pays resources, owns effect receipts and world state. WebRTC uses a host-authoritative world, guest input/snapshots and reliable control; Go provides invitations/signaling and result storage, not simulation. Same-screen and BC are explicitly separate transports.

| Path | Role |
| --- | --- |
| `src/app.js`, `src/style.css`, `src/i18n.js` | Entry, presentation and display language |
| `src/engine.js`, `src/pack-*.js`, `src/cohort-*.js` | World, host providers/dispatcher, adaptation and rendering |
| `src/released-roster.js`, `src/released-hero-rules.js` | Current22 allowlist and accepted composition |
| `src/hero-registry.js`, `src/compatibility.js` | Frozen identities and exact compatibility checks |
| `src/match-api.js`, `src/p2p.js`, `src/net-quality.js` | Anonymous API, P2P lifecycle and quality policy |
| `src/hero-packs/` | Source modules and paused diagnostic candidates; presence does not enable gameplay |
| `vendor/`, `scripts/vendor-*.mjs` | Pinned rules and source inventories; do not hand-edit digests |
| `reference/`, `docs/official-combat-overrides.json` | Retained catalog/parameter provenance and generator inputs |
| `assets/` | Existing media and provenance, separate third-party rights |
| `qa/` | Regression tests/fixtures and optional local tools, not published results |
| `worker/`, `drizzle/`, `scripts/sqlite-d1.mjs` | Historical Worker/D1 regression fixtures; excluded from deployment |

Catalog generators require frozen source JSON. These are source inputs, not raw player reports or a promise of current official balance. Runtime modules for paused heroes remain because active adapters/tests reference them; no new capability or hero is enabled by cleanup.

The client keeps a recent local result display but only a successful server receipt means saved. PVP and self-reported records remain distinct. [Backend architecture](https://github.com/dotapk-lol/backend/blob/main/docs/ARCHITECTURE.md) explains MySQL grain and reconciliation; [manual balance policy](https://github.com/dotapk-lol/heros/blob/main/balance-data/README.md) explains approved public aggregates.
