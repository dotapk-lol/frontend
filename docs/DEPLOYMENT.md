[English](DEPLOYMENT.md) | [简体中文](DEPLOYMENT.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# Deployment

Cloudflare hosts static `dist/client`; Go/MySQL live in the separate backend. Build locally only when releasing changes, review generated identities and exact backend bindings, then use an authorized operator's Wrangler credentials:

```sh
npm run deploy
```

This runs build and `wrangler deploy`; it is not a documentation check. `wrangler.jsonc` is the existing project deployment binding, not a secret template. Contributors must use their own authorized account/configuration for separate environments, and must not provision credentials in this repository. `_headers` ships with static output. QA pages, Worker/D1 fixtures and evidence are not production assets.

Before release verify backend health, exact origin, roster/build, peer compatibility and necessary browser/device/network acceptance. A new build is not enabled merely by pushing source. Preserve already registered versions/history; no wildcard or reused rules identity. Keep previous accepted artifacts outside tracked source for operator-managed rollback, and coordinate compatible clients/server rather than silently downgrading readers.

Website/API domains are `https://dotapk.lol` and `https://api.dotapk.lol`. The public source repository does not authorize operating production. A source cleanup without runtime changes needs no deployment. No auto balance synchronization, database or TURN is created by this process.
