# Private four-slot Legacy0 closed-program bridge

Author candidate only; formal accepted count remains **53/184**, 131 unaccepted. Foundation is exact DOT repair `404dfc182bd6aab424673d65d386c80fb10ff36d`, itself based on pending Shadow/Sonic. This increment does not accept those two slots or its four new slots. Preferred patch applies only to exact404 in a private isolated checkout.

## Four concrete existing mechanisms

| Slot | Ability ID | Existing mechanism |
|---|---|---|
| 4/3 | sniper_assassinate | Single linear aimed damage projectile |
| 7/1 | drow_ranger_gust | Linear wave with native silence and knockback |
| 8/0 | lina_slave | Linear damage wave; existing Fiery Soul interaction remains native |
| 9/0 | lion_spike | Ground projectile with native stun/continuous-control cap |

No new hero or gameplay. Other abilities remain on existing paths. The previous paused draft `ff3cb3b1db665cebcecbeb5bb270f03d5fc4480d` remains immutable and separate; its historical PRIVATE_BATCH20_PAUSED_DRAFT.md is retained as history, not this candidate's current status. A normal cherry-pick conflict was resolved by preserving404 DOT plan/debit fixes and adding the separate program preview. No failed security action was retried.

## Frozen contract dependencies and private ports

Uses immutable owned Legacy0 `remainingLegacyFactory`, `heros-host-events-1`, `legacy-linear-v1` and `legacy-hit-v1`. Its existing pure callbacks are `planCast`, `activate` and `onContact`; its existing return is `{draft:true,profile,abilityId,commands,result}`. This private subset admits exactly one closed `projectile.spawn` at activation and one closed `hit` with `result.postHit:null` at contact. Extra commands, unsupported projections/pulls/basic/attack stages, missing callbacks, wrong handshake/capabilities, state/RNG actions and malformed values are refused before fees. Empty or multiple-command programs are outside this increment's supported subset.

Private zeroFacts converts bounded actor/cast/contact facts to the unchanged owned closed event. Private zeroSource/zeroHit consume declared geometry/damage/control; they do not call a hero-specific original-skill backdoor. The public callback receives detached actor facts and no Engine/input/fighters/move/cast object. Direct cast and ordinary queued input share stateless program plan admission. Nonfinite direct aim/held and invalid direction are refused before resource commitment. The public closed plan event has no aim/held fields; no public event extension is invented here.

The host commits MP/CD/startup/recovery once, creates one native projectile, uses native swept collision/reflection exactly once, invokes the actual sealed onContact program, then performs one native damage debit and its original control/passive/death callbacks. Native movement, collision, AI/input, round/mainloop, rendering and networking stay private. Whole contact replacements clear omitted legacy silence/knockback/stun/slow fields so old effects cannot leak through. Public semantics and requested amounts remain authoritative.

Stage order is unchanged: fighter timers/cast/movement/input/charge, target DOT phase, events/guard, swept projectile contact, zones/deaths/round. A committed projectile retains its original source death/control policy; guard/invulnerability/immunity/control caps remain native. Reflection consumes the actual counter and records effective source/direction while preserving original source identity.

## Snapshot and code identity

Uses the existing private legacyLinear witness/restore rather than a new public schema. Source birth regenerates actual sealed activate output; contact regenerates actual sealed onContact output. Rules/code/schema identities, native index bijection, geometry/motion/redirect/counters and existing snapshots remain checked atomically. No damage/fee history authentication is claimed.

The six-source immutable Legacy0 consumer is privately bundled as hero-legacy-zero-rules.js. It imports the unchanged canonical contract from heros-rules.js so schema identities share the same authority. It does not modify the134 public files or owned handlers. Package/lock, default3, main pure bundle and existing five-source bundle stay unchanged. Candidate registry has68 factories, hash `a560c70d32601f73a25c92a75634e881c2e30c216ae3cad44ee382899a2d9973`; default3 hash `1addac3563ec57ce979f32e80ed2f443d43f92972999da1d2db606ad90513efd`.

Inherited404 managed DOT v2/debit witness is preserved. Historical pending DOT v1 snapshots still reject; ordinary snapshots without managed DOT remain compatible. The404 freeze is never rewritten.

## Author evidence and explicit limits

18 targeted groups contain **1070 observations**, **234004 original-native/prior comparison frames**, **115110 restored frames**, and **12240 ordinary-input refusal diagnostic frames** reported separately. First closures, replacements and receipt scenarios restore against original replay or uninterrupted saved futures; accepted-old-slot restores compare to frozen prior Engines. These total48470 restored frames. The remaining66640 are paired deterministic restores in native/lifecycle groups, and are not claimed as independent continuation oracles.

Four-slot first closures compare real setInput/step worlds and logs against exact original6b7 native archive, both roles. Additional tests cover dt1/60/.05/.013, guard/jump/counter/control/miss, source/target KO in controlled training, input cancellation, immunity/invulnerability, pause/hitstop and real flight restore. Replacement60 reads and debits60; whole contact0/35 suppresses original damage/control; declaration MP60/CD2/startup.1 and lowMP40 plan35 pay once; silence/knockback/stun and half-speed activation replacements affect real execution. Source/control/collision remain private. Original registry behavior is rechecked unchanged.

264 admission checks reject illegal/missing/stateful/RNG/duplicate declarations and nonfinite direct options before fees. 216 source/redirect/identity/snapshot/reentry/late-replay checks reject atomically. Accepted47/batch15/Gush/Powershot regressions and both inherited DOT ordinary/lifecycle/receipt/plan regressions are included. Failed author fixture logs are retained separately, not counted as passing observations. The MP fixture observes the actual cast debit because native per-frame regeneration precedes input; counter timing uses real input near long-windup projectile launch.

An expanded exact404 suite supplement exists separately:1396 passed,0failed,11 excluded for Starstorm/Omni or compound tests that can execute those abilities. Node filters remove them from reported totals, so skipped=0 does not mean full1407 coverage. No unfiltered1407 run is claimed. This four-slot candidate uses the same exclusions for its expanded ordinary suite; final freeze records its actual result separately.

No public handler/interface blocker was found for these four supported subsets. Other unconnected source/status/DOT/aura/channel/job/attack/death combinations remain outside this increment; unsupported public declarations need an explicit interface request, not a fabricated host hero callback. No stopped Starstorm/Omni verification, branch or candidate package is executed/transformed/transferred/retried. No production/DB/deployment/public repo/preview port changes. Browser/device/view/audio/real network acceptance is not performed.

Independent review and count changes belong to the parent integrator. If all inherited pending candidates and these four are later accepted, the count would be59; this author candidate keeps53.
