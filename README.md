[English](README.md) | [简体中文](README.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# DOTA PK frontend

Browser client for [dotapk.lol](https://dotapk.lol): **22 released heroes / 88 skill slots**, six-digit WebRTC room codes, PVE, desktop same-screen and same-browser BroadcastChannel play. Players need no account login. The home-page English/Chinese preference stays in localStorage. Mobile play uses landscape, a drag joystick and four skill buttons; unreleased heroes stay grey and paused.

| Repository | Responsibility |
| --- | --- |
| frontend (this repository) | Cloudflare static UI, input, rendering, AI, browser combat world, rule host adapters, P2P and result client |
| [backend](https://github.com/dotapk-lol/backend) | Go anonymous sessions, room codes/signaling, result reconciliation and existing MySQL statistics; `https://api.dotapk.lol/api/v1` |
| [heros](https://github.com/dotapk-lol/heros) | MIT deterministic rules, parameters and host contracts; [manual aggregate-data policy](https://github.com/dotapk-lol/heros/blob/main/balance-data/README.md) |

Combat runs in browsers. WebRTC exchanges signaling through the API then uses DataChannel; BC cannot connect different devices. No TURN is provisioned, so some NAT combinations fail. PVP `confirmed / peer_agreement` means both reports agreed, not server simulation or anti-cheat certification. PVE/local/BC use `recorded / client_reported`; aborted/disputed games do not enter win rates.

## Quick start

Use Node supporting ESM and `node:sqlite` (Node 22.13+ or a newer release), npm and the pinned package-lock.json. From the root:

```sh
npm ci
npm run build
npm run dev
```

Open `http://127.0.0.1:4173`. `dev` serves built `dist/client` only, without hot reload, API or database. Rebuild after source edits; `DUEL_PORT` changes the static port. Build writes generated catalog/rule identity files and `src/net-version.js`, `dist/client/build-manifest.json`, and `release/DOTA_DUEL_22.html`. A new gameVersion may require exact backend registration before play. Cloudflare receives only static assets; `worker/` and `drizzle/` remain regression fixtures, not the current backend. No D1/R2 setup is required.

For the current22 frontend, follow the backend [development guide](https://github.com/dotapk-lol/backend/blob/main/docs/DEVELOPMENT.md): ordinary backend builds contain legacy20 only. Local API defaults to `http://127.0.0.1:18082/api/v1`, with backend `DUEL_ALLOWED_ORIGIN=http://127.0.0.1:4173`. Protocol, hostname and port must match exactly. The page has no general API environment switch; see [development](docs/DEVELOPMENT.md) for the actual routing rules and roster/build bindings.

## Developer guides

- [Architecture and directory map](docs/ARCHITECTURE.md)
- [Development, CORS and exact identities](docs/DEVELOPMENT.md)
- [Hero parameters and host integration](docs/HERO_INTEGRATION.md)
- [Testing and evidence boundaries](docs/TESTING.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Sources and third-party rights](docs/OFFICIAL_SOURCES.md)
- [Contributing](CONTRIBUTING.md)

MIT covers project-owned code and documentation; preserve [LICENSE](LICENSE). Third-party images, music, fonts, trademarks and dependencies retain their own licenses and notices. Valve material is outside the project MIT grant and does not imply endorsement. The current player uses Reborn D+B Remix; retained TI4 tracks and all image/audio provenance need separate redistribution review. See the sources guide.
