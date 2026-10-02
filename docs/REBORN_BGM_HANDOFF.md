# Reborn D+B Remix: production-only audio patch

Base:62abfe665f10f8f7589890949714b174dae2db9d. Hero roster, Engine, networking
and production hosting configuration are unchanged. Only default music, credits,
related tests and derived runtime version change.

The user explicitly selected the local file `02 Dota 2 Reborn D+B Remix.mp3`
from `The Dota 2 Remixes EP (MP3)`. It is copied unchanged to
assets/music/reborn-dnb-remix.mp3. SHA256:
e19fc6ebc70965227f7e1f4bb30e69367033fdc97f6c9ca09ea53470643eae85.
9,133,967bytes,223.500seconds,44.1kHz stereo320kbps. The source file is unchanged.
This is the remix, not the original Reborn. Artist:Valve Studio Orchestra.

Menu and battle reference the same native Audio URL, so starting a match,
returning to selection and rematching do not reload or reset the music. Existing
first-gesture unlock, loop, independent SFX/music switches, volume, mute and
background pause behavior remain. No iframe, file picker or user download step.
The standalone HTML embeds the exact original MP3 once and stays below32MiB.

QA preview: `DUEL_PORT=4186 node scripts/dev-server.mjs`.
Before production deployment, use the actual browser to check first gesture,
continuity across start/rematch, audible output, independent music/SFX volume,
off/on, background behavior, and a natural loop after223.5seconds (no seeking).
Read-only DUEL.musicStatus exposes name,currentTime,duration,playing,state,loop.
Automated module/regression tests and asset hashes do not substitute for this.

No production deployment has occurred as part of freezing this patch.
The46-hero candidate stays in its separate worktree/feature branch.
