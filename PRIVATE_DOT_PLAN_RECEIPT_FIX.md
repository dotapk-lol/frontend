# Private DOT cast admission and debit receipt repair

Author repair candidate only. Formal accepted count stays **53/184**; Shadow Strike 17/0 and Sonic Wave 17/3 remain pending independent review. Foundation is exact private Sonic candidate `0cd7dfe98f659102ef02f20a2d90bc9680bdba40`, not production. Original private source is `6b7b61fa6c4b27c66c4b9bdafb6af0a162077885` (local archive commit `e2a54d54da460c6b2ac5ddbc6f8ea1a8fc3b621a`).

## Independent failures addressed

Read-only review inputs: Shadow report SHA256 `719187ebdee631203257943f2e5661de665221d30c123d66b739925ed7f82b8c`, Sonic report `1a76e6e25cd20ac863e8a2e62986d3a2918c582a18bdce4db4e8fbfad6c3cac7`, and joint results `9ae342a16db43890296a3e762dc49eeb9ed1686c8a46cc8f1276af9fd069e052`. Their verification scripts were not rerun.

P1: direct `Engine.cast` for both managed DOT slots now uses the same detached, stateless `ruleDotInputPlan` as ordinary input. Requested aim/held facts are forwarded and validated. A planner that tries random/state/resource actions is rejected before RNG, mana, cooldown, cast count, sequence or log changes. Affordability and readiness still govern acceptance; native aim clamping remains unchanged.

P2: the private host records the actual native HP debit before post-hit healing or revival. The DOT birth witness includes this private observation and any actual PackHP damage/chip capture deltas. Restore validates actual HP subtraction, lethal-at-debit, resolved/immediate/deferred conservation, source/target identity and ordered capture arithmetic. The receipt is still the existing public receipt shape; no public contract, handler, schema, registry or package changes. Host remains the only resource committer.

## Snapshot compatibility and limits

Private `packClock.legacyDot` is now version **2**, with a required private `debit` witness (witness version 1). New normal managed DOT snapshots restore and continue exactly, including real deferred-ledger settlement, healing and revival. Final actor HP is deliberately not used as the debit-point HP.

Earlier pending-candidate managed DOT version-1 packets lack the debit observation and are rejected atomically; no truthful upgrade can be inferred from final HP. Ordinary snapshots without managed DOT are unaffected. These candidate packets have not been deployed. This is bounded witness consistency, not authentication of arbitrary fabricated world history.

## Author evidence

`evidence/legacy-dot-plan-receipt-fix-*.mjs/json/log` contains 20 targeted test groups: **646 observations**, comprising **2 reproductions of the frozen pre-fix P1 bug** and **644 repair/regression observations**. Comparisons cover **161,652 native/prior frames**, **118,540 restored continuation frames**, plus **1,200 ordinary-input diagnostic frames** reported separately. These are author results, not independent acceptance.

The plan group has 36 repaired checks plus the 2 pre-fix diagnostic reproductions. The receipt group has 40 contradictory packet/atomic rejection checks and 10 real-input hook/ledger scenarios across both actor roles. Those scenarios compare against exact original native behavior: post-hit heal, pre-debit heal, lethal debit then revival, a half-damage ledger, and two ordered ledgers including chip capture. Deferred cases run 900 steps through actual settlement and compare restored continuation against an uninterrupted saved future.

Ordinary first closure, replacement, admission, boundaries, lifecycle and phase checks run for both pending DOT slots. Accepted 47, batch15, Gush and accepted53 Powershot regressions are included. Public134 source bytes, package/lock, main pure API bundle, five-source bundle, default3 and candidate64 registry identities remain unchanged. Native and queue semantics remain private.

The full 1407 suite was **not run for this repair**. No stopped Starstorm/Omni verification, branch or candidate package was executed, transformed, transferred or retried. No deployment, preview port, production tree, DB or accepted ledger was changed.

## Separate paused draft

The four-slot next-batch draft remains separate at `legacy-zero-linear-batch20-host`, commit `ff3cb3b1db665cebcecbeb5bb270f03d5fc4480d`, with `saved-batch20-paused-draft/STATUS.json`. None of its adapter, bundle or build changes enters this repair. It is paused, incomplete, unaccepted and not mergeable with this repair.

## Merge/review boundary

The preferred patch applies only to exact Sonic candidate `0cd7dfe98f659102ef02f20a2d90bc9680bdba40`. The cumulative accepted53 alternative includes the still-pending Shadow/Sonic candidates and must not be treated as accepted or merged automatically. Select one patch alternative in an isolated checkout. Independent review of both candidate slots and this repair is still required before any count change. Other unconnected candidates remain on native paths; browser/device/network/production acceptance is outside this author freeze.
