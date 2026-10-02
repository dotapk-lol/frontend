# Mobile controls and official audio candidate

Candidate: `duel-138c5c6a0fd152c27851`. Base production source: `d179a9ffaf3436386f2cb5ee6a1719078b1e9157`. This is an unpublished frontend candidate. No Cloudflare deployment, domain, Site visibility or Library identity has been changed.

## Changes and root causes

| Review item | Root cause | Candidate behavior |
| --- | --- | --- |
| Q01 portrait entry / hidden battle | Orientation overlay existed only inside battle; start and simulation did not guard portrait | A global rotate gate makes the app inert before entry. Local start is blocked. Mid-match rotation clears inputs and pauses; a peer cannot resume while the other player remains portrait. Closing other dialogs still exposes a quit path. |
| Q02 dual controllers | `battleHTML` always rendered both players, then merely disabled remote buttons | PVE and room/P2P render one local slot, including guest slot 1. Only explicit desktop same-screen play renders two. Resize recomputes visible slots. |
| Q03 reduced arena | Fixed 16:9 container plus video rail removed play area | Canvas fills the available viewport; UI respects safe-area insets. Actors retain uniform scale. Background platform aligns with the actor ground plane. |
| Q04 video BGM | Embedded video and reserved player layout | Native looping HTMLAudio with bundled official TI4 MP3s, independent music/SFX toggles and volume. No video, file picker or substitute composition. |
| Q05 wrong guest hero | Guest joined with the default P2 card rather than the user's selection | A persistent “my hero” selection feeds both create and join; network draft shows an opponent placeholder until connected. |
| Q06 lost result actions | Closing the result removed the only rematch/retry entry while the “shown” flag suppressed reopening | Result remains reachable after Escape; rematch/reset and failed-save retry stay available. |
| Q07 fullscreen silent failure | Optional method invocation skipped the rejection handler when API was absent | Capability check, user-gesture fullscreen request, best-effort orientation lock and explicit fallback feedback. |
| Q08 directional arrow buttons | 3×3 clickable pad required exact button hits | One circular drag joystick with pointer capture, deadzone, angular hysteresis, clamped cap, neutral jump rearm and independent pointer ownership. |
| Q09 equal-width skill row / passive interactions | All actions shared row layout and passive buttons shared input handlers | Large circular attack with four smaller surrounding official skill icons; passive buttons grey/disabled, also filtered from keyboard/gamepad input queues. Heavy/dash/guard remain subordinate controls. |

Actual Chrome inspection found two additional visual defects while implementing this candidate: the short landscape roster pushed the start button below the viewport, and adapting the ground height initially made fighters appear to float. Both were corrected and recaptured. No engine damage formulas or backend contracts were changed.

## Actual browser evidence

The local Mac's installed Chrome was run with an isolated task-owned profile, through DevTools on port 9223. This is actual Chrome rendering, native IndexedDB/BroadcastChannel/WebAudio/HTMLAudio and browser input dispatch. It is headless desktop Chrome with emulated phone dimensions/touches, **not physical iOS/Android or human listening**. Existing signed-in browser profiles were not inspected or changed.

Preview: `http://127.0.0.1:4175/` (`DUEL_PORT=4175 node scripts/dev-server.mjs`). Build output: `dist/client`. Runnable standalone: `release/DOTA_DUEL_1V1_候选版.html` (22,793,985 bytes).

Evidence is in `qa/browser-evidence/` locally and in the candidate evidence bundle. It is intentionally excluded from public static deployment.

- `mobile-report.json`: portrait-first entry blocks input/start; 844×390 gameplay; one local controller/four skills/no arrows or iframe; actual emulated two-finger movement plus attack; release clears state; portrait freezes time and HP; viewport/control bounds at 667×375, 740×360, 844×390 and 915×412.
- `room-report.json`: real six-digit IndexedDB reservation; selected guest hero 8 carried through; third client rejected; separate host/guest browser windows both visible and independently controlled; guest rotation freezes host and blocks premature resume; guest quit disconnects. This is same-browser/same-device evidence, not cross-device networking.
- `audio-loop-report.json`: official battle track decoded to 46.341224 seconds in Chrome and naturally wrapped twice without seeking or accelerated time; a normal-speed PVE game reached 0:2 / two rounds / completed. Media clock and native decoder evidence do not certify audible speaker output or gapless quality.
- `result-controls-report.json`: natural result survives Escape; rematch starts round 1 at 0:0 with one controller; music and SFX switches/volumes operate independently.
- `skills-report.json`: actual radial-button casts for Lina, Juggernaut, Pudge and Windranger; cooldown/mana changes observed, passive slots disabled, and Powershot held to 0.8 charge before release.
- `polish-report.json`: 44 px left/right and 21 px bottom safe-area values simulated through the layout variables; bounds verified; Chrome entered actual fullscreen and reported unsupported orientation locking; offline HTML decoded embedded music and rendered two desktop control sets and loaded images.
- Screenshots: `01-portrait-entry`, `10-final-selection`, `12-final-battle`, `size-667x375`, `size-740x360`, `size-844x390`, `size-915x412`, `08-bc-host`, `09-bc-guest`, `11-safe-area-simulation`, `13-offline-desktop-dual`, plus natural KO/result evidence.

The resize browser harness waits for the requested viewport/canvas dimensions to settle (up to 2 seconds) before asserting bounds; an earlier fixed 200 ms assertion was premature under concurrent headless-window load. The final run passed after completed QA windows were closed.

A clean `git archive` checkout also passed all 279 tests and built the identical standalone HTML (SHA-256 `10cf1239949a24ec7868eab54edf3aaba635a167fbb9dc7f80ba5b65efb9c8ae`).

279 source/contract/integration regression tests pass; static and standalone build passes; `git diff --check` is clean. Mock input/fullscreen and source tests are not counted as real-device acceptance. Browser scripts are opt-in (`qa/browser-*.mjs`) and require the isolated local DevTools session, rather than silently launching or attaching to the user's normal browser.

## Official music provenance

Two MP3s are unchanged extracts from Valve's actively offered Workshop sample archive:

- Guide: https://help.steampowered.com/en/faqs/view/1D61-78DF-01D7-603B
- Archive: https://cdn.steamstatic.com/apps/dota2/audio/workshop_music_pack/music_pack_ti4.zip
- Archive SHA-256: `7c81917370557f965d45388a80a37981dc287c398ab0d9bfee2a603e9fe45069`; 37,684,121 bytes; 33 MP3 files and no additional LICENSE/README.
- Menu: `assets/music/ui_main_01.mp3`, 1,802,034 bytes.
- Battle: `assets/music/battle_01.mp3`, 928,499 bytes; native macOS decoder reports stereo, 44.1 kHz, 160 kbps.
- Credit: TI4 music / Chance Thomas. Per-track hashes and source context: `assets/music/source-manifest.json`.

Used as part of this non-commercial Dota fan work with the context of Steam Subscriber Agreement §2.D and any applicable terms. Not described as public domain, Creative Commons, or unlimited commercial authorization. No restricted stream extraction or third-party mirrored soundtrack was used.

## Remaining release gates — do not mark complete

1. **Go service browser integration is blocked by local origin configuration.** Read-only `GET http://127.0.0.1:18082/healthz` returned 200 / `v1.2-abort-reconciliation`; preflight from `http://127.0.0.1:4175` returned 403 `origin not allowed`. The local preview uses 4175 to leave the existing 4173 preview and backend untouched. The completed PVE result truthfully remained `local_only`; no server-save or SQL-confirmed claim is made. Backend owner must authorize a QA origin or coordinate the existing preview port before this candidate's Go/WebRTC end-to-end acceptance.
2. **Physical iPhone Safari / Android Chrome**, actual multitouch ergonomics, native safe-area/browser-toolbar behavior, screen-lock/background behavior, physical gamepads and audible mixing still require device checks. CSS-inset simulation is not iOS safe-area evidence.
3. **Performance is not signed off for phones.** Headless Chrome samples varied during active rendering (roughly 30–60 fps depending on startup and concurrent test windows). The 60 fps sample at a finished match is idle rendering, not proof of mobile combat performance. No KOF97 commercial-quality equivalence is claimed; this remains a compact 20-hero fan adaptation.
4. **Production deployment and real cross-network P2P** must use the approved exact commit/version and verify both sides, readiness/RTT policy, natural confirmed server result, rematch and aborted disconnects. Existing RTT configuration is preserved; no new threshold/direction was invented. TURN remains absent.
5. Library source ZIP / HTML identities and existing private Site are unchanged in this candidate handoff. They must not be represented as containing this revision until the parent task updates them through its authorized workflow.
