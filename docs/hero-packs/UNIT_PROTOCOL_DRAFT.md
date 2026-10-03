# Unfinished unit protocol draft — stopped by scope change

Development branch only. Production remains frozen3103f156/runtime e63daf,
private main94ca6bd. This draft must not be included in the46 release or a
public46 rules extraction. No additional hero is enabled.

The draft contains ActorRef identity, unit templates, queued attacks, control,
source-aware HP ledger debit, actor hooks, expiry/removal, owner cleanup and
unit death-group transactions. Its review-only ABI is duel-unit-protocol-0.1;
full-unit hero gate capabilities are not advertised.

The two original KO persistence assertions were corrected to the actual match
contract: roundEnd freezes the simulation and cannot apply damage after the
winner/history are committed. Owner death cancels nonpersistent jobs immediately.
Persistent units/jobs remain for the frozen round and do not alter the result;
training without KO can deliver explicitly persistent work. Added double-sided
coverage for both outcomes and saved33/33 focused tests. Previously rerun status
and slow suites passed86/86. No complete repository test, build, independent
review, browser acceptance or deployment has been performed for this draft.

Known unfinished scope: natural fighter input against generic units; legacy
healing/death ward identity integration; all authored reactive defense/proc
adapters; evasion/guard parity; complete canonical snapshot field/ownership and
structural-budget hardening. These are not claimed implemented or accepted.
Do not continue these features unless the user reopens the scope.
