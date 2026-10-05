# Custom hero identity: smallest backward-compatible public proposal

Readonly finding against review10: `createHeroRegistry` requires exactly the built-in 46 definitions, checks numeric/Valve/internal/ability identities against that built-in list, and exposes no definition registration method. Registering another factory alone cannot add a hero. The documented original example therefore borrows an existing hero identity. `codeIdentity` separately admits only the generated package source manifest. These are two distinct release gaps; this proposal changes neither shared schema nor production.

## Proposed public author task

Keep `createHeroRegistry()` and its existing 46 initial definitions/strict built-in identity checks. Add an explicit `registerHero(definition)` operation before sealing, then use the existing `registerFactory(customNumericId, slot, factory)`. A custom definition must carry `identity: {kind: 'custom', key: 'author/hero'}`; its internal `id` must equal that key, and all four ability IDs must use its namespace. Keep four slots and the current facts/effects ABI. A genuinely new module must supply its own factories; existing hero-specific factories do not become generic by changing IDs.

Retain safe integer numeric dispatch IDs to avoid changing every fact, manifest and snapshot namespace. Reserve an explicit custom range, proposed 1,000,000 through 2,147,483,647, and require callers to persist their selected numeric IDs with the namespaced keys. Do not assign IDs from insertion order or truncate string hashes; reject numeric/key/ability collisions. Built-in numeric and Valve identities remain immutable. Permit `valveHeroId: null` only for a custom identity, so an original hero does not pretend to be a Valve hero.

Validate a prospective appended definition set and rebuild mana ceilings, parameter schemas and all already-registered sharing factories before committing any registry/cache change. A failure leaves prior definitions, factories and state schemas untouched. After seal, registering/replacing identities remains forbidden. Definitions, identity and numeric mapping enter rosterHash/rulesHash and the rules-only namespace schema through the existing paths; no identity bypass or accepting a stale snapshot.

Source integration remains reviewed and reproducible: a community fork adds its owned source files, extends the generated source manifest, compiles against this package's canonical `defineStateSchema`, and declares those actual sources via `codeIdentity`. The static source audit plugin may remain. Arbitrary runtime plugin import is a separate feature requiring a trusted manifest handshake; do not promise it merely because a custom definition API exists.

Changing public registry source changes its core code fingerprint even when no custom definitions are registered. Backward compatibility here means existing calls/46-hero behavior remain valid. It does **not** mean an old SDK rulesHash or snapshot is silently accepted by a changed SDK; release version and exact identities must be updated explicitly.

## Private game boundary

The private production roster stays 46. Public registration is a rules-host capability, not admission to the game's selector. The private integrator separately approves a simulation roster and numeric mapping, runtime hero definition, assets/rendering, input/UI, collision/profiles, balance, storage/replay version and peer protocol compatibility. `hero-registry.js`, candidate/stable roster allowlists and network identity remain authoritative. No automatic unlock, deployment, original game's source publication or resource download follows from `registerHero`.

## Shield scope

Review10 has no generic absorption-shield capability. `protect` means invulnerability/debuff immunity and must not be described as a shield. Owned rule state plus `projectDamage` and typed status transport can still implement specific reviewed shield reducers.

Already accepted Swap uses its exact native post-mitigation shield receipt and public state, not a new generic shield port. Existing B transports are unaffected. In this 27-slot wave, Meat Shield is flat damage reduction and is connected through its own public projection; it is not an absorption pool. Core Abaddon Aphotic Shield `100:1`, C Ember Flame Guard `104:2`, C Void Resonant Pulse `117:2`, and Skywrath Arcane Bolt's derived barriers `99:0` need their explicit reducer/projection, expiry/death/replace and native shield-order bindings in later waves. Borrowed Time `100:3` is damage conversion and also requires its separate checkpoint/HP order. The current wave's Core skin/curse and C seal/atrophy are status/damage projections, not blocked merely by the missing generic shield API.

A user-authored arbitrary shield has no automatic interoperable port today. Before promising that use, either document the admitted finite profiles and implement the corresponding host projection stages, or have the public owner design a bounded typed shield descriptor/receipt as a separately reviewed ABI change. Publishing docs alone does not close that product gap.
