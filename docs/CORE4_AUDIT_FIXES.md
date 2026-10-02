# Core4 audit repair candidate

Base: `3fad3f881e38b83952cf44ceefbe9728f1ef6dff`. Isolated branch: `fix/core4-audit`. Runtime: `duel-6b66cc14337b5b7f079f`. Roster remains `arena-core4-24-v1`, IDs0–19,25,31,45,100. This is the next review candidate; the original4174 preview has not been switched by this worktree.

C01: guard/chip nonlethal cap is applied after every damage modifier and shield/conversion hook, immediately before HP debit. Fractional HP is preserved without healing. Shield absorption consumes the actual mitigated guarded impact. Unguarded damage remains lethal.

C02: Razor's moving-attack allowance uses a simulation timestamp for the committed attack recovery and a live draining link. Movement changing the visual animation to walk no longer cancels the allowance. Hurt, control interruption, ability activation and death clear it. This does not authorize movement during spell recovery or without a live link.

C03: debuffs retain an explicit `pierces` flag. Live movement/attack-speed modifiers consult the target's current immunity, suppressing nonpiercing effects without discarding their remaining duration. The same check applies to negative armor, poison vulnerability, curse attack bonus and healing reduction. Viper Strike and Haze retain their explicit piercing semantics. Damage-over-time is not relabeled as control immunity. Real Blade Fury still applies its existing dispels.

C04: Sprint's skill description explicitly discloses that this 2D adaptation retains fighter collision and omits official unit phasing. No balance or collision implementation was changed to hide the omission.

C05: Poison Attack now describes the implemented arena multiplier: magic-resistance-adjusted damage×(1+0.1×effective stacks). At35% resistance and one stack,100 magic damage becomes71.5. This is an arena formula disclosure, not an asserted official full resistance formula. Generated runtime descriptions and generator agree.

Registry recovery: retain successful verified caching and deduplicate in-flight requests; clear unavailable/rejected cache so existing retry actions revalidate without reload. An explicit refresh supersedes older requests; a stale response cannot publish state or authorize roster fields. Persistent errors remain rejected and do not create sessions/matches. There is no automatic downgrade or retry loop.

Validation:665 total tests, including67 new focused checks (42 guard/chip,16 interactions/formula,9 registry recovery/race). The independent review's original C01/C02/C03 reproduction script was rerun against this worktree with only import/output locations changed: guard leaves1HP; moving-only and moving+attack both156WU; immune Crush movement is65WU over.25s with multiplier1. Exact reports, AI matrix and old20 parity evidence are under `release/core4-audit` and `release/core4-qa`.

No real-browser retest is claimed here. Wait for the parent to bind this exact runtime on18083 and schedule the preview switch, then repeat the actual browser acceptance. The user's new request for familiar Dota2/Reborn BGM is still pending official-source research; the current TI4 audio has not been changed and does not fulfill that newer request.
