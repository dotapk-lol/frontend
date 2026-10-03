# ABI 2.3: owned control and persistent cancellation

Additive to `duel-pack-2.2-hp`, published as `duel-pack-2.3-control`.
New capability names: `source-controls`, `action-cancellation`.

## Owned control

`e.applyControlSource(f,{owner,key,type,duration,pierces=false,dispel='strong'})`
(or the same service facade method with e as first argument) returns a numeric
control ID, or null if the existing immunity/grace/1.5-second continuous-control
admission refuses it. Types: stun, root, hex, fear, taunt. This is still the
explicit arena control cap, not an uncapped recreation of Dota durations.

`e.releaseControlSource(id,reason)` removes only that record. Waking a sleep
cannot erase an independent stun or a legacy raw timer. `e.controlRemaining(f,type)`
queries both effective owned records and legacy timers. Mobility-specific author
admission must use this query rather than f.root. Owned effects suppress under
later debuff immunity unless piercing; timers keep advancing. Strong/basic/none
removal is typed; expiry and target death release records, round reset clears all.
`controlEnded(e,event)` includes owner, target, key, type, id and reason.

## Persistent action cancellation

`e.actionToken(f,reasons)` creates a serializable `{actor,revisions}` token.
Reasons are `control`, `input_cancel`, `movement`, `action`; omitted reasons mean
all four. `e.actionTokenValid(token)` remains false after a short stun or input
has ended. Per-actor revisions are carried in packCore and strictly restored.

Movement/jump input rising edges notify movement; attack/skill rising edges and
accepted committed casts/normal attacks notify action. Canceling input notifies
input_cancel, hard control interruption notifies control. `actionChanged(e,f,reason)`
is distinct from interrupted: movement does not cancel an ability that explicitly
allows movement. To watch only interruptions, request control and input_cancel.
Forced attacks do not synthesize player action changes.

An author MUST call `e.commitAction(f)` after successful admission but BEFORE
creating its new action token/job; refused direct casts must not commit. All
registered core4/A/B/C adapters in this checkpoint do so, including toggles.
This opt-in obligation is part of the author contract, not inferred from a later
boolean return. Direct engine displacement is not treated as player movement input.

`api.scheduleEffect(e,{...,cancelOnAction:['control','input_cancel']})` records a
token. runDue drops invalid jobs; default empty policy retains the older wire shape.
No `cancelOnAction` field is required in existing ABI2.1 authored schemas.

## HP and boundaries

HP settlements and death attribution remain the ABI2.2 API. Death callbacks run
before author endStep cleanup and again afterward, so an endStep death or a death
callback that kills an actor already visited cannot miss the current-frame stage.
The per-life ledger prevents duplicate death callbacks on the second pass.

No attackable-unit, forced-order, swept-motion, global positive purge, status
resistance or pre-KO revival capability is claimed by this checkpoint. New pack
registration does not unlock the UI/network roster. The public roster stays24.

## Evidence

`qa/cohort/source-control.test.mjs` covers independent ownership, raw-timer
preservation, movement/jump/cast/attack gates, immunity, cap/grace, root expiry,
typed dispel, persistent cancellation, direct accepted/refused casts in every
system, deterministic replay and atomic rejection of forged records.
`qa/cohort/integrated-matrix.mjs` exercises all ordered pairings involving the21
new candidates against the45-definition simulation roster, with controlled
positions and snapshot continuation. This is not browser acceptance.
