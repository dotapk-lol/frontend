// English presentation of the committed arena descriptions. No gameplay data.
export const SKILL_COPY_EN=Object.freeze({
  "crystal_maiden_nova": {
    "description": "Creates an ice blast that damages enemies in the target area and reduces movement speed.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. Actual arena behavior retains damage and movement slow; attack-speed reduction is not implemented."
  },
  "crystal_maiden_frostbite": {
    "description": "Encases an enemy in frost, preventing movement and attacks while dealing damage over time. The official description also specifies four times the damage against ordinary non-ancient units.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "crystal_maiden_aura": {
    "description": "Provides bonus mana regeneration to allied units, with stronger regeneration near Crystal Maiden within 1200 range. Crystal Maiden passively gains enhanced mana regeneration.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "crystal_maiden_freezing_field": {
    "description": "Channeled: surrounds Crystal Maiden with 100 random ice explosions, slowing enemies and dealing heavy damage over 10 seconds.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. Actual arena behavior retains random ice explosions and movement slow; attack-speed reduction is not implemented. Moving or releasing the skill stops channeling."
  },
  "axe_call": {
    "description": "Taunts nearby enemies into attacking Axe and grants bonus armor.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "axe_hunger": {
    "description": "Deals damage over time until the target kills a unit or the duration ends. The official description slows enemies facing away from Axe; see the arena behavior below.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. The arena currently applies a continuous slow without dynamically checking whether the target faces away. There is no creep-kill removal; hitting Axe does not remove it. The slow cannot outlast this damage-over-time duration."
  },
  "axe_helix": {
    "description": "After a set number of incoming attacks, Axe performs a spinning counterattack that deals pure damage to nearby enemies.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "axe_culling": {
    "description": "Strikes a weakness for pure damage. The official description includes cooldown reset, allied movement and armor rewards on a hero kill, plus permanent armor stacks; the arena omissions are listed below.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. The arena retains damage; kill rewards and permanent armor growth are not implemented."
  },
  "sniper_shrapnel": {
    "description": "Consumes a charge to rain explosive shrapnel on an area, damaging and slowing enemies and granting vision. A charge restores every 35 seconds.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. After leaving the area, the slow lingers for at most 2 seconds; it is not reset to 10 seconds."
  },
  "sniper_headshot": {
    "description": "Attacks can deal 20 / 50 / 80 / 110 extra damage and knock enemies back, with stronger knockback at close range. Briefly reduces movement and attack speed by 100%.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "sniper_take_aim": {
    "description": "Passively adds 160 / 240 / 320 / 400 attack range. Activating increases vision, Headshot chance and attack range, slows Sniper by 65%, and restricts vision to a forward cone.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "sniper_assassinate": {
    "description": "After a short aim, fires a long-range shot for attack damage plus bonus damage and a brief stun. The official description includes a cooldown reset on hero kills; see the arena behavior below.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. Damage uses a 500 magic base plus the arena basic-attack component, with a dodgeable straight projectile. Full attack modifiers and kill-based cooldown reset are not implemented."
  },
  "anti_mage_mana_break": {
    "description": "Each attack burns the target’s mana and deals damage equal to a percentage of the mana burned.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "anti_mage_blink": {
    "description": "Teleports a short distance, allowing Anti-Mage to enter or leave combat.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "anti_mage_counterspell": {
    "description": "Passively increases magic resistance. Activate to form an anti-magic shell that blocks and reflects targeted spells.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "anti_mage_mana_void": {
    "description": "Damages the target and nearby enemies based on the target’s missing mana. Damaged units are briefly stunned.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "drow_ranger_frost": {
    "description": "Adds frost to arrows, slowing movement and dealing extra damage for 1.5 seconds.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "drow_ranger_gust": {
    "description": "Releases a gust that silences and knocks enemies back, revealing invisible enemies. Closer enemies are knocked back farther.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "drow_ranger_multishot": {
    "description": "Channeled: fires waves for up to 1.75 seconds, dealing bonus damage and applying Frost Arrows within attack range + 475. The official description allows slow movement and item use; this arena stops the channel on movement or release.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. The fan becomes 3 waves in 2D, each hitting at most once to avoid overlapping four arrows. Moving or releasing the skill stops channeling; moving while firing is unsupported."
  },
  "drow_ranger_marksmanship": {
    "description": "Attacks can pierce defenses and ignore base armor. Disabled when an enemy hero is within 300 range.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "lina_slave": {
    "description": "Releases a wave of dragon fire that burns enemies in its path.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "lina_array": {
    "description": "Summons a pillar of fire that damages and stuns enemies.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "lina_fiery": {
    "description": "Skill hits grant stacking attack-speed and movement-speed bonuses lasting 16 seconds.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "lina_laguna": {
    "description": "Strikes one enemy with lightning for heavy damage.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "lion_spike": {
    "description": "Rock spikes travel in a straight line, lifting enemies into the air and dealing damage and stun on landing.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "lion_hex": {
    "description": "Transforms an enemy into a harmless animal, disabling its special abilities.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "lion_drain": {
    "description": "Channeled: drains mana and slows movement; the official description adds 15% slow when the target has no mana, and allows giving an ally 50% mana and movement speed. The arena’s actual transfer contract is listed below.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. Cast range is 467.5 WU; after linking, break range is 605 WU. Invulnerability or debuff immunity blocks and interrupts the drain. This version transfers mana only up to the caster’s missing mana capacity; a full mana bar does not drain enemy MP. This contract is pending confirmation."
  },
  "lion_finger": {
    "description": "Deals heavy damage to an enemy. The official description also grants a temporary 250-range cleaving melee form and movement bonus, permanent spell/attack growth on hero kills, and a right-click option to disable melee attacks. Arena limitations are listed below.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. The arena retains damage and the temporary melee form; permanent kill-based damage growth and cleave are not implemented."
  },
  "shadow_fiend_raze": {
    "description": "Damages an area in front of Shadow Fiend, with bonus damage from current souls and a stacking debuff that increases damage from repeated hits.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. Near, middle and far razes use three ranges with a shared cooldown. Damage uses current souls and stacks."
  },
  "shadow_fiend_feast": {
    "description": "Grants movement and attack speed for 8 seconds. The official description collects souls every 0.5 seconds from two enemies within 600 range, once per enemy, with return/retention rules after the effect. The arena uses the single-opponent contract below.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. Every 0.5 seconds, checks the opponent within 330 WU. Collects 3 temporary souls only once from this round’s opponent, returning the actual collected count when the effect ends. The full innate soul system is not simulated."
  },
  "shadow_fiend_presence": {
    "description": "Reduces the armor of nearby enemies.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "shadow_fiend_requiem": {
    "description": "Releases up to 20 collected souls in damage lines, with closer targets hit by more lines. The official description adds fear, slow and magic-resistance reduction for 0.6 seconds per line up to 2.15 seconds, and an automatic release on death. Arena limits are listed below.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. In 2D, at most 3 soul lines count, dealing 160 each. There are no creeps; Soul Feast supplies souls. Death release and souls across rounds are not implemented. Soul-line damage and control remain; magic-resistance reduction is not implemented."
  },
  "queen_of_pain_shadow_strike": {
    "description": "Throws a poisoned dagger for initial damage and subsequent damage every 3 seconds, slowing the target for 16 seconds.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "queen_of_pain_blink": {
    "description": "Teleports a short distance, allowing Queen of Pain to enter or leave combat.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "queen_of_pain_scream": {
    "description": "Damages nearby enemies with a scream. Reflects 25% of the damage back to Queen of Pain.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "queen_of_pain_sonic": {
    "description": "Sends a powerful sound wave forward, dealing heavy damage and knocking back enemies in its path.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "witch_doctor_cask": {
    "description": "Throws a paralyzing cask that bounces between enemies, dealing damage and stun with increasing damage on each bounce.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "witch_doctor_restoration": {
    "description": "Toggles healing for nearby allied units while continuously consuming Witch Doctor’s mana.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "witch_doctor_maledict": {
    "description": "Curses enemies in a small area for damage each second and additional bursts every 4 seconds based on health lost since the curse began.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations."
  },
  "witch_doctor_death_ward": {
    "description": "Channeled: summons a Death Ward that prioritizes enemy heroes in attack range for up to 8 seconds. The official description includes 50% bonus accuracy; the arena behavior is listed below.",
    "note": "Max-level base damage, mana, cooldown and duration use the official snapshot. Distances scale by 0.55. Guarding, the 1.5-second hard-control cap and post-control protection are arena adaptations. The official snapshot did not expose attack interval; this arena uses 0.25 seconds and 120 pure damage per attack. Automatically places an independent, invulnerable ward toward the target within 275 WU of the caster. Ward attack radius is 357.5 WU, lasting up to 8 seconds. Releasing the key, moving, control, loss of focus or death ends channeling and removes the ward. Bonus accuracy is not separately simulated."
  },
  "vengefulspirit_magic_missile": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. A targeted missile resolves after a 0.25-second delay; it can be interrupted or avoided by invulnerability. Visual projectile collision is left to integration.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. A targeted missile resolves after a 0.25-second delay; it can be interrupted or avoided by invulnerability. Visual projectile collision is left to integration."
  },
  "vengefulspirit_wave_of_terror": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. An instant wave hits toward the sole opponent, reducing armor and total attack. Multiple-unit piercing and vision are omitted.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. An instant wave hits toward the sole opponent, reducing armor and total attack. Multiple-unit piercing and vision are omitted."
  },
  "vengefulspirit_command_aura": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Increases only the caster’s base attack by 25% × 1.25. No allied aura.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Increases only the caster’s base attack by 25% × 1.25. No allied aura."
  },
  "vengefulspirit_nether_swap": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Swaps horizontal positions and interrupts the target’s cast. Grants the caster a fixed 450 barrier, adapted against nominal damage.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Swaps horizontal positions and interrupts the target’s cast. Grants the caster a fixed 450 barrier, adapted against nominal damage."
  },
  "slardar_sprint": {
    "description": "Grants 34% movement speed for 10 seconds. Slow resistance is 100% for the first 2.5 seconds, then falls linearly to 0. Does not interrupt channeling. The 2D adaptation retains player-body collision and omits official unit traversal.",
    "note": "Four fixed slots, max-level base skills, no Scepter, Shard or talents; distances scale by 0.55, with arena guarding and the 1.5-second continuous-control cap. Grants 34% movement speed for 10 seconds. Slow resistance is 100% for the first 2.5 seconds, then falls linearly to 0. Does not interrupt channeling. The 2D adaptation retains player-body collision and omits official unit traversal."
  },
  "slardar_slithereen_crush": {
    "description": "Within a 178.75 radius, deals 300 physical damage and a 0.8-second stun, followed by 35% movement/attack slow for 6 seconds. Creates a puddle lasting 7 seconds.",
    "note": "Four fixed slots, max-level base skills, no Scepter, Shard or talents; distances scale by 0.55, with arena guarding and the 1.5-second continuous-control cap. Within a 178.75 radius, deals 300 physical damage and a 0.8-second stun, followed by 35% movement/attack slow for 6 seconds. Creates a puddle lasting 7 seconds."
  },
  "slardar_bash": {
    "description": "The first three landed basic attacks build up a counter. The fourth adds 200 physical damage and a 1-second stun. Does not trigger while broken.",
    "note": "Four fixed slots, max-level base skills, no Scepter, Shard or talents; distances scale by 0.55, with arena guarding and the 1.5-second continuous-control cap. The first three landed basic attacks build up a counter. The fourth adds 200 physical damage and a 1-second stun. Does not trigger while broken."
  },
  "slardar_amplify_damage": {
    "description": "Reduces target armor by 20 and reveals the target for 18 seconds, leaving 7-second water trails after sufficient movement. True sight affects visibility; armor reduction resolves separately.",
    "note": "Four fixed slots, max-level base skills, no Scepter, Shard or talents; distances scale by 0.55, with arena guarding and the 1.5-second continuous-control cap. Reduces target armor by 20 and reveals the target for 18 seconds, leaving 7-second water trails after sufficient movement. True sight affects visibility; armor reduction resolves separately."
  },
  "lich_frost_nova": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. The sole primary target takes 160 + 200 damage and both movement and attack slow.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. The sole primary target takes 160 + 200 damage and both movement and attack slow."
  },
  "lich_frost_shield": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Self-cast reduces only basic-attack damage and creates seven frost pulses that follow the caster.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Self-cast reduces only basic-attack damage and creates seven frost pulses that follow the caster."
  },
  "lich_sinister_gaze": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Continuously drains a proportion of current mana and pulls the target horizontally each tick. Movement direction uses the arena’s “towards” adaptation.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Continuously drains a proportion of current mana and pulls the target horizontally each tick. Movement direction uses the arena’s “towards” adaptation."
  },
  "lich_chain_frost": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Hits the sole opponent once. Does not bounce to itself without a valid second unit; waiting on a target for new units is omitted.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Hits the sole opponent once. Does not bounce to itself without a valid second unit; waiting on a target for new units is omitted."
  },
  "necrolyte_death_pulse": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Heals the caster for 130 and deals 280 magic damage to an opponent within the radius.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Heals the caster for 130 and deals 280 magic damage to an opponent within the radius."
  },
  "necrolyte_ghost_shroud": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Makes the caster ethereal: unable to attack, immune to physical damage, 20% more vulnerable to magic, and 75% stronger healing. A slowing area follows the caster.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Makes the caster ethereal: unable to attack, immune to physical damage, 20% more vulnerable to magic, and 75% stronger healing. A slowing area follows the caster."
  },
  "necrolyte_heartstopper_aura": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Deals 2.3% of maximum health as magic damage per second in an aura. Stops immediately under Break. Arena ticks are 0.25 seconds.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Deals 2.3% of maximum health as magic damage per second in an aura. Stops immediately under Break. Arena ticks are 0.25 seconds."
  },
  "necrolyte_reapers_scythe": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. After 1.5 seconds, deals damage equal to missing health at that time × 0.9. Permanent kill-based regeneration across rounds is omitted.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. After 1.5 seconds, deals damage equal to missing health at that time × 0.9. Permanent kill-based regeneration across rounds is omitted."
  },
  "leshrac_split_earth": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. At a fixed target position, erupts 0.35 seconds after startup for 280 magic damage and a stun.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. At a fixed target position, erupts 0.35 seconds after startup for 280 magic damage and a stun."
  },
  "leshrac_diabolic_edict": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Deals up to 40 explosions of 30 pure damage to the sole enemy in range. Explosions are consumed with no target. Does not damage buildings.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Deals up to 40 explosions of 30 pure damage to the sole enemy in range. Explosions are consumed with no target. Does not damage buildings."
  },
  "leshrac_lightning_storm": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Deals 240 magic damage and a 75% slow to the sole target. Does not bounce to itself without a second target.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Deals 240 magic damage and a 75% slow to the sole target. Does not bounce to itself without a second target."
  },
  "leshrac_pulse_nova": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Toggle using the same slot. Each second pays 60 mana before dealing 180 area magic damage. Turns off when mana is insufficient. Turning it off does not charge the initial mana cost.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Toggle using the same slot. Each second pays 60 mana before dealing 180 area magic damage. Turns off when mana is insufficient. Turning it off does not charge the initial mana cost."
  },
  "omniknight_purification": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Heals the caster for 300 and deals 300 pure damage to a nearby enemy. Cannot heal a dead character.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Heals the caster for 300 and deals 300 pure damage to a nearby enemy. Cannot heal a dead character."
  },
  "omniknight_martyr": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Self-cast only: 5 seconds of basic-dispel immunity and 60% magic resistance, healing 20 each second. Adds no unspecified dispel.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Self-cast only: 5 seconds of basic-dispel immunity and 60% magic resistance, healing 20 each second. Adds no unspecified dispel."
  },
  "omniknight_hammer_of_purity": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Active melee hit deals 90 + 85% of base attack as pure damage. Four self-heals total 40% of nominal damage. Actual attack-trigger synergies are omitted.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Active melee hit deals 90 + 85% of base attack as pure damage. Four self-heals total 40% of nominal damage. Actual attack-trigger synergies are omitted."
  },
  "omniknight_guardian_angel": {
    "description": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Self-cast grants physical-damage immunity for 5.5 seconds. Magic and pure damage remain normal. Removed on death.",
    "note": "2D distances scale by 0.55; a single hero opponent; no talents, Scepter or Shard; control is capped at 1.5 seconds. Self-cast grants physical-damage immunity for 5.5 seconds. Magic and pure damage remain normal. Removed on death."
  },
  "huskar_inner_fire": {
    "description": "Costs 150 nonlethal health. In a 275 radius, deals 320 magic damage, silences for 3 seconds and pushes the target to 220 distance from the caster. The official description says silence; the old disarm_duration parameter name does not mean disarm. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Costs 150 nonlethal health. In a 275 radius, deals 320 magic damage, silences for 3 seconds and pushes the target to 220 distance from the caster. The official description says silence; the old disarm_duration parameter name does not mean disarm. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "huskar_burning_spear": {
    "description": "Toggle with the button. Each landed hit costs 2% of maximum health and cannot kill the caster. Each independently dispellable stack lasts 9 seconds, dealing 16 + 0.5% of the target’s maximum health each second. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Toggle with the button. Each landed hit costs 2% of maximum health and cannot kill the caster. Each independently dispellable stack lasts 9 seconds, dealing 16 + 0.5% of the target’s maximum health each second. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents. V4 arena capacity: at most 32 stacks per target; further stacks replace the oldest."
  },
  "huskar_berserkers_blood": {
    "description": "Linearly scales with missing health. At 10% health it grants 320 attack speed, 30% magic resistance and healing per second equal to 70% of strength. This interpolation is an explicit arena adaptation. Break removes it immediately. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Linearly scales with missing health. At 10% health it grants 320 attack speed, 30% magic resistance and healing per second equal to 70% of strength. This interpolation is an explicit arena adaptation. Break removes it immediately. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "huskar_life_break": {
    "description": "During a short charge, applies a basic dispel, debuff immunity and 60% magic resistance. On arrival, self-damage and target damage each use 44% of the respective current health; applies 5 seconds of movement/attack slow. Self-damage is nonlethal. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "During a short charge, applies a basic dispel, debuff immunity and 60% magic resistance. On arrival, self-damage and target damage each use 44% of the respective current health; applies 5 seconds of movement/attack slow. Self-damage is nonlethal. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents. V4: a short timed charge positions the caster with e.move on arrival. No swept collision or hits along the path."
  },
  "night_stalker_void": {
    "description": "Daytime by default. Dark Ascension makes it night, extending the effect to 3.4 seconds and adding a 0.1-second interrupt. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Daytime by default. Dark Ascension makes it night, extending the effect to 3.4 seconds and adding a 0.1-second interrupt. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "night_stalker_crippling_fear": {
    "description": "A 192.5-range area follows the caster, applying silence and 40 DPS for 3 seconds by day or 6 seconds at night. Ends on leaving the area. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "A 192.5-range area follows the caster, applying silence and 40 DPS for 3 seconds by day or 6 seconds at night. Ends on leaving the area. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "night_stalker_midnight_feast": {
    "description": "Landed attacks heal the caster for 24. This passive is disabled as a button. The active nighttime consumption of non-ancient creatures is explicitly omitted. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Landed attacks heal the caster for 24. This passive is disabled as a button. The active nighttime consumption of non-ancient creatures is explicitly omitted. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "night_stalker_darkness": {
    "description": "Grants 30 seconds of night and 150 attack damage. Flight is a state only in 2D; terrain and vision effects are omitted. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Grants 30 seconds of night and 150 attack damage. Flight is a state only in 2D; terrain and vision effects are omitted. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "jakiro_dual_breath": {
    "description": "A two-phase directional 2D attack: ice first reduces movement/attack speed by 40%; after 0.2 seconds, fire deals 80 DPS for 5 seconds. Range is rechecked at the delayed phase. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "A two-phase directional 2D attack: ice first reduces movement/attack speed by 40%; after 0.2 seconds, fire deals 80 DPS for 5 seconds. Range is rechecked at the delayed phase. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "jakiro_ice_path": {
    "description": "After 0.2 seconds creates a line lasting 4.5 seconds. First contact deals 50 magic damage and stun. Continuous arena control is capped at 1.5 seconds. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "After 0.2 seconds creates a line lasting 4.5 seconds. First contact deals 50 magic damage and stun. Continuous arena control is capped at 1.5 seconds. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "jakiro_liquid_fire": {
    "description": "Arms the next basic attack. A hit deals 48 DPS for 5 seconds and reduces attack speed by 60. Liquid Frost is not selected or silently enabled. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Arms the next basic attack. A hit deals 48 DPS for 5 seconds and reduces attack speed by 60. Liquid Frost is not selected or silently enabled. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "jakiro_macropyre": {
    "description": "A directional 2D line lasts 10 seconds, refreshing a 1-second burn every 0.5 seconds for 200 magic DPS. No Scepter pure damage or immunity piercing. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "A directional 2D line lasts 10 seconds, refreshing a 1-second burn every 0.5 seconds for 200 magic DPS. No Scepter pure damage or immunity piercing. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "alchemist_acid_spray": {
    "description": "A 15-second area deals 40 physical DPS and reduces armor by 6. After leaving, the effect ends after its short refresh period. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "A 15-second area deals 40 physical DPS and reduces armor by 6. After leaving, the effect ends after its short refresh period. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "alchemist_unstable_concoction": {
    "description": "One button automatically brews for 5 seconds, then throws at a currently valid target. If out of range, it explodes on the caster at 5.5 seconds. Maximum 360 physical damage; its 3.2-second stun is subject to the 1.5-second arena cap. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "One button automatically brews for 5 seconds, then throws at a currently valid target. If out of range, it explodes on the caster at 5.5 seconds. Maximum 360 physical damage; its 3.2-second stun is subject to the 1.5-second arena cap. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "alchemist_corrosive_weaponry": {
    "description": "Each basic attack adds 2 stacks, up to 16, lasting 4 seconds. Each stack reduces movement speed and base attack by 4%. Break stops triggers. Extra brewing stacks are omitted. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Each basic attack adds 2 stacks, up to 16, lasting 4 seconds. Each stack reduces movement speed and base attack by 4%. Break stops triggers. Extra brewing stacks are omitted. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "alchemist_chemical_rage": {
    "description": "After a basic dispel, grants 30 seconds of 120 HP/s and 40 official movement-speed bonus; base attack interval becomes 1 second. No extra transformation skills. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "After a basic dispel, grants 30 seconds of 120 HP/s and 40 official movement-speed bonus; base attack interval becomes 1 second. No extra transformation skills. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "treant_natures_grasp": {
    "description": "A 2D vine line lasts 12 seconds, dealing 80 DPS and 40% slow on contact. Tree attachment and creep damage reduction are omitted. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "A 2D vine line lasts 12 seconds, dealing 80 DPS and 40% slow on contact. Tree attachment and creep damage reduction are omitted. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "treant_leech_seed": {
    "description": "Arms the next basic attack for 80 extra magic damage and 1.5 seconds of root/disarm. Two self-heals each grant 45 + 25% of this attack’s actual damage, replacing shared allied healing. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Arms the next basic attack for 80 extra magic damage and 1.5 seconds of root/disarm. Two self-heals each grant 45 + 25% of this attack’s actual damage, replacing shared allied healing. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "treant_living_armor": {
    "description": "Self-cast: 13 HP/s for 12 seconds. Each player damage event of at least 10 blocks the current amount, starting at 120 and decreasing by 20. Removed when the amount reaches 0. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Self-cast: 13 HP/s for 12 seconds. Each player damage event of at least 10 blocks the current amount, starting at 120 and decreasing by 20. Removed when the amount reaches 0. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "treant_overgrowth": {
    "description": "Within 440 range, applies 95 DPS for 5 seconds plus root, disarm and reveal. Pierces debuff immunity and can be strongly dispelled. The arena control portion lasts 1.5 seconds; damage over time still lasts 5 seconds. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Within 440 range, applies 95 DPS for 5 seconds plus root, disarm and reveal. Pierces debuff immunity and can be strongly dispelled. The arena control portion lasts 1.5 seconds; damage over time still lasts 5 seconds. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "ogre_magi_fireblast": {
    "description": "Deals 250 magic damage and a 1.2-second stun. Multicast repeats independently at 0.6-second intervals using seeded randomness. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Deals 250 magic damage and a 1.2-second stun. Multicast repeats independently at 0.6-second intervals using seeded randomness. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "ogre_magi_ignite": {
    "description": "Deals 50 DPS and a 25% slow for 8 seconds. A second target is omitted in 1v1; multicasts on the same target refresh duration rather than stack unlimited damage. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Deals 50 DPS and a 25% slow for 8 seconds. A second target is omitted in 1v1; multicasts on the same target refresh duration rather than stack unlimited damage. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "ogre_magi_bloodlust": {
    "description": "Grants the caster 12% movement speed and 100 attack speed for 30 seconds. The official self_bonus is interpreted as the total self bonus, avoiding stacking it again with the ordinary 80. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Grants the caster 12% movement speed and 100 attack speed for 30 seconds. The official self_bonus is interpreted as the total self bonus, avoiding stacking it again with the ordinary 80. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  },
  "ogre_magi_multicast": {
    "description": "Passive R button is disabled. Seeded randomness chooses the highest qualifying threshold: 4× at 15%, 3× at 30%, 2× at 75%. Each 16 strength adds 1 percentage point. The arena probability interpretation is pending independent review. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents.",
    "note": "Passive R button is disabled. Seeded randomness chooses the highest qualifying threshold: 4× at 15%, 3× at 30%, 2× at 75%. Each 16 strength adds 1 percentage point. The arena probability interpretation is pending independent review. Fixed level 18 with the selected four skill slots; no Scepter, Shard or talents."
  }
});
