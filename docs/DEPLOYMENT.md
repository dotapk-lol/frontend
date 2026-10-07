[English](DEPLOYMENT.md) | [简体中文](DEPLOYMENT.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# Deployment

Cloudflare hosts static `dist/client`; Go/MySQL live in the separate backend. Build locally only when releasing changes, review generated identities and exact backend bindings, then use an authorized operator's Wrangler credentials:

```sh
export CLOUDFLARE_ACCOUNT_ID='<EXISTING_AUTHORIZED_ACCOUNT_ID>'
npm run deploy
```

This runs build and `wrangler deploy`; it is not a documentation check. `wrangler.jsonc` retains the existing Worker name, compatibility date, static asset directory and routing settings, but no account identifier. Supply `CLOUDFLARE_ACCOUNT_ID` from the operator's private environment to select the original account; use existing authorized Wrangler authentication without copying OAuth/API tokens or login details into the repository. Do not deploy to a newly selected account or create a replacement Worker. Contributors running separate installations need their own authorized configuration. `_headers` ships with static output. QA pages, Worker/D1 fixtures and evidence are not production assets.

An account ID selects an account; it does not authenticate or authorize login/deployment. [Wrangler supports the account-selection environment variable](https://developers.cloudflare.com/workers/wrangler/system-environment-variables/). Previous revisions and public branch heads may still expose the old account ID and personal account subdomain. A normal cleanup commit does not erase history or revoke credentials; never post suspected live tokens to issues or test them against an external service.

Before release verify backend health, exact origin, roster/build, peer compatibility and necessary browser/device/network acceptance. A new build is not enabled merely by pushing source. Preserve already registered versions/history; no wildcard or reused rules identity. Keep previous accepted artifacts outside tracked source for operator-managed rollback, and coordinate compatible clients/server rather than silently downgrading readers.

Website/API domains are `https://dotapk.lol` and `https://api.dotapk.lol`. The public source repository does not authorize operating production. Source commits do not themselves publish a version. When a release is requested, the existing authorized publisher rebuilds/reviews the selected commit and deploys to the original project; configuration cleanup does not authorize changing infrastructure. No auto balance synchronization, database or TURN is created by this process.
