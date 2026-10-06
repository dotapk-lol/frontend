# Private host wave43 — finite profiles and phase order

Base: private accepted100 commit `66c0ef547198a6844dcfee8bc7c9ef0211e68178`. The independent Native oracle is the untouched archive of `6b7b61fa6c4b27c66c4b9bdafb6af0a162077885`. These are private files, never part of the MIT rules package. Registration remains explicit in a consumer registry; the game's default registry/46-hero roster is unchanged.

## Frozen scope

Legacy finite: `1:0,2:2,3:0,4:2,5:2,8:1,9:3,15:0`.
Legacy receipts: `3:2,5:0,6:3,7:0,8:2,15:1,16:2,19:1`.
Core: `25:2,31:0,31:1,31:3,45:0,45:2,100:2`.
C: `94:1,94:2,99:2,106:2`.

Public callbacks receive closed, detached actor facts and named effects via the existing canonical `createRuleSession`. They never receive Engine, input, fighter arrays or mutable native status objects. Registry code identities and branded state schemas remain untouched. No public handler, public registry/shared contract, roster, renderer gameplay, collision, network or production setting is changed. The small presentation snapshot validator accepts a consumed poison stack cap; drawing is unchanged.

## Ports and ownership

| Port / facts | Private responsibility | Supported wave43 use |
|---|---|---|
| planCast and committed facts | Reject action/resources before debit; commit MP/CD/cast once | Core Sprint/Crush/Haze/Poison; C DoubleEdge/Seal |
| actor / target.distance / now / random | Detached current facts, host time and original RNG call order | Surge/Coup and projection predicates |
| damage / actual receipt | One `resolveDamage`, genuine synchronous actual debit, no HP inference | All selected damage and nested Helix/Return/Skin |
| self-damage | One native nonlethal damage pipeline, type from selected public ability's official damage declaration | C DoubleEdge; original caster pays even after reflection |
| mana | Validated affordability and one real debit | Poison attack/contact ManaBreak/Frost |
| status apply/query/remove | Typed native storage, opaque binding, refresh/expiry/cleanse | Finite buffs, Core statuses/stacks, C Seal/gain |
| control | Existing capped native control/interruption | Array/Call/Crush and source callbacks |
| target.route | Native activation route; consume Counterspell once | C DoubleEdge/Seal; denied delivery has no activation log |
| legacy-effect finite area | Host field identity, lifetime, water geometry | Core Crush/Haze water only |
| attack/interval/movement/healing projections | Apply each owned projection once, original host combination order | Aim/Fiery/Sprint/Haze/Skin/Curse/Withering/Atrophy |
| death and interruption | Finalized death event, source cancellation, native cleanup and round reset | Core toggles/statuses; C gain latch/shared housekeeping |

C's frozen factories inherit broad `schedule`/`legacy-effect` requirements. The four selected descriptors produce no jobs or fields. Those operations explicitly refuse requests here; this is **not** a general C scheduling/effect implementation. Other C selectors are not enrolled. Existing B/A scheduling, areas, channels and receipts remain their accepted transports. Wave43 does not prove arbitrary third-party handlers have every advertised capability.

## Dispatch order

1. Native input interpretation/buffering/admission stays private. Finite preflight checks bounded effects with a detached session before queuing/payment. Core/C plans are public. Native MP/CD/cast/sequence commits once. C committed targeting notifications keep their old post-payment phase; public effects do not fake them.
2. Activate the public handler at native cast completion. A handled selector bypasses its corresponding old activation. C routing happens inside its named target port once; failed delivery preserves payment and omits the native activation log.
3. Basic attack starts with original attack/RNG ordering. Contact receipts supply ManaBreak/Frost; Poison's owned attack projection requests one MP debit and sets its native contact tag. Fiery projections and Soul bonuses retain their original combination stages.
4. Damage modifies armor and magic at native stages. Core armor, poison amplification and Skin resistance apply once; C Seal's global amplification applies once even in mirror picks. Existing private shield/conversion stages stay in their original order. Post-debit actual damage is the sole source for Shell and nested receipts. Withering runs before the reflection-return guard; Surge/Skin after it. No fabricated damage=1 facts.
5. Native afterAttack supplies the genuine landed result. Poison stacking occurs before break suppresses passives, matching Native. Predator/Curse replace the old additions; C Return uses the target's attack receipt once. Existing Slardar Bash remains the accepted path.
6. Native typed clocks remain authoritative. Refresh preserves Core DOT tick instead of resetting it. Core haze observes native live dt and transport binds its trail handle/state. During the poison pulse queue, status queries use the detached **pre-advance observation for that queue** until all native slots have delivered their final eligible pulse; expiry commits after that queue. This preserves Native's last-pulse amplification and does not retain expired records in a checkpoint. Non-periodic clocks retain their original advance.
7. C housekeeping `before-status` precedes native status advance; `after-status` precedes due jobs/entities; `end-step` precedes native KO cleanup. Atrophy runs on one finalized death event. Its permanent deathSeen latch is frozen Native behavior, not a new rule/fix. Native rounds recreate fighters/session/bindings.

## Checkpoint and failure policy

Public rules state uses the existing hash/schema envelope. Core/C private bindings are plain `packClock.core43/c43` envelopes, matched bijectively to native records; C shared state refuses jobs/fields/pools/channels outside the selected descriptor scope and duplicate/crossed public references; public Haze handles, Poison toggle, Surge cooldown and C status/deathSeen state are cross-checked. Handle duplication, missing bindings, foreign identities, changed descriptor values and wrong rulesHash reject before replacing live state. Native validators consume selected sealed C coefficients; the presentation validator consumes the selected poison cap. Direct Core dispel reconciles owned handles; stale C public bookkeeping may remain only without a live native binding, as its frozen housekeeping permits.

Existing frame transactions now enroll these transports. Wave43 direct cast and C input notification also use an action transaction. Host failures after a genuine debit restore native world, rules state, resource clocks and logs. A supported request succeeds once; repeated/invalid requests cannot create a second authority.

## Still private / still pending

AI, input, movement/collision, main loop, rounds, rendering and networking remain private. Only the listed 27 selectors are new candidates; none is production enabled. General C jobs/homing/field/pulse/shield bindings, A returning spirits/profile lifecycles, remaining Core ring/link/missile/shield/conversion and remaining legacy geometry are future waves. Seaborn's water armor/attack/movement/regen accompanying accepted `31:2` Bash still uses its frozen Native path and needs the later owned innate upgrade; the current water fields do not silently migrate it. Ten stopped selectors remain forbidden. No general absorption shield port or custom hero API has been implemented. See `PRIVATE_CUSTOM_HERO_ID_PROPOSAL.md` for the minimum public-owner proposal.
