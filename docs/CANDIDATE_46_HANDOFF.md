# Isolated 46-hero candidate

This branch keeps the stable source/public allowlist at `arena-core4-24-v1`.
`node scripts/build.mjs --candidate` creates a separate `dist-candidate/client`
and `release/DOTA_DUEL_46_QA候选版.html`. Only that build replaces the compile-time
release-profile module. No query parameter, storage setting or frontend control
can unlock the stable build. Candidate and stable builds have distinct runtime
hashes and roster compatibility identities.

Candidate roster: `arena-first22-46-v1`, mechanics `arena-first22-v1`, registry
`duel-heroes-127-v1`. New IDs: 21,28,29,32,36,42,47,50,55,57,58,62,71,81,82,94,99,
104,106,117,121,124, plus the existing24. Adapters: A V8, B V6, C V6.

## Presentation and integrity

All132 new official portraits/renders/selected skill icons were downloaded from
Valve CDN and actually reviewed as pixels. Provenance and original/web SHA256 are
in reference/hero-pack-inputs/first21-assets.json (historical directory name).
WebP UI resources total1,747,034bytes. Official originals stay in ignored incoming/.
The web encoding pipeline crops transparent render margins and fits UI resolution;
it does not invent character art. Four core4 fallback renders also use compressed
WebP in the offline package; their existing sprite atlas remains unchanged.

The four-slot archive and control UI uses actual selected abilities. New hero
roles, all88 new skill SFX, toggles, charged-skill counts, raw/typed/source-owned
control labels, barriers, channels, areas, projectiles and spirits are wired.
New character motion uses the existing canvas movement/hit/attack/jump transforms
on official renders. It is not hand-drawn multi-frame KOF-quality animation.

The remote validator checks active roster, bounded serializable presentation data,
actor identities, core4 state, each active author's snapshot schema, HP conservation,
source controls and clocks before accepting peer state. Orphan/unknown namespaces
and invalid owners/timers reject. This is client-reported integrity, not authoritative
server anti-cheat. VM channel fixtures now deserialize into the receiver's realm,
matching native BroadcastChannel behavior instead of sharing Node-realm objects.

## QA handoff

`npm test`; `node scripts/build.mjs --candidate`;
`node scripts/verify-candidate-build.mjs`;
`node qa/cohort/candidate-wire-probe.mjs`.
Start an isolated local server with
`DUEL_CANDIDATE=1 DUEL_PORT=4185 node scripts/dev-server.mjs`.
The4185 preview uses a separate backend at127.0.0.1:18084/api/v1.
Never replace the frozen4174 preview or its18083 backend without coordination.

The backend must explicitly bind the exact candidate gameVersion from
`dist-candidate/client/build-manifest.json` to this46-ID roster. Existing registry
and request authorization checks are retained. Do not bypass them for P2P QA.
Production, Sites, Library and their access scope are unchanged.

Independent reports supplied by the parent close the original A/B adapter findings;
the shared S24 fixes are separate commit77057c9, with28/28 independent probes and
64 focused regressions. They still need the independent audit owner's confirmation.
Real browser visual/layout/input/audio/FPS/match persistence acceptance is pending
in the existing QA thread. Build/VM/controlled Engine results are not browser proof.

Default BGM now matches production audio patch fe3d3ae: Reborn D+B Remix.
Hosted playback uses the exact user-supplied320kbps MP3. The expanded-roster
standalone export embeds a192kbps derivative to stay below32MiB; original and
derivative hashes are recorded in assets/music/reborn-source.json. The separate
20-hero music-only export embeds the unmodified original MP3.
