var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/@dotapk/heros/index.js
var heros_exports = {};
__export(heros_exports, {
  BATTLE_ABI: () => BATTLE_ABI,
  CAPABILITIES: () => CAPABILITIES,
  EMPTY_STATE_SCHEMA: () => EMPTY_STATE_SCHEMA,
  HOOKS: () => HOOKS,
  codeIdentity: () => codeIdentity,
  createHeroRegistry: () => createHeroRegistry,
  createRuleSession: () => createRuleSession,
  defineStateSchema: () => defineStateSchema,
  heroes: () => heroes
});

// node_modules/@dotapk/heros/content/heroes.json
var heroes_default = [
  {
    id: "juggernaut",
    name: "剑圣",
    en: "JUGGERNAUT",
    hp: 1200,
    mana: 200,
    mana_regen: 8,
    attack: 78,
    move_speed: 260,
    attack_range: 105,
    attack_interval_s: 0.65,
    combatHp: 3360,
    combatMana: 1200,
    color: "#e99750",
    strength: 54,
    registryNumericId: 0,
    valveHeroId: 8,
    abilities: [
      {
        id: "juggernaut_blade_fury",
        slot: "S1",
        name: "剑刃风暴",
        en: "Blade Fury",
        official: {
          semantic: {
            tick_interval_s: 0.2,
            magic_resistance_pct: 80
          }
        },
        mvp: {
          damage: 35,
          damage_type: "magical",
          cooldown_s: 18,
          mana: 110,
          duration_s: 5,
          range_wu: 0,
          radius_wu: 143,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 144,
          input: "tap",
          effect: "aura",
          ticks: 25,
          tick_interval_s: 0.2,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 5,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            tick_interval_s: 0.2,
            magic_resistance_pct: 80
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          magic_reduction: 0.8,
          debuffImmune: true,
          endDispel: "strong"
        }
      },
      {
        id: "juggernaut_healing_ward",
        slot: "S2",
        name: "治疗守卫",
        en: "Healing Ward",
        official: {
          semantic: {
            heal_max_hp_pct_per_s: 5,
            ward_move_speed: 325,
            ward_hits_to_destroy: 1
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 60,
          mana: 120,
          duration_s: 24,
          range_wu: 192.50000000000003,
          radius_wu: 220.00000000000003,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 240,
          input: "tap",
          effect: "ward",
          ticks: 120,
          tick_interval_s: 0.2,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 24,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            heal_max_hp_pct_per_s: 5,
            ward_move_speed: 325,
            ward_hits_to_destroy: 1
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          heal_total: 4032,
          follow: true
        }
      },
      {
        id: "juggernaut_blade_dance",
        slot: "S3",
        name: "剑舞",
        en: "Blade Dance",
        official: {
          semantic: {
            crit_chance_pct: 35,
            crit_total_pct: 200
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            crit_chance_pct: 35,
            crit_total_pct: 200
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          critChance: 0.35,
          critMultiplier: 2
        }
      },
      {
        id: "juggernaut_omnislash",
        slot: "R",
        name: "无敌斩",
        en: "Omnislash",
        official: {
          semantic: {
            attack_rate_multiplier: 1.4,
            bonus_attack_speed: 40
          }
        },
        mvp: {
          damage: 113,
          damage_type: "physical",
          cooldown_s: 120,
          mana: 350,
          duration_s: 3.5,
          range_wu: 247.50000000000003,
          radius_wu: 233.75000000000003,
          startup_frames: 18,
          recovery_frames: 24,
          active_frames: 54,
          input: "tap",
          effect: "multi",
          ticks: 10,
          tick_interval_s: 0.3316326530612246,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 3.5,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          invulnerable_active: true,
          tracking_break_wu: 233.75000000000003,
          tick_offsets_s: [
            0,
            0.3316326530612246,
            0.6632653061224492,
            0.9948979591836737,
            1.3265306122448983,
            1.658163265306123,
            1.9897959183673475,
            2.321428571428572,
            2.6530612244897966,
            2.9846938775510212
          ],
          officialSemantic: {
            attack_rate_multiplier: 1.4,
            bonus_attack_speed: 40
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      }
    ]
  },
  {
    id: "crystal_maiden",
    name: "水晶室女",
    en: "CRYSTAL MAIDEN",
    hp: 1050,
    mana: 200,
    mana_regen: 10,
    attack: 46,
    move_speed: 235,
    attack_range: 390,
    attack_interval_s: 0.85,
    combatHp: 2940,
    combatMana: 1200,
    color: "#8cc9f6",
    strength: 54.400000000000006,
    registryNumericId: 1,
    valveHeroId: 5,
    abilities: [
      {
        id: "crystal_maiden_nova",
        slot: "S1",
        name: "冰霜新星",
        en: "Crystal Nova",
        official: {
          semantic: {
            slow_pct_signed: -50,
            attack_speed_slow_signed: -75
          }
        },
        mvp: {
          damage: 260,
          damage_type: "magical",
          cooldown_s: 8,
          mana: 175,
          duration_s: 4,
          range_wu: 385.00000000000006,
          radius_wu: 233.75000000000003,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 1,
          input: "ground",
          effect: "ground",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 50,
          slow_duration_s: 4,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "ground",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            slow_pct_signed: -50,
            attack_speed_slow_signed: -75
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "crystal_maiden_frostbite",
        slot: "S2",
        name: "冰封禁制",
        en: "Frostbite",
        official: {
          semantic: {
            tick_interval_s: 0.25
          }
        },
        mvp: {
          damage: 25,
          damage_type: "magical",
          cooldown_s: 6,
          mana: 155,
          duration_s: 3,
          range_wu: 330,
          radius_wu: 0,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 60,
          input: "tap",
          effect: "root",
          ticks: 12,
          tick_interval_s: 0.25,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 3,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            tick_interval_s: 0.25
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          dispelTier: "basic"
        }
      },
      {
        id: "crystal_maiden_aura",
        slot: "S3",
        name: "奥术光环",
        en: "Arcane Aura",
        official: {
          semantic: {
            base_mana_regen_per_s: 1,
            mana_regen_amp_pct: 80,
            nearby_mana_regen_per_s: 3
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 660,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            base_mana_regen_per_s: 1,
            mana_regen_amp_pct: 80,
            nearby_mana_regen_per_s: 3
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          manaRegenAmp: 0.8,
          manaRegenBonus: 4
        }
      },
      {
        id: "crystal_maiden_freezing_field",
        slot: "R",
        name: "极寒领域",
        en: "Freezing Field",
        official: {
          semantic: {
            explosion_interval_s: 0.1,
            explosion_radius: 320,
            slow_pct_signed: -40,
            attack_speed_slow_signed: -160,
            explosion_min_distance: 195,
            explosion_max_distance: 785
          }
        },
        mvp: {
          damage: 250,
          damage_type: "magical",
          cooldown_s: 90,
          mana: 600,
          duration_s: 10,
          range_wu: 0,
          radius_wu: 445.50000000000006,
          startup_frames: 0,
          recovery_frames: 24,
          active_frames: 120,
          input: "hold",
          effect: "channel",
          ticks: 100,
          tick_interval_s: 0.1,
          stun_s: 0,
          slow_pct: 40,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            explosion_interval_s: 0.1,
            explosion_radius: 320,
            slow_pct_signed: -40,
            attack_speed_slow_signed: -160,
            explosion_min_distance: 195,
            explosion_max_distance: 785
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          randomExplosion: true,
          explosionRadius: 176,
          explosionMin: 107.25000000000001,
          explosionMax: 431.75000000000006
        }
      }
    ]
  },
  {
    id: "pudge",
    name: "帕吉",
    en: "PUDGE",
    hp: 1400,
    mana: 200,
    mana_regen: 8,
    attack: 82,
    move_speed: 225,
    attack_range: 100,
    attack_interval_s: 0.65,
    combatHp: 3920,
    combatMana: 1200,
    color: "#bba77e",
    strength: 76,
    registryNumericId: 2,
    valveHeroId: 14,
    abilities: [
      {
        id: "pudge_hook",
        slot: "S1",
        name: "肉钩",
        en: "Meat Hook",
        official: {
          semantic: {
            projectile_speed: 1600
          }
        },
        mvp: {
          damage: 360,
          damage_type: "pure",
          cooldown_s: 12,
          mana: 120,
          duration_s: 0,
          range_wu: 715.0000000000001,
          radius_wu: 35,
          startup_frames: 18,
          recovery_frames: 24,
          active_frames: 1,
          input: "aim",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 880.0000000000001,
          hitstun_s: 0.12,
          pull_to_distance: 90,
          pull_speed: 900,
          pull_cap_s: 0.55,
          projectile_height: 50,
          officialSemantic: {
            projectile_speed: 1600
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "pudge_rot",
        slot: "S2",
        name: "腐烂",
        en: "Rot",
        official: {
          semantic: {
            tick_interval_s: 0.2,
            slow_pct_signed: -32
          }
        },
        mvp: {
          damage: 24,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 999,
          range_wu: 0,
          radius_wu: 137.5,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 120,
          input: "tap",
          effect: "aura",
          ticks: 4995,
          tick_interval_s: 0.2,
          stun_s: 0,
          slow_pct: 32,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            tick_interval_s: 0.2,
            slow_pct_signed: -32
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: true,
          self_damage_per_tick: 24
        }
      },
      {
        id: "pudge_meat_shield",
        slot: "S3",
        name: "肉盾",
        en: "Meat Shield",
        official: {
          semantic: {
            flat_damage_block: 26
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 17,
          mana: 80,
          duration_s: 7,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 150,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 7,
          buff_value: 18,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            flat_damage_block: 26
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          block_flat: 26,
          block_fraction_cap: 1
        }
      },
      {
        id: "pudge_dismember",
        slot: "R",
        name: "肢解",
        en: "Dismember",
        official: {
          semantic: {
            strength_multiplier_per_s: 0.9,
            tick_count: 6,
            pull_speed: 75,
            pull_min_range: 125
          }
        },
        mvp: {
          damage: 86.35,
          damage_type: "magical",
          cooldown_s: 20,
          mana: 170,
          duration_s: 2.75,
          range_wu: 110.00000000000001,
          radius_wu: 0,
          startup_frames: 18,
          recovery_frames: 30,
          active_frames: 72,
          input: "hold",
          effect: "grab",
          ticks: 6,
          tick_interval_s: 0.4583333333333333,
          stun_s: 2.75,
          slow_pct: 0,
          slow_duration_s: 2.75,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 1.2,
          officialSemantic: {
            strength_multiplier_per_s: 0.9,
            tick_count: 6,
            pull_speed: 75,
            pull_min_range: 125
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          heal_total: 518.0999999999999
        }
      }
    ]
  },
  {
    id: "axe",
    name: "斧王",
    en: "AXE",
    hp: 1350,
    mana: 200,
    mana_regen: 8,
    attack: 84,
    move_speed: 240,
    attack_range: 100,
    attack_interval_s: 0.65,
    combatHp: 3780,
    combatMana: 1200,
    color: "#e27564",
    strength: 70.9,
    registryNumericId: 3,
    valveHeroId: 2,
    abilities: [
      {
        id: "axe_call",
        slot: "S1",
        name: "狂战士之吼",
        en: "Berserker's Call",
        official: {
          semantic: {
            bonus_armor: 15
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 12,
          mana: 120,
          duration_s: 3,
          range_wu: 0,
          radius_wu: 173.25,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 39,
          input: "tap",
          effect: "taunt",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 3,
          slow_pct: 0,
          slow_duration_s: 3,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.65,
          officialSemantic: {
            bonus_armor: 15
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          physical_reduction: 0.47368421052631576
        }
      },
      {
        id: "axe_hunger",
        slot: "S2",
        name: "战斗饥渴",
        en: "Battle Hunger",
        official: {
          semantic: {
            slow_pct: 30
          }
        },
        mvp: {
          damage: 4.800000000000001,
          damage_type: "pure",
          cooldown_s: 5,
          mana: 80,
          duration_s: 12,
          range_wu: 495.00000000000006,
          radius_wu: 0,
          startup_frames: 18,
          recovery_frames: 15,
          active_frames: 180,
          input: "tap",
          effect: "dot",
          ticks: 60,
          tick_interval_s: 0.2,
          stun_s: 0,
          slow_pct: 30,
          slow_duration_s: 12,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            slow_pct: 30
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          dispelTier: "basic"
        }
      },
      {
        id: "axe_helix",
        slot: "S3",
        name: "反击螺旋",
        en: "Counter Helix",
        official: {
          semantic: {
            trigger_attacks: 4
          }
        },
        mvp: {
          damage: 160,
          damage_type: "pure",
          cooldown_s: 0.3,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 151.25,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          trigger_every_received_attacks: 4,
          internal_cooldown_s: 0.3,
          officialSemantic: {
            trigger_attacks: 4
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "axe_culling",
        slot: "R",
        name: "淘汰之刃",
        en: "Culling Blade",
        official: {
          semantic: {
            kill_bonus_movespeed_pct: 30,
            kill_bonus_armor: 20,
            per_kill_permanent_armor: 2
          }
        },
        mvp: {
          damage: 475,
          damage_type: "pure",
          cooldown_s: 70,
          mana: 150,
          duration_s: 6,
          range_wu: 96.25000000000001,
          radius_wu: 495.00000000000006,
          startup_frames: 18,
          recovery_frames: 30,
          active_frames: 1,
          input: "tap",
          effect: "hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 6,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            kill_bonus_movespeed_pct: 30,
            kill_bonus_armor: 20,
            per_kill_permanent_armor: 2
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      }
    ]
  },
  {
    id: "sniper",
    name: "狙击手",
    en: "SNIPER",
    hp: 1e3,
    mana: 200,
    mana_regen: 8,
    attack: 48,
    move_speed: 240,
    attack_range: 480,
    attack_interval_s: 0.85,
    combatHp: 2800,
    combatMana: 1200,
    color: "#d8bc75",
    strength: 53,
    registryNumericId: 4,
    valveHeroId: 35,
    abilities: [
      {
        id: "sniper_shrapnel",
        slot: "S1",
        name: "榴霰弹",
        en: "Shrapnel",
        official: {
          semantic: {
            slow_pct_signed: -30,
            activation_delay_s: 1.2
          }
        },
        mvp: {
          damage: 15,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 75,
          duration_s: 10,
          range_wu: 990.0000000000001,
          radius_wu: 261.25,
          startup_frames: 90,
          recovery_frames: 18,
          active_frames: 180,
          input: "ground",
          effect: "ground_dot",
          ticks: 50,
          tick_interval_s: 0.2,
          stun_s: 0,
          slow_pct: 30,
          slow_duration_s: 10,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            slow_pct_signed: -30,
            activation_delay_s: 1.2
          },
          charges: 3,
          charge_restore_s: 35,
          toggle: false,
          slow_linger_s: 2
        }
      },
      {
        id: "sniper_headshot",
        slot: "S2",
        name: "爆头",
        en: "Headshot",
        official: {
          semantic: {
            proc_chance_pct: 40,
            knockback_distance: 50,
            slow_pct_signed: -100
          }
        },
        mvp: {
          damage: 110,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 100,
          slow_duration_s: 0.5,
          buff_value: 0,
          knockback_wu: 27.500000000000004,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            proc_chance_pct: 40,
            knockback_distance: 50,
            slow_pct_signed: -100
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          procChance: 0.4
        }
      },
      {
        id: "sniper_take_aim",
        slot: "S3",
        name: "瞄准",
        en: "Take Aim",
        official: {
          semantic: {
            self_slow_pct: 65,
            headshot_chance_pct: 100,
            bonus_active_attack_range: 300,
            bonus_passive_attack_range: 400
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 14,
          mana: 50,
          duration_s: 3,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 120,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 3,
          buff_value: 80,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          attack_range_bonus: 165,
          self_slow: 0.65,
          officialSemantic: {
            self_slow_pct: 65,
            headshot_chance_pct: 100,
            bonus_active_attack_range: 300,
            bonus_passive_attack_range: 400
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          headshotGuaranteed: true
        }
      },
      {
        id: "sniper_assassinate",
        slot: "R",
        name: "暗杀",
        en: "Assassinate",
        official: {
          semantic: {
            projectile_speed: 2500,
            attack_damage_pct: 100
          }
        },
        mvp: {
          damage: 548,
          damage_type: "magical",
          cooldown_s: 10,
          mana: 175,
          duration_s: 0,
          range_wu: 1650.0000000000002,
          radius_wu: 18,
          startup_frames: 120,
          recovery_frames: 30,
          active_frames: 1,
          input: "aim",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 1375,
          hitstun_s: 0.12,
          officialSemantic: {
            projectile_speed: 2500,
            attack_damage_pct: 100
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      }
    ]
  },
  {
    id: "anti_mage",
    name: "敌法师",
    en: "ANTI-MAGE",
    hp: 1120,
    mana: 200,
    mana_regen: 8,
    attack: 70,
    move_speed: 275,
    attack_range: 100,
    attack_interval_s: 0.65,
    combatHp: 3136,
    combatMana: 1200,
    color: "#b78aeb",
    strength: 48.2,
    registryNumericId: 5,
    valveHeroId: 1,
    abilities: [
      {
        id: "anti_mage_mana_break",
        slot: "S1",
        name: "法力损毁",
        en: "Mana Break",
        official: {
          semantic: {
            burn_damage_pct: 65,
            burn_flat_mana: 40,
            burn_max_mana_pct: 4.5
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          mana_burn: 40,
          mana_damage_ratio: 0.65,
          officialSemantic: {
            burn_damage_pct: 65,
            burn_flat_mana: 40,
            burn_max_mana_pct: 4.5
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          mana_burn_pct: 0.045
        }
      },
      {
        id: "anti_mage_blink",
        slot: "S2",
        name: "闪烁",
        en: "Blink",
        official: {
          semantic: {
            minimum_range: 200
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 6,
          mana: 45,
          duration_s: 0,
          range_wu: 605,
          radius_wu: 0,
          startup_frames: 24,
          recovery_frames: 12,
          active_frames: 1,
          input: "direction",
          effect: "blink",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            minimum_range: 200
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "anti_mage_counterspell",
        slot: "S3",
        name: "法术反制",
        en: "Counterspell",
        official: {
          semantic: {
            passive_magic_resistance_pct: 35
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 3,
          mana: 50,
          duration_s: 1.3,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 30,
          input: "tap",
          effect: "counter",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1.3,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            passive_magic_resistance_pct: 35
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "anti_mage_mana_void",
        slot: "R",
        name: "法力虚空",
        en: "Mana Void",
        official: {
          semantic: {
            stun_s: 0.3
          }
        },
        mvp: {
          damage: 0,
          damage_type: "magical",
          cooldown_s: 70,
          mana: 200,
          duration_s: 0.3,
          range_wu: 330,
          radius_wu: 275,
          startup_frames: 18,
          recovery_frames: 24,
          active_frames: 1,
          input: "tap",
          effect: "hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0.3,
          slow_pct: 0,
          slow_duration_s: 0.3,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.35,
          missing_mana_multiplier: 1,
          officialSemantic: {
            stun_s: 0.3
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          damage_cap: 1200
        }
      }
    ]
  },
  {
    id: "phantom_assassin",
    name: "幻影刺客",
    en: "PHANTOM ASSASSIN",
    hp: 1080,
    mana: 200,
    mana_regen: 8,
    attack: 74,
    move_speed: 275,
    attack_range: 95,
    attack_interval_s: 0.65,
    combatHp: 3024,
    combatMana: 1200,
    color: "#81c4da",
    strength: 56.400000000000006,
    registryNumericId: 6,
    valveHeroId: 44,
    abilities: [
      {
        id: "phantom_assassin_dagger",
        slot: "S1",
        name: "窒碍短匕",
        en: "Stifling Dagger",
        official: {
          semantic: {
            slow_pct_signed: -50,
            projectile_speed: 1200,
            attack_damage_pct: 75
          }
        },
        mvp: {
          damage: 135.5,
          damage_type: "physical",
          cooldown_s: 6,
          mana: 30,
          duration_s: 3,
          range_wu: 632.5,
          radius_wu: 18,
          startup_frames: 18,
          recovery_frames: 15,
          active_frames: 1,
          input: "aim",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 50,
          slow_duration_s: 3,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 660,
          hitstun_s: 0.12,
          officialSemantic: {
            slow_pct_signed: -50,
            projectile_speed: 1200,
            attack_damage_pct: 75
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "phantom_assassin_strike",
        slot: "S2",
        name: "幻影突袭",
        en: "Phantom Strike",
        official: {
          semantic: {
            bonus_attack_speed: 200
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0.1,
          mana: 50,
          duration_s: 3,
          range_wu: 522.5,
          radius_wu: 0,
          startup_frames: 15,
          recovery_frames: 18,
          active_frames: 1,
          input: "tap",
          effect: "blink_strike",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 3,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          attack_interval_multiplier: 0.3333333333333333,
          buff_duration_s: 3,
          officialSemantic: {
            bonus_attack_speed: 200
          },
          charges: 2,
          charge_restore_s: 12,
          toggle: false
        }
      },
      {
        id: "phantom_assassin_immaterial",
        slot: "S3",
        name: "飘忽不定",
        en: "Immaterial",
        official: {
          semantic: {
            evasion_pct: 55
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 15,
          active_frames: 27,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          counter_type: "basic_physical",
          counter_reward_duration_s: 3,
          officialSemantic: {
            evasion_pct: 55
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          evasion: 0.55
        }
      },
      {
        id: "phantom_assassin_coup",
        slot: "R",
        name: "恩赐解脱",
        en: "Coup de Grace",
        official: {
          semantic: {
            focus_chance_on_attack_pct: 17,
            focus_chance_on_dagger_pct: 34,
            crit_total_pct: 450
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 18,
          active_frames: 240,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 10,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            focus_chance_on_attack_pct: 17,
            focus_chance_on_dagger_pct: 34,
            crit_total_pct: 450
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          critChance: 0.17,
          critMultiplier: 4.5,
          focusChance: 0.17,
          daggerFocusChance: 0.34
        }
      }
    ]
  },
  {
    id: "drow_ranger",
    name: "卓尔游侠",
    en: "DROW RANGER",
    hp: 1040,
    mana: 200,
    mana_regen: 8,
    attack: 50,
    move_speed: 245,
    attack_range: 430,
    attack_interval_s: 0.85,
    combatHp: 2912,
    combatMana: 1200,
    color: "#92b6dd",
    strength: 48.3,
    registryNumericId: 7,
    valveHeroId: 6,
    abilities: [
      {
        id: "drow_ranger_frost",
        slot: "S1",
        name: "霜冻之箭",
        en: "Frost Arrows",
        official: {
          semantic: {
            slow_pct_signed: -45
          }
        },
        mvp: {
          damage: 30,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 999,
          range_wu: 343.75,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 180,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 45,
          slow_duration_s: 1.5,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          on_attack_slow: 0.45,
          on_attack_slow_s: 1.5,
          officialSemantic: {
            slow_pct_signed: -45
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: true,
          autocast: true,
          attack_bonus: 30,
          perAttackMana: 12
        }
      },
      {
        id: "drow_ranger_gust",
        slot: "S2",
        name: "狂风",
        en: "Gust",
        official: {
          semantic: {
            projectile_speed: 2e3,
            max_knockback: 450,
            knockback_s: 0.9,
            wave_length: 900
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 13,
          mana: 55,
          duration_s: 6,
          range_wu: 495.00000000000006,
          radius_wu: 35,
          startup_frames: 15,
          recovery_frames: 18,
          active_frames: 1,
          input: "tap",
          effect: "wave",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 6,
          buff_value: 0,
          knockback_wu: 247.50000000000003,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 1100,
          hitstun_s: 0,
          silence_s: 6,
          officialSemantic: {
            projectile_speed: 2e3,
            max_knockback: 450,
            knockback_s: 0.9,
            wave_length: 900
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "drow_ranger_multishot",
        slot: "S3",
        name: "数箭齐发",
        en: "Multishot",
        official: {
          semantic: {
            wave_count: 3,
            arrows_per_wave: 4,
            projectile_speed: 1300,
            bonus_range_to_attack_range: 475,
            self_movespeed_pct: 35
          }
        },
        mvp: {
          damage: 70,
          damage_type: "physical",
          cooldown_s: 15,
          mana: 115,
          duration_s: 1.75,
          range_wu: 691.25,
          radius_wu: 49.50000000000001,
          startup_frames: 0,
          recovery_frames: 21,
          active_frames: 72,
          input: "hold",
          effect: "channel_projectile",
          ticks: 3,
          tick_interval_s: 0.5833333333333334,
          stun_s: 0,
          slow_pct: 45,
          slow_duration_s: 1.5,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 715.0000000000001,
          hitstun_s: 0.12,
          officialSemantic: {
            wave_count: 3,
            arrows_per_wave: 4,
            projectile_speed: 1300,
            bonus_range_to_attack_range: 475,
            self_movespeed_pct: 35
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "drow_ranger_marksmanship",
        slot: "R",
        name: "射手天赋",
        en: "Marksmanship",
        official: {
          semantic: {
            proc_chance_pct: 40,
            disable_within_range: 300
          }
        },
        mvp: {
          damage: 90,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 165,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          distance_threshold_wu: 165,
          officialSemantic: {
            proc_chance_pct: 40,
            disable_within_range: 300
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          procChance: 0.4,
          attack_bonus: 90
        }
      }
    ]
  },
  {
    id: "lina",
    name: "莉娜",
    en: "LINA",
    hp: 1040,
    mana: 200,
    mana_regen: 8,
    attack: 48,
    move_speed: 250,
    attack_range: 380,
    attack_interval_s: 0.85,
    combatHp: 2912,
    combatMana: 1200,
    color: "#ee936f",
    strength: 60.8,
    registryNumericId: 8,
    valveHeroId: 25,
    abilities: [
      {
        id: "lina_slave",
        slot: "S1",
        name: "龙破斩",
        en: "Dragon Slave",
        official: {
          semantic: {
            projectile_speed: 1200,
            projectile_range: 1075,
            end_width: 200
          }
        },
        mvp: {
          damage: 245,
          damage_type: "magical",
          cooldown_s: 8,
          mana: 120,
          duration_s: 0,
          range_wu: 591.25,
          radius_wu: 35,
          startup_frames: 21,
          recovery_frames: 18,
          active_frames: 1,
          input: "aim",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 660,
          hitstun_s: 0.12,
          officialSemantic: {
            projectile_speed: 1200,
            projectile_range: 1075,
            end_width: 200
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "lina_array",
        slot: "S2",
        name: "光击阵",
        en: "Light Strike Array",
        official: {
          semantic: {
            delay_s: 0.5,
            stun_s: 2.4
          }
        },
        mvp: {
          damage: 215,
          damage_type: "magical",
          cooldown_s: 7,
          mana: 130,
          duration_s: 2.4,
          range_wu: 385.00000000000006,
          radius_wu: 137.5,
          startup_frames: 57,
          recovery_frames: 21,
          active_frames: 1,
          input: "ground",
          effect: "ground",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 2.4,
          slow_pct: 0,
          slow_duration_s: 2.4,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "ground",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.7,
          officialSemantic: {
            delay_s: 0.5,
            stun_s: 2.4
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "lina_fiery",
        slot: "S3",
        name: "炽魂",
        en: "Fiery Soul",
        official: {
          semantic: {
            attack_speed_per_stack: 28,
            movespeed_pct_per_stack: 2.5,
            max_stacks: 7
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 16,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          max_stacks: 7,
          stack_duration_s: 16,
          officialSemantic: {
            attack_speed_per_stack: 28,
            movespeed_pct_per_stack: 2.5,
            max_stacks: 7
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "lina_laguna",
        slot: "R",
        name: "神灭斩",
        en: "Laguna Blade",
        official: {
          semantic: {
            damage_delay_s: 0.25
          }
        },
        mvp: {
          damage: 760,
          damage_type: "magical",
          cooldown_s: 50,
          mana: 450,
          duration_s: 0,
          range_wu: 412.50000000000006,
          radius_wu: 0,
          startup_frames: 33,
          recovery_frames: 27,
          active_frames: 1,
          input: "tap",
          effect: "hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            damage_delay_s: 0.25
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      }
    ]
  },
  {
    id: "lion",
    name: "莱恩",
    en: "LION",
    hp: 1050,
    mana: 200,
    mana_regen: 8,
    attack: 46,
    move_speed: 235,
    attack_range: 370,
    attack_interval_s: 0.85,
    combatHp: 2940,
    combatMana: 1200,
    color: "#c28e69",
    strength: 58.8,
    registryNumericId: 9,
    valveHeroId: 26,
    abilities: [
      {
        id: "lion_spike",
        slot: "S1",
        name: "裂地尖刺",
        en: "Earth Spike",
        official: {
          semantic: {
            stun_s: 2.2,
            projectile_speed: 2800,
            additional_range: 275
          }
        },
        mvp: {
          damage: 300,
          damage_type: "magical",
          cooldown_s: 11,
          mana: 150,
          duration_s: 2.2,
          range_wu: 357.50000000000006,
          radius_wu: 77,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 1,
          input: "tap",
          effect: "wave",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 2.2,
          slow_pct: 0,
          slow_duration_s: 2.2,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "ground",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 1540.0000000000002,
          hitstun_s: 0.65,
          officialSemantic: {
            stun_s: 2.2,
            projectile_speed: 2800,
            additional_range: 275
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "lion_hex",
        slot: "S2",
        name: "妖术",
        en: "Hex",
        official: {
          semantic: {
            hex_movespeed: 120
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 12,
          mana: 200,
          duration_s: 3.2,
          range_wu: 357.50000000000006,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 18,
          active_frames: 42,
          input: "tap",
          effect: "hex",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 3.2,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.7,
          officialSemantic: {
            hex_movespeed: 120
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "lion_drain",
        slot: "S3",
        name: "法力吸取",
        en: "Mana Drain",
        official: {
          semantic: {
            mana_per_second: 120,
            break_distance: 1100,
            tick_interval_s: 0.1,
            slow_pct: 30,
            extra_slow_if_empty_pct: 15
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 6,
          mana: 0,
          duration_s: 5,
          range_wu: 467.50000000000006,
          radius_wu: 0,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 90,
          input: "hold",
          effect: "drain",
          ticks: 50,
          tick_interval_s: 0.1,
          stun_s: 0,
          slow_pct: 30,
          slow_duration_s: 5,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          mana_drain_per_tick: 12,
          break_range_wu: 605,
          officialSemantic: {
            mana_per_second: 120,
            break_distance: 1100,
            tick_interval_s: 0.1,
            slow_pct: 30,
            extra_slow_if_empty_pct: 15
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "lion_finger",
        slot: "R",
        name: "死亡之指",
        en: "Finger of Death",
        official: {
          semantic: {
            bonus_damage_per_kill: 25,
            damage_delay_s: 0.25,
            punch_bonus_movespeed: 30,
            punch_attack_range: 250,
            punch_bonus_damage: 40
          }
        },
        mvp: {
          damage: 850,
          damage_type: "magical",
          cooldown_s: 30,
          mana: 600,
          duration_s: 20,
          range_wu: 495.00000000000006,
          radius_wu: 0,
          startup_frames: 33,
          recovery_frames: 27,
          active_frames: 1,
          input: "tap",
          effect: "hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 20,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            bonus_damage_per_kill: 25,
            damage_delay_s: 0.25,
            punch_bonus_movespeed: 30,
            punch_attack_range: 250,
            punch_bonus_damage: 40
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      }
    ]
  },
  {
    id: "earthshaker",
    name: "撼地者",
    en: "EARTHSHAKER",
    hp: 1320,
    mana: 200,
    mana_regen: 8,
    attack: 84,
    move_speed: 235,
    attack_range: 110,
    attack_interval_s: 0.65,
    combatHp: 3696,
    combatMana: 1200,
    color: "#d6a46d",
    strength: 84.9,
    registryNumericId: 10,
    valveHeroId: 7,
    abilities: [
      {
        id: "earthshaker_fissure",
        slot: "S1",
        name: "沟壑",
        en: "Fissure",
        official: {
          semantic: {
            stun_s: 1.6
          }
        },
        mvp: {
          damage: 280,
          damage_type: "magical",
          cooldown_s: 15,
          mana: 130,
          duration_s: 8,
          range_wu: 880.0000000000001,
          radius_wu: 123.75000000000001,
          startup_frames: 41,
          recovery_frames: 24,
          active_frames: 90,
          input: "ground",
          effect: "wall",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 1.6,
          slow_pct: 0,
          slow_duration_s: 8,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "ground",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.5,
          wall_width_wu: 30,
          wall_height_wu: 55,
          officialSemantic: {
            stun_s: 1.6
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "earthshaker_totem",
        slot: "S2",
        name: "强化图腾",
        en: "Enchant Totem",
        official: {
          semantic: {
            bonus_attack_range: 100
          }
        },
        mvp: {
          damage: 400,
          damage_type: "physical",
          cooldown_s: 5,
          mana: 75,
          duration_s: 14,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 30,
          recovery_frames: 18,
          active_frames: 180,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 14,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            bonus_attack_range: 100
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          next_attack_override: 420,
          next_attack_range_bonus: 55.00000000000001
        }
      },
      {
        id: "earthshaker_aftershock",
        slot: "S3",
        name: "余震",
        en: "Aftershock",
        official: {
          semantic: {}
        },
        mvp: {
          damage: 140,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 192.50000000000003,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 1.3,
          slow_pct: 0,
          slow_duration_s: 1.3,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {},
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "earthshaker_echo",
        slot: "R",
        name: "回音击",
        en: "Echo Slam",
        official: {
          semantic: {
            echo_damage: 110,
            echo_radius: 700
          }
        },
        mvp: {
          damage: 400,
          damage_type: "magical",
          cooldown_s: 110,
          mana: 250,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 385.00000000000006,
          startup_frames: 0,
          recovery_frames: 30,
          active_frames: 1,
          input: "tap",
          effect: "aura_hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.85,
          officialSemantic: {
            echo_damage: 110,
            echo_radius: 700
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      }
    ]
  },
  {
    id: "mirana",
    name: "米拉娜",
    en: "MIRANA",
    hp: 1100,
    mana: 200,
    mana_regen: 8,
    attack: 50,
    move_speed: 265,
    attack_range: 410,
    attack_interval_s: 0.85,
    combatHp: 3080,
    combatMana: 1200,
    color: "#b6c9ef",
    strength: 57.400000000000006,
    registryNumericId: 11,
    valveHeroId: 9,
    abilities: [
      {
        id: "mirana_starstorm",
        slot: "S1",
        name: "群星风暴",
        en: "Starstorm",
        official: {
          semantic: {
            secondary_hit_damage_pct: 80,
            secondary_hit_targets: 1
          }
        },
        mvp: {
          damage: 300,
          damage_type: "magical",
          cooldown_s: 12,
          mana: 110,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 371.25000000000006,
          startup_frames: 24,
          recovery_frames: 18,
          active_frames: 21,
          input: "tap",
          effect: "multi",
          ticks: 2,
          tick_interval_s: 0.5,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          hit_damages: [
            300,
            240
          ],
          tick_offsets_s: [
            0,
            0.5
          ],
          officialSemantic: {
            secondary_hit_damage_pct: 80,
            secondary_hit_targets: 1
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "mirana_arrow",
        slot: "S2",
        name: "月神之箭",
        en: "Sacred Arrow",
        official: {
          semantic: {
            projectile_speed: 900,
            max_stun_s: 5,
            min_stun_s: 0.01,
            max_stun_distance: 1500,
            max_bonus_damage: 180
          }
        },
        mvp: {
          damage: 360,
          damage_type: "magical",
          cooldown_s: 16,
          mana: 90,
          duration_s: 5,
          range_wu: 1650.0000000000002,
          radius_wu: 35,
          startup_frames: 30,
          recovery_frames: 21,
          active_frames: 1,
          input: "aim",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0.01,
          slow_pct: 0,
          slow_duration_s: 5,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 495.00000000000006,
          hitstun_s: 0.45,
          stun_cap_s: 5,
          officialSemantic: {
            projectile_speed: 900,
            max_stun_s: 5,
            min_stun_s: 0.01,
            max_stun_distance: 1500,
            max_bonus_damage: 180
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          distance_damage_per_100: 21.818181818181813,
          damage_cap: 540,
          arrowStunRate: 0.00606060606060606
        }
      },
      {
        id: "mirana_leap",
        slot: "S3",
        name: "跳跃",
        en: "Leap",
        official: {
          semantic: {
            leap_distance: 650,
            leap_speed: 1300,
            bonus_movespeed_pct: 24,
            bonus_attack_speed: 100
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 50,
          duration_s: 5,
          range_wu: 357.50000000000006,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 33,
          input: "direction",
          effect: "leap",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 5,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            leap_distance: 650,
            leap_speed: 1300,
            bonus_movespeed_pct: 24,
            bonus_attack_speed: 100
          },
          charges: 2,
          charge_restore_s: 15,
          toggle: false,
          travelDuration: 0.5,
          move_multiplier: 1.24,
          attack_interval_multiplier: 0.5
        }
      },
      {
        id: "mirana_moonlight",
        slot: "R",
        name: "月之暗面",
        en: "Moonlight Shadow",
        official: {
          semantic: {
            fade_s: 1.5,
            bonus_movespeed_pct: 15,
            bonus_outgoing_damage_pct: 15
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 100,
          mana: 125,
          duration_s: 18,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 30,
          recovery_frames: 18,
          active_frames: 180,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 18,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          move_multiplier: 1.15,
          officialSemantic: {
            fade_s: 1.5,
            bonus_movespeed_pct: 15,
            bonus_outgoing_damage_pct: 15
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          outgoingMultiplier: 1.15
        }
      }
    ]
  },
  {
    id: "sven",
    name: "斯温",
    en: "SVEN",
    hp: 1300,
    mana: 200,
    mana_regen: 8,
    attack: 86,
    move_speed: 240,
    attack_range: 115,
    attack_interval_s: 0.65,
    combatHp: 3640,
    combatMana: 1200,
    color: "#99aabe",
    strength: 83.5,
    registryNumericId: 12,
    valveHeroId: 18,
    abilities: [
      {
        id: "sven_hammer",
        slot: "S1",
        name: "风暴之拳",
        en: "Storm Hammer",
        official: {
          semantic: {
            projectile_speed: 1e3,
            stun_s: 1.75
          }
        },
        mvp: {
          damage: 320,
          damage_type: "magical",
          cooldown_s: 12,
          mana: 110,
          duration_s: 1.75,
          range_wu: 330,
          radius_wu: 35,
          startup_frames: 12,
          recovery_frames: 21,
          active_frames: 1,
          input: "aim",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 1.75,
          slow_pct: 0,
          slow_duration_s: 1.75,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 550,
          hitstun_s: 0.65,
          officialSemantic: {
            projectile_speed: 1e3,
            stun_s: 1.75
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "sven_cleave",
        slot: "S2",
        name: "巨力挥舞",
        en: "Great Cleave",
        official: {
          semantic: {}
        },
        mvp: {
          damage: 90,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 385.00000000000006,
          startup_frames: 0,
          recovery_frames: 24,
          active_frames: 1,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {},
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "sven_warcry",
        slot: "S3",
        name: "战吼",
        en: "Warcry",
        official: {
          semantic: {
            bonus_movespeed_pct: 15,
            bonus_armor: 14
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 24,
          mana: 45,
          duration_s: 8,
          range_wu: 0,
          radius_wu: 385.00000000000006,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 180,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 8,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          move_multiplier: 1.15,
          officialSemantic: {
            bonus_movespeed_pct: 15,
            bonus_armor: 14
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          physical_reduction: 0.4565217391304348
        }
      },
      {
        id: "sven_strength",
        slot: "R",
        name: "神之力量",
        en: "God's Strength",
        official: {
          semantic: {
            slow_resistance_pct: 40
          }
        },
        mvp: {
          damage: 190,
          damage_type: "physical",
          cooldown_s: 100,
          mana: 150,
          duration_s: 30,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 18,
          recovery_frames: 24,
          active_frames: 240,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 30,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          cleave_bonus: 40,
          slow_resistance: 0.4,
          officialSemantic: {
            slow_resistance_pct: 40
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          attack_bonus: 163.4
        }
      }
    ]
  },
  {
    id: "zeus",
    name: "宙斯",
    en: "ZEUS",
    hp: 1e3,
    mana: 200,
    mana_regen: 8,
    attack: 44,
    move_speed: 240,
    attack_range: 380,
    attack_interval_s: 0.85,
    combatHp: 2800,
    combatMana: 1200,
    color: "#95bff5",
    strength: 56.7,
    registryNumericId: 13,
    valveHeroId: 22,
    abilities: [
      {
        id: "zeus_arc",
        slot: "S1",
        name: "弧形闪电",
        en: "Arc Lightning",
        official: {
          semantic: {
            max_jumps: 11,
            jump_delay_s: 0.25
          }
        },
        mvp: {
          damage: 180,
          damage_type: "magical",
          cooldown_s: 1.6,
          mana: 100,
          duration_s: 0,
          range_wu: 440.00000000000006,
          radius_wu: 247.50000000000003,
          startup_frames: 12,
          recovery_frames: 15,
          active_frames: 1,
          input: "tap",
          effect: "hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            max_jumps: 11,
            jump_delay_s: 0.25
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "zeus_bolt",
        slot: "S2",
        name: "雷击",
        en: "Lightning Bolt",
        official: {
          semantic: {
            stun_s: 0.35
          }
        },
        mvp: {
          damage: 380,
          damage_type: "magical",
          cooldown_s: 6,
          mana: 135,
          duration_s: 0.35,
          range_wu: 467.50000000000006,
          radius_wu: 178.75000000000003,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 1,
          input: "ground",
          effect: "ground",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0.35,
          slow_pct: 0,
          slow_duration_s: 0.35,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.35,
          officialSemantic: {
            stun_s: 0.35
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "zeus_jump",
        slot: "S3",
        name: "神圣一跳",
        en: "Heavenly Jump",
        official: {
          semantic: {
            jump_distance: 600,
            jump_s: 0.5,
            jump_height: 250,
            slow_pct: 80,
            attack_speed_slow: 100
          }
        },
        mvp: {
          damage: 100,
          damage_type: "magical",
          cooldown_s: 14,
          mana: 80,
          duration_s: 1.4,
          range_wu: 330,
          radius_wu: 550,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 30,
          input: "direction",
          effect: "leap_hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 80,
          slow_duration_s: 1.4,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            jump_distance: 600,
            jump_s: 0.5,
            jump_height: 250,
            slow_pct: 80,
            attack_speed_slow: 100
          },
          charges: 0,
          charge_restore_s: 14,
          toggle: false,
          travelDuration: 0.5
        }
      },
      {
        id: "zeus_wrath",
        slot: "R",
        name: "雷神之怒",
        en: "Thundergod's Wrath",
        official: {
          semantic: {}
        },
        mvp: {
          damage: 575,
          damage_type: "magical",
          cooldown_s: 130,
          mana: 500,
          duration_s: 0,
          range_wu: 1400,
          radius_wu: 0,
          startup_frames: 24,
          recovery_frames: 24,
          active_frames: 1,
          input: "tap",
          effect: "hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {},
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      }
    ]
  },
  {
    id: "windranger",
    name: "风行者",
    en: "WINDRANGER",
    hp: 1080,
    mana: 200,
    mana_regen: 8,
    attack: 49,
    move_speed: 270,
    attack_range: 420,
    attack_interval_s: 0.85,
    combatHp: 3024,
    combatMana: 1200,
    color: "#b2cc8b",
    strength: 62.2,
    registryNumericId: 14,
    valveHeroId: 21,
    abilities: [
      {
        id: "windranger_shackle",
        slot: "S1",
        name: "束缚击",
        en: "Shackleshot",
        official: {
          semantic: {
            fail_stun_s: 0.6,
            success_stun_s: 3.25,
            projectile_speed: 1650
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 10,
          mana: 100,
          duration_s: 3.25,
          range_wu: 440.00000000000006,
          radius_wu: 35,
          startup_frames: 9,
          recovery_frames: 18,
          active_frames: 1,
          input: "aim",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0.6,
          slow_pct: 0,
          slow_duration_s: 3.25,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 907.5000000000001,
          hitstun_s: 0.35,
          wall_bind_distance_wu: 100,
          wall_bind_stun_s: 3.25,
          officialSemantic: {
            fail_stun_s: 0.6,
            success_stun_s: 3.25,
            projectile_speed: 1650
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "windranger_powershot",
        slot: "S2",
        name: "强力击",
        en: "Powershot",
        official: {
          semantic: {
            slow_pct: 40,
            projectile_speed: 3e3,
            loss_per_hit_pct: 15
          }
        },
        mvp: {
          damage: 0,
          damage_type: "magical",
          cooldown_s: 9,
          mana: 120,
          duration_s: 3,
          range_wu: 1650.0000000000002,
          radius_wu: 35,
          startup_frames: 0,
          recovery_frames: 24,
          active_frames: 48,
          input: "charge",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 40,
          slow_duration_s: 3,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 1650.0000000000002,
          hitstun_s: 0.12,
          officialSemantic: {
            slow_pct: 40,
            projectile_speed: 3e3,
            loss_per_hit_pct: 15
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          charge_damage_per_s: 470,
          charge_max_s: 1
        }
      },
      {
        id: "windranger_windrun",
        slot: "S3",
        name: "风行",
        en: "Windrun",
        official: {
          semantic: {
            movespeed_bonus_pct: 50,
            evasion_pct: 100
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 11,
          mana: 50,
          duration_s: 6,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 18,
          recovery_frames: 12,
          active_frames: 90,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 6,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          move_multiplier: 1.5,
          basic_attack_evasion: 1,
          officialSemantic: {
            movespeed_bonus_pct: 50,
            evasion_pct: 100
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "windranger_focus",
        slot: "R",
        name: "集中火力",
        en: "Focus Fire",
        official: {
          semantic: {
            bonus_attack_speed: 500,
            damage_reduction_pct_signed: -25
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 30,
          mana: 125,
          duration_s: 20,
          range_wu: 330,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 18,
          active_frames: 180,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 20,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          move_attack: true,
          officialSemantic: {
            bonus_attack_speed: 500,
            damage_reduction_pct_signed: -25
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          attack_interval_override_s: 0.14166666666666666,
          attack_damage_override: 36.75
        }
      }
    ]
  },
  {
    id: "shadow_fiend",
    name: "影魔",
    en: "SHADOW FIEND",
    hp: 1100,
    mana: 200,
    mana_regen: 8,
    attack: 52,
    move_speed: 250,
    attack_range: 390,
    attack_interval_s: 0.85,
    combatHp: 3080,
    combatMana: 1200,
    color: "#dc7668",
    strength: 64.9,
    registryNumericId: 15,
    valveHeroId: 11,
    abilities: [
      {
        id: "shadow_fiend_raze",
        slot: "S1",
        name: "毁灭阴影",
        en: "Shadowraze",
        official: {
          semantic: {
            damage_per_soul: 2,
            bonus_damage_per_stack: 80,
            fixed_center_distance: 200,
            per_raze_cooldown: 3
          }
        },
        mvp: {
          damage: 280,
          damage_type: "magical",
          cooldown_s: 9,
          mana: 75,
          duration_s: 6,
          range_wu: 0,
          radius_wu: 137.5,
          startup_frames: 33,
          recovery_frames: 21,
          active_frames: 1,
          input: "raze",
          effect: "ground",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 6,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "ground",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          raze_distances: [
            110.00000000000001,
            247.50000000000003,
            385.00000000000006
          ],
          stack_damage: 80,
          max_stacks: 20,
          stack_duration_s: 6,
          officialSemantic: {
            damage_per_soul: 2,
            bonus_damage_per_stack: 80,
            fixed_center_distance: 200,
            per_raze_cooldown: 3
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "shadow_fiend_feast",
        slot: "S2",
        name: "灵魂盛宴",
        en: "Feast of Souls",
        official: {
          semantic: {
            bonus_attack_speed: 80,
            bonus_movespeed_pct: 10,
            souls_per_hero: 3,
            collection_interval_s: 0.5,
            soul_linger_s: 8
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 21,
          mana: 75,
          duration_s: 8,
          range_wu: 0,
          radius_wu: 330,
          startup_frames: 0,
          recovery_frames: 15,
          active_frames: 180,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 8,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          attack_interval_multiplier: 0.5555555555555556,
          move_multiplier: 1.1,
          officialSemantic: {
            bonus_attack_speed: 80,
            bonus_movespeed_pct: 10,
            souls_per_hero: 3,
            collection_interval_s: 0.5,
            soul_linger_s: 8
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          souls: 3
        }
      },
      {
        id: "shadow_fiend_presence",
        slot: "S3",
        name: "魔王降临",
        en: "Presence of the Dark Lord",
        official: {
          semantic: {
            armor_change: -7
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 660,
          radius_wu: 660,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            armor_change: -7
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "shadow_fiend_requiem",
        slot: "R",
        name: "魂之挽歌",
        en: "Requiem of Souls",
        official: {
          semantic: {
            slow_pct_signed: -30,
            magic_resistance_change_pct: -15,
            fear_per_line_s: 0.6,
            max_lines: 20,
            projectile_speed: 700
          }
        },
        mvp: {
          damage: 160,
          damage_type: "magical",
          cooldown_s: 100,
          mana: 200,
          duration_s: 2.15,
          range_wu: 0,
          radius_wu: 550,
          startup_frames: 100,
          recovery_frames: 30,
          active_frames: 1,
          input: "tap",
          effect: "aura_hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0.6,
          slow_pct: 30,
          slow_duration_s: 2.15,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 385.00000000000006,
          hitstun_s: 0.75,
          control: "fear",
          officialSemantic: {
            slow_pct_signed: -30,
            magic_resistance_change_pct: -15,
            fear_per_line_s: 0.6,
            max_lines: 20,
            projectile_speed: 700
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          soulLines: true
        }
      }
    ]
  },
  {
    id: "storm_spirit",
    name: "风暴之灵",
    en: "STORM SPIRIT",
    hp: 1080,
    mana: 200,
    mana_regen: 8,
    attack: 47,
    move_speed: 260,
    attack_range: 370,
    attack_interval_s: 0.85,
    combatHp: 3024,
    combatMana: 1200,
    color: "#75bce0",
    strength: 55,
    registryNumericId: 16,
    valveHeroId: 17,
    abilities: [
      {
        id: "storm_spirit_remnant",
        slot: "S1",
        name: "残影",
        en: "Static Remnant",
        official: {
          semantic: {
            activation_delay_s: 0.75,
            trigger_radius: 235,
            remnant_speed: 300
          }
        },
        mvp: {
          damage: 280,
          damage_type: "magical",
          cooldown_s: 3.5,
          mana: 100,
          duration_s: 12,
          range_wu: 440.00000000000006,
          radius_wu: 165,
          startup_frames: 0,
          recovery_frames: 15,
          active_frames: 180,
          input: "ground",
          effect: "trap",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 12,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "ground",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          arming_s: 0.75,
          officialSemantic: {
            activation_delay_s: 0.75,
            trigger_radius: 235,
            remnant_speed: 300
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          walkSpeed: 165,
          triggerRadius: 129.25
        }
      },
      {
        id: "storm_spirit_vortex",
        slot: "S2",
        name: "电子涡流",
        en: "Electric Vortex",
        official: {
          semantic: {
            pull_distance: 300,
            break_distance: 1200,
            self_slow_pct_signed: -50,
            self_slow_s: 3
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 14,
          mana: 90,
          duration_s: 2,
          range_wu: 165,
          radius_wu: 0,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 33,
          input: "tap",
          effect: "pull",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 2,
          slow_pct: 0,
          slow_duration_s: 2,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.55,
          pull_to_distance: 70,
          officialSemantic: {
            pull_distance: 300,
            break_distance: 1200,
            self_slow_pct_signed: -50,
            self_slow_s: 3
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "storm_spirit_overload",
        slot: "S3",
        name: "超负荷",
        en: "Overload",
        official: {
          semantic: {
            slow_pct_signed: -80,
            attack_speed_slow_signed: -90
          }
        },
        mvp: {
          damage: 100,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 0,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 165,
          startup_frames: 0,
          recovery_frames: 0,
          active_frames: 0,
          input: "passive",
          effect: "passive",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 80,
          slow_duration_s: 0.8,
          buff_value: 0,
          knockback_wu: 0,
          passive: true,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: false,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          next_attack_bonus_type: "magical",
          officialSemantic: {
            slow_pct_signed: -80,
            attack_speed_slow_signed: -90
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "storm_spirit_ball",
        slot: "R",
        name: "球状闪电",
        en: "Ball Lightning",
        official: {
          semantic: {
            mana_activation_base: 25,
            mana_activation_max_pct: 7.5,
            mana_per_100_base: 10,
            mana_per_100_max_pct: 0.65,
            travel_speed: 2300
          }
        },
        mvp: {
          damage: 91.63636363636363,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 231.5090909090909,
          duration_s: 0.2845849802371542,
          range_wu: 360,
          radius_wu: 110.00000000000001,
          startup_frames: 18,
          recovery_frames: 24,
          active_frames: 24,
          input: "direction",
          effect: "dash_hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          invulnerable_active: true,
          officialSemantic: {
            mana_activation_base: 25,
            mana_activation_max_pct: 7.5,
            mana_per_100_base: 10,
            mana_per_100_max_pct: 0.65,
            travel_speed: 2300
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      }
    ]
  },
  {
    id: "queen_of_pain",
    name: "痛苦女王",
    en: "QUEEN OF PAIN",
    hp: 1080,
    mana: 200,
    mana_regen: 8,
    attack: 47,
    move_speed: 270,
    attack_range: 380,
    attack_interval_s: 0.85,
    combatHp: 3024,
    combatMana: 1200,
    color: "#c997c9",
    strength: 60.8,
    registryNumericId: 17,
    valveHeroId: 39,
    abilities: [
      {
        id: "queen_of_pain_shadow_strike",
        slot: "S1",
        name: "暗影突袭",
        en: "Shadow Strike",
        official: {
          semantic: {
            periodic_damage: 80,
            tick_interval_s: 3,
            slow_pct_signed: -55,
            projectile_speed: 900
          }
        },
        mvp: {
          damage: 140,
          damage_type: "magical",
          cooldown_s: 5,
          mana: 115,
          duration_s: 16,
          range_wu: 330,
          radius_wu: 18,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 180,
          input: "aim",
          effect: "projectile_dot",
          ticks: 6,
          tick_interval_s: 3,
          stun_s: 0,
          slow_pct: 55,
          slow_duration_s: 16,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 495.00000000000006,
          hitstun_s: 0.12,
          dot_damage: 80,
          initial_damage: 55,
          dot_ticks: 5,
          tick_offsets_s: [
            0,
            0.5,
            1,
            1.5,
            2,
            2.5,
            3
          ],
          officialSemantic: {
            periodic_damage: 80,
            tick_interval_s: 3,
            slow_pct_signed: -55,
            projectile_speed: 900
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          dispelTier: "basic"
        }
      },
      {
        id: "queen_of_pain_blink",
        slot: "S2",
        name: "闪烁",
        en: "Blink",
        official: {
          semantic: {
            minimum_range: 200
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 6,
          mana: 65,
          duration_s: 0,
          range_wu: 715.0000000000001,
          radius_wu: 0,
          startup_frames: 20,
          recovery_frames: 12,
          active_frames: 1,
          input: "direction",
          effect: "blink",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            minimum_range: 200
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "queen_of_pain_scream",
        slot: "S3",
        name: "痛苦尖叫",
        en: "Scream Of Pain",
        official: {
          semantic: {
            self_reflection_pct: 25,
            projectile_speed: 900
          }
        },
        mvp: {
          damage: 345,
          damage_type: "magical",
          cooldown_s: 6,
          mana: 120,
          duration_s: 0,
          range_wu: 0,
          radius_wu: 330,
          startup_frames: 0,
          recovery_frames: 18,
          active_frames: 1,
          input: "tap",
          effect: "aura_hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 495.00000000000006,
          hitstun_s: 0.12,
          officialSemantic: {
            self_reflection_pct: 25,
            projectile_speed: 900
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          selfReflection: 0.25
        }
      },
      {
        id: "queen_of_pain_sonic",
        slot: "R",
        name: "超声冲击波",
        en: "Sonic Wave",
        official: {
          semantic: {
            projectile_speed: 900,
            projectile_range: 900,
            knockback_distance: 350,
            damage_tick_s: 0.1
          }
        },
        mvp: {
          damage: 625,
          damage_type: "pure",
          cooldown_s: 80,
          mana: 550,
          duration_s: 1.4,
          range_wu: 495.00000000000006,
          radius_wu: 50,
          startup_frames: 27,
          recovery_frames: 27,
          active_frames: 1,
          input: "aim",
          effect: "wave",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1.4,
          buff_value: 0,
          knockback_wu: 192.50000000000003,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 495.00000000000006,
          hitstun_s: 0.12,
          officialSemantic: {
            projectile_speed: 900,
            projectile_range: 900,
            knockback_distance: 350,
            damage_tick_s: 0.1
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          damageOverTime: 1.4
        }
      }
    ]
  },
  {
    id: "witch_doctor",
    name: "巫医",
    en: "WITCH DOCTOR",
    hp: 1120,
    mana: 200,
    mana_regen: 8,
    attack: 46,
    move_speed: 235,
    attack_range: 370,
    attack_interval_s: 0.85,
    combatHp: 3136,
    combatMana: 1200,
    color: "#c4a0d6",
    strength: 55.7,
    registryNumericId: 18,
    valveHeroId: 30,
    abilities: [
      {
        id: "witch_doctor_cask",
        slot: "S1",
        name: "麻痹药剂",
        en: "Paralyzing Cask",
        official: {
          semantic: {
            stun_s: 0.8,
            max_bounces: 6,
            bonus_damage_per_bounce: 20,
            projectile_speed: 1200,
            bounce_delay_s: 0.1
          }
        },
        mvp: {
          damage: 100,
          damage_type: "magical",
          cooldown_s: 14,
          mana: 140,
          duration_s: 0.8,
          range_wu: 330,
          radius_wu: 35,
          startup_frames: 12,
          recovery_frames: 18,
          active_frames: 1,
          input: "aim",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0.8,
          slow_pct: 0,
          slow_duration_s: 0.8,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 660,
          hitstun_s: 0.55,
          officialSemantic: {
            stun_s: 0.8,
            max_bounces: 6,
            bonus_damage_per_bounce: 20,
            projectile_speed: 1200,
            bounce_delay_s: 0.1
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "witch_doctor_restoration",
        slot: "S2",
        name: "巫毒疗法",
        en: "Voodoo Restoration",
        official: {
          semantic: {
            mana_per_second: 18,
            heal_per_second: 50,
            heal_tick_s: 0.33
          }
        },
        mvp: {
          damage: 0,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 25,
          duration_s: 999,
          range_wu: 0,
          radius_wu: 357.50000000000006,
          startup_frames: 0,
          recovery_frames: 18,
          active_frames: 180,
          input: "tap",
          effect: "heal",
          ticks: 3027.272727272727,
          tick_interval_s: 0.33,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 1,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          officialSemantic: {
            mana_per_second: 18,
            heal_per_second: 50,
            heal_tick_s: 0.33
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: true,
          heal_total: 49950,
          mana_per_second: 18
        }
      },
      {
        id: "witch_doctor_maledict",
        slot: "S3",
        name: "巫蛊咒术",
        en: "Maledict",
        official: {
          semantic: {
            burst_health_lost_pct: 40,
            burst_count: 3
          }
        },
        mvp: {
          damage: 6,
          damage_type: "magical",
          cooldown_s: 18,
          mana: 120,
          duration_s: 12,
          range_wu: 330,
          radius_wu: 110.00000000000001,
          startup_frames: 21,
          recovery_frames: 18,
          active_frames: 180,
          input: "ground",
          effect: "curse",
          ticks: 60,
          tick_interval_s: 0.2,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 12,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            burst_health_lost_pct: 40,
            burst_count: 3
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          lost_hp_multiplier: 0.4,
          burst_cap: 99999,
          burstInterval: 4,
          dispelTier: "none"
        }
      },
      {
        id: "witch_doctor_death_ward",
        slot: "R",
        name: "死亡守卫",
        en: "Death Ward",
        official: {
          semantic: {
            bonus_accuracy_pct: 50
          }
        },
        mvp: {
          damage: 120,
          damage_type: "pure",
          cooldown_s: 80,
          mana: 200,
          duration_s: 8,
          range_wu: 275,
          radius_wu: 357.50000000000006,
          startup_frames: 21,
          recovery_frames: 24,
          active_frames: 120,
          input: "hold",
          effect: "channel",
          ticks: 32,
          tick_interval_s: 0.25,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 8,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          officialSemantic: {
            bonus_accuracy_pct: 50
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          summonWard: true
        }
      }
    ]
  },
  {
    id: "tidehunter",
    name: "潮汐猎人",
    en: "TIDEHUNTER",
    hp: 1420,
    mana: 200,
    mana_regen: 8,
    attack: 82,
    move_speed: 225,
    attack_range: 110,
    attack_interval_s: 0.65,
    combatHp: 3976,
    combatMana: 1200,
    color: "#86b9ac",
    strength: 87.9,
    registryNumericId: 19,
    valveHeroId: 29,
    abilities: [
      {
        id: "tidehunter_gush",
        slot: "S1",
        name: "巨浪",
        en: "Gush",
        official: {
          semantic: {
            slow_pct_signed: -40,
            armor_reduction: 6,
            projectile_speed: 2500
          }
        },
        mvp: {
          damage: 280,
          damage_type: "magical",
          cooldown_s: 12,
          mana: 100,
          duration_s: 4.5,
          range_wu: 385.00000000000006,
          radius_wu: 18,
          startup_frames: 18,
          recovery_frames: 18,
          active_frames: 1,
          input: "aim",
          effect: "projectile",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 40,
          slow_duration_s: 4.5,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: true,
          interruptible: true,
          projectile_speed_wu_s: 1375,
          hitstun_s: 0.12,
          vulnerability_physical: 0.2647058823529412,
          vulnerability_s: 4.5,
          officialSemantic: {
            slow_pct_signed: -40,
            armor_reduction: 6,
            projectile_speed: 2500
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "tidehunter_shell",
        slot: "S2",
        name: "海妖外壳",
        en: "Kraken Shell",
        official: {
          semantic: {
            physical_attack_flat_block: 75,
            active_block_effectiveness_pct: 200,
            active_self_slow_pct: 40,
            cleanse_threshold_damage: 450,
            cleanse_counter_reset_s: 7
          }
        },
        mvp: {
          damage: 0,
          damage_type: "physical",
          cooldown_s: 30,
          mana: 45,
          duration_s: 4,
          range_wu: 0,
          radius_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          active_frames: 120,
          input: "tap",
          effect: "buff",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 4,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: false,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0,
          physical_only: true,
          self_slow: 0.4,
          cleanse: [
            "slow",
            "silence"
          ],
          officialSemantic: {
            physical_attack_flat_block: 75,
            active_block_effectiveness_pct: 200,
            active_self_slow_pct: 40,
            cleanse_threshold_damage: 450,
            cleanse_counter_reset_s: 7
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false,
          block_flat: 150,
          block_fraction_cap: 1
        }
      },
      {
        id: "tidehunter_anchor",
        slot: "S3",
        name: "锚击",
        en: "Anchor Smash",
        official: {
          semantic: {
            enemy_attack_damage_reduction_pct_signed: -40
          }
        },
        mvp: {
          damage: 282,
          damage_type: "physical",
          cooldown_s: 4,
          mana: 55,
          duration_s: 6,
          range_wu: 0,
          radius_wu: 233.75,
          startup_frames: 24,
          recovery_frames: 21,
          active_frames: 1,
          input: "tap",
          effect: "aura_hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 0,
          slow_pct: 0,
          slow_duration_s: 6,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.12,
          attack_damage_debuff: 0.4,
          debuff_duration_s: 6,
          officialSemantic: {
            enemy_attack_damage_reduction_pct_signed: -40
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      },
      {
        id: "tidehunter_ravage",
        slot: "R",
        name: "毁灭",
        en: "Ravage",
        official: {
          semantic: {
            stun_s: 2.4,
            expansion_speed: 725
          }
        },
        mvp: {
          damage: 475,
          damage_type: "magical",
          cooldown_s: 140,
          mana: 325,
          duration_s: 2.4,
          range_wu: 0,
          radius_wu: 687.5,
          startup_frames: 18,
          recovery_frames: 30,
          active_frames: 1,
          input: "tap",
          effect: "aura_hit",
          ticks: 1,
          tick_interval_s: 0,
          stun_s: 2.4,
          slow_pct: 0,
          slow_duration_s: 2.4,
          buff_value: 0,
          knockback_wu: 0,
          passive: false,
          height: "both",
          blockable: true,
          reflectable: false,
          interruptible: true,
          projectile_speed_wu_s: 0,
          hitstun_s: 0.9,
          wave_speed_wu_s: 398.75000000000006,
          officialSemantic: {
            stun_s: 2.4,
            expansion_speed: 725
          },
          charges: 0,
          charge_restore_s: 0,
          toggle: false
        }
      }
    ]
  },
  {
    id: "valve_15",
    registryNumericId: 25,
    valveHeroId: 15,
    name: "雷泽",
    en: "RAZOR",
    packKey: "core4",
    hp: 1150,
    mana_regen: 8,
    attack: 85,
    move_speed: 260,
    attack_range: 261.25,
    attack_interval_s: 0.7,
    combatHp: 3220,
    combatMana: 1200,
    color: "#74d9ff",
    abilities: [
      {
        id: "razor_plasma_field",
        valveAbilityId: 5082,
        slot: "S1",
        name: "等离子场",
        en: "Plasma Field",
        official: {
          semantic: {
            damage_min: 50,
            damage_max: 185,
            radius: 700,
            total_ability_time: 2.2,
            slow_min: 5,
            slow_max: 40,
            slow_duration: 1.5,
            AbilityManaCost: 125,
            AbilityCooldown: 10
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 10,
          mana: 125,
          range_wu: 0,
          radius_wu: 385.00000000000006,
          duration_s: 0,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            damage_min: 50,
            damage_max: 185,
            radius: 700,
            total_ability_time: 2.2,
            slow_min: 5,
            slow_max: 40,
            slow_duration: 1.5,
            AbilityManaCost: 125,
            AbilityCooldown: 10
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "razor_static_link",
        valveAbilityId: 5083,
        slot: "S2",
        name: "静电连接",
        en: "Static Link",
        official: {
          semantic: {
            drain_length: 10,
            drain_duration: 18,
            drain_rate: 24,
            drain_range_buffer: 250,
            radius: 200,
            speed: 900,
            vision_duration: 3.34,
            AbilityCastRange: 550,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 65,
            AbilityCooldown: 20
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 20,
          mana: 65,
          range_wu: 302.5,
          radius_wu: 110.00000000000001,
          duration_s: 10,
          startup_frames: 18,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            drain_length: 10,
            drain_duration: 18,
            drain_rate: 24,
            drain_range_buffer: 250,
            radius: 200,
            speed: 900,
            vision_duration: 3.34,
            AbilityCastRange: 550,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 65,
            AbilityCooldown: 20
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "razor_storm_surge",
        valveAbilityId: 1224,
        slot: "S3",
        name: "风暴涌动",
        en: "Storm Surge",
        official: {
          semantic: {
            strike_pct_chance: 20,
            strike_target_count: 3,
            strike_damage: 170,
            strike_move_slow_pct: 40,
            strike_slow_duration: 1,
            strike_search_radius: 700,
            strike_internal_cd: 2.5,
            strike_cd_reduction_during_storm: 0,
            hit_targets_inside_eye_of_the_storm: 0,
            eye_of_the_storm_chance_multiplier: 0
          }
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          radius_wu: 0,
          duration_s: 0,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            strike_pct_chance: 20,
            strike_target_count: 3,
            strike_damage: 170,
            strike_move_slow_pct: 40,
            strike_slow_duration: 1,
            strike_search_radius: 700,
            strike_internal_cd: 2.5,
            strike_cd_reduction_during_storm: 0,
            hit_targets_inside_eye_of_the_storm: 0,
            eye_of_the_storm_chance_multiplier: 0
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "razor_eye_of_the_storm",
        valveAbilityId: 5085,
        slot: "S4",
        name: "风暴之眼",
        en: "Eye of the Storm",
        official: {
          semantic: {
            radius: 500,
            duration: 30,
            strike_interval: 0.5,
            armor_reduction: 1,
            damage: 90,
            AbilityManaCost: 200,
            AbilityCooldown: 60
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 90,
          damage_type: "physical",
          cooldown_s: 60,
          mana: 200,
          range_wu: 0,
          radius_wu: 275,
          duration_s: 30,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            radius: 500,
            duration: 30,
            strike_interval: 0.5,
            armor_reduction: 1,
            damage: 90,
            AbilityManaCost: 200,
            AbilityCooldown: 60
          },
          toggle: false,
          charges: 0
        }
      }
    ]
  },
  {
    id: "valve_28",
    registryNumericId: 31,
    valveHeroId: 28,
    name: "斯拉达",
    en: "SLARDAR",
    packKey: "core4",
    hp: 1400,
    mana_regen: 8,
    attack: 105,
    move_speed: 255,
    attack_range: 100,
    attack_interval_s: 0.78,
    combatHp: 3920,
    combatMana: 1200,
    color: "#a997ff",
    abilities: [
      {
        id: "slardar_sprint",
        valveAbilityId: 5114,
        slot: "S1",
        name: "守卫冲刺",
        en: "Guardian Sprint",
        official: {
          semantic: {
            bonus_speed: 34,
            duration: 10,
            speed_burst_max_duration: 2.5,
            slow_resistance_tooltip: 100,
            AbilityManaCost: 25,
            AbilityCooldown: 18
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 18,
          mana: 25,
          range_wu: 0,
          radius_wu: 0,
          duration_s: 10,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            bonus_speed: 34,
            duration: 10,
            speed_burst_max_duration: 2.5,
            slow_resistance_tooltip: 100,
            AbilityManaCost: 25,
            AbilityCooldown: 18
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "slardar_slithereen_crush",
        valveAbilityId: 5115,
        slot: "S2",
        name: "鱼人碎击",
        en: "Slithereen Crush",
        official: {
          semantic: {
            crush_radius: 325,
            crush_extra_slow: -35,
            crush_attack_slow_tooltip: -35,
            crush_extra_slow_duration: 6,
            stun_duration: 0.8,
            puddle_duration: 7,
            puddle_radius: 325,
            crush_damage: 300,
            shard_amp_duration: 0,
            shard_bonus_radius: 0,
            AbilityCastPoint: 0.25,
            AbilityManaCost: 100,
            AbilityCooldown: 7
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 300,
          damage_type: "physical",
          cooldown_s: 7,
          mana: 100,
          range_wu: 0,
          radius_wu: 178.75000000000003,
          duration_s: 0,
          startup_frames: 15,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            crush_radius: 325,
            crush_extra_slow: -35,
            crush_attack_slow_tooltip: -35,
            crush_extra_slow_duration: 6,
            stun_duration: 0.8,
            puddle_duration: 7,
            puddle_radius: 325,
            crush_damage: 300,
            shard_amp_duration: 0,
            shard_bonus_radius: 0,
            AbilityCastPoint: 0.25,
            AbilityManaCost: 100,
            AbilityCooldown: 7
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "slardar_bash",
        valveAbilityId: 5116,
        slot: "S3",
        name: "深海重击",
        en: "Bash of the Deep",
        official: {
          semantic: {
            bonus_damage: 200,
            duration: 1,
            attack_count: 3
          }
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "physical",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          radius_wu: 0,
          duration_s: 1,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            bonus_damage: 200,
            duration: 1,
            attack_count: 3
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "slardar_amplify_damage",
        valveAbilityId: 5117,
        slot: "S4",
        name: "侵蚀雾霭",
        en: "Corrosive Haze",
        official: {
          semantic: {
            armor_reduction: -20,
            duration: 18,
            puddle_radius: 100,
            puddle_duration: 7,
            has_self_buff: 0,
            armor_pct: 0,
            AbilityCastRange: 900,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 25,
            AbilityCooldown: 5
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 5,
          mana: 25,
          range_wu: 495.00000000000006,
          radius_wu: 0,
          duration_s: 18,
          startup_frames: 18,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            armor_reduction: -20,
            duration: 18,
            puddle_radius: 100,
            puddle_duration: 7,
            has_self_buff: 0,
            armor_pct: 0,
            AbilityCastRange: 900,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 25,
            AbilityCooldown: 5
          },
          toggle: false,
          charges: 0
        }
      }
    ]
  },
  {
    id: "valve_47",
    registryNumericId: 45,
    valveHeroId: 47,
    name: "冥界亚龙",
    en: "VIPER",
    packKey: "core4",
    hp: 1150,
    mana_regen: 8,
    attack: 80,
    move_speed: 245,
    attack_range: 316.25,
    attack_interval_s: 0.72,
    combatHp: 3220,
    combatMana: 1200,
    color: "#94ef53",
    abilities: [
      {
        id: "viper_poison_attack",
        valveAbilityId: 5218,
        slot: "S1",
        name: "毒性攻击",
        en: "Poison Attack",
        official: {
          semantic: {
            duration: 4,
            damage: 16,
            movement_speed: 12,
            magic_resistance: 10,
            max_stacks: 6,
            bonus_range: 25,
            shard_armor_reduction: 0,
            shard_building_dmg_pct: 0,
            AbilityCastRange: 600,
            AbilityManaCost: 20
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 16,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 20,
          range_wu: 330,
          radius_wu: 0,
          duration_s: 4,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            duration: 4,
            damage: 16,
            movement_speed: 12,
            magic_resistance: 10,
            max_stacks: 6,
            bonus_range: 25,
            shard_armor_reduction: 0,
            shard_building_dmg_pct: 0,
            AbilityCastRange: 600,
            AbilityManaCost: 20
          },
          toggle: true,
          charges: 0
        }
      },
      {
        id: "viper_nethertoxin",
        valveAbilityId: 5219,
        slot: "S2",
        name: "幽冥剧毒",
        en: "Nethertoxin",
        official: {
          semantic: {
            min_damage: 45,
            max_damage: 125,
            max_duration: 4,
            radius: 400,
            attack_slow: 60,
            duration: 8,
            projectile_speed: 2400,
            AbilityCastRange: 900,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 70,
            AbilityCooldown: 14
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 14,
          mana: 70,
          range_wu: 495.00000000000006,
          radius_wu: 220.00000000000003,
          duration_s: 8,
          startup_frames: 12,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            min_damage: 45,
            max_damage: 125,
            max_duration: 4,
            radius: 400,
            attack_slow: 60,
            duration: 8,
            projectile_speed: 2400,
            AbilityCastRange: 900,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 70,
            AbilityCooldown: 14
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "viper_corrosive_skin",
        valveAbilityId: 5220,
        slot: "S3",
        name: "腐蚀皮肤",
        en: "Corrosive Skin",
        official: {
          semantic: {
            duration: 4,
            bonus_attack_speed: 36,
            bonus_magic_resistance: 25,
            damage: 25,
            max_range: 1200,
            effect_multiplier_distance: 0,
            effect_multiplier: 0,
            nethertoxin_bonus_pct: 0,
            nethertoxin_bonus_pct_max_duration_tooltip: 0
          }
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          damage: 25,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          radius_wu: 0,
          duration_s: 4,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            duration: 4,
            bonus_attack_speed: 36,
            bonus_magic_resistance: 25,
            damage: 25,
            max_range: 1200,
            effect_multiplier_distance: 0,
            effect_multiplier: 0,
            nethertoxin_bonus_pct: 0,
            nethertoxin_bonus_pct_max_duration_tooltip: 0
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "viper_viper_strike",
        valveAbilityId: 5221,
        slot: "S4",
        name: "蝮蛇突袭",
        en: "Viper Strike",
        official: {
          semantic: {
            duration: 6,
            damage: 150,
            bonus_movement_speed: 80,
            bonus_attack_speed: 180,
            projectile_speed: 1500,
            max_charges: 2,
            charge_restore_time: 30,
            does_break: 1,
            AbilityCastRange: 750,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 200,
            AbilityCooldown: 30
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 150,
          damage_type: "magical",
          cooldown_s: 30,
          mana: 200,
          range_wu: 412.50000000000006,
          radius_wu: 0,
          duration_s: 6,
          startup_frames: 12,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            duration: 6,
            damage: 150,
            bonus_movement_speed: 80,
            bonus_attack_speed: 180,
            projectile_speed: 1500,
            max_charges: 2,
            charge_restore_time: 30,
            does_break: 1,
            AbilityCastRange: 750,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 200,
            AbilityCooldown: 30
          },
          toggle: false,
          charges: 0
        }
      }
    ]
  },
  {
    id: "valve_102",
    registryNumericId: 100,
    valveHeroId: 102,
    name: "亚巴顿",
    en: "ABADDON",
    packKey: "core4",
    hp: 1350,
    mana_regen: 8,
    attack: 100,
    move_speed: 255,
    attack_range: 100,
    attack_interval_s: 0.72,
    combatHp: 3780,
    combatMana: 1200,
    color: "#68e7db",
    abilities: [
      {
        id: "abaddon_death_coil",
        valveAbilityId: 5585,
        slot: "S1",
        name: "迷雾缠绕",
        en: "Mist Coil",
        official: {
          semantic: {
            self_damage: 40,
            self_damage_enemy_target: 40,
            missile_speed: 1300,
            damage_heal: 320,
            AbilityCastRange: 625,
            AbilityCastPoint: 0.25,
            AbilityManaCost: 65,
            AbilityCooldown: 5
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 320,
          damage_type: "magical",
          cooldown_s: 5,
          mana: 65,
          range_wu: 343.75,
          radius_wu: 0,
          duration_s: 0,
          startup_frames: 15,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            self_damage: 40,
            self_damage_enemy_target: 40,
            missile_speed: 1300,
            damage_heal: 320,
            AbilityCastRange: 625,
            AbilityCastPoint: 0.25,
            AbilityManaCost: 65,
            AbilityCooldown: 5
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "abaddon_aphotic_shield",
        valveAbilityId: 5586,
        slot: "S2",
        name: "无光之盾",
        en: "Aphotic Shield",
        official: {
          semantic: {
            duration: 12,
            radius: 675,
            damage_absorb: 210,
            absorb_to_damage: 0,
            absorb_damage_aoe: 0,
            AbilityCastRange: 550,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 140,
            AbilityCooldown: 6
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 6,
          mana: 140,
          range_wu: 302.5,
          radius_wu: 371.25000000000006,
          duration_s: 12,
          startup_frames: 18,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            duration: 12,
            radius: 675,
            damage_absorb: 210,
            absorb_to_damage: 0,
            absorb_damage_aoe: 0,
            AbilityCastRange: 550,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 140,
            AbilityCooldown: 6
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "abaddon_frostmourne",
        valveAbilityId: 5587,
        slot: "S3",
        name: "魔霭诅咒",
        en: "Curse of Avernus",
        official: {
          semantic: {
            slow_duration: 2,
            hit_count: 1,
            curse_duration: 2,
            curse_slow: 25,
            curse_attack_speed: 40,
            curse_dps: 45,
            tower_dps_pct: 100,
            curse_interval: 0.5
          }
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          radius_wu: 0,
          duration_s: 0,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            slow_duration: 2,
            hit_count: 1,
            curse_duration: 2,
            curse_slow: 25,
            curse_attack_speed: 40,
            curse_dps: 45,
            tower_dps_pct: 100,
            curse_interval: 0.5
          },
          toggle: false,
          charges: 0
        }
      },
      {
        id: "abaddon_borrowed_time",
        valveAbilityId: 5588,
        slot: "S4",
        name: "回光返照",
        en: "Borrowed Time",
        official: {
          semantic: {
            hp_threshold: 400,
            duration: 6,
            ally_threshold_scepter: 0,
            immolate_tick: 0.25,
            AbilityCooldown: 65
          }
        },
        mvp: {
          effect: "core4",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 65,
          mana: 0,
          range_wu: 0,
          radius_wu: 0,
          duration_s: 6,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false,
          params: {
            hp_threshold: 400,
            duration: 6,
            ally_threshold_scepter: 0,
            immolate_tick: 0.25,
            AbilityCooldown: 65
          },
          toggle: false,
          charges: 0
        }
      }
    ]
  },
  {
    id: "valve_4",
    registryNumericId: 21,
    valveHeroId: 4,
    key: "bloodseeker",
    name: "血魔",
    en: "Bloodseeker",
    packKey: "r20_55",
    hp: 1658,
    mana_regen: 2.5500000000000003,
    attack: 115,
    move_speed: 228,
    attack_range: 90,
    attack_interval_s: 0.9620826259196378,
    combatHp: 1658,
    combatMana: 687,
    color: "#94b8d6",
    arenaStats: {
      str: 69.9,
      agi: 76.7,
      int: 51
    },
    abilities: [
      {
        id: "bloodseeker_bloodrage",
        valveAbilityId: 5015,
        slot: "S1",
        name: "血怒",
        en: "Bloodrage",
        engineStatus: "implemented",
        official: {
          semantic: {
            duration: 8,
            attack_speed: 130,
            spell_amp: 30,
            damage_pct: 1.2,
            max_health_dmg_pct: 0,
            AbilityCooldown: 8
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "pure",
          cooldown_s: 8,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            duration: 8,
            attack_speed: 130,
            spell_amp: 30,
            damage_pct: 1.2,
            max_health_dmg_pct: 0,
            AbilityCooldown: 8
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "status",
              to: "self",
              duration: "duration",
              values: {
                attackSpeed: "attack_speed",
                spellAmp: {
                  div: [
                    "spell_amp",
                    100
                  ]
                }
              },
              tick: {
                interval: 1,
                ops: [
                  {
                    op: "selfCost",
                    percent: "damage_pct"
                  }
                ]
              }
            }
          ]
        }
      },
      {
        id: "bloodseeker_blood_bath",
        valveAbilityId: 5016,
        slot: "S2",
        name: "血祭",
        en: "Blood Rite",
        engineStatus: "implemented",
        official: {
          semantic: {
            radius: 600,
            silence_duration: 6,
            damage: 265,
            delay: 2.6,
            delay_plus_castpoint_tooltip: 2.9,
            AbilityCastRange: 1500,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 120,
            AbilityCooldown: 12
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "pure",
          cooldown_s: 12,
          mana: 120,
          range_wu: 825.0000000000001,
          startup_frames: 18,
          recovery_frames: 12,
          params: {
            radius: 600,
            silence_duration: 6,
            damage: 265,
            delay: 2.6,
            delay_plus_castpoint_tooltip: 2.9,
            AbilityCastRange: 1500,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 120,
            AbilityCooldown: 12
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "point",
          ops: [
            {
              op: "delay",
              delay: "delay",
              ops: [
                {
                  op: "damage",
                  amount: "damage",
                  type: "pure",
                  radius: "radius",
                  center: "aim"
                },
                {
                  op: "status",
                  duration: "silence_duration",
                  values: {
                    silence: true
                  },
                  radius: "radius",
                  center: "aim"
                }
              ]
            }
          ]
        }
      },
      {
        id: "bloodseeker_thirst",
        valveAbilityId: 5017,
        slot: "S3",
        name: "焦渴",
        en: "Thirst",
        engineStatus: "implemented",
        official: {
          semantic: {
            min_bonus_pct: 100,
            bonus_movement_speed: 40,
            max_bonus_pct: 25,
            visibility_threshold_pct: 25,
            invis_threshold_pct: 25,
            linger_duration: 4,
            AbilityCastPoint: 0.3
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "none",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 18,
          recovery_frames: 12,
          params: {
            min_bonus_pct: 100,
            bonus_movement_speed: 40,
            max_bonus_pct: 25,
            visibility_threshold_pct: 25,
            invis_threshold_pct: 25,
            linger_duration: 4,
            AbilityCastPoint: 0.3
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "passive",
          ops: [],
          dynamic: "thirst"
        }
      },
      {
        id: "bloodseeker_rupture",
        valveAbilityId: 5018,
        slot: "S4",
        name: "割裂",
        en: "Rupture",
        engineStatus: "implemented",
        official: {
          semantic: {
            duration: 11,
            movement_damage_pct: 55,
            hp_pct: 10,
            damage_cap_amount: 200,
            AbilityCastRange: 800,
            AbilityCastPoint: 0.4,
            AbilityCharges: 0,
            AbilityManaCost: 225,
            AbilityCooldown: 65
          },
          rank: 3
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "pure",
          cooldown_s: 65,
          mana: 225,
          range_wu: 440.00000000000006,
          startup_frames: 24,
          recovery_frames: 12,
          params: {
            duration: 11,
            movement_damage_pct: 55,
            hp_pct: 10,
            damage_cap_amount: 200,
            AbilityCastRange: 800,
            AbilityCastPoint: 0.4,
            AbilityCharges: 0,
            AbilityManaCost: 225,
            AbilityCooldown: 65
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "damage",
              amount: {
                mul: [
                  {
                    stat: "hp",
                    who: "target"
                  },
                  {
                    div: [
                      "hp_pct",
                      100
                    ]
                  }
                ]
              },
              type: "pure"
            },
            {
              op: "rupture",
              duration: "duration",
              percent: "movement_damage_pct",
              cap: "damage_cap_amount"
            }
          ]
        }
      }
    ],
    innates: []
  },
  {
    id: "valve_20",
    registryNumericId: 28,
    valveHeroId: 20,
    key: "vengefulspirit",
    name: "复仇之魂",
    en: "Vengeful Spirit",
    packKey: "r20_55",
    hp: 1532,
    mana_regen: 2.225,
    attack: 105,
    move_speed: 240,
    attack_range: 220.00000000000003,
    attack_interval_s: 0.8620689655172414,
    combatHp: 1532,
    combatMana: 609,
    color: "#94b8d6",
    arenaStats: {
      str: 64.2,
      agi: 74,
      int: 44.5
    },
    abilities: [
      {
        id: "vengefulspirit_magic_missile",
        valveAbilityId: 5122,
        slot: "S1",
        name: "魔法箭",
        en: "Magic Missile",
        engineStatus: "implemented",
        official: {
          semantic: {
            magic_missile_speed: 1350,
            magic_missile_stun: 1.8,
            magic_missile_damage: 340,
            bounce_range_pct: 75,
            AbilityCastRange: 650,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 105,
            AbilityCooldown: 11
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 11,
          mana: 105,
          range_wu: 357.50000000000006,
          startup_frames: 18,
          recovery_frames: 12,
          params: {
            magic_missile_speed: 1350,
            magic_missile_stun: 1.8,
            magic_missile_damage: 340,
            bounce_range_pct: 75,
            AbilityCastRange: 650,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 105,
            AbilityCooldown: 11
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "delay",
              delay: 0.25,
              ops: [
                {
                  op: "damage",
                  amount: "magic_missile_damage"
                },
                {
                  op: "status",
                  duration: "magic_missile_stun",
                  values: {
                    stun: true
                  },
                  dispel: "strong"
                }
              ]
            }
          ]
        }
      },
      {
        id: "vengefulspirit_wave_of_terror",
        valveAbilityId: 5124,
        slot: "S2",
        name: "恐怖波动",
        en: "Wave of Terror",
        engineStatus: "implemented",
        official: {
          semantic: {
            damage: 120,
            wave_speed: 2e3,
            wave_width: 325,
            armor_reduction: -6,
            attack_reduction: 25,
            vision_aoe: 350,
            vision_duration: 4,
            AbilityCastRange: 1400,
            AbilityDuration: 8,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 40,
            AbilityCooldown: 10
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 10,
          mana: 40,
          range_wu: 770.0000000000001,
          startup_frames: 18,
          recovery_frames: 12,
          params: {
            damage: 120,
            wave_speed: 2e3,
            wave_width: 325,
            armor_reduction: -6,
            attack_reduction: 25,
            vision_aoe: 350,
            vision_duration: 4,
            AbilityCastRange: 1400,
            AbilityDuration: 8,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 40,
            AbilityCooldown: 10
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "damage",
              amount: "damage"
            },
            {
              op: "status",
              duration: "AbilityDuration",
              values: {
                armor: "armor_reduction",
                attackReduction: {
                  div: [
                    "attack_reduction",
                    100
                  ]
                }
              }
            }
          ]
        }
      },
      {
        id: "vengefulspirit_command_aura",
        valveAbilityId: 5123,
        slot: "S3",
        name: "复仇光环",
        en: "Vengeance Aura",
        engineStatus: "implemented",
        official: {
          semantic: {
            bonus_base_damage: 25,
            self_multiplier: 25,
            aura_radius: 1200,
            scepter_illusion_damage_out_pct: 0,
            scepter_illusion_damage_in_pct: 0,
            scepter_illusion_ms_bonus_pct: 0,
            AbilityCastRange: 1200
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "none",
          cooldown_s: 0,
          mana: 0,
          range_wu: 660,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            bonus_base_damage: 25,
            self_multiplier: 25,
            aura_radius: 1200,
            scepter_illusion_damage_out_pct: 0,
            scepter_illusion_damage_in_pct: 0,
            scepter_illusion_ms_bonus_pct: 0,
            AbilityCastRange: 1200
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "passive",
          ops: [],
          stats: {
            attackPct: {
              mul: [
                {
                  div: [
                    "bonus_base_damage",
                    100
                  ]
                },
                {
                  add: [
                    1,
                    {
                      div: [
                        "self_multiplier",
                        100
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      {
        id: "vengefulspirit_nether_swap",
        valveAbilityId: 5125,
        slot: "S4",
        name: "移形换位",
        en: "Nether Swap",
        engineStatus: "implemented",
        official: {
          semantic: {
            damage_reduction_duration: 10,
            damage: 450,
            AbilityCastRange: 1100,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 200,
            AbilityCooldown: 30
          },
          rank: 3
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 30,
          mana: 200,
          range_wu: 605,
          startup_frames: 24,
          recovery_frames: 12,
          params: {
            damage_reduction_duration: 10,
            damage: 450,
            AbilityCastRange: 1100,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 200,
            AbilityCooldown: 30
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "swap"
            },
            {
              op: "damage",
              amount: "damage"
            },
            {
              op: "status",
              to: "self",
              duration: "damage_reduction_duration",
              values: {
                shield: "damage"
              }
            }
          ]
        }
      }
    ],
    innates: []
  },
  {
    id: "valve_23",
    registryNumericId: 29,
    valveHeroId: 23,
    key: "kunkka",
    name: "昆卡",
    en: "Kunkka",
    packKey: "r20_55",
    hp: 1994,
    mana_regen: 2.4300000400000004,
    attack: 118,
    move_speed: 252,
    attack_range: 90,
    attack_interval_s: 1.2039660056657224,
    combatHp: 1994,
    combatMana: 658,
    color: "#94b8d6",
    arenaStats: {
      str: 85.2,
      agi: 41.2,
      int: 48.6
    },
    abilities: [
      {
        id: "kunkka_torrent",
        valveAbilityId: 5031,
        slot: "S1",
        name: "洪流",
        en: "Torrent",
        engineStatus: "implemented",
        official: {
          semantic: {
            radius: 250,
            movespeed_bonus: -40,
            slow_duration: 4,
            stun_duration: 1.4,
            delay: 1.6,
            torrent_damage: 320,
            damage_tick_interval: 0.2,
            AbilityCastRange: 1300,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 90,
            AbilityCooldown: 10
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 10,
          mana: 90,
          range_wu: 715.0000000000001,
          startup_frames: 24,
          recovery_frames: 12,
          params: {
            radius: 250,
            movespeed_bonus: -40,
            slow_duration: 4,
            stun_duration: 1.4,
            delay: 1.6,
            torrent_damage: 320,
            damage_tick_interval: 0.2,
            AbilityCastRange: 1300,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 90,
            AbilityCooldown: 10
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "point",
          ops: [
            {
              op: "delay",
              delay: "delay",
              ops: [
                {
                  op: "damage",
                  amount: "torrent_damage",
                  radius: "radius",
                  center: "aim"
                },
                {
                  op: "status",
                  duration: "stun_duration",
                  values: {
                    stun: true
                  },
                  dispel: "strong",
                  radius: "radius",
                  center: "aim"
                },
                {
                  op: "status",
                  duration: "slow_duration",
                  values: {
                    moveSlow: 0.4
                  },
                  radius: "radius",
                  center: "aim"
                }
              ]
            }
          ]
        }
      },
      {
        id: "kunkka_tidebringer",
        valveAbilityId: 5032,
        slot: "S2",
        name: "潮汐使者",
        en: "Tidebringer",
        engineStatus: "implemented",
        official: {
          semantic: {
            cleave_starting_width: 150,
            cleave_ending_width: 650,
            cleave_distance: 1025,
            damage_bonus: 140,
            cleave_damage: 150,
            AbilityCastRange: 150,
            AbilityCooldown: 4
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "physical",
          cooldown_s: 4,
          mana: 0,
          range_wu: 82.5,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            cleave_starting_width: 150,
            cleave_ending_width: 650,
            cleave_distance: 1025,
            damage_bonus: 140,
            cleave_damage: 150,
            AbilityCastRange: 150,
            AbilityCooldown: 4
          },
          toggle: true
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "toggle",
              values: {
                armed: true
              }
            }
          ],
          attack: {
            requiresToggle: true,
            consumeToggle: true,
            ops: []
          },
          toggle: true
        }
      },
      {
        id: "kunkka_x_marks_the_spot",
        valveAbilityId: 5033,
        slot: "S3",
        name: "X标记",
        en: "X Marks the Spot",
        engineStatus: "implemented",
        official: {
          semantic: {
            duration: 3,
            allied_duration: 6,
            fow_range: 400,
            fow_duration: 5.94,
            movespeed_bonus: 15,
            ghostship_absorb: 35,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 50,
            AbilityCooldown: 12
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 12,
          mana: 50,
          range_wu: 550,
          startup_frames: 24,
          recovery_frames: 12,
          params: {
            duration: 3,
            allied_duration: 6,
            fow_range: 400,
            fow_duration: 5.94,
            movespeed_bonus: 15,
            ghostship_absorb: 35,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 50,
            AbilityCooldown: 12
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "mark",
              duration: "duration"
            }
          ]
        }
      },
      {
        id: "kunkka_ghostship",
        valveAbilityId: 5035,
        slot: "S4",
        name: "幽灵船",
        en: "Ghostship",
        engineStatus: "implemented",
        official: {
          semantic: {
            tooltip_delay: 3.1,
            ghostship_distance: 2e3,
            ghostship_width: 450,
            stun_duration: 1.2,
            ghostship_speed: 650,
            rum_factor: 2,
            fleet_interval: 0,
            fleet_count: 0,
            fire_cannons: 0,
            cannon_ball_damage_pct: 0,
            cannon_ball_distance: 0,
            cannon_ball_speed: 0,
            cannon_count: 0,
            cannon_ball_radius: 0,
            num_cannon_volleys: 3,
            cannon_fire_interval: 0,
            base_cannon_rotation: 20,
            rotation_per_cannon: 12,
            initial_cannon_offset: -150,
            distance_between_cannons: 75,
            AbilityDamage: 600,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 225,
            AbilityCooldown: 70
          },
          rank: 3
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 70,
          mana: 225,
          range_wu: 550,
          startup_frames: 18,
          recovery_frames: 12,
          params: {
            tooltip_delay: 3.1,
            ghostship_distance: 2e3,
            ghostship_width: 450,
            stun_duration: 1.2,
            ghostship_speed: 650,
            rum_factor: 2,
            fleet_interval: 0,
            fleet_count: 0,
            fire_cannons: 0,
            cannon_ball_damage_pct: 0,
            cannon_ball_distance: 0,
            cannon_ball_speed: 0,
            cannon_count: 0,
            cannon_ball_radius: 0,
            num_cannon_volleys: 3,
            cannon_fire_interval: 0,
            base_cannon_rotation: 20,
            rotation_per_cannon: 12,
            initial_cannon_offset: -150,
            distance_between_cannons: 75,
            AbilityDamage: 600,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 225,
            AbilityCooldown: 70
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "point",
          ops: [
            {
              op: "deferredHP",
              duration: 5,
              damageFraction: 0.36,
              repayDuration: 5,
              nonlethal: true
            },
            {
              op: "status",
              to: "self",
              duration: 5,
              values: {
                moveBonus: 0.155
              },
              dispel: "none"
            },
            {
              op: "delay",
              delay: "tooltip_delay",
              ops: [
                {
                  op: "damage",
                  amount: "AbilityDamage",
                  radius: "ghostship_width",
                  center: "aim"
                },
                {
                  op: "status",
                  duration: "stun_duration",
                  values: {
                    stun: true
                  },
                  dispel: "strong",
                  radius: "ghostship_width",
                  center: "aim"
                }
              ]
            }
          ],
          integrationRequirement: "POST_MITIGATION_DEBT_V2"
        }
      }
    ],
    innates: []
  },
  {
    id: "valve_31",
    registryNumericId: 32,
    valveHeroId: 31,
    key: "lich",
    name: "巫妖",
    en: "Lich",
    packKey: "r20_55",
    hp: 1345,
    mana_regen: 3.28999998,
    attack: 114,
    move_speed: 232,
    attack_range: 302.5,
    attack_interval_s: 1.1651816312542838,
    combatHp: 1345,
    combatMana: 1105,
    color: "#94b8d6",
    arenaStats: {
      str: 55.7,
      agi: 45.9,
      int: 85.8
    },
    abilities: [
      {
        id: "lich_frost_nova",
        valveAbilityId: 5134,
        slot: "S1",
        name: "寒霜爆发",
        en: "Frost Blast",
        engineStatus: "implemented",
        official: {
          semantic: {
            radius: 200,
            slow_movement_speed: -25,
            slow_attack_speed_primary: -60,
            damage: 160,
            aoe_damage: 200,
            AbilityCastRange: 650,
            AbilityDuration: 4,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 140,
            AbilityCooldown: 7
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 7,
          mana: 140,
          range_wu: 357.50000000000006,
          startup_frames: 18,
          recovery_frames: 12,
          params: {
            radius: 200,
            slow_movement_speed: -25,
            slow_attack_speed_primary: -60,
            damage: 160,
            aoe_damage: 200,
            AbilityCastRange: 650,
            AbilityDuration: 4,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 140,
            AbilityCooldown: 7
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "damage",
              amount: {
                add: [
                  "damage",
                  "aoe_damage"
                ]
              }
            },
            {
              op: "status",
              duration: "AbilityDuration",
              values: {
                moveSlow: 0.25,
                attackSlow: 60
              }
            }
          ]
        }
      },
      {
        id: "lich_frost_shield",
        valveAbilityId: 5136,
        slot: "S2",
        name: "冰霜魔盾",
        en: "Frost Shield",
        engineStatus: "implemented",
        official: {
          semantic: {
            damage_reduction: 60,
            movement_slow: 35,
            slow_duration: 0.5,
            damage: 60,
            interval: 1,
            radius: 600,
            duration: 7,
            AbilityCastRange: 800,
            AbilityCastPoint: 0.2,
            AbilityChargeRestoreTime: 15,
            AbilityManaCost: 130,
            AbilityCooldown: 15
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 15,
          mana: 130,
          range_wu: 440.00000000000006,
          startup_frames: 12,
          recovery_frames: 12,
          params: {
            damage_reduction: 60,
            movement_slow: 35,
            slow_duration: 0.5,
            damage: 60,
            interval: 1,
            radius: 600,
            duration: 7,
            AbilityCastRange: 800,
            AbilityCastPoint: 0.2,
            AbilityChargeRestoreTime: 15,
            AbilityManaCost: 130,
            AbilityCooldown: 15
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "status",
              to: "self",
              duration: "duration",
              values: {
                basicReduction: {
                  div: [
                    "damage_reduction",
                    100
                  ]
                }
              }
            },
            {
              op: "area",
              duration: "duration",
              interval: "interval",
              radius: "radius",
              ops: [
                {
                  op: "damage",
                  amount: "damage"
                },
                {
                  op: "status",
                  duration: "slow_duration",
                  values: {
                    moveSlow: {
                      div: [
                        "movement_slow",
                        100
                      ]
                    }
                  }
                }
              ],
              follow: true
            }
          ]
        }
      },
      {
        id: "lich_sinister_gaze",
        valveAbilityId: 7325,
        slot: "S3",
        name: "阴邪凝视",
        en: "Sinister Gaze",
        engineStatus: "implemented",
        official: {
          semantic: {
            channel_duration: 2,
            destination: 50,
            mana_drain: 25,
            aoe_scepter: 0,
            AbilityCastRange: 600,
            AbilityChannelTime: 2,
            AbilityManaCost: 25,
            AbilityCooldown: 18
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 18,
          mana: 25,
          range_wu: 330,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            channel_duration: 2,
            destination: 50,
            mana_drain: 25,
            aoe_scepter: 0,
            AbilityCastRange: 600,
            AbilityChannelTime: 2,
            AbilityManaCost: 25,
            AbilityCooldown: 18
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "area",
              duration: "channel_duration",
              interval: 0.25,
              radius: 600,
              ops: [
                {
                  op: "mana",
                  amount: {
                    mul: [
                      {
                        stat: "mp",
                        who: "target"
                      },
                      {
                        div: [
                          "mana_drain",
                          100
                        ]
                      },
                      0.25
                    ]
                  },
                  steal: true
                },
                {
                  op: "status",
                  duration: 0.25,
                  values: {
                    stun: true
                  },
                  dispel: "strong"
                },
                {
                  op: "pullStep",
                  amount: 25
                }
              ],
              channel: true,
              follow: true
            }
          ]
        }
      },
      {
        id: "lich_chain_frost",
        valveAbilityId: 5137,
        slot: "S4",
        name: "连环霜冻",
        en: "Chain Frost",
        engineStatus: "implemented",
        official: {
          semantic: {
            damage: 550,
            bonus_jump_damage: 25,
            jumps: 10,
            jump_range: 550,
            slow_movement_speed: -65,
            slow_attack_speed: -65,
            slow_duration: 2.5,
            initial_projectile_speed: 1050,
            projectile_speed: 850,
            vision_radius: 800,
            frostbound_duration: 2,
            AbilityCastRange: 750,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 420,
            AbilityCooldown: 60
          },
          rank: 3
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 60,
          mana: 420,
          range_wu: 412.50000000000006,
          startup_frames: 18,
          recovery_frames: 12,
          params: {
            damage: 550,
            bonus_jump_damage: 25,
            jumps: 10,
            jump_range: 550,
            slow_movement_speed: -65,
            slow_attack_speed: -65,
            slow_duration: 2.5,
            initial_projectile_speed: 1050,
            projectile_speed: 850,
            vision_radius: 800,
            frostbound_duration: 2,
            AbilityCastRange: 750,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 420,
            AbilityCooldown: 60
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "damage",
              amount: "damage"
            },
            {
              op: "status",
              duration: "slow_duration",
              values: {
                moveSlow: 0.65,
                attackSlow: 65
              }
            }
          ]
        }
      }
    ],
    innates: []
  },
  {
    id: "valve_36",
    registryNumericId: 36,
    valveHeroId: 36,
    key: "necrolyte",
    name: "瘟疫法师",
    en: "Necrophos",
    packKey: "r20_55",
    hp: 1376,
    mana_regen: 3.4450000000000003,
    attack: 97,
    move_speed: 224,
    attack_range: 275,
    attack_interval_s: 1.267710663683818,
    combatHp: 1376,
    combatMana: 902,
    color: "#94b8d6",
    arenaStats: {
      str: 57.099999999999994,
      agi: 34.1,
      int: 68.9
    },
    abilities: [
      {
        id: "necrolyte_death_pulse",
        valveAbilityId: 5158,
        slot: "S1",
        name: "死亡脉冲",
        en: "Death Pulse",
        engineStatus: "implemented",
        official: {
          semantic: {
            area_of_effect: 500,
            heal: 130,
            projectile_speed: 400,
            AbilityDamage: 280,
            AbilityManaCost: 160,
            AbilityCooldown: 5
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 5,
          mana: 160,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            area_of_effect: 500,
            heal: 130,
            projectile_speed: 400,
            AbilityDamage: 280,
            AbilityManaCost: 160,
            AbilityCooldown: 5
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "damage",
              amount: "AbilityDamage",
              radius: "area_of_effect"
            },
            {
              op: "heal",
              to: "self",
              amount: "heal"
            }
          ]
        }
      },
      {
        id: "necrolyte_ghost_shroud",
        valveAbilityId: 1270,
        slot: "S2",
        name: "幽魂护罩",
        en: "Ghost Shroud",
        engineStatus: "implemented",
        official: {
          semantic: {
            duration: 4.5,
            heal_bonus: 75,
            movement_speed: 25,
            slow_aoe: 700,
            bonus_damage: -20,
            AbilityManaCost: 75,
            AbilityCooldown: 16
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 16,
          mana: 75,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            duration: 4.5,
            heal_bonus: 75,
            movement_speed: 25,
            slow_aoe: 700,
            bonus_damage: -20,
            AbilityManaCost: 75,
            AbilityCooldown: 16
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "status",
              to: "self",
              duration: "duration",
              values: {
                physicalImmune: true,
                disarm: true,
                magicVulnerable: 0.2,
                healAmp: 0.75
              }
            },
            {
              op: "area",
              duration: "duration",
              interval: 0.1,
              radius: "slow_aoe",
              ops: [
                {
                  op: "status",
                  duration: 0.15,
                  values: {
                    moveSlow: 0.25
                  }
                }
              ],
              follow: true
            }
          ]
        }
      },
      {
        id: "necrolyte_heartstopper_aura",
        valveAbilityId: 5159,
        slot: "S3",
        name: "竭心光环",
        en: "Heartstopper Aura",
        engineStatus: "implemented",
        official: {
          semantic: {
            aura_radius: 700,
            aura_damage: 2.3,
            heal_regen_to_damage: 0
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            aura_radius: 700,
            aura_damage: 2.3,
            heal_regen_to_damage: 0
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "passive",
          ops: [],
          aura: {
            interval: 0.25,
            radius: "aura_radius",
            ops: [
              {
                op: "damage",
                amount: {
                  mul: [
                    {
                      stat: "maxHp",
                      who: "target"
                    },
                    {
                      div: [
                        "aura_damage",
                        100
                      ]
                    },
                    0.25
                  ]
                },
                type: "magical"
              }
            ]
          }
        }
      },
      {
        id: "necrolyte_reapers_scythe",
        valveAbilityId: 5161,
        slot: "S4",
        name: "死神镰刀",
        en: "Reaper's Scythe",
        engineStatus: "implemented",
        official: {
          semantic: {
            damage_per_health: 0.9,
            stun_duration: 1.5,
            hp_per_kill: 3,
            mana_per_kill: 3,
            AbilityCastRange: 600,
            AbilityCastPoint: 0.45,
            AbilityManaCost: 500,
            AbilityCooldown: 100
          },
          rank: 3
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 100,
          mana: 500,
          range_wu: 330,
          startup_frames: 27,
          recovery_frames: 12,
          params: {
            damage_per_health: 0.9,
            stun_duration: 1.5,
            hp_per_kill: 3,
            mana_per_kill: 3,
            AbilityCastRange: 600,
            AbilityCastPoint: 0.45,
            AbilityManaCost: 500,
            AbilityCooldown: 100
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "status",
              duration: "stun_duration",
              values: {
                stun: true
              },
              dispel: "strong"
            },
            {
              op: "delay",
              delay: "stun_duration",
              ops: [
                {
                  op: "damage",
                  amount: {
                    mul: [
                      {
                        stat: "missingHp",
                        who: "target"
                      },
                      "damage_per_health"
                    ]
                  }
                }
              ]
            }
          ]
        }
      }
    ],
    innates: []
  },
  {
    id: "valve_43",
    registryNumericId: 42,
    valveHeroId: 43,
    key: "death_prophet",
    name: "死亡先知",
    en: "Death Prophet",
    packKey: "r20_55",
    hp: 1667,
    mana_regen: 4.25,
    attack: 125,
    move_speed: 232,
    attack_range: 330,
    attack_interval_s: 1.0890454836643177,
    combatHp: 1667,
    combatMana: 975,
    color: "#94b8d6",
    arenaStats: {
      str: 70.3,
      agi: 56.099999999999994,
      int: 75
    },
    abilities: [
      {
        id: "death_prophet_carrion_swarm",
        valveAbilityId: 5090,
        slot: "S1",
        name: "地穴虫群",
        en: "Crypt Swarm",
        engineStatus: "implemented",
        official: {
          semantic: {
            damage: 325,
            start_radius: 110,
            end_radius: 300,
            range: 900,
            speed: 1100,
            AbilityCastRange: 900,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 110,
            AbilityCooldown: 6
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 6,
          mana: 110,
          range_wu: 495.00000000000006,
          startup_frames: 12,
          recovery_frames: 12,
          params: {
            damage: 325,
            start_radius: 110,
            end_radius: 300,
            range: 900,
            speed: 1100,
            AbilityCastRange: 900,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 110,
            AbilityCooldown: 6
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "damage",
              amount: "damage"
            }
          ]
        }
      },
      {
        id: "death_prophet_silence",
        valveAbilityId: 5091,
        slot: "S2",
        name: "沉默魔法",
        en: "Silence",
        engineStatus: "implemented",
        official: {
          semantic: {
            radius: 450,
            projectile_speed: 1750,
            AbilityCastRange: 900,
            AbilityDuration: 5,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 110,
            AbilityCooldown: 12
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 12,
          mana: 110,
          range_wu: 495.00000000000006,
          startup_frames: 12,
          recovery_frames: 12,
          params: {
            radius: 450,
            projectile_speed: 1750,
            AbilityCastRange: 900,
            AbilityDuration: 5,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 110,
            AbilityCooldown: 12
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "point",
          ops: [
            {
              op: "status",
              duration: "AbilityDuration",
              values: {
                silence: true
              },
              radius: "radius",
              center: "aim"
            }
          ]
        }
      },
      {
        id: "death_prophet_spirit_siphon",
        valveAbilityId: 5685,
        slot: "S3",
        name: "吸魂巫术",
        en: "Spirit Siphon",
        engineStatus: "implemented",
        official: {
          semantic: {
            damage: 100,
            haunt_duration: 6,
            siphon_buffer: 250,
            shard_bonus_charges: 0,
            shard_fear_duration: 0,
            shard_consecutive_siphon_duration: 0,
            AbilityCastRange: 500,
            AbilityCastPoint: 0.1,
            AbilityCharges: 4,
            AbilityChargeRestoreTime: 40,
            AbilityManaCost: 60
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 60,
          range_wu: 275,
          startup_frames: 6,
          recovery_frames: 12,
          params: {
            damage: 100,
            haunt_duration: 6,
            siphon_buffer: 250,
            shard_bonus_charges: 0,
            shard_fear_duration: 0,
            shard_consecutive_siphon_duration: 0,
            AbilityCastRange: 500,
            AbilityCastPoint: 0.1,
            AbilityCharges: 4,
            AbilityChargeRestoreTime: 40,
            AbilityManaCost: 60
          },
          charges: 4,
          charge_restore_s: 40
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "special",
              name: "siphon"
            }
          ],
          integrationRequirement: "CHARGES_LINKS_V2"
        }
      },
      {
        id: "death_prophet_exorcism",
        valveAbilityId: 5093,
        slot: "S4",
        name: "驱使恶灵",
        en: "Exorcism",
        engineStatus: "implemented",
        official: {
          semantic: {
            radius: 700,
            spirits: 26,
            spirit_speed: 525,
            max_distance: 2e3,
            give_up_distance: 1200,
            min_damage: 68,
            max_damage: 74,
            heal_percent: 25,
            average_damage: 71,
            ghost_spawn_rate: 0.25,
            scepter_spirit_life_duration: 0,
            scepter_spirit_bonus_damage: 0,
            AbilityDuration: 40,
            AbilityCastPoint: 0.5,
            AbilityManaCost: 400,
            AbilityCooldown: 150
          },
          rank: 3
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "physical",
          cooldown_s: 150,
          mana: 400,
          range_wu: 0,
          startup_frames: 30,
          recovery_frames: 12,
          params: {
            radius: 700,
            spirits: 26,
            spirit_speed: 525,
            max_distance: 2e3,
            give_up_distance: 1200,
            min_damage: 68,
            max_damage: 74,
            heal_percent: 25,
            average_damage: 71,
            ghost_spawn_rate: 0.25,
            scepter_spirit_life_duration: 0,
            scepter_spirit_bonus_damage: 0,
            AbilityDuration: 40,
            AbilityCastPoint: 0.5,
            AbilityManaCost: 400,
            AbilityCooldown: 150
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "special",
              name: "exorcism"
            }
          ],
          integrationRequirement: "RETURNING_ENTITIES_V2"
        }
      }
    ],
    innates: []
  },
  {
    id: "valve_49",
    registryNumericId: 47,
    valveHeroId: 49,
    key: "dragon_knight",
    name: "龙骑士",
    en: "Dragon Knight",
    packKey: "r20_55",
    hp: 1779,
    mana_regen: 2.34500004,
    attack: 112,
    move_speed: 248,
    attack_range: 90,
    attack_interval_s: 1.0810810810810811,
    combatHp: 1779,
    combatMana: 638,
    color: "#94b8d6",
    arenaStats: {
      str: 75.4,
      agi: 48,
      int: 46.9
    },
    abilities: [
      {
        id: "dragon_knight_breathe_fire",
        valveAbilityId: 5226,
        slot: "S1",
        name: "火焰气息",
        en: "Breathe Fire",
        engineStatus: "implemented",
        official: {
          semantic: {
            start_radius: 150,
            end_radius: 250,
            range: 750,
            speed: 1050,
            damage: 320,
            reduction: 32,
            duration: 11,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 105,
            AbilityCooldown: 11
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 11,
          mana: 105,
          range_wu: 550,
          startup_frames: 12,
          recovery_frames: 12,
          params: {
            start_radius: 150,
            end_radius: 250,
            range: 750,
            speed: 1050,
            damage: 320,
            reduction: 32,
            duration: 11,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 105,
            AbilityCooldown: 11
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "damage",
              amount: "damage"
            },
            {
              op: "status",
              duration: "duration",
              values: {
                attackReduction: {
                  div: [
                    "reduction",
                    100
                  ]
                }
              }
            }
          ]
        }
      },
      {
        id: "dragon_knight_dragon_tail",
        valveAbilityId: 5227,
        slot: "S2",
        name: "神龙摆尾",
        en: "Dragon Tail",
        engineStatus: "implemented",
        official: {
          semantic: {
            stun_duration: 2.4,
            damage: 150,
            dragon_cast_range: 150,
            projectile_speed: 1600,
            aoe: 50,
            AbilityCastRange: 150,
            AbilityManaCost: 100,
            AbilityCooldown: 10
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 10,
          mana: 100,
          range_wu: 82.5,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            stun_duration: 2.4,
            damage: 150,
            dragon_cast_range: 150,
            projectile_speed: 1600,
            aoe: 50,
            AbilityCastRange: 150,
            AbilityManaCost: 100,
            AbilityCooldown: 10
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "damage",
              amount: "damage"
            },
            {
              op: "status",
              duration: "stun_duration",
              values: {
                stun: true
              },
              dispel: "strong"
            }
          ]
        }
      },
      {
        id: "dragon_knight_wyrms_wrath",
        valveAbilityId: 1752,
        slot: "S3",
        name: "飞龙之怒",
        en: "Wyrm's Wrath",
        engineStatus: "implemented",
        official: {
          semantic: {
            magic_damage: 40,
            bonus_aoe: 120
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            magic_damage: 40,
            bonus_aoe: 120
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "passive",
          ops: [],
          attack: {
            ops: [
              {
                op: "damage",
                amount: "magic_damage",
                type: "magical"
              }
            ]
          }
        }
      },
      {
        id: "dragon_knight_elder_dragon_form",
        valveAbilityId: 5229,
        slot: "S4",
        name: "古龙形态",
        en: "Elder Dragon Form",
        engineStatus: "implemented",
        official: {
          semantic: {
            duration: 60,
            bonus_movement_speed: 35,
            bonus_attack_range: 350,
            bonus_ability_cast_range: 350,
            model_scale: 20,
            corrosive_duration: 3,
            corrosive_damage_per_second: 25,
            ranged_splash_damage_pct: 75,
            ranged_splash_radius: 275,
            health_bar_offset: 300,
            magic_resistance: 0,
            flying_movement: 0,
            frost_duration: 3,
            frost_bonus_movement_speed: 30,
            frost_bonus_attack_speed: 50,
            scepter_bonus_levels: 1,
            AbilityManaCost: 50,
            AbilityCooldown: 100
          },
          rank: 3
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 100,
          mana: 50,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            duration: 60,
            bonus_movement_speed: 35,
            bonus_attack_range: 350,
            bonus_ability_cast_range: 350,
            model_scale: 20,
            corrosive_duration: 3,
            corrosive_damage_per_second: 25,
            ranged_splash_damage_pct: 75,
            ranged_splash_radius: 275,
            health_bar_offset: 300,
            magic_resistance: 0,
            flying_movement: 0,
            frost_duration: 3,
            frost_bonus_movement_speed: 30,
            frost_bonus_attack_speed: 50,
            scepter_bonus_levels: 1,
            AbilityManaCost: 50,
            AbilityCooldown: 100
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "special",
              name: "dragon"
            }
          ],
          integrationRequirement: "TEMPORARY_ATTACK_PROFILE_V2"
        }
      }
    ],
    innates: []
  },
  {
    id: "valve_52",
    registryNumericId: 50,
    valveHeroId: 52,
    key: "leshrac",
    name: "拉席克",
    en: "Leshrac",
    packKey: "r20_55",
    hp: 1495,
    mana_regen: 4.075,
    attack: 111,
    move_speed: 260,
    attack_range: 316.25,
    attack_interval_s: 1.0658307210031348,
    combatHp: 1495,
    combatMana: 1053,
    color: "#94b8d6",
    arenaStats: {
      str: 62.5,
      agi: 59.5,
      int: 81.5
    },
    abilities: [
      {
        id: "leshrac_split_earth",
        valveAbilityId: 5241,
        slot: "S1",
        name: "撕裂大地",
        en: "Split Earth",
        engineStatus: "implemented",
        official: {
          semantic: {
            delay: 0.35,
            radius: 210,
            duration: 1.7,
            shard_radius_increase: 0,
            shard_max_count: 0,
            shard_secondary_delay: 0,
            AbilityDamage: 280,
            AbilityCastRange: 650,
            AbilityDuration: 1.6,
            AbilityCastPoint: 0.7,
            AbilityManaCost: 140,
            AbilityCooldown: 11
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 11,
          mana: 140,
          range_wu: 357.50000000000006,
          startup_frames: 42,
          recovery_frames: 12,
          params: {
            delay: 0.35,
            radius: 210,
            duration: 1.7,
            shard_radius_increase: 0,
            shard_max_count: 0,
            shard_secondary_delay: 0,
            AbilityDamage: 280,
            AbilityCastRange: 650,
            AbilityDuration: 1.6,
            AbilityCastPoint: 0.7,
            AbilityManaCost: 140,
            AbilityCooldown: 11
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "point",
          ops: [
            {
              op: "delay",
              delay: "delay",
              ops: [
                {
                  op: "damage",
                  amount: "AbilityDamage",
                  radius: "radius",
                  center: "aim"
                },
                {
                  op: "status",
                  duration: "duration",
                  values: {
                    stun: true
                  },
                  dispel: "strong",
                  radius: "radius",
                  center: "aim"
                }
              ]
            }
          ]
        }
      },
      {
        id: "leshrac_diabolic_edict",
        valveAbilityId: 5242,
        slot: "S2",
        name: "恶魔敕令",
        en: "Diabolic Edict",
        engineStatus: "implemented",
        official: {
          semantic: {
            num_explosions: 40,
            radius: 450,
            affects_buildings: 1,
            damage: 30,
            targets: 1,
            AbilityDuration: 8,
            AbilityCastPoint: 0.5,
            AbilityManaCost: 180,
            AbilityCooldown: 19
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "pure",
          cooldown_s: 19,
          mana: 180,
          range_wu: 0,
          startup_frames: 30,
          recovery_frames: 12,
          params: {
            num_explosions: 40,
            radius: 450,
            affects_buildings: 1,
            damage: 30,
            targets: 1,
            AbilityDuration: 8,
            AbilityCastPoint: 0.5,
            AbilityManaCost: 180,
            AbilityCooldown: 19
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "area",
              duration: "AbilityDuration",
              interval: {
                div: [
                  "AbilityDuration",
                  "num_explosions"
                ]
              },
              radius: "radius",
              ops: [
                {
                  op: "damage",
                  amount: "damage",
                  type: "pure"
                }
              ],
              follow: true
            }
          ]
        }
      },
      {
        id: "leshrac_lightning_storm",
        valveAbilityId: 5243,
        slot: "S3",
        name: "闪电风暴",
        en: "Lightning Storm",
        engineStatus: "implemented",
        official: {
          semantic: {
            damage: 240,
            jump_count: 11,
            radius: 450,
            jump_delay: 0.25,
            movespeed_slow: 75,
            slow_duration: 1.2,
            AbilityCastRange: 600,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 140,
            AbilityCooldown: 4
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 4,
          mana: 140,
          range_wu: 330,
          startup_frames: 18,
          recovery_frames: 12,
          params: {
            damage: 240,
            jump_count: 11,
            radius: 450,
            jump_delay: 0.25,
            movespeed_slow: 75,
            slow_duration: 1.2,
            AbilityCastRange: 600,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 140,
            AbilityCooldown: 4
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "damage",
              amount: "damage"
            },
            {
              op: "status",
              duration: "slow_duration",
              values: {
                moveSlow: {
                  div: [
                    "movespeed_slow",
                    100
                  ]
                }
              }
            }
          ]
        }
      },
      {
        id: "leshrac_pulse_nova",
        valveAbilityId: 5244,
        slot: "S4",
        name: "脉冲新星",
        en: "Pulse Nova",
        engineStatus: "implemented",
        official: {
          semantic: {
            mana_cost_per_second: 60,
            radius: 500,
            damage: 180,
            AbilityManaCost: 70,
            AbilityCooldown: 1
          },
          rank: 3
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "magical",
          cooldown_s: 1,
          mana: 70,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            mana_cost_per_second: 60,
            radius: 500,
            damage: 180,
            AbilityManaCost: 70,
            AbilityCooldown: 1
          },
          toggle: true
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "toggle",
              values: {
                pulseToggle: true
              },
              tick: {
                interval: 1,
                ops: [
                  {
                    op: "upkeepPulse",
                    cost: "mana_cost_per_second",
                    radius: "radius",
                    ops: [
                      {
                        op: "damage",
                        amount: "damage"
                      }
                    ]
                  }
                ]
              }
            }
          ],
          toggle: true
        }
      }
    ],
    innates: []
  },
  {
    id: "valve_57",
    registryNumericId: 55,
    valveHeroId: 57,
    key: "omniknight",
    name: "全能骑士",
    en: "Omniknight",
    packKey: "r20_55",
    hp: 1763,
    mana_regen: 2.6850000400000003,
    attack: 111,
    move_speed: 248,
    attack_range: 90,
    attack_interval_s: 1.18137595552467,
    combatHp: 1763,
    combatMana: 719,
    color: "#94b8d6",
    arenaStats: {
      str: 74.7,
      agi: 43.9,
      int: 53.7
    },
    abilities: [
      {
        id: "omniknight_purification",
        valveAbilityId: 5263,
        slot: "S1",
        name: "洗礼",
        en: "Purification",
        engineStatus: "implemented",
        official: {
          semantic: {
            heal: 300,
            radius: 260,
            recast_delay: 0,
            recast_effectiveness_pct: 0,
            AbilityCastRange: 700,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 135,
            AbilityCooldown: 12
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "pure",
          cooldown_s: 12,
          mana: 135,
          range_wu: 385.00000000000006,
          startup_frames: 12,
          recovery_frames: 12,
          params: {
            heal: 300,
            radius: 260,
            recast_delay: 0,
            recast_effectiveness_pct: 0,
            AbilityCastRange: 700,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 135,
            AbilityCooldown: 12
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "heal",
              to: "self",
              amount: "heal"
            },
            {
              op: "damage",
              amount: "heal",
              type: "pure",
              radius: "radius"
            }
          ]
        }
      },
      {
        id: "omniknight_martyr",
        valveAbilityId: 895,
        slot: "S2",
        name: "驱逐",
        en: "Repel",
        engineStatus: "implemented",
        official: {
          semantic: {
            base_hpregen: 20,
            duration: 5,
            magic_resist: 60,
            AbilityCastRange: 700,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 135,
            AbilityCooldown: 25
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 25,
          mana: 135,
          range_wu: 385.00000000000006,
          startup_frames: 18,
          recovery_frames: 12,
          params: {
            base_hpregen: 20,
            duration: 5,
            magic_resist: 60,
            AbilityCastRange: 700,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 135,
            AbilityCooldown: 25
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "status",
              to: "self",
              duration: "duration",
              values: {
                debuffImmune: true,
                magicResist: {
                  div: [
                    "magic_resist",
                    100
                  ]
                }
              },
              tick: {
                interval: 1,
                ops: [
                  {
                    op: "heal",
                    to: "self",
                    amount: "base_hpregen"
                  }
                ]
              }
            }
          ]
        }
      },
      {
        id: "omniknight_hammer_of_purity",
        valveAbilityId: 656,
        slot: "S3",
        name: "纯洁之锤",
        en: "Hammer of Purity",
        engineStatus: "implemented",
        official: {
          semantic: {
            base_damage: 90,
            bonus_damage: 85,
            heal_pct: 40,
            heal_duration: 4,
            total_ticks: 4,
            attack_cooldown: -1,
            attack_range_bonus: 75,
            duration: 0.2,
            movement_slow: 75,
            AbilityCastRange: 150,
            AbilityCooldown: 4
          },
          rank: 4
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "pure",
          cooldown_s: 4,
          mana: 0,
          range_wu: 82.5,
          startup_frames: 0,
          recovery_frames: 12,
          params: {
            base_damage: 90,
            bonus_damage: 85,
            heal_pct: 40,
            heal_duration: 4,
            total_ticks: 4,
            attack_cooldown: -1,
            attack_range_bonus: 75,
            duration: 0.2,
            movement_slow: 75,
            AbilityCastRange: 150,
            AbilityCooldown: 4
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "enemy",
          ops: [
            {
              op: "damage",
              amount: {
                add: [
                  "base_damage",
                  {
                    mul: [
                      {
                        stat: "baseAttack"
                      },
                      {
                        div: [
                          "bonus_damage",
                          100
                        ]
                      }
                    ]
                  }
                ]
              },
              type: "pure"
            },
            {
              op: "status",
              duration: "duration",
              values: {
                moveSlow: {
                  div: [
                    "movement_slow",
                    100
                  ]
                }
              }
            },
            {
              op: "status",
              to: "self",
              duration: "heal_duration",
              values: {},
              tick: {
                interval: {
                  div: [
                    "heal_duration",
                    "total_ticks"
                  ]
                },
                ops: [
                  {
                    op: "heal",
                    to: "self",
                    amount: {
                      div: [
                        {
                          mul: [
                            {
                              add: [
                                "base_damage",
                                {
                                  mul: [
                                    {
                                      stat: "baseAttack"
                                    },
                                    {
                                      div: [
                                        "bonus_damage",
                                        100
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              div: [
                                "heal_pct",
                                100
                              ]
                            }
                          ]
                        },
                        "total_ticks"
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        id: "omniknight_guardian_angel",
        valveAbilityId: 5266,
        slot: "S4",
        name: "守护天使",
        en: "Guardian Angel",
        engineStatus: "implemented",
        official: {
          semantic: {
            duration: 5.5,
            radius: 700,
            is_global: 0,
            affects_buildings: 0,
            heal_and_regen_amp: 0,
            model_scale: 15,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 225,
            AbilityCooldown: 80
          },
          rank: 3
        },
        mvp: {
          effect: "r20_55_extension",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 80,
          mana: 225,
          range_wu: 0,
          startup_frames: 24,
          recovery_frames: 12,
          params: {
            duration: 5.5,
            radius: 700,
            is_global: 0,
            affects_buildings: 0,
            heal_and_regen_amp: 0,
            model_scale: 15,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 225,
            AbilityCooldown: 80
          }
        },
        recipe: {
          status: "implemented_adapted",
          target: "self",
          ops: [
            {
              op: "status",
              to: "self",
              duration: "duration",
              values: {
                physicalImmune: true
              },
              dispel: "none"
            }
          ]
        }
      }
    ],
    innates: []
  },
  {
    id: "valve_59",
    registryNumericId: 57,
    valveHeroId: 59,
    key: "huskar",
    name: "哈斯卡",
    en: "Huskar",
    packKey: "c56_90",
    hp: 670,
    mana_regen: 0.90000004,
    attack: 103,
    move_speed: 232,
    attack_range: 220.00000000000003,
    attack_interval_s: 1.1808118081180812,
    combatHp: 1876,
    combatMana: 216,
    color: "#67c8be",
    attributes18: {
      str: 79.8,
      agi: 35.5,
      int: 18
    },
    primaryAttribute: 0,
    abilities: [
      {
        id: "huskar_inner_fire",
        valveAbilityId: 7300,
        slot: "S1",
        name: "心炎",
        en: "Inner Fire",
        official: {
          params: {
            health_cost: 150,
            damage: 320,
            radius: 500,
            disarm_duration: 3,
            knockback_distance: 400,
            min_knockback_distance: 25,
            knockback_duration: 1,
            min_knockback_duration: 0.4,
            AbilityCastRange: 500,
            AbilityCastPoint: 0.35,
            AbilityCooldown: 11
          },
          semantic: {
            health_cost: 150,
            damage: 320,
            radius: 500,
            disarm_duration: 3,
            knockback_distance: 400,
            min_knockback_distance: 25,
            knockback_duration: 1,
            min_knockback_duration: 0.4,
            AbilityCastRange: 500,
            AbilityCastPoint: 0.35,
            AbilityCooldown: 11
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 11,
          mana: 0,
          range_wu: 275,
          startup_frames: 21,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "huskar_burning_spear",
        valveAbilityId: 5272,
        slot: "S2",
        name: "沸血之矛",
        en: "Burning Spear",
        official: {
          params: {
            max_health_cost: 2,
            burn_damage: 16,
            burn_damage_max_pct: 0.5,
            duration: 9,
            AbilityCastRange: 450
          },
          semantic: {
            max_health_cost: 2,
            burn_damage: 16,
            burn_damage_max_pct: 0.5,
            duration: 9,
            AbilityCastRange: 450
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 0,
          mana: 0,
          range_wu: 247.50000000000003,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "huskar_berserkers_blood",
        valveAbilityId: 5273,
        slot: "S3",
        name: "狂战士之血",
        en: "Berserker's Blood",
        official: {
          params: {
            maximum_attack_speed: 320,
            maximum_health_regen: 70,
            maximum_magic_resist: 30,
            hp_threshold_max: 10,
            activatable: 0,
            activation_healthcost_pct: 0,
            activation_cooldown: 0,
            activation_delay: 0,
            activation_heal_pct_per_debuff: 0
          },
          semantic: {
            maximum_attack_speed: 320,
            maximum_health_regen: 70,
            maximum_magic_resist: 30,
            hp_threshold_max: 10,
            activatable: 0,
            activation_healthcost_pct: 0,
            activation_cooldown: 0,
            activation_delay: 0,
            activation_heal_pct_per_debuff: 0
          },
          damageType: "none"
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "none",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "huskar_life_break",
        valveAbilityId: 5274,
        slot: "R",
        name: "牺牲",
        en: "Life Break",
        official: {
          params: {
            health_cost_percent: 0.44,
            health_damage: 0.44,
            charge_speed: 1200,
            tooltip_health_damage: 44,
            tooltip_health_cost_percent: 44,
            movespeed: -60,
            attack_speed: 140,
            slow_duration_tooltip: 5,
            taunt_duration: 0,
            cast_range_bonus: 0,
            immunity_resist: 60,
            AbilityCastRange: 550,
            AbilityDuration: 5,
            AbilityCastPoint: 0.3,
            AbilityCooldown: 12
          },
          semantic: {
            health_cost_percent: 0.44,
            health_damage: 0.44,
            charge_speed: 1200,
            tooltip_health_damage: 44,
            tooltip_health_cost_percent: 44,
            movespeed: -60,
            attack_speed: 140,
            slow_duration_tooltip: 5,
            taunt_duration: 0,
            cast_range_bonus: 0,
            immunity_resist: 60,
            AbilityCastRange: 550,
            AbilityDuration: 5,
            AbilityCastPoint: 0.3,
            AbilityCooldown: 12
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 12,
          mana: 0,
          range_wu: 302.5,
          startup_frames: 18,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_60",
    registryNumericId: 58,
    valveHeroId: 60,
    key: "night",
    name: "暗夜魔王",
    en: "Night Stalker",
    packKey: "c56_90",
    hp: 624,
    mana_regen: 2.3600000000000003,
    attack: 116,
    move_speed: 236,
    attack_range: 100,
    attack_interval_s: 1.093951093951094,
    combatHp: 1748,
    combatMana: 581,
    color: "#67c8be",
    attributes18: {
      str: 74,
      agi: 55.400000000000006,
      int: 42.2
    },
    primaryAttribute: 0,
    abilities: [
      {
        id: "night_stalker_void",
        valveAbilityId: 5275,
        slot: "S1",
        name: "虚空",
        en: "Void",
        official: {
          params: {
            damage: 320,
            duration_day: 1.25,
            duration_night: 3.4,
            movespeed_slow: 50,
            attackspeed_slow: 50,
            invisible_damage_pers: 0,
            invisible_damage_tickrate: 0.1,
            max_level: 4,
            max_level_tooltip: 0,
            cast_radius: 0,
            cast_radius_tooltip: 0,
            AbilityCastRange: 525,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 105,
            AbilityCooldown: 8
          },
          semantic: {
            damage: 320,
            duration_day: 1.25,
            duration_night: 3.4,
            movespeed_slow: 50,
            attackspeed_slow: 50,
            invisible_damage_pers: 0,
            invisible_damage_tickrate: 0.1,
            max_level: 4,
            max_level_tooltip: 0,
            cast_radius: 0,
            cast_radius_tooltip: 0,
            AbilityCastRange: 525,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 105,
            AbilityCooldown: 8
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 8,
          mana: 105,
          range_wu: 288.75,
          startup_frames: 18,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "night_stalker_crippling_fear",
        valveAbilityId: 5276,
        slot: "S2",
        name: "伤残恐惧",
        en: "Crippling Fear",
        official: {
          params: {
            duration_day: 3,
            duration_night: 6,
            mana_interval: 1,
            radius: 350,
            dps: 40,
            tick_rate: 0.1,
            AbilityManaCost: 50,
            AbilityCooldown: 15
          },
          semantic: {
            duration_day: 3,
            duration_night: 6,
            mana_interval: 1,
            radius: 350,
            dps: 40,
            tick_rate: 0.1,
            AbilityManaCost: 50,
            AbilityCooldown: 15
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 15,
          mana: 50,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "night_stalker_midnight_feast",
        valveAbilityId: 1753,
        slot: "S3",
        name: "午夜盛宴",
        en: "Midnight Feast",
        official: {
          params: {
            attack_heal: 24,
            hp_restore: 25,
            mp_restore: 16,
            AbilityCastRange: 125,
            AbilityCooldown: 30
          },
          semantic: {
            attack_heal: 24,
            hp_restore: 25,
            mp_restore: 16,
            AbilityCastRange: 125,
            AbilityCooldown: 30
          },
          damageType: "none"
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "none",
          cooldown_s: 30,
          mana: 0,
          range_wu: 68.75,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "night_stalker_darkness",
        valveAbilityId: 5278,
        slot: "R",
        name: "黑暗飞升",
        en: "Dark Ascension",
        official: {
          params: {
            duration: 30,
            bonus_damage: 150,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 225,
            AbilityCooldown: 130
          },
          semantic: {
            duration: 30,
            bonus_damage: 150,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 225,
            AbilityCooldown: 130
          },
          damageType: "physical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 130,
          mana: 225,
          range_wu: 0,
          startup_frames: 18,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_64",
    registryNumericId: 62,
    valveHeroId: 64,
    key: "jakiro",
    name: "杰奇洛",
    en: "Jakiro",
    packKey: "c56_90",
    hp: 587,
    mana_regen: 4.1050001,
    attack: 113,
    move_speed: 232,
    attack_range: 220.00000000000003,
    attack_interval_s: 1.2555391432791727,
    combatHp: 1642,
    combatMana: 1060,
    color: "#67c8be",
    attributes18: {
      str: 69.2,
      agi: 35.4,
      int: 82.1
    },
    primaryAttribute: 2,
    abilities: [
      {
        id: "jakiro_dual_breath",
        valveAbilityId: 5297,
        slot: "S1",
        name: "冰火交加",
        en: "Dual Breath",
        official: {
          params: {
            start_radius: 150,
            end_radius: 275,
            speed: 1050,
            fire_delay: 0.2,
            burn_damage: 80,
            slow_movement_speed_pct: -40,
            slow_attack_speed_pct: -40,
            speed_fire: 1050,
            AbilityCastRange: 850,
            AbilityDuration: 5,
            AbilityCastPoint: 0.35,
            AbilityManaCost: 180,
            AbilityCooldown: 9
          },
          semantic: {
            start_radius: 150,
            end_radius: 275,
            speed: 1050,
            fire_delay: 0.2,
            burn_damage: 80,
            slow_movement_speed_pct: -40,
            slow_attack_speed_pct: -40,
            speed_fire: 1050,
            AbilityCastRange: 850,
            AbilityDuration: 5,
            AbilityCastPoint: 0.35,
            AbilityManaCost: 180,
            AbilityCooldown: 9
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 9,
          mana: 180,
          range_wu: 467.50000000000006,
          startup_frames: 21,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "jakiro_ice_path",
        valveAbilityId: 5298,
        slot: "S2",
        name: "冰封路径",
        en: "Ice Path",
        official: {
          params: {
            path_delay: 0.2,
            stun_duration: 2,
            path_duration: 4.5,
            path_radius: 150,
            damage: 50,
            AbilityCastRange: 1100,
            AbilityCastPoint: 0.65,
            AbilityManaCost: 100,
            AbilityCooldown: 11
          },
          semantic: {
            path_delay: 0.2,
            stun_duration: 2,
            path_duration: 4.5,
            path_radius: 150,
            damage: 50,
            AbilityCastRange: 1100,
            AbilityCastPoint: 0.65,
            AbilityManaCost: 100,
            AbilityCooldown: 11
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 11,
          mana: 100,
          range_wu: 605,
          startup_frames: 39,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "jakiro_liquid_fire",
        valveAbilityId: 5299,
        slot: "S3",
        name: "液态火",
        en: "Liquid Fire",
        official: {
          params: {
            slow_attack_speed_pct: -60,
            radius: 300,
            damage: 48,
            tick_rate: 0.5,
            building_dmg_pct: 75,
            shares_cooldown: 1,
            AbilityCastRange: 600,
            AbilityDuration: 5,
            AbilityManaCost: 20,
            AbilityCooldown: 4
          },
          semantic: {
            slow_attack_speed_pct: -60,
            radius: 300,
            damage: 48,
            tick_rate: 0.5,
            building_dmg_pct: 75,
            shares_cooldown: 1,
            AbilityCastRange: 600,
            AbilityDuration: 5,
            AbilityManaCost: 20,
            AbilityCooldown: 4
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 4,
          mana: 20,
          range_wu: 330,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "jakiro_macropyre",
        valveAbilityId: 5300,
        slot: "R",
        name: "烈焰焚身",
        en: "Macropyre",
        official: {
          params: {
            damage: 200,
            path_width: 500,
            duration: 10,
            burn_interval: 0.5,
            linger_duration: 1,
            pure_damage_type: 0,
            pierces_magic_immunity: 0,
            ice_edge_path_radius: 0,
            ice_edge_path_offset: 0,
            ice_edge_linger_duration: 0,
            ice_edge_movement_slow: 0,
            AbilityCastRange: 1400,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 425,
            AbilityCooldown: 70
          },
          semantic: {
            damage: 200,
            path_width: 500,
            duration: 10,
            burn_interval: 0.5,
            linger_duration: 1,
            pure_damage_type: 0,
            pierces_magic_immunity: 0,
            ice_edge_path_radius: 0,
            ice_edge_path_offset: 0,
            ice_edge_linger_duration: 0,
            ice_edge_movement_slow: 0,
            AbilityCastRange: 1400,
            AbilityCastPoint: 0.4,
            AbilityManaCost: 425,
            AbilityCooldown: 70
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 70,
          mana: 425,
          range_wu: 770.0000000000001,
          startup_frames: 24,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_73",
    registryNumericId: 71,
    valveHeroId: 73,
    key: "alchemist",
    name: "炼金术士",
    en: "Alchemist",
    packKey: "c56_90",
    hp: 584,
    mana_regen: 2.7800000000000002,
    attack: 99,
    move_speed: 232,
    attack_range: 100,
    attack_interval_s: 1.1764705882352942,
    combatHp: 1636,
    combatMana: 742,
    color: "#67c8be",
    attributes18: {
      str: 68.9,
      agi: 44.5,
      int: 55.6
    },
    primaryAttribute: 0,
    abilities: [
      {
        id: "alchemist_acid_spray",
        valveAbilityId: 5365,
        slot: "S1",
        name: "酸性喷雾",
        en: "Acid Spray",
        official: {
          params: {
            radius: 500,
            duration: 15,
            damage: 40,
            armor_reduction: 6,
            tick_rate: 1,
            AbilityCastRange: 900,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 120,
            AbilityCooldown: 21
          },
          semantic: {
            radius: 500,
            duration: 15,
            damage: 40,
            armor_reduction: 6,
            tick_rate: 1,
            AbilityCastRange: 900,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 120,
            AbilityCooldown: 21
          },
          damageType: "physical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 21,
          mana: 120,
          range_wu: 495.00000000000006,
          startup_frames: 6,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "alchemist_unstable_concoction",
        valveAbilityId: 5366,
        slot: "S2",
        name: "不稳定化合物",
        en: "Unstable Concoction",
        official: {
          params: {
            brew_time: 5,
            brew_explosion: 5.5,
            min_stun: 0.25,
            max_stun: 3.2,
            max_damage: 360,
            radius: 250,
            move_speed: 16,
            AbilityCastRange: 775,
            AbilityManaCost: 100,
            AbilityCooldown: 17
          },
          semantic: {
            brew_time: 5,
            brew_explosion: 5.5,
            min_stun: 0.25,
            max_stun: 3.2,
            max_damage: 360,
            radius: 250,
            move_speed: 16,
            AbilityCastRange: 775,
            AbilityManaCost: 100,
            AbilityCooldown: 17
          },
          damageType: "physical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 17,
          mana: 100,
          range_wu: 426.25000000000006,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "alchemist_corrosive_weaponry",
        valveAbilityId: 1116,
        slot: "S3",
        name: "腐蚀兵械",
        en: "Corrosive Weaponry",
        official: {
          params: {
            max_stacks: 16,
            debuff_duration: 4,
            slow_per_stack: 4,
            attack_dmg_per_stack: 4,
            stacks_per_attack: 2,
            one_tooltip: 1
          },
          semantic: {
            max_stacks: 16,
            debuff_duration: 4,
            slow_per_stack: 4,
            attack_dmg_per_stack: 4,
            stacks_per_attack: 2,
            one_tooltip: 1
          },
          damageType: "none"
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "none",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "alchemist_chemical_rage",
        valveAbilityId: 5369,
        slot: "R",
        name: "化学狂暴",
        en: "Chemical Rage",
        official: {
          params: {
            duration: 30,
            transformation_time: 0.35,
            base_attack_time: 1,
            bonus_health_regen: 120,
            bonus_movespeed: 40,
            AbilityManaCost: 100,
            AbilityCooldown: 60
          },
          semantic: {
            duration: 30,
            transformation_time: 0.35,
            base_attack_time: 1,
            bonus_health_regen: 120,
            bonus_movespeed: 40,
            AbilityManaCost: 100,
            AbilityCooldown: 60
          },
          damageType: "none"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 60,
          mana: 100,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_83",
    registryNumericId: 81,
    valveHeroId: 83,
    key: "treant",
    name: "树精卫士",
    en: "Treant Protector",
    packKey: "c56_90",
    hp: 693,
    mana_regen: 2.6300000000000003,
    attack: 147,
    move_speed: 224,
    attack_range: 100,
    attack_interval_s: 1.304945054945055,
    combatHp: 1942,
    combatMana: 646,
    color: "#67c8be",
    attributes18: {
      str: 82.8,
      agi: 45.6,
      int: 47.6
    },
    primaryAttribute: 0,
    abilities: [
      {
        id: "treant_natures_grasp",
        valveAbilityId: 338,
        slot: "S1",
        name: "自然卷握",
        en: "Nature's Grasp",
        official: {
          params: {
            damage_per_second: 80,
            creep_penalty: 35,
            movement_slow: 40,
            vines_duration: 12,
            creation_interval: 0.1,
            initial_latch_delay: 0.3,
            vine_spawn_interval: 175,
            latch_range: 135,
            latch_vision: 150,
            AbilityCastRange: 1500,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 90,
            AbilityCooldown: 17
          },
          semantic: {
            damage_per_second: 80,
            creep_penalty: 35,
            movement_slow: 40,
            vines_duration: 12,
            creation_interval: 0.1,
            initial_latch_delay: 0.3,
            vine_spawn_interval: 175,
            latch_range: 135,
            latch_vision: 150,
            AbilityCastRange: 1500,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 90,
            AbilityCooldown: 17
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 17,
          mana: 90,
          range_wu: 825.0000000000001,
          startup_frames: 12,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "treant_leech_seed",
        valveAbilityId: 5435,
        slot: "S2",
        name: "寄生种子",
        en: "Leech Seed",
        official: {
          params: {
            duration: 1.5,
            flat_heal: 45,
            leech_heal: 25,
            leech_damage: 80,
            max_heal_units: 5,
            radius: 650,
            healing_pulse_count: 2,
            projectile_speed: 450,
            AbilityCastRange: 150,
            AbilityManaCost: 35,
            AbilityCooldown: 6
          },
          semantic: {
            duration: 1.5,
            flat_heal: 45,
            leech_heal: 25,
            leech_damage: 80,
            max_heal_units: 5,
            radius: 650,
            healing_pulse_count: 2,
            projectile_speed: 450,
            AbilityCastRange: 150,
            AbilityManaCost: 35,
            AbilityCooldown: 6
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 6,
          mana: 35,
          range_wu: 82.5,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "treant_living_armor",
        valveAbilityId: 5436,
        slot: "S3",
        name: "活体护甲",
        en: "Living Armor",
        official: {
          params: {
            heal_per_second: 13,
            duration: 12,
            damage_block_base: 120,
            passive_reset_cd: 0,
            damage_block_loss: 20,
            damage_block_threshold: 10,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 80,
            AbilityCooldown: 15
          },
          semantic: {
            heal_per_second: 13,
            duration: 12,
            damage_block_base: 120,
            passive_reset_cd: 0,
            damage_block_loss: 20,
            damage_block_threshold: 10,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 80,
            AbilityCooldown: 15
          },
          damageType: "none"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 15,
          mana: 80,
          range_wu: 0,
          startup_frames: 18,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "treant_overgrowth",
        valveAbilityId: 5437,
        slot: "R",
        name: "疯狂生长",
        en: "Overgrowth",
        official: {
          params: {
            duration: 5,
            radius: 800,
            damage: 95,
            bloom_duration: 0,
            strength_bonus: 0,
            splash_pct: 0,
            splash_radius: 0,
            movement_speed: 0,
            AbilityCastPoint: 0.5,
            AbilityManaCost: 300,
            AbilityCooldown: 90
          },
          semantic: {
            duration: 5,
            radius: 800,
            damage: 95,
            bloom_duration: 0,
            strength_bonus: 0,
            splash_pct: 0,
            splash_radius: 0,
            movement_speed: 0,
            AbilityCastPoint: 0.5,
            AbilityManaCost: 300,
            AbilityCooldown: 90
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 90,
          mana: 300,
          range_wu: 0,
          startup_frames: 30,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_84",
    registryNumericId: 82,
    valveHeroId: 84,
    key: "ogre",
    name: "食人魔魔法师",
    en: "Ogre Magi",
    packKey: "c56_90",
    hp: 781,
    mana_regen: 0,
    attack: 142,
    move_speed: 232,
    attack_range: 100,
    attack_interval_s: 1.2186379928315412,
    combatHp: 2188,
    combatMana: 120,
    color: "#67c8be",
    attributes18: {
      str: 94,
      agi: 39.5,
      int: 0
    },
    primaryAttribute: 0,
    abilities: [
      {
        id: "ogre_magi_fireblast",
        valveAbilityId: 5438,
        slot: "S1",
        name: "火焰爆轰",
        en: "Fireblast",
        official: {
          params: {
            stun_duration: 1.2,
            multicast_delay: 0.6,
            fireblast_damage: 250,
            bonus_cast_speed: 0,
            AbilityCastRange: 525,
            AbilityCastPoint: 0.45,
            AbilityManaCost: 115,
            AbilityCooldown: 8
          },
          semantic: {
            stun_duration: 1.2,
            multicast_delay: 0.6,
            fireblast_damage: 250,
            bonus_cast_speed: 0,
            AbilityCastRange: 525,
            AbilityCastPoint: 0.45,
            AbilityManaCost: 115,
            AbilityCooldown: 8
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 8,
          mana: 115,
          range_wu: 288.75,
          startup_frames: 27,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "ogre_magi_ignite",
        valveAbilityId: 5439,
        slot: "S2",
        name: "引燃",
        en: "Ignite",
        official: {
          params: {
            duration: 8,
            burn_damage: 50,
            slow_movement_speed_pct: -25,
            projectile_speed: 1e3,
            multicast_delay: 0.6,
            ignite_multicast_aoe: 1400,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.35,
            AbilityManaCost: 110,
            AbilityCooldown: 17
          },
          semantic: {
            duration: 8,
            burn_damage: 50,
            slow_movement_speed_pct: -25,
            projectile_speed: 1e3,
            multicast_delay: 0.6,
            ignite_multicast_aoe: 1400,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.35,
            AbilityManaCost: 110,
            AbilityCooldown: 17
          },
          damageType: "magical"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 17,
          mana: 110,
          range_wu: 550,
          startup_frames: 21,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "ogre_magi_bloodlust",
        valveAbilityId: 5440,
        slot: "S3",
        name: "嗜血术",
        en: "Bloodlust",
        official: {
          params: {
            modelscale: 25,
            bonus_movement_speed: 12,
            bonus_attack_speed: 80,
            self_bonus: 100,
            duration: 30,
            multicast_bloodlust_aoe: 700,
            AbilityCastRange: 650,
            AbilityCastPoint: 0.45,
            AbilityManaCost: 70,
            AbilityCooldown: 14
          },
          semantic: {
            modelscale: 25,
            bonus_movement_speed: 12,
            bonus_attack_speed: 80,
            self_bonus: 100,
            duration: 30,
            multicast_bloodlust_aoe: 700,
            AbilityCastRange: 650,
            AbilityCastPoint: 0.45,
            AbilityManaCost: 70,
            AbilityCooldown: 14
          },
          damageType: "none"
        },
        mvp: {
          effect: "c56_90",
          passive: false,
          input: "tap",
          damage: 0,
          damage_type: "none",
          cooldown_s: 14,
          mana: 70,
          range_wu: 357.50000000000006,
          startup_frames: 27,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      },
      {
        id: "ogre_magi_multicast",
        valveAbilityId: 5441,
        slot: "R",
        name: "多重施法",
        en: "Multicast",
        official: {
          params: {
            multicast_2_times: 75,
            multicast_3_times: 30,
            multicast_4_times: 15,
            strength_for_one_pct: 16,
            one_tooltip: 1
          },
          semantic: {
            multicast_2_times: 75,
            multicast_3_times: 30,
            multicast_4_times: 15,
            strength_for_one_pct: 16,
            one_tooltip: 1
          },
          damageType: "none"
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          damage: 0,
          damage_type: "none",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_96",
    registryNumericId: 94,
    valveHeroId: 96,
    key: "centaur",
    name: "半人马战行者",
    en: "Centaur Warrunner",
    packKey: "r91",
    hp: 1200,
    mana_regen: 8,
    attack: 63,
    move_speed: 162.25,
    attack_range: 82.5,
    attack_interval_s: 1.7,
    combatHp: 3360,
    combatMana: 1600,
    color: "#98b7d4",
    attributes18: {
      str: 101.1,
      agi: 32,
      int: 42.2
    },
    primaryAttribute: 0,
    abilities: [
      {
        id: "centaur_hoof_stomp",
        valveAbilityId: 5514,
        slot: "S1",
        name: "马蹄践踏",
        en: "Hoof Stomp",
        official: {
          params: {
            radius: 325,
            stomp_damage: 280,
            stun_duration: 2.2,
            windup_time: 0.5,
            AbilityManaCost: 130,
            AbilityCooldown: 12
          },
          semantic: {
            radius: 325,
            stomp_damage: 280,
            stun_duration: 2.2,
            windup_time: 0.5,
            AbilityManaCost: 130,
            AbilityCooldown: 12
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 1,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 12,
          mana: 130,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "centaur_double_edge",
        valveAbilityId: 5515,
        slot: "S2",
        name: "双刃剑",
        en: "Double Edge",
        official: {
          params: {
            edge_damage: 300,
            strength_damage: 150,
            radius: 220,
            shard_str_pct: 0,
            shard_str_duration: 0,
            shard_max_stacks: 0,
            shard_movement_slow: 0,
            shard_movement_slow_duration: 0,
            AbilityCastRange: 175,
            AbilityCastPoint: 0.25,
            AbilityCooldown: 3.5
          },
          semantic: {
            edge_damage: 300,
            strength_damage: 150,
            radius: 220,
            shard_str_pct: 0,
            shard_str_duration: 0,
            shard_max_stacks: 0,
            shard_movement_slow: 0,
            shard_movement_slow_duration: 0,
            AbilityCastRange: 175,
            AbilityCastPoint: 0.25,
            AbilityCooldown: 3.5
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 0,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 3.5,
          mana: 0,
          range_wu: 96.25000000000001,
          startup_frames: 15,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "centaur_return",
        valveAbilityId: 5516,
        slot: "S3",
        name: "反伤",
        en: "Retaliate",
        official: {
          params: {
            return_damage: 45,
            return_damage_str: 35,
            aura_radius: 1200
          },
          semantic: {
            return_damage: 45,
            return_damage_str: 35,
            aura_radius: 1200
          },
          damageType: "physical",
          immunityRaw: 3,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "physical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "centaur_stampede",
        valveAbilityId: 5517,
        slot: "S4",
        name: "奔袭冲撞",
        en: "Stampede",
        official: {
          params: {
            duration: 4.5,
            scepter_bonus_duration: 0,
            strength_damage: 3,
            slow_duration: 3,
            radius: 105,
            slow_movement_speed: 100,
            AbilityManaCost: 250,
            AbilityCooldown: 90
          },
          semantic: {
            duration: 4.5,
            scepter_bonus_duration: 0,
            strength_damage: 3,
            slow_duration: 3,
            radius: 105,
            slow_movement_speed: 100,
            AbilityManaCost: 250,
            AbilityCooldown: 90
          },
          damageType: "magical",
          immunityRaw: 5,
          dispellableRaw: 3,
          rank: 3,
          maxLevel: 3
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 90,
          mana: 250,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_101",
    registryNumericId: 99,
    valveHeroId: 101,
    key: "skywrath_mage",
    name: "天怒法师",
    en: "Skywrath Mage",
    packKey: "r91",
    hp: 1200,
    mana_regen: 8,
    attack: 46,
    move_speed: 178.75000000000003,
    attack_range: 343.75,
    attack_interval_s: 1.7,
    combatHp: 3360,
    combatMana: 1600,
    color: "#98b7d4",
    attributes18: {
      str: 56,
      agi: 26.6,
      int: 94.69999999999999
    },
    primaryAttribute: 2,
    abilities: [
      {
        id: "skywrath_mage_arcane_bolt",
        valveAbilityId: 5581,
        slot: "S1",
        name: "奥法鹰隼",
        en: "Arcane Bolt",
        official: {
          params: {
            bolt_speed: 500,
            bolt_vision: 325,
            bolt_damage: 150,
            int_multiplier: 1.5,
            vision_duration: 3.34,
            extra_bolt_search_radius: 500,
            total_bolt_count: 1,
            AbilityCastRange: 875,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 70,
            AbilityCooldown: 2
          },
          semantic: {
            bolt_speed: 500,
            bolt_vision: 325,
            bolt_damage: 150,
            int_multiplier: 1.5,
            vision_duration: 3.34,
            extra_bolt_search_radius: 500,
            total_bolt_count: 1,
            AbilityCastRange: 875,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 70,
            AbilityCooldown: 2
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 0,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 2,
          mana: 70,
          range_wu: 481.25000000000006,
          startup_frames: 6,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "skywrath_mage_concussive_shot",
        valveAbilityId: 5582,
        slot: "S2",
        name: "震荡光弹",
        en: "Concussive Shot",
        official: {
          params: {
            launch_radius: 1600,
            slow_radius: 250,
            speed: 800,
            damage: 300,
            slow_duration: 4,
            movement_speed_pct: 40,
            shot_vision: 300,
            vision_duration: 3.34,
            scepter_radius: 0,
            AbilityCastRange: 1600,
            AbilityManaCost: 95,
            AbilityCooldown: 12
          },
          semantic: {
            launch_radius: 1600,
            slow_radius: 250,
            speed: 800,
            damage: 300,
            slow_duration: 4,
            movement_speed_pct: 40,
            shot_vision: 300,
            vision_duration: 3.34,
            scepter_radius: 0,
            AbilityCastRange: 1600,
            AbilityManaCost: 95,
            AbilityCooldown: 12
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 12,
          mana: 95,
          range_wu: 880.0000000000001,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "skywrath_mage_ancient_seal",
        valveAbilityId: 5583,
        slot: "S3",
        name: "上古封印",
        en: "Ancient Seal",
        official: {
          params: {
            resist_debuff: -35,
            seal_duration: 6,
            scepter_radius: 0,
            AbilityCastRange: 850,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 110,
            AbilityCooldown: 14
          },
          semantic: {
            resist_debuff: -35,
            seal_duration: 6,
            scepter_radius: 0,
            AbilityCastRange: 850,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 110,
            AbilityCooldown: 14
          },
          damageType: "none",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 14,
          mana: 110,
          range_wu: 467.50000000000006,
          startup_frames: 6,
          recovery_frames: 12,
          damage_type: "none",
          height: "both",
          blockable: false
        }
      },
      {
        id: "skywrath_mage_mystic_flare",
        valveAbilityId: 5584,
        slot: "S4",
        name: "神秘之耀",
        en: "Mystic Flare",
        official: {
          params: {
            radius: 170,
            duration: 2,
            damage: 1600,
            damage_interval: 0.1,
            scepter_radius: 0,
            AbilityCastRange: 1200,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 800,
            AbilityCooldown: 15
          },
          semantic: {
            radius: 170,
            duration: 2,
            damage: 1600,
            damage_interval: 0.1,
            scepter_radius: 0,
            AbilityCastRange: 1200,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 800,
            AbilityCooldown: 15
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 0,
          rank: 3,
          maxLevel: 3
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 15,
          mana: 800,
          range_wu: 660,
          startup_frames: 6,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_106",
    registryNumericId: 104,
    valveHeroId: 106,
    key: "ember_spirit",
    name: "灰烬之灵",
    en: "Ember Spirit",
    packKey: "r91",
    hp: 1200,
    mana_regen: 8,
    attack: 53,
    move_speed: 162.25,
    attack_range: 82.5,
    attack_interval_s: 1.7,
    combatHp: 3360,
    combatMana: 1600,
    color: "#98b7d4",
    attributes18: {
      str: 63.5,
      agi: 75.4,
      int: 57.400000000000006
    },
    primaryAttribute: 1,
    abilities: [
      {
        id: "ember_spirit_searing_chains",
        valveAbilityId: 5603,
        slot: "S1",
        name: "炎阳索",
        en: "Searing Chains",
        official: {
          params: {
            duration: 2.75,
            radius: 400,
            damage_per_second: 100,
            tick_interval: 0.5,
            unit_count: 2,
            AbilityCastRange: 400,
            AbilityManaCost: 110,
            AbilityCooldown: 10
          },
          semantic: {
            duration: 2.75,
            radius: 400,
            damage_per_second: 100,
            tick_interval: 0.5,
            unit_count: 2,
            AbilityCastRange: 400,
            AbilityManaCost: 110,
            AbilityCooldown: 10
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 10,
          mana: 110,
          range_wu: 220.00000000000003,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "ember_spirit_sleight_of_fist",
        valveAbilityId: 5604,
        slot: "S2",
        name: "无影拳",
        en: "Sleight of Fist",
        official: {
          params: {
            radius: 550,
            bonus_hero_damage: 160,
            attack_interval: 0.25,
            AbilityCastRange: 650,
            AbilityChargeRestoreTime: 7,
            AbilityManaCost: 75,
            AbilityCooldown: 7
          },
          semantic: {
            radius: 550,
            bonus_hero_damage: 160,
            attack_interval: 0.25,
            AbilityCastRange: 650,
            AbilityChargeRestoreTime: 7,
            AbilityManaCost: 75,
            AbilityCooldown: 7
          },
          damageType: "physical",
          immunityRaw: 3,
          dispellableRaw: 0,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 7,
          mana: 75,
          range_wu: 357.50000000000006,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "physical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "ember_spirit_flame_guard",
        valveAbilityId: 5605,
        slot: "S3",
        name: "烈火罩",
        en: "Flame Guard",
        official: {
          params: {
            duration: 18,
            passive_radius: 150,
            tick_interval: 0.2,
            damage_per_second: 50,
            linger_duration: 0.5,
            radius: 500,
            shield_pct_absorb: 70,
            absorb_amount: 300,
            AbilityCastRange: 400,
            AbilityManaCost: 110,
            AbilityCooldown: 32
          },
          semantic: {
            duration: 18,
            passive_radius: 150,
            tick_interval: 0.2,
            damage_per_second: 50,
            linger_duration: 0.5,
            radius: 500,
            shield_pct_absorb: 70,
            absorb_amount: 300,
            AbilityCastRange: 400,
            AbilityManaCost: 110,
            AbilityCooldown: 32
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 32,
          mana: 110,
          range_wu: 220.00000000000003,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "ember_spirit_fire_remnant",
        valveAbilityId: 5606,
        slot: "S4",
        name: "残焰",
        en: "Fire Remnant",
        official: {
          params: {
            speed_multiplier: 250,
            damage: 300,
            radius: 450,
            duration: 45,
            scepter_range: 0,
            scepter_speed_multiplier: 0,
            scepter_max_charges: 0,
            shard_charge_radius: 0,
            apply_immolation_to_remnant: 0,
            AbilityCastRange: 1400,
            AbilityCharges: 3,
            AbilityChargeRestoreTime: 35,
            AbilityCooldown: 0.5
          },
          semantic: {
            speed_multiplier: 250,
            damage: 300,
            radius: 450,
            duration: 45,
            scepter_range: 0,
            scepter_speed_multiplier: 0,
            scepter_max_charges: 0,
            shard_charge_radius: 0,
            apply_immolation_to_remnant: 0,
            AbilityCastRange: 1400,
            AbilityCharges: 3,
            AbilityChargeRestoreTime: 35,
            AbilityCooldown: 0.5
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 0,
          rank: 3,
          maxLevel: 3
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 0.5,
          mana: 0,
          range_wu: 770.0000000000001,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_108",
    registryNumericId: 106,
    valveHeroId: 108,
    key: "abyssal_underlord",
    name: "孽主",
    en: "Underlord",
    packKey: "r91",
    hp: 1200,
    mana_regen: 8,
    attack: 65,
    move_speed: 159.5,
    attack_range: 110.00000000000001,
    attack_interval_s: 1.7,
    combatHp: 3360,
    combatMana: 1600,
    color: "#98b7d4",
    attributes18: {
      str: 79.4,
      agi: 39.2,
      int: 57.099999999999994
    },
    primaryAttribute: 0,
    abilities: [
      {
        id: "abyssal_underlord_firestorm",
        valveAbilityId: 5613,
        slot: "S1",
        name: "火焰风暴",
        en: "Firestorm",
        official: {
          params: {
            radius: 425,
            wave_duration: 7,
            wave_count: 6,
            wave_damage: 105,
            wave_interval: 1,
            burn_damage: 3,
            burn_interval: 1,
            burn_duration: 2,
            can_target_units: 0,
            shard_wave_count_bonus: 0,
            shard_wave_interval_reduction: 0,
            AbilityCastRange: 675,
            AbilityCastPoint: 0.5,
            AbilityManaCost: 155,
            AbilityCooldown: 13
          },
          semantic: {
            radius: 425,
            wave_duration: 7,
            wave_count: 6,
            wave_damage: 105,
            wave_interval: 1,
            burn_damage: 3,
            burn_interval: 1,
            burn_duration: 2,
            can_target_units: 0,
            shard_wave_count_bonus: 0,
            shard_wave_interval_reduction: 0,
            AbilityCastRange: 675,
            AbilityCastPoint: 0.5,
            AbilityManaCost: 155,
            AbilityCooldown: 13
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 13,
          mana: 155,
          range_wu: 371.25000000000006,
          startup_frames: 30,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "abyssal_underlord_pit_of_malice",
        valveAbilityId: 5614,
        slot: "S2",
        name: "怨念深渊",
        en: "Pit of Malice",
        official: {
          params: {
            radius: 400,
            pit_duration: 12,
            pit_interval: 3.6,
            pit_damage: 50,
            ensnare_duration: 1.8,
            AbilityCastRange: 675,
            AbilityCastPoint: 0.25,
            AbilityManaCost: 140,
            AbilityCooldown: 15
          },
          semantic: {
            radius: 400,
            pit_duration: 12,
            pit_interval: 3.6,
            pit_damage: 50,
            ensnare_duration: 1.8,
            AbilityCastRange: 675,
            AbilityCastPoint: 0.25,
            AbilityManaCost: 140,
            AbilityCooldown: 15
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 15,
          mana: 140,
          range_wu: 371.25000000000006,
          startup_frames: 15,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "abyssal_underlord_atrophy_aura",
        valveAbilityId: 5615,
        slot: "S3",
        name: "衰退光环",
        en: "Atrophy Aura",
        official: {
          params: {
            radius: 900,
            damage_reduction_pct: 32,
            bonus_damage_from_creep: 8,
            bonus_damage_from_hero: 45,
            bonus_damage_duration: 60
          },
          semantic: {
            radius: 900,
            damage_reduction_pct: 32,
            bonus_damage_from_creep: 8,
            bonus_damage_from_hero: 45,
            bonus_damage_duration: 60
          },
          damageType: "physical",
          immunityRaw: 5,
          dispellableRaw: 3,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "physical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "abyssal_underlord_dark_portal",
        valveAbilityId: 865,
        slot: "S4",
        name: "恶魔之扉",
        en: "Fiend's Gate",
        official: {
          params: {
            duration: 20,
            minimum_distance: 1500,
            spawn_pit_on_cast: 0,
            warp_channel_duration: 3.5,
            distance_from_fountain: 1425,
            hull_radius: 8,
            gold_bounty: 40,
            xp_bounty: 40,
            AbilityManaCost: 175,
            AbilityCooldown: 100
          },
          semantic: {
            duration: 20,
            minimum_distance: 1500,
            spawn_pit_on_cast: 0,
            warp_channel_duration: 3.5,
            distance_from_fountain: 1425,
            hull_radius: 8,
            gold_bounty: 40,
            xp_bounty: 40,
            AbilityManaCost: 175,
            AbilityCooldown: 100
          },
          damageType: "none",
          immunityRaw: 0,
          dispellableRaw: 2,
          rank: 3,
          maxLevel: 3
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 100,
          mana: 175,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "none",
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_126",
    registryNumericId: 117,
    valveHeroId: 126,
    key: "void_spirit",
    name: "虚无之灵",
    en: "Void Spirit",
    packKey: "r91",
    hp: 1200,
    mana_regen: 8,
    attack: 20,
    move_speed: 159.5,
    attack_range: 110.00000000000001,
    attack_interval_s: 1.7,
    combatHp: 3360,
    combatMana: 1600,
    color: "#98b7d4",
    attributes18: {
      str: 66.2,
      agi: 58.400000000000006,
      int: 76.7
    },
    primaryAttribute: 3,
    abilities: [
      {
        id: "void_spirit_aether_remnant",
        valveAbilityId: 7701,
        slot: "S1",
        name: "残阴",
        en: "Aether Remnant",
        official: {
          params: {
            start_radius: 90,
            end_radius: 90,
            radius: 300,
            projectile_speed: 900,
            remnant_watch_distance: 450,
            remnant_watch_radius: 130,
            watch_path_vision_radius: 200,
            activation_delay: 0.4,
            impact_damage: 240,
            pull_duration: 1.6,
            pull_destination: 62,
            duration: 17,
            think_interval: 0.1,
            pierces_creeps: 0,
            damage_tick_rate: 0,
            creep_damage_pct: 0,
            truesight_range: 0,
            rotation_speed: 0,
            AbilityCastRange: 850,
            AbilityManaCost: 90,
            AbilityCooldown: 11
          },
          semantic: {
            start_radius: 90,
            end_radius: 90,
            radius: 300,
            projectile_speed: 900,
            remnant_watch_distance: 450,
            remnant_watch_radius: 130,
            watch_path_vision_radius: 200,
            activation_delay: 0.4,
            impact_damage: 240,
            pull_duration: 1.6,
            pull_destination: 62,
            duration: 17,
            think_interval: 0.1,
            pierces_creeps: 0,
            damage_tick_rate: 0,
            creep_damage_pct: 0,
            truesight_range: 0,
            rotation_speed: 0,
            AbilityCastRange: 850,
            AbilityManaCost: 90,
            AbilityCooldown: 11
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 11,
          mana: 90,
          range_wu: 467.50000000000006,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "void_spirit_dissimilate",
        valveAbilityId: 6470,
        slot: "S2",
        name: "异化",
        en: "Dissimilate",
        official: {
          params: {
            phase_duration: 1.1,
            destination_fx_radius: 183,
            portals_per_ring: 6,
            angle_per_ring_portal: 60,
            first_ring_distance_offset: 520,
            damage_radius: 275,
            AbilityDamage: 345,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 120,
            AbilityCooldown: 11
          },
          semantic: {
            phase_duration: 1.1,
            destination_fx_radius: 183,
            portals_per_ring: 6,
            angle_per_ring_portal: 60,
            first_ring_distance_offset: 520,
            damage_radius: 275,
            AbilityDamage: 345,
            AbilityCastPoint: 0.3,
            AbilityManaCost: 120,
            AbilityCooldown: 11
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 0,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 11,
          mana: 120,
          range_wu: 0,
          startup_frames: 18,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "void_spirit_resonant_pulse",
        valveAbilityId: 7710,
        slot: "S3",
        name: "共鸣脉冲",
        en: "Resonant Pulse",
        official: {
          params: {
            radius: 500,
            speed: 1200,
            damage: 210,
            buff_duration: 10,
            base_absorb_amount: 100,
            absorb_per_hero_hit: 110,
            return_projectile_speed: 900,
            max_charges: 0,
            charge_restore_time: 0,
            silence_duration_scepter: 0,
            AbilityManaCost: 130,
            AbilityCooldown: 18
          },
          semantic: {
            radius: 500,
            speed: 1200,
            damage: 210,
            buff_duration: 10,
            base_absorb_amount: 100,
            absorb_per_hero_hit: 110,
            return_projectile_speed: 900,
            max_charges: 0,
            charge_restore_time: 0,
            silence_duration_scepter: 0,
            AbilityManaCost: 130,
            AbilityCooldown: 18
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 18,
          mana: 130,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "void_spirit_astral_step",
        valveAbilityId: 7705,
        slot: "S4",
        name: "太虚之径",
        en: "Astral Step",
        official: {
          params: {
            radius: 170,
            min_travel_distance: 200,
            max_travel_distance: 1e3,
            pop_damage_delay: 1.25,
            pop_damage: 330,
            movement_slow_pct: 80,
            AbilityCastPoint: 0.2,
            AbilityCharges: 2,
            AbilityChargeRestoreTime: 15,
            AbilityManaCost: 90
          },
          semantic: {
            radius: 170,
            min_travel_distance: 200,
            max_travel_distance: 1e3,
            pop_damage_delay: 1.25,
            pop_damage: 330,
            movement_slow_pct: 80,
            AbilityCastPoint: 0.2,
            AbilityCharges: 2,
            AbilityChargeRestoreTime: 15,
            AbilityManaCost: 90
          },
          damageType: "magical",
          immunityRaw: 3,
          dispellableRaw: 0,
          rank: 3,
          maxLevel: 3
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 0,
          mana: 90,
          range_wu: 550,
          startup_frames: 12,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_135",
    registryNumericId: 121,
    valveHeroId: 135,
    key: "dawnbreaker",
    name: "破晓辰星",
    en: "Dawnbreaker",
    packKey: "r91",
    hp: 1200,
    mana_regen: 8,
    attack: 57,
    move_speed: 165,
    attack_range: 82.5,
    attack_interval_s: 1.7,
    combatHp: 3360,
    combatMana: 1600,
    color: "#98b7d4",
    attributes18: {
      str: 82.8,
      agi: 42.9,
      int: 54
    },
    primaryAttribute: 0,
    abilities: [
      {
        id: "dawnbreaker_fire_wreath",
        valveAbilityId: 7902,
        slot: "S1",
        name: "星破天惊",
        en: "Starbreaker",
        official: {
          params: {
            duration: 1.1,
            swipe_radius: 300,
            swipe_damage: 70,
            smash_radius: 300,
            smash_damage: 70,
            movement_speed: 215,
            total_attacks: 3,
            smash_stun_duration: 1.2,
            sweep_stun_duration: 0.12,
            self_stun_duration: 0.2,
            swipe_slow: -100,
            smash_distance_from_hero: 120,
            turn_rate: 90,
            shard_cast_point: 0.1,
            shard_movement_penalty: 0,
            immunity_resist: 0,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 110,
            AbilityCooldown: 11
          },
          semantic: {
            duration: 1.1,
            swipe_radius: 300,
            swipe_damage: 70,
            smash_radius: 300,
            smash_damage: 70,
            movement_speed: 215,
            total_attacks: 3,
            smash_stun_duration: 1.2,
            sweep_stun_duration: 0.12,
            self_stun_duration: 0.2,
            swipe_slow: -100,
            smash_distance_from_hero: 120,
            turn_rate: 90,
            shard_cast_point: 0.1,
            shard_movement_penalty: 0,
            immunity_resist: 0,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 110,
            AbilityCooldown: 11
          },
          damageType: "physical",
          immunityRaw: 3,
          dispellableRaw: 0,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 11,
          mana: 110,
          range_wu: 0,
          startup_frames: 6,
          recovery_frames: 12,
          damage_type: "physical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "dawnbreaker_celestial_hammer",
        valveAbilityId: 7914,
        slot: "S2",
        name: "上界重锤",
        en: "Celestial Hammer",
        official: {
          params: {
            hammer_damage: 140,
            projectile_radius: 200,
            projectile_speed: 1600,
            flare_debuff_duration: 4,
            flare_radius: 200,
            move_slow: 36,
            burn_damage: 50,
            burn_interval: 0.5,
            pause_duration: 2,
            hammer_aoe_radius: 200,
            travel_speed_pct: 100,
            return_anim_distance_threshold: 300,
            range: 1300,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 130,
            AbilityCooldown: 12
          },
          semantic: {
            hammer_damage: 140,
            projectile_radius: 200,
            projectile_speed: 1600,
            flare_debuff_duration: 4,
            flare_radius: 200,
            move_slow: 36,
            burn_damage: 50,
            burn_interval: 0.5,
            pause_duration: 2,
            hammer_aoe_radius: 200,
            travel_speed_pct: 100,
            return_anim_distance_threshold: 300,
            range: 1300,
            AbilityCastPoint: 0.2,
            AbilityManaCost: 130,
            AbilityCooldown: 12
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 12,
          mana: 130,
          range_wu: 715,
          startup_frames: 12,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "dawnbreaker_luminosity",
        valveAbilityId: 7918,
        slot: "S3",
        name: "熠熠生辉",
        en: "Luminosity",
        official: {
          params: {
            attack_count: 3,
            heal_radius: 650,
            heal_pct: 50,
            heal_from_creeps: 40,
            bonus_damage: 200,
            allied_healing_pct: 50,
            triggered_by_celestial_hammer: 0
          },
          semantic: {
            attack_count: 3,
            heal_radius: 650,
            heal_pct: 50,
            heal_from_creeps: 40,
            bonus_damage: 200,
            allied_healing_pct: 50,
            triggered_by_celestial_hammer: 0
          },
          damageType: "none",
          immunityRaw: 1,
          dispellableRaw: 0,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "passive",
          passive: true,
          input: "passive",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "none",
          height: "both",
          blockable: false
        }
      },
      {
        id: "dawnbreaker_solar_guardian",
        valveAbilityId: 7906,
        slot: "S4",
        name: "天光现世",
        en: "Solar Guardian",
        official: {
          params: {
            scepter_aura_duration: 0,
            miss_rate: 0,
            base_heal: 95,
            radius: 500,
            base_damage: 70,
            pulse_interval: 0.5,
            land_damage: 190,
            land_stun_duration: 1.6,
            max_offset_distance: 350,
            scepter_channel_time: 0,
            airtime_scepter_bonus: 0,
            airtime_scepter_movement_speed: 200,
            airtime_duration: 0.8,
            daytime_duration: 6,
            AbilityChannelTime: 1.7,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 250,
            AbilityCooldown: 90
          },
          semantic: {
            scepter_aura_duration: 0,
            miss_rate: 0,
            base_heal: 95,
            radius: 500,
            base_damage: 70,
            pulse_interval: 0.5,
            land_damage: 190,
            land_stun_duration: 1.6,
            max_offset_distance: 350,
            scepter_channel_time: 0,
            airtime_scepter_bonus: 0,
            airtime_scepter_movement_speed: 200,
            airtime_duration: 0.8,
            daytime_duration: 6,
            AbilityChannelTime: 1.7,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 250,
            AbilityCooldown: 90
          },
          damageType: "magical",
          immunityRaw: 3,
          dispellableRaw: 0,
          rank: 3,
          maxLevel: 3
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 90,
          mana: 250,
          range_wu: 0,
          startup_frames: 6,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      }
    ]
  },
  {
    id: "valve_138",
    registryNumericId: 124,
    valveHeroId: 138,
    key: "muerta",
    name: "琼英碧灵",
    en: "Muerta",
    packKey: "r91",
    hp: 1200,
    mana_regen: 8,
    attack: 51,
    move_speed: 162.25,
    attack_range: 316.25,
    attack_interval_s: 1.7,
    combatHp: 3360,
    combatMana: 1600,
    color: "#98b7d4",
    attributes18: {
      str: 53,
      agi: 66.9,
      int: 84.2
    },
    primaryAttribute: 2,
    abilities: [
      {
        id: "muerta_dead_shot",
        valveAbilityId: 5751,
        slot: "S1",
        name: "弹无虚发",
        en: "Dead Shot",
        official: {
          params: {
            damage: 325,
            speed: 2e3,
            radius: 150,
            ricochet_radius_start: 115,
            ricochet_radius_end: 115,
            ricochet_radius_expansion_per_second: 0,
            ricochet_distance_multiplier: 1.5,
            ricochet_fear_duration: 1.25,
            impact_slow_percent: -100,
            impact_slow_duration: 1,
            scepter_pierces: 0,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.15,
            AbilityManaCost: 160,
            AbilityCooldown: 10
          },
          semantic: {
            damage: 325,
            speed: 2e3,
            radius: 150,
            ricochet_radius_start: 115,
            ricochet_radius_end: 115,
            ricochet_radius_expansion_per_second: 0,
            ricochet_distance_multiplier: 1.5,
            ricochet_fear_duration: 1.25,
            impact_slow_percent: -100,
            impact_slow_duration: 1,
            scepter_pierces: 0,
            AbilityCastRange: 1e3,
            AbilityCastPoint: 0.15,
            AbilityManaCost: 160,
            AbilityCooldown: 10
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 10,
          mana: 160,
          range_wu: 550,
          startup_frames: 9,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "muerta_the_calling",
        valveAbilityId: 5752,
        slot: "S2",
        name: "唤魂",
        en: "The Calling",
        official: {
          params: {
            damage: 180,
            duration: 8,
            hit_radius: 120,
            dead_zone_distance: 340,
            num_revenants: 4,
            speed_initial: 0.2,
            speed_max: 1,
            acceleration: 0.75,
            aura_movespeed_slow: -20,
            silence_duration: 3,
            rotation_direction: -1,
            AbilityCastRange: 600,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 180,
            AbilityCooldown: 24
          },
          semantic: {
            damage: 180,
            duration: 8,
            hit_radius: 120,
            dead_zone_distance: 340,
            num_revenants: 4,
            speed_initial: 0.2,
            speed_max: 1,
            acceleration: 0.75,
            aura_movespeed_slow: -20,
            silence_duration: 3,
            rotation_direction: -1,
            AbilityCastRange: 600,
            AbilityCastPoint: 0.1,
            AbilityManaCost: 180,
            AbilityCooldown: 24
          },
          damageType: "magical",
          immunityRaw: 4,
          dispellableRaw: 2,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 24,
          mana: 180,
          range_wu: 330,
          startup_frames: 6,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      },
      {
        id: "muerta_gunslinger",
        valveAbilityId: 5753,
        slot: "S3",
        name: "神枪在手",
        en: "Gunslinger",
        official: {
          params: {
            double_shot_chance: 45,
            target_search_bonus_range: 175
          },
          semantic: {
            double_shot_chance: 45,
            target_search_bonus_range: 175
          },
          damageType: "none",
          immunityRaw: 0,
          dispellableRaw: 0,
          rank: 4,
          maxLevel: 4
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 0,
          mana: 0,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "none",
          height: "both",
          blockable: false
        }
      },
      {
        id: "muerta_pierce_the_veil",
        valveAbilityId: 5754,
        slot: "S4",
        name: "越界",
        en: "Pierce the Veil",
        official: {
          params: {
            duration: 8,
            transform_duration: 0.35,
            base_damage_percent: 100,
            modelscale: 30,
            AbilityManaCost: 350,
            AbilityCooldown: 45
          },
          semantic: {
            duration: 8,
            transform_duration: 0.35,
            base_damage_percent: 100,
            modelscale: 30,
            AbilityManaCost: 350,
            AbilityCooldown: 45
          },
          damageType: "magical",
          immunityRaw: 0,
          dispellableRaw: 3,
          rank: 3,
          maxLevel: 3
        },
        mvp: {
          effect: "r91",
          passive: false,
          input: "tap",
          cooldown_s: 45,
          mana: 350,
          range_wu: 0,
          startup_frames: 0,
          recovery_frames: 12,
          damage_type: "magical",
          height: "both",
          blockable: false
        }
      }
    ]
  }
];

// node_modules/@dotapk/heros/content/index.js
function freezeTree(v) {
  if (v && typeof v === "object" && !Object.isFrozen(v)) {
    Object.values(v).forEach(freezeTree);
    Object.freeze(v);
  }
  return v;
}
var heroes = freezeTree(heroes_default);

// node_modules/@dotapk/heros/rules/fingerprint.js
var sourceManifest = {
  "candidates/index.js": "2a917bfa7d2ad8b64641049e4d85e03e2eada2cb6ee668c1a2b02008528694f9",
  "catalog.js": "bcb429798b2701c7a5fcb92949a0b56df549231fff3779f8fa80dd34edb05594",
  "content/heroes.json": "b837cb0c5c601092c7ce1b0d2fda6a90bcde8b6d797149cbac9cc9cf3d381b7d",
  "content/index.js": "e552bf8888a58f1c171e430e36a4767157eaf43d717cd7b3195d3a8643cf85e1",
  "content/slot-status.json": "71b2f49e344ba89a80223c393f72caaf83dfb4aad5c3ff819cb33ca3aacbd006",
  "contract/code-identity.js": "b211e83f16c3aa84e79b1d5e2fdb36c33a4e55a329e45f357496f8402340d3f8",
  "contract/definition-schema.js": "c03e8f8df8cd88a8b23c86cc35c7a4a8fef55ce5c7695fbf88a9322cacb6feac",
  "contract/registry.js": "0383013a4e6370cddc9609784375548e9efe0777c4e6c667af23a2100c49bb42",
  "contract/resource-schema.js": "7a433024a1bafff529b0ce560d82ac88f42f9f7125409eb5a391f555fa93cfd7",
  "contract/rule-declarations.js": "56b84e8923c189d2cd8644387ee9971e5c30538fa196899b67e1dcae0c9fa685",
  "contract/schedule-schema.js": "7bd5805e0610c24cb0dcb241587e7ff82dfce2e248a2324523a5d7e3b513fdd6",
  "contract/session.js": "b7daebec87f2f1c2ce617d7661fbcb7b03c483095230231591d432c6ef28cf23",
  "contract/state-schema.js": "ccea5b69726eb88ed568348b5707b987583cc0d92ce7d9a7ee7c5672266e8cfe",
  "contract/types.ts": "746396cc78e6b713f0deec23547bc9596499dee511b18b76c536d039dfcad378",
  "contract/value.js": "c0da66bad54e30c952287ff6c5ae00b6d551b6ec69ddb6b2fb63c4a0b8186646",
  "examples/blink-range.js": "e1031dc2d8b854b3a9c06dca05f20faa0b71681ce3317edcaa0f8ba836df28f0",
  "examples/demo.mjs": "3051e9b682638fe5d9c54b25277a2317256c53338cb88c6d54e169417c97a2c6",
  "index.js": "e34c25f5432c730d52a336b7be86bce1ea9e39b65b4b1cdd9a0cc0f1aef38ca8",
  "package.json": "f443737c2fa6720493354f04e02872bc3bed99a4cde7e17f30b1f55422af0259",
  "rules/a/extensions/canonical.js": "27589aeae0f4cf0037fea07f0ea9bb7c95977ecb756342396d4bba1de4b519a1",
  "rules/a/extensions/common.mjs": "15b26f87007922ba78f1f6d5b9eb483c6a6de52f5069c592ee81726de9afcc98",
  "rules/a/extensions/dragon.mjs": "e8ef50d566fdd3e4fa3c9bfac07a73571bd216f6ea0a2a1b6108f193fb0e760f",
  "rules/a/extensions/exorcism.mjs": "17cb234bab6cb9f70f5e9da774b44e2174e89bf67ac0e78f757e8291cfefe119",
  "rules/a/extensions/gaze.mjs": "01fd5e1216c2c7b72bf1d5febb8b82ef17f07ed5178cdf2eda15d84f8f9a984a",
  "rules/a/extensions/index.mjs": "3f22cdfbdbca362435b0d49754c061fe60f3a3084f4d5abd34852d7002df5d13",
  "rules/a/extensions/mark.mjs": "e3d7badd05c4dc269fa194f23d1449b31f495a61b14d22aaa7ddb537f33604f9",
  "rules/a/extensions/proposal.js": "6c61451417d8c4e120b6100cb7739b32404a6691575cf66ad8f13e1c07e25e55",
  "rules/a/extensions/rupture.mjs": "2518786b7a23081b185c7e1bd3cbefb5b960ec1cf18c58396a51c37e516ce74e",
  "rules/a/extensions/swap.mjs": "5a5ebee6be5941fa30d612985b6c4cd06bc932fe7e0e2ac0e0abbc1f7cf962e2",
  "rules/a/gaps.js": "d7695ba2e5acb873c3e7417254ff2dd3afad39f5c53ed0fffd29ea839eacd366",
  "rules/a/model.js": "d65104d7c0a2003776bb049564e9ecaced61fba9830fad9e8188855f4979c89e",
  "rules/a/parameters.js": "4c65441736d3fda976116d668ed9b65bc6e74866a7be081f9004613545b564eb",
  "rules/a/register.js": "f9c96a4c7b52dbfe30c3f05eb308758ce8b54a581468d118e57961e00ae6928b",
  "rules/a/runtime.js": "20f27eaf17e9763d43bb877c81fc100c81b546aefcdc77d996e20ea11b3f00a9",
  "rules/a/state.js": "0a5fec0b7ded0ce1976020d58fa956598dc0f242a8d44e8850741446a77b8228",
  "rules/b/model.js": "0ed3171e5dafcf4086a499235c1721cbfc181e9d58c4a63c85c9b97abfeec6b0",
  "rules/b/programs.js": "77e06b81e9bbaf55fa23ff5e5037bcdf3a464f6462a3e4a6382f738894c4a7fa",
  "rules/b/register.js": "bd9371e55ecde22a3bde3204385c365aebc8d523451e971ec137b50dbf8833e3",
  "rules/b/state.js": "49074b61c31de3f53cff65f15cb3d8f718aa1829d778a61b75e65c0df8b9063a",
  "rules/c/centaur.js": "ffdba3d9ec95aac29feccd12b8f6a9669b4eaa7bb0aed2b232d271d97989dd59",
  "rules/c/common.js": "e7f3fb5062d9baae2845a436f50110f1af03444a4ff7af9e9b1f9ddd8977817b",
  "rules/c/extra.js": "2104086d50be5fb5ef6961f6bab3b5830a18102fcab00a38fb7511ffee29df9a",
  "rules/c/index.js": "c95d3b23a5e0f990ad2e54cb8660b60f014216ec5504031ee3669dff4faa3e96",
  "rules/c/skywrath.js": "2ddda6123ed394307d5b0bb48d02e359a435f7a2fde76ff842fecfbb74b9d238",
  "rules/c/state.js": "676c4196da86f1051b9de6d9d83daa27c7a4cb9fe7f87a58f7b3747afe095f83",
  "rules/core4/abaddon.js": "1cc8cfbf1d256afd4a6282eaa19211c87929b95a9c15280a65755e07381b2d29",
  "rules/core4/bash.js": "5e1a9793cf9cf92d2d70f4abc5aa576f93bfe36bca17fe82d66c51f41ee61727",
  "rules/core4/common.js": "b0506570b6cffddd544ecb7f64ec88dca2e6e27937b830f7a1869820d1eaca68",
  "rules/core4/index.js": "14a0220da0981ddcf252a2ae4677e2d232d73f9711c1615ebeb93312ef21c50e",
  "rules/core4/innates.js": "50810bf1849de73e2422d03e8bcb2e72c9fa2e5651fb52eff71ea6f9117db83c",
  "rules/core4/razor.js": "5cbc6f4daeb32eca61ee254eae114ae2d2fdb4afda5ae466349b7a7b74c2eb15",
  "rules/core4/slardar.js": "5942afe1692da81d08ab59cba7791bc420a033067dd0505cba5ce19dd9729848",
  "rules/core4/viper.js": "121df7a35ef965ca0cc9a6b53c55fd98a0b1435cbf206d1d0c0c9944fa5166b3",
  "rules/legacy-0-9/all-owned.js": "0218573e07f97ab99353310a8e1bc3fb561921d22e9fd62667c384b08d6b1440",
  "rules/legacy-0-9/direct-hit.js": "90d39d5bac7005850ca40d4f4e62111bdd097fde332068ad92d5aa53536bc26a",
  "rules/legacy-0-9/index.js": "ee2486a426f96f0fbec2c0914ae63a6aa5364376b208e9f1e03e5eda0ebbf682",
  "rules/legacy-0-9/next/active-skills.js": "0d829e5bf750bcd2b8d5cbf6b2093fe830dd049e25442578a6bc2c87f931880b",
  "rules/legacy-0-9/next/common.js": "b44c3cb2f28675cabf130b6ed0e4e84f1441a2621deb7c13194efd8d5299f3b3",
  "rules/legacy-0-9/next/index.js": "a2a939961d69d390c51a5df4b4c7c18d100f0d9187130453b3806be3d136c869",
  "rules/legacy-0-9/next/status-skills.js": "f2fd1e270413b73d32ab52e3612f3b11433b907b20f93510f2967ea5f749d3c1",
  "rules/legacy-0-9/next/verify.mjs": "e7c936ab4c8315f7fb80c75532bd122f7e91d901b4a700133b4185921eaa6229",
  "rules/legacy-0-9/projections.js": "4df57ebcf060556577d65bf7e580a9db81aed1c0becd34f4d88c2bdc4a83744b",
  "rules/legacy-0-9/remaining-channels.js": "8b4237f98939e2a21e217c23b1839d6361bdeefeb3203498887a911b2983c1e6",
  "rules/legacy-0-9/remaining-common.js": "65623a05ed05f70c317dbabf604377a47a08de4275af7420c21365ffdbdb4fa1",
  "rules/legacy-0-9/remaining-effects.js": "39e240ccc5cbce65498bb197cc1fb576059d65eab36ffc49b06ad43216708f8b",
  "rules/legacy-0-9/remaining-passives.js": "840f2594ad2eb43f65b96941a48b40c9465325303b76b22edecfa8f506aacfff",
  "rules/legacy-0-9/remaining-projectiles.js": "6e2781b7c8eddf0909a4e7a29e008bd8ec3be13f70462f2df46a2beb118c7e1f",
  "rules/legacy-0-9/remaining.js": "ea407b268e8ed384ae3071ece209494669a5f4236a1b6857bf13f835920b4f8a",
  "rules/legacy-0-9/verify-all.mjs": "dc3c480e1db5b354a594a879c8315b73b87f2853b66a3438f2dc3ae420146527",
  "rules/legacy-0-9/verify.mjs": "2a6d75297adb9d804d5178caa29a37b43cc5a6e7c089e8edd0a292a8fb63a554",
  "rules/legacy-10-19/index.js": "5b060da397b4c74c11096633ef9bfd89b22eb78d992ef7da7f3a172e0e7a533e",
  "rules/legacy-10-19/proposed-abilities.js": "750e76f456d58afe9b99be56b217d464aa3979bf4f1bbb7fdf773227f93c44e2",
  "rules/legacy-10-19/proposed-behaviors.js": "b9d216a26900f156af980922ce5cd83c699413fe690cb5ad82260edf325292bc",
  "rules/legacy-10-19/proposed-validation.js": "1108578611bbea4e54ba999fc8266013d0d09c8e3957e91d02ac8806e7d0fc29",
  "rules/legacy-10-19/remaining-common.js": "6f4e43aa1d849d3f95f159b64836225abe3c10493aa695b1f389a85ceca8d4e5",
  "rules/legacy-10-19/remaining-effects.js": "a14f824429b4f711b92692a9c9c3b598ec18cd8dff6278e0a1f4c42f3f574dfc",
  "rules/legacy-10-19/remaining-passives.js": "a7036042df59ba1d8710bd26198971f8d90eb773f07cd2b3cd6f5e9553136d32",
  "rules/legacy-10-19/remaining-projectiles.js": "8f25c1e7e98f5fcf6f096f1c6371c692aeb05189efc009c90c43bde543f6b56d",
  "rules/legacy-10-19/remaining.js": "8da0d8515c5ab20a76e8f9f924cb328f685253241ad0255485e24c9b19fe3c77",
  "rules/legacy-three.js": "d201c401e3a9ff3d1427d16f1be304410fe60f91c911c1212bc38db5f1a3bc63",
  "scripts/a-run-tests.mjs": "355d27c4255826d678c8c2171147ba7c3bf3673c9e39c1ab4949457d39816d93",
  "scripts/c/fingerprint.mjs": "dc775f4baa042b3af5ebbb5dbda5608e315b4a7910871129309f9f0c964ac0b8",
  "scripts/c/run-tests.mjs": "a409bb5298948b82a29289b51ae9f6836cef07f8deed808623cd9ce4cbb447e9",
  "scripts/fingerprint.mjs": "3c621367e4349d7704fb7b4234067c132504fc2e1bd66e6fa3024181e59bc94e",
  "scripts/legacy-10-19/run-proposed-tests.mjs": "ed7a58728104128865795d5c7d3d536db7b76b7307451d8673a007eb50b9e6ba",
  "scripts/legacy-10-19/run-remaining-tests.mjs": "42ba29f56a69165f1d861d66b35aae429ba87d0a9dbb90b173fd09ada1653bfb",
  "scripts/legacy-10-19/run-tests.mjs": "fdff01465e72761bd493987effb989b80ca96b487f147d009c63bb164a38bd17",
  "scripts/run-tests.mjs": "785bb3162ad22b6e0d7fcb3233d35f23a3b8a7b64c0877eed1a4251c900cd6fc",
  "scripts/test-suites.mjs": "cf34d2d3ac40c8d976606aeede3d2c561c7dbcf051ba79acead378b7a731d785",
  "test/a-host.mjs": "e3cc198962c8111b44e7064b0ba34d5e0262c958afb96343a5533e0dde49cc2a",
  "test/a-probes.mjs": "d4aeec8429f97a06102473a18e7169bba4e885dcc202c33b296a669401a97ca1",
  "test/a-rules.test.mjs": "152bc8d3d9083d832ed340f78efbbffa88edc27986e5d26ef57a5faca1e9a96e",
  "test/a-six-handlers.test.mjs": "e7adfe6c15c4534f61c85371bb633d0c3618a636510459e25ee3a91bf0e7a1b6",
  "test/a-v2-contract.test.mjs": "9ea0264ebbf353a940ce78f26aa443f4a44fad11aa597d1343b464e6d9c09d11",
  "test/a-v3-resources.test.mjs": "f93a000f394a19521bee4137bd857667d92cf639c462cf05ce019631a582549e",
  "test/a-v4-schedule.test.mjs": "5b560bb0fa226bb0b497c77086cc17edf17020a4f74513ec9331d00f52b42d9b",
  "test/b24-host.mjs": "0349d5db7d9f4865dd11143d0af0dc898e3a980cafcbbd6713a992f017a58ec1",
  "test/b24.test.mjs": "915831b07e1776c8392f145de9f453b83e7fb097527ffc46182b68793b9183a1",
  "test/batch10-contract-run.mjs": "60373b560e4afe917830bc0cf65cfbe2028060fbcf4a59b1e0781a1790738885",
  "test/batch10-contract.test.mjs": "8d605b3ed266d9a6aeafa2746235c46a12682aeef70878621b74a5b7576325fa",
  "test/c/boundaries.test.mjs": "35683a2150fb9939cc08336992aaa234b59665174fdcea4c5a1d3c592a9358a1",
  "test/c/effect-diff.test.mjs": "c0a00577e8948a87be1c207fcb813532a4ba7a61bada8dee98ab4776f79bdb3f",
  "test/c/host.mjs": "00d4bce42868f135e9c49a978ae891cec45e97d5878c4e4711731f24341df617",
  "test/c/sample.mjs": "4f3395984e1a60924d471e8ceb22a894c4b369aee165656eb202b537c377d0ee",
  "test/c/skills.test.mjs": "63aab7fd11aa3c90b5e6706a0ffb8deb936b1e8cecac4f0751d69501e7898d17",
  "test/contract.test.mjs": "bdbc5ea6f315e4af29c132e5976e3651c101d9d1773a8123c43e586ab6b316fa",
  "test/core4/fixture.mjs": "230027deb5a2fc458fa6908d322d466f42b48d27c8ba981cb043f3a25e9c5bc5",
  "test/core4/rules.test.mjs": "e1dcc38482f46ba146f0ce86d265e5d75e98b5396fa6753e78c3a86a76d32b89",
  "test/core4/run.mjs": "ad44316129f153c5030b03c7cf82362afa10b1d9436ee4e7ea2888fd017bfe3a",
  "test/host.mjs": "d0830ad499231f57c640840de56864acfae0fabf75463732acda4f93149d9be0",
  "test/legacy-0-9.test.mjs": "3fedbba99b6d3a656cd92b65786c10e5f6bab0e867eb2e4ffcda014278f105c2",
  "test/legacy-10-19/proposed-host.mjs": "95b037dcae8ac89ef770c8c4e7be317efcb2242f600908d0d4e39605c7413422",
  "test/legacy-10-19/proposed.test.mjs": "f3a486263a199ea24391fe25b6731908ee12313f0234ca6831b884c789f5a2ed",
  "test/legacy-10-19/remaining-host.mjs": "304067267004e51d5b298dd112525cd1c5961a859965f6de09969f54d4d793b3",
  "test/legacy-10-19/remaining.test.mjs": "b7bdb9df8a29cadc4e6519792642d40601f4953a42c9d8d77739bede05d324cc",
  "test/legacy-10-19/slices.test.mjs": "e13f02d75a07b716bc19cb3caaa6a97d6e13d80b4dd776f5f0b1972206455b8a",
  "test/legacy-next-recorder.mjs": "fbcaab0ba36552ae0bb72e036557ea524c090c7ba240bd85043790c74c942003",
  "test/legacy-next.test.mjs": "3549a8e874613b88cca94495ee077515b82ad701ad20007d32abd637b365d1f3",
  "test/legacy-projections.test.mjs": "8f57c5ce74c2d748ee2bc9f384d8e8c7ce777c9f7b3e51120a21bdf0b8f1190b",
  "test/legacy-remaining-recorder.mjs": "31ce703f722634cabea53d509ed5d3ffeb7c91bfacfa0a5cefaca58f4e577b00",
  "test/legacy-remaining.test.mjs": "82db5755efa24cb677d16e00f0486ecc0db8269e2f52f756593a40694a493375",
  "test/probes.mjs": "a374c25f89cbf253190b409572e5ec5e2a2495bcbc73746cac7c39def6b26a20",
  "test/schedule-schema-run.mjs": "440eb9b2a846d7da8aff28f7d7c031890200f54fccbcea2cd36f8ad5b7436463",
  "test/schedule-schema.test.mjs": "ae2ee197c2ee1eca45e5a117c02dcea7475b17dfb48be461406f60f6dddfc4a0",
  "test/unified.test.mjs": "f3d3ed8b6e29f3ffb97157f32db03ccd733d45ddd229fa40a102f50254efb5e9"
};

// node_modules/@dotapk/heros/contract/value.js
function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
function json(value, depth = 0) {
  if (depth > 24) throw Error("State too deep");
  if (value === null || typeof value === "boolean") return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.length <= 8192) return value;
  if (Array.isArray(value) && value.length <= 4096) return value.map((x) => json(x, depth + 1));
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    const result2 = {};
    for (const [key2, v] of Object.entries(value)) {
      if (["__proto__", "prototype", "constructor"].includes(key2) || key2.length > 128) throw Error("Invalid state key");
      result2[key2] = json(v, depth + 1);
    }
    return result2;
  }
  throw Error("Expected finite plain JSON");
}
var canonical = (value) => JSON.stringify(value, (_, v) => v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, v[k]])) : v);
var K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var rotr = (n2, b) => n2 >>> b | n2 << 32 - b;
function sha256(text) {
  const bytes = [];
  for (const c of text) {
    let n2 = c.codePointAt(0);
    if (n2 >= 55296 && n2 <= 57343) n2 = 65533;
    if (n2 < 128) bytes.push(n2);
    else if (n2 < 2048) bytes.push(192 | n2 >> 6, 128 | n2 & 63);
    else if (n2 < 65536) bytes.push(224 | n2 >> 12, 128 | n2 >> 6 & 63, 128 | n2 & 63);
    else bytes.push(240 | n2 >> 18, 128 | n2 >> 12 & 63, 128 | n2 >> 6 & 63, 128 | n2 & 63);
  }
  const data = new Uint8Array(Math.ceil((bytes.length + 9) / 64) * 64);
  data.set(bytes);
  data[bytes.length] = 128;
  const view = new DataView(data.buffer);
  view.setUint32(data.length - 8, Math.floor(bytes.length / 536870912));
  view.setUint32(data.length - 4, bytes.length * 8 >>> 0);
  const h2 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], w = new Uint32Array(64);
  for (let offset = 0; offset < data.length; offset += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4);
    for (let i = 16; i < 64; i++) {
      const a2 = w[i - 15], b2 = w[i - 2];
      w[i] = (rotr(a2, 7) ^ rotr(a2, 18) ^ a2 >>> 3) + w[i - 16] + (rotr(b2, 17) ^ rotr(b2, 19) ^ b2 >>> 10) + w[i - 7] >>> 0;
    }
    let [a, b, c, d, e, f, g, k] = h2;
    for (let i = 0; i < 64; i++) {
      const t1 = k + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + (e & f ^ ~e & g) + K[i] + w[i] >>> 0, t2 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + (a & b ^ a & c ^ b & c) >>> 0;
      k = g;
      g = f;
      f = e;
      e = d + t1 >>> 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 >>> 0;
    }
    [a, b, c, d, e, f, g, k].forEach((v, i) => h2[i] = h2[i] + v >>> 0);
  }
  return h2.map((x) => x.toString(16).padStart(8, "0")).join("");
}

// node_modules/@dotapk/heros/contract/code-identity.js
function codeIdentity(sourceFiles2) {
  if (!Array.isArray(sourceFiles2) || !sourceFiles2.length || new Set(sourceFiles2).size !== sourceFiles2.length || sourceFiles2.some((path) => typeof path !== "string" || !Object.hasOwn(sourceManifest, path))) throw Error("Unknown reviewed implementation source");
  const files = [...sourceFiles2].sort(), inputs = files.map((path) => ({ path, sha256: sourceManifest[path] }));
  return freeze({ sourceFiles: files, codeHash: sha256(canonical(inputs)) });
}
function assertCodeIdentity(value) {
  const identity2 = codeIdentity(value.sourceFiles);
  if (value.codeHash !== identity2.codeHash) throw Error("Missing or mismatched implementation digest");
  return identity2;
}
var coreCodeIdentity = () => codeIdentity(Object.keys(sourceManifest).filter((path) => path.startsWith("contract/") || path === "index.js"));

// node_modules/@dotapk/heros/contract/state-schema.js
var owned = /* @__PURE__ */ new WeakSet();
var types = /* @__PURE__ */ new Set(["null", "boolean", "number", "integer", "string", "array", "object"]);
function inspect(schema, depth = 0) {
  if (!schema || Object.getPrototypeOf(schema) !== Object.prototype || depth > 24) throw Error("Invalid state schema");
  const allowed = /* @__PURE__ */ new Set(["type", "anyOf", "const", "enum", "minimum", "maximum", "minLength", "maxLength", "minItems", "maxItems", "items", "required", "properties", "additionalProperties"]);
  if (Object.keys(schema).some((k) => !allowed.has(k))) throw Error("Unknown state schema keyword");
  if (schema.type !== void 0 && !types.has(schema.type)) throw Error("Unknown state schema type");
  if (schema.type === void 0 && !schema.anyOf && !Object.hasOwn(schema, "const") && !schema.enum) throw Error("State schema requires explicit shape");
  if (schema.anyOf) {
    if (!Array.isArray(schema.anyOf) || !schema.anyOf.length || schema.anyOf.length > 64) throw Error("Invalid schema union");
    schema.anyOf.forEach((s) => inspect(s, depth + 1));
  }
  for (const k of ["minimum", "maximum", "minLength", "maxLength", "minItems", "maxItems"]) if (schema[k] !== void 0 && (!Number.isFinite(schema[k]) || !["minimum", "maximum"].includes(k) && (!Number.isSafeInteger(schema[k]) || schema[k] < 0))) throw Error("Invalid schema bound");
  if (schema.minimum !== void 0 && schema.maximum !== void 0 && schema.minimum > schema.maximum) throw Error("Reversed schema bounds");
  if (schema.type === "object") {
    if (!schema.properties || Object.getPrototypeOf(schema.properties) !== Object.prototype || schema.additionalProperties !== false || !Array.isArray(schema.required) || schema.required.some((k) => !Object.hasOwn(schema.properties, k))) throw Error("Object state schemas must be closed");
    Object.values(schema.properties).forEach((s) => inspect(s, depth + 1));
  }
  if (schema.type === "array") {
    if (!schema.items || !Number.isSafeInteger(schema.maxItems) || schema.maxItems < 0 || schema.maxItems > 4096) throw Error("Array schemas need a bounded item schema");
    inspect(schema.items, depth + 1);
  }
}
function accepts(schema, value) {
  if (schema.anyOf && !schema.anyOf.some((s) => accepts(s, value))) return false;
  if (Object.hasOwn(schema, "const") && canonical(schema.const) !== canonical(value)) return false;
  if (schema.enum && !schema.enum.some((v) => canonical(v) === canonical(value))) return false;
  if (schema.type === "null" && value !== null || schema.type === "boolean" && typeof value !== "boolean" || schema.type === "number" && (typeof value !== "number" || !Number.isFinite(value)) || schema.type === "integer" && !Number.isSafeInteger(value) || schema.type === "string" && typeof value !== "string" || schema.type === "array" && !Array.isArray(value) || schema.type === "object" && (!value || Object.getPrototypeOf(value) !== Object.prototype)) return false;
  if (typeof value === "number" && (schema.minimum !== void 0 && value < schema.minimum || schema.maximum !== void 0 && value > schema.maximum)) return false;
  if (typeof value === "string" && (schema.minLength !== void 0 && value.length < schema.minLength || schema.maxLength !== void 0 && value.length > schema.maxLength)) return false;
  if (Array.isArray(value)) {
    if (schema.minItems !== void 0 && value.length < schema.minItems || schema.maxItems !== void 0 && value.length > schema.maxItems) return false;
    if (schema.items && !value.every((v) => accepts(schema.items, v))) return false;
  }
  if (schema.type === "object") {
    if (schema.required.some((k) => !Object.hasOwn(value, k)) || Object.keys(value).some((k) => !Object.hasOwn(schema.properties, k))) return false;
    for (const [k, v] of Object.entries(value)) if (!accepts(schema.properties[k], v)) return false;
  }
  return true;
}
function defineStateSchema({ id, version = "1.0.0", schema, refinement = null, parameters: parameters2 = {} }) {
  if (typeof id !== "string" || !/^[-a-zA-Z0-9/_.]{1,128}$/.test(id) || !/^\d+\.\d+\.\d+$/.test(version)) throw Error("Invalid canonical schema identity");
  const declaration = freeze(json(schema)), config = freeze(json(parameters2));
  inspect(declaration);
  let refinementIdentity = null, refine = null;
  if (refinement) {
    const code = assertCodeIdentity(refinement);
    if (typeof refinement.validate !== "function" || typeof refinement.id !== "string" || !refinement.id) throw Error("Invalid schema refinement");
    refinementIdentity = freeze({ id: refinement.id, ...code });
    refine = refinement.validate;
  }
  const identity2 = { id, version, schema: declaration, parameters: config, refinement: refinementIdentity }, schemaHash = sha256(canonical(identity2));
  const result2 = Object.freeze({ ...identity2, schemaHash, validate: (value) => {
    try {
      const copy = json(value);
      return accepts(declaration, copy) && (!refine || refine(copy, config) === true);
    } catch {
      return false;
    }
  } });
  owned.add(result2);
  return result2;
}
var isStateSchema = (value) => owned.has(value);
var EMPTY_STATE_SCHEMA = defineStateSchema({ id: "heros/empty-state", schema: { type: "null" } });

// node_modules/@dotapk/heros/rules/legacy-three.js
function near(ctx, cast, m) {
  const f = ctx.actor(cast.owner), t = ctx.actor(cast.target);
  return Math.abs(t.x - f.x) <= (m.range_wu || m.radius_wu) + 22 && (m.height !== "ground" || t.y < 45);
}
var metadata = (id, requires, activate) => ({ behaviorId: id, revision: "1.0.0", ...codeIdentity(["rules/legacy-three.js"]), requires, activate, stateSchema: EMPTY_STATE_SCHEMA });
var legacyThreeFactories = Object.freeze([
  { heroId: 5, slot: 3, create: ({ definition }) => {
    const m = definition.mvp;
    return metadata("legacy/anti_mage_mana_void", ["damage", "cue", "target-route"], (ctx, cast) => {
      if (!near(ctx, cast, m)) return;
      const route = ctx.target.route({ owner: cast.owner, target: cast.target, abilityId: definition.id, range: m.range_wu, reflectable: true, reflected: cast.reflected });
      if (!route.accepted) return;
      const t = ctx.actor(route.target), amount = route.reflected ? (t.maxMp - t.mp) * m.missing_mana_multiplier : Math.min(m.damage_cap, m.damage + (t.maxMp - t.mp) * m.missing_mana_multiplier);
      ctx.damage({ source: route.owner, target: route.target, abilityId: definition.id, amount, type: m.damage_type, blockable: m.blockable, stunSeconds: m.stun_s, hitstunSeconds: m.hitstun_s, reflected: route.reflected });
      ctx.cue({ kind: route.reflected ? "reflect" : "targeted-hit", abilityId: definition.id, actor: route.owner, target: route.target });
      if (route.reflected) return { reflected: true };
    });
  } },
  { heroId: 9, slot: 1, create: ({ definition }) => {
    const m = definition.mvp;
    return metadata("legacy/lion_hex", ["control", "cue", "target-route"], (ctx, cast) => {
      if (!near(ctx, cast, m)) return;
      const route = ctx.target.route({ owner: cast.owner, target: cast.target, abilityId: definition.id, range: m.range_wu, reflectable: true, reflected: cast.reflected });
      if (!route.accepted) return;
      if (route.reflected || !ctx.actor(route.target).guarding) ctx.control.apply({ owner: route.owner, target: route.target, abilityId: definition.id, key: "hex", type: "hex", duration: m.duration_s, pierces: false, dispel: "strong" });
      if (route.reflected) {
        ctx.cue({ kind: "reflect", abilityId: definition.id, actor: route.owner, target: route.target });
        return { reflected: true };
      }
    });
  } },
  { heroId: 5, slot: 1, create: ({ definition }) => {
    const m = definition.mvp;
    return metadata("legacy/anti_mage_blink", ["motion-request", "protect", "cue"], (ctx, cast) => {
      const f = ctx.actor(cast.owner);
      ctx.cue({ kind: "blink", abilityId: definition.id, actor: cast.owner });
      ctx.motion({ actor: cast.owner, abilityId: definition.id, castId: cast.castId, kind: "blink", destinationX: f.x + cast.direction * m.range_wu, speed: 0, duration: 0 });
      ctx.protect({ actor: cast.owner, abilityId: definition.id, kind: "invulnerability", duration: 4 / 60 });
    });
  } }
]);

// node_modules/@dotapk/heros/contract/definition-schema.js
var templates = new Map(heroes.flatMap((h2) => h2.abilities.map((a) => [a.id, a.mvp])));
var NONNEG = /^(damage|damage_cap|dot_damage|execute_damage|mana|cooldown_s|duration_s|range_wu|radius_wu|startup_frames|recovery_frames|active_frames|ticks|tick_interval_s|stun_s|stun_cap_s|root_s|silence_s|slow_pct|slow_duration_s|charges|charge_restore_s|charge_max_s|mana_burn|mana_burn_pct|mana_damage_ratio|projectile_speed_wu_s|missing_mana_multiplier|critChance|critMultiplier|evasion|hitstun_s|buff_duration_s|stack_damage|stack_duration_s|max_stacks|burst_cap|burstInterval|lost_hp_multiplier|travelDuration|tracking_break_wu|arming_s|internal_cooldown_s|wall_height_wu|wall_bind_distance_wu|wall_bind_stun_s|distance_damage_per_100|damageOverTime|mana_per_second|heal_total|self_damage_per_tick|mana_drain_per_tick|wave_speed_wu_s|walkSpeed|explosionMin|explosionMax|explosionRadius)$/;
function numbers(value, path = []) {
  if (typeof value === "number") {
    if (!Number.isFinite(value) || Math.abs(value) > 1e7) throw Error("Out-of-range coefficient " + path.join("."));
    const k = path.at(-1);
    if (NONNEG.test(k) && value < 0) throw Error("Negative coefficient " + path.join("."));
  } else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) numbers(v, [...path, k]);
}
function validateRecipe(a, resources) {
  const m = a.mvp, template = templates.get(a.id);
  numbers(m);
  function shape(expected, actual, path = "mvp") {
    if (expected === null) {
      if (actual !== null) throw Error("Invalid recipe shape " + path);
      return;
    }
    if (Array.isArray(expected)) {
      if (!Array.isArray(actual) || actual.length !== expected.length) throw Error("Invalid coefficient array " + path);
      expected.forEach((v, i) => shape(v, actual[i], path + "." + i));
      return;
    }
    if (typeof expected === "object") {
      if (!actual || typeof actual !== "object" || Array.isArray(actual)) throw Error("Invalid recipe shape " + path);
      for (const [k, v] of Object.entries(expected)) shape(v, actual[k], path + "." + k);
      return;
    }
    if (typeof expected !== typeof actual) throw Error("Invalid coefficient type " + path);
  }
  if (!template) throw Error("Unknown recipe identity");
  shape(template, m);
  if (m.effect !== template.effect || m.input !== template.input || m.passive !== template.passive) throw Error("Replacement cannot change host admission family");
  for (const k of Object.keys(m)) if (NONNEG.test(k) && typeof m[k] !== "number") throw Error("Invalid numerical coefficient " + k);
  for (const k of ["mana", "cooldown_s", "range_wu", "startup_frames", "recovery_frames"]) if (!Number.isFinite(m[k]) || m[k] < 0) throw Error("Invalid skill coefficient " + k);
  for (const k of ["cooldown_s", "startup_frames", "recovery_frames"]) if (m[k] > 3600) throw Error("Timing coefficient exceeds host snapshot bounds");
  if (m.damage_type !== void 0 && !["physical", "magical", "pure"].includes(m.damage_type) && !(m.damage_type === "none" && (m.damage === void 0 || m.damage === 0))) throw Error("Invalid damage type");
  if (m.height !== void 0 && !["both", "ground"].includes(m.height)) throw Error("Invalid skill height");
  for (const k of ["passive", "toggle", "blockable", "reflectable", "interruptible", "invulnerable_active", "debuffImmune"]) if (m[k] !== void 0 && typeof m[k] !== "boolean") throw Error("Invalid boolean coefficient " + k);
  for (const k of ["critChance", "evasion", "execute_threshold_pct", "mana_burn_pct"]) if (m[k] !== void 0 && (!Number.isFinite(m[k]) || m[k] < 0 || m[k] > 1)) throw Error("Invalid probability/fraction " + k);
  if (m.tick_interval_s !== void 0 && m.tick_interval_s < 0 || m.charges > 0 && !(m.charge_restore_s > 0) || m.explosionMin !== void 0 && m.explosionMax !== void 0 && m.explosionMin > m.explosionMax) throw Error("Invalid dependent recipe fields");
  if (a.id === "anti_mage_mana_void") {
    for (const k of ["damage", "damage_cap", "missing_mana_multiplier", "stun_s", "hitstun_s"]) if (!Number.isFinite(m[k]) || m[k] < 0) throw Error("Mana Void coefficient " + k);
    if (!["physical", "magical", "pure"].includes(m.damage_type) || m.stun_s > 60 || m.hitstun_s > 60 || !resources || !Number.isFinite(resources.maxMp) || resources.maxMp * m.missing_mana_multiplier > 1e7) throw Error("Mana Void derived effect out of host bounds");
  }
  if (a.id === "lion_hex" && (!Number.isFinite(m.duration_s) || m.duration_s < 0 || m.duration_s > 60)) throw Error("Hex duration out of range");
  if (a.id === "anti_mage_blink" && (!Number.isFinite(m.range_wu) || m.range_wu < 0 || m.range_wu > 8845)) throw Error("Blink displacement out of range");
  return true;
}

// node_modules/@dotapk/heros/contract/resource-schema.js
function buildResourceSchema(definitions) {
  const maxMpByHero = {};
  for (const h2 of definitions) {
    const maximum2 = h2.combatMana ?? h2.mana ?? 1200;
    if (!Number.isSafeInteger(h2.registryNumericId) || !Number.isFinite(maximum2) || maximum2 <= 0 || maximum2 > 1e7 || Object.hasOwn(maxMpByHero, h2.registryNumericId)) throw Error("Invalid declared mana resource ceiling");
    maxMpByHero[h2.registryNumericId] = maximum2;
  }
  return freeze({ maxMpByHero, maxMp: Math.max(...Object.values(maxMpByHero)) });
}
function validManaFact(resources, fact) {
  return !!fact && Number.isFinite(fact.maxMp) && fact.maxMp > 0 && fact.maxMp <= (resources.maxMpByHero[fact.heroId] ?? -1) && Number.isFinite(fact.mp) && fact.mp >= 0 && fact.mp <= fact.maxMp;
}

// node_modules/@dotapk/heros/contract/schedule-schema.js
var exact = (v, keys) => v && Object.getPrototypeOf(v) === Object.prototype && Object.keys(v).length === keys.length && keys.every((k) => Object.hasOwn(v, k));
var actor = (v) => v === 0 || v === 1;
var ref = (v) => typeof v === "string" && /^[-a-zA-Z0-9_:/.]{1,160}$/.test(v);
var phases = Object.freeze({ "source-job": ["pack.job-due"], status: ["actor.status-pre-advance", "actor.status-advance"], "entity-area": ["pack.entity"], "entity-link": ["pack.entity"], channel: ["pack.entity"], swarm: ["actor.swarm"], passive: ["actor.passive"] });
function bindingKind(binding) {
  if (!binding || !Object.hasOwn(phases, binding.kind) && binding.kind !== "entity") throw Error("Unknown schedule binding");
  if (binding.kind === "source-job" || binding.kind === "passive") {
    if (!exact(binding, ["kind"])) throw Error("Invalid unreferenced binding");
    return binding.kind;
  }
  if (binding.kind === "entity") {
    if (!exact(binding, ["kind", "mode", "ref"]) || !["area", "link"].includes(binding.mode) || !ref(binding.ref)) throw Error("Invalid entity binding");
    return "entity-" + binding.mode;
  }
  if (!exact(binding, ["kind", "ref"]) || !ref(binding.ref)) throw Error("Invalid accepted host reference");
  return binding.kind;
}
function validateScheduledBindings(value, handlers) {
  if (value === void 0) return null;
  if (!value || Object.getPrototypeOf(value) !== Object.prototype || Object.keys(value).length > 64) throw Error("Invalid scheduled binding manifest");
  for (const [name, pairs] of Object.entries(value)) {
    if (!Object.hasOwn(handlers ?? {}, name) || !Array.isArray(pairs) || !pairs.length || pairs.length > 8) throw Error("Undeclared scheduled handler binding");
    const seen = /* @__PURE__ */ new Set();
    for (const pair of pairs) {
      if (!exact(pair, ["binding", "delivery"]) || !Object.hasOwn(phases, pair.binding) || !phases[pair.binding].includes(pair.delivery)) throw Error("Invalid binding/delivery pair");
      const key2 = pair.binding + ":" + pair.delivery;
      if (seen.has(key2)) throw Error("Duplicate binding/delivery pair");
      seen.add(key2);
    }
  }
  return freeze(json(value));
}
function validateScheduleRequest(spec, manifest) {
  if (!spec || !["target", "binding", "delivery"].some((k) => Object.hasOwn(spec, k))) return true;
  if (Object.hasOwn(spec, "target") && actor(spec.target) && !["binding", "delivery"].some((k) => Object.hasOwn(spec, k))) return true;
  if (!["target", "binding", "delivery"].every((k) => Object.hasOwn(spec, k)) || !actor(spec.owner) || spec.target !== null && !actor(spec.target) || !Number.isFinite(spec.delay) || spec.delay < 0 || spec.delay > 3600) throw Error("Incomplete typed schedule metadata");
  const kind = bindingKind(spec.binding);
  if (!phases[kind].includes(spec.delivery) || ["status", "entity-link", "channel"].includes(kind) && spec.target === null) throw Error("Invalid typed schedule target or phase");
  if (!manifest?.[spec.handler]?.some((pair) => pair.binding === kind && pair.delivery === spec.delivery)) throw Error("Handler did not declare this binding/delivery");
  return true;
}

// node_modules/@dotapk/heros/contract/rule-declarations.js
var actor2 = (id) => id === 0 || id === 1;
var exact2 = (v, keys) => !!v && Object.getPrototypeOf(v) === Object.prototype && Object.keys(v).sort().join(",") === keys.slice().sort().join(",");
var bounded = (n2) => Number.isFinite(n2) && n2 >= 0 && n2 <= 3600;
var identity = (s) => typeof s === "string" && /^[A-Za-z0-9][A-Za-z0-9_:/.\-]{0,159}$/.test(s);
function validateCastFactRequirements(value, implementation) {
  if (value === void 0) return null;
  if (!Array.isArray(value) || value.length !== 1 || value[0] !== "effectiveCastRange" || typeof implementation.planCast !== "function") throw Error("Invalid declared cast fact requirements");
  return Object.freeze([...value]);
}
function validateDeclaredCastFacts(implementation, slot, hook, facts) {
  const declared = implementation.requiredCastFacts?.includes("effectiveCastRange");
  if (Object.hasOwn(facts, "effectiveCastRange") && (!declared || hook !== "planCast")) throw Error("Undeclared or misplaced effective cast range fact");
  if (!declared || hook !== "planCast") return;
  if (!Object.hasOwn(facts, "effectiveCastRange") || !Number.isFinite(facts.effectiveCastRange) || facts.effectiveCastRange < 0 || facts.effectiveCastRange > 1e7) throw Error("Missing or invalid effective cast range fact");
  if (!actor2(facts.owner) || !actor2(facts.target) || facts.slot !== slot || typeof facts.abilityId !== "string") throw Error("Mismatched effective cast range fact identity");
}
var declarationKeys = ["id", "key", "recipient", "duration", "interval", "programId", "schedule", "polarity", "dispel", "pierces", "values"];
function validateStatusDeclarations(value, implementation, scheduledBindings) {
  if (value === void 0) return null;
  if (!Array.isArray(value) || !value.length || value.length > 128 || !implementation.requires.includes("status")) throw Error("Invalid declared status identity table");
  const table = json(value), ids = /* @__PURE__ */ new Set(), domains = /* @__PURE__ */ new Set();
  for (const d of table) {
    if (!exact2(d, declarationKeys) || !identity(d.id) || !identity(d.key) || !["self", "enemy"].includes(d.recipient) || !bounded(d.duration) || !bounded(d.interval) || !["positive", "negative"].includes(d.polarity) || !["basic", "strong", "none"].includes(d.dispel) || typeof d.pierces !== "boolean" || !d.values || Object.getPrototypeOf(d.values) !== Object.prototype || Object.keys(d.values).length > 64) throw Error("Invalid status declaration");
    const domain = d.key + ":" + d.recipient;
    if (ids.has(d.id) || domains.has(domain)) throw Error("Ambiguous status declaration identity or recipient domain");
    ids.add(d.id);
    domains.add(domain);
    if (d.programId === null) {
      if (d.interval !== 0 || d.schedule !== null) throw Error("Unscheduled status cannot declare a pulse");
    } else {
      const s = d.schedule;
      if (!identity(d.programId) || d.interval <= 0 || !exact2(s, ["handler", "binding", "delivery"]) || typeof s.handler !== "string" || !/^[-\w]{1,64}$/.test(s.handler) || s.binding !== "status" || !["actor.status-pre-advance", "actor.status-advance"].includes(s.delivery) || !Object.hasOwn(implementation.scheduledHandlers ?? {}, s.handler) || !implementation.requires.includes("schedule") || !scheduledBindings?.[s.handler]?.some((pair) => pair.binding === "status" && pair.delivery === s.delivery)) throw Error("Invalid status program/binding declaration");
    }
  }
  return freeze(table);
}
function selectedDeclaration(spec, implementation) {
  if (!spec || Object.getPrototypeOf(spec) !== Object.prototype || !identity(spec.statusDeclarationId)) throw Error("Missing status declaration identity");
  const d = implementation.statusDeclarations?.find((d2) => d2.id === spec.statusDeclarationId);
  if (!d) throw Error("Unknown status declaration identity");
  if (!actor2(spec.owner) || !actor2(spec.target) || spec.target !== (d.recipient === "self" ? spec.owner : 1 - spec.owner)) throw Error("Mismatched status recipient domain");
  return d;
}
function validateDeclaredStatusRequest(name, spec, implementation) {
  const hasId = !!spec && typeof spec === "object" && Object.hasOwn(spec, "statusDeclarationId");
  if (hasId && !["status.apply", "schedule"].includes(name)) throw Error("Misplaced status declaration identity");
  if (!implementation.statusDeclarations) {
    if (hasId) throw Error("Undeclared status identity request");
    return;
  }
  if (name === "status.apply") {
    const d = selectedDeclaration(spec, implementation);
    if (!exact2(spec, ["owner", "target", "abilityId", "key", "duration", "polarity", "dispel", "pierces", "values", "statusDeclarationId"]) || spec.key !== d.key || spec.duration !== d.duration || spec.polarity !== d.polarity || spec.dispel !== d.dispel || spec.pierces !== d.pierces || canonical(spec.values) !== canonical(d.values)) throw Error("Mismatched declared status source parameters");
  } else if (name === "schedule" && (spec?.binding?.kind === "status" || hasId || implementation.statusDeclarations.some((d) => d.schedule?.handler === spec?.handler))) {
    const d = selectedDeclaration(spec, implementation);
    const keys = ["abilityId", "owner", "target", "handler", "delay", "data", "binding", "delivery", "statusDeclarationId"];
    if (!exact2(spec, Object.hasOwn(spec, "token") ? [...keys, "token"] : keys) || !d.schedule || spec.binding?.kind !== "status" || spec.handler !== d.schedule.handler || spec.delivery !== d.schedule.delivery || spec.delay !== d.interval) throw Error("Mismatched declared status pulse program or cadence");
  }
}

// node_modules/@dotapk/heros/contract/registry.js
var BATTLE_ABI = "heros-effects-2";
var CAPABILITIES = Object.freeze(["damage", "heal", "mana", "transfer-mana", "self-damage", "protect", "status", "control", "target-route", "motion-request", "projectile-request", "legacy-effect", "schedule", "action-token", "deferred-hp", "cue"]);
var HOOKS = Object.freeze(["planCast", "onCastCommitted", "activate", "onContact", "onInterrupt", "onDeath", "projectAttack", "projectDamage", "projectHealing", "projectInterval", "onAttack", "onDamage", "onTargeted", "onStage"]);
var semver = (v) => typeof v === "string" && /^\d+\.\d+\.\d+$/.test(v);
function validateDefinition(hero, resources) {
  const h2 = json(hero);
  if (!Number.isSafeInteger(h2.registryNumericId) || !Number.isSafeInteger(h2.valveHeroId) || typeof h2.id !== "string" || !Array.isArray(h2.abilities) || h2.abilities.length !== 4) throw Error("Invalid hero identity/schema");
  for (const k of ["hp", "mana_regen", "attack", "move_speed", "attack_range", "attack_interval_s"]) if (!Number.isFinite(h2[k]) || h2[k] < 0 || h2[k] > 1e7) throw Error("Invalid hero coefficient: " + k);
  for (const k of ["mana", "combatHp", "combatMana"]) if (h2[k] !== void 0 && (!Number.isFinite(h2[k]) || h2[k] < 0 || h2[k] > 1e7)) throw Error("Invalid optional hero coefficient: " + k);
  const ids = /* @__PURE__ */ new Set();
  for (const a of h2.abilities) {
    if (typeof a.id !== "string" || ids.has(a.id) || !a.mvp || typeof a.mvp.passive !== "boolean") throw Error("Invalid ability identity/schema");
    ids.add(a.id);
    validateRecipe(a, resources);
  }
  return freeze(h2);
}
function validateImplementation(raw, executionParameters2) {
  if (!raw || typeof raw.behaviorId !== "string" || !raw.behaviorId || !semver(raw.revision) || !Array.isArray(raw.requires) || new Set(raw.requires).size !== raw.requires.length || raw.requires.some((c) => !CAPABILITIES.includes(c)) || !isStateSchema(raw.stateSchema)) throw Error("Invalid behavior metadata/capabilities/canonical schema");
  const identity2 = assertCodeIdentity(raw);
  if (raw.namespace !== void 0 && (typeof raw.namespace !== "string" || !/^heros\/[a-z0-9/_-]{1,96}$/.test(raw.namespace))) throw Error("Invalid owned rule namespace");
  const allowed = /* @__PURE__ */ new Set(["behaviorId", "revision", "requires", "stateSchema", "scheduledHandlers", "scheduledBindings", "requiredCastFacts", "statusDeclarations", "namespace", "codeHash", "sourceFiles", ...HOOKS]);
  for (const k of Object.keys(raw)) {
    if (!allowed.has(k)) throw Error("Unknown behavior field: " + k);
    if (HOOKS.includes(k) && typeof raw[k] !== "function") throw Error("Invalid behavior hook");
  }
  if (!HOOKS.some((k) => typeof raw[k] === "function")) throw Error("Empty implementation");
  if (raw.scheduledHandlers !== void 0 && (!raw.scheduledHandlers || Object.getPrototypeOf(raw.scheduledHandlers) !== Object.prototype || Object.entries(raw.scheduledHandlers).some(([k, v]) => !/^[-\w]{1,64}$/.test(k) || typeof v !== "function"))) throw Error("Invalid scheduled handlers");
  const scheduledBindings = validateScheduledBindings(raw.scheduledBindings, raw.scheduledHandlers);
  if (scheduledBindings && !raw.requires.includes("schedule")) throw Error("Scheduled binding requires schedule capability");
  const requiredCastFacts = validateCastFactRequirements(raw.requiredCastFacts, raw), statusDeclarations = validateStatusDeclarations(raw.statusDeclarations, raw, scheduledBindings);
  return Object.freeze({ ...raw, ...requiredCastFacts ? { requiredCastFacts } : {}, ...statusDeclarations ? { statusDeclarations } : {}, scheduledBindings, ...identity2, executionParameters: executionParameters2, requires: Object.freeze([...raw.requires]), scheduledHandlers: Object.freeze({ ...raw.scheduledHandlers }), validateState: raw.stateSchema.validate });
}
var key = (heroId, slot) => heroId + ":" + slot;
function behaviorManifest(impl) {
  return { behaviorId: impl.behaviorId, revision: impl.revision, requires: impl.requires, namespace: impl.namespace ?? null, codeHash: impl.codeHash, sourceFiles: impl.sourceFiles, executionParameters: impl.executionParameters, stateSchema: { id: impl.stateSchema.id, version: impl.stateSchema.version, schemaHash: impl.stateSchema.schemaHash, schema: impl.stateSchema.schema, parameters: impl.stateSchema.parameters, refinement: impl.stateSchema.refinement }, hooks: HOOKS.filter((k) => impl[k]), ...impl.requiredCastFacts ? { requiredCastFacts: impl.requiredCastFacts } : {}, ...impl.statusDeclarations ? { statusDeclarations: impl.statusDeclarations } : {}, scheduledHandlers: Object.keys(impl.scheduledHandlers).sort(), scheduledBindings: impl.scheduledBindings };
}
function createHeroRegistry(initial2 = heroes, { defaults = true } = {}) {
  if (!Array.isArray(initial2) || initial2.length !== heroes.length) throw Error("Expected frozen 46 roster");
  const initialResources = buildResourceSchema(initial2);
  const identity2 = new Map(heroes.map((h2) => [h2.registryNumericId, h2])), rows = /* @__PURE__ */ new Map();
  let locked = false, cached, definitionCache, compiledCache;
  function checkIdentity(h2) {
    const expected = identity2.get(h2.registryNumericId);
    if (!expected || expected.id !== h2.id || expected.valveHeroId !== h2.valveHeroId || h2.abilities.some((a, i) => a.id !== expected.abilities[i].id)) throw Error("Out-of-scope hero/ability identity");
  }
  for (const source of initial2) {
    const h2 = validateDefinition(source, initialResources);
    checkIdentity(h2);
    if (rows.has(h2.registryNumericId)) throw Error("Duplicate hero");
    rows.set(h2.registryNumericId, h2);
  }
  let factories = /* @__PURE__ */ new Map();
  const allDefinitions = () => definitionCache ??= freeze([...rows.values()]);
  function checkedFactory(factory) {
    if (!factory || factory.abiVersion !== BATTLE_ABI || typeof factory.create !== "function" || Object.keys(factory).some((k) => !["abiVersion", "create", "parameters"].includes(k))) throw Error("Invalid factory/ABI");
    return Object.freeze({ ...factory, parameters: freeze(json(factory.parameters ?? {})) });
  }
  function compile(definitions, entries) {
    const byId = new Map(definitions.map((h2) => [h2.registryNumericId, h2])), implementations = /* @__PURE__ */ new Map(), schemas = /* @__PURE__ */ new Map();
    for (const [id, factory] of entries) {
      const [heroId, slot] = id.split(":").map(Number), hero = byId.get(heroId), impl = validateImplementation(factory.create(Object.freeze({ hero, definition: hero.abilities[slot], definitions, resources: buildResourceSchema(definitions), parameters: factory.parameters })), factory.parameters), namespace = impl.namespace ?? "skill:" + heroId + ":" + hero.abilities[slot].id;
      const existing = schemas.get(namespace), next = impl.stateSchema;
      if (existing && (existing.schemaHash !== next.schemaHash || existing.id !== next.id || existing.version !== next.version || existing.validate !== next.validate)) throw Error("Conflicting canonical namespace schema");
      schemas.set(namespace, next);
      implementations.set(id, impl);
    }
    return { implementations, schemas };
  }
  function registerFactory(heroId, slot, source) {
    if (locked) throw Error("Registry sealed");
    if (!rows.has(heroId) || !Number.isInteger(slot) || slot < 0 || slot > 3) throw Error("Invalid hero/slot");
    const id = key(heroId, slot);
    if (factories.has(id)) throw Error("Duplicate skill implementation");
    const factory = checkedFactory(source), prospective = new Map(factories);
    prospective.set(id, factory);
    const compiled = compile(allDefinitions(), prospective);
    factories = prospective;
    compiledCache = compiled;
    return api;
  }
  function replaceSkill(heroId, slot, replacement, expected) {
    if (locked) throw Error("Registry sealed");
    const hero = rows.get(heroId), oldFactory = factories.get(key(heroId, slot));
    if (!hero || !oldFactory) throw Error("No registered skill");
    const before = compiledCache ?? compile(allDefinitions(), factories), old = hero.abilities[slot], oldImpl = before.implementations.get(key(heroId, slot));
    if (!expected || expected.abilityId !== old.id || expected.revision !== oldImpl.revision) throw Error("Stale expected ability/revision");
    if (!replacement?.definition || replacement.definition.id !== old.id) throw Error("Replacement must retain selected ability identity");
    const next = validateDefinition({ ...hero, abilities: hero.abilities.map((a, i) => i === slot ? replacement.definition : a) }, buildResourceSchema(allDefinitions())), definitions = freeze(allDefinitions().map((h2) => h2.registryNumericId === heroId ? next : h2)), prospective = new Map(factories);
    if (replacement.factory) prospective.set(key(heroId, slot), checkedFactory(replacement.factory));
    const compiled = compile(definitions, prospective), nextImpl = compiled.implementations.get(key(heroId, slot));
    if (replacement.factory && canonical(behaviorManifest(nextImpl)) === canonical(behaviorManifest(oldImpl))) throw Error("Behavior replacement requires a changed declared identity or execution parameters");
    rows.set(heroId, next);
    factories = prospective;
    definitionCache = definitions;
    compiledCache = compiled;
    return api;
  }
  function seal() {
    if (cached) return cached;
    const definitions = allDefinitions(), compiled = compiledCache ?? compile(definitions, factories), manifest = [];
    for (const [id, impl] of compiled.implementations) {
      const [heroId, slot] = id.split(":").map(Number);
      manifest.push({ heroId, slot, abilityId: rows.get(heroId).abilities[slot].id, ...behaviorManifest(impl) });
    }
    const rosterHash = sha256(canonical(definitions.map((h2) => ({ heroId: h2.registryNumericId, valveHeroId: h2.valveHeroId, id: h2.id, abilities: h2.abilities.map((a) => a.id) })))), rulesHash = sha256(canonical({ abi: BATTLE_ABI, coreCode: coreCodeIdentity(), definitions, resources: buildResourceSchema(definitions), manifest: manifest.sort((a, b) => a.heroId - b.heroId || a.slot - b.slot) }));
    cached = Object.freeze({ abiVersion: BATTLE_ABI, rulesHash, rosterHash, definitions, resources: buildResourceSchema(definitions), manifest: freeze(manifest), hero: (heroId) => rows.get(heroId) ?? null, implementation: (heroId, slot) => compiled.implementations.get(key(heroId, slot)) ?? null, namespaceSchema: (namespace) => compiled.schemas.get(namespace) ?? null });
    locked = true;
    return cached;
  }
  const api = Object.freeze({ registerFactory, replaceSkill, seal, definition: (heroId) => rows.get(heroId) ?? null });
  if (defaults) for (const row of legacyThreeFactories) registerFactory(row.heroId, row.slot, { abiVersion: BATTLE_ABI, create: row.create });
  return api;
}

// node_modules/@dotapk/heros/contract/session.js
var actorId = (id) => {
  if (id !== 0 && id !== 1) throw Error("Invalid actor");
  return id;
};
var actorKeys = ["id", "heroId", "hp", "maxHp", "mp", "maxMp", "x", "y", "dir", "alive", "invulnerable", "debuffImmune", "passivesEnabled", "guarding", "rooted", "silenced"];
var portNames = Object.freeze({ damage: ["damage"], heal: ["heal"], mana: ["mana"], "transfer-mana": ["transferMana"], "self-damage": ["selfDamage"], protect: ["protect"], status: ["status.apply", "status.remove", "status.query", "status.cleanse"], control: ["control.apply", "control.release"], "target-route": ["target.route"], "motion-request": ["motion"], "projectile-request": ["projectile"], "legacy-effect": ["legacyEffect.spawn", "legacyEffect.view", "legacyEffect.end"], schedule: ["schedule", "cancelJob"], "action-token": ["action.token", "action.valid"], "deferred-hp": ["deferredHP.begin", "deferredHP.settle"], cue: ["cue"] });
function actorFact(host, id, resources) {
  actorId(id);
  const source = host.actor(id), out = {};
  for (const k of actorKeys) out[k] = source[k];
  if (out.id !== id || !Number.isSafeInteger(out.heroId) || ![1, -1].includes(out.dir) || ["hp", "maxHp", "mp", "maxMp", "x", "y"].some((k) => !Number.isFinite(out[k])) || ["alive", "invulnerable", "debuffImmune", "passivesEnabled", "guarding", "rooted", "silenced"].some((k) => typeof out[k] !== "boolean")) throw Error("Invalid read-only actor fact");
  if (!validManaFact(resources, out)) throw Error("Actor mana exceeds declared resource schema");
  return freeze(out);
}
function createRuleSession(sealed) {
  if (sealed?.abiVersion !== BATTLE_ABI) throw Error("Incompatible sealed registry");
  let namespaces = /* @__PURE__ */ new Map();
  const namespace = (heroId, slot) => sealed.implementation(heroId, slot).namespace ?? "skill:" + heroId + ":" + sealed.hero(heroId).abilities[slot].id;
  function select(heroId, slot) {
    const hero = sealed.hero(heroId), impl = sealed.implementation(heroId, slot);
    return hero && impl ? { hero, impl, ability: hero.abilities[slot], ns: namespace(heroId, slot) } : null;
  }
  function context(selected2, host) {
    if (!host || typeof host.now !== "function" || typeof host.actor !== "function" || typeof host.random !== "function" || !host.ports) throw Error("Invalid host facts/ports");
    const now = host.now();
    if (!Number.isFinite(now) || now < 0) throw Error("Invalid host time");
    const { impl, ability, ns } = selected2, schema = sealed.namespaceSchema(ns);
    function stateValue() {
      return namespaces.get(ns) ?? null;
    }
    const ctx = { now, actor: (id) => actorFact(host, id, sealed.resources), random: () => {
      const v = host.random();
      if (!Number.isFinite(v) || v < 0 || v >= 1) throw Error("Invalid host random");
      return v;
    }, state: Object.freeze({ read: () => freeze(json(stateValue())), write: (value) => {
      const v = json(value);
      if (!schema.validate(v)) throw Error("Invalid namespace state");
      namespaces.set(ns, freeze(v));
    }, remove: () => namespaces.delete(ns) }), target: { distance: (a, b) => Math.abs(actorFact(host, a, sealed.resources).x - actorFact(host, b, sealed.resources).x) } };
    const call = (name, ...args) => {
      const [group, method] = name.split("."), fn = method ? host.ports[group]?.[method] : host.ports[group];
      if (typeof fn !== "function") throw Error("Missing declared port: " + name);
      const request = args.map((x) => json(x));
      if (name === "schedule") validateScheduleRequest(request[0], impl.scheduledBindings);
      validateDeclaredStatusRequest(name, request[0], impl);
      if (request[0] && typeof request[0] === "object" && !Array.isArray(request[0])) {
        const spec = request[0];
        if ("abilityId" in spec && spec.abilityId !== ability.id) throw Error("Cross-namespace ability request");
        for (const k of ["owner", "target", "source", "actor"]) if (k in spec && !(name === "schedule" && k === "target" && spec[k] === null)) actorId(spec[k]);
      }
      const value = fn(...request);
      return value === void 0 ? void 0 : freeze(json(value));
    };
    for (const cap of impl.requires) {
      if (!CAPABILITIES.includes(cap)) throw Error("Unsupported capability");
      for (const name of portNames[cap]) {
        const [group, method] = name.split(".");
        if (method) {
          ctx[group] ??= {};
          ctx[group][method] = (...args) => call(name, ...args);
        } else ctx[name] = (...args) => call(name, ...args);
      }
    }
    for (const [k, v] of Object.entries(ctx)) if (v && typeof v === "object") Object.freeze(v);
    return Object.freeze(ctx);
  }
  function invoke(heroId, slot, hook, host, event) {
    if (!HOOKS.includes(hook)) throw Error("Unknown rule hook");
    const selected2 = select(heroId, slot);
    if (!selected2 || typeof selected2.impl[hook] !== "function") return Object.freeze({ handled: false });
    const facts = freeze(json(event));
    validateDeclaredCastFacts(selected2.impl, slot, hook, facts);
    if ("abilityId" in facts && facts.abilityId !== selected2.ability.id) throw Error("Mismatched ability event");
    if ("owner" in facts) {
      const owner = actorFact(host, facts.owner, sealed.resources);
      if (owner.heroId !== heroId) throw Error("Mismatched owner hero");
    }
    const result2 = selected2.impl[hook](context(selected2, host), facts);
    return Object.freeze({ handled: true, value: result2 === void 0 ? null : freeze(json(result2)) });
  }
  function scheduled(heroId, slot, name, host, data) {
    const selected2 = select(heroId, slot), handler = selected2?.impl.scheduledHandlers[name];
    if (!handler) throw Error("Unknown named scheduled handler");
    return handler(context(selected2, host), freeze(json(data)));
  }
  function snapshot() {
    return freeze({ abiVersion: BATTLE_ABI, rulesHash: sealed.rulesHash, version: 1, namespaces: [...namespaces].sort(([a], [b]) => a.localeCompare(b)).map(([name, state]) => ({ namespace: name, state: json(state) })) });
  }
  function prepareRestore(value) {
    const next = json(value);
    if (Object.keys(next).sort().join(",") !== "abiVersion,namespaces,rulesHash,version" || next.abiVersion !== BATTLE_ABI || next.rulesHash !== sealed.rulesHash || next.version !== 1 || !Array.isArray(next.namespaces)) throw Error("Incompatible rules-only snapshot");
    const known = new Map(sealed.manifest.map((row) => [namespace(row.heroId, row.slot), sealed.namespaceSchema(namespace(row.heroId, row.slot))])), pending = /* @__PURE__ */ new Map();
    for (const row of next.namespaces) {
      if (Object.keys(row).sort().join(",") !== "namespace,state" || pending.has(row.namespace) || !known.get(row.namespace)?.validate(row.state)) throw Error("Invalid namespace snapshot");
      pending.set(row.namespace, freeze(json(row.state)));
    }
    return pending;
  }
  function restore(value) {
    namespaces = prepareRestore(value);
  }
  return Object.freeze({ sealed, invoke, scheduled, snapshot, restore, validateSnapshot: (value) => {
    try {
      prepareRestore(value);
      return true;
    } catch {
      return false;
    }
  }, validateFacts: (host) => {
    try {
      actorFact(host, 0, sealed.resources);
      actorFact(host, 1, sealed.resources);
      return true;
    } catch {
      return false;
    }
  }, has: (heroId, slot, hook = "activate") => typeof select(heroId, slot)?.impl[hook] === "function" });
}

// node_modules/@dotapk/heros/rules/a/parameters.js
var A_PARAMETERS = Object.freeze({ adaptation: "author-a-v8", unitScale: 0.55, statusToggleSeconds: 3600, routedDeliveryRange: 1200 });
function executionParameters(parameters2) {
  if (!parameters2 || Object.keys(parameters2).sort().join(",") !== Object.keys(A_PARAMETERS).sort().join(",") || parameters2.adaptation !== "author-a-v8" || parameters2.unitScale !== 0.55 || parameters2.statusToggleSeconds !== 3600 || parameters2.routedDeliveryRange !== 1200) throw Error("A_INVALID_EXECUTION_PARAMETERS");
  return parameters2;
}

// node_modules/@dotapk/heros/rules/a/model.js
var caches = /* @__PURE__ */ new WeakMap();
var clamp = (n2, a, b) => Math.max(a, Math.min(b, n2));
function validateExpression(expr, definition) {
  if (expr == null) return;
  if (typeof expr === "number") {
    if (!Number.isFinite(expr)) throw Error("A_INVALID_COEFFICIENT");
    return;
  }
  if (typeof expr === "string") {
    if (!Number.isFinite(definition.mvp.params?.[expr])) throw Error("A_SOURCE_COEFFICIENT:" + definition.id + "." + expr);
    return;
  }
  if (!expr || typeof expr !== "object" || Array.isArray(expr) || Object.keys(expr).some((k) => !["stat", "who", "mul", "add", "div", "min", "max"].includes(k))) throw Error("A_INVALID_EXPRESSION");
  if (expr.stat) {
    if (!["hp", "maxHp", "mp", "maxMp", "x", "y", "missingHp", "attack", "baseAttack", "str", "agi", "int"].includes(expr.stat) || expr.who !== void 0 && !["self", "target"].includes(expr.who) || Object.keys(expr).some((k) => !["stat", "who"].includes(k))) throw Error("A_INVALID_STAT_EXPRESSION");
    return;
  }
  const keys = Object.keys(expr);
  if (keys.length !== 1 || !["mul", "add", "div", "min", "max"].includes(keys[0])) throw Error("A_INVALID_EXPRESSION");
  const items = expr[keys[0]];
  if (!Array.isArray(items) || !items.length || keys[0] === "div" && items.length !== 2) throw Error("A_INVALID_EXPRESSION");
  items.forEach((x) => validateExpression(x, definition));
  if (keys[0] === "div" && (items[1] === 0 || typeof items[1] === "string" && definition.mvp.params[items[1]] === 0)) throw Error("A_ZERO_DIVISOR");
}
function expressionBound(expr, definition, definitions) {
  if (expr == null) return 0;
  if (typeof expr === "number" || typeof expr === "string") {
    const n2 = typeof expr === "number" ? expr : definition.mvp.params?.[expr];
    if (!Number.isFinite(n2) || n2 < 0) throw Error("A_NEGATIVE_OR_INVALID_EFFECT_COEFFICIENT");
    return n2;
  }
  if (expr.stat) {
    if (["hp", "maxHp", "missingHp"].includes(expr.stat)) return Math.max(...definitions.map((h2) => h2.combatHp ?? h2.hp * 2.8));
    if (["mp", "maxMp"].includes(expr.stat)) return Math.max(...definitions.map((h2) => h2.combatMana ?? 1200));
    if (["attack", "baseAttack"].includes(expr.stat)) return Math.max(...definitions.map((h2) => h2.attack));
    if (["str", "agi", "int"].includes(expr.stat)) return Math.max(...definitions.map((h2) => h2.arenaStats?.[expr.stat] ?? h2.attributes18?.[expr.stat] ?? 0));
    throw Error("A_EFFECT_STAT_BOUND_REQUIRED:" + expr.stat);
  }
  const b = (x) => expressionBound(x, definition, definitions);
  if (expr.mul) return expr.mul.reduce((n2, x) => n2 * b(x), 1);
  if (expr.add) return expr.add.reduce((n2, x) => n2 + b(x), 0);
  if (expr.div) {
    if (expr.div[1]?.stat || expr.div[1] && typeof expr.div[1] === "object") throw Error("A_DYNAMIC_DIVISOR_BOUND_REQUIRED");
    const d = b(expr.div[1]);
    if (d <= 0) throw Error("A_ZERO_DIVISOR");
    return b(expr.div[0]) / d;
  }
  if (expr.min) return Math.min(...expr.min.map(b));
  if (expr.max) return Math.max(...expr.max.map(b));
  throw Error("A_INVALID_EXPRESSION");
}
function model(config) {
  let result2 = caches.get(config.definitions);
  if (!result2) {
    let collect = function(id, node, path = "recipe") {
      if (Array.isArray(node)) {
        if (node.every((x) => x && typeof x.op === "string")) result2.programs.set(id + ":" + path, node);
        node.forEach((x, i) => collect(id, x, path + "." + i));
      } else if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) collect(id, v, path + "." + k);
    };
    result2 = { heroes: new Map(config.definitions.map((h2) => [h2.registryNumericId, h2])), programs: /* @__PURE__ */ new Map() };
    for (const h2 of config.definitions) for (const a of h2.abilities) collect(a.id, a.recipe);
    caches.set(config.definitions, result2);
  }
  return result2;
}
function coefficient(expr, ctx, c, definition, lookup) {
  if (expr == null) return 0;
  if (typeof expr === "number") return expr;
  if (typeof expr === "string") {
    const n2 = definition.mvp.params?.[expr];
    if (!Number.isFinite(n2)) throw Error("A_SOURCE_COEFFICIENT:" + definition.id + "." + expr);
    return n2;
  }
  if (expr.stat) {
    const f = ctx.actor(expr.who === "target" ? c.target : c.owner), h2 = lookup.heroes.get(f.heroId);
    if (expr.stat === "missingHp") return f.maxHp - f.hp;
    if (["attack", "baseAttack"].includes(expr.stat)) return h2.attack;
    if (["str", "agi", "int"].includes(expr.stat)) return h2.arenaStats?.[expr.stat] ?? h2.attributes18?.[expr.stat] ?? 0;
    const n2 = f[expr.stat];
    if (!Number.isFinite(n2)) throw Error("A_ACTOR_FACT_REQUIRED:" + expr.stat);
    return n2;
  }
  const r = (x) => coefficient(x, ctx, c, definition, lookup);
  if (expr.mul) return expr.mul.reduce((n2, x) => n2 * r(x), 1);
  if (expr.add) return expr.add.reduce((n2, x) => n2 + r(x), 0);
  if (expr.div) {
    const d = r(expr.div[1]);
    if (!d) throw Error("A_ZERO_DIVISOR");
    return r(expr.div[0]) / d;
  }
  if (expr.min) return Math.min(...expr.min.map(r));
  if (expr.max) return Math.max(...expr.max.map(r));
  throw Error("A_UNKNOWN_EXPRESSION");
}

// node_modules/@dotapk/heros/rules/a/gaps.js
var HOST_REQUESTS = Object.freeze({
  "vengefulspirit_nether_swap": "A-PORT-01: atomic two-actor swap plus target interruption",
  "kunkka_x_marks_the_spot": "A-STAGE-02: effective status expiry before removal and bounded return motion",
  "bloodseeker_rupture": "A-STAGE-03: pre-status-advance movement observation",
  "lich_sinister_gaze": "A-PORT-04: channel action lock and bounded pull policy",
  "death_prophet_exorcism": "A-PORT-05: host-owned returning spirit contact/expiry lifecycle",
  "death_prophet_spirit_siphon": "A-PORT-14: accepted native spirit-link handle and per-step leash/death lifecycle",
  "dragon_knight_elder_dragon_form": "A-PORT-06: temporary attack and ability range profile"
});
var HostPortRequired = class extends Error {
  constructor(abilityId) {
    super(HOST_REQUESTS[abilityId]);
    this.name = "HostPortRequired";
    this.abilityId = abilityId;
  }
};

// node_modules/@dotapk/heros/rules/a/state.js
var maximum = Number.MAX_SAFE_INTEGER;
var integer = { type: "integer", minimum: 1, maximum };
var time = { type: "number", minimum: 0, maximum: 1e12 };
var actor3 = { enum: [0, 1] };
var boolean = { type: "boolean" };
var handle = { type: "string", minLength: 1, maxLength: 160 };
var closed = (properties) => ({ type: "object", additionalProperties: false, required: Object.keys(properties), properties });
var array = (items) => ({ type: "array", maxItems: 128, items });
var base = { n: integer, owner: actor3, target: actor3, reflected: boolean };
var union = (schemas) => schemas.length ? { anyOf: schemas } : { type: "null" };
function refineOwnState(state, parameters2) {
  if (state === null) return true;
  const used = /* @__PURE__ */ new Set();
  for (const row of [...state.records, ...state.jobs, ...state.areas]) {
    if (row.n >= state.next || used.has(row.n)) return false;
    used.add(row.n);
  }
  for (const row of state.records) if (!parameters2.statusSchemas.some((v) => row.key === v.key && row.polarity === v.polarity && row.program === v.program && Math.abs(row.expires - row.startedAt - v.duration) < 1e-7)) return false;
  for (const row of state.areas) if (!parameters2.areaSchemas.some((v) => row.kind === v.kind && row.program === v.program && row.interval === v.interval && Math.abs(row.expires - row.startedAt - v.duration) < 1e-7 && row.pulses * row.interval <= v.duration + 1e-8)) return false;
  for (const row of state.jobs) if (row.route !== (parameters2.abilityId === "vengefulspirit_magic_missile" && !row.reflected)) return false;
  if (parameters2.statusDeclarations) {
    const handles = /* @__PURE__ */ new Set();
    for (const row of state.records) {
      const d = parameters2.statusDeclarations.find((x) => x.id === row.statusDeclarationId);
      if (!d || row.key !== d.key || row.program !== d.programId || row.interval !== d.interval || row.polarity !== d.polarity || row.pierces !== d.pierces || row.target !== (d.recipient === "self" ? row.owner : 1 - row.owner) || Math.abs(row.expires - row.startedAt - d.duration) > 1e-7 || handles.has(row.handle)) return false;
      handles.add(row.handle);
    }
  }
  for (const row of state.records) {
    const domain = parameters2.programTargets?.find((x) => x.programId === row.program);
    if (domain && (domain.statusRecipient !== "self" || domain.effectRecipient !== "enemy" || row.target !== row.owner || row.key !== domain.key || row.polarity !== "positive" || row.values.pulseToggle !== true)) return false;
  }
  return true;
}
function ownStateSchema(lookup, abilityId, statusSchemas, areaSchemas, delayPrograms, statusDeclarations = null, programTargets = [], areaDeliveryClock = null) {
  lookup.schemas ??= /* @__PURE__ */ new Map();
  if (lookup.schemas.has(abilityId)) return lookup.schemas.get(abilityId);
  const records = statusSchemas.map((v) => closed({ ...base, handle, key: { const: v.key }, startedAt: time, expires: time, program: { const: v.program }, interval: { const: v.interval }, values: { const: v.values }, remaining: { type: "number", minimum: 0, maximum: Number(v.values.shield || 0) }, polarity: { const: v.polarity }, pierces: { const: v.pierces }, ...statusDeclarations ? { statusDeclarationId: { const: v.statusDeclarationId } } : {} }));
  const areas = areaSchemas.map((v) => closed({ ...base, handle, startedAt: time, expires: time, interval: { const: v.interval }, radius: { const: v.radius }, follow: { const: v.follow }, aimX: { type: "number", minimum: 0, maximum: 1200 }, program: { const: v.program }, kind: { const: v.kind }, pulses: { type: "integer", minimum: 0, maximum } }));
  const jobs = [...delayPrograms].map((program) => closed({ ...base, handle, program: { const: program }, aimX: { type: "number", minimum: 0, maximum: 1200 }, route: boolean }));
  const schema = defineStateSchema({ id: "heros/a/" + abilityId, version: areaDeliveryClock ? "2.3.0" : statusDeclarations || programTargets.length ? "2.2.0" : "2.1.0", schema: { anyOf: [{ type: "null" }, closed({ next: integer, records: array(union(records)), jobs: array(union(jobs)), areas: array(union(areas)) })] }, parameters: { abilityId, statusSchemas, areaSchemas, delayPrograms: [...delayPrograms], ...statusDeclarations ? { statusDeclarations } : {}, ...programTargets.length ? { programTargets } : {}, ...areaDeliveryClock ? { areaDeliveryClock } : {} }, refinement: { id: "heros/a/record-source-consistency", ...codeIdentity(["rules/a/state.js"]), validate: refineOwnState } });
  lookup.schemas.set(abilityId, schema);
  return schema;
}

// node_modules/@dotapk/heros/rules/a/extensions/common.mjs
var actorId2 = (x) => {
  if (x !== 0 && x !== 1) throw Error("Invalid actor");
  return x;
};
var scalar = (x, label = "number") => {
  if (!Number.isFinite(x)) throw Error("Invalid " + label);
  return x;
};
var nonnegative = (x) => {
  scalar(x);
  if (x < 0) throw Error("Negative amount");
  return x;
};
var ordinal = (x) => {
  if (!Number.isSafeInteger(x) || x < 1) throw Error("Invalid ordinal");
  return x;
};
var handle2 = (x) => {
  if (typeof x !== "string" || !x.length || x.length > 128) throw Error("Invalid handle");
  return x;
};
var clampX = (x) => Math.max(45, Math.min(1155, scalar(x, "position")));
var freeze2 = (x) => {
  if (x && typeof x === "object") {
    Object.values(x).forEach(freeze2);
    Object.freeze(x);
  }
  return x;
};
function result(state, commands = []) {
  return freeze2({ state: structuredClone(state), commands: structuredClone(commands) });
}
function parameters(definition, names) {
  const p = definition.mvp?.params;
  if (!p) throw Error("Missing params");
  for (const name of names) {
    nonnegative(p[name]);
    if (p[name] > 1e7 || /(?:duration|Duration)$/.test(name) && p[name] > 3600) throw Error("Source parameter outside host bounds:" + name);
  }
  return structuredClone(p);
}
function actor4(f) {
  actorId2(f?.id);
  scalar(f.x);
  scalar(f.hp);
  scalar(f.maxHp);
  scalar(f.mp);
  scalar(f.maxMp);
  for (const key2 of ["alive", "invulnerable", "debuffImmune", "passivesEnabled"]) if (typeof f[key2] !== "boolean") throw Error("Missing actor fact " + key2);
  return f;
}
function begin(event) {
  handle2(event.castId);
  const owner = actor4(event.owner), target = actor4(event.target);
  if (typeof event.accepted !== "boolean" || typeof event.reflected !== "boolean") throw Error("Missing routed cast facts");
  return { castId: event.castId, owner: owner.id, target: target.id, reflected: event.reflected };
}
function live(state, event) {
  return !!state && state.castId === event.castId && state.phase !== "closed";
}
function damage(id, s, amount, type) {
  return { kind: "damage", abilityId: id, source: s.owner, target: s.target, amount: nonnegative(amount), type, dot: true, blockable: false, reflected: s.reflected, noReflect: s.reflected, noLifesteal: s.reflected };
}
function status(id, s, key2, duration, values, { to = s.target, positive = false, pierces = false, dispel = "basic", interval = 0 } = {}) {
  return { kind: "apply-status", abilityId: id, requestId: handle2(key2), owner: s.owner, target: to, key: key2, duration: nonnegative(duration), polarity: positive ? "positive" : "negative", pierces, dispel, interval, values };
}
function belongs(state, id) {
  return state === null || state?.abilityId === id && typeof state.castId === "string" && state.castId.length > 0 && state.castId.length <= 128 && [0, 1].includes(state.owner) && [0, 1].includes(state.target) && typeof state.reflected === "boolean" && ["waiting", "active", "closed"].includes(state.phase);
}
function exact3(x, keys) {
  return !!x && Object.keys(x).sort().join(",") === keys.slice().sort().join(",");
}
function machine(id, p, validator, handlers) {
  return Object.freeze({ abilityId: id, requiresHostContract: true, validateState: validator, handlers: Object.freeze(Object.fromEntries(Object.entries(handlers).map(([name, fn]) => [name, (state, event) => {
    if (!validator(state)) throw Error("Invalid own state");
    const next = fn(state === null ? null : structuredClone(state), event);
    if (!validator(next.state)) throw Error("Invalid resulting own state");
    return next;
  }]))) });
}

// node_modules/@dotapk/heros/rules/a/extensions/swap.mjs
function createSwap(definition) {
  const id = definition.id, p = parameters(definition, ["damage", "damage_reduction_duration"]);
  const valid = (s) => s === null || belongs(s, id) && exact3(s, ["abilityId", "castId", "owner", "target", "reflected", "phase", "statusHandle", "remaining", "lastCommit"]) && (s.statusHandle === null || typeof s.statusHandle === "string") && Number.isFinite(s.remaining) && s.remaining >= 0 && s.remaining <= p.damage && Number.isSafeInteger(s.lastCommit) && s.lastCommit >= 0;
  return machine(id, p, valid, {
    begin(old, e) {
      const c = begin(e);
      if (!e.accepted || !e.owner.alive) return result(old);
      if (old?.castId === c.castId) return result(old);
      const s = { ...c, abilityId: id, phase: "waiting", statusHandle: null, remaining: 0, lastCommit: 0 };
      const commands = [];
      if (!e.target.invulnerable) commands.push({ kind: "atomic-swap", abilityId: id, castId: c.castId, owner: c.owner, target: c.target, ownerDestinationX: clampX(e.target.x), targetDestinationX: clampX(e.owner.x), interruptTarget: true, collisionPolicy: "v8-move" });
      commands.push(damage(id, s, p.damage, "magical"));
      if (!e.owner.invulnerable) commands.push(status(id, s, id, p.damage_reduction_duration, { shield: p.damage }, { to: s.owner, positive: true }));
      else s.phase = "closed";
      return result(s, commands);
    },
    statusReceipt(s, e) {
      if (!live(s, e) || s.phase !== "waiting") return result(s);
      if (e.accepted) {
        s.statusHandle = handle2(e.handle);
        s.remaining = p.damage;
        s.phase = "active";
      } else {
        s.phase = "closed";
      }
      return result(s);
    },
    projectPostMitigation(s, e) {
      if (!live(s, e) || s.phase !== "active" || !e.effective || actor4(e.target).id !== s.owner) return result(s);
      const debit = Math.min(nonnegative(e.amount), s.remaining);
      return result(s, [{ kind: "damage-projection", abilityId: id, amount: e.amount - debit, shieldDebit: debit, statusHandle: s.statusHandle }]);
    },
    shieldCommitted(s, e) {
      if (!live(s, e) || e.handle !== s.statusHandle) return result(s);
      ordinal(e.ordinal);
      if (e.ordinal <= s.lastCommit) return result(s);
      nonnegative(e.amount);
      if (e.amount > s.remaining) throw Error("Shield cannot grow/overdraw");
      s.remaining -= e.amount;
      s.lastCommit = e.ordinal;
      return result(s);
    },
    statusRemoved(s, e) {
      if (!live(s, e) || e.handle !== s.statusHandle) return result(s);
      s.phase = "closed";
      s.statusHandle = null;
      s.remaining = 0;
      return result(s);
    },
    death(s, e) {
      if (!s || e.actor !== s.owner) return result(s);
      s.phase = "closed";
      s.statusHandle = null;
      s.remaining = 0;
      return result(s);
    }
  });
}

// node_modules/@dotapk/heros/rules/a/extensions/mark.mjs
function createMark(definition) {
  const id = definition.id, p = parameters(definition, ["duration"]);
  const valid = (s) => s === null || belongs(s, id) && exact3(s, ["abilityId", "castId", "owner", "target", "reflected", "phase", "statusHandle", "returnX"]) && (s.statusHandle === null || typeof s.statusHandle === "string") && Number.isFinite(s.returnX) && s.returnX >= 45 && s.returnX <= 1155;
  return machine(id, p, valid, {
    begin(old, e) {
      const c = begin(e);
      if (!e.accepted || !e.owner.alive || e.target.invulnerable || e.target.debuffImmune || !e.target.alive) return result(old);
      if (old?.castId === c.castId) return result(old);
      const s = { ...c, abilityId: id, phase: "waiting", statusHandle: null, returnX: clampX(e.target.x) };
      return result(s, [status(id, s, id, p.duration, {}, { dispel: "none" })]);
    },
    statusReceipt(s, e) {
      if (!live(s, e) || s.phase !== "waiting") return result(s);
      if (e.accepted) {
        s.statusHandle = handle2(e.handle);
        s.phase = "active";
      } else s.phase = "closed";
      return result(s);
    },
    statusExpiring(s, e) {
      if (!live(s, e) || e.handle !== s.statusHandle) return result(s);
      const target = actor4(e.target);
      if (target.id !== s.target) throw Error("Mark target mismatch");
      const commands = e.effective && target.alive && !target.invulnerable ? [{ kind: "forced-return", abilityId: id, castId: s.castId, actor: s.target, destinationX: s.returnX, rootPolicy: "v8-forced-motion", collisionPolicy: "v8-move" }] : [];
      s.phase = "closed";
      s.statusHandle = null;
      return result(s, commands);
    },
    statusRemoved(s, e) {
      if (!live(s, e) || e.handle !== s.statusHandle) return result(s);
      s.phase = "closed";
      s.statusHandle = null;
      return result(s);
    },
    death(s, e) {
      if (!s || e.actor !== s.target) return result(s);
      s.phase = "closed";
      s.statusHandle = null;
      return result(s);
    }
  });
}

// node_modules/@dotapk/heros/rules/a/extensions/rupture.mjs
function createRupture(definition) {
  const id = definition.id, p = parameters(definition, ["duration", "hp_pct", "movement_damage_pct", "damage_cap_amount"]);
  const valid = (s) => s === null || belongs(s, id) && exact3(s, ["abilityId", "castId", "owner", "target", "reflected", "phase", "statusHandle", "lastX", "lastObservation"]) && (s.statusHandle === null || typeof s.statusHandle === "string") && Number.isFinite(s.lastX) && s.lastX >= 0 && s.lastX <= 1200 && Number.isSafeInteger(s.lastObservation) && s.lastObservation >= 0;
  return machine(id, p, valid, {
    begin(old, e) {
      const c = begin(e);
      if (!e.accepted || !e.owner.alive || !e.target.alive) return result(old);
      if (old?.castId === c.castId) return result(old);
      const s = { ...c, abilityId: id, phase: "waiting", statusHandle: null, lastX: e.target.x, lastObservation: 0 };
      return result(s, [damage(id, s, e.target.hp * p.hp_pct / 100, "pure"), status(id, s, id, p.duration, { rupture: p.movement_damage_pct / 100, damageCap: p.damage_cap_amount }, { pierces: true, dispel: "none" })]);
    },
    statusReceipt(s, e) {
      if (!live(s, e) || s.phase !== "waiting") return result(s);
      if (e.accepted) {
        s.statusHandle = handle2(e.handle);
        s.phase = "active";
      } else s.phase = "closed";
      return result(s);
    },
    movementObserved(s, e) {
      if (!live(s, e) || s.phase !== "active" || e.handle !== s.statusHandle) return result(s);
      ordinal(e.ordinal);
      if (e.ordinal <= s.lastObservation) return result(s);
      const target = actor4(e.target);
      if (target.id !== s.target) throw Error("Rupture target mismatch");
      const distance = Math.abs(target.x - s.lastX) / 0.55;
      s.lastX = target.x;
      s.lastObservation = e.ordinal;
      const amount = distance * p.movement_damage_pct / 100;
      return result(s, e.effective && target.alive && !target.invulnerable && distance <= p.damage_cap_amount && amount > 0 ? [damage(id, s, amount, "pure")] : []);
    },
    statusRemoved(s, e) {
      if (!live(s, e) || e.handle !== s.statusHandle) return result(s);
      s.phase = "closed";
      s.statusHandle = null;
      return result(s);
    },
    death(s, e) {
      if (!s || e.actor !== s.target) return result(s);
      s.phase = "closed";
      s.statusHandle = null;
      return result(s);
    }
  });
}

// node_modules/@dotapk/heros/rules/a/extensions/gaze.mjs
function createGaze(definition) {
  const id = definition.id, p = parameters(definition, ["channel_duration", "mana_drain"]);
  const valid = (s) => s === null || belongs(s, id) && exact3(s, ["abilityId", "castId", "owner", "target", "reflected", "phase", "channelHandle", "lastPulse"]) && (s.channelHandle === null || typeof s.channelHandle === "string") && Number.isSafeInteger(s.lastPulse) && s.lastPulse >= 0 && s.lastPulse <= Math.floor(p.channel_duration / 0.25 + 1e-8);
  const end = (s, reason) => {
    const handle3 = s.channelHandle;
    s.phase = "closed";
    s.channelHandle = null;
    return result(s, [{ kind: "end-channel-area", abilityId: id, castId: s.castId, channelHandle: handle3, reason }]);
  };
  return machine(id, p, valid, {
    begin(old, e) {
      const c = begin(e);
      if (!e.accepted || !e.owner.alive) return result(old);
      if (old?.castId === c.castId) return result(old);
      const s = { ...c, abilityId: id, phase: "waiting", channelHandle: null, lastPulse: 0 };
      return result(s, [{ kind: "begin-channel-area", abilityId: id, castId: s.castId, owner: s.owner, target: s.target, duration: p.channel_duration, interval: 0.25, radius: 600 * 0.55, followOwner: true, lockMovement: true, lockAttacks: true, lockCasts: true, cancellation: ["control", "input-cancel", "movement", "action", "silence"], handler: "gazePulse" }]);
    },
    channelReceipt(s, e) {
      if (!live(s, e) || s.phase !== "waiting") return result(s);
      if (e.accepted) {
        s.channelHandle = handle2(e.handle);
        s.phase = "active";
      } else s.phase = "closed";
      return result(s);
    },
    gazePulse(s, e) {
      if (!live(s, e) || s.phase !== "active" || e.handle !== s.channelHandle) return result(s);
      ordinal(e.ordinal);
      if (e.ordinal <= s.lastPulse) return result(s);
      const owner = actor4(e.owner), target = actor4(e.target);
      if (owner.id !== s.owner || target.id !== s.target) throw Error("Gaze actor mismatch");
      if (e.channelAliveBeforePulse === false) return end(s, "expired");
      if (!owner.alive || !e.tokenValid) return end(s, e.reason || "interrupted");
      if (e.ordinal > Math.floor(p.channel_duration / 0.25 + 1e-8)) throw Error("Gaze pulse beyond duration");
      s.lastPulse = e.ordinal;
      if (!target.alive || target.invulnerable || target.debuffImmune || Math.abs(owner.x - target.x) > 600 * 0.55) return result(s);
      const destination = target.x + Math.sign(owner.x - target.x) * Math.min(Math.abs(owner.x - target.x), 25);
      return result(s, [{ kind: "transfer-mana", abilityId: id, source: s.target, target: s.owner, requested: target.mp * p.mana_drain / 100 * 0.25 }, status(id, s, id, 0.25, { stun: true }, { dispel: "strong" }), { kind: "control", abilityId: id, owner: s.owner, target: s.target, type: "stun", duration: 0.25, pierces: false, dispel: "strong" }, { kind: "bounded-pull", abilityId: id, castId: s.castId, actor: s.target, destinationX: clampX(destination), maxDistance: 25, rootPolicy: "v8-forced-motion", collisionPolicy: "v8-move" }]);
    },
    interrupted(s, e) {
      if (!live(s, e)) return result(s);
      return end(s, e.reason || "interrupted");
    },
    expired(s, e) {
      if (!live(s, e) || e.handle !== s.channelHandle) return result(s);
      return end(s, "expired");
    },
    death(s, e) {
      if (!s || e.actor !== s.owner || s.phase === "closed") return result(s);
      return end(s, "owner-dead");
    }
  });
}

// node_modules/@dotapk/heros/rules/a/extensions/exorcism.mjs
function createExorcism(definition) {
  const id = definition.id, p = parameters(definition, ["AbilityDuration", "spirits", "ghost_spawn_rate", "spirit_speed", "give_up_distance", "average_damage", "heal_percent"]);
  if (!Number.isSafeInteger(p.spirits) || p.spirits > 64 || p.ghost_spawn_rate <= 0) throw Error("Invalid spirit profile");
  const valid = (s) => s === null || belongs(s, id) && exact3(s, ["abilityId", "castId", "owner", "target", "reflected", "phase", "swarmHandle", "lastContact", "actual", "pending"]) && (s.swarmHandle === null || typeof s.swarmHandle === "string") && Number.isSafeInteger(s.lastContact) && s.lastContact >= 0 && Number.isFinite(s.actual) && s.actual >= 0 && s.actual <= 1e6 && Array.isArray(s.pending) && s.pending.length <= 64 && s.pending.every((n2) => Number.isSafeInteger(n2) && n2 >= 1 && n2 <= s.lastContact) && new Set(s.pending).size === s.pending.length;
  return machine(id, p, valid, {
    begin(old, e) {
      const c = begin(e);
      if (!e.accepted || !e.owner.alive) return result(old);
      if (old?.castId === c.castId) return result(old);
      const s = { ...c, abilityId: id, phase: "waiting", swarmHandle: null, lastContact: 0, actual: 0, pending: [] }, commands = [];
      if (old && old.phase !== "closed") commands.push({ kind: "end-returning-spirits", abilityId: id, castId: old.castId, handle: old.swarmHandle, reason: "replaced" });
      commands.push({ kind: "begin-returning-spirits", abilityId: id, castId: s.castId, owner: s.owner, target: s.target, duration: p.AbilityDuration, maxSpirits: p.spirits, spawnInterval: p.ghost_spawn_rate, speed: p.spirit_speed * 0.55, giveUpDistance: p.give_up_distance * 0.55, returnOnTargetDead: true, contactHandler: "hostileArrival", expiryHandler: "expired" });
      return result(s, commands);
    },
    swarmReceipt(s, e) {
      if (!live(s, e) || s.phase !== "waiting") return result(s);
      if (e.accepted) {
        s.swarmHandle = handle2(e.handle);
        s.phase = "active";
      } else s.phase = "closed";
      return result(s);
    },
    hostileArrival(s, e) {
      if (!live(s, e) || s.phase !== "active" || e.handle !== s.swarmHandle) return result(s);
      ordinal(e.ordinal);
      if (e.ordinal <= s.lastContact) return result(s);
      const owner = actor4(e.owner), target = actor4(e.target);
      if (owner.id !== s.owner || target.id !== s.target) throw Error("Spirit actor mismatch");
      s.lastContact = e.ordinal;
      if (!owner.alive || !target.alive) return result(s);
      if (s.pending.length >= 64) throw Error("Too many uncommitted contacts");
      s.pending.push(e.ordinal);
      return result(s, [{ ...damage(id, s, p.average_damage, "physical"), receiptHandler: "damageReceipt", receiptId: e.ordinal }]);
    },
    damageReceipt(s, e) {
      if (!live(s, e) || !s.pending.includes(e.ordinal)) return result(s);
      const actual = nonnegative(e.receipt.actual);
      if (!e.receipt.accepted && actual > 0) throw Error("Rejected damage cannot credit healing");
      s.actual += actual;
      if (s.actual > 1e6) throw Error("Actual total exceeds source snapshot bound");
      s.pending = s.pending.filter((n2) => n2 !== e.ordinal);
      return result(s);
    },
    expired(s, e) {
      if (!live(s, e) || e.handle !== s.swarmHandle) return result(s);
      if (s.pending.length) throw Error("Expiry must follow contact receipt commits");
      const owner = actor4(e.owner);
      if (owner.id !== s.owner) throw Error("Spirit owner mismatch");
      const actual = s.actual;
      s.phase = "closed";
      s.swarmHandle = null;
      s.actual = 0;
      return result(s, owner.alive ? [{ kind: "heal", abilityId: id, source: s.owner, target: s.owner, amount: actual * p.heal_percent / 100 }] : []);
    },
    death(s, e) {
      if (!s || e.actor !== s.owner || s.phase === "closed") return result(s);
      const swarm = s.swarmHandle;
      s.phase = "closed";
      s.swarmHandle = null;
      s.actual = 0;
      s.pending = [];
      return result(s, [{ kind: "end-returning-spirits", abilityId: id, castId: s.castId, handle: swarm, reason: "owner-dead" }]);
    }
  });
}

// node_modules/@dotapk/heros/rules/a/extensions/dragon.mjs
function createDragon(definition) {
  const id = definition.id, p = parameters(definition, ["duration", "bonus_attack_range", "bonus_ability_cast_range", "bonus_movement_speed", "corrosive_duration", "corrosive_damage_per_second", "frost_duration", "frost_bonus_movement_speed", "frost_bonus_attack_speed"]);
  const valid = (s) => s === null || belongs(s, id) && exact3(s, ["abilityId", "castId", "owner", "target", "reflected", "phase", "formHandle", "profileHandle", "lastAttack", "corrosion"]) && (s.formHandle === null || typeof s.formHandle === "string") && (s.profileHandle === null || typeof s.profileHandle === "string") && Number.isSafeInteger(s.lastAttack) && s.lastAttack >= 0 && Array.isArray(s.corrosion) && s.corrosion.length <= 2 && s.corrosion.every((x) => exact3(x, ["target", "handle", "ordinal"]) && [0, 1].includes(x.target) && typeof x.handle === "string" && Number.isSafeInteger(x.ordinal) && x.ordinal >= 0 && x.ordinal <= Math.floor(p.corrosive_duration + 1e-8)) && new Set(s.corrosion.map((x) => x.target)).size === s.corrosion.length;
  return machine(id, p, valid, {
    begin(old, e) {
      const c = begin(e);
      if (!e.accepted || !e.owner.alive) return result(old);
      if (old?.castId === c.castId) return result(old);
      const s = { ...c, abilityId: id, phase: "waiting", formHandle: null, profileHandle: null, lastAttack: old?.lastAttack || 0, corrosion: old?.corrosion || [] }, commands = [];
      if (!e.owner.invulnerable) commands.push(status(id, s, id, p.duration, { attackRange: p.bonus_attack_range * 0.55, moveFlat: p.bonus_movement_speed }, { to: s.owner, positive: true, dispel: "none" }));
      commands.push({ kind: "begin-attack-range-profile", abilityId: id, castId: s.castId, actor: s.owner, attackRangeBonus: p.bonus_attack_range * 0.55, duration: p.duration });
      return result(s, commands);
    },
    formReceipt(s, e) {
      if (!live(s, e)) return result(s);
      s.formHandle = e.accepted ? handle2(e.handle) : null;
      s.phase = "active";
      return result(s);
    },
    profileReceipt(s, e) {
      if (!live(s, e)) return result(s);
      s.profileHandle = e.accepted ? handle2(e.handle) : null;
      s.phase = "active";
      return result(s);
    },
    projectAbilityRange(s, e) {
      if (!live(s, e) || !s.formHandle || !e.formEffective) return result(s);
      return result(s, [{ kind: "cast-range-contribution", abilityId: id, actor: s.owner, flat: p.bonus_ability_cast_range * 0.55 }]);
    },
    projectMovement(s, e) {
      if (!live(s, e) || !s.formHandle || !e.formEffective) return result(s);
      return result(s, [{ kind: "movement-contribution", abilityId: id, actor: s.owner, flat: p.bonus_movement_speed }]);
    },
    landedAttack(s, e) {
      if (!s || !s.formHandle || !e.formPresent || !e.landed || e.secondary) return result(s);
      const owner = actor4(e.owner), target = actor4(e.target);
      if (owner.id !== s.owner) throw Error("Dragon owner mismatch");
      if (!owner.alive || !owner.passivesEnabled || !target.alive || target.invulnerable) return result(s);
      ordinal(e.ordinal);
      if (e.ordinal <= s.lastAttack) return result(s);
      s.lastAttack = e.ordinal;
      const c = { ...s, target: target.id }, commands = [];
      if (!target.debuffImmune) commands.push({ ...status(id, c, id + "_corrosion", p.corrosive_duration, {}, { interval: 1 }), receiptHandler: "corrosionReceipt", receiptTarget: target.id });
      commands.push(status(id, c, id + "_frost", p.frost_duration, { moveSlow: p.frost_bonus_movement_speed / 100, attackSlow: p.frost_bonus_attack_speed }, { pierces: true }));
      return result(s, commands);
    },
    corrosionReceipt(s, e) {
      if (!s || s.phase === "closed" && e.accepted) return result(s);
      if (!e.accepted) return result(s);
      const h2 = handle2(e.handle);
      if (![0, 1].includes(e.target)) throw Error("Invalid corrosion target");
      s.corrosion = s.corrosion.filter((x) => x.target !== e.target);
      s.corrosion.push({ target: e.target, handle: h2, ordinal: 0 });
      return result(s);
    },
    corrosionPulse(s, e) {
      if (!s) return result(s);
      const record = s.corrosion.find((x) => x.handle === e.handle);
      if (!record) return result(s);
      ordinal(e.ordinal);
      if (e.ordinal <= record.ordinal) return result(s);
      if (e.ordinal > Math.floor(p.corrosive_duration + 1e-8)) throw Error("Corrosion pulse beyond source lifetime");
      record.ordinal = e.ordinal;
      const owner = actor4(e.owner), target = actor4(e.target);
      if (owner.id !== s.owner || target.id !== record.target) throw Error("Corrosion actor mismatch");
      return result(s, target.alive && !target.invulnerable && !target.debuffImmune && e.effective ? [damage(id, { ...s, target: record.target }, p.corrosive_damage_per_second, "magical")] : []);
    },
    formExpired(s, e) {
      if (!s || e.handle !== s.formHandle) return result(s);
      s.formHandle = null;
      return result(s);
    },
    profileExpired(s, e) {
      if (!s || e.handle !== s.profileHandle) return result(s);
      s.profileHandle = null;
      return result(s);
    },
    statusRemoved(s, e) {
      if (!s) return result(s);
      s.corrosion = s.corrosion.filter((x) => x.handle !== e.handle);
      if (e.handle === s.formHandle) s.formHandle = null;
      return result(s);
    },
    death(s, e) {
      if (!s) return result(s);
      if (e.actor === s.owner) {
        const h2 = s.profileHandle;
        s.phase = "closed";
        s.formHandle = null;
        s.profileHandle = null;
        return result(s, h2 ? [{ kind: "end-attack-range-profile", abilityId: id, castId: s.castId, actor: s.owner, handle: h2, reason: "owner-dead" }] : []);
      }
      s.corrosion = s.corrosion.filter((x) => x.target !== e.actor);
      return result(s);
    }
  });
}

// node_modules/@dotapk/heros/rules/a/extensions/index.mjs
var constructors = Object.freeze({ vengefulspirit_nether_swap: createSwap, kunkka_x_marks_the_spot: createMark, bloodseeker_rupture: createRupture, lich_sinister_gaze: createGaze, death_prophet_exorcism: createExorcism, dragon_knight_elder_dragon_form: createDragon });
function createExtensionDraft(definition) {
  const create = constructors[definition.id];
  if (!create) throw Error("Not one of six owned extension skills");
  return create(definition);
}
var EXTENSION_ABILITIES = Object.freeze(Object.keys(constructors));

// node_modules/@dotapk/heros/rules/a/extensions/canonical.js
var EXTENSION_SOURCE_FILES = Object.freeze(["rules/a/extensions/canonical.js", "rules/a/extensions/common.mjs", "rules/a/extensions/index.mjs", "rules/a/extensions/swap.mjs", "rules/a/extensions/mark.mjs", "rules/a/extensions/rupture.mjs", "rules/a/extensions/gaze.mjs", "rules/a/extensions/exorcism.mjs", "rules/a/extensions/dragon.mjs"]);
var closed2 = (p) => ({ type: "object", additionalProperties: false, required: Object.keys(p), properties: p });
var h = { anyOf: [{ type: "null" }, { type: "string", minLength: 1, maxLength: 128 }] };
var n = { type: "integer", minimum: 0, maximum: Number.MAX_SAFE_INTEGER };
var actor5 = { enum: [0, 1] };
var groups = /* @__PURE__ */ new WeakMap();
function refineExtension(state, parameters2) {
  return createExtensionDraft(parameters2.definition).validateState(state);
}
function canonicalExtension(config) {
  if (!Array.isArray(config.definitions)) throw Error("A_EXTENSION_REQUIRES_DETACHED_DEFINITIONS");
  let group = groups.get(config.definitions);
  if (!group) {
    group = /* @__PURE__ */ new Map();
    groups.set(config.definitions, group);
  }
  if (group.has(config.definition.id)) return group.get(config.definition.id);
  const definition = config.definition, rule = createExtensionDraft(definition), p = definition.mvp.params;
  const base2 = { abilityId: { const: definition.id }, castId: { type: "string", minLength: 1, maxLength: 128 }, owner: actor5, target: actor5, reflected: { type: "boolean" }, phase: { enum: ["waiting", "active", "closed"] } };
  const tail = {
    vengefulspirit_nether_swap: { statusHandle: h, remaining: { type: "number", minimum: 0, maximum: p.damage }, lastCommit: n },
    kunkka_x_marks_the_spot: { statusHandle: h, returnX: { type: "number", minimum: 45, maximum: 1155 } },
    bloodseeker_rupture: { statusHandle: h, lastX: { type: "number", minimum: 0, maximum: 1200 }, lastObservation: n },
    lich_sinister_gaze: { channelHandle: h, lastPulse: { type: "integer", minimum: 0, maximum: Math.floor(p.channel_duration / 0.25 + 1e-8) } },
    death_prophet_exorcism: { swarmHandle: h, lastContact: n, actual: { type: "number", minimum: 0, maximum: 1e6 }, pending: { type: "array", maxItems: 64, items: { type: "integer", minimum: 1, maximum: Number.MAX_SAFE_INTEGER } } },
    dragon_knight_elder_dragon_form: { formHandle: h, profileHandle: h, lastAttack: n, corrosion: { type: "array", maxItems: 2, items: closed2({ target: actor5, handle: { type: "string", minLength: 1, maxLength: 128 }, ordinal: { type: "integer", minimum: 0, maximum: Math.floor(p.corrosive_duration + 1e-8) } }) } }
  }[definition.id];
  const stateSchema = defineStateSchema({ id: "heros/a/extension/" + definition.id, version: "2.0.0", schema: { anyOf: [{ type: "null" }, closed2({ ...base2, ...tail })] }, parameters: { definition }, refinement: { id: "heros/a/extension/source-constraints", ...codeIdentity(EXTENSION_SOURCE_FILES), validate: refineExtension } });
  const entry = Object.freeze({ rule, stateSchema, ...codeIdentity(EXTENSION_SOURCE_FILES) });
  group.set(definition.id, entry);
  return entry;
}

// node_modules/@dotapk/heros/rules/a/runtime.js
var A_SOURCE_FILES = Object.freeze(["rules/a/register.js", "rules/a/runtime.js", "rules/a/model.js", "rules/a/gaps.js", "rules/a/state.js", "rules/a/parameters.js", ...EXTENSION_SOURCE_FILES]);
var negativeKeys = /* @__PURE__ */ new Set(["disarm", "magicVulnerable", "moveSlow"]);
var controls = ["stun", "root", "hex", "fear", "taunt"];
var finite = (n2) => Number.isFinite(n2) && n2 >= 0;
var initial = () => ({ next: 1, records: [], jobs: [], areas: [] });
function capabilities(a) {
  const set = /* @__PURE__ */ new Set(["cue", "status"]);
  function scan(x) {
    if (!x || typeof x !== "object") return;
    if (Array.isArray(x)) {
      x.forEach(scan);
      return;
    }
    const map = { damage: "damage", heal: "heal", selfCost: "self-damage", mana: x.steal ? "transfer-mana" : "mana", delay: "schedule", area: "schedule", toggle: "schedule", upkeepPulse: "mana", deferredHP: "deferred-hp" };
    if (map[x.op]) set.add(map[x.op]);
    if (x.op === "area") set.add("legacy-effect");
    if (x.tick) set.add("schedule");
    if (x.values && controls.some((k) => x.values[k])) set.add("control");
    Object.values(x).forEach(scan);
  }
  scan(a.recipe);
  if (a.recipe.target === "enemy") set.add("target-route");
  if (a.recipe.aura) set.add("schedule");
  if (a.id === "death_prophet_spirit_siphon") {
    set.add("schedule");
    set.add("damage");
    set.add("heal");
  }
  return [...set].sort();
}
function createRule(config) {
  const settings = executionParameters(config.parameters);
  const a = config.definition, m = a.mvp, r = a.recipe, lookup = model(config), id = a.id;
  function preflight(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(preflight);
      return;
    }
    if (node.op && !["damage", "heal", "status", "selfCost", "mana", "delay", "area", "deferredHP", "toggle", "upkeepPulse", "special", "swap", "mark", "rupture", "pullStep"].includes(node.op)) throw Error("A_UNSUPPORTED_RECIPE_OPERATION:" + id + "/" + node.op);
    if (node.op === "special" && !["siphon", "exorcism", "dragon"].includes(node.name)) throw Error("A_UNSUPPORTED_SPECIAL:" + id + "/" + node.name);
    for (const key2 of ["amount", "percent", "cap", "cost", "duration", "interval", "radius", "delay", "damageFraction", "repayDuration"]) if (key2 in node) {
      validateExpression(node[key2], a);
      const bound = expressionBound(node[key2], a, config.definitions);
      if (!Number.isFinite(bound) || bound > 1e7 || ["duration", "delay", "interval", "repayDuration"].includes(key2) && bound > 3600 || key2 === "interval" && bound < 1e-3 || key2 === "damageFraction" && bound > 1) throw Error("A_EFFECT_COEFFICIENT_OUT_OF_BOUNDS:" + key2);
    }
    if (node.values) {
      for (const v of Object.values(node.values)) if (typeof v !== "boolean") validateExpression(v, a);
    }
    Object.values(node).forEach(preflight);
  }
  if (!r || !["self", "enemy", "point", "passive"].includes(r.target) || !Array.isArray(r.ops)) throw Error("A_INVALID_RECIPE");
  preflight(r);
  if (r.stats) Object.values(r.stats).forEach((x) => validateExpression(x, a));
  const programs = new Map([...lookup.programs].filter(([key2]) => key2.startsWith(id + ":")));
  const paths = new Map([...programs].map(([key2, value]) => [value, key2]));
  const root = id + ":recipe.ops";
  const usesEffectiveRange = id === "dragon_knight_breathe_fire" || id === "dragon_knight_dragon_tail";
  const declaresStatuses = id === "omniknight_hammer_of_purity", declarationIds = /* @__PURE__ */ new WeakMap();
  if (declaresStatuses) r.ops.forEach((op, index) => {
    if (op.op === "status") declarationIds.set(op, id + ":recipe.ops." + index);
  });
  const resolve = (x, ctx, c) => coefficient(x, ctx, c, a, lookup);
  const vv = (v, ctx, c) => Object.fromEntries(Object.entries(v || {}).map(([k, x]) => [k, typeof x === "boolean" ? x : resolve(x, ctx, c)]));
  const read = (ctx) => structuredClone(ctx.state.read() ?? initial());
  const write = (ctx, s) => ctx.state.write(s);
  const statusSchemas = [], areaSchemas = [], delayPrograms = /* @__PURE__ */ new Set();
  const noFacts = { actor() {
    throw Error("A_STATUS_SCHEMA_DYNAMIC_FACT");
  } };
  function schema(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(schema);
      return;
    }
    if (["status", "toggle"].includes(node.op)) {
      const v = vv(node.values, noFacts, {}), mixed = v.physicalImmune && Object.keys(v).some((k) => negativeKeys.has(k));
      const parts = mixed ? [{ key: (node.key || id) + "_positive", polarity: "positive", values: Object.fromEntries(Object.entries(v).filter(([k]) => !negativeKeys.has(k))) }, { key: (node.key || id) + "_hostile", polarity: "negative", values: Object.fromEntries(Object.entries(v).filter(([k]) => negativeKeys.has(k))) }] : [{ key: node.key || id, polarity: node.op === "toggle" || node.to === "self" ? "positive" : "negative", values: v }];
      for (const part of parts) statusSchemas.push({ ...part, pierces: !!node.pierces, duration: node.op === "toggle" ? settings.statusToggleSeconds : resolve(node.duration, noFacts, {}), interval: node.tick ? resolve(node.tick.interval, noFacts, {}) : 0, program: node.tick ? paths.get(node.tick.ops) : null, ...declaresStatuses ? { statusDeclarationId: declarationIds.get(node), recipient: node.to === "self" ? "self" : "enemy", dispel: node.dispel || "basic" } : {} });
    }
    if (node.op === "delay") delayPrograms.add(paths.get(node.ops));
    if (node.op === "area") areaSchemas.push({ kind: "area", duration: resolve(node.duration, noFacts, {}), interval: resolve(node.interval, noFacts, {}), radius: resolve(node.radius, noFacts, {}) * settings.unitScale, follow: !!node.follow, program: paths.get(node.ops) });
    Object.values(node).forEach(schema);
  }
  schema(r);
  if (HOST_REQUESTS[id] && id !== "death_prophet_spirit_siphon") canonicalExtension(config);
  const statusDeclarations = declaresStatuses ? statusSchemas.map((x) => ({ id: x.statusDeclarationId, key: x.key, recipient: x.recipient, duration: x.duration, interval: x.interval, programId: x.program, schedule: x.program ? { handler: "statusPulse", binding: "status", delivery: "actor.status-advance" } : null, polarity: x.polarity, dispel: x.dispel, pierces: x.pierces, values: x.values })) : null;
  const programTargets = statusSchemas.filter((x) => programs.get(x.program)?.some((op) => op.op === "upkeepPulse")).map((x) => {
    if (x.polarity !== "positive" || x.values.pulseToggle !== true) throw Error("A_UPKEEP_STATUS_DOMAIN");
    return { programId: x.program, key: x.key, statusRecipient: "self", effectRecipient: "enemy" };
  });
  for (const [programId, ops] of programs) if (ops.some((op) => op.op === "upkeepPulse") && !programTargets.some((x) => x.programId === programId)) throw Error("A_UPKEEP_PROGRAM_DOMAIN");
  const areaDeliveryClock = areaSchemas.length ? { version: 1, handler: "areaPulse", binding: "entity-area", delivery: "pack.entity", callbackAt: "authenticated-nominal", nativeExpired: "leased-native", resourceAt: "ctx.now", ordinal: "state.areas.pulses" } : null;
  const stateSchema = ownStateSchema(lookup, id, statusSchemas, areaSchemas, delayPrograms, statusDeclarations, programTargets, areaDeliveryClock);
  function exists(ctx, x) {
    return ctx.actor(x.target).alive && x.expires >= ctx.now - 1e-8 && ctx.status.query(x.target, x.key).some((s) => s.abilityId === id && s.owner === x.owner);
  }
  function effective(ctx, x) {
    const t = ctx.actor(x.target);
    return exists(ctx, x) && (x.polarity === "positive" || !t.invulnerable && (x.pierces || !t.debuffImmune));
  }
  function cancelRecord(ctx, s, x) {
    ctx.status.remove(x.handle);
    s.records = s.records.filter((v) => v.n !== x.n);
  }
  function addStatus(ctx, c, op) {
    const target = op.to === "self" ? c.owner : c.target, f = ctx.actor(target), duration = resolve(op.duration, ctx, c), v = vv(op.values, ctx, c);
    if (duration <= 0 || !f.alive || f.invulnerable) return;
    const mixed = !!v.physicalImmune && Object.keys(v).some((k) => negativeKeys.has(k));
    const parts = mixed ? [{ key: (op.key || id) + "_positive", polarity: "positive", values: Object.fromEntries(Object.entries(v).filter(([k]) => !negativeKeys.has(k))) }, { key: (op.key || id) + "_hostile", polarity: "negative", values: Object.fromEntries(Object.entries(v).filter(([k]) => negativeKeys.has(k))) }] : [{ key: op.key || id, polarity: target === c.owner ? "positive" : "negative", values: v }];
    for (const part of parts) {
      if (part.polarity === "negative" && (f.invulnerable || f.debuffImmune && !op.pierces)) continue;
      const statusDeclarationId = declaresStatuses ? declarationIds.get(op) : null;
      if (declaresStatuses && !statusDeclarationId) throw Error("A_STATUS_DECLARATION_SOURCE");
      const identity2 = declaresStatuses ? { statusDeclarationId } : {};
      const handle3 = ctx.status.apply({ owner: c.owner, target, abilityId: id, key: part.key, duration, polarity: part.polarity, dispel: op.dispel || "basic", pierces: !!op.pierces, values: part.values, ...identity2 });
      if (!handle3) continue;
      const s = read(ctx);
      for (const old of s.records.filter((x) => x.target === target && x.key === part.key)) cancelRecord(ctx, s, old);
      const row = { n: s.next++, owner: c.owner, target, reflected: !!c.reflected, handle: handle3, key: part.key, polarity: part.polarity, pierces: !!op.pierces, startedAt: ctx.now, expires: ctx.now + duration, program: op.tick ? paths.get(op.tick.ops) : null, interval: op.tick ? resolve(op.tick.interval, ctx, c) : 0, values: part.values, remaining: Number(part.values.shield || 0), ...identity2 };
      s.records.push(row);
      write(ctx, s);
      if (row.program) ctx.schedule({ abilityId: id, owner: row.owner, target: row.target, handler: "statusPulse", delay: row.interval, data: { record: row.n }, binding: { kind: "status", ref: row.handle }, delivery: "actor.status-advance", ...identity2 });
    }
    if (parts.some((part) => part.polarity === "positive") || !f.invulnerable && (!f.debuffImmune || op.pierces)) {
      for (const type of controls) if (v[type]) ctx.control.apply({ owner: c.owner, target, abilityId: id, key: id, type, duration, pierces: !!op.pierces, dispel: op.dispel || "basic" });
    }
  }
  function hit(ctx, c, amount, type = m.damage_type) {
    return ctx.damage({ source: c.owner, target: c.target, abilityId: id, amount, type: type === "none" ? "magical" : type, dot: true, blockable: false, reflected: !!c.reflected, noReflect: !!c.reflected, noLifesteal: !!c.reflected });
  }
  function execute(ctx, c, program) {
    const ops = programs.get(program);
    if (!ops) throw Error("A_NONCANONICAL_PROGRAM");
    for (const op of ops) {
      const target = op.to === "self" ? c.owner : c.target, f = ctx.actor(target);
      if (!["delay", "area"].includes(op.op) && op.radius !== void 0 && Math.abs((op.center === "aim" ? c.aimX : ctx.actor(c.owner).x) - f.x) > resolve(op.radius, ctx, c) * settings.unitScale) continue;
      switch (op.op) {
        case "damage":
          hit(ctx, { ...c, target }, resolve(op.amount, ctx, c), op.type || m.damage_type);
          break;
        case "heal":
          ctx.heal({ source: c.owner, target, abilityId: id, amount: resolve(op.amount, ctx, c) });
          break;
        case "status":
          addStatus(ctx, c, op);
          break;
        case "selfCost":
          ctx.selfDamage({ actor: c.owner, abilityId: id, amount: ctx.actor(c.owner).maxHp * resolve(op.percent, ctx, c) / 100, nonlethal: true });
          break;
        case "mana":
          if (f.alive && !f.invulnerable && !f.debuffImmune) {
            const requested = Math.max(0, resolve(op.amount, ctx, c));
            if (op.steal) ctx.transferMana({ source: target, target: c.owner, abilityId: id, requested });
            else ctx.mana({ actor: target, abilityId: id, delta: -Math.min(f.mp, requested) });
          }
          break;
        case "delay": {
          const s = read(ctx), row = { n: s.next++, owner: c.owner, target: c.target, reflected: !!c.reflected, handle: "pending", program: paths.get(op.ops), aimX: c.aimX, route: id === "vengefulspirit_magic_missile" && !c.reflected };
          row.handle = ctx.schedule({ abilityId: id, owner: row.owner, target: row.target, handler: "delayedProgram", delay: resolve(op.delay, ctx, c), data: { job: row.n }, binding: { kind: "source-job" }, delivery: "pack.job-due" });
          s.jobs.push(row);
          write(ctx, s);
          break;
        }
        case "area":
          startArea(ctx, c, { duration: resolve(op.duration, ctx, c), interval: resolve(op.interval, ctx, c), radius: resolve(op.radius, ctx, c) * settings.unitScale, follow: !!op.follow, program: paths.get(op.ops), kind: "area" });
          break;
        case "deferredHP":
          ctx.deferredHP.begin({ owner: c.owner, target: c.owner, abilityId: id, duration: resolve(op.duration, ctx, c), damageFraction: resolve(op.damageFraction, ctx, c), deferHealing: false, healingMultiplier: 1, repayDuration: resolve(op.repayDuration, ctx, c), nonlethal: op.nonlethal !== false, priority: 0 });
          break;
        case "toggle": {
          const s = read(ctx), old = s.records.filter((x) => x.owner === c.owner && x.key === id);
          if (old.length) {
            old.forEach((x) => cancelRecord(ctx, s, x));
            write(ctx, s);
          } else addStatus(ctx, c, { ...op, to: "self", duration: settings.statusToggleSeconds });
          break;
        }
        case "upkeepPulse": {
          const domain = programTargets.find((x) => x.programId === program);
          if (!domain || domain.statusRecipient !== "self" || domain.effectRecipient !== "enemy" || c.target !== c.owner) throw Error("A_UPKEEP_PROGRAM_DOMAIN");
          const pulse = { ...c, target: 1 - c.owner, aimX: ctx.actor(1 - c.owner).x }, cost = resolve(op.cost, ctx, pulse);
          if (ctx.actor(c.owner).mp < cost) {
            const s = read(ctx);
            s.records.filter((x) => x.owner === c.owner && x.key === id).forEach((x) => cancelRecord(ctx, s, x));
            write(ctx, s);
          } else {
            ctx.mana({ actor: c.owner, abilityId: id, delta: -cost });
            if (ctx.target.distance(c.owner, pulse.target) <= resolve(op.radius, ctx, pulse) * settings.unitScale) execute(ctx, pulse, paths.get(op.ops));
          }
          break;
        }
        case "special":
          if (op.name === "siphon") startArea(ctx, c, { duration: m.params.haunt_duration, interval: 0.25, radius: (m.params.AbilityCastRange + m.params.siphon_buffer) * settings.unitScale, follow: true, program: null, kind: "siphon" });
          else throw new HostPortRequired(id);
          break;
        case "swap":
        case "mark":
        case "rupture":
        case "pullStep":
          throw new HostPortRequired(id);
        default:
          throw Error("A_UNSUPPORTED_RECIPE_OPERATION:" + id + "/" + op.op);
      }
    }
  }
  function startArea(ctx, c, fields) {
    if (fields.interval <= 0) throw Error("A_INVALID_INTERVAL");
    if (fields.kind === "siphon") throw new HostPortRequired(id);
    const handle3 = ctx.legacyEffect.spawn({ abilityId: id, owner: c.owner, castId: c.castId, kind: "area", x: fields.follow ? ctx.actor(c.owner).x : c.aimX, radius: fields.radius, duration: fields.duration, data: { target: c.target, interval: fields.interval, follow: fields.follow } });
    if (typeof handle3 !== "string" || !/^[-a-zA-Z0-9_:/.]{1,160}$/.test(handle3)) throw Error("A-ENTITY-14: native area admission requires an accepted opaque handle");
    const s = read(ctx), row = { n: s.next++, owner: c.owner, target: c.target, reflected: !!c.reflected, handle: handle3, startedAt: ctx.now, expires: ctx.now + fields.duration, interval: fields.interval, radius: fields.radius, follow: fields.follow, aimX: c.aimX, program: fields.program, kind: fields.kind, pulses: 0 };
    s.areas.push(row);
    write(ctx, s);
    ctx.schedule({ abilityId: id, owner: row.owner, target: row.target, handler: "areaPulse", delay: fields.interval, data: { area: row.n }, binding: { kind: "entity", mode: "area", ref: row.handle }, delivery: "pack.entity" });
  }
  function route(ctx, c) {
    return ctx.target.route({ owner: c.owner, target: c.target, abilityId: id, range: settings.routedDeliveryRange, reflectable: true, reflected: !!c.reflected });
  }
  const scheduledHandlers = {
    delayedProgram(ctx, data) {
      const s = read(ctx), j = s.jobs.find((x) => x.n === data.job);
      if (!j) return;
      s.jobs = s.jobs.filter((x) => x.n !== j.n);
      write(ctx, s);
      if (!ctx.actor(j.owner).alive || !ctx.actor(j.target).alive) return;
      let c = { ...j };
      if (j.route) {
        const routed = route(ctx, c);
        if (!routed.accepted) return;
        c = { ...c, ...routed };
      }
      execute(ctx, c, j.program);
    },
    statusPulse(ctx, data) {
      const s = read(ctx), row = s.records.find((x) => x.n === data.record);
      if (!row) return;
      if (!exists(ctx, row)) {
        cancelRecord(ctx, s, row);
        write(ctx, s);
        return;
      }
      if (effective(ctx, row)) execute(ctx, { ...row, aimX: ctx.actor(row.target).x }, row.program);
      const next = read(ctx).records.find((x) => x.n === row.n);
      if (next && ctx.now + row.interval <= row.expires + 1e-8) ctx.schedule({ abilityId: id, owner: next.owner, target: next.target, handler: "statusPulse", delay: next.interval, data: { record: next.n }, binding: { kind: "status", ref: next.handle }, delivery: "actor.status-advance", ...declaresStatuses ? { statusDeclarationId: next.statusDeclarationId } : {} });
    },
    areaPulse(ctx, data) {
      if (!data || !Number.isSafeInteger(data.area) || data.area < 1) throw Error("A-AREA-CLOCK-01: canonical area locator required");
      const s = read(ctx), row = s.areas.find((x) => x.n === data.area);
      if (!row) return;
      const expectedAt = row.startedAt + (row.pulses + 1) * row.interval;
      if (!Number.isFinite(data.callbackAt) || data.callbackAt < 0 || data.callbackAt > ctx.now + 1e-8 || Math.abs(data.callbackAt - expectedAt) > 1e-8 || data.callbackAt > row.expires + 1e-8 || typeof data.nativeExpired !== "boolean" || typeof data.handle !== "string" || data.handle.length < 1 || data.handle.length > 160 || data.nativeExpired && ctx.now < row.expires - 1e-8) throw Error("A-AREA-CLOCK-01: authenticated nominal callback/native lifetime facts required");
      const owner = ctx.actor(row.owner), target = ctx.actor(row.target);
      if (!owner.alive) {
        ctx.legacyEffect.end(row.handle, "owner-dead");
        s.areas = s.areas.filter((x) => x.n !== row.n);
        write(ctx, s);
        return;
      }
      row.pulses++;
      write(ctx, s);
      if (Math.abs(target.x - (row.follow ? owner.x : row.aimX)) <= row.radius) execute(ctx, { ...row, aimX: row.follow ? owner.x : row.aimX }, row.program);
      if (data.callbackAt + row.interval <= row.expires + 1e-8) ctx.schedule({ abilityId: id, owner: row.owner, target: row.target, handler: "areaPulse", delay: row.interval, data: { area: row.n }, binding: { kind: "entity", mode: "area", ref: row.handle }, delivery: "pack.entity" });
      else if (data.nativeExpired) {
        ctx.legacyEffect.end(row.handle, "expired");
        const after = read(ctx);
        after.areas = after.areas.filter((x) => x.n !== row.n);
        write(ctx, after);
      }
    }
  };
  function liveRows(ctx, actor6) {
    return read(ctx).records.filter((x) => x.target === actor6 && effective(ctx, x));
  }
  function sum(ctx, actor6, key2) {
    return liveRows(ctx, actor6).reduce((n2, x) => n2 + Number(x.values[key2] || 0), 0);
  }
  return {
    behaviorId: "heros/a/v8/" + id,
    revision: areaDeliveryClock ? "2.3.0" : usesEffectiveRange || declaresStatuses || programTargets.length ? "2.2.0" : "2.1.0",
    ...codeIdentity(A_SOURCE_FILES),
    requires: capabilities(a),
    namespace: "heros/a/" + id,
    stateSchema,
    ...usesEffectiveRange ? { requiredCastFacts: ["effectiveCastRange"] } : {},
    ...declaresStatuses ? { statusDeclarations } : {},
    ...capabilities(a).includes("schedule") ? { scheduledBindings: {
      ...statusSchemas.some((x) => x.program) ? { statusPulse: [{ binding: "status", delivery: "actor.status-advance" }] } : {},
      ...delayPrograms.size ? { delayedProgram: [{ binding: "source-job", delivery: "pack.job-due" }] } : {},
      ...areaSchemas.some((x) => x.kind === "area") ? { areaPulse: [{ binding: "entity-area", delivery: "pack.entity" }] } : {}
    } } : {},
    planCast(ctx, facts) {
      const owner = ctx.actor(facts.owner), target = ctx.actor(facts.target), base2 = { manaCost: m.mana, cooldownSeconds: m.cooldown_s, chargeCost: m.charges ? 1 : 0, windupSeconds: m.startup_frames / 60, recoverySeconds: m.recovery_frames / 60, action: "cast" };
      let reason = m.passive ? "passive" : HOST_REQUESTS[id] || (!owner.alive ? "dead" : !facts.actionReady ? "action" : owner.silenced ? "silenced" : null);
      const toggle = r.toggle && liveRows(ctx, facts.owner).some((x) => x.key === id);
      if (toggle && !reason) return { ...base2, accepted: true, manaCost: 0, cooldownSeconds: 0, chargeCost: 0, windupSeconds: 0, recoverySeconds: 0, action: "toggle-off" };
      if (!reason && facts.cooldownRemaining > 1e-8) reason = "cooldown";
      if (!reason && facts.manaAvailable < m.mana) reason = "mana";
      if (!reason && m.charges && facts.chargesAvailable <= 0) reason = "charges";
      if (!reason && r.target === "enemy" && (!target.alive || target.invulnerable || ctx.target.distance(facts.owner, facts.target) > (usesEffectiveRange ? facts.effectiveCastRange : m.range_wu) + 22)) reason = "target";
      if (!reason && !Number.isFinite(facts.aimX)) reason = "aim";
      if (!reason && r.target === "point" && (facts.aimX < 45 || facts.aimX > 1155 || Math.abs(facts.aimX - owner.x) > m.range_wu + 22)) reason = "aim";
      return { ...base2, accepted: !reason, ...reason ? { reason } : {} };
    },
    activate(ctx, event) {
      if (m.passive) throw Error("A_PASSIVE_ACTIVATION");
      if (HOST_REQUESTS[id]) throw new HostPortRequired(id);
      let c = { ...event };
      if (r.target === "enemy" && id !== "vengefulspirit_magic_missile") {
        const routed = route(ctx, c);
        if (!routed.accepted) return { accepted: false, reason: routed.reason };
        c = { ...c, ...routed };
      }
      execute(ctx, c, root);
      ctx.cue({ kind: "cast", abilityId: id, actor: event.owner });
      return { accepted: true };
    },
    projectAttack(ctx, event) {
      let amount = event.amount;
      if (id === "kunkka_tidebringer" && ctx.actor(event.actor).passivesEnabled && liveRows(ctx, event.actor).some((x) => x.key === id)) amount += m.params.damage_bonus;
      if (r.stats?.attackPct && ctx.actor(event.actor).heroId === config.hero.registryNumericId && ctx.actor(event.actor).passivesEnabled) amount *= 1 + resolve(r.stats.attackPct, ctx, { owner: event.actor, target: 1 - event.actor });
      return { amount: amount * (1 - clamp(sum(ctx, event.actor, "attackReduction"), 0, 1)) };
    },
    projectDamage(ctx, event) {
      let amount = event.amount;
      const source = event.source, target = event.target;
      if (!["pre-mitigation", "post-mitigation"].includes(event.stage)) throw Error("A-STAGE-09: explicit damage projection stage required");
      if (event.stage === "pre-mitigation") {
        if (!event.basic && !event.reflected) amount *= 1 + sum(ctx, source, "spellAmp");
        if (event.type === "magical") amount *= (1 - clamp(sum(ctx, target, "magicResist"), 0, 1)) * (1 + sum(ctx, target, "magicVulnerable"));
        if (event.basic) amount *= 1 - clamp(sum(ctx, target, "basicReduction"), 0, 1);
      }
      const shieldDebits = [];
      if (event.stage === "post-mitigation") {
        if (event.type === "physical" && sum(ctx, target, "physicalImmune")) amount = 0;
        for (const row of liveRows(ctx, target)) {
          const debit = Math.min(amount, row.remaining);
          if (debit > 0) {
            amount -= debit;
            shieldDebits.push({ record: row.n, amount: debit });
          }
        }
      }
      return { amount, armor: event.stage === "pre-mitigation" && event.type === "physical" ? sum(ctx, target, "armor") : 0, shieldDebits };
    },
    projectHealing(ctx, event) {
      return { amount: event.amount * (1 + sum(ctx, event.actor, "healAmp")) };
    },
    projectInterval(ctx, event) {
      return { seconds: event.seconds * 100 / Math.max(20, 100 + sum(ctx, event.actor, "attackSpeed") - sum(ctx, event.actor, "attackSlow")) };
    },
    onAttack(ctx, event) {
      if (!event.landed || event.secondary || !ctx.actor(event.owner).passivesEnabled) return;
      if (r.attack?.requiresToggle && !liveRows(ctx, event.owner).some((x) => x.key === id)) return;
      if (r.attack?.ops?.length) execute(ctx, { ...event, aimX: ctx.actor(event.target).x, reflected: false }, paths.get(r.attack.ops));
      if (r.attack?.consumeToggle) {
        const s = read(ctx);
        s.records.filter((x) => x.owner === event.owner && x.key === id).forEach((x) => cancelRecord(ctx, s, x));
        write(ctx, s);
      }
    },
    onDamage(ctx, event) {
      if (event.kind !== "shield-committed") return;
      const s = read(ctx), row = s.records.find((x) => x.n === event.record);
      if (!row || !finite(event.amount) || event.amount > row.remaining) throw Error("A_INVALID_SHIELD_COMMIT");
      row.remaining -= event.amount;
      write(ctx, s);
    },
    onStage(ctx, event) {
      if (event.kind === "passive-pulse" && r.aura) {
        const owner = ctx.actor(event.owner);
        if (owner.heroId !== config.hero.registryNumericId) throw Error("A_PASSIVE_OWNER");
        if (owner.alive && owner.passivesEnabled && ctx.target.distance(event.owner, 1 - event.owner) <= resolve(r.aura.radius, ctx, { owner: event.owner, target: 1 - event.owner }) * settings.unitScale)
          execute(ctx, { owner: event.owner, target: 1 - event.owner, aimX: owner.x, reflected: false }, paths.get(r.aura.ops));
      } else if (event.kind === "status-removed") {
        const s = read(ctx);
        s.records = s.records.filter((x) => x.handle !== event.handle);
        write(ctx, s);
      } else if (event.kind === "effect-end") {
        const s = read(ctx);
        s.areas = s.areas.filter((x) => x.handle !== event.handle);
        write(ctx, s);
      } else if (event.kind === "job-ended") {
        const s = read(ctx);
        s.jobs = s.jobs.filter((x) => x.handle !== event.handle);
        write(ctx, s);
      }
    },
    onInterrupt() {
    },
    onDeath(ctx, event) {
      const s = read(ctx);
      s.records.filter((x) => x.target === event.actor).forEach((x) => cancelRecord(ctx, s, x));
      for (const x of s.jobs.filter((x2) => x2.owner === event.actor)) ctx.cancelJob(x.handle);
      s.jobs = s.jobs.filter((x) => x.owner !== event.actor);
      for (const x of s.areas.filter((x2) => x2.owner === event.actor)) ctx.legacyEffect.end(x.handle, "owner-dead");
      s.areas = s.areas.filter((x) => x.owner !== event.actor);
      write(ctx, s);
    },
    scheduledHandlers
  };
}

// node_modules/@dotapk/heros/rules/a/register.js
var A_HERO_IDS = Object.freeze([21, 28, 29, 32, 36, 42, 47, 50, 55]);
function registerA(registry) {
  for (const id of A_HERO_IDS) for (let slot = 0; slot < 4; slot++)
    registry.registerFactory(id, slot, { abiVersion: BATTLE_ABI, parameters: A_PARAMETERS, create: createRule });
  return registry;
}

// node_modules/@dotapk/heros/rules/legacy-0-9/direct-hit.js
var sourceFiles = ["rules/legacy-0-9/direct-hit.js"];
var selected = /* @__PURE__ */ new Map([[3, "axe_culling"], [8, "lina_laguna"]]);
function directHitFactory(parameters2 = { damageMultiplier: 1, bodyPadding: 22 }) {
  return {
    abiVersion: BATTLE_ABI,
    parameters: parameters2,
    create({ hero, definition, parameters: p }) {
      const m = definition.mvp;
      if (selected.get(hero.registryNumericId) !== definition.id || m.effect !== "hit") throw Error("Unsupported direct-hit identity");
      if (Object.keys(p).sort().join(",") !== "bodyPadding,damageMultiplier" || !Number.isFinite(p.damageMultiplier) || p.damageMultiplier < 0 || !Number.isFinite(p.bodyPadding) || p.bodyPadding < 0 || p.bodyPadding > 100) throw Error("Invalid direct-hit parameters");
      for (const k of ["damage", "range_wu", "radius_wu", "stun_s", "hitstun_s"]) if (!Number.isFinite(m[k]) || m[k] < 0) throw Error("Invalid direct-hit coefficient: " + k);
      if (!["physical", "magical", "pure"].includes(m.damage_type)) throw Error("Direct-hit requires an implemented damage enum");
      if (m.damage * p.damageMultiplier > 1e7 || m.stun_s > 60 || m.hitstun_s > 60) throw Error("Direct-hit exceeds host bounds");
      for (const k of ["root_s", "silence_s", "slow_pct", "knockback_wu", "pull_to_distance", "vulnerability_physical", "attack_damage_debuff", "selfReflection", "missing_mana_multiplier", "execute_threshold_pct", "chip"]) if (m[k]) throw Error("Unimplemented direct-hit dependent coefficient: " + k);
      return {
        behaviorId: "legacy-0-9/" + definition.id,
        revision: "1.0.0",
        ...codeIdentity(sourceFiles),
        stateSchema: EMPTY_STATE_SCHEMA,
        requires: ["damage", "target-route", "cue"],
        activate(ctx, cast) {
          const f = ctx.actor(cast.owner), t = ctx.actor(cast.target);
          if (Math.abs(t.x - f.x) > (m.range_wu || m.radius_wu) + p.bodyPadding || m.height === "ground" && t.y >= 45) return;
          const route = ctx.target.route({ owner: cast.owner, target: cast.target, abilityId: definition.id, range: m.range_wu || m.radius_wu, reflectable: true, reflected: cast.reflected });
          if (!route.accepted) return;
          ctx.damage({ source: route.owner, target: route.target, abilityId: definition.id, amount: m.damage * p.damageMultiplier, type: m.damage_type, blockable: m.blockable, stunSeconds: m.stun_s, hitstunSeconds: m.hitstun_s, reflected: route.reflected });
          ctx.cue({ kind: route.reflected ? "reflect" : "targeted-hit", abilityId: definition.id, actor: route.owner, target: route.target });
          if (route.reflected) return { reflected: true };
        }
      };
    }
  };
}
function registerLegacyDirectHits(registry, parameters2) {
  for (const heroId of selected.keys()) registry.registerFactory(heroId, 3, directHitFactory(parameters2));
  return registry;
}

// node_modules/@dotapk/heros/rules/legacy-0-9/projections.js
var slots = [[0, 2, "juggernaut_blade_dance"], [1, 2, "crystal_maiden_aura"], [4, 1, "sniper_headshot"], [6, 2, "phantom_assassin_immaterial"], [7, 3, "drow_ranger_marksmanship"]];
function number(value, name, max = 1e7) {
  if (!Number.isFinite(value) || value < 0 || value > max) throw Error("Invalid projection " + name);
  return value;
}
function eventShape(event, keys) {
  if (Object.keys(event).sort().join(",") !== keys.sort().join(",")) throw Error("Invalid finite projection event");
}
function passiveProjectionFactory() {
  return { abiVersion: BATTLE_ABI, parameters: {}, create({ hero, definition, parameters: parameters2 }) {
    if (Object.keys(parameters2).length) throw Error("No external projection configuration");
    const row = slots.find(([id2, , ability]) => id2 === hero.registryNumericId && ability === definition.id);
    if (!row || !definition.mvp.passive) throw Error("Unsupported passive projection identity");
    const m = definition.mvp, id = definition.id;
    const base2 = { behaviorId: "legacy-0-9/" + id, revision: "1.0.0", ...codeIdentity(["rules/legacy-0-9/projections.js"]), stateSchema: EMPTY_STATE_SCHEMA, requires: [] };
    if (id === "juggernaut_blade_dance") {
      number(m.critChance, "critChance", 1);
      number(m.critMultiplier, "critMultiplier", 100);
      return { ...base2, projectAttack(ctx, event) {
        eventShape(event, ["owner", "damage"]);
        number(event.damage, "damage", 1e5);
        return { damage: ctx.actor(event.owner).passivesEnabled && ctx.random() < m.critChance ? event.damage * m.critMultiplier : event.damage };
      } };
    }
    if (id === "crystal_maiden_aura") {
      number(hero.mana_regen, "base mana regeneration");
      number(m.manaRegenBonus, "manaRegenBonus");
      number(m.manaRegenAmp, "manaRegenAmp", 100);
      const baseRegen = hero.mana_regen || 8, activeRegen = (baseRegen + m.manaRegenBonus) * (1 + m.manaRegenAmp);
      number(activeRegen, "derived mana regeneration");
      return { ...base2, projectInterval(ctx, event) {
        eventShape(event, ["owner", "kind"]);
        if (event.kind !== "mana-regeneration") throw Error("Invalid projection interval kind");
        return { manaPerSecond: ctx.actor(event.owner).passivesEnabled ? activeRegen : baseRegen };
      } };
    }
    if (id === "phantom_assassin_immaterial") {
      number(m.evasion, "evasion", 1);
      return { ...base2, projectDamage(ctx, event) {
        eventShape(event, ["owner", "basic"]);
        if (typeof event.basic !== "boolean") throw Error("Invalid basic fact");
        return { evaded: event.basic && ctx.actor(event.owner).passivesEnabled && ctx.random() < m.evasion };
      } };
    }
    if (id === "sniper_headshot") {
      number(m.procChance, "procChance", 1);
      number(m.damage, "bonus damage");
      number(m.knockback_wu, "knockback");
      number(m.slow_pct, "slow percentage", 100);
      number(m.slow_duration_s, "slow duration", 60);
      return { ...base2, projectAttack(ctx, event) {
        eventShape(event, ["owner", "guaranteed"]);
        if (typeof event.guaranteed !== "boolean") throw Error("Invalid headshot guarantee fact");
        const proc = ctx.actor(event.owner).passivesEnabled && (event.guaranteed || ctx.random() < m.procChance);
        return { proc, damageBonus: proc ? m.damage : 0, knockbackBonus: proc ? m.knockback_wu : 0, slowPercentage: proc ? m.slow_pct : 0, slowSeconds: proc ? m.slow_duration_s : 0 };
      } };
    }
    number(m.procChance, "procChance", 1);
    number(m.distance_threshold_wu, "distance threshold");
    number(m.attack_bonus, "attack bonus");
    return { ...base2, projectAttack(ctx, event) {
      eventShape(event, ["owner", "target", "damage"]);
      number(event.damage, "damage", 1e5);
      const f = ctx.actor(event.owner), t = ctx.actor(event.target);
      const proc = f.passivesEnabled && Math.abs(t.x - f.x) >= (m.distance_threshold_wu || 165) && ctx.random() < m.procChance;
      return { damage: event.damage + (proc ? m.attack_bonus || 90 : 0) };
    } };
  } };
}
function registerLegacyPassiveProjections(registry) {
  for (const [heroId, slot] of slots) registry.registerFactory(heroId, slot, passiveProjectionFactory());
  return registry;
}

// node_modules/@dotapk/heros/rules/legacy-0-9/index.js
function registerLegacy0To9(registry) {
  return registerLegacyPassiveProjections(registerLegacyDirectHits(registry));
}

// node_modules/@dotapk/heros/rules/legacy-10-19/index.js
var IMPLEMENTED_SLOTS = Object.freeze([[13, 0], [13, 1], [13, 3], [17, 1]].map(Object.freeze));
var SOURCES = ["rules/legacy-10-19/index.js"];
function bounded2(value, name, max = 1e7) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > max) throw Error("Invalid legacy coefficient: " + name);
  return value;
}
function legacyFactory(heroId, slot, { damageMultiplier = 1 } = {}) {
  if (!IMPLEMENTED_SLOTS.some(([h2, s]) => h2 === heroId && s === slot)) throw Error("Unsupported legacy slice");
  return { abiVersion: BATTLE_ABI, parameters: { heroId, slot, damageMultiplier }, create({ hero, definition, parameters: parameters2 }) {
    const { heroId: heroId2, slot: slot2 } = parameters2;
    if (hero.registryNumericId !== heroId2 || hero.abilities[slot2].id !== definition.id) throw Error("Wrong legacy identity");
    if (Object.keys(parameters2).sort().join(",") !== "damageMultiplier,heroId,slot") throw Error("Unknown legacy execution parameter");
    const scale = bounded2(parameters2.damageMultiplier, "damageMultiplier");
    const m = definition.mvp;
    bounded2(m.range_wu, "range_wu", heroId2 === 17 ? 8845 : 1e7);
    bounded2(m.radius_wu, "radius_wu");
    const common = {
      behaviorId: "legacy-10-19/" + definition.id,
      revision: "1.0.0",
      ...codeIdentity(SOURCES),
      stateSchema: EMPTY_STATE_SCHEMA
    };
    if (heroId2 === 17) {
      return { ...common, requires: ["motion-request", "protect", "cue"], activate(ctx, cast) {
        const f = ctx.actor(cast.owner);
        ctx.cue({ kind: "blink", abilityId: definition.id, actor: cast.owner });
        ctx.motion({ actor: cast.owner, abilityId: definition.id, castId: cast.castId, kind: "blink", destinationX: f.x + cast.direction * m.range_wu, speed: 0, duration: 0 });
        ctx.protect({ actor: cast.owner, abilityId: definition.id, kind: "invulnerability", duration: 4 / 60 });
      } };
    }
    bounded2(m.damage, "damage");
    bounded2(m.damage * scale, "scaled damage");
    bounded2(m.stun_s, "stun_s", 60);
    bounded2(m.hitstun_s, "hitstun_s", 60);
    if (!["physical", "magical", "pure"].includes(m.damage_type)) throw Error("Invalid legacy damage type");
    return { ...common, requires: slot2 === 1 ? ["damage"] : ["damage", "target-route", "cue"], activate(ctx, cast) {
      const f = ctx.actor(cast.owner), t = ctx.actor(cast.target);
      const presentation = slot2 === 1 ? { kind: "ground-pillar", aimX: cast.aimX, radius: m.radius_wu, lifeSeconds: 0.6 } : null;
      const distance = Math.abs(t.x - (slot2 === 1 ? cast.aimX : f.x));
      if (distance > (slot2 === 1 ? m.radius_wu : m.range_wu || m.radius_wu) + 22 || m.height === "ground" && t.y >= 45) return presentation ? { presentation } : void 0;
      let owner = cast.owner, target = cast.target, reflected = false;
      if (slot2 !== 1) {
        const route = ctx.target.route({ owner, target, abilityId: definition.id, range: m.range_wu || m.radius_wu, reflectable: true, reflected: cast.reflected });
        if (!route.accepted) return;
        ({ owner, target, reflected } = route);
      }
      ctx.damage({ source: owner, target, abilityId: definition.id, amount: m.damage * scale, type: m.damage_type, blockable: m.blockable, stunSeconds: m.stun_s, hitstunSeconds: m.hitstun_s, reflected });
      if (presentation) return { presentation };
      ctx.cue({ kind: reflected ? "reflect" : "targeted-hit", abilityId: definition.id, actor: owner, target });
      if (reflected) return { reflected: true };
    } };
  } };
}
function registerLegacy10To19(registry, parameters2 = {}) {
  for (const [heroId, slot] of IMPLEMENTED_SLOTS) registry.registerFactory(heroId, slot, legacyFactory(heroId, slot, parameters2));
  return registry;
}

// node_modules/@dotapk/heros/rules/core4/bash.js
function createBash({ definition, hero }) {
  const p = definition.mvp.params, threshold = p.attack_count + 1;
  if (!Number.isSafeInteger(threshold) || threshold < 1 || threshold > 64 || ![p.bonus_damage, p.duration].every((n2) => Number.isFinite(n2) && n2 >= 0) || p.bonus_damage > 1e7 || p.duration > 60) throw Error("Invalid Core4 Bash coefficients");
  const schema = defineStateSchema({ id: "heros/core4/slardar-bash", schema: { anyOf: [{ type: "null" }, { type: "object", properties: { counts: { type: "object", properties: { "0": { type: "integer", minimum: 0, maximum: threshold - 1 }, "1": { type: "integer", minimum: 0, maximum: threshold - 1 } }, required: [], additionalProperties: false } }, required: ["counts"], additionalProperties: false }] } });
  return {
    behaviorId: "core4/slardar-bash",
    revision: "1.0.0",
    ...codeIdentity(["rules/core4/bash.js"]),
    requires: ["damage", "control", "cue"],
    stateSchema: schema,
    onAttack(ctx, event) {
      const f = ctx.actor(event.actor);
      if (f.heroId !== hero.registryNumericId || !event.landed) return;
      const counts = { ...ctx.state.read()?.counts ?? {} }, prior = counts[event.actor] ?? event.priorCount ?? 0;
      if (!Number.isSafeInteger(prior) || prior < 0 || prior >= threshold) throw Error("Invalid private Bash counter fact");
      const next = f.passivesEnabled ? prior + 1 : prior, proc = f.passivesEnabled && next >= threshold;
      counts[event.actor] = proc ? 0 : next;
      ctx.state.write({ counts });
      if (proc) {
        ctx.damage({ source: event.actor, target: event.target, abilityId: definition.id, amount: p.bonus_damage, type: "physical", blockable: false, dot: true, passive: true });
        ctx.control.apply({ owner: event.actor, target: event.target, abilityId: definition.id, key: definition.id, type: "stun", duration: p.duration, pierces: true, dispel: "strong" });
        ctx.cue({ kind: "passive", abilityId: definition.id, actor: event.actor, target: event.target });
      }
      return { bashCount: counts[event.actor] };
    }
  };
}
var core4Factories = Object.freeze([{ heroId: 31, slot: 2, create: createBash }]);

// node_modules/@dotapk/heros/test/probes.mjs
function probeFactory(kind, { amount = 35, namespace, limit = 100, schema, api = heros_exports } = {}) {
  return { abiVersion: api.BATTLE_ABI, parameters: { amount, limit }, create({ definition, parameters: parameters2 }) {
    const stateSchema = schema ?? (kind === "state" ? countSchema(api, parameters2.limit) : api.EMPTY_STATE_SCHEMA);
    const requires = kind === "damage" ? ["damage"] : kind === "heal" ? ["heal"] : [];
    const activate = kind === "damage" ? (ctx, c) => ctx.damage({ source: c.owner, target: c.target, abilityId: definition.id, amount: parameters2.amount, type: "pure" }) : kind === "heal" ? (ctx, c) => ctx.heal({ source: c.owner, target: c.owner, abilityId: definition.id, amount: parameters2.amount }) : kind === "state" ? (ctx) => ctx.state.write({ count: (ctx.state.read()?.count ?? 0) + 1 }) : kind === "shared" ? (ctx) => ctx.state.write((ctx.state.read() ?? 0) + 1) : kind === "facts" ? (ctx, c) => {
      for (const key2 of ["engine", "fighters", "input", "cast", "move", "damage"]) if (ctx[key2] !== void 0) throw Error("Unexpected host access " + key2);
      try {
        ctx.actor(c.target).hp = 0;
        throw Error("Actor was writable");
      } catch (error) {
        if (!(error instanceof TypeError)) throw error;
      }
    } : () => {
    };
    return { behaviorId: "probe/" + kind, revision: "2.0.0", ...api.codeIdentity(["test/probes.mjs"]), ...namespace ? { namespace } : {}, requires, stateSchema, activate };
  } };
}
function countSchema(api = heros_exports, limit = 100) {
  return api.defineStateSchema({ id: "test/count", schema: { anyOf: [{ type: "null" }, { type: "object", additionalProperties: false, required: ["count"], properties: { count: { type: "integer", minimum: 0, maximum: limit } } }] } });
}
export {
  BATTLE_ABI,
  CAPABILITIES,
  EMPTY_STATE_SCHEMA,
  HOOKS,
  codeIdentity,
  createBash,
  createHeroRegistry,
  createRuleSession,
  defineStateSchema,
  directHitFactory,
  heroes,
  legacyFactory,
  passiveProjectionFactory,
  probeFactory,
  registerA,
  registerLegacy0To9,
  registerLegacy10To19
};
