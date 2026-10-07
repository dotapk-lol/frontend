[English](OFFICIAL_SOURCES.md) | [简体中文](OFFICIAL_SOURCES.zh-CN.md) | [Website / 官网](https://dotapk.lol)

# Sources and third-party rights

Project-owned code/docs are [MIT](../LICENSE), copyright2026 dotapk-lol contributors. This grant does not relicense third-party dependencies, Valve images/music/names/trademarks, fonts or descriptions. Preserve upstream licenses/notices; attribution, a download URL, a user-provided file or a SHA256 does not establish redistribution permission. This fan adaptation is not endorsed by Valve.

The product name is **DOTA PK**. `assets/favicon.svg` is an original project-owned two-player crossed-blade drawing, covered by the project MIT license, together with its generated favicon/app-icon PNGs and ICO. Its red/dark palette and angular style reference the [official Dota favicon](https://www.dota2.com/favicon.ico), inspected on2026-10-07; the official graphic was not copied or redistributed as this mark. Existing Valve assets retain their separate rights. The SVG has no external resources, embedded official artwork or tracking. `scripts/render-brand-icons.py` uses local macOS Quick Look and Pillow to produce16/32px favicon,180px Apple touch,192/512px app and separate512px maskable icons; regular builds consume the committed local files. Small PNG favicons retain transparent corners; Apple/app icons have opaque dark backgrounds, and maskable foreground fits the central safe circle.

## Retained source inputs

`reference/official-2026-10-02/` contains frozen identity/catalog/ability/talent records and required capability/coverage inputs read by `scripts/generate-catalog.mjs`; `reference/hero-pack-inputs/first21-assets.json` and `src/hero-packs/*/*.json` support developer generation/provenance. `docs/official-combat-overrides.json` preserves numeric conversion sources used by the original20 adaptation. These are project snapshots, not current patch guarantees or executable official mechanics. IDs, source fields and metadata remain in the files rather than duplicated in handoff logs.

Primary provenance recorded by the project: [official heroes](https://www.dota2.com/heroes), hero datafeed `https://www.dota2.com/datafeed/herodata?language=english&hero_id=<VALVE_ID>` (Chinese language `schinese`) and Steam CDN image URLs. Rank arrays, DPS/per-hit/total/percentage semantics, charge restoration and source pointers must be distinguished. Arena distance/control/HP/resource/targeting reductions are adaptations. A website feed omits collision/tick/animation and other native semantics; missing fields must be labelled implementation constants, not invented official values.

## Media

Current `src/official-music.js` uses `assets/music/reborn-dnb-remix.mp3`; [reborn-source.json](../assets/music/reborn-source.json) records the user-selected track and offline derivative. Retained TI4 tracks have [source-manifest.json](../assets/music/source-manifest.json). Image provenance is also recorded in `assets/cohort/source-manifest.json` and retained input manifests; existing assets are preserved by this cleanup. Source manifests are provenance, not unrestricted commercial/public redistribution grants. Review each asset's applicable rights before reuse, including derivatives.

The cleanup removes stale acquisition/QA attestations, not the underlying referenced source inputs or media. Removed files remain reachable in Git history; no historical purge or permission grant is implied. Do not put player-level data, private paths or reports into source/provenance guides.
