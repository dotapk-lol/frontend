# Additive global status contract: duel-status-1

Base PACK_ABI_VERSION remains duel-pack-2.4-targeting so the frozen A V8/B V6/C V6
adapters continue to load. PACK_STATUS_ABI_VERSION is duel-status-1. New capabilities
are positive-buff-purge, cross-system-positive-dispel, invulnerable-target-dispel,
status-resistance and control-duration-projection. They are actual Engine services.
Capability availability does not accept a previously blocked hero: explicit
disabled/unported/realEngineImplemented=false contracts still reject registration.
Authors must complete their adapter and acceptance tests before changing that gate.
The active/stable/candidate allowlists are unchanged. No production deployment of
this extension or rebuilt4185/4186 preview is authorized by this development work.

## One global polarized dispel

`e.dispelTarget(f,{source,abilityId,tier='basic',hostile=true,
allowInvulnerable=false}) -> removedRefs[]`

`api.dispelTarget(e,f,options)` is the same entry, with an additional declared
abilityIds check. source is a player index0/1; f must be the exact simulation
fighter. hostile=true cleanses negative components; false purges positive ones.
Strong includes basic. None-tier effects remain. Ref fields are namespace,key,
polarity,target and optionally id. A mixed typed group is handled as two records.
There is no blanket call to the legacy e.dispel or individual author's dispel hook.

The operation reaches all typed namespaces, source controls, declared legacy
buffs/timers/DOTs, core4 negative statuses/Poison, core4 positive Aphotic Shield /
Sprint, and removable resistance providers. The explicit legacy mapping is in
src/legacy-status-policy.js. Unknown/private markers are retained. Blade Fury,
Borrowed Time, God's Strength, toggles and internal cooldowns are retained;
offensive purge is not permission to stop a passive or a terrain/aura source.
Static Link remains its declared undispellable linked mechanism. Positive Take Aim
attributes and its self-slow are removed independently. Feast's temporary soul
grant is settled once when removed. Aphotic Shield's ending burst fires once.

All selected removals commit before end callbacks; they cannot see a half-cleansed
target. Trusted custom-data systems may provide `dispelDescriptors(e,f)` returning
`{namespace,key,polarity:'positive'|'negative',dispel:'basic'|'strong'|'none',
remove(),id?,afterRemove?}`. These closures are runtime adapters, never snapshot
data. Systems may observe `statusesDispelled(e,f,{tier,polarity,source,abilityId,
removed})`. Do not relabel unknown private data by inspecting signs of numbers.

Target death/invulnerability normally admits no removal. Explicit
allowInvulnerable=true is authorized only for oracle_fortunes_end, whose frozen
Valve website notes say “Affects invulnerable units.” PackTargeting canTargetSpell
and routeTargetedSpell accept the same permission. Unknown ability overrides throw;
pierces bypasses debuff immunity only. Invulnerability is never temporarily zeroed.
The existing applyStatus allowInvulnerable flag is now correctly forwarded to its
effective-status admission gate. Damage still uses the normal invulnerability gate.
Dispel itself does not consume Counterspell or perform range checking: call the
shared spell route once at delivery when the authored spell requires it.

## Global status resistance

`e.registerStatusResistance(f,{source,abilityId,key=abilityId,resistance,duration,
dispel='none',requiresPassives=false,allowInvulnerable=false}) -> id|null`

`e.releaseStatusResistance(id) -> boolean`

`e.statusResistance(f) -> fraction`

`e.admitStatusDuration(f,{duration,hostile=true,ignoreStatusResistance=false})
-> admittedSeconds` is a read-only projection. Do not pass its result into a
typed-status/control API: those entry points already project the raw duration.
Use it once for an authored custom duration outside those entry points. Factory
api methods mirror these signatures, requiring a declared abilityId on register.
Declare the automatic innate ID too if a provider is owned by an innate.

Resistance is finite0..1; duration is finite(0,3600]. The same target/source/key
refresh replaces its old handle, while other providers remain. Stacking uses
1-product(1-resistance). providers have bounded64 plain snapshot-visible records.
Passive providers suppress when their source is dead or broken. Active providers
do not. Positive providers are allowed during debuff immunity; invulnerability
requires their explicit positive application permission. They expire at the fixed
simulation step, are cleared on target death/round reset, and can be positively
purged according to their tier. Negative cleanse retains them. Invalid requests,
forged provider fields and duplicate handles reject before restoration.

New Engine controls (legacy and source-owned), typed hostile status components,
legacy hit/on-attack/channel silence/slow, direct/reflect root, negative buffs/DOT
records and core4 statuses/Poison project duration exactly once. Projection occurs
before the existing1.5-second chain cap. Grace/immunity/invulnerability gates remain.
Existing effects are not retroactively shortened/extended. Positive durations,
cooldowns, windups, channel/terrain lifetimes and scheduled job delays do not change.
An authored auxiliary negative timer in private data still needs this explicit
projection; the engine cannot infer the meaning of arbitrary data fields.

The frozen arena periodic policy here is **duration-only**: periodic intervals and
per-pulse amounts stay unchanged; a shorter DOT can deal less total damage. This is
an explicit1v1 adaptation, not a claim that every official modifier shares that
policy. Authors must review their ability's damage/duration rules before closing a
whole-hero gate. Do not shorten an already-admitted remaining DOT duration again
when capping a refreshed slow: core code applies that cap after projection.

Typed statuses add durationScale only when resistance shortens their duration.
`packStatusDurationMatches(status,rawCanonicalDuration)` (also api method) verifies
duration=rawCanonicalDuration*(durationScale??1). Generic snapshot validation rejects
nonfinite/out-of-range scale or a positive scaled status. Authored schema validators
must use this matcher in place of exact unscaled-duration equality, keep intervals
canonical, and validate their own provider's ability/coefficient/source policies.
Do not recompute an old status using the provider's current value at restore time.

## Author integration checklist

- A/Tiny: register the fixed-profile innate provider, keep existing raw control
  durations, update authored duration validation; test both sides versus legacy,
  core4 and two other namespaces. The engine doesn't activate Tiny automatically.
- B/Enchantress: use hostile=false for enemy positive purge; preserve negative
  Seal/mixed components. B/Spirit Breaker: register Bulldoze as positive removable
  resistance, use the shared control transaction. Charge remains separately gated.
- C/Oracle: route Fortune's End with its explicit invulnerable-target permission;
  select negative cleanse / positive purge deliberately. Damage is still blocked
  on invulnerable targets; mixed Edict and deferred HP retain their own contracts.
- Every author: extend snapshot validation and demonstrate normal-input casts,
  polarity/tier preservation, exact duration admission, death/expiry and replay.
  Availability of this extension is not a full-hero acceptance result.

Focused executable evidence: qa/cohort/global-status.test.mjs. The production
Reborn music patch is an independent branch/commit and does not include this file.
