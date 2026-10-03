# MC-P1-01 candidate handoff

Runtime: `duel-32479fbcfaf831aa3ff7`. Entry: `http://127.0.0.1:4173/`. Local API: `http://127.0.0.1:18082/api/v1`. The non-local production API selection remains `https://api.dotapk.lol/api/v1`.

The bug allowed a guest who had already rotated in the lobby to enter a match behind the rotate gate without pausing the host: the resize transition had already been consumed, so start did not resend orientation state.

## Fix

- Reliable `availability` control packets work during the lobby, independently of gameplay epoch filtering. Hello also advertises availability. Portrait withdraws readiness and invalidates host preparation; a late ready packet cannot override portrait.
- Returning landscape restores availability only. The rotated player must explicitly prepare again; no automatic start occurs.
- If the host has already committed a start, the guest retains the pending epoch and accepts the server-confirmed match in a paused state. An orientation hold survives a quick portrait-to-landscape rotation while the server response is pending. This prevents one peer being stranded in the lobby while the other is in battle.
- The app pauses on peer availability changes and sends the initial portrait pause during match initialization even when there was no new resize. Resume remains blocked while either viewport is portrait.

## Checks completed for this revision

- `npm test`: **289/289 passed**, including 10 new orientation regressions.
- `npm run build`: passed; standalone 22,796,040 bytes.
- `git diff --check`: passed.
- The new tests execute application/transport source with mock DOM, channels and server replies. They cover ready-lobby rotation, stale ready packets, host/guest preparation cancellation, delayed committed-start replies both with and without rotation recovery, first hello in portrait, already-portrait BroadcastChannel guest start, application readiness revocation and initial paused state. They are not graphical or real WebRTC/server acceptance.

## Independent browser acceptance still required

Use the available CUA entry; do not substitute raw CDP or old screenshots. Refresh both peers and verify the exact runtime above before testing.

1. At 4173, create and join a real WebRTC room with distinct selected heroes. Explicitly select the agreed QA RTT policy; retain the existing production defaults. Wait for both quality gates, then prepare both players.
2. Rotate the guest to portrait while still in the lobby. Host must show the guest unready and be unable to start. Restore landscape: no automatic ready/start. Explicitly prepare again and start.
3. Also exercise rotation overlapping match preparation/commit: both peers must remain synchronized and paused; portrait must never advance the authoritative match. After landscape recovery, explicit resume is required.
4. Complete a natural result, verify non-null matching server match IDs, start a rematch with a new ID, then interrupt it. Check server statuses and submissions using read-only SQL. `local_only` or null IDs do not meet this gate.
5. Capture clean game views without a QA overlay or transient fullscreen toast. Classify emulated viewport/touch, physical device, audio decoder activity and actual listening separately.

No browser interaction was performed for this follow-up fix. No new match ID, SQL receipt, physical-phone check or audible-output result is claimed. Historical `browser-polish` API/CSS injections and file navigation are explicitly classified in `MOBILE_CANDIDATE_QA.md`. The candidate remains unpublished; production, Site access scope and Library identities are unchanged.
