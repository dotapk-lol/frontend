# iOS / simplified controls / skill audit candidate

Unpublished candidate based on production `0e2942a7881201cb0f090137a92dfecba46621eb`. Production remains unchanged. Preview: http://127.0.0.1:4173/ (append `?qa=1` for the frame meter). Runtime: `duel-3eae6740bfb02be9eb3b`.

This batch is ready for independent source audit and supported-browser QA, not release acceptance. The implementation worker has no supported CUA/browser tool in this turn. It inspected the three supplied iOS screenshots, but has not seen or operated this new candidate in Safari. Existing desktop screenshots and earlier production acceptance are not evidence for this revision. Physical iPhone/iPad multitouch, Safari pinch recovery, safe areas, A2HS launch, audio listening and measured frame rate remain mandatory before release.

## Changes to verify in the browser

- Gameplay-only nonpassive gesture prevention, independent pointer capture/cancel, inverse-scale stick coordinates, visualViewport scale/offset geometry. Scale/pan changes clear held/queued inputs, pause both peers, and require resume. Browser zoom itself is not reset.
- Result header is compact; only details scroll. Save status and 44px rematch/return actions occupy a separate bottom grid row. Retry is shown only after a failed save. Check browser-chrome-reduced heights down to 240px and long/error messages.
- Fullscreen checks actual browser state, including the prefixed API. Unsupported iOS tabs show truthful A2HS instructions. Manifest and icons support standalone launch; no service worker or offline-install guarantee.
- Only stick + one attack + four skill slots remain. Keyboard/gamepad/room legacy heavy, dash and standalone guard commands are ignored. Back relative to the opponent guards while retreating; back-down guards crouched; forward/down alone do not guard. No defense while attacking, casting, charging, channeling or recovering.
- Damage retains exact internal arithmetic but displays at most one decimal; text merges/caps and avoids HUD/overlapping labels. Ward icons draw after fighters with lifetime bars, spawn/heal/destroy feedback.

## Independent audit disposition

The source audit is `/Users/didi/Documents/Codex/2026-10-02/task-3/audit-report.txt`. IDs below retain that report's priorities; P2 contract questions are not promoted to confirmed Valve-runtime defects.

| ID | Result | Concrete implementation / evidence |
| --- | --- | --- |
| D01 P1 | Fixed | Valid skill edges precede basic attack, use a 350ms buffer, preserve committed recovery, consume once, and expire visibly. Blur/cancel clears buffers. All 67 active slots tested through setInput/step; held-attack ward also tested through app channel. |
| D02 P1 | Fixed | Melee ward hits require front-facing and ground-height collision; ranged basic attacks require projectile arrival. Hero bodies can intercept projectiles before an overlapping ward. Back/air/ground/projectile cases pass. |
| D03 P1 | Fixed | Dead wards never tick, heal rejects HP<=0, defeated actors cannot activate queued casts. Real lethal attack then due ward tick produces HP0 and roundEnd. Already launched projectiles/persistent effects may finish within that simulation step before round arbitration; no revival. |
| D04 P1 | Fixed | DoT slow refresh is bounded by remaining lifetime; Shrapnel explicitly retains the official 2s linger. Hunger/Shadow Strike expiry, Shrapnel exit, pause and round-end boundaries pass. |
| D05 P1 | Fixed with explicit classifications | Added basic/strong dispel. Fury ends with strong dispel; Omnislash begins with basic dispel. Hunger/Frostbite/Shadow Strike use basic tags, Maledict remains undispellable; strong removes stun/hex/fear but not taunt. Soft vulnerable/weak buffs are removable, unrelated buffs remain. Raw Valve feeds for IDs2/5/30/39 confirmed dispellable2 vs3; see local evidence. This is not certification of every modifier combination. |
| D06 P1 | Fixed critical/attack chain; fixed-count adaptation disclosed | Blade Dance's 35%/200% applies to Fury ticks. Omnislash goes through ordinary attack hit resolution, including crit/evasion/Tide block. It intentionally remains ten fixed slashes rather than dynamic attack-speed-derived counts, now stated in its in-game archive. Seeded Fury produces35/70; Omni vs Tide produces38/151 rather than113. |
| D07 P1 | Fixed | Remnant trigger129.25WU and explosion165WU are separate; 22WU target body allowance is explicit.151WU triggers;151.5/160 do not; untriggered entity expires at12s. |
| D08 P1 | Fixed | Lion validates initial467.5WU range before commitment and again at activation; larger605WU is only channel break range. Dead/invulnerable/debuff-immune targets reject/interrupt, with no mana transfer or new slow. Full-mana semantics remain D13. |
| D09 P1 | Fixed | Death Ward is an independent positioned, invulnerable entity, placed within275WU, attacking from its own357.5WU radius.32 attacks over8s at the already disclosed.25s interval. Release/control/move/cancel/death removes it. Independent position/range, expiry and death tests pass. |
| D10 P2 | Fixed bounded 1v1 contract | Feast checks range every.5s, collects3 once from the opponent, subtracts only actually collected souls at expiry. Full innate/death-linger soul system remains excluded and explicitly disclosed. |
| D11 P2 | Deferred; behavior unchanged | No caster self-slow added. Removed unused MVP promise while retaining untouched official snapshot/semantic fields and explaining the unresolved legacy-field contract in the archive. Do not present as a verified Valve rule. |
| D12 P2 | Deferred; behavior unchanged | Pudge retains fixed pre-mitigation tick healing; no unsupported claim about Valve pre/post mitigation. Archive now states healing is not linked to actual target HP loss. Product/source decision still needed. |
| D13 P2 | Deferred; behavior unchanged | Full Lion mana still limits transfer to0. Archive explicitly states this. Separating enemy drain from caster restore needs the product contract decision. |
| D14 P2 | Disclosed; incomplete mechanisms deferred | Per-skill archive notes now name missing attack-speed slows, invisibility targeting, permanent Finger/Culling bonuses, Requiem resistance reduction, and moving Multishot. Moonlight remains visible/targetable. Not advertised as complete80-skill replication. |
| D15 P2 | Fixed visibility/text portion | Healing ward renders above fighters, with lifetime bar, spawn/destroy feedback and bounded readable healing numbers. Stale numeric counterplay/dash instructions replaced. Hunger facing-dependent slow remains explicitly disclosed as unimplemented. Visual readability still requires new CUA screenshots. |
| D16 P2 | Fixed | Ordinary attack recovery is bounded by configured attack interval; due-event comparison uses floating tolerance. Focus Fire produces approximately20 attacks in3s, nine simulation frames between attacks rather than14. |

## Executed validation and files

- `npm test`:394/394 passed. `npm run build`:passed; standalone HTML22,823,487bytes. `git diff --check`:passed.
- New focused suites: `qa/simple-controls-ward.test.mjs`, `qa/skill-audit-fixes.test.mjs`, `qa/ios-regression.test.mjs`; existing mobile/DOM/network harnesses updated for the real new control contract.
- A fresh frozen snapshot reran the auditor's source probe scripts:80slots,536 active scenarios,224,574 JSON snapshot round-trips;80skills ×80 app-handler/BroadcastChannel-mock snapshots =6,400. These were rerun by the implementation worker, not yet independently reviewed, and are not actual browser or network results. The copied audit runner changes its old guard fixture to relative-back input; old expectation fields in diagnostic probes are not assertions.
- Evidence folder: `frontend/release/ios-simplified-qa/`: `frozen-matrix.json`, `frozen-probes.json`, `mechanics-evidence.json`, `http-check.json`, test/build logs and exact snapshot. The original audit folder remains untouched.
- Existing official TI4 menu/battle MP3s and playback integration remain built in. No user import/download required. Source URLs and hashes are in `assets/music/source-manifest.json`. This candidate changes no music files or licensing claim.

## Release gate

Independent skill-audit owner must rerun D01–D10/D15/D16 reproductions against this exact candidate; CUA owner must verify desktop Safari/Chrome selection, both players, room creation/join/third-player rejection, cancel/blur/multitouch, actual result rematch/return and official audio. Physical iOS must verify the three original screenshot failures, standalone behavior and safe-area/toolbar constraints. Do not deploy or update Library deliverables until those results are accepted. No Site/Cloudflare/main branch publication, backend/database mutation, access-scope change or Library identity replacement was performed in this batch.
