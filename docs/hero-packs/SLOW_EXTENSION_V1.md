# Additive global slow strength: duel-slow-1

PACK_ABI_VERSION remains duel-pack-2.4-targeting. PACK_STATUS_ABI_VERSION remains
duel-status-1. PACK_SLOW_ABI_VERSION is duel-slow-1. Implemented capabilities are
`global-slow-resistance` and `slow-strength-projection`; no roster gate changes.

`e.registerSlowResistance(f,{source,abilityId,key=abilityId,resistance,duration,
dispel='none',requiresPassives=false,allowInvulnerable=false}) -> id|null`

`e.releaseSlowResistance(id) -> boolean`, `e.slowResistance(f) -> fraction`

`e.projectSlowMagnitude(f,{magnitude,hostile=true,ignoreSlowResistance=false})`

The same entries exist on createPackServices with the usual declared ability-ID
check for registration. The target is the exact fighter object. Resistance is
bounded 0..1, duration is 0..3600, and at most 64 providers exist. Different
providers stack as `1-product(1-r)`. Refresh ownership is target/source/key;
an old handle cannot remove the replacement. Passive providers require their
source to be alive and unbroken. Positive purge respects basic/strong/none;
negative cleanse retains providers. Fixed-step expiry and target death remove
providers; source death suppresses passive providers. Invulnerability normally
denies new providers unless explicitly permitted by the caller.

Strength resistance is a live read projection. Duration admission remains the
separate status-resistance contract. Existing negative statuses immediately use
the current strength factor; their saved values, life, duration, periodic damage,
armor, and other attributes do not change. Provider expiry/purge resumes the
original magnitude without restoring or extending duration.

Typed hostile values use these explicit representations:

| Key | Slow representation |
| --- | --- |
| moveSlow, slow | positive fractional movement reduction |
| attackSlow | positive attack-speed reduction |
| aspd, attackSpeed | negative attack-speed change |
| moveFlat, moveBonus | negative flat/fractional movement change |

Positive buffs and their negative self penalties are exempt. Tiny Grow's attack
speed reduction is therefore not reduced. No classification is inferred for
unknown field names or other negative attributes. `api.value` projects the
recognized fields, and `api.slowValue(e,f,status,key)` provides the same explicit
single-record query. Raw `api.status` values stay canonical for author schema
validation and snapshot inspection.

Existing adapters that read their typed values directly in numeric movement and
attack-interval hooks receive a scoped read projection from the dispatcher. The
raw values object is restored in `finally`, including when a hook throws. Nested
api.value queries and nested projections do not scale twice. These numeric hooks
must remain read-only projections; do not mutate status values or save/restore
the simulation while inside a movement/attack-interval hook. Other custom-data
mechanics must explicitly call projectSlowMagnitude or slowValue once.

Legacy timed slows, walking/jump velocity, all Core4 poison/Viper/Crush/skin/toxin
strengths, and authored typed movement/attack-speed representations are connected.
Existing legacy slow resistance and Slardar Sprint remain their own factors.
Legacy self_slow and positive self penalties are unchanged. No-provider behavior
is preserved. The implementation does not activate Tiny, Ursa, or any review
package automatically; authors must register official providers, update tests,
and pass independent acceptance before changing implementation gates.

Integrator validation: 31 new double-sided strength tests including real
Night Stalker normal input, cross-A/B/C projections, legacy/core composition,
snapshot replay/forgery, provider lifecycle, purge, and exception restoration.
The previous auditor's 42 status probes also pass when redirected to this source.
All46/no-provider parity against f7ec21e: 92 cases/22080 frames, zero differences.
Complete repository suite: 1480/1480; global status suite 55/55. Includes the
post-f7ec21e P2 negative-fragment whitelist/mutual-exclusion repair; the auditor's
16 derived probes rerun by the integrator pass16/16. Stable/candidate builds pass.
No browser acceptance or deployment is claimed for this development extension.
