# Registry authorization through request dispatch

Follow-up to d659fc8, isolated from the4174 QA preview. Draft runtime: `duel-a0f8fa74b97148219565`.

A cached verified promise was insufficient: a concurrent refresh could invalidate it after roster fields resolved, or while anonymous session creation was pending. The previous creation could then issue a match request even though the registry now reported incompatible.

`authorizeRoster()` returns an in-memory permit carrying its generation, exact validated status object and wire fields. `rosterFields()` checks it again before returning. PVE/local creation and P2P create/join propagate the permit into `request()`, which checks it before session acquisition and again immediately before HTTP dispatch after the await. A changed generation aborts even if the new registry is also valid; the user may explicitly retry. The permit is not serialized in the HTTP body. Already-issued requests cannot be retroactively unsent.

Validation:9 new race tests plus the existing registry, match and P2P suites47/47 passed; full source suite674/674 and build passed before addition of separate, unconnected pack-helper preparation tests. The independent auditor's four reproduction cases all reject and emit no match creation after invalidation. Evidence: `release/registry-dispatch-audit/registry-races.json`.

No preview/backend binding/production switch is part of this fix. The dispatcher and public helper preparation files in this workspace are a separate work item and are not wired into Engine or active roster by this commit.
