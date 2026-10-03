# Status extension audit repairs

This development change repairs the six independent findings against 2c44e6d.
It does not change the frozen 3103f156 release, author adapters, allowlists, or
the production music-only build. PACK_STATUS_ABI_VERSION stays duel-status-1.

- GS1-01: global dispel detaches the complete selected source-control batch and
  finalizes CC grace before deterministic end callbacks. Callback-created controls
  are outside that batch and remain; none-tier and other-target controls remain.
- GS1-02: hit, basic-attack proc, and drain change slow potency only when the new
  slow duration is actually admitted. A pre-existing timer cannot admit new potency.
- GS1-03: a denied negative legacy buff refresh leaves the previous object,
  potency, and remaining clock intact.
- GS1-04: Poison admission precedes stack-cap eviction; rejection leaves all six
  stack identities, ordering, clocks, and sequence allocation intact.
- GS1-05: normal and reflected root/DOT refreshes commit only after admission.
  The root uses the admitted DOT clock once; rejection retains the prior root/DOT.
- GS1-06: a zero-life Take Aim downside is removed before committing its positive
  grant. A rejected refresh retains the previous downside on its own original
  clock as the explicitly mapped negative `sniper_take_aim_negative` record.
  Positive expiry or purge cannot accidentally erase that retained downside;
  negative cleanse removes it and an admitted later refresh replaces it.

Validation performed by the integrator:

- Independent auditor's unchanged 42-case probe, with import paths redirected
  to this source: 42/42 pass (previously 30/42). This is an integrator rerun,
  not the auditor's independent acceptance of the new freeze.
- Added 16 meaningful double-sided regression cases. Global status suite 53/53;
  complete discovered repository suite 1447/1447.
- Auditor's 16 no-provider parity cases: 3200 frames, zero snapshot differences.
- Expanded no-provider comparison against frozen 3103f156: all 46 heroes both
  sides, 92 cases / 22080 frames, zero snapshot differences.
- Stable and 46-candidate build succeeded. No repaired build served or deployed.

Local supporting files are in `release/status-audit-fixes/`: original redirected
probe and results, parity scripts/results, complete test log and build logs.
The next reviewer should archive this exact commit and rerun the independent
probe against that archive. Cross-package slow-strength resistance and generic
attackable units are separate unimplemented capabilities; no author guard has
been bypassed to advertise them.
