[English](HERO_INTEGRATION.md) | [简体中文](HERO_INTEGRATION.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# Hero rules and host integration

Only the22 IDs in `src/released-roster.js` are selectable, with four slots each. Other24 SDK runtime heroes and81 catalog-only identities remain paused/grey. Definition, diagnostic implementation, registered manifest and accepted gameplay are different states; passing a paused module test does not unlock it. [heros unreleased status](https://github.com/dotapk-lol/heros/blob/main/docs/unreleased.md) is the per-hero list.

The pinned review package and source inventories supply reviewed static factories. `src/released-hero-rules.js` composes the frontend registry; `src/pack-dispatcher.js`, `src/pack-services.js`, `src/pack-hp.js`, `src/pack-control.js`, `src/pack-targeting.js` and `src/pack-runtime.js` implement the host boundary. Their actual source methods and validation are authoritative; there is no arbitrary `registerHero` or remote plugin loader.

- Keep immutable registry/ability IDs, four slots, input/passive/effect family and semantic revision. Capture validated finite parameters rather than global mutable coefficients. A real rule/configuration change affects rulesHash and snapshots.
- Host admission, mana/cooldown payment and action commitment are separate from detached effect requests. Execute only accepted casts; passive slots are not user buttons. Declared capabilities do not implement missing provider semantics.
- Host HP/effect receipts, death events and deferred settlement are authoritative; no parallel HP ledger or invented successful receipt. State restore validates namespaces, exact schemas and assembly identity before committing world/rule candidates.
- Source-owned control records preserve unrelated roots/stuns; cleanse tiers, immunity and effective foreign statuses are distinct. Do not mistake another module's action lock for silence or release unrelated control.
- Targeted admission/routing and delivery occur at their source-defined boundary. Reflection/block consumption belongs to the core; AoE/self buffs do not become targeted spells, and returning/routed projectiles must not consume twice.
- Host clock/queue ordering, interruption/death cleanup, handle generations and action tokens are host responsibilities; session metadata alone does not authenticate references or migrate old in-progress worlds.

See heros [factory/lifecycle contract](https://github.com/dotapk-lol/heros/blob/main/docs/plugins.md), [effects](https://github.com/dotapk-lol/heros/blob/main/docs/effects.md), [timing](https://github.com/dotapk-lol/heros/blob/main/docs/timing.md), [balance identity](https://github.com/dotapk-lol/heros/blob/main/docs/balance-identity.md) and [host adapter](https://github.com/dotapk-lol/heros/blob/main/docs/host-adapter.md). Original training examples exercise detached public requests/receipts, not this browser world. The public88 package is not a drop-in replacement for the frontend132 metadata composition.

Custom IDs, external runtime plugins and unsupported shared capabilities need design review and host acceptance; no new heroes, items/talents/facets or full official-mechanism claims are added by documentation/cleanup. Balance snapshots remain manual aggregates, not automatic tuning.
