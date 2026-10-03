// Immutable reviewed source and four-slot selection, derived from frozen V3; no harness import.
export const SOURCES=[
  {
    "key": "bane",
    "definition": {
      "id": "valve_3",
      "registryNumericId": 20,
      "valveHeroId": 3,
      "packKey": "r20_55",
      "name": "祸乱之源",
      "en": "Bane",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1561,
      "combatHp": 1561,
      "combatMana": 861,
      "attack": 116,
      "move_speed": 244,
      "attack_range": 233.75000000000003,
      "attack_interval_s": 1.0271903323262839,
      "mana_regen": 3.275,
      "portrait": "assets/r20_55/bane-portrait.png",
      "render": "assets/r20_55/bane-render.png",
      "arenaStats": {
        "str": 65.5,
        "agi": 65.5,
        "int": 65.5
      },
      "abilities": [
        {
          "id": "bane_enfeeble",
          "valveAbilityId": 5012,
          "slot": "S1",
          "name": "虚弱",
          "en": "Enfeeble",
          "icon": "assets/r20_55/bane_enfeeble.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=3",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 4,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Deals damage every second and lowers the enemy's total attack damage and cast range.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage_reduction": 70,
              "cast_reduction": 30,
              "duration": 9,
              "enfeeble_tick_damage": 30,
              "damage_tick_rate": 1,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 130,
              "AbilityCooldown": 7
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 7,
            "mana": 130,
            "range_wu": 550,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "damage_reduction": 70,
              "cast_reduction": 30,
              "duration": 9,
              "enfeeble_tick_damage": 30,
              "damage_tick_rate": 1,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 130,
              "AbilityCooldown": 7
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。纯粹持续伤害、攻击与施法距离降低；基础驱散移除。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "attackReduction": {
                    "div": [
                      "damage_reduction",
                      100
                    ]
                  },
                  "castReduction": {
                    "div": [
                      "cast_reduction",
                      100
                    ]
                  }
                },
                "tick": {
                  "interval": "damage_tick_rate",
                  "ops": [
                    {
                      "op": "damage",
                      "amount": "enfeeble_tick_damage",
                      "type": "pure"
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。纯粹持续伤害、攻击与施法距离降低；基础驱散移除。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "bane_brain_sap",
          "valveAbilityId": 5011,
          "slot": "S2",
          "name": "蚀脑",
          "en": "Brain Sap",
          "icon": "assets/r20_55/bane_brain_sap.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=3",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 4,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Feasts on the vital energies of an enemy unit, healing Bane and dealing damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "brain_sap_damage": 300,
              "shard_radius": 0,
              "shard_secondary_target_heal_pct": 0,
              "AbilityCastRange": 625,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 150,
              "AbilityCooldown": 11
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 11,
            "mana": 150,
            "range_wu": 343.75,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "brain_sap_damage": 300,
              "shard_radius": 0,
              "shard_secondary_target_heal_pct": 0,
              "AbilityCastRange": 625,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 150,
              "AbilityCooldown": 11
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。对敌伤害与自身固定治疗分别结算；满血不溢出。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "brain_sap_damage",
                "type": "pure"
              },
              {
                "op": "heal",
                "to": "self",
                "amount": "brain_sap_damage"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。对敌伤害与自身固定治疗分别结算；满血不溢出。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "bane_nightmare",
          "valveAbilityId": 5014,
          "slot": "S3",
          "name": "噩梦",
          "en": "Nightmare",
          "icon": "assets/r20_55/bane_nightmare.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=3",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 2,
            "dispelCode": 2,
            "description": "Puts the target enemy or friendly Hero to sleep. Sleeping units walk in Bane's chosen direction and are awakened when damaged. If the target was directly attacked, the Nightmare passes to the attacking unit. Bane can attack and damage Nightmared targets freely.<br><br> Can be put on alt-cast to have the target stand still.",
            "profile": "level18-base-no-item",
            "semantic": {
              "nightmare_invuln_time": 1,
              "animation_rate": 0.2,
              "vector_render_radius": 120,
              "walk_speed": 110,
              "turn_rate": 200,
              "AbilityCastRange": 700,
              "AbilityDuration": 6,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 150,
              "AbilityCooldown": 16
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 16,
            "mana": 150,
            "range_wu": 385.00000000000006,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "nightmare_invuln_time": 1,
              "animation_rate": 0.2,
              "vector_render_radius": 120,
              "walk_speed": 110,
              "turn_rate": 200,
              "AbilityCastRange": 700,
              "AbilityDuration": 6,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 150,
              "AbilityCooldown": 16
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。敌方原地睡眠，首秒无敌；施法者直接攻击不唤醒，其他普攻转移睡眠，其他伤害唤醒。受竞技1.5秒连续控制保护。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "special",
                "name": "nightmare"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。敌方原地睡眠，首秒无敌；施法者直接攻击不唤醒，其他普攻转移睡眠，其他伤害唤醒。受竞技1.5秒连续控制保护。",
            "integrationRequirement": "STATUS_ATTACK_SOURCE_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "bane_fiends_grip",
          "valveAbilityId": 5013,
          "slot": "S4",
          "name": "魔爪",
          "en": "Fiend's Grip",
          "icon": "assets/r20_55/bane_fiends_grip.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=3",
            "jsonPointer": "/result/data/heroes/0/abilities/3",
            "rank": 3,
            "damageTypeCode": 4,
            "immunityCode": 3,
            "dispelCode": 1,
            "description": "CHANNELED - Grips an enemy unit, disabling it and causing heavy damage over time, while stealing mana every %fiend_grip_tick_interval% seconds based on the unit's maximum mana.",
            "profile": "level18-base-no-item",
            "semantic": {
              "fiend_grip_tick_interval": 0.5,
              "fiend_grip_mana_drain": 5,
              "fiend_grip_damage": 150,
              "illusion_count": 0,
              "scepter_incoming_illusion_damage": 0,
              "AbilityCastRange": 625,
              "AbilityChannelTime": 5.75,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 400,
              "AbilityCooldown": 100
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 100,
            "mana": 400,
            "range_wu": 343.75,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "fiend_grip_tick_interval": 0.5,
              "fiend_grip_mana_drain": 5,
              "fiend_grip_damage": 150,
              "illusion_count": 0,
              "scepter_incoming_illusion_damage": 0,
              "AbilityCastRange": 625,
              "AbilityChannelTime": 5.75,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 400,
              "AbilityCooldown": 100
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。持续施法、每0.5秒吸蓝/伤害；施法者控制或死亡中断。控制刷新需接入核心连续控制保护。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "area",
                "duration": "AbilityChannelTime",
                "interval": "fiend_grip_tick_interval",
                "radius": 625,
                "ops": [
                  {
                    "op": "damage",
                    "amount": {
                      "mul": [
                        "fiend_grip_damage",
                        "fiend_grip_tick_interval"
                      ]
                    },
                    "type": "pure"
                  },
                  {
                    "op": "mana",
                    "amount": {
                      "mul": [
                        {
                          "stat": "maxMp",
                          "who": "target"
                        },
                        {
                          "div": [
                            "fiend_grip_mana_drain",
                            100
                          ]
                        },
                        "fiend_grip_tick_interval"
                      ]
                    },
                    "steal": true
                  },
                  {
                    "op": "status",
                    "duration": 0.5,
                    "values": {
                      "stun": true
                    },
                    "dispel": "strong",
                    "pierces": true
                  }
                ],
                "channel": true,
                "follow": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。持续施法、每0.5秒吸蓝/伤害；施法者控制或死亡中断。控制刷新需接入核心连续控制保护。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "bane",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5012,
        5011,
        5014,
        5013
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1202,
          "key": "bane_ichor_of_nyctasha",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=3",
          "description": "Every time Bane kills an enemy hero or they die under the effect of Bane's debuff, they receive a Terror for the rest of the game that decreases their status resistance to Bane's subsequent debuffs.",
          "specialValues": [
            {
              "name": "damage_tick_rate",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "max_terrors",
              "values_float": [
                6
              ],
              "is_percentage": false,
              "heading_loc": "MAX TERRORS PER HERO:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "status_resistance",
              "values_float": [
                4
              ],
              "is_percentage": true,
              "heading_loc": "STATUS RESISTANCE PER TERROR:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1202
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "STATUS_ATTACK_SOURCE_V2"
      ]
    }
  },
  {
    "key": "beastmaster",
    "definition": {
      "id": "valve_38",
      "registryNumericId": 38,
      "valveHeroId": 38,
      "packKey": "r20_55",
      "name": "兽王",
      "en": "Beastmaster",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1733,
      "combatHp": 1733,
      "combatMana": 655,
      "attack": 106,
      "move_speed": 244,
      "attack_range": 90,
      "attack_interval_s": 1.1111111111111112,
      "mana_regen": 2.415,
      "portrait": "assets/r20_55/beastmaster-portrait.png",
      "render": "assets/r20_55/beastmaster-render.png",
      "arenaStats": {
        "str": 73.3,
        "agi": 53,
        "int": 48.3
      },
      "abilities": [
        {
          "id": "beastmaster_wild_axes",
          "valveAbilityId": 5168,
          "slot": "S1",
          "name": "野性之斧",
          "en": "Wild Axes",
          "icon": "assets/r20_55/beastmaster_wild_axes.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=38",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Beastmaster sends his axes flying and calls them home again, slicing through enemy units and trees along their path.  Each axe can hit an enemy once, and amplifies subsequent damage from Beastmaster and his units.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 175,
              "spread": 450,
              "range": 1500,
              "axe_damage": 160,
              "duration": 13,
              "damage_amp": 8,
              "min_throw_duration": 0.4,
              "max_throw_duration": 1,
              "apply_debuff_on_attack": 0,
              "AbilityCastRange": 1500,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 65,
              "AbilityCooldown": 8
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 8,
            "mana": 65,
            "range_wu": 825.0000000000001,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "radius": 175,
              "spread": 450,
              "range": 1500,
              "axe_damage": 160,
              "duration": 13,
              "damage_amp": 8,
              "min_throw_duration": 0.4,
              "max_throw_duration": 1,
              "apply_debuff_on_attack": 0,
              "AbilityCastRange": 1500,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 65,
              "AbilityCooldown": 8
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。二维双斧合计两次基础伤害，随后仅该来源及召唤物增伤16%；省略真实去返碰撞。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": {
                  "mul": [
                    "axe_damage",
                    2
                  ]
                }
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "ownerDamageAmp": {
                    "mul": [
                      {
                        "div": [
                          "damage_amp",
                          100
                        ]
                      },
                      2
                    ]
                  }
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。二维双斧合计两次基础伤害，随后仅该来源及召唤物增伤16%；省略真实去返碰撞。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "beastmaster_summon_razorback",
          "valveAbilityId": 7230,
          "slot": "S2",
          "name": "召唤刀背兽",
          "en": "Summon Razorback",
          "icon": "assets/r20_55/beastmaster_summon_razorback.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=38",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Beastmaster calls forth a Boar to aid in the battlefield. The Boar has a passive poison attack that slows attack and movement speeds.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 60,
              "boar_base_max_health": 750,
              "boar_base_damage": 75,
              "boar_total_damage_tooltip": 75,
              "boar_base_xp_bounty": 90,
              "boar_base_movespeed": 350,
              "boar_moveslow_tooltip": 34,
              "boar_poison_duration_tooltip": 3,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 60,
              "AbilityCooldown": 30
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 30,
            "mana": 60,
            "range_wu": 0,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "duration": 60,
              "boar_base_max_health": 750,
              "boar_base_damage": 75,
              "boar_total_damage_tooltip": 75,
              "boar_base_xp_bounty": 90,
              "boar_base_movespeed": 350,
              "boar_moveslow_tooltip": 34,
              "boar_poison_duration_tooltip": 3,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 60,
              "AbilityCooldown": 30
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自主战鹰外的野猪单位，命中34%慢速/攻速；攻击间隔1.5和550射程为竞技值。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "summon",
                "count": 1,
                "hp": "boar_base_max_health",
                "damage": "boar_base_damage",
                "duration": "duration",
                "interval": 1.5,
                "range": 550,
                "speed": "boar_base_movespeed",
                "onHit": [
                  {
                    "op": "status",
                    "duration": "boar_poison_duration_tooltip",
                    "values": {
                      "moveSlow": {
                        "div": [
                          "boar_moveslow_tooltip",
                          100
                        ]
                      },
                      "attackSlow": "boar_moveslow_tooltip"
                    }
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自主战鹰外的野猪单位，命中34%慢速/攻速；攻击间隔1.5和550射程为竞技值。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "beastmaster_summon_raptor",
          "valveAbilityId": 7231,
          "slot": "S3",
          "name": "召唤猛禽",
          "en": "Summon Raptors",
          "icon": "assets/r20_55/beastmaster_summon_raptor.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=38",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Beastmaster summons %hawk_count% hawks that circle around Beastmaster and dive-bombs at enemies with a base attack rate of every %hawk_base_attack_interval%s, damaging and rooting them. Attack rate increases with the Hawk's attack speed. Prioritizes heroes. ",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 25,
              "hawk_spawn_interval": 0.75,
              "hawk_base_max_health": 625,
              "hawk_base_gold_bounty": 60,
              "hawk_base_vision_range": 750,
              "hawk_base_xp_bounty": 70,
              "hawk_base_magic_resist": 60,
              "attack_radius": 500,
              "hawk_count": 2,
              "dive_damage": 165,
              "dive_root_duration": 1,
              "roaming_radius": 280,
              "roaming_seconds_per_rotation": 4,
              "hawk_base_attack_interval": 4,
              "min_move_speed": 455,
              "max_move_speed": 1100,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 50,
              "AbilityCooldown": 30
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 30,
            "mana": 50,
            "range_wu": 0,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "duration": 25,
              "hawk_spawn_interval": 0.75,
              "hawk_base_max_health": 625,
              "hawk_base_gold_bounty": 60,
              "hawk_base_vision_range": 750,
              "hawk_base_xp_bounty": 70,
              "hawk_base_magic_resist": 60,
              "attack_radius": 500,
              "hawk_count": 2,
              "dive_damage": 165,
              "dive_root_duration": 1,
              "roaming_radius": 280,
              "roaming_seconds_per_rotation": 4,
              "hawk_base_attack_interval": 4,
              "min_move_speed": 455,
              "max_move_speed": 1100,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 50,
              "AbilityCooldown": 30
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。2自主鹰每4秒俯冲伤害和缠绕；简化为固定出生点，不飞行环绕。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "summon",
                "count": "hawk_count",
                "hp": "hawk_base_max_health",
                "damage": "dive_damage",
                "duration": "duration",
                "interval": "hawk_base_attack_interval",
                "range": "attack_radius",
                "speed": 0,
                "type": "magical",
                "onHit": [
                  {
                    "op": "status",
                    "duration": "dive_root_duration",
                    "values": {
                      "root": true
                    }
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。2自主鹰每4秒俯冲伤害和缠绕；简化为固定出生点，不飞行环绕。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "beastmaster_primal_roar",
          "valveAbilityId": 5177,
          "slot": "S4",
          "name": "原始咆哮",
          "en": "Primal Roar",
          "icon": "assets/r20_55/beastmaster_primal_roar.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=38",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 3,
            "dispelCode": 1,
            "description": "Beastmaster lets loose a deafening roar that stuns, and shoves open a path to its target. All units in the path of the roar are damaged, while units shoved aside by the roar have their movement and attack speed slowed. Additionally, Beastmaster and his units gain %movement_speed%%% movement speed for %movement_speed_duration% seconds.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 4,
              "damage": 300,
              "side_damage": 300,
              "damage_radius": 300,
              "slow_movement_speed_pct": -60,
              "slow_attack_speed_pct": -60,
              "push_distance": 450,
              "push_duration": 1,
              "slow_duration": 4,
              "movement_speed": 40,
              "movement_speed_duration": 2,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 150,
              "AbilityCooldown": 60
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 60,
            "mana": 150,
            "range_wu": 330,
            "startup_frames": 30,
            "recovery_frames": 12,
            "params": {
              "duration": 4,
              "damage": 300,
              "side_damage": 300,
              "damage_radius": 300,
              "slow_movement_speed_pct": -60,
              "slow_attack_speed_pct": -60,
              "push_distance": 450,
              "push_duration": 1,
              "slow_duration": 4,
              "movement_speed": 40,
              "movement_speed_duration": 2,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 150,
              "AbilityCooldown": 60
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。主目标伤害眩晕，自身2秒40%加速；省略副目标开路。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong",
                "pierces": true
              },
              {
                "op": "status",
                "to": "self",
                "duration": "movement_speed_duration",
                "values": {
                  "moveBonus": {
                    "div": [
                      "movement_speed",
                      100
                    ]
                  }
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。主目标伤害眩晕，自身2秒40%加速；省略副目标开路。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "beastmaster",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5168,
        7230,
        7231,
        5177
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 5172,
          "key": "beastmaster_inner_beast",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=38",
          "description": "Untaps the inner fury of Beastmaster and units he controls, passively increasing their attack speed.",
          "specialValues": [
            {
              "name": "radius",
              "values_float": [
                1200
              ],
              "is_percentage": false,
              "heading_loc": "RADIUS:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "bonus_attack_speed",
              "values_float": [
                7
              ],
              "is_percentage": false,
              "heading_loc": "BONUS ATTACK SPEED:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "bonus_damage",
              "values_float": [],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_beastmaster_2",
                  "value": 25,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        5172,
        1005
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "bloodseeker",
    "definition": {
      "id": "valve_4",
      "registryNumericId": 21,
      "valveHeroId": 4,
      "packKey": "r20_55",
      "name": "血魔",
      "en": "Bloodseeker",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1658,
      "combatHp": 1658,
      "combatMana": 687,
      "attack": 115,
      "move_speed": 228,
      "attack_range": 90,
      "attack_interval_s": 0.9620826259196378,
      "mana_regen": 2.5500000000000003,
      "portrait": "assets/r20_55/bloodseeker-portrait.png",
      "render": "assets/r20_55/bloodseeker-render.png",
      "arenaStats": {
        "str": 69.9,
        "agi": 76.7,
        "int": 51
      },
      "abilities": [
        {
          "id": "bloodseeker_bloodrage",
          "valveAbilityId": 5015,
          "slot": "S1",
          "name": "血怒",
          "en": "Bloodrage",
          "icon": "assets/r20_55/bloodseeker_bloodrage.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=4",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 4,
            "immunityCode": 3,
            "dispelCode": 2,
            "description": "Drives Bloodseeker into a bloodthirsty rage which causes him to attack faster and deal more spell damage at the cost of a percentage of his health per second.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 8,
              "attack_speed": 130,
              "spell_amp": 30,
              "damage_pct": 1.2,
              "max_health_dmg_pct": 0,
              "AbilityCooldown": 8
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 8,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "duration": 8,
              "attack_speed": 130,
              "spell_amp": 30,
              "damage_pct": 1.2,
              "max_health_dmg_pct": 0,
              "AbilityCooldown": 8
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自施加攻击速度/技能增幅，每秒最大生命百分比非致死自损。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "attackSpeed": "attack_speed",
                  "spellAmp": {
                    "div": [
                      "spell_amp",
                      100
                    ]
                  }
                },
                "tick": {
                  "interval": 1,
                  "ops": [
                    {
                      "op": "selfCost",
                      "percent": "damage_pct"
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自施加攻击速度/技能增幅，每秒最大生命百分比非致死自损。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "bloodseeker_blood_bath",
          "valveAbilityId": 5016,
          "slot": "S2",
          "name": "血祭",
          "en": "Blood Rite",
          "icon": "assets/r20_55/bloodseeker_blood_bath.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=4",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 4,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Bloodseeker baptizes an area in sacred blood. After %delay_plus_castpoint_tooltip% seconds the ritual completes, causing any enemies caught in the area to take damage and become silenced.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 600,
              "silence_duration": 6,
              "damage": 265,
              "delay": 2.6,
              "delay_plus_castpoint_tooltip": 2.9,
              "AbilityCastRange": 1500,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 120,
              "AbilityCooldown": 12
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 12,
            "mana": 120,
            "range_wu": 825.0000000000001,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "radius": 600,
              "silence_duration": 6,
              "damage": 265,
              "delay": 2.6,
              "delay_plus_castpoint_tooltip": 2.9,
              "AbilityCastRange": 1500,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 120,
              "AbilityCooldown": 12
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定地面落点延迟爆发；离开半径可躲避。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "delay",
                "delay": "delay",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "damage",
                    "type": "pure",
                    "radius": "radius",
                    "center": "aim"
                  },
                  {
                    "op": "status",
                    "duration": "silence_duration",
                    "values": {
                      "silence": true
                    },
                    "radius": "radius",
                    "center": "aim"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定地面落点延迟爆发；离开半径可躲避。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "bloodseeker_thirst",
          "valveAbilityId": 5017,
          "slot": "S3",
          "name": "焦渴",
          "en": "Thirst",
          "icon": "assets/r20_55/bloodseeker_thirst.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=4",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Bloodseeker is invigorated by the wounds of his enemies, gaining bonus movement speed when an enemy hero's health falls below %min_bonus_pct%%%, with the bonuses increasing as their health falls further. If an enemy hero's health falls below %invis_threshold_pct%%%, he will also gain vision and True Sight of that hero. Bonuses stack per hero. Unlocks max movement speed for Bloodseeker.",
            "profile": "level18-base-no-item",
            "semantic": {
              "min_bonus_pct": 100,
              "bonus_movement_speed": 40,
              "max_bonus_pct": 25,
              "visibility_threshold_pct": 25,
              "invis_threshold_pct": 25,
              "linger_duration": 4,
              "AbilityCastPoint": 0.3
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "min_bonus_pct": 100,
              "bonus_movement_speed": 40,
              "max_bonus_pct": 25,
              "visibility_threshold_pct": 25,
              "invis_threshold_pct": 25,
              "linger_duration": 4,
              "AbilityCastPoint": 0.3
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。速度按唯一敌方失血比例线性增长，25%以下达到最大并显形；不叠加不存在的敌队。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。速度按唯一敌方失血比例线性增长，25%以下达到最大并显形；不叠加不存在的敌队。",
            "dynamic": "thirst"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "bloodseeker_rupture",
          "valveAbilityId": 5018,
          "slot": "S4",
          "name": "割裂",
          "en": "Rupture",
          "icon": "assets/r20_55/bloodseeker_rupture.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=4",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 4,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Causes an enemy unit's skin to rupture, dealing initial damage based on its current health. If the unit moves, it takes damage based on the distance moved.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 11,
              "movement_damage_pct": 55,
              "hp_pct": 10,
              "damage_cap_amount": 200,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.4,
              "AbilityCharges": 0,
              "AbilityManaCost": 225,
              "AbilityCooldown": 65
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 65,
            "mana": 225,
            "range_wu": 440.00000000000006,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "duration": 11,
              "movement_damage_pct": 55,
              "hp_pct": 10,
              "damage_cap_amount": 200,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.4,
              "AbilityCharges": 0,
              "AbilityManaCost": 225,
              "AbilityCooldown": 65
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。初始当前生命比例伤害；按还原Dota距离结算移动伤害，单次超200距离跳跃跳过；不驱散。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": {
                  "mul": [
                    {
                      "stat": "hp",
                      "who": "target"
                    },
                    {
                      "div": [
                        "hp_pct",
                        100
                      ]
                    }
                  ]
                },
                "type": "pure"
              },
              {
                "op": "rupture",
                "duration": "duration",
                "percent": "movement_damage_pct",
                "cap": "damage_cap_amount"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。初始当前生命比例伤害；按还原Dota距离结算移动伤害，单次超200距离跳跃跳过；不驱散。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "bloodseeker",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5015,
        5016,
        5017,
        5018
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1203,
          "key": "bloodseeker_sanguivore",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=4",
          "description": "Bloodseeker restores some life when he kills a unit, equal to %base_heal% health plus a percentage of the units max health.<br><br>Restores for half values if an ally kills a nearby enemy hero.",
          "specialValues": [
            {
              "name": "base_heal",
              "values_float": [
                30
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "heal_hp_pct",
              "values_float": [
                0
              ],
              "is_percentage": true,
              "heading_loc": "MAX HEALTH HEAL:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "creep_lifesteal_reduction_pct",
              "values_float": [
                40
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "half_bonus_aoe",
              "values_float": [
                300
              ],
              "is_percentage": false,
              "heading_loc": "HALF HEAL RADIUS:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "barrier_decay_pct",
              "values_float": [],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_bloodseeker_overheal_barrier",
                  "value": 1.5,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "max_shield_pct",
              "values_float": [],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_bloodseeker_overheal_barrier",
                  "value": 35,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "pure_damage_lifesteal_pct",
              "values_float": [],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_bloodseeker_pure_damage_lifesteal",
                  "value": 25,
                  "operation": 5
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "AbilityCastPoint",
              "values_float": [
                0.3
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1203
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "clinkz",
    "definition": {
      "id": "valve_56",
      "registryNumericId": 54,
      "valveHeroId": 56,
      "packKey": "r20_55",
      "name": "克林克兹",
      "en": "Clinkz",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1264,
      "combatHp": 1264,
      "combatMana": 776,
      "attack": 93,
      "move_speed": 228,
      "attack_range": 330,
      "attack_interval_s": 0.994733762434172,
      "mana_regen": 2.9200001,
      "portrait": "assets/r20_55/clinkz-portrait.png",
      "render": "assets/r20_55/clinkz-render.png",
      "arenaStats": {
        "str": 52,
        "agi": 70.9,
        "int": 58.400000000000006
      },
      "abilities": [
        {
          "id": "clinkz_strafe",
          "valveAbilityId": 1120,
          "slot": "S1",
          "name": "扫射",
          "en": "Strafe",
          "icon": "assets/r20_55/clinkz_strafe.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=56",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 3,
            "dispelCode": 2,
            "description": "Clinkz gains attack speed and has bonus attack range. Any current Skeleton Archers within a %strafe_skeleton_radius% radius of Clinkz also gain bonus attack range and %archer_attack_speed_pct%%% of the attack speed bonus. <br><br> Casting Strafe does not break Skeleton Walk invisibility.",
            "profile": "level18-base-no-item",
            "semantic": {
              "attack_speed_bonus": 240,
              "duration": 3.5,
              "attack_range_bonus": 200,
              "strafe_skeleton_radius": 1200,
              "archer_attack_speed_pct": 40,
              "AbilityCastRange": 1200,
              "AbilityManaCost": 90,
              "AbilityCooldown": 15
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 15,
            "mana": 90,
            "range_wu": 660,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "attack_speed_bonus": 240,
              "duration": 3.5,
              "attack_range_bonus": 200,
              "strafe_skeleton_radius": 1200,
              "archer_attack_speed_pct": 40,
              "AbilityCastRange": 1200,
              "AbilityManaCost": 90,
              "AbilityCooldown": 15
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自身3.5秒240攻速和200原射程；不解除隐身，省略骷髅共享加成。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "attackSpeed": "attack_speed_bonus",
                  "attackRange": {
                    "mul": [
                      "attack_range_bonus",
                      0.55
                    ]
                  }
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自身3.5秒240攻速和200原射程；不解除隐身，省略骷髅共享加成。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "clinkz_searing_arrows",
          "valveAbilityId": 5260,
          "slot": "S2",
          "name": "灼热之箭",
          "en": "Searing Arrows",
          "icon": "assets/r20_55/clinkz_searing_arrows.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=56",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Imbues Clinkz's arrows with fire for extra damage.<br><br>Skeleton Archers will fire Searing Arrows at targets Clinkz attacks for %skeleton_damage_pct%%% damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage_bonus": 65,
              "skeleton_damage_pct": 50,
              "AbilityCastRange": 600,
              "AbilityManaCost": 10
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 0,
            "mana": 10,
            "range_wu": 330,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "damage_bonus": 65,
              "skeleton_damage_pct": 50,
              "AbilityCastRange": 600,
              "AbilityManaCost": 10
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。同槽开关，命中普攻前支付10蓝追加65物伤；不足蓝普通攻击，不触发额外伤害。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "toggle",
                "values": {
                  "searingArrows": true
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。同槽开关，命中普攻前支付10蓝追加65物伤；不足蓝普通攻击，不触发额外伤害。",
            "toggle": true,
            "attack": {
              "requiresToggle": true,
              "mana": "AbilityManaCost",
              "ops": [
                {
                  "op": "damage",
                  "amount": "damage_bonus",
                  "type": "physical"
                }
              ]
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "clinkz_death_pact",
          "valveAbilityId": 5262,
          "slot": "S3",
          "name": "死亡契约",
          "en": "Death Pact",
          "icon": "assets/r20_55/clinkz_death_pact.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=56",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 3,
            "description": "Clinkz consumes the target enemy creep or friendly Skeleton Archer, healing and gaining max health. Does not take Clinkz out of Skeleton Walk.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 45,
              "health_gain": 400,
              "creep_level": 6,
              "AbilityCastRange": 700,
              "AbilityCastPoint": 0.2,
              "AbilityCharges": 2,
              "AbilityChargeRestoreTime": 40,
              "AbilityManaCost": 50
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 0,
            "mana": 50,
            "range_wu": 385.00000000000006,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "duration": 45,
              "health_gain": 400,
              "creep_level": 6,
              "AbilityCastRange": 700,
              "AbilityCastPoint": 0.2,
              "AbilityCharges": 2,
              "AbilityChargeRestoreTime": 40,
              "AbilityManaCost": 50
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。2充能每40秒按序恢复，自动消耗最早出生的己方非英雄单位，+400最大生命并治疗400，再施放刷新且不叠加，45秒后按生命比例还原；无合法单位拒绝且不扣资源。可用骨隐步自然产生的骷髅。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "deathPact"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。2充能每40秒按序恢复，自动消耗最早出生的己方非英雄单位，+400最大生命并治疗400，再施放刷新且不叠加，45秒后按生命比例还原；无合法单位拒绝且不扣资源。可用骨隐步自然产生的骷髅。",
            "integrationRequirement": "CHARGES_CONSUME_UNIT_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "clinkz_wind_walk",
          "valveAbilityId": 5261,
          "slot": "S4",
          "name": "骨隐步",
          "en": "Skeleton Walk",
          "icon": "assets/r20_55/clinkz_wind_walk.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=56",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 3,
            "description": "Clinkz moves invisibly through units until the moment he attacks or uses items. Leaving Skeleton Walk creates Skeleton Archers.<br><br>Skeleton Archers are immobile and die within multiple attacks from a hero or tower. Skeleton Archers deal a percentage of Clinkz' damage, and deal %skeleton_building_damage_reduction%%% less damage to buildings. Attack range is equal to Clinkz' attack range.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 45,
              "fade_time": 0.6,
              "move_speed_bonus_pct": 45,
              "skeleton_count": 4,
              "skeleton_offset": 250,
              "skeleton_offset_min": 150,
              "skeleton_duration": 30,
              "skeleton_health": 8,
              "skeleton_health_tooltip": 2,
              "skeleton_building_damage_reduction": 75,
              "attack_rate": 1.6,
              "damage_percent": 20,
              "AbilityManaCost": 130,
              "AbilityCooldown": 18
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 18,
            "mana": 130,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "duration": 45,
              "fade_time": 0.6,
              "move_speed_bonus_pct": 45,
              "skeleton_count": 4,
              "skeleton_offset": 250,
              "skeleton_offset_min": 150,
              "skeleton_duration": 30,
              "skeleton_health": 8,
              "skeleton_health_tooltip": 2,
              "skeleton_building_damage_reduction": 75,
              "attack_rate": 1.6,
              "damage_percent": 20,
              "AbilityManaCost": 130,
              "AbilityCooldown": 18
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.6秒后隐身与45%移速，攻击/非例外技能/到期退出，生成4个自主固定骷髅弓手，2次普攻击破；扫射、死亡契约不破隐，死亡不生成骷髅。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "wind"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.6秒后隐身与45%移速，攻击/非例外技能/到期退出，生成4个自主固定骷髅弓手，2次普攻击破；扫射、死亡契约不破隐，死亡不生成骷髅。",
            "integrationRequirement": "ACTION_VISIBILITY_UNITS_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "clinkz",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        1120,
        5260,
        5262,
        5261
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1678,
          "key": "clinkz_infernal_shred",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=56",
          "description": "Clinkz and his skeletons apply a stacking debuff that causes their attacks to pierce up to %max_armor_piercing_pct%%% of the target's total physical armor (does not reduce their armor).  Clinkz applies %hero_stacks%%% per attack, and skeletons apply %skeleton_stacks%%%. <br><br>Lasts %duration% seconds.",
          "specialValues": [
            {
              "name": "duration",
              "values_float": [
                5
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "hero_stacks",
              "values_float": [
                3
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "skeleton_stacks",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "max_armor_piercing_pct",
              "values_float": [
                20
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        5259,
        7319,
        1678
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "CHARGES_CONSUME_UNIT_V2",
        "ACTION_VISIBILITY_UNITS_V2"
      ]
    }
  },
  {
    "key": "dark_seer",
    "definition": {
      "id": "valve_55",
      "registryNumericId": 53,
      "valveHeroId": 55,
      "packKey": "r20_55",
      "name": "黑暗贤者",
      "en": "Dark Seer",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1532,
      "combatHp": 1532,
      "combatMana": 902,
      "attack": 103,
      "move_speed": 236,
      "attack_range": 90,
      "attack_interval_s": 1.176470588235294,
      "mana_regen": 3.4450000000000003,
      "portrait": "assets/r20_55/dark_seer-portrait.png",
      "render": "assets/r20_55/dark_seer-render.png",
      "arenaStats": {
        "str": 64.2,
        "agi": 44.5,
        "int": 68.9
      },
      "abilities": [
        {
          "id": "dark_seer_vacuum",
          "valveAbilityId": 5255,
          "slot": "S1",
          "name": "真空",
          "en": "Vacuum",
          "icon": "assets/r20_55/dark_seer_vacuum.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=55",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "Dark Seer creates a vacuum over the target area that sucks in enemy units, disrupting them and dealing damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 550,
              "duration": 0.6,
              "damage": 250,
              "radius_tree": 150,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 150,
              "AbilityCooldown": 30
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 30,
            "mana": 150,
            "range_wu": 330,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "radius": 550,
              "duration": 0.6,
              "damage": 250,
              "radius_tree": 150,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 150,
              "AbilityCooldown": 30
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。吸到指定点并伤害/短控，瞬时横向位移改编。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "damage",
                "amount": "damage",
                "radius": "radius",
                "center": "aim"
              },
              {
                "op": "move",
                "mode": "aim",
                "radius": "radius",
                "center": "aim"
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong",
                "radius": "radius",
                "center": "aim"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。吸到指定点并伤害/短控，瞬时横向位移改编。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "dark_seer_ion_shell",
          "valveAbilityId": 5256,
          "slot": "S2",
          "name": "离子外壳",
          "en": "Ion Shell",
          "icon": "assets/r20_55/dark_seer_ion_shell.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=55",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Surrounds the target unit with a bristling shield that damages enemy units in an area around it.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 275,
              "damage_per_second": 90,
              "duration": 26,
              "tick_interval": 0.2,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 130,
              "AbilityCooldown": 9
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 9,
            "mana": 130,
            "range_wu": 440.00000000000006,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "radius": 275,
              "damage_per_second": 90,
              "duration": 26,
              "tick_interval": 0.2,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 130,
              "AbilityCooldown": 9
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自身套盾，26秒90DPS范围伤害；基础驱散须同时取消区域，当前区域无法被驱散列为适配省略。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "area",
                "duration": "duration",
                "interval": "tick_interval",
                "radius": "radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": {
                      "mul": [
                        "damage_per_second",
                        "tick_interval"
                      ]
                    }
                  }
                ],
                "follow": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自身套盾，26秒90DPS范围伤害；基础驱散须同时取消区域，当前区域无法被驱散列为适配省略。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "dark_seer_surge",
          "valveAbilityId": 5257,
          "slot": "S3",
          "name": "奔腾",
          "en": "Surge",
          "icon": "assets/r20_55/dark_seer_surge.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=55",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 1,
            "dispelCode": 2,
            "description": "Charges a target friendly unit with power, giving it a brief burst of phased movement speed. Allows the unit to reach maximum movement speed and cannot be slowed.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 6,
              "speed_boost": 550,
              "trail_radius": 0,
              "trail_duration": 0,
              "trail_move_slow": 0,
              "trail_damage": 0,
              "trail_damage_interval": 0,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 50,
              "AbilityCooldown": 9
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 9,
            "mana": 50,
            "range_wu": 330,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "duration": 6,
              "speed_boost": 550,
              "trail_radius": 0,
              "trail_duration": 0,
              "trail_move_slow": 0,
              "trail_damage": 0,
              "trail_damage_interval": 0,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 50,
              "AbilityCooldown": 9
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自身6秒固定550原移速，不受慢速；速度经竞技倍率0.8。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "surgeSpeed": "speed_boost",
                  "slowImmune": true
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自身6秒固定550原移速，不受慢速；速度经竞技倍率0.8。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "dark_seer_wall_of_replica",
          "valveAbilityId": 5258,
          "slot": "S4",
          "name": "复制之墙",
          "en": "Wall of Replica",
          "icon": "assets/r20_55/dark_seer_wall_of_replica.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=55",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Raises a wall of warping light that slows, damages, and creates replicas of any enemy hero who crosses it. Enemy replicas serve at the Dark Seer's will. Replicas last until they are destroyed, or until the wall's duration ends.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 30,
              "replica_damage_outgoing": -10,
              "tooltip_outgoing": 90,
              "replica_damage_incoming": 100,
              "tooltip_replica_total_damage_incoming": 200,
              "width": 1300,
              "movement_slow": 40,
              "slow_duration": 1,
              "scepter_length_multiplier": 0,
              "wall_damage": 55,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 375,
              "AbilityCooldown": 100
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 100,
            "mana": 375,
            "range_wu": 550,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "duration": 30,
              "replica_damage_outgoing": -10,
              "tooltip_outgoing": 90,
              "replica_damage_incoming": 100,
              "tooltip_replica_total_damage_incoming": 200,
              "width": 1300,
              "movement_slow": 40,
              "slow_duration": 1,
              "scepter_length_multiplier": 0,
              "wall_damage": 55,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 375,
              "AbilityCooldown": 100
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。横向墙坐标越线时55伤害/40%短慢并生成敌人90%攻击力、200%承伤的自主幻象；同一敌最多1只存活幻象，死亡可重新越线生成，随墙到期清除。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "wall"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。横向墙坐标越线时55伤害/40%短慢并生成敌人90%攻击力、200%承伤的自主幻象；同一敌最多1只存活幻象，死亡可重新越线生成，随墙到期清除。",
            "integrationRequirement": "CROSSING_AUTONOMOUS_UNIT_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [
        {
          "id": "dark_seer_aggrandize",
          "valveAbilityId": 1553,
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=55",
          "level": 18,
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自动先天：固定18级智力每点给予1攻速。等级固定，不触发升级恢复生命/魔法。",
            "stats": {
              "attackSpeed": {
                "mul": [
                  {
                    "stat": "int"
                  },
                  "int_to_atkspd"
                ]
              }
            }
          },
          "mvp": {
            "passive": true,
            "params": {
              "int_to_atkspd": 1,
              "attack_speed_tooltip": 0,
              "heal_pct": 8.5
            }
          }
        }
      ],
      "activeUnlock": false,
      "key": "dark_seer",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5255,
        5256,
        5257,
        5258
      ],
      "automaticInnateIds": [
        1553
      ],
      "innateCandidates": [
        {
          "id": 1553,
          "key": "dark_seer_aggrandize",
          "passive": true,
          "status": "implemented_adapted_fixed18",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=55",
          "description": "Dark Seer gains %int_to_atkspd% Attack Speed from each point of Intelligence.\n\nWhen Dark Seer levels up, he restores a percentage of his max health and mana.",
          "specialValues": [
            {
              "name": "int_to_atkspd",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "attack_speed_tooltip",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "BONUS ATTACK SPEED:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "heal_pct",
              "values_float": [
                8.5
              ],
              "is_percentage": true,
              "heading_loc": "MAX HP/MANA RESTORE:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        687,
        1553
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "CROSSING_AUTONOMOUS_UNIT_V2"
      ]
    }
  },
  {
    "key": "dazzle",
    "definition": {
      "id": "valve_50",
      "registryNumericId": 48,
      "valveHeroId": 50,
      "packKey": "r20_55",
      "name": "戴泽",
      "en": "Dazzle",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1398,
      "combatHp": 1398,
      "combatMana": 1089,
      "attack": 111,
      "move_speed": 244,
      "attack_range": 316.25,
      "attack_interval_s": 1.1417058428475488,
      "mana_regen": 4.525,
      "portrait": "assets/r20_55/dazzle-portrait.png",
      "render": "assets/r20_55/dazzle-render.png",
      "arenaStats": {
        "str": 58.099999999999994,
        "agi": 48.9,
        "int": 84.5
      },
      "abilities": [
        {
          "id": "dazzle_poison_touch",
          "valveAbilityId": 5233,
          "slot": "S1",
          "name": "剧毒之触",
          "en": "Poison Touch",
          "icon": "assets/r20_55/dazzle_poison_touch.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=50",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Releases a cone of poison that strikes multiple enemy units. Deals damage over time and slows the targets. Anytime the targets get attacked by Dazzle, the debuff duration is refreshed and slow is increased.",
            "profile": "level18-base-no-item",
            "semantic": {
              "start_radius": 200,
              "end_radius": 300,
              "end_distance": 900,
              "targets": 8,
              "damage": 52,
              "slow": -22,
              "projectile_speed": 1300,
              "duration": 8,
              "bonus_slow": -4,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 140,
              "AbilityCooldown": 15
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 15,
            "mana": 140,
            "range_wu": 440.00000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "start_radius": 200,
              "end_radius": 300,
              "end_distance": 900,
              "targets": 8,
              "damage": 52,
              "slow": -22,
              "projectile_speed": 1300,
              "duration": 8,
              "bonus_slow": -4,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 140,
              "AbilityCooldown": 15
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。物理毒每秒52，Dazzle命中刷新时长并叠4%慢速；无多单位锥形。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "moveSlow": 0.22,
                  "refreshOnOwnerAttack": true,
                  "slowIncrement": 0.04
                },
                "tick": {
                  "interval": 1,
                  "ops": [
                    {
                      "op": "damage",
                      "amount": "damage",
                      "type": "physical"
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。物理毒每秒52，Dazzle命中刷新时长并叠4%慢速；无多单位锥形。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "dazzle_shallow_grave",
          "valveAbilityId": 5234,
          "slot": "S2",
          "name": "薄葬",
          "en": "Shallow Grave",
          "icon": "assets/r20_55/dazzle_shallow_grave.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=50",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 1,
            "dispelCode": 3,
            "description": "An ally blessed with Shallow Grave, no matter how close to death, cannot die while under its protection. Healing on that ally is also amplified for the duration based on the hero's HP.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 5.5,
              "fx_halo_height": 350,
              "heal_amplify": 9,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 120,
              "AbilityCooldown": 18
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 18,
            "mana": 120,
            "range_wu": 495.00000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "duration": 5.5,
              "fx_halo_height": 350,
              "heal_amplify": 9,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 120,
              "AbilityCooldown": 18
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自施放不死保护，生命最低1；按每损失10%生命增幅9%治疗；不复活死人。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "grave": true,
                  "graveHealAmpPerDecile": {
                    "div": [
                      "heal_amplify",
                      100
                    ]
                  }
                },
                "dispel": "none"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自施放不死保护，生命最低1；按每损失10%生命增幅9%治疗；不复活死人。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "dazzle_shadow_wave",
          "valveAbilityId": 5235,
          "slot": "S3",
          "name": "暗影波",
          "en": "Shadow Wave",
          "icon": "assets/r20_55/dazzle_shadow_wave.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=50",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Sends out a bolt of power that arcs between allies, healing them while damaging any enemy units standing nearby.  Dazzle is always healed by Shadow Wave.",
            "profile": "level18-base-no-item",
            "semantic": {
              "bounce_radius": 475,
              "damage_radius": 185,
              "max_targets": 6,
              "tooltip_max_targets_inc_dazzle": 7,
              "damage": 145,
              "scepter_heal_pct": 100,
              "scepter_cd_increase": 2,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 90,
              "AbilityCooldown": 7
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 7,
            "mana": 90,
            "range_wu": 440.00000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "bounce_radius": 475,
              "damage_radius": 185,
              "max_targets": 6,
              "tooltip_max_targets_inc_dazzle": 7,
              "damage": 145,
              "scepter_heal_pct": 100,
              "scepter_cd_increase": 2,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 90,
              "AbilityCooldown": 7
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自疗145并对自身附近敌人145物伤；无友军弹射。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "heal",
                "to": "self",
                "amount": "damage"
              },
              {
                "op": "damage",
                "amount": "damage",
                "type": "physical",
                "radius": "damage_radius"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自疗145并对自身附近敌人145物伤；无友军弹射。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "dazzle_nothl_projection",
          "valveAbilityId": 1550,
          "slot": "S4",
          "name": "虚无投影",
          "en": "Nothl Projection",
          "icon": "assets/r20_55/dazzle_nothl_projection.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=50",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 3,
            "description": "Dazzle departs his body, traveling through the Nothl Realm as an invulnerable spirit that can cast spells, attack, and use items, leaving his body behind in the world with a visible tether. While active, Dazzle's basic abilities are empowered: Poison Touch hexes enemies, Shallow Grave heals upon expiration, and Shadow Wave has a shorter cooldown. The effect can be ended early, and Dazzle returns to the body at the end.",
            "profile": "level18-base-no-item",
            "semantic": {
              "min_duration": 5,
              "max_duration": 12,
              "initial_travel_speed": 1200,
              "soul_return_time": 0.75,
              "soul_return_min_speed": 500,
              "leash_start": 1600,
              "base_leash_pull": 50,
              "leash_increase": 1.5,
              "poison_touch_hex": 1.8,
              "shallow_grave_heal": 375,
              "shadow_wave_cdr": 50,
              "AbilityCastRange": 450,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 200,
              "AbilityCooldown": 50
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 50,
            "mana": 200,
            "range_wu": 247.50000000000003,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "min_duration": 5,
              "max_duration": 12,
              "initial_travel_speed": 1200,
              "soul_return_time": 0.75,
              "soul_return_min_speed": 500,
              "leash_start": 1600,
              "base_leash_pull": 50,
              "leash_increase": 1.5,
              "poison_touch_hex": 1.8,
              "shallow_grave_heal": 375,
              "shadow_wave_cdr": 50,
              "AbilityCastRange": 450,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 200,
              "AbilityCooldown": 50
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。身体位置留置，单一操控位置移动为灵魂；灵魂专属受击忽略，普通敌方攻击仍路由身体共享生命。R最短5秒可回归、12秒强制回归；强化毒触妖术、薄葬结束治疗及暗影波半冷却。无分身切换。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "projection"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。身体位置留置，单一操控位置移动为灵魂；灵魂专属受击忽略，普通敌方攻击仍路由身体共享生命。R最短5秒可回归、12秒强制回归；强化毒触妖术、薄葬结束治疗及暗影波半冷却。无分身切换。",
            "integrationRequirement": "BODY_SPIRIT_TARGET_ROUTE_V2",
            "recast": true
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "dazzle",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5233,
        5234,
        5235,
        1550
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1293,
          "key": "dazzle_innate_weave",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=50",
          "description": "Dazzle's abilities apply Weave to both allies and enemies they affect, increasing allied armor and reducing enemy armor. Multiple instances of this effect stack.",
          "specialValues": [
            {
              "name": "armor_change",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "ARMOR CHANGE PER STACK:",
              "bonuses": [
                {
                  "name": "special_bonus_unique_dazzle_4",
                  "value": 1,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "duration",
              "values_float": [
                6.9
              ],
              "is_percentage": false,
              "heading_loc": "DURATION:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "affects_allies",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "affects_enemies",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "heal_amplification_pct",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "dazzle_facet_nothl_boon",
                "values": [
                  7.5
                ],
                "operation": 5
              },
              "required_facet": "dazzle_facet_nothl_boon"
            },
            {
              "name": "ally_multiplier",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "dazzle_facet_nothl_boon",
                "values": [
                  2
                ],
                "operation": 5
              },
              "required_facet": "dazzle_facet_nothl_boon"
            },
            {
              "name": "enemy_multiplier",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "dazzle_poison_bloom",
                "values": [
                  2
                ],
                "operation": 5
              },
              "required_facet": "dazzle_poison_bloom"
            },
            {
              "name": "ally_heal",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [
                60
              ],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1293
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "BODY_SPIRIT_TARGET_ROUTE_V2"
      ]
    }
  },
  {
    "key": "death_prophet",
    "definition": {
      "id": "valve_43",
      "registryNumericId": 42,
      "valveHeroId": 43,
      "packKey": "r20_55",
      "name": "死亡先知",
      "en": "Death Prophet",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1667,
      "combatHp": 1667,
      "combatMana": 975,
      "attack": 125,
      "move_speed": 232,
      "attack_range": 330,
      "attack_interval_s": 1.0890454836643177,
      "mana_regen": 4.25,
      "portrait": "assets/r20_55/death_prophet-portrait.png",
      "render": "assets/r20_55/death_prophet-render.png",
      "arenaStats": {
        "str": 70.3,
        "agi": 56.099999999999994,
        "int": 75
      },
      "abilities": [
        {
          "id": "death_prophet_carrion_swarm",
          "valveAbilityId": 5090,
          "slot": "S1",
          "name": "地穴虫群",
          "en": "Crypt Swarm",
          "icon": "assets/r20_55/death_prophet_carrion_swarm.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=43",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Sends a swarm of winged beasts to savage enemy units in front of Death Prophet.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage": 325,
              "start_radius": 110,
              "end_radius": 300,
              "range": 900,
              "speed": 1100,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 110,
              "AbilityCooldown": 6
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 6,
            "mana": 110,
            "range_wu": 495.00000000000006,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "damage": 325,
              "start_radius": 110,
              "end_radius": 300,
              "range": 900,
              "speed": 1100,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 110,
              "AbilityCooldown": 6
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单方向射程内唯一敌人325魔伤；省略贯穿单位和可躲弹体。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单方向射程内唯一敌人325魔伤；省略贯穿单位和可躲弹体。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "death_prophet_silence",
          "valveAbilityId": 5091,
          "slot": "S2",
          "name": "沉默魔法",
          "en": "Silence",
          "icon": "assets/r20_55/death_prophet_silence.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=43",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Fires a projectile that prevents enemy units in a target area from casting spells.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 450,
              "projectile_speed": 1750,
              "AbilityCastRange": 900,
              "AbilityDuration": 5,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 110,
              "AbilityCooldown": 12
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 12,
            "mana": 110,
            "range_wu": 495.00000000000006,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "radius": 450,
              "projectile_speed": 1750,
              "AbilityCastRange": 900,
              "AbilityDuration": 5,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 110,
              "AbilityCooldown": 12
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。指定点450原距离内沉默，省略飞行弹体。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "status",
                "duration": "AbilityDuration",
                "values": {
                  "silence": true
                },
                "radius": "radius",
                "center": "aim"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。指定点450原距离内沉默，省略飞行弹体。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "death_prophet_spirit_siphon",
          "valveAbilityId": 5685,
          "slot": "S3",
          "name": "吸魂巫术",
          "en": "Spirit Siphon",
          "icon": "assets/r20_55/death_prophet_spirit_siphon.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=43",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Creates a spirit link between Death Prophet and an enemy unit, draining health from the enemy.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage": 100,
              "haunt_duration": 6,
              "siphon_buffer": 250,
              "shard_bonus_charges": 0,
              "shard_fear_duration": 0,
              "shard_consecutive_siphon_duration": 0,
              "AbilityCastRange": 500,
              "AbilityCastPoint": 0.1,
              "AbilityCharges": 4,
              "AbilityChargeRestoreTime": 40,
              "AbilityManaCost": 60
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 0,
            "mana": 60,
            "range_wu": 275,
            "startup_frames": 6,
            "recovery_frames": 12,
            "params": {
              "damage": 100,
              "haunt_duration": 6,
              "siphon_buffer": 250,
              "shard_bonus_charges": 0,
              "shard_fear_duration": 0,
              "shard_consecutive_siphon_duration": 0,
              "AbilityCastRange": 500,
              "AbilityCastPoint": 0.1,
              "AbilityCharges": 4,
              "AbilityChargeRestoreTime": 40,
              "AbilityManaCost": 60
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。4充能、每40秒按序恢复，6秒每0.25秒25伤害与实际伤害治疗；750原距离断链，多个链独立。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "special",
                "name": "siphon"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。4充能、每40秒按序恢复，6秒每0.25秒25伤害与实际伤害治疗；750原距离断链，多个链独立。",
            "integrationRequirement": "CHARGES_LINKS_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "death_prophet_exorcism",
          "valveAbilityId": 5093,
          "slot": "S4",
          "name": "驱使恶灵",
          "en": "Exorcism",
          "icon": "assets/r20_55/death_prophet_exorcism.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=43",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Unleashes evil spirits to drain the life of nearby enemy units and structures. Spirits need to return back to Death Prophet in order to attack again. At the end of the spell's duration, Death Prophet is healed in proportion to the damage dealt. Deals 50% damage to buildings. Lasts %abilityduration% seconds.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 700,
              "spirits": 26,
              "spirit_speed": 525,
              "max_distance": 2000,
              "give_up_distance": 1200,
              "min_damage": 68,
              "max_damage": 74,
              "heal_percent": 25,
              "average_damage": 71,
              "ghost_spawn_rate": 0.25,
              "scepter_spirit_life_duration": 0,
              "scepter_spirit_bonus_damage": 0,
              "AbilityDuration": 40,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 400,
              "AbilityCooldown": 150
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 150,
            "mana": 400,
            "range_wu": 0,
            "startup_frames": 30,
            "recovery_frames": 12,
            "params": {
              "radius": 700,
              "spirits": 26,
              "spirit_speed": 525,
              "max_distance": 2000,
              "give_up_distance": 1200,
              "min_damage": 68,
              "max_damage": 74,
              "heal_percent": 25,
              "average_damage": 71,
              "ghost_spawn_rate": 0.25,
              "scepter_spirit_life_duration": 0,
              "scepter_spirit_bonus_damage": 0,
              "AbilityDuration": 40,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 400,
              "AbilityCooldown": 150
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。26灵魂每0.25秒依次出生，各自飞出/物理命中/返回后再出击；到期按累计实际伤害25%治疗，死亡无治疗。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "exorcism"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。26灵魂每0.25秒依次出生，各自飞出/物理命中/返回后再出击；到期按累计实际伤害25%治疗，死亡无治疗。",
            "integrationRequirement": "RETURNING_ENTITIES_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "death_prophet",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5090,
        5091,
        5685,
        5093
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 5092,
          "key": "death_prophet_witchcraft",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=43",
          "description": "Death Prophet's occult knowledge deepens with experience, gaining movement speed and spell cooldown reduction.",
          "specialValues": [
            {
              "name": "movement_speed_pct",
              "values_float": [
                0.5
              ],
              "is_percentage": true,
              "heading_loc": "MOVEMENT SPEED:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "cooldown_reduction_pct",
              "values_float": [
                0
              ],
              "is_percentage": true,
              "heading_loc": "COOLDOWN REDUCTION:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        5092
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "CHARGES_LINKS_V2",
        "RETURNING_ENTITIES_V2"
      ]
    }
  },
  {
    "key": "dragon_knight",
    "definition": {
      "id": "valve_49",
      "registryNumericId": 47,
      "valveHeroId": 49,
      "packKey": "r20_55",
      "name": "龙骑士",
      "en": "Dragon Knight",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1779,
      "combatHp": 1779,
      "combatMana": 638,
      "attack": 112,
      "move_speed": 248,
      "attack_range": 90,
      "attack_interval_s": 1.0810810810810811,
      "mana_regen": 2.34500004,
      "portrait": "assets/r20_55/dragon_knight-portrait.png",
      "render": "assets/r20_55/dragon_knight-render.png",
      "arenaStats": {
        "str": 75.4,
        "agi": 48,
        "int": 46.9
      },
      "abilities": [
        {
          "id": "dragon_knight_breathe_fire",
          "valveAbilityId": 5226,
          "slot": "S1",
          "name": "火焰气息",
          "en": "Breathe Fire",
          "icon": "assets/r20_55/dragon_knight_breathe_fire.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=49",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Unleashes a breath of fire in front of Dragon Knight that burns enemies and reduces the damage their attacks deal.",
            "profile": "level18-base-no-item",
            "semantic": {
              "start_radius": 150,
              "end_radius": 250,
              "range": 750,
              "speed": 1050,
              "damage": 320,
              "reduction": 32,
              "duration": 11,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 105,
              "AbilityCooldown": 11
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 11,
            "mana": 105,
            "range_wu": 550,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "start_radius": 150,
              "end_radius": 250,
              "range": 750,
              "speed": 1050,
              "damage": 320,
              "reduction": 32,
              "duration": 11,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 105,
              "AbilityCooldown": 11
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。火焰命中削弱总攻击32%；省略贯穿碰撞。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "attackReduction": {
                    "div": [
                      "reduction",
                      100
                    ]
                  }
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。火焰命中削弱总攻击32%；省略贯穿碰撞。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "dragon_knight_dragon_tail",
          "valveAbilityId": 5227,
          "slot": "S2",
          "name": "神龙摆尾",
          "en": "Dragon Tail",
          "icon": "assets/r20_55/dragon_knight_dragon_tail.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=49",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "Dragon Knight smites an enemy unit with his shield, stunning and damaging it and units close to it.",
            "profile": "level18-base-no-item",
            "semantic": {
              "stun_duration": 2.4,
              "damage": 150,
              "dragon_cast_range": 150,
              "projectile_speed": 1600,
              "aoe": 50,
              "AbilityCastRange": 150,
              "AbilityManaCost": 100,
              "AbilityCooldown": 10
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 10,
            "mana": 100,
            "range_wu": 82.5,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "stun_duration": 2.4,
              "damage": 150,
              "dragon_cast_range": 150,
              "projectile_speed": 1600,
              "aoe": 50,
              "AbilityCastRange": 150,
              "AbilityManaCost": 100,
              "AbilityCooldown": 10
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。近战盾击150魔伤及晕，龙形额外射程另待变形扩展。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "duration": "stun_duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。近战盾击150魔伤及晕，龙形额外射程另待变形扩展。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "dragon_knight_wyrms_wrath",
          "valveAbilityId": 1752,
          "slot": "S3",
          "name": "飞龙之怒",
          "en": "Wyrm's Wrath",
          "icon": "assets/r20_55/dragon_knight_wyrms_wrath.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=49",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "The life blood of the Dragon improves Dragon Knight's abilities and items to have increased AoE and causes his attacks to deal additional magic damage to enemy units.",
            "profile": "level18-base-no-item",
            "semantic": {
              "magic_damage": 40,
              "bonus_aoe": 120
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "magic_damage": 40,
              "bonus_aoe": 120
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。每次命中追加40魔伤，破被动停止；额外120范围需核心几何适配，当前省略。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。每次命中追加40魔伤，破被动停止；额外120范围需核心几何适配，当前省略。",
            "attack": {
              "ops": [
                {
                  "op": "damage",
                  "amount": "magic_damage",
                  "type": "magical"
                }
              ]
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "dragon_knight_elder_dragon_form",
          "valveAbilityId": 5229,
          "slot": "S4",
          "name": "古龙形态",
          "en": "Elder Dragon Form",
          "icon": "assets/r20_55/dragon_knight_elder_dragon_form.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=49",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Dragon Knight assumes the form of the Elder Dragon, increasing the range of his abilities, gaining bonus movement speed, and a ranged attack with various properties.  The Dragon evolves per level. The bonuses are cumulative. <br><br>Level 1 <font color=\"#9acd32\">Green</font>: Grants a corrosive damage over time that can also damage buildings.<br><br>Level 2 <font color=\"#FF0000\">Red</font>: Grants splash damage to the dragon's attacks.<br><br>Level 3 <font color=\"#87ceeb\">Blue</font>: Grants a debuff immunity piercing movement and attack frost slow on attack.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 60,
              "bonus_movement_speed": 35,
              "bonus_attack_range": 350,
              "bonus_ability_cast_range": 350,
              "model_scale": 20,
              "corrosive_duration": 3,
              "corrosive_damage_per_second": 25,
              "ranged_splash_damage_pct": 75,
              "ranged_splash_radius": 275,
              "health_bar_offset": 300,
              "magic_resistance": 0,
              "flying_movement": 0,
              "frost_duration": 3,
              "frost_bonus_movement_speed": 30,
              "frost_bonus_attack_speed": 50,
              "scepter_bonus_levels": 1,
              "AbilityManaCost": 50,
              "AbilityCooldown": 100
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 100,
            "mana": 50,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "duration": 60,
              "bonus_movement_speed": 35,
              "bonus_attack_range": 350,
              "bonus_ability_cast_range": 350,
              "model_scale": 20,
              "corrosive_duration": 3,
              "corrosive_damage_per_second": 25,
              "ranged_splash_damage_pct": 75,
              "ranged_splash_radius": 275,
              "health_bar_offset": 300,
              "magic_resistance": 0,
              "flying_movement": 0,
              "frost_duration": 3,
              "frost_bonus_movement_speed": 30,
              "frost_bonus_attack_speed": 50,
              "scepter_bonus_levels": 1,
              "AbilityManaCost": 50,
              "AbilityCooldown": 100
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。60秒增攻击/施法距离与移动速度，普攻击中施加3秒25DPS腐蚀和穿弱免疫冰冻双慢；省略无第二目标的溅射，外形由渲染器接线。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "dragon"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。60秒增攻击/施法距离与移动速度，普攻击中施加3秒25DPS腐蚀和穿弱免疫冰冻双慢；省略无第二目标的溅射，外形由渲染器接线。",
            "integrationRequirement": "TEMPORARY_ATTACK_PROFILE_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "dragon_knight",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5226,
        5227,
        1752,
        5229
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 5228,
          "key": "dragon_knight_dragon_blood",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=49",
          "description": "The life blood of the Dragon improves Dragon Knight's health regeneration and armor.  <br><br>Regen and armor are increased by %regen_and_armor_multiplier_during_dragon_form%%% during Elder Dragon Form.",
          "specialValues": [
            {
              "name": "health_regen",
              "values_float": [
                2
              ],
              "is_percentage": false,
              "heading_loc": "BONUS HP REGEN:",
              "bonuses": [
                {
                  "name": "special_bonus_unique_dragon_knight",
                  "value": 12,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "armor",
              "values_float": [
                2
              ],
              "is_percentage": false,
              "heading_loc": "BONUS ARMOR:",
              "bonuses": [
                {
                  "name": "special_bonus_unique_dragon_knight",
                  "value": 12,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "regen_and_armor_multiplier_during_dragon_form",
              "values_float": [
                50
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        660,
        5228
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "TEMPORARY_ATTACK_PROFILE_V2"
      ]
    }
  },
  {
    "key": "enigma",
    "definition": {
      "id": "valve_33",
      "registryNumericId": 34,
      "valveHeroId": 33,
      "packKey": "r20_55",
      "name": "谜团",
      "en": "Enigma",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1517,
      "combatHp": 1517,
      "combatMana": 1037,
      "attack": 106,
      "move_speed": 224,
      "attack_range": 275,
      "attack_interval_s": 1.297709923664122,
      "mana_regen": 4.510000000000001,
      "portrait": "assets/r20_55/enigma-portrait.png",
      "render": "assets/r20_55/enigma-render.png",
      "arenaStats": {
        "str": 63.5,
        "agi": 31,
        "int": 80.2
      },
      "abilities": [
        {
          "id": "enigma_malefice",
          "valveAbilityId": 5146,
          "slot": "S1",
          "name": "憎恶",
          "en": "Malefice",
          "icon": "assets/r20_55/enigma_malefice.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=33",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Focuses Enigma's power on a target, causing it to take damage and become repeatedly stunned for multiple instances.  An instance strikes every %tick_rate% seconds.",
            "profile": "level18-base-no-item",
            "semantic": {
              "tick_rate": 2,
              "stun_duration": 0.9,
              "shard_bonus_stun_duration_tooltip": 0.3,
              "damage": 100,
              "stun_instances": 3,
              "eidolon_spawns_per_tick": 0,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 130,
              "AbilityCooldown": 14
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 14,
            "mana": 130,
            "range_wu": 330,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "tick_rate": 2,
              "stun_duration": 0.9,
              "shard_bonus_stun_duration_tooltip": 0.3,
              "damage": 100,
              "stun_instances": 3,
              "eidolon_spawns_per_tick": 0,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 130,
              "AbilityCooldown": 14
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。初次及后续两次，共三次伤害和短晕；驱散中断后续。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "duration": "stun_duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong"
              },
              {
                "op": "status",
                "duration": {
                  "mul": [
                    "tick_rate",
                    2
                  ]
                },
                "values": {},
                "tick": {
                  "interval": "tick_rate",
                  "ops": [
                    {
                      "op": "damage",
                      "amount": "damage"
                    },
                    {
                      "op": "status",
                      "duration": "stun_duration",
                      "values": {
                        "stun": true
                      },
                      "dispel": "strong"
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。初次及后续两次，共三次伤害和短晕；驱散中断后续。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "enigma_demonic_conversion",
          "valveAbilityId": 5147,
          "slot": "S2",
          "name": "恶魔召唤",
          "en": "Demonic Summoning",
          "icon": "assets/r20_55/enigma_demonic_conversion.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=33",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Summons three fragments of Enigma himself at the cost of health.  The eidolons health is increased by %current_health_pct%%% of Enigma's current health. These eidolons are all under Enigma's control, and repeated successful attacks cause them to multiply.  When this happens, the eidolons have their health restored.",
            "profile": "level18-base-no-item",
            "semantic": {
              "spawn_count": 3,
              "split_attack_count": 6,
              "eidelon_max_health": 240,
              "life_extension": 2,
              "eidelon_base_damage": 52,
              "eidolon_damage_spread": 4,
              "eidelon_base_movespeed": 370,
              "creep_max_level": 4,
              "eidolon_magic_resist": 60,
              "eidolon_attack_range": 500,
              "allied_damage_pct": 45,
              "self_modelscale": -40,
              "spawn_offset": 100,
              "current_health_pct": 3,
              "eidolon_xp_bounty": 10,
              "eidolon_gold_bounty_min": 17,
              "eidolon_gold_bounty_max": 20,
              "non_splitting_bounty_reduction": 50,
              "damage_threshold": 375,
              "damage_reset_interval": 7,
              "AbilityCastRange": 400,
              "AbilityDuration": 40,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 100,
              "AbilityCooldown": 30,
              "AbilityHealthCost": 150
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 30,
            "mana": 100,
            "range_wu": 220.00000000000003,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "spawn_count": 3,
              "split_attack_count": 6,
              "eidelon_max_health": 240,
              "life_extension": 2,
              "eidelon_base_damage": 52,
              "eidolon_damage_spread": 4,
              "eidelon_base_movespeed": 370,
              "creep_max_level": 4,
              "eidolon_magic_resist": 60,
              "eidolon_attack_range": 500,
              "allied_damage_pct": 45,
              "self_modelscale": -40,
              "spawn_offset": 100,
              "current_health_pct": 3,
              "eidolon_xp_bounty": 10,
              "eidolon_gold_bounty_min": 17,
              "eidolon_gold_bounty_max": 20,
              "non_splitting_bounty_reduction": 50,
              "damage_threshold": 375,
              "damage_reset_interval": 7,
              "AbilityCastRange": 400,
              "AbilityDuration": 40,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 100,
              "AbilityCooldown": 30,
              "AbilityHealthCost": 150
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。非致死消耗150生命，生成3个自主谜团；生命加当前生命3%，6次命中分裂并回满。竞技总量上限12、子代不再分裂、固定1.5秒攻击间隔。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "conversion"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。非致死消耗150生命，生成3个自主谜团；生命加当前生命3%，6次命中分裂并回满。竞技总量上限12、子代不再分裂、固定1.5秒攻击间隔。",
            "integrationRequirement": "AUTONOMOUS_UNITS_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "enigma_midnight_pulse",
          "valveAbilityId": 5148,
          "slot": "S3",
          "name": "午夜凋零",
          "en": "Midnight Pulse",
          "icon": "assets/r20_55/enigma_midnight_pulse.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=33",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Steeps an area in dark resonance, dealing %base_damage% + a percentage of the enemies current HP as damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 600,
              "base_damage": 20,
              "damage_percent": 10,
              "duration": 12,
              "tick_rate": 0.5,
              "AbilityCastRange": 700,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 140,
              "AbilityCooldown": 25
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 25,
            "mana": 140,
            "range_wu": 385.00000000000006,
            "startup_frames": 6,
            "recovery_frames": 12,
            "params": {
              "radius": 600,
              "base_damage": 20,
              "damage_percent": 10,
              "duration": 12,
              "tick_rate": 0.5,
              "AbilityCastRange": 700,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 140,
              "AbilityCooldown": 25
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。按每tick当前生命更新伤害；不预计算整段伤害。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "area",
                "duration": "duration",
                "interval": "tick_rate",
                "radius": "radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": {
                      "mul": [
                        {
                          "add": [
                            "base_damage",
                            {
                              "mul": [
                                {
                                  "stat": "hp",
                                  "who": "target"
                                },
                                {
                                  "div": [
                                    "damage_percent",
                                    100
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        "tick_rate"
                      ]
                    },
                    "type": "magical"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。按每tick当前生命更新伤害；不预计算整段伤害。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "enigma_black_hole",
          "valveAbilityId": 5149,
          "slot": "S4",
          "name": "黑洞",
          "en": "Black Hole",
          "icon": "assets/r20_55/enigma_black_hole.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=33",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 4,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "CHANNELED - Summons a vortex that sucks in nearby enemy units.  Enemies affected by Black Hole cannot move, attack, or cast spells.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage": 200,
              "radius": 420,
              "pull_speed": 30,
              "tick_rate": 0.1,
              "duration": 4,
              "vision_radius": 800,
              "pull_rotate_speed": 0.25,
              "animation_rate": 0.2,
              "scepter_pct_damage": 0,
              "scepter_radius": 0,
              "scepter_drag_speed": 0,
              "scepter_pull_rotate_speed": 0,
              "AbilityCastRange": 275,
              "AbilityChannelTime": 4,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 500,
              "AbilityCooldown": 160
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 160,
            "mana": 500,
            "range_wu": 151.25,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "damage": 200,
              "radius": 420,
              "pull_speed": 30,
              "tick_rate": 0.1,
              "duration": 4,
              "vision_radius": 800,
              "pull_rotate_speed": 0.25,
              "animation_rate": 0.2,
              "scepter_pct_damage": 0,
              "scepter_radius": 0,
              "scepter_drag_speed": 0,
              "scepter_pull_rotate_speed": 0,
              "AbilityCastRange": 275,
              "AbilityChannelTime": 4,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 500,
              "AbilityCooldown": 160
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定位置黑洞持续纯粹伤害和控制；省略旋转吸入，核心须连续控制保护。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "area",
                "duration": "duration",
                "interval": "tick_rate",
                "radius": "radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": {
                      "mul": [
                        "damage",
                        "tick_rate"
                      ]
                    },
                    "type": "pure"
                  },
                  {
                    "op": "status",
                    "duration": 0.1,
                    "values": {
                      "stun": true
                    },
                    "dispel": "none",
                    "pierces": true
                  }
                ],
                "channel": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定位置黑洞持续纯粹伤害和控制；省略旋转吸入，核心须连续控制保护。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "enigma",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5146,
        5147,
        5148,
        5149
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1261,
          "key": "enigma_event_horizon",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=33",
          "description": "Units in a %radius% radius moving away from Enigma have a movespeed penalty.",
          "specialValues": [
            {
              "name": "radius",
              "values_float": [
                600
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_enigma_5",
                  "value": 100,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "speed_bonus",
              "values_float": [
                5
              ],
              "is_percentage": true,
              "heading_loc": "MOVEMENT SLOW:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "vision_cone",
              "values_float": [
                0.08715
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1261
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "AUTONOMOUS_UNITS_V2"
      ]
    }
  },
  {
    "key": "faceless_void",
    "definition": {
      "id": "valve_41",
      "registryNumericId": 40,
      "valveHeroId": 41,
      "packKey": "r20_55",
      "name": "虚空假面",
      "en": "Faceless Void",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1532,
      "combatHp": 1532,
      "combatMana": 561,
      "attack": 117,
      "move_speed": 240,
      "attack_range": 90,
      "attack_interval_s": 0.9439200444197668,
      "mana_regen": 2.0250000000000004,
      "portrait": "assets/r20_55/faceless_void-portrait.png",
      "render": "assets/r20_55/faceless_void-render.png",
      "arenaStats": {
        "str": 64.2,
        "agi": 80.1,
        "int": 40.5
      },
      "abilities": [
        {
          "id": "faceless_void_time_walk",
          "valveAbilityId": 5182,
          "slot": "S1",
          "name": "时间漫游",
          "en": "Time Walk",
          "icon": "assets/r20_55/faceless_void_time_walk.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=41",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 1,
            "dispelCode": 0,
            "description": "Rushes to a target location while backtracking any damage taken the last %backtrack_duration% seconds.",
            "profile": "level18-base-no-item",
            "semantic": {
              "speed": 3000,
              "range": 800,
              "backtrack_duration": 2,
              "dodge_chance_pct": 100,
              "radius": 0,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 40,
              "AbilityCooldown": 6
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 6,
            "mana": 40,
            "range_wu": 440.00000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "speed": 3000,
              "range": 800,
              "backtrack_duration": 2,
              "dodge_chance_pct": 100,
              "radius": 0,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 40,
              "AbilityCooldown": 6
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。恢复过去2秒实际HP损失并位移；历史消费一次，自损不计，不从治疗制造可回溯损伤。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "backtrack"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。恢复过去2秒实际HP损失并位移；历史消费一次，自损不计，不从治疗制造可回溯损伤。",
            "integrationRequirement": "ACTUAL_DAMAGE_HISTORY_V2",
            "rangeParam": "range"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "faceless_void_time_dilation",
          "valveAbilityId": 5691,
          "slot": "S2",
          "name": "时间膨胀",
          "en": "Time Dilation",
          "icon": "assets/r20_55/faceless_void_time_dilation.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=41",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Faceless Void envelops nearby enemies with time dilating fields to slow cooldown progression of their abilities. Each enveloped enemy gains one Time Dilation stack when applied, and one stack per ability they have on cooldown. Each stack deals damage per second and slows movement and attack speed. The duration is paused while affected by Chronosphere.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 700,
              "duration": 10,
              "slow": 7,
              "attack_slow_tooltip_only": 7,
              "cooldown_percentage": 60,
              "damage_per_stack": 10,
              "self_movespeed_tooltip": 0,
              "self_attackspeed_tooltip": 0,
              "self_buff": 0,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 90,
              "AbilityCooldown": 16
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 16,
            "mana": 90,
            "range_wu": 0,
            "startup_frames": 6,
            "recovery_frames": 12,
            "params": {
              "radius": 700,
              "duration": 10,
              "slow": 7,
              "attack_slow_tooltip_only": 7,
              "cooldown_percentage": 60,
              "damage_per_stack": 10,
              "self_movespeed_tooltip": 0,
              "self_attackspeed_tooltip": 0,
              "self_buff": 0,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 90,
              "AbilityCooldown": 16
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。范围内按初始1+处于冷却的技能数计层，每层每秒10伤害及7%双慢；实际技能冷却推进乘0.4。竞技改编不暂停DOT时长于时间球中。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "dilation"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。范围内按初始1+处于冷却的技能数计层，每层每秒10伤害及7%双慢；实际技能冷却推进乘0.4。竞技改编不暂停DOT时长于时间球中。",
            "integrationRequirement": "COOLDOWN_RATE_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "faceless_void_time_lock",
          "valveAbilityId": 5184,
          "slot": "S3",
          "name": "时间锁定",
          "en": "Time Lock",
          "icon": "assets/r20_55/faceless_void_time_lock.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=41",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 3,
            "dispelCode": 1,
            "description": "Adds the chance for an attack to lock an enemy unit in time while attacking it a second time.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 0.5,
              "duration_creep": 0.5,
              "chance_pct": 24,
              "bonus_damage": 30,
              "delay": 0.4
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "duration": 0.5,
              "duration_creep": 0.5,
              "chance_pct": 24,
              "bonus_damage": 30,
              "delay": 0.4
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。命中24%概率，延迟0.4秒追加攻击力+30及0.5秒晕；不再递归触发自身。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。命中24%概率，延迟0.4秒追加攻击力+30及0.5秒晕；不再递归触发自身。",
            "attack": {
              "chance": "chance_pct",
              "ops": [
                {
                  "op": "delay",
                  "delay": "delay",
                  "ops": [
                    {
                      "op": "damage",
                      "amount": {
                        "add": [
                          {
                            "stat": "attack"
                          },
                          "bonus_damage"
                        ]
                      },
                      "type": "physical"
                    },
                    {
                      "op": "status",
                      "duration": "duration",
                      "values": {
                        "stun": true
                      },
                      "dispel": "strong",
                      "pierces": true
                    }
                  ]
                }
              ]
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "faceless_void_chronosphere",
          "valveAbilityId": 5185,
          "slot": "S4",
          "name": "时间结界",
          "en": "Chronosphere",
          "icon": "assets/r20_55/faceless_void_chronosphere.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=41",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Creates a blister in spacetime, trapping all units caught in its sphere of influence and causes you to move very quickly inside it. Only Faceless Void and any units he controls are unaffected. Invisible enemies in the sphere will be revealed.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 500,
              "duration": 4.75,
              "vision_radius": 475,
              "AbilityCastRange": 500,
              "AbilityCastPoint": 0.35,
              "AbilityManaCost": 275,
              "AbilityCooldown": 135
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 135,
            "mana": 275,
            "range_wu": 275,
            "startup_frames": 21,
            "recovery_frames": 12,
            "params": {
              "radius": 500,
              "duration": 4.75,
              "vision_radius": 475,
              "AbilityCastRange": 500,
              "AbilityCastPoint": 0.35,
              "AbilityManaCost": 275,
              "AbilityCooldown": 135
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定时间球只限制唯一敌英雄；施法者不受限；无召唤单位时停。持续控制须核心保护裁决。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "area",
                "duration": "duration",
                "interval": 0.1,
                "radius": "radius",
                "ops": [
                  {
                    "op": "status",
                    "duration": 0.15,
                    "values": {
                      "stun": true,
                      "revealed": true
                    },
                    "dispel": "none",
                    "pierces": true
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定时间球只限制唯一敌英雄；施法者不受限；无召唤单位时停。持续控制须核心保护裁决。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "faceless_void",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5182,
        5691,
        5184,
        5185
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1280,
          "key": "faceless_void_distortion_field",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=41",
          "description": "Enemy Attack Projectiles targetting Faceless Void or allied heroes within a %friendly_hero_distance% radius of him get slowed by %attack_projectile_slow%%%, when they get  within %slow_distance_max% distance of their target.",
          "specialValues": [
            {
              "name": "attack_projectile_slow",
              "values_float": [
                40
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "slow_distance_max",
              "values_float": [
                500
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "friendly_hero_distance",
              "values_float": [
                1200
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        8030,
        1280
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "ACTUAL_DAMAGE_HISTORY_V2",
        "COOLDOWN_RATE_V2"
      ]
    }
  },
  {
    "key": "furion",
    "definition": {
      "id": "valve_53",
      "registryNumericId": 51,
      "valveHeroId": 53,
      "packKey": "r20_55",
      "name": "自然先知",
      "en": "Nature's Prophet",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1510,
      "combatHp": 1510,
      "combatMana": 1053,
      "attack": 127,
      "move_speed": 236,
      "attack_range": 330,
      "attack_interval_s": 0.9481668773704172,
      "mana_regen": 4.075,
      "portrait": "assets/r20_55/furion-portrait.png",
      "render": "assets/r20_55/furion-render.png",
      "arenaStats": {
        "str": 63.2,
        "agi": 58.2,
        "int": 81.5
      },
      "abilities": [
        {
          "id": "furion_sprout",
          "valveAbilityId": 5245,
          "slot": "S1",
          "name": "发芽",
          "en": "Sprout",
          "icon": "assets/r20_55/furion_sprout.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=53",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Sprouts a ring of trees around a unit, damaging and trapping it in place and providing vision in a %vision_range% radius.",
            "profile": "level18-base-no-item",
            "semantic": {
              "vision_range": 400,
              "duration": 4,
              "sprout_damage": 250,
              "sprout_damage_radius": 275,
              "AbilityCastRange": 850,
              "AbilityCastPoint": 0.35,
              "AbilityManaCost": 100,
              "AbilityCooldown": 8
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 8,
            "mana": 100,
            "range_wu": 467.50000000000006,
            "startup_frames": 21,
            "recovery_frames": 12,
            "params": {
              "vision_range": 400,
              "duration": 4,
              "sprout_damage": 250,
              "sprout_damage_radius": 275,
              "AbilityCastRange": 850,
              "AbilityCastPoint": 0.35,
              "AbilityManaCost": 100,
              "AbilityCooldown": 8
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。目标左右两棵2次攻击可摧毁树障碍，4秒挡住横向穿越并在起始造成250区域伤害；跳跃/传送的绕行由核心碰撞层接入。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "sprout"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。目标左右两棵2次攻击可摧毁树障碍，4秒挡住横向穿越并在起始造成250区域伤害；跳跃/传送的绕行由核心碰撞层接入。",
            "integrationRequirement": "DESTRUCTIBLE_BOUNDARIES_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "furion_teleportation",
          "valveAbilityId": 5246,
          "slot": "S2",
          "name": "传送",
          "en": "Teleportation",
          "icon": "assets/r20_55/furion_teleportation.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=53",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Teleports to any point on the map. Gains a barrier after arriving to its destination.",
            "profile": "level18-base-no-item",
            "semantic": {
              "barrier": 250,
              "buff_duration": 15,
              "AbilityCastPoint": 3,
              "AbilityManaCost": 80,
              "AbilityCooldown": 20
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 20,
            "mana": 80,
            "range_wu": 0,
            "startup_frames": 180,
            "recovery_frames": 12,
            "params": {
              "barrier": 250,
              "buff_duration": 15,
              "AbilityCastPoint": 3,
              "AbilityManaCost": 80,
              "AbilityCooldown": 20
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。3秒可中断起手后移至竞技场指定点并获250屏障。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "move",
                "to": "self",
                "mode": "aim"
              },
              {
                "op": "status",
                "to": "self",
                "duration": "buff_duration",
                "values": {
                  "shield": "barrier"
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。3秒可中断起手后移至竞技场指定点并获250屏障。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "furion_force_of_nature",
          "valveAbilityId": 5247,
          "slot": "S3",
          "name": "自然的呼唤",
          "en": "Nature's Call",
          "icon": "assets/r20_55/furion_force_of_nature.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=53",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Converts an area of trees into Treants under the command of Nature's Prophet.",
            "profile": "level18-base-no-item",
            "semantic": {
              "area_of_effect": 375,
              "max_treants": 5,
              "treant_duration": 50,
              "treant_health": 450,
              "treant_damage": 43,
              "treant_bonus_hero_damage": 18,
              "treant_movespeed": 345,
              "treant_vision_day": 500,
              "treant_vision_night": 500,
              "treant_gold_bounty_min": 18,
              "treant_gold_bounty_max": 24,
              "treant_xp_bounty": 30,
              "treewalking": 1,
              "AbilityCastRange": 750,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 100,
              "AbilityCooldown": 30
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 30,
            "mana": 100,
            "range_wu": 412.50000000000006,
            "startup_frames": 30,
            "recovery_frames": 12,
            "params": {
              "area_of_effect": 375,
              "max_treants": 5,
              "treant_duration": 50,
              "treant_health": 450,
              "treant_damage": 43,
              "treant_bonus_hero_damage": 18,
              "treant_movespeed": 345,
              "treant_vision_day": 500,
              "treant_vision_night": 500,
              "treant_gold_bounty_min": 18,
              "treant_gold_bounty_max": 24,
              "treant_xp_bounty": 30,
              "treewalking": 1,
              "AbilityCastRange": 750,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 100,
              "AbilityCooldown": 30
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。无需环境树，直接5自主树人；英雄伤害61，1.5秒间隔/150近战为竞技值。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "summon",
                "count": "max_treants",
                "hp": "treant_health",
                "damage": {
                  "add": [
                    "treant_damage",
                    "treant_bonus_hero_damage"
                  ]
                },
                "duration": "treant_duration",
                "interval": 1.5,
                "range": 150,
                "speed": "treant_movespeed"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。无需环境树，直接5自主树人；英雄伤害61，1.5秒间隔/150近战为竞技值。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "furion_wrath_of_nature",
          "valveAbilityId": 5248,
          "slot": "S4",
          "name": "自然之怒",
          "en": "Wrath of Nature",
          "icon": "assets/r20_55/furion_wrath_of_nature.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=53",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Damaging energy bounces around the map, striking enemies that are in vision starting with those closest to the cast point. Each enemy hit beyond the first adds damage, up to the maximum after %max_targets% are hit.",
            "profile": "level18-base-no-item",
            "semantic": {
              "max_targets": 16,
              "damage": 180,
              "damage_percent_add": 10,
              "jump_delay": 0.15,
              "scepter_min_entangle_duration": 0,
              "scepter_max_entangle_duration": 0,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 190,
              "AbilityCooldown": 85
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 85,
            "mana": 190,
            "range_wu": 0,
            "startup_frames": 30,
            "recovery_frames": 12,
            "params": {
              "max_targets": 16,
              "damage": 180,
              "damage_percent_add": 10,
              "jump_delay": 0.15,
              "scepter_min_entangle_duration": 0,
              "scepter_max_entangle_duration": 0,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 190,
              "AbilityCooldown": 85
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。全场唯一可见敌人首跳180魔伤，无第二单位不增加跳伤。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。全场唯一可见敌人首跳180魔伤，无第二单位不增加跳伤。",
            "arenaGlobal": true
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "furion",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5245,
        5246,
        5247,
        5248
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1298,
          "key": "furion_spirit_of_the_forest",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=53",
          "description": "Nature's Prophet gains %damage_per_tree_pct%%% bonus damage for each nearby tree. Treants also provide this bonus with multiplied values regardless of proximity. Treants also possess this ability.",
          "specialValues": [
            {
              "name": "damage_per_tree_pct",
              "values_float": [
                2
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "radius_base",
              "values_float": [
                300
              ],
              "is_percentage": false,
              "heading_loc": "TREE RADIUS:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "multiplier",
              "values_float": [
                2
              ],
              "is_percentage": false,
              "heading_loc": "TREANT MULTIPLIER:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        997,
        1298
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "DESTRUCTIBLE_BOUNDARIES_V2"
      ]
    }
  },
  {
    "key": "kunkka",
    "definition": {
      "id": "valve_23",
      "registryNumericId": 29,
      "valveHeroId": 23,
      "packKey": "r20_55",
      "name": "昆卡",
      "en": "Kunkka",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1994,
      "combatHp": 1994,
      "combatMana": 658,
      "attack": 118,
      "move_speed": 252,
      "attack_range": 90,
      "attack_interval_s": 1.2039660056657224,
      "mana_regen": 2.4300000400000004,
      "portrait": "assets/r20_55/kunkka-portrait.png",
      "render": "assets/r20_55/kunkka-render.png",
      "arenaStats": {
        "str": 85.2,
        "agi": 41.2,
        "int": 48.6
      },
      "abilities": [
        {
          "id": "kunkka_torrent",
          "valveAbilityId": 5031,
          "slot": "S1",
          "name": "洪流",
          "en": "Torrent",
          "icon": "assets/r20_55/kunkka_torrent.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=23",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Summons a rising torrent that, after a short delay, hurls enemy units into the sky, stunning, dealing damage and slowing movement speed.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 250,
              "movespeed_bonus": -40,
              "slow_duration": 4,
              "stun_duration": 1.4,
              "delay": 1.6,
              "torrent_damage": 320,
              "damage_tick_interval": 0.2,
              "AbilityCastRange": 1300,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 90,
              "AbilityCooldown": 10
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 10,
            "mana": 90,
            "range_wu": 715.0000000000001,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "radius": 250,
              "movespeed_bonus": -40,
              "slow_duration": 4,
              "stun_duration": 1.4,
              "delay": 1.6,
              "torrent_damage": 320,
              "damage_tick_interval": 0.2,
              "AbilityCastRange": 1300,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 90,
              "AbilityCooldown": 10
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定落点延迟喷水，伤害合并到命中时；省略垂直抛飞。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "delay",
                "delay": "delay",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "torrent_damage",
                    "radius": "radius",
                    "center": "aim"
                  },
                  {
                    "op": "status",
                    "duration": "stun_duration",
                    "values": {
                      "stun": true
                    },
                    "dispel": "strong",
                    "radius": "radius",
                    "center": "aim"
                  },
                  {
                    "op": "status",
                    "duration": "slow_duration",
                    "values": {
                      "moveSlow": 0.4
                    },
                    "radius": "radius",
                    "center": "aim"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定落点延迟喷水，伤害合并到命中时；省略垂直抛飞。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "kunkka_tidebringer",
          "valveAbilityId": 5032,
          "slot": "S2",
          "name": "潮汐使者",
          "en": "Tidebringer",
          "icon": "assets/r20_55/kunkka_tidebringer.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=23",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Kunkka's legendary sword grants increased damage and cleaves a large area of effect in front of him for a single strike.",
            "profile": "level18-base-no-item",
            "semantic": {
              "cleave_starting_width": 150,
              "cleave_ending_width": 650,
              "cleave_distance": 1025,
              "damage_bonus": 140,
              "cleave_damage": 150,
              "AbilityCastRange": 150,
              "AbilityCooldown": 4
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 4,
            "mana": 0,
            "range_wu": 82.5,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "cleave_starting_width": 150,
              "cleave_ending_width": 650,
              "cleave_distance": 1025,
              "damage_bonus": 140,
              "cleave_damage": 150,
              "AbilityCastRange": 150,
              "AbilityCooldown": 4
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。点击S2准备下一次普攻追加140伤害；单对手省略分裂副目标。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "toggle",
                "values": {
                  "armed": true
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。点击S2准备下一次普攻追加140伤害；单对手省略分裂副目标。",
            "attack": {
              "requiresToggle": true,
              "consumeToggle": true,
              "ops": [
                {
                  "op": "damage",
                  "amount": "damage_bonus",
                  "type": "physical"
                }
              ]
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "kunkka_x_marks_the_spot",
          "valveAbilityId": 5033,
          "slot": "S3",
          "name": "X标记",
          "en": "X Marks the Spot",
          "icon": "assets/r20_55/kunkka_x_marks_the_spot.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=23",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Targets a friendly or enemy Hero, marks their position with an X, and returns them to it after several seconds.  Kunkka can trigger the return at any time during the duration. Lasts twice as long on allied heroes.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 3,
              "allied_duration": 6,
              "fow_range": 400,
              "fow_duration": 5.94,
              "movespeed_bonus": 15,
              "ghostship_absorb": 35,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 50,
              "AbilityCooldown": 12
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 12,
            "mana": 50,
            "range_wu": 550,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "duration": 3,
              "allied_duration": 6,
              "fow_range": 400,
              "fow_duration": 5.94,
              "movespeed_bonus": 15,
              "ghostship_absorb": 35,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 50,
              "AbilityCooldown": 12
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。敌人位置3秒后自动返回；不提供额外返回槽位。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "mark",
                "duration": "duration"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。敌人位置3秒后自动返回；不提供额外返回槽位。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "kunkka_ghostship",
          "valveAbilityId": 5035,
          "slot": "S4",
          "name": "幽灵船",
          "en": "Ghostship",
          "icon": "assets/r20_55/kunkka_ghostship.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=23",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Summons a ghostly ship that sails through the battle before smashing apart, damaging and stunning all enemies caught near the wreckage.<br><br>Allied heroes touched by the Ghostship are given a %rum_factor%x strong swig of The Admiral's Rum.",
            "profile": "level18-base-no-item",
            "semantic": {
              "tooltip_delay": 3.1,
              "ghostship_distance": 2000,
              "ghostship_width": 450,
              "stun_duration": 1.2,
              "ghostship_speed": 650,
              "rum_factor": 2,
              "fleet_interval": 0,
              "fleet_count": 0,
              "fire_cannons": 0,
              "cannon_ball_damage_pct": 0,
              "cannon_ball_distance": 0,
              "cannon_ball_speed": 0,
              "cannon_count": 0,
              "cannon_ball_radius": 0,
              "num_cannon_volleys": 3,
              "cannon_fire_interval": 0,
              "base_cannon_rotation": 20,
              "rotation_per_cannon": 12,
              "initial_cannon_offset": -150,
              "distance_between_cannons": 75,
              "AbilityDamage": 600,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 225,
              "AbilityCooldown": 70
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 70,
            "mana": 225,
            "range_wu": 550,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "tooltip_delay": 3.1,
              "ghostship_distance": 2000,
              "ghostship_width": 450,
              "stun_duration": 1.2,
              "ghostship_speed": 650,
              "rum_factor": 2,
              "fleet_interval": 0,
              "fleet_count": 0,
              "fire_cannons": 0,
              "cannon_ball_damage_pct": 0,
              "cannon_ball_distance": 0,
              "cannon_ball_speed": 0,
              "cannon_count": 0,
              "cannon_ball_radius": 0,
              "num_cannon_volleys": 3,
              "cannon_fire_interval": 0,
              "base_cannon_rotation": 20,
              "rotation_per_cannon": 12,
              "initial_cannon_offset": -150,
              "distance_between_cannons": 75,
              "AbilityDamage": 600,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 225,
              "AbilityCooldown": 70
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。3.1秒后固定点船撞。竞技朗姆酒：依据先天18%与rum_factor2取36%延后伤害，5秒保护后5秒非致死偿还；自身加速15.5%。这是显式跨技能配方改编，不启用先天阈值自动触发。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "ghostship"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。3.1秒后固定点船撞。竞技朗姆酒：依据先天18%与rum_factor2取36%延后伤害，5秒保护后5秒非致死偿还；自身加速15.5%。这是显式跨技能配方改编，不启用先天阈值自动触发。",
            "integrationRequirement": "POST_MITIGATION_DEBT_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "kunkka",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5031,
        5032,
        5033,
        5035
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1452,
          "key": "kunkka_admirals_rum",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=23",
          "description": "Damage from enemy heroes, buildings, or Roshan that would reduce Kunkka below %damage_threshold%%% threshold causes him to douse himself with The Admiral's Rum, receiving bonus movement speed and a delayed reaction to %ghostship_absorb%%% of incoming damage for %buff_duration%s.",
          "specialValues": [
            {
              "name": "damage_threshold",
              "values_float": [
                65
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "ghostship_absorb",
              "values_float": [
                18
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_kunkka_rum",
                  "value": 8,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "buff_duration",
              "values_float": [
                5
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_kunkka_rum_duration",
                  "value": 1,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "movespeed_bonus",
              "values_float": [
                7.75
              ],
              "is_percentage": true,
              "heading_loc": "BONUS MOVESPEED:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "AbilityCooldown",
              "values_float": [
                50.5
              ],
              "is_percentage": false,
              "heading_loc": "COOLDOWN:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1452,
        605
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "POST_MITIGATION_DEBT_V2"
      ]
    }
  },
  {
    "key": "leshrac",
    "definition": {
      "id": "valve_52",
      "registryNumericId": 50,
      "valveHeroId": 52,
      "packKey": "r20_55",
      "name": "拉席克",
      "en": "Leshrac",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1495,
      "combatHp": 1495,
      "combatMana": 1053,
      "attack": 111,
      "move_speed": 260,
      "attack_range": 316.25,
      "attack_interval_s": 1.0658307210031348,
      "mana_regen": 4.075,
      "portrait": "assets/r20_55/leshrac-portrait.png",
      "render": "assets/r20_55/leshrac-render.png",
      "arenaStats": {
        "str": 62.5,
        "agi": 59.5,
        "int": 81.5
      },
      "abilities": [
        {
          "id": "leshrac_split_earth",
          "valveAbilityId": 5241,
          "slot": "S1",
          "name": "撕裂大地",
          "en": "Split Earth",
          "icon": "assets/r20_55/leshrac_split_earth.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=52",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "Splits the earth under enemies. Deals damage and stuns for a short duration.",
            "profile": "level18-base-no-item",
            "semantic": {
              "delay": 0.35,
              "radius": 210,
              "duration": 1.7,
              "shard_radius_increase": 0,
              "shard_max_count": 0,
              "shard_secondary_delay": 0,
              "AbilityDamage": 280,
              "AbilityCastRange": 650,
              "AbilityDuration": 1.6,
              "AbilityCastPoint": 0.7,
              "AbilityManaCost": 140,
              "AbilityCooldown": 11
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 11,
            "mana": 140,
            "range_wu": 357.50000000000006,
            "startup_frames": 42,
            "recovery_frames": 12,
            "params": {
              "delay": 0.35,
              "radius": 210,
              "duration": 1.7,
              "shard_radius_increase": 0,
              "shard_max_count": 0,
              "shard_secondary_delay": 0,
              "AbilityDamage": 280,
              "AbilityCastRange": 650,
              "AbilityDuration": 1.6,
              "AbilityCastPoint": 0.7,
              "AbilityManaCost": 140,
              "AbilityCooldown": 11
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。起手后0.35秒固定落点爆发280魔伤与眩晕。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "delay",
                "delay": "delay",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "AbilityDamage",
                    "radius": "radius",
                    "center": "aim"
                  },
                  {
                    "op": "status",
                    "duration": "duration",
                    "values": {
                      "stun": true
                    },
                    "dispel": "strong",
                    "radius": "radius",
                    "center": "aim"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。起手后0.35秒固定落点爆发280魔伤与眩晕。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "leshrac_diabolic_edict",
          "valveAbilityId": 5242,
          "slot": "S2",
          "name": "恶魔敕令",
          "en": "Diabolic Edict",
          "icon": "assets/r20_55/leshrac_diabolic_edict.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=52",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 4,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Saturates the area around Leshrac with magical explosions that deal pure damage to enemy units and buildings.  The fewer units available to attack, the more damage those units will take.",
            "profile": "level18-base-no-item",
            "semantic": {
              "num_explosions": 40,
              "radius": 450,
              "affects_buildings": 1,
              "damage": 30,
              "targets": 1,
              "AbilityDuration": 8,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 180,
              "AbilityCooldown": 19
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 19,
            "mana": 180,
            "range_wu": 0,
            "startup_frames": 30,
            "recovery_frames": 12,
            "params": {
              "num_explosions": 40,
              "radius": 450,
              "affects_buildings": 1,
              "damage": 30,
              "targets": 1,
              "AbilityDuration": 8,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 180,
              "AbilityCooldown": 19
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单敌在范围内最多40次30纯粹伤害；无目标爆炸消耗，不打建筑。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "area",
                "duration": "AbilityDuration",
                "interval": {
                  "div": [
                    "AbilityDuration",
                    "num_explosions"
                  ]
                },
                "radius": "radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "damage",
                    "type": "pure"
                  }
                ],
                "follow": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单敌在范围内最多40次30纯粹伤害；无目标爆炸消耗，不打建筑。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "leshrac_lightning_storm",
          "valveAbilityId": 5243,
          "slot": "S3",
          "name": "闪电风暴",
          "en": "Lightning Storm",
          "icon": "assets/r20_55/leshrac_lightning_storm.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=52",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Summons a lightning storm that blasts the target enemy unit, then strikes any nearby enemy units. Struck enemies have their move speed slowed.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage": 240,
              "jump_count": 11,
              "radius": 450,
              "jump_delay": 0.25,
              "movespeed_slow": 75,
              "slow_duration": 1.2,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 140,
              "AbilityCooldown": 4
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 4,
            "mana": 140,
            "range_wu": 330,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "damage": 240,
              "jump_count": 11,
              "radius": 450,
              "jump_delay": 0.25,
              "movespeed_slow": 75,
              "slow_duration": 1.2,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 140,
              "AbilityCooldown": 4
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一目标240魔伤/75%慢；没有第二目标不自弹。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "duration": "slow_duration",
                "values": {
                  "moveSlow": {
                    "div": [
                      "movespeed_slow",
                      100
                    ]
                  }
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一目标240魔伤/75%慢；没有第二目标不自弹。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "leshrac_pulse_nova",
          "valveAbilityId": 5244,
          "slot": "S4",
          "name": "脉冲新星",
          "en": "Pulse Nova",
          "icon": "assets/r20_55/leshrac_pulse_nova.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=52",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Creates waves of damaging energy around Leshrac, one per second, to damage nearby enemy units. Drains Leshrac's mana with each pulse.",
            "profile": "level18-base-no-item",
            "semantic": {
              "mana_cost_per_second": 60,
              "radius": 500,
              "damage": 180,
              "AbilityManaCost": 70,
              "AbilityCooldown": 1
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 1,
            "mana": 70,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "mana_cost_per_second": 60,
              "radius": 500,
              "damage": 180,
              "AbilityManaCost": 70,
              "AbilityCooldown": 1
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。同槽开关，每秒先支付60蓝再造成180范围魔伤；不足自动关闭；关闭不收初始耗蓝。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "toggle",
                "values": {
                  "pulseToggle": true
                },
                "tick": {
                  "interval": 1,
                  "ops": [
                    {
                      "op": "upkeepPulse",
                      "cost": "mana_cost_per_second",
                      "radius": "radius",
                      "ops": [
                        {
                          "op": "damage",
                          "amount": "damage"
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。同槽开关，每秒先支付60蓝再造成180范围魔伤；不足自动关闭；关闭不收初始耗蓝。",
            "toggle": true
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "leshrac",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5241,
        5242,
        5243,
        5244
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1297,
          "key": "leshrac_defilement",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=52",
          "description": "Leshrac gains %aoe_per_int% Area of Effect Bonus per Intelligence.",
          "specialValues": [
            {
              "name": "aoe_per_int",
              "values_float": [
                0.7
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "current_aoe_bonus",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "BONUS AOE:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        539,
        1297
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "lich",
    "definition": {
      "id": "valve_31",
      "registryNumericId": 32,
      "valveHeroId": 31,
      "packKey": "r20_55",
      "name": "巫妖",
      "en": "Lich",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1345,
      "combatHp": 1345,
      "combatMana": 1105,
      "attack": 114,
      "move_speed": 232,
      "attack_range": 302.5,
      "attack_interval_s": 1.1651816312542838,
      "mana_regen": 3.28999998,
      "portrait": "assets/r20_55/lich-portrait.png",
      "render": "assets/r20_55/lich-render.png",
      "arenaStats": {
        "str": 55.7,
        "agi": 45.9,
        "int": 85.8
      },
      "abilities": [
        {
          "id": "lich_frost_nova",
          "valveAbilityId": 5134,
          "slot": "S1",
          "name": "寒霜爆发",
          "en": "Frost Blast",
          "icon": "assets/r20_55/lich_frost_nova.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=31",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Blasts the target enemy unit with damaging frost, dealing area damage and slowing movement and attack rates for %abilityduration% seconds.  The primary target receives both base and area damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 200,
              "slow_movement_speed": -25,
              "slow_attack_speed_primary": -60,
              "damage": 160,
              "aoe_damage": 200,
              "AbilityCastRange": 650,
              "AbilityDuration": 4,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 140,
              "AbilityCooldown": 7
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 7,
            "mana": 140,
            "range_wu": 357.50000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "radius": 200,
              "slow_movement_speed": -25,
              "slow_attack_speed_primary": -60,
              "damage": 160,
              "aoe_damage": 200,
              "AbilityCastRange": 650,
              "AbilityDuration": 4,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 140,
              "AbilityCooldown": 7
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一主目标承受160+200伤害及双减速。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": {
                  "add": [
                    "damage",
                    "aoe_damage"
                  ]
                }
              },
              {
                "op": "status",
                "duration": "AbilityDuration",
                "values": {
                  "moveSlow": 0.25,
                  "attackSlow": 60
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一主目标承受160+200伤害及双减速。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "lich_frost_shield",
          "valveAbilityId": 5136,
          "slot": "S2",
          "name": "冰霜魔盾",
          "en": "Frost Shield",
          "icon": "assets/r20_55/lich_frost_shield.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=31",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 5,
            "dispelCode": 2,
            "description": "Applies a magical frost shield around the target, reducing damage from attacks against it. While the shield is active, ice magic will affect nearby enemy units every %interval% seconds, dealing minor damage and slowing them.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage_reduction": 60,
              "movement_slow": 35,
              "slow_duration": 0.5,
              "damage": 60,
              "interval": 1,
              "radius": 600,
              "duration": 7,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.2,
              "AbilityChargeRestoreTime": 15,
              "AbilityManaCost": 130,
              "AbilityCooldown": 15
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 15,
            "mana": 130,
            "range_wu": 440.00000000000006,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "damage_reduction": 60,
              "movement_slow": 35,
              "slow_duration": 0.5,
              "damage": 60,
              "interval": 1,
              "radius": 600,
              "duration": 7,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.2,
              "AbilityChargeRestoreTime": 15,
              "AbilityManaCost": 130,
              "AbilityCooldown": 15
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自施放仅减普攻伤害，跟随七次寒冰脉冲。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "basicReduction": {
                    "div": [
                      "damage_reduction",
                      100
                    ]
                  }
                }
              },
              {
                "op": "area",
                "duration": "duration",
                "interval": "interval",
                "radius": "radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "damage"
                  },
                  {
                    "op": "status",
                    "duration": "slow_duration",
                    "values": {
                      "moveSlow": {
                        "div": [
                          "movement_slow",
                          100
                        ]
                      }
                    }
                  }
                ],
                "follow": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自施放仅减普攻伤害，跟随七次寒冰脉冲。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "lich_sinister_gaze",
          "valveAbilityId": 7325,
          "slot": "S3",
          "name": "阴邪凝视",
          "en": "Sinister Gaze",
          "icon": "assets/r20_55/lich_sinister_gaze.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=31",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "CHANNELED - Hypnotizes an enemy unit, causing it to move towards a point between the two of you and drains a percentage of its current mana.",
            "profile": "level18-base-no-item",
            "semantic": {
              "channel_duration": 2,
              "destination": 50,
              "mana_drain": 25,
              "aoe_scepter": 0,
              "AbilityCastRange": 600,
              "AbilityChannelTime": 2,
              "AbilityManaCost": 25,
              "AbilityCooldown": 18
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 18,
            "mana": 25,
            "range_wu": 330,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "channel_duration": 2,
              "destination": 50,
              "mana_drain": 25,
              "aoe_scepter": 0,
              "AbilityCastRange": 600,
              "AbilityChannelTime": 2,
              "AbilityManaCost": 25,
              "AbilityCooldown": 18
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。持续吸取当前魔法比例，横向每tick靠近；位移取向由towards改编。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "area",
                "duration": "channel_duration",
                "interval": 0.25,
                "radius": 600,
                "ops": [
                  {
                    "op": "mana",
                    "amount": {
                      "mul": [
                        {
                          "stat": "mp",
                          "who": "target"
                        },
                        {
                          "div": [
                            "mana_drain",
                            100
                          ]
                        },
                        0.25
                      ]
                    },
                    "steal": true
                  },
                  {
                    "op": "status",
                    "duration": 0.25,
                    "values": {
                      "stun": true
                    },
                    "dispel": "strong"
                  },
                  {
                    "op": "pullStep",
                    "amount": 25
                  }
                ],
                "channel": true,
                "follow": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。持续吸取当前魔法比例，横向每tick靠近；位移取向由towards改编。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "lich_chain_frost",
          "valveAbilityId": 5137,
          "slot": "S4",
          "name": "连环霜冻",
          "en": "Chain Frost",
          "icon": "assets/r20_55/lich_chain_frost.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=31",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Releases an orb of frost that bounces between nearby enemy units up to %jumps% times, slowing and damaging each time it hits. Each bounce increases the damage for the subsequent bounces. Chain Frost lingers on its last target if it fails to bounce and can bounce again if new targets become available.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage": 550,
              "bonus_jump_damage": 25,
              "jumps": 10,
              "jump_range": 550,
              "slow_movement_speed": -65,
              "slow_attack_speed": -65,
              "slow_duration": 2.5,
              "initial_projectile_speed": 1050,
              "projectile_speed": 850,
              "vision_radius": 800,
              "frostbound_duration": 2,
              "AbilityCastRange": 750,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 420,
              "AbilityCooldown": 60
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 60,
            "mana": 420,
            "range_wu": 412.50000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "damage": 550,
              "bonus_jump_damage": 25,
              "jumps": 10,
              "jump_range": 550,
              "slow_movement_speed": -65,
              "slow_attack_speed": -65,
              "slow_duration": 2.5,
              "initial_projectile_speed": 1050,
              "projectile_speed": 850,
              "vision_radius": 800,
              "frostbound_duration": 2,
              "AbilityCastRange": 750,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 420,
              "AbilityCooldown": 60
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单敌仅命中一次；没有合法第二单位时不凭空自弹；省略附着等待新单位。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "duration": "slow_duration",
                "values": {
                  "moveSlow": 0.65,
                  "attackSlow": 65
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单敌仅命中一次；没有合法第二单位时不凭空自弹；省略附着等待新单位。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "lich",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5134,
        5136,
        7325,
        5137
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1245,
          "key": "lich_death_charge",
          "passive": false,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=31",
          "description": "Sacrifice an allied creep to convert its current health into mana for Lich and give Lich its experience bounty.<br><br>Begins the game on cooldown and with no charges.",
          "specialValues": [
            {
              "name": "active_mana_restore_pct_of_health",
              "values_float": [
                42
              ],
              "is_percentage": true,
              "heading_loc": "CURRENT HEALTH CONVERTED:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "xp_pct",
              "values_float": [
                69
              ],
              "is_percentage": true,
              "heading_loc": "EXPERIENCE BOUNTY:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "AbilityCastRange",
              "values_float": [
                700
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "AbilityCastPoint",
              "values_float": [
                0.4
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "AbilityCharges",
              "values_float": [
                2
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "AbilityChargeRestoreTime",
              "values_float": [
                120
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        8028,
        1245
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "life_stealer",
    "definition": {
      "id": "valve_54",
      "registryNumericId": 52,
      "valveHeroId": 54,
      "packKey": "r20_55",
      "name": "噬魂鬼",
      "en": "Lifestealer",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1524,
      "combatHp": 1524,
      "combatMana": 622,
      "attack": 90,
      "move_speed": 256,
      "attack_range": 90,
      "attack_interval_s": 1.1541072640868975,
      "mana_regen": 2.2800000000000002,
      "portrait": "assets/r20_55/life_stealer-portrait.png",
      "render": "assets/r20_55/life_stealer-render.png",
      "arenaStats": {
        "str": 63.8,
        "agi": 47.3,
        "int": 45.6
      },
      "abilities": [
        {
          "id": "life_stealer_rage",
          "valveAbilityId": 5249,
          "slot": "S1",
          "name": "狂暴",
          "en": "Rage",
          "icon": "assets/r20_55/life_stealer_rage.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=54",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 3,
            "description": "Launch into a maddened rage, becoming Debuff Immune, increasing magic resistance and gaining movement speed.\n\nDISPEL TYPE: Basic Dispel",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 6,
              "magic_resist": 80,
              "debuff_immunity": 1,
              "movespeed_bonus": 15,
              "AbilityManaCost": 140,
              "AbilityCooldown": 18
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 18,
            "mana": 140,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "duration": 6,
              "magic_resist": 80,
              "debuff_immunity": 1,
              "movespeed_bonus": 15,
              "AbilityManaCost": 140,
              "AbilityCooldown": 18
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。基础驱散、6秒弱驱散免疫与80%额外魔抗/15%加速。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "dispel",
                "to": "self",
                "tier": "basic"
              },
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "debuffImmune": true,
                  "magicResist": {
                    "div": [
                      "magic_resist",
                      100
                    ]
                  },
                  "moveBonus": {
                    "div": [
                      "movespeed_bonus",
                      100
                    ]
                  }
                },
                "dispel": "none"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。基础驱散、6秒弱驱散免疫与80%额外魔抗/15%加速。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "life_stealer_open_wounds",
          "valveAbilityId": 5251,
          "slot": "S2",
          "name": "撕裂伤口",
          "en": "Open Wounds",
          "icon": "assets/r20_55/life_stealer_open_wounds.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=54",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Lifestealer rends an enemy unit, slowing the victim's movement speed and allowing all allies to regain health for a percentage of the damage they deal to that unit. The victim recovers movement speed over the duration.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 7,
              "slow_steps": -30,
              "heal_percent": 50,
              "spread_radius": 700,
              "slow_step_pct_of_max": 100,
              "slow_tooltip": 50,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 90,
              "AbilityCooldown": 15
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 15,
            "mana": 90,
            "range_wu": 330,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "duration": 7,
              "slow_steps": -30,
              "heal_percent": 50,
              "spread_radius": 700,
              "slow_step_pct_of_max": 100,
              "slow_tooltip": 50,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 90,
              "AbilityCooldown": 15
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一目标受伤时来源获得实际伤害50%治疗；慢速简化固定50%，省略衰减与扩散。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "moveSlow": 0.5,
                  "lifesteal": {
                    "div": [
                      "heal_percent",
                      100
                    ]
                  }
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一目标受伤时来源获得实际伤害50%治疗；慢速简化固定50%，省略衰减与扩散。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "life_stealer_feast",
          "valveAbilityId": 5250,
          "slot": "S3",
          "name": "盛宴",
          "en": "Feast",
          "icon": "assets/r20_55/life_stealer_feast.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=54",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Lifestealer's attacks deal damage and provide heal for a percentage of his target's max health. He gains permanent max HP whenever he kills a unit.",
            "profile": "level18-base-no-item",
            "semantic": {
              "hp_leech_percent": 3.25,
              "hp_damage_percent": 3.25,
              "creep_deny_percent": 50,
              "bonus_hp_per_hero": 10,
              "bonus_hp_per_creep": 1,
              "bonus_hp_total": 0
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "hp_leech_percent": 3.25,
              "hp_damage_percent": 3.25,
              "creep_deny_percent": 50,
              "bonus_hp_per_hero": 10,
              "bonus_hp_per_creep": 1,
              "bonus_hp_total": 0
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。普攻命中后追加敌最大生命3.25%物伤并自疗名义3.25%；破被动停止。省略跨回合永久生命。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。普攻命中后追加敌最大生命3.25%物伤并自疗名义3.25%；破被动停止。省略跨回合永久生命。",
            "attack": {
              "ops": [
                {
                  "op": "damage",
                  "amount": {
                    "mul": [
                      {
                        "stat": "maxHp",
                        "who": "target"
                      },
                      {
                        "div": [
                          "hp_damage_percent",
                          100
                        ]
                      }
                    ]
                  },
                  "type": "physical"
                },
                {
                  "op": "heal",
                  "to": "self",
                  "amount": {
                    "mul": [
                      {
                        "stat": "maxHp",
                        "who": "target"
                      },
                      {
                        "div": [
                          "hp_leech_percent",
                          100
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "life_stealer_infest",
          "valveAbilityId": 5252,
          "slot": "S4",
          "name": "感染",
          "en": "Infest",
          "icon": "assets/r20_55/life_stealer_infest.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=54",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 1,
            "dispelCode": 3,
            "description": "Lifestealer infests the body of a target unit, becoming undetectable, and healing for a portion of his max hitpoints every second while inside. He can then explode from the host body, dealing damage to nearby enemies. If the infested unit is an enemy creep or a neutral creep, he can take control of the unit's ability to move and attack, and the creep loses a portion of their max hitpoints over time. Does not work on enemy heroes.\n\nDISPEL TYPE: Basic Dispel",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 700,
              "damage": 400,
              "bonus_movement_speed": 25,
              "bonus_health": 1200,
              "self_regen": 5,
              "infest_duration_enemy": 0,
              "attack_rate_enemy": 0,
              "creep_max_hp_drain_pct_per_second": 0,
              "can_target_ancients": 1,
              "dot_damage_as_pct_of_damage_dealt": 0,
              "dot_duration": 0,
              "dot_tick_interval": 0,
              "AbilityCastRange": 150,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 150,
              "AbilityCooldown": 50
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 50,
            "mana": 150,
            "range_wu": 82.5,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "radius": 700,
              "damage": 400,
              "bonus_movement_speed": 25,
              "bonus_health": 1200,
              "self_regen": 5,
              "infest_duration_enemy": 0,
              "attack_rate_enemy": 0,
              "creep_max_hp_drain_pct_per_second": 0,
              "can_target_ancients": 1,
              "dot_damage_as_pct_of_damage_dealt": 0,
              "dot_duration": 0,
              "dot_tick_interval": 0,
              "AbilityCastRange": 150,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 150,
              "AbilityCooldown": 50
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。优先进入自己的自主单位；纯1v1无宿主时生成固定位置竞技寄生囊体，最长6秒每秒恢复5%生命、藏匿不能攻击。R再次按下或宿主死亡自动退出并400区域爆发，禁止寄生敌英雄。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "infest"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。优先进入自己的自主单位；纯1v1无宿主时生成固定位置竞技寄生囊体，最长6秒每秒恢复5%生命、藏匿不能攻击。R再次按下或宿主死亡自动退出并400区域爆发，禁止寄生敌英雄。",
            "integrationRequirement": "HOST_LIFECYCLE_V2",
            "recast": true
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "life_stealer",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5249,
        5251,
        5250,
        5252
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 631,
          "key": "life_stealer_ghoul_frenzy",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=54",
          "description": "Passively grants Lifestealer Attack Speed.",
          "specialValues": [
            {
              "name": "movement_speed_bonus",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "attack_speed_bonus",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "BONUS ATTACK SPEED:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        631
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "HOST_LIFECYCLE_V2"
      ]
    }
  },
  {
    "key": "luna",
    "definition": {
      "id": "valve_48",
      "registryNumericId": 46,
      "valveHeroId": 48,
      "packKey": "r20_55",
      "name": "露娜",
      "en": "Luna",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1405,
      "combatHp": 1405,
      "combatMana": 739,
      "attack": 111,
      "move_speed": 260,
      "attack_range": 181.50000000000003,
      "attack_interval_s": 0.935093509350935,
      "mana_regen": 2.7649999999999997,
      "portrait": "assets/r20_55/luna-portrait.png",
      "render": "assets/r20_55/luna-render.png",
      "arenaStats": {
        "str": 58.400000000000006,
        "agi": 81.8,
        "int": 55.3
      },
      "abilities": [
        {
          "id": "luna_lucent_beam",
          "valveAbilityId": 5222,
          "slot": "S1",
          "name": "月光",
          "en": "Lucent Beam",
          "icon": "assets/r20_55/luna_lucent_beam.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=48",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "Calls a beam of lunar energy down upon an enemy, damaging and briefly stunning them.",
            "profile": "level18-base-no-item",
            "semantic": {
              "beam_damage": 300,
              "stun_duration": 0.6,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 120,
              "AbilityCooldown": 6
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 6,
            "mana": 120,
            "range_wu": 440.00000000000006,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "beam_damage": 300,
              "stun_duration": 0.6,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 120,
              "AbilityCooldown": 6
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。300魔伤和0.6秒晕。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "beam_damage"
              },
              {
                "op": "status",
                "duration": "stun_duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。300魔伤和0.6秒晕。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "luna_lunar_orbit",
          "valveAbilityId": 1462,
          "slot": "S2",
          "name": "环月",
          "en": "Lunar Orbit",
          "icon": "assets/r20_55/luna_lunar_orbit.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=48",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Creates %rotating_glaives% glaives that rotate %rotating_glaives_movement_radius% radius around Luna. Any enemy unit that collides with a glaive will take a percentage of Luna's Attack Damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "rotating_glaives_duration": 8,
              "rotating_glaives": 4,
              "rotating_glaives_movement_radius": 225,
              "rotating_glaives_movement_radius_expand_speed_scale": 4,
              "rotating_glaives_hit_radius": 200,
              "rotating_glaives_collision_damage": 40,
              "rotating_glaives_speed": 160,
              "rotating_glaives_damage_reduction": 20,
              "bonus_movement_speed": 0,
              "AbilityManaCost": 80,
              "AbilityCooldown": 25
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 25,
            "mana": 80,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "rotating_glaives_duration": 8,
              "rotating_glaives": 4,
              "rotating_glaives_movement_radius": 225,
              "rotating_glaives_movement_radius_expand_speed_scale": 4,
              "rotating_glaives_hit_radius": 200,
              "rotating_glaives_collision_damage": 40,
              "rotating_glaives_speed": 160,
              "rotating_glaives_damage_reduction": 20,
              "bonus_movement_speed": 0,
              "AbilityManaCost": 80,
              "AbilityCooldown": 25
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。4刃水平投影环绕8秒，每刃从圈外进入敌碰撞区才造成40%攻击伤害；额外20%减伤。持续接触不每帧重复命中。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "orbit"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。4刃水平投影环绕8秒，每刃从圈外进入敌碰撞区才造成40%攻击伤害；额外20%减伤。持续接触不每帧重复命中。",
            "integrationRequirement": "ORBIT_COLLISION_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "luna_moon_glaive",
          "valveAbilityId": 5223,
          "slot": "S3",
          "name": "月刃",
          "en": "Moon Glaives",
          "icon": "assets/r20_55/luna_moon_glaive.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=48",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Empowers Luna's glaives, causing her attacks to bounce between enemy units. Deals less damage with each bounce.",
            "profile": "level18-base-no-item",
            "semantic": {
              "range": 500,
              "bounces": 6,
              "damage_reduction_percent": 35
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "range": 500,
              "bounces": 6,
              "damage_reduction_percent": 35
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。普攻实际伤害向附近敌方召唤单位最多反弹6次，每次乘65%，每个单位本链只命中一次；没有第二合法单位不会自弹。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。普攻实际伤害向附近敌方召唤单位最多反弹6次，每次乘65%，每个单位本链只命中一次；没有第二合法单位不会自弹。",
            "attack": {},
            "integrationRequirement": "MULTI_UNIT_DAMAGE_EVENTS_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "luna_eclipse",
          "valveAbilityId": 5225,
          "slot": "S4",
          "name": "月蚀",
          "en": "Eclipse",
          "icon": "assets/r20_55/luna_eclipse.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=48",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Showers random nearby enemies with strikes from Luna's current level of Lucent Beam. These beams do not stun their targets, and there is a maximum number of times that a single target can be struck. Also turns day into night for a short time.",
            "profile": "level18-base-no-item",
            "semantic": {
              "beams": 12,
              "beam_interval": 0.6,
              "beam_interval_scepter": 0.3,
              "radius": 675,
              "hit_count": 5,
              "night_duration": 10,
              "AbilityCastRange": 0,
              "AbilityDuration": 6,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 250,
              "AbilityCooldown": 105
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 105,
            "mana": 250,
            "range_wu": 0,
            "startup_frames": 30,
            "recovery_frames": 12,
            "params": {
              "beams": 12,
              "beam_interval": 0.6,
              "beam_interval_scepter": 0.3,
              "radius": 675,
              "hit_count": 5,
              "night_duration": 10,
              "AbilityCastRange": 0,
              "AbilityDuration": 6,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 250,
              "AbilityCooldown": 105
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。当前四级月光300魔伤，单目标最多5束且无眩晕；无目标时消耗发射时机；昼夜省略。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "area",
                "duration": {
                  "mul": [
                    "beams",
                    "beam_interval"
                  ]
                },
                "interval": "beam_interval",
                "radius": "radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": 300
                  }
                ],
                "follow": true,
                "maxHits": "hit_count"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。当前四级月光300魔伤，单目标最多5束且无眩晕；无目标时消耗发射时机；昼夜省略。",
            "crossSource": "luna_lucent_beam.beam_damage(rank4)=300"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "luna",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5222,
        1462,
        5223,
        5225
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 5224,
          "key": "luna_lunar_blessing",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=48",
          "description": "Grants attack damage to Luna and nearby allied heroes within %radius% range, with Luna receiving double the attack damage bonuses. At night, Lunar Blessing is global, and Luna is blessed with bonus night vision.",
          "specialValues": [
            {
              "name": "radius",
              "values_float": [
                1200
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "bonus_damage",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "BONUS DAMAGE (ALLIES):",
              "bonuses": [
                {
                  "name": "special_bonus_unique_luna_3",
                  "value": 25,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "self_bonus_damage",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "BONUS DAMAGE (SELF):",
              "bonuses": [
                {
                  "name": "special_bonus_unique_luna_3",
                  "value": 50,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "bonus_night_vision",
              "values_float": [
                225
              ],
              "is_percentage": false,
              "heading_loc": "BONUS NIGHT VISION:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        5224
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "ORBIT_COLLISION_V2",
        "MULTI_UNIT_DAMAGE_EVENTS_V2"
      ]
    }
  },
  {
    "key": "morphling",
    "definition": {
      "id": "valve_10",
      "registryNumericId": 22,
      "valveHeroId": 10,
      "packKey": "r20_55",
      "name": "变体精灵",
      "en": "Morphling",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1444,
      "combatHp": 1444,
      "combatMana": 670,
      "attack": 121,
      "move_speed": 228,
      "attack_range": 192.50000000000003,
      "attack_interval_s": 0.7338551859099804,
      "mana_regen": 2.4800000000000004,
      "portrait": "assets/r20_55/morphling-portrait.png",
      "render": "assets/r20_55/morphling-render.png",
      "arenaStats": {
        "str": 60.2,
        "agi": 104.4,
        "int": 49.6
      },
      "abilities": [
        {
          "id": "morphling_waveform",
          "valveAbilityId": 5052,
          "slot": "S1",
          "name": "波浪形态",
          "en": "Waveform",
          "icon": "assets/r20_55/morphling_waveform.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=10",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Morphling dissolves into liquid and surges forward, damaging enemy units in his path. Morphling is invulnerable during Waveform.",
            "profile": "level18-base-no-item",
            "semantic": {
              "speed": 1250,
              "width": 200,
              "AbilityDamage": 300,
              "AbilityCastRange": 925,
              "AbilityCastPoint": 0.25,
              "AbilityManaCost": 115,
              "AbilityCooldown": 12
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 12,
            "mana": 115,
            "range_wu": 508.75000000000006,
            "startup_frames": 15,
            "recovery_frames": 12,
            "params": {
              "speed": 1250,
              "width": 200,
              "AbilityDamage": 300,
              "AbilityCastRange": 925,
              "AbilityCastPoint": 0.25,
              "AbilityManaCost": 115,
              "AbilityCooldown": 12
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。短时无敌位移，终点邻域伤害；沿途命中省略。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": 0.4,
                "values": {
                  "invulnerable": true
                },
                "dispel": "none"
              },
              {
                "op": "delay",
                "delay": 0.3,
                "ops": [
                  {
                    "op": "move",
                    "to": "self",
                    "mode": "aim"
                  },
                  {
                    "op": "damage",
                    "amount": "AbilityDamage",
                    "radius": "width"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。短时无敌位移，终点邻域伤害；沿途命中省略。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "morphling_adaptive_strike_agi",
          "valveAbilityId": 5053,
          "slot": "S2",
          "name": "变体打击",
          "en": "Adaptive Strike",
          "icon": "assets/r20_55/morphling_adaptive_strike_agi.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=10",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Launches a surge of water toward an enemy unit, stunning them, knocking them back, and dealing base damage plus additional damage based on Morphling's agility times a multiplier.  If Morphling's agility is 50% higher than strength, the maximum agility multiplier is used.\n\nKnockback distance and stun duration are based on Morphling's strength. If his strength is 50% higher than his agility, the maximum knockback distance and stun duration is used.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage_base": 110,
              "damage_min": 0.5,
              "damage_max": 2.5,
              "stun_min": 0.5,
              "stun_max": 2.6,
              "knockback_min": 50,
              "knockback_max": 350,
              "knockback_duration": 0.5,
              "projectile_speed": 1150,
              "AbilityCastRange": 825,
              "AbilityCastPoint": 0.25,
              "AbilityManaCost": 70,
              "AbilityCooldown": 8
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 8,
            "mana": 70,
            "range_wu": 453.75000000000006,
            "startup_frames": 15,
            "recovery_frames": 12,
            "params": {
              "damage_base": 110,
              "damage_min": 0.5,
              "damage_max": 2.5,
              "stun_min": 0.5,
              "stun_max": 2.6,
              "knockback_min": 50,
              "knockback_max": 350,
              "knockback_duration": 0.5,
              "projectile_speed": 1150,
              "AbilityCastRange": 825,
              "AbilityCastPoint": 0.25,
              "AbilityManaCost": 70,
              "AbilityCooldown": 8
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。按当前力量/敏捷比在官方最小最大伤害、眩晕和击退间线性插值；明确竞技插值规则，不冒称官方内部插值。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "special",
                "name": "adaptive"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。按当前力量/敏捷比在官方最小最大伤害、眩晕和击退间线性插值；明确竞技插值规则，不冒称官方内部插值。",
            "integrationRequirement": "DYNAMIC_ATTRIBUTES_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "morphling_morph_agi",
          "valveAbilityId": 5055,
          "slot": "S3",
          "name": "属性变换（敏捷获取）",
          "en": "Attribute Shift (Agility Gain)",
          "icon": "assets/r20_55/morphling_morph_agi.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=10",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Morphling shifts its form, pulling points from Strength and pouring them into Agility at a rate of %morph_rate%. The process is reversible.",
            "profile": "level18-base-no-item",
            "semantic": {
              "points_per_tick": 1,
              "morph_rate": 16,
              "mana_cost": 10,
              "castable_while_stunned": 0
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "points_per_tick": 1,
              "morph_rate": 16,
              "mana_cost": 10,
              "castable_while_stunned": 0
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。S3启动敏捷转移，再按切为力量方向；每秒16点、10魔法，属性最低1。生命按比例随力量改变，敏捷改变普攻。四槽不变，无隐藏属性键。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "shift"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。S3启动敏捷转移，再按切为力量方向；每秒16点、10魔法，属性最低1。生命按比例随力量改变，敏捷改变普攻。四槽不变，无隐藏属性键。",
            "integrationRequirement": "DYNAMIC_ATTRIBUTES_V2",
            "recast": true
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "morphling_replicate",
          "valveAbilityId": 5057,
          "slot": "S4",
          "name": "变形",
          "en": "Morph",
          "icon": "assets/r20_55/morphling_replicate.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=10",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Morphling changes his form to match the targeted enemy, gaining their basic abilities and changing his primary attribute based on his target. Can be toggled for the duration of the ability.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 24,
              "scepter_stat_steal": 0,
              "scepter_spell_amplify": 0,
              "scepter_attack_speed": 0,
              "scepter_status_resist": 0,
              "scepter_additional_stats": 0,
              "scepter_illusion_outgoing": 0,
              "scepter_illusion_incoming": 0,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.25,
              "AbilityManaCost": 50,
              "AbilityCooldown": 55
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 55,
            "mana": 50,
            "range_wu": 550,
            "startup_frames": 15,
            "recovery_frames": 12,
            "params": {
              "duration": 24,
              "scepter_stat_steal": 0,
              "scepter_spell_amplify": 0,
              "scepter_attack_speed": 0,
              "scepter_status_resist": 0,
              "scepter_additional_stats": 0,
              "scepter_illusion_outgoing": 0,
              "scepter_illusion_incoming": 0,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.25,
              "AbilityManaCost": 50,
              "AbilityCooldown": 55
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。R复制对手攻击力、攻击距离、护甲与移速24秒，再按R提前恢复。为固定四代表技能约束，保留原四槽，不复制对方技能、不增加技能页；属性转移仍可使用。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "special",
                "name": "copy"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。R复制对手攻击力、攻击距离、护甲与移速24秒，再按R提前恢复。为固定四代表技能约束，保留原四槽，不复制对方技能、不增加技能页；属性转移仍可使用。",
            "integrationRequirement": "TEMPORARY_COMBAT_PROFILE_V2",
            "recast": true
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "morphling",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5052,
        5053,
        5055,
        5057
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1741,
          "key": "morphling_ebb_and_flow",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=10",
          "description": "Morphling receives bonus cast range and slow resistance based on his current Strength, and attack range and movement speed based on his current Agility. These bonuses persist if he is morphed into another hero.",
          "specialValues": [
            {
              "name": "swell_up_duration",
              "values_float": [
                1.5
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "swell_down_duration",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "swell_duration",
              "values_float": [
                5.2
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "max_swell_duration",
              "values_float": [
                2.7
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "model_scale",
              "values_float": [
                40
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "stats_pct",
              "values_float": [
                25
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "attack_range_per_agi",
              "values_float": [
                25
              ],
              "is_percentage": true,
              "heading_loc": "AGILITY TO ATTACK RANGE:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "move_speed_per_agi",
              "values_float": [
                15
              ],
              "is_percentage": true,
              "heading_loc": "AGILITY TO MOVEMENT SPEED:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "cast_range_per_str",
              "values_float": [
                25
              ],
              "is_percentage": true,
              "heading_loc": "STRENGTH TO CAST RANGE:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "slow_resist_per_str",
              "values_float": [
                25
              ],
              "is_percentage": true,
              "heading_loc": "STRENGTH TO SLOW RESISTANCE:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "model_scale_max",
              "values_float": [
                20
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        5056,
        1741
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "DYNAMIC_ATTRIBUTES_V2",
        "TEMPORARY_COMBAT_PROFILE_V2"
      ]
    }
  },
  {
    "key": "necrolyte",
    "definition": {
      "id": "valve_36",
      "registryNumericId": 36,
      "valveHeroId": 36,
      "packKey": "r20_55",
      "name": "瘟疫法师",
      "en": "Necrophos",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1376,
      "combatHp": 1376,
      "combatMana": 902,
      "attack": 97,
      "move_speed": 224,
      "attack_range": 275,
      "attack_interval_s": 1.267710663683818,
      "mana_regen": 3.4450000000000003,
      "portrait": "assets/r20_55/necrolyte-portrait.png",
      "render": "assets/r20_55/necrolyte-render.png",
      "arenaStats": {
        "str": 57.099999999999994,
        "agi": 34.1,
        "int": 68.9
      },
      "abilities": [
        {
          "id": "necrolyte_death_pulse",
          "valveAbilityId": 5158,
          "slot": "S1",
          "name": "死亡脉冲",
          "en": "Death Pulse",
          "icon": "assets/r20_55/necrolyte_death_pulse.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=36",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 5,
            "dispelCode": 0,
            "description": "Necrophos releases a wave of death around him, dealing damage to enemy units and healing allied units.",
            "profile": "level18-base-no-item",
            "semantic": {
              "area_of_effect": 500,
              "heal": 130,
              "projectile_speed": 400,
              "AbilityDamage": 280,
              "AbilityManaCost": 160,
              "AbilityCooldown": 5
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 5,
            "mana": 160,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "area_of_effect": 500,
              "heal": 130,
              "projectile_speed": 400,
              "AbilityDamage": 280,
              "AbilityManaCost": 160,
              "AbilityCooldown": 5
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自身130治疗，半径内280魔伤。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "damage",
                "amount": "AbilityDamage",
                "radius": "area_of_effect"
              },
              {
                "op": "heal",
                "to": "self",
                "amount": "heal"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自身130治疗，半径内280魔伤。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "necrolyte_ghost_shroud",
          "valveAbilityId": 1270,
          "slot": "S2",
          "name": "幽魂护罩",
          "en": "Ghost Shroud",
          "icon": "assets/r20_55/necrolyte_ghost_shroud.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=36",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Necrophos slips into the realm that separates the living from the dead. Unable to attack or be attacked, he emits an aura that slows enemies around him. He takes additional magic damage in this form, but his restorative powers are amplified.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 4.5,
              "heal_bonus": 75,
              "movement_speed": 25,
              "slow_aoe": 700,
              "bonus_damage": -20,
              "AbilityManaCost": 75,
              "AbilityCooldown": 16
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 16,
            "mana": 75,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "duration": 4.5,
              "heal_bonus": 75,
              "movement_speed": 25,
              "slow_aoe": 700,
              "bonus_damage": -20,
              "AbilityManaCost": 75,
              "AbilityCooldown": 16
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自虚灵不可普攻、物免、魔法易伤20%、治疗增幅75%；跟随减速区。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "physicalImmune": true,
                  "disarm": true,
                  "magicVulnerable": 0.2,
                  "healAmp": 0.75
                }
              },
              {
                "op": "area",
                "duration": "duration",
                "interval": 0.1,
                "radius": "slow_aoe",
                "ops": [
                  {
                    "op": "status",
                    "duration": 0.15,
                    "values": {
                      "moveSlow": 0.25
                    }
                  }
                ],
                "follow": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自虚灵不可普攻、物免、魔法易伤20%、治疗增幅75%；跟随减速区。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "necrolyte_heartstopper_aura",
          "valveAbilityId": 5159,
          "slot": "S3",
          "name": "竭心光环",
          "en": "Heartstopper Aura",
          "icon": "assets/r20_55/necrolyte_heartstopper_aura.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=36",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Necrophos stills the hearts of his opponents, causing nearby enemy units to lose a percentage of their max health over time.",
            "profile": "level18-base-no-item",
            "semantic": {
              "aura_radius": 700,
              "aura_damage": 2.3,
              "heal_regen_to_damage": 0
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "aura_radius": 700,
              "aura_damage": 2.3,
              "heal_regen_to_damage": 0
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。每秒最大生命2.3%魔法伤害光环，破被动立即停止；竞技tick0.25秒。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。每秒最大生命2.3%魔法伤害光环，破被动立即停止；竞技tick0.25秒。",
            "aura": {
              "interval": 0.25,
              "radius": "aura_radius",
              "ops": [
                {
                  "op": "damage",
                  "amount": {
                    "mul": [
                      {
                        "stat": "maxHp",
                        "who": "target"
                      },
                      {
                        "div": [
                          "aura_damage",
                          100
                        ]
                      },
                      0.25
                    ]
                  },
                  "type": "magical"
                }
              ]
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "necrolyte_reapers_scythe",
          "valveAbilityId": 5161,
          "slot": "S4",
          "name": "死神镰刀",
          "en": "Reaper's Scythe",
          "icon": "assets/r20_55/necrolyte_reapers_scythe.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=36",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Stuns the target enemy hero, then deals damage based on how much life it is missing. If Necrophos kills an enemy this way, he'll permanently gain Health and Mana Regen. Any kill under this effect is credited to Necrophos.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage_per_health": 0.9,
              "stun_duration": 1.5,
              "hp_per_kill": 3,
              "mana_per_kill": 3,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.45,
              "AbilityManaCost": 500,
              "AbilityCooldown": 100
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 100,
            "mana": 500,
            "range_wu": 330,
            "startup_frames": 27,
            "recovery_frames": 12,
            "params": {
              "damage_per_health": 0.9,
              "stun_duration": 1.5,
              "hp_per_kill": 3,
              "mana_per_kill": 3,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.45,
              "AbilityManaCost": 500,
              "AbilityCooldown": 100
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。1.5秒后按当时已损生命×0.9结算；省略跨回合永久击杀回复。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "status",
                "duration": "stun_duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong"
              },
              {
                "op": "delay",
                "delay": "stun_duration",
                "ops": [
                  {
                    "op": "damage",
                    "amount": {
                      "mul": [
                        {
                          "stat": "missingHp",
                          "who": "target"
                        },
                        "damage_per_health"
                      ]
                    }
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。1.5秒后按当时已损生命×0.9结算；省略跨回合永久击杀回复。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "necrolyte",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5158,
        1270,
        5159,
        5161
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 5160,
          "key": "necrolyte_sadist",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=36",
          "description": "Necrophos gains stacking regen for %regen_duration% seconds for each unit he kills. Hero kills multiply the effect.",
          "specialValues": [
            {
              "name": "regen",
              "values_float": [
                3.8
              ],
              "is_percentage": false,
              "heading_loc": "HP/MANA REGEN:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "hero_multiplier",
              "values_float": [
                4
              ],
              "is_percentage": false,
              "heading_loc": "HERO KILL MULTIPLIER:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "regen_duration",
              "values_float": [
                8
              ],
              "is_percentage": false,
              "heading_loc": "DURATION:",
              "bonuses": [
                {
                  "name": "special_bonus_unique_necrophos_heartstopper_regen_duration",
                  "value": 2,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        661,
        5160
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "omniknight",
    "definition": {
      "id": "valve_57",
      "registryNumericId": 55,
      "valveHeroId": 57,
      "packKey": "r20_55",
      "name": "全能骑士",
      "en": "Omniknight",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1763,
      "combatHp": 1763,
      "combatMana": 719,
      "attack": 111,
      "move_speed": 248,
      "attack_range": 90,
      "attack_interval_s": 1.18137595552467,
      "mana_regen": 2.6850000400000003,
      "portrait": "assets/r20_55/omniknight-portrait.png",
      "render": "assets/r20_55/omniknight-render.png",
      "arenaStats": {
        "str": 74.7,
        "agi": 43.9,
        "int": 53.7
      },
      "abilities": [
        {
          "id": "omniknight_purification",
          "valveAbilityId": 5263,
          "slot": "S1",
          "name": "洗礼",
          "en": "Purification",
          "icon": "assets/r20_55/omniknight_purification.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=57",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 4,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Instantly heals a friendly unit and damages all nearby enemy units.",
            "profile": "level18-base-no-item",
            "semantic": {
              "heal": 300,
              "radius": 260,
              "recast_delay": 0,
              "recast_effectiveness_pct": 0,
              "AbilityCastRange": 700,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 135,
              "AbilityCooldown": 12
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 12,
            "mana": 135,
            "range_wu": 385.00000000000006,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "heal": 300,
              "radius": 260,
              "recast_delay": 0,
              "recast_effectiveness_pct": 0,
              "AbilityCastRange": 700,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 135,
              "AbilityCooldown": 12
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自疗300且自身附近敌人300纯粹伤害；无法治疗已死亡角色。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "heal",
                "to": "self",
                "amount": "heal"
              },
              {
                "op": "damage",
                "amount": "heal",
                "type": "pure",
                "radius": "radius"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自疗300且自身附近敌人300纯粹伤害；无法治疗已死亡角色。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "omniknight_martyr",
          "valveAbilityId": 895,
          "slot": "S2",
          "name": "驱逐",
          "en": "Repel",
          "icon": "assets/r20_55/omniknight_martyr.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=57",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 1,
            "dispelCode": 2,
            "description": "Grants Debuff Immunity with %magic_resist%%% magic resistance, as well as bonus HP Regen.",
            "profile": "level18-base-no-item",
            "semantic": {
              "base_hpregen": 20,
              "duration": 5,
              "magic_resist": 60,
              "AbilityCastRange": 700,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 135,
              "AbilityCooldown": 25
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 25,
            "mana": 135,
            "range_wu": 385.00000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "base_hpregen": 20,
              "duration": 5,
              "magic_resist": 60,
              "AbilityCastRange": 700,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 135,
              "AbilityCooldown": 25
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自施放5秒弱驱散免疫/60%魔抗，每秒20治疗；不擅自添加未描述的驱散。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "debuffImmune": true,
                  "magicResist": {
                    "div": [
                      "magic_resist",
                      100
                    ]
                  }
                },
                "tick": {
                  "interval": 1,
                  "ops": [
                    {
                      "op": "heal",
                      "to": "self",
                      "amount": "base_hpregen"
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自施放5秒弱驱散免疫/60%魔抗，每秒20治疗；不擅自添加未描述的驱散。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "omniknight_hammer_of_purity",
          "valveAbilityId": 656,
          "slot": "S3",
          "name": "纯洁之锤",
          "en": "Hammer of Purity",
          "icon": "assets/r20_55/omniknight_hammer_of_purity.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=57",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 4,
            "immunityCode": 3,
            "dispelCode": 2,
            "description": "Omniknight imbues his hammer with holy power, causing his attack to have increased range, deal pure damage based on a percentage of his base damage and slow his target for a short duration.<br><br> Omniknight heals for %heal_pct%%% of the damage dealt over %heal_duration%s.",
            "profile": "level18-base-no-item",
            "semantic": {
              "base_damage": 90,
              "bonus_damage": 85,
              "heal_pct": 40,
              "heal_duration": 4,
              "total_ticks": 4,
              "attack_cooldown": -1,
              "attack_range_bonus": 75,
              "duration": 0.2,
              "movement_slow": 75,
              "AbilityCastRange": 150,
              "AbilityCooldown": 4
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 4,
            "mana": 0,
            "range_wu": 82.5,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "base_damage": 90,
              "bonus_damage": 85,
              "heal_pct": 40,
              "heal_duration": 4,
              "total_ticks": 4,
              "attack_cooldown": -1,
              "attack_range_bonus": 75,
              "duration": 0.2,
              "movement_slow": 75,
              "AbilityCastRange": 150,
              "AbilityCooldown": 4
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。主动近战纯粹伤害90+基础攻击85%，4次自疗合计名义伤害40%；省略实际攻击触发联动。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": {
                  "add": [
                    "base_damage",
                    {
                      "mul": [
                        {
                          "stat": "baseAttack"
                        },
                        {
                          "div": [
                            "bonus_damage",
                            100
                          ]
                        }
                      ]
                    }
                  ]
                },
                "type": "pure"
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "moveSlow": {
                    "div": [
                      "movement_slow",
                      100
                    ]
                  }
                }
              },
              {
                "op": "status",
                "to": "self",
                "duration": "heal_duration",
                "values": {},
                "tick": {
                  "interval": {
                    "div": [
                      "heal_duration",
                      "total_ticks"
                    ]
                  },
                  "ops": [
                    {
                      "op": "heal",
                      "to": "self",
                      "amount": {
                        "div": [
                          {
                            "mul": [
                              {
                                "add": [
                                  "base_damage",
                                  {
                                    "mul": [
                                      {
                                        "stat": "baseAttack"
                                      },
                                      {
                                        "div": [
                                          "bonus_damage",
                                          100
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "div": [
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
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。主动近战纯粹伤害90+基础攻击85%，4次自疗合计名义伤害40%；省略实际攻击触发联动。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "omniknight_guardian_angel",
          "valveAbilityId": 5266,
          "slot": "S4",
          "name": "守护天使",
          "en": "Guardian Angel",
          "icon": "assets/r20_55/omniknight_guardian_angel.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=57",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 1,
            "dispelCode": 3,
            "description": "Omniknight calls upon a Guardian Angel that grants immunity from physical damage to all allied units near Omniknight.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 5.5,
              "radius": 700,
              "is_global": 0,
              "affects_buildings": 0,
              "heal_and_regen_amp": 0,
              "model_scale": 15,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 225,
              "AbilityCooldown": 80
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 80,
            "mana": 225,
            "range_wu": 0,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "duration": 5.5,
              "radius": 700,
              "is_global": 0,
              "affects_buildings": 0,
              "heal_and_regen_amp": 0,
              "model_scale": 15,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 225,
              "AbilityCooldown": 80
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自施放5.5秒物理免伤，魔法和纯粹照常；死亡清理。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "physicalImmune": true
                },
                "dispel": "none"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自施放5.5秒物理免伤，魔法和纯粹照常；死亡清理。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "omniknight",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5263,
        895,
        656,
        5266
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 5265,
          "key": "omniknight_degen_aura",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=57",
          "description": "Degenerates the movement capabilities of enemy units that stray too near, slowing their movement speed.",
          "specialValues": [
            {
              "name": "speed_bonus",
              "values_float": [
                11
              ],
              "is_percentage": true,
              "heading_loc": "MOVEMENT SLOW:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "radius",
              "values_float": [
                325
              ],
              "is_percentage": false,
              "heading_loc": "RADIUS:",
              "bonuses": [
                {
                  "name": "special_bonus_unique_omniknight_degen_aura_radius",
                  "value": 150,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "linger_duration",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        5265
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "phantom_lancer",
    "definition": {
      "id": "valve_12",
      "registryNumericId": 23,
      "valveHeroId": 12,
      "packKey": "r20_55",
      "name": "幻影长矛手",
      "en": "Phantom Lancer",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1405,
      "combatHp": 1405,
      "combatMana": 694,
      "attack": 115,
      "move_speed": 228,
      "attack_range": 123.75000000000001,
      "attack_interval_s": 0.9249183895538629,
      "mana_regen": 2.5800001000000004,
      "portrait": "assets/r20_55/phantom_lancer-portrait.png",
      "render": "assets/r20_55/phantom_lancer-render.png",
      "arenaStats": {
        "str": 58.400000000000006,
        "agi": 83.8,
        "int": 51.6
      },
      "abilities": [
        {
          "id": "phantom_lancer_spirit_lance",
          "valveAbilityId": 5065,
          "slot": "S1",
          "name": "灵魂之矛",
          "en": "Spirit Lance",
          "icon": "assets/r20_55/phantom_lancer_spirit_lance.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=12",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Sends a magical spirit lance to a target enemy unit that damages and slows, while summoning an illusory phantom to attack the unit.",
            "profile": "level18-base-no-item",
            "semantic": {
              "lance_damage": 280,
              "lance_speed": 1000,
              "duration": 3,
              "movement_speed_pct": -35,
              "illusion_duration": 8,
              "illusion_damage_out_pct": -85,
              "tooltip_illusion_damage": 15,
              "illusion_damage_in_pct": 300,
              "tooltip_illusion_total_damage_in_pct": 400,
              "fake_lance_distance": 675,
              "scepter_bounce_radius": 0,
              "scepter_bonus_illusion_damage": 0,
              "scepter_total_hits": 0,
              "AbilityCastRange": 750,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 120,
              "AbilityCooldown": 7
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 7,
            "mana": 120,
            "range_wu": 412.50000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "lance_damage": 280,
              "lance_speed": 1000,
              "duration": 3,
              "movement_speed_pct": -35,
              "illusion_duration": 8,
              "illusion_damage_out_pct": -85,
              "tooltip_illusion_damage": 15,
              "illusion_damage_in_pct": 300,
              "tooltip_illusion_total_damage_in_pct": 400,
              "fake_lance_distance": 675,
              "scepter_bounce_radius": 0,
              "scepter_bonus_illusion_damage": 0,
              "scepter_total_hits": 0,
              "AbilityCastRange": 750,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 120,
              "AbilityCooldown": 7
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。伤害+减速+自主幻象；幻象1.7秒攻击为明确竞技值、承伤4倍、不可手选。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "lance_damage"
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "moveSlow": 0.35
                }
              },
              {
                "op": "summon",
                "count": 1,
                "hp": {
                  "stat": "maxHp"
                },
                "damage": {
                  "mul": [
                    {
                      "stat": "attack"
                    },
                    {
                      "div": [
                        "tooltip_illusion_damage",
                        100
                      ]
                    }
                  ]
                },
                "duration": "illusion_duration",
                "interval": 1.7,
                "range": 150,
                "speed": 300,
                "incoming": 4
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。伤害+减速+自主幻象；幻象1.7秒攻击为明确竞技值、承伤4倍、不可手选。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "phantom_lancer_doppelwalk",
          "valveAbilityId": 5066,
          "slot": "S2",
          "name": "神行百变",
          "en": "Doppelganger",
          "icon": "assets/r20_55/phantom_lancer_doppelwalk.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=12",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Phantom Lancer briefly vanishes from the battlefield. After %delay% second, Phantom Lancer and any of his nearby illusions reappear at a random position within the targeted location, along with two additional doppelgangers. Extends duration of all illusions. The two added doppelgangers have different properties: one takes normal damage and deals none, while the other takes %illusion_2_damage_in_pct%%% bonus damage and deals %illusion_2_damage_out_pct%%% less damage.\n\nDISPEL TYPE: Basic Dispel",
            "profile": "level18-base-no-item",
            "semantic": {
              "illusion_1_damage_out_pct": -100,
              "illusion_2_damage_out_pct": -80,
              "illusion_2_damage_in_pct": 500,
              "target_aoe": 325,
              "search_radius": 900,
              "delay": 1,
              "illusion_duration": 8,
              "illusion_extended_duration": 2,
              "illusion_2_amount": 1,
              "AbilityCastRange": 575,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 70,
              "AbilityCooldown": 10
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 10,
            "mana": 70,
            "range_wu": 316.25,
            "startup_frames": 6,
            "recovery_frames": 12,
            "params": {
              "illusion_1_damage_out_pct": -100,
              "illusion_2_damage_out_pct": -80,
              "illusion_2_damage_in_pct": 500,
              "target_aoe": 325,
              "search_radius": 900,
              "delay": 1,
              "illusion_duration": 8,
              "illusion_extended_duration": 2,
              "illusion_2_amount": 1,
              "AbilityCastRange": 575,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 70,
              "AbilityCooldown": 10
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。短暂消失后定点重现，生成无伤害诱饵和20%伤害幻象；省略随机落点及旧幻象续时。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "dispel",
                "to": "self",
                "tier": "basic"
              },
              {
                "op": "status",
                "to": "self",
                "duration": "delay",
                "values": {
                  "invulnerable": true
                },
                "dispel": "none"
              },
              {
                "op": "delay",
                "delay": "delay",
                "ops": [
                  {
                    "op": "move",
                    "to": "self",
                    "mode": "aim"
                  },
                  {
                    "op": "summon",
                    "count": 1,
                    "hp": {
                      "stat": "maxHp"
                    },
                    "damage": 0,
                    "duration": "illusion_duration",
                    "interval": 1.7,
                    "range": 150,
                    "speed": 300
                  },
                  {
                    "op": "summon",
                    "count": 1,
                    "hp": {
                      "stat": "maxHp"
                    },
                    "damage": {
                      "mul": [
                        {
                          "stat": "attack"
                        },
                        0.2
                      ]
                    },
                    "duration": "illusion_duration",
                    "interval": 1.7,
                    "range": 150,
                    "speed": 300,
                    "incoming": 6
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。短暂消失后定点重现，生成无伤害诱饵和20%伤害幻象；省略随机落点及旧幻象续时。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "phantom_lancer_phantom_edge",
          "valveAbilityId": 1221,
          "slot": "S3",
          "name": "幻影冲锋",
          "en": "Phantom Rush",
          "icon": "assets/r20_55/phantom_lancer_phantom_edge.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=12",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 0,
            "dispelCode": 2,
            "description": "When targeting an enemy for an attack, Phantom Lancer quickly charges into range, gaining increased movement speed and evasion.",
            "profile": "level18-base-no-item",
            "semantic": {
              "min_distance": 275,
              "max_distance": 825,
              "bonus_speed": 800,
              "illusion_spawn_radius": 0,
              "illusion_spawn_travel_distance": 0,
              "evasion": 50,
              "AbilityCooldown": 3
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 3,
            "mana": 0,
            "range_wu": 453.75000000000006,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "min_distance": 275,
              "max_distance": 825,
              "bonus_speed": 800,
              "illusion_spawn_radius": 0,
              "illusion_spawn_travel_distance": 0,
              "evasion": 50,
              "AbilityCooldown": 3
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。S3启动向唯一敌人的高速冲锋，在最小/最大距离窗口内生效；途中50%闪避，到普攻距离结束。无需分身控制键。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "special",
                "name": "pursuit"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。S3启动向唯一敌人的高速冲锋，在最小/最大距离窗口内生效；途中50%闪避，到普攻距离结束。无需分身控制键。",
            "integrationRequirement": "ATTACK_PURSUIT_V2",
            "rangeParam": "max_distance"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "phantom_lancer_juxtapose",
          "valveAbilityId": 5067,
          "slot": "S4",
          "name": "并列",
          "en": "Juxtapose",
          "icon": "assets/r20_55/phantom_lancer_juxtapose.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=12",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Phantom Lancer has a chance to fracture his presence on an attack, creating an illusion of himself. Illusions also have a chance to fracture further. Illusions created from Phantom Lancer last for %illusion_duration% seconds, while illusions created from other illusions last %illusion_from_illusion_duration% seconds.",
            "profile": "level18-base-no-item",
            "semantic": {
              "max_illusions": 10,
              "proc_chance_pct": 50,
              "illusion_proc_chance_pct": 9,
              "illusion_duration": 8,
              "illusion_from_illusion_duration": 4,
              "illusion_damage_out_pct": -85,
              "tooltip_illusion_damage": 15,
              "illusion_damage_in_pct": 500,
              "tooltip_total_illusion_damage_in_pct": 600,
              "shard_bonus_illusions": 0,
              "invis_duration": 0,
              "invis_movespeed": 0,
              "AbilityManaCost": 0,
              "AbilityCooldown": 0
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "max_illusions": 10,
              "proc_chance_pct": 50,
              "illusion_proc_chance_pct": 9,
              "illusion_duration": 8,
              "illusion_from_illusion_duration": 4,
              "illusion_damage_out_pct": -85,
              "tooltip_illusion_damage": 15,
              "illusion_damage_in_pct": 500,
              "tooltip_total_illusion_damage_in_pct": 600,
              "shard_bonus_illusions": 0,
              "invis_duration": 0,
              "invis_movespeed": 0,
              "AbilityManaCost": 0,
              "AbilityCooldown": 0
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。英雄普攻50%产生15%伤害幻象，最多10只、承伤6倍；省略幻象再分裂。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。英雄普攻50%产生15%伤害幻象，最多10只、承伤6倍；省略幻象再分裂。",
            "attack": {
              "chance": "proc_chance_pct",
              "ops": [
                {
                  "op": "summon",
                  "count": 1,
                  "hp": {
                    "stat": "maxHp"
                  },
                  "damage": {
                    "mul": [
                      {
                        "stat": "attack"
                      },
                      0.15
                    ]
                  },
                  "duration": "illusion_duration",
                  "interval": 1.7,
                  "range": 150,
                  "speed": 300,
                  "incoming": 6,
                  "maxCount": "max_illusions"
                }
              ]
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "phantom_lancer",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5065,
        5066,
        1221,
        5067
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1449,
          "key": "phantom_lancer_illusory_armaments",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=12",
          "description": "Whenever an illusion of Phantom Lancer is created, its outgoing damage cannot go below a fixed value for %duration% seconds.",
          "specialValues": [
            {
              "name": "outgoing_floor",
              "values_float": [
                17
              ],
              "is_percentage": true,
              "heading_loc": "MIN DAMAGE:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "duration",
              "values_float": [
                3
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_phantom_lancer_illusory_armaments_duration",
                  "value": 2,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1449
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "ATTACK_PURSUIT_V2"
      ]
    }
  },
  {
    "key": "puck",
    "definition": {
      "id": "valve_13",
      "registryNumericId": 24,
      "valveHeroId": 13,
      "packKey": "r20_55",
      "name": "帕克",
      "en": "Puck",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1392,
      "combatHp": 1392,
      "combatMana": 1126,
      "attack": 114,
      "move_speed": 232,
      "attack_range": 302.5,
      "attack_interval_s": 1.1356045424181695,
      "mana_regen": 4.88,
      "portrait": "assets/r20_55/puck-portrait.png",
      "render": "assets/r20_55/puck-render.png",
      "arenaStats": {
        "str": 57.8,
        "agi": 49.7,
        "int": 87.6
      },
      "abilities": [
        {
          "id": "puck_illusory_orb",
          "valveAbilityId": 5069,
          "slot": "S1",
          "name": "幻象法球",
          "en": "Illusory Orb",
          "icon": "assets/r20_55/puck_illusory_orb.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=13",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Vector Targeted. Puck launches a magic orb that travels along the path, damaging enemy units along the way. The orb deals an additional %damage_over_time_pct%%% of its impact damage every %damage_interval%s in its area of effect, but if it exceeds the max cast range it will be destroyed.\n\n At any point, Puck may teleport to the orb's location using Ethereal Jaunt.<br><br> Can be put on alt-cast to launch the Orb straight ahead.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 225,
              "max_distance": 1950,
              "orb_speed": 750,
              "orb_vision": 450,
              "vision_duration": 2.5,
              "damage": 280,
              "warning_sound_time": 0.25,
              "curve_orb": 1,
              "curve_orb_duration_multiplier": 100,
              "curve_orb_max_acceleration": 0.0015,
              "curve_orb_pullback_bonus_launch_speed": 0.25,
              "curve_strength": 0.6,
              "vector_reticle_distance": 200,
              "damage_over_time_pct": 3,
              "damage_interval": 0.5,
              "max_orb_duration_tooltip": 5.2,
              "AbilityCastRange": 1950,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 120,
              "AbilityCooldown": 9
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 9,
            "mana": 120,
            "range_wu": 1072.5,
            "startup_frames": 6,
            "recovery_frames": 12,
            "params": {
              "radius": 225,
              "max_distance": 1950,
              "orb_speed": 750,
              "orb_vision": 450,
              "vision_duration": 2.5,
              "damage": 280,
              "warning_sound_time": 0.25,
              "curve_orb": 1,
              "curve_orb_duration_multiplier": 100,
              "curve_orb_max_acceleration": 0.0015,
              "curve_orb_pullback_bonus_launch_speed": 0.25,
              "curve_strength": 0.6,
              "vector_reticle_distance": 200,
              "damage_over_time_pct": 3,
              "damage_interval": 0.5,
              "max_orb_duration_tooltip": 5.2,
              "AbilityCastRange": 1950,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 120,
              "AbilityCooldown": 9
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。水平可碰撞移动光球，扫掠命中一次并按0.5秒近域跳伤；S1再次按下免费跳至光球并销毁，无额外槽位。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "orb"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。水平可碰撞移动光球，扫掠命中一次并按0.5秒近域跳伤；S1再次按下免费跳至光球并销毁，无额外槽位。",
            "integrationRequirement": "SERIALIZED_PROJECTILE_RECAST_V2",
            "recast": true
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "puck_waning_rift",
          "valveAbilityId": 5071,
          "slot": "S2",
          "name": "新月之痕",
          "en": "Waning Rift",
          "icon": "assets/r20_55/puck_waning_rift.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=13",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Puck teleports to the target location and releases a burst of faerie dust that deals damage and silences enemy units nearby.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 400,
              "silence_duration": 3.5,
              "damage": 240,
              "max_distance": 350,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 130,
              "AbilityCooldown": 13
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 13,
            "mana": 130,
            "range_wu": 192.50000000000003,
            "startup_frames": 6,
            "recovery_frames": 12,
            "params": {
              "radius": 400,
              "silence_duration": 3.5,
              "damage": 240,
              "max_distance": 350,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 130,
              "AbilityCooldown": 13
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。朝瞄准方向最多350原距离位移，落地检查沉默半径。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "move",
                "to": "self",
                "mode": "aim"
              },
              {
                "op": "damage",
                "amount": "damage",
                "radius": "radius"
              },
              {
                "op": "status",
                "duration": "silence_duration",
                "values": {
                  "silence": true
                },
                "radius": "radius"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。朝瞄准方向最多350原距离位移，落地检查沉默半径。",
            "rangeParam": "max_distance"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "puck_phase_shift",
          "valveAbilityId": 5072,
          "slot": "S3",
          "name": "相位转移",
          "en": "Phase Shift",
          "icon": "assets/r20_55/puck_phase_shift.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=13",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "CHANNELED - Puck briefly shifts into another dimension where it is immune from harm.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 3.25,
              "shard_attack_range_bonus": 0,
              "shard_bonus_damage": 0,
              "AbilityChannelTime": 3.25,
              "AbilityCastPoint": 0.01,
              "AbilityCooldown": 6.5
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 6.5,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 1,
            "recovery_frames": 12,
            "params": {
              "duration": 3.25,
              "shard_attack_range_bonus": 0,
              "shard_bonus_damage": 0,
              "AbilityChannelTime": 3.25,
              "AbilityCastPoint": 0.01,
              "AbilityCooldown": 6.5
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。定点相位持续；任何主动打断结束无敌，不给予移动攻击。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "duration",
                "values": {
                  "invulnerable": true,
                  "channel": true
                },
                "dispel": "none"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。定点相位持续；任何主动打断结束无敌，不给予移动攻击。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "puck_dream_coil",
          "valveAbilityId": 5073,
          "slot": "S4",
          "name": "梦境缠绕",
          "en": "Dream Coil",
          "icon": "assets/r20_55/puck_dream_coil.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=13",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Creates a coil of volatile magic that latches onto enemy Heroes, damaging and leashing them.  If the enemy hero stretches the coil by moving too far away, it snaps, stunning and dealing additional damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "coil_duration": 6,
              "coil_break_radius": 600,
              "stun_duration": 0.5,
              "coil_initial_damage": 325,
              "coil_stun_duration": 2.5,
              "coil_break_damage": 400,
              "coil_radius": 375,
              "coil_rapid_fire_rate": 0,
              "coil_rapid_fire_z_offset": 0,
              "attack_rate_pct": 0,
              "AbilityCastRange": 750,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 225,
              "AbilityCooldown": 75
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 75,
            "mana": 225,
            "range_wu": 412.50000000000006,
            "startup_frames": 6,
            "recovery_frames": 12,
            "params": {
              "coil_duration": 6,
              "coil_break_radius": 600,
              "stun_duration": 0.5,
              "coil_initial_damage": 325,
              "coil_stun_duration": 2.5,
              "coil_break_damage": 400,
              "coil_radius": 375,
              "coil_rapid_fire_rate": 0,
              "coil_rapid_fire_z_offset": 0,
              "attack_rate_pct": 0,
              "AbilityCastRange": 750,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 225,
              "AbilityCooldown": 75
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。圈中心命中后锁存受击位置；位移离开600原距离断裂，二次伤害与眩晕；省略初始0.5秒打断。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "damage",
                "amount": "coil_initial_damage",
                "radius": "coil_radius",
                "center": "aim"
              },
              {
                "op": "leash",
                "duration": "coil_duration",
                "distance": "coil_break_radius",
                "damage": "coil_break_damage",
                "stun": "coil_stun_duration",
                "radius": "coil_radius",
                "center": "aim"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。圈中心命中后锁存受击位置；位移离开600原距离断裂，二次伤害与眩晕；省略初始0.5秒打断。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "puck",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5069,
        5071,
        5072,
        5073
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1222,
          "key": "puck_puckish",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=13",
          "description": "Whenever Puck disjoints an attack, it restores %mana_and_health_restore_pct%%% of its max health and mana. Dodging a targeted spell projectile restores %dodged_spell_multiplier%x that amount. Does not apply to attacks by Towers.",
          "specialValues": [
            {
              "name": "mana_and_health_restore_pct",
              "values_float": [
                3
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_puck_5",
                  "value": 2,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "dodged_spell_multiplier",
              "values_float": [
                3
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1222
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "SERIALIZED_PROJECTILE_RECAST_V2"
      ]
    }
  },
  {
    "key": "pugna",
    "definition": {
      "id": "valve_45",
      "registryNumericId": 43,
      "valveHeroId": 45,
      "packKey": "r20_55",
      "name": "帕格纳",
      "en": "Pugna",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1286,
      "combatHp": 1286,
      "combatMana": 1460,
      "attack": 140,
      "move_speed": 260,
      "attack_range": 346.5,
      "attack_interval_s": 1.187980433263452,
      "mana_regen": 6.520000000000001,
      "portrait": "assets/r20_55/pugna-portrait.png",
      "render": "assets/r20_55/pugna-render.png",
      "arenaStats": {
        "str": 53,
        "agi": 43.1,
        "int": 115.4
      },
      "abilities": [
        {
          "id": "pugna_nether_blast",
          "valveAbilityId": 5186,
          "slot": "S1",
          "name": "幽冥爆轰",
          "en": "Nether Blast",
          "icon": "assets/r20_55/pugna_nether_blast.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=45",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "An exploding pulse deals damage to enemies and structures in the area.  Deals %structure_damage_mod%%% damage to structures.",
            "profile": "level18-base-no-item",
            "semantic": {
              "structure_damage_mod": 65,
              "delay": 0.8,
              "radius": 400,
              "blast_damage": 320,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 145,
              "AbilityCooldown": 5
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 5,
            "mana": 145,
            "range_wu": 330,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "structure_damage_mod": 65,
              "delay": 0.8,
              "radius": 400,
              "blast_damage": 320,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 145,
              "AbilityCooldown": 5
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.8秒延迟地面爆炸，离开半径可躲避。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "delay",
                "delay": "delay",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "blast_damage",
                    "radius": "radius",
                    "center": "aim"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.8秒延迟地面爆炸，离开半径可躲避。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "pugna_decrepify",
          "valveAbilityId": 5187,
          "slot": "S2",
          "name": "衰老",
          "en": "Decrepify",
          "icon": "assets/r20_55/pugna_decrepify.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=45",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "A powerful banishing spell that slows a unit and renders it unable to attack or be attacked. Healing on affected allies is increased, while afflicted enemies take extra magic damage instead.",
            "profile": "level18-base-no-item",
            "semantic": {
              "bonus_heal_amp_pct_allies": 25,
              "bonus_spell_damage_pct": -50,
              "bonus_movement_speed": -60,
              "AbilityCastRange": 700,
              "AbilityDuration": 3.5,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 80,
              "AbilityCooldown": 7
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 7,
            "mana": 80,
            "range_wu": 385.00000000000006,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "bonus_heal_amp_pct_allies": 25,
              "bonus_spell_damage_pct": -50,
              "bonus_movement_speed": -60,
              "AbilityCastRange": 700,
              "AbilityDuration": 3.5,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 80,
              "AbilityCooldown": 7
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。敌方虚灵：物免禁攻、50%魔法易伤与60%慢速；不提供友军模式。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "status",
                "duration": "AbilityDuration",
                "values": {
                  "physicalImmune": true,
                  "disarm": true,
                  "magicVulnerable": 0.5,
                  "moveSlow": 0.6
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。敌方虚灵：物免禁攻、50%魔法易伤与60%慢速；不提供友军模式。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "pugna_nether_ward",
          "valveAbilityId": 5188,
          "slot": "S3",
          "name": "幽冥守卫",
          "en": "Nether Ward",
          "icon": "assets/r20_55/pugna_nether_ward.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=45",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Pugna places a Nether Ward at the target location. The ward will fire at any enemy hero who casts a spell dealing base damage plus the damage multiplier of the mana spent by the enemy hero.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 1400,
              "base_damage": 110,
              "mana_multiplier": 1.6,
              "attacks_to_destroy": 4,
              "nether_ward_gold_bounty": 80,
              "self_restoration_range": 1200,
              "AbilityCastRange": 175,
              "AbilityDuration": 30,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 80,
              "AbilityCooldown": 40
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 40,
            "mana": 80,
            "range_wu": 96.25000000000001,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "radius": 1400,
              "base_damage": 110,
              "mana_multiplier": 1.6,
              "attacks_to_destroy": 4,
              "nether_ward_gold_bounty": 80,
              "self_restoration_range": 1200,
              "AbilityCastRange": 175,
              "AbilityDuration": 30,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 80,
              "AbilityCooldown": 40
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。生成4普攻击破的固定守卫；敌方范围内每次已提交施法触发110+1.6×实际耗蓝反击，noReflect防反射环。零蓝技能仍受110基础伤害。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "netherWard"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。生成4普攻击破的固定守卫；敌方范围内每次已提交施法触发110+1.6×实际耗蓝反击，noReflect防反射环。零蓝技能仍受110基础伤害。",
            "integrationRequirement": "COMMITTED_MANA_EVENT_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "pugna_life_drain",
          "valveAbilityId": 5189,
          "slot": "S4",
          "name": "生命汲取",
          "en": "Life Drain",
          "icon": "assets/r20_55/pugna_life_drain.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=45",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "CHANNELED - When cast on an enemy, Pugna drains health from the target enemy unit to heal himself and granting vision over the target.\n\nWhen cast on an ally, Pugna will drain his own health into his ally.",
            "profile": "level18-base-no-item",
            "semantic": {
              "health_drain": 350,
              "ally_healing": 350,
              "tick_rate": 0.25,
              "drain_buffer": 200,
              "shard_damage_pct_from_ward": 0,
              "spell_amp_drain_rate": 0,
              "spell_amp_drain_max": 0,
              "spell_amp_drain_rate_ward": 0,
              "spell_amp_drain_duration": 0,
              "max_spell_amp_drain_pct": 0,
              "AbilityCastRange": 700,
              "AbilityChannelTime": 10,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 205,
              "AbilityCooldown": 7
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 7,
            "mana": 205,
            "range_wu": 385.00000000000006,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "health_drain": 350,
              "ally_healing": 350,
              "tick_rate": 0.25,
              "drain_buffer": 200,
              "shard_damage_pct_from_ward": 0,
              "spell_amp_drain_rate": 0,
              "spell_amp_drain_max": 0,
              "spell_amp_drain_rate_ward": 0,
              "spell_amp_drain_duration": 0,
              "max_spell_amp_drain_pct": 0,
              "AbilityCastRange": 700,
              "AbilityChannelTime": 10,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 205,
              "AbilityCooldown": 7
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。敌方持续吸血，治疗仅实际伤害；超900原距离断开，不提供友方输血。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "area",
                "duration": "AbilityChannelTime",
                "interval": "tick_rate",
                "radius": {
                  "add": [
                    "AbilityCastRange",
                    "drain_buffer"
                  ]
                },
                "ops": [
                  {
                    "op": "damage",
                    "amount": {
                      "mul": [
                        "health_drain",
                        "tick_rate"
                      ]
                    },
                    "healFraction": 1
                  }
                ],
                "channel": true,
                "follow": true,
                "breakOnRange": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。敌方持续吸血，治疗仅实际伤害；超900原距离断开，不提供友方输血。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "pugna",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5186,
        5187,
        5188,
        5189
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1288,
          "key": "pugna_oblivion_savant",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=45",
          "description": "Pugna can cast spells and use items while channeling.\n\nPugna receives %tower_scale%%% spell amplification per destroyed tower.",
          "specialValues": [
            {
              "name": "tower_scale",
              "values_float": [
                1.5
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "spell_amp_tooltip",
              "values_float": [
                0
              ],
              "is_percentage": true,
              "heading_loc": "SPELL AMP:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1288
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "COMMITTED_MANA_EVENT_V2"
      ]
    }
  },
  {
    "key": "rattletrap",
    "definition": {
      "id": "valve_51",
      "registryNumericId": 49,
      "valveHeroId": 51,
      "packKey": "r20_55",
      "name": "发条技师",
      "en": "Clockwerk",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1889,
      "combatHp": 1889,
      "combatMana": 638,
      "attack": 105,
      "move_speed": 248,
      "attack_range": 90,
      "attack_interval_s": 1.1176857330703485,
      "mana_regen": 2.34500004,
      "portrait": "assets/r20_55/rattletrap-portrait.png",
      "render": "assets/r20_55/rattletrap-render.png",
      "arenaStats": {
        "str": 80.4,
        "agi": 52.099999999999994,
        "int": 46.9
      },
      "abilities": [
        {
          "id": "rattletrap_battery_assault",
          "valveAbilityId": 5237,
          "slot": "S1",
          "name": "弹幕冲击",
          "en": "Battery Assault",
          "icon": "assets/r20_55/rattletrap_battery_assault.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=51",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Discharges high-powered shrapnel at random nearby enemy units, dealing minor magical damage and ministun.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 275,
              "overclocking_radius": 330,
              "duration": 10.5,
              "interval": 0.7,
              "damage": 95,
              "creep_damage_multiplier": 1,
              "AbilityManaCost": 90,
              "AbilityCooldown": 18
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 18,
            "mana": 90,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "radius": 275,
              "overclocking_radius": 330,
              "duration": 10.5,
              "interval": 0.7,
              "damage": 95,
              "creep_damage_multiplier": 1,
              "AbilityManaCost": 90,
              "AbilityCooldown": 18
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。近身每0.7秒95魔伤和0.1秒短晕，共15次；死亡停止。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "area",
                "duration": "duration",
                "interval": "interval",
                "radius": "radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "damage"
                  },
                  {
                    "op": "status",
                    "duration": 0.1,
                    "values": {
                      "stun": true
                    },
                    "dispel": "strong"
                  }
                ],
                "follow": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。近身每0.7秒95魔伤和0.1秒短晕，共15次；死亡停止。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "rattletrap_power_cogs",
          "valveAbilityId": 5238,
          "slot": "S2",
          "name": "能量齿轮",
          "en": "Power Cogs",
          "icon": "assets/r20_55/rattletrap_power_cogs.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=51",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Forms a ring of energized cogs around Clockwerk, trapping any units that are near. Enemies outside the trap that touch a cog are knocked back, losing health and mana. Once a cog has delivered a shock, it will power down. Damage is increased by %mana_burn_as_damage_pct%%% of the mana burned.<br><br> Cogs can be destroyed by enemy attacks, but Clockwerk can push them up to %projectile_distance% distance away with one hit. Clockwerk can move through the cogs freely, disabling them as he passes over.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 8,
              "damage": 220,
              "mana_burn": 145,
              "mana_burn_as_damage_pct": 50,
              "attacks_to_destroy": 2,
              "push_length": 300,
              "push_duration": 0.7,
              "cogs_radius": 215,
              "trigger_distance": 185,
              "inside_cogs_distance_reduction": 50,
              "extra_pull_buffer": -10,
              "projectile_distance": 1000,
              "projectile_speed": 1000,
              "push_duration_overclock": 0.6,
              "cogs_radius_overclock": 330,
              "trigger_distance_overclock": 115,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 90,
              "AbilityCooldown": 15
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 15,
            "mana": 90,
            "range_wu": 0,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "duration": 8,
              "damage": 220,
              "mana_burn": 145,
              "mana_burn_as_damage_pct": 50,
              "attacks_to_destroy": 2,
              "push_length": 300,
              "push_duration": 0.7,
              "cogs_radius": 215,
              "trigger_distance": 185,
              "inside_cogs_distance_reduction": 50,
              "extra_pull_buffer": -10,
              "projectile_distance": 1000,
              "projectile_speed": 1000,
              "push_duration_overclock": 0.6,
              "cogs_radius_overclock": 330,
              "trigger_distance_overclock": 115,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 90,
              "AbilityCooldown": 15
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。二维左右各一可攻击齿轮，2次攻击摧毁；敌穿越边界触发一次220+实际烧蓝×50%伤害、最多烧145蓝并击退。主人通行，省略击飞齿轮远程弹体。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "cogs"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。二维左右各一可攻击齿轮，2次攻击摧毁；敌穿越边界触发一次220+实际烧蓝×50%伤害、最多烧145蓝并击退。主人通行，省略击飞齿轮远程弹体。",
            "integrationRequirement": "DESTRUCTIBLE_BOUNDARIES_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "rattletrap_rocket_flare",
          "valveAbilityId": 5239,
          "slot": "S3",
          "name": "照明火箭",
          "en": "Rocket Flare",
          "icon": "assets/r20_55/rattletrap_rocket_flare.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=51",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Fires a global range flare that explodes over a given area. Upon impact, enemies in the area take damage and are briefly slowed. Rocket flare provides vision over the impact area for %duration% seconds.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 600,
              "duration": 6,
              "speed": 2250,
              "damage": 200,
              "slow_pct": 100,
              "slow_duration": 0.4,
              "projectile_vision_radius": 250,
              "projectile_vision_duration": 1,
              "projectile_vision_tick_rate": 0.15,
              "AbilityCastPoint": 0.3,
              "AbilityChargeRestoreTime": 14,
              "AbilityManaCost": 50,
              "AbilityCooldown": 14
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 14,
            "mana": 50,
            "range_wu": 0,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "radius": 600,
              "duration": 6,
              "speed": 2250,
              "damage": 200,
              "slow_pct": 100,
              "slow_duration": 0.4,
              "projectile_vision_radius": 250,
              "projectile_vision_duration": 1,
              "projectile_vision_tick_rate": 0.15,
              "AbilityCastPoint": 0.3,
              "AbilityChargeRestoreTime": 14,
              "AbilityManaCost": 50,
              "AbilityCooldown": 14
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.5秒竞技飞行后范围200魔伤/短慢；整张竞技场可选点，省略飞行视野。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "delay",
                "delay": 0.5,
                "ops": [
                  {
                    "op": "damage",
                    "amount": "damage",
                    "radius": "radius",
                    "center": "aim"
                  },
                  {
                    "op": "status",
                    "duration": "slow_duration",
                    "values": {
                      "moveSlow": 1,
                      "revealed": true
                    },
                    "radius": "radius",
                    "center": "aim"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.5秒竞技飞行后范围200魔伤/短慢；整张竞技场可选点，省略飞行视野。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "rattletrap_hookshot",
          "valveAbilityId": 5240,
          "slot": "S4",
          "name": "发射钩爪",
          "en": "Hookshot",
          "icon": "assets/r20_55/rattletrap_hookshot.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=51",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 3,
            "dispelCode": 1,
            "description": "Fires a grappling device rapidly at the target location.  If the hook hits a unit, Clockwerk launches himself into the target, stunning and dealing damage to everyone in a %stun_radius% radius around the hit target. Any enemies Clockwerk collides with along the way are damaged and stunned.",
            "profile": "level18-base-no-item",
            "semantic": {
              "latch_radius": 125,
              "stun_radius": 175,
              "radius_ally": 175,
              "duration": 1.6,
              "speed": 6000,
              "damage": 275,
              "AbilityCastRange": 3000,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 150,
              "AbilityCooldown": 30
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 30,
            "mana": 150,
            "range_wu": 1650.0000000000002,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "latch_radius": 125,
              "stun_radius": 175,
              "radius_ally": 175,
              "duration": 1.6,
              "speed": 6000,
              "damage": 275,
              "AbilityCastRange": 3000,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 150,
              "AbilityCooldown": 30
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。视为锁定敌方的钩索突进和眩晕；省略路径截获与多个单位碰撞。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "move",
                "to": "self",
                "mode": "behind"
              },
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong",
                "pierces": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。视为锁定敌方的钩索突进和眩晕；省略路径截获与多个单位碰撞。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "rattletrap",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5237,
        5238,
        5239,
        5240
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1295,
          "key": "rattletrap_armor_power",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=51",
          "description": "Clockwerk's outgoing damage increases by %damage_per_armor%%% per point of armor.\n\nClockwerk can consume Chainmails to permanently gain +%armor_per_chainmail% armor per Chainmail consumed. Can stack. Self-cast to consume.",
          "specialValues": [
            {
              "name": "damage_per_armor",
              "values_float": [
                0.25
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "damage_tooltip",
              "values_float": [
                0
              ],
              "is_percentage": true,
              "heading_loc": "OUTGOING DAMAGE BONUS:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "can_consume_chainmail",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "armor_per_chainmail",
              "values_float": [
                4
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "model_scale_per_chainmail",
              "values_float": [
                5
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "model_scale_maximum",
              "values_float": [
                125
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "health_bar_offset_per_stack",
              "values_float": [
                6
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        321,
        630,
        1295
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "DESTRUCTIBLE_BOUNDARIES_V2"
      ]
    }
  },
  {
    "key": "riki",
    "definition": {
      "id": "valve_32",
      "registryNumericId": 33,
      "valveHeroId": 32,
      "packKey": "r20_55",
      "name": "力丸",
      "en": "Riki",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1264,
      "combatHp": 1264,
      "combatMana": 508,
      "attack": 95,
      "move_speed": 252,
      "attack_range": 90,
      "attack_interval_s": 0.9953161592505855,
      "mana_regen": 1.8050000000000002,
      "portrait": "assets/r20_55/riki-portrait.png",
      "render": "assets/r20_55/riki-render.png",
      "arenaStats": {
        "str": 52,
        "agi": 70.8,
        "int": 36.1
      },
      "abilities": [
        {
          "id": "riki_smoke_screen",
          "valveAbilityId": 5142,
          "slot": "S1",
          "name": "烟幕",
          "en": "Smoke Screen",
          "icon": "assets/r20_55/riki_smoke_screen.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=32",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Throws down a smoke bomb, silencing enemies and causing them to miss attacks.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 425,
              "miss_rate": 70,
              "block_targeting": 0,
              "armor_reduction": 0,
              "AbilityCastRange": 550,
              "AbilityDuration": 6,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 75,
              "AbilityCooldown": 12
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 12,
            "mana": 75,
            "range_wu": 302.5,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "radius": 425,
              "miss_rate": 70,
              "block_targeting": 0,
              "armor_reduction": 0,
              "AbilityCastRange": 550,
              "AbilityDuration": 6,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 75,
              "AbilityCooldown": 12
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。烟区内沉默和70%落空，离区0.15秒解除。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "area",
                "duration": "AbilityDuration",
                "interval": 0.1,
                "radius": "radius",
                "ops": [
                  {
                    "op": "status",
                    "duration": 0.15,
                    "values": {
                      "silence": true,
                      "missChance": {
                        "div": [
                          "miss_rate",
                          100
                        ]
                      }
                    }
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。烟区内沉默和70%落空，离区0.15秒解除。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "riki_blink_strike",
          "valveAbilityId": 5143,
          "slot": "S2",
          "name": "闪烁突袭",
          "en": "Blink Strike",
          "icon": "assets/r20_55/riki_blink_strike.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=32",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Teleports behind the target unit, momentarily slowing them by %slow_pct_tooltip%%% and attacking them with bonus damage if it is an enemy.",
            "profile": "level18-base-no-item",
            "semantic": {
              "bonus_damage": 55,
              "slow": 0.75,
              "slow_pct_tooltip": 100,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 65,
              "AbilityCooldown": 4
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 4,
            "mana": 65,
            "range_wu": 495.00000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "bonus_damage": 55,
              "slow": 0.75,
              "slow_pct_tooltip": 100,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 65,
              "AbilityCooldown": 4
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。移至敌身后并结算一次攻击力+55；省略普攻被动联动。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "move",
                "to": "self",
                "mode": "behind"
              },
              {
                "op": "damage",
                "amount": {
                  "add": [
                    {
                      "stat": "attack"
                    },
                    "bonus_damage"
                  ]
                },
                "type": "physical"
              },
              {
                "op": "status",
                "duration": "slow",
                "values": {
                  "moveSlow": 1
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。移至敌身后并结算一次攻击力+55；省略普攻被动联动。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "riki_tricks_of_the_trade",
          "valveAbilityId": 5145,
          "slot": "S3",
          "name": "绝杀秘技",
          "en": "Tricks of the Trade",
          "icon": "assets/r20_55/riki_tricks_of_the_trade.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=32",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "CHANNELED - Riki phases out of the world and periodically strikes %interval_targets% random enemy units from behind in an area around him. He has fixed attack damage while phased out.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 425,
              "attack_count": 4,
              "speed_per_attack": 180,
              "interval_targets": 2,
              "attack_damage": 100,
              "pocket_riki_enabled": 0,
              "scepter_movespeed": 0,
              "scepter_bonus_duration": 0,
              "scepter_bonus_attacks": 0,
              "creep_agility_multiplier": 1,
              "AbilityCastRange": 400,
              "AbilityChannelTime": 2,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 65,
              "AbilityCooldown": 12
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 12,
            "mana": 65,
            "range_wu": 220.00000000000003,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "radius": 425,
              "attack_count": 4,
              "speed_per_attack": 180,
              "interval_targets": 2,
              "attack_damage": 100,
              "pocket_riki_enabled": 0,
              "scepter_movespeed": 0,
              "scepter_bonus_duration": 0,
              "scepter_bonus_attacks": 0,
              "creep_agility_multiplier": 1,
              "AbilityCastRange": 400,
              "AbilityChannelTime": 2,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 65,
              "AbilityCooldown": 12
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。相位期间四次100固定攻击伤害；不执行额外背刺或攻击修饰器。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "status",
                "to": "self",
                "duration": "AbilityChannelTime",
                "values": {
                  "invulnerable": true,
                  "channel": true
                },
                "dispel": "none"
              },
              {
                "op": "area",
                "duration": "AbilityChannelTime",
                "interval": {
                  "div": [
                    "AbilityChannelTime",
                    "attack_count"
                  ]
                },
                "radius": "radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "attack_damage",
                    "type": "physical"
                  }
                ],
                "follow": true,
                "channel": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。相位期间四次100固定攻击伤害；不执行额外背刺或攻击修饰器。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "riki_backstab",
          "valveAbilityId": 5144,
          "slot": "S4",
          "name": "刀光谍影",
          "en": "Cloak and Dagger",
          "icon": "assets/r20_55/riki_backstab.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=32",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Riki fades into the shadows, becoming invisible until he attacks. Hero kills and assists grant additional experience.",
            "profile": "level18-base-no-item",
            "semantic": {
              "fade_delay": 2,
              "bonus_xp_kill": 390,
              "bonus_xp_assist": 100
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "fade_delay": 2,
              "bonus_xp_kill": 390,
              "bonus_xp_assist": 100
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。静默2秒后自动隐身，普攻或技能重新计时，破被动取消；不套用旧版敏捷背刺，固定18级省略经验收益。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。静默2秒后自动隐身，普攻或技能重新计时，破被动取消；不套用旧版敏捷背刺，固定18级省略经验收益。",
            "dynamic": "riki_invisibility",
            "integrationRequirement": "ACTION_VISIBILITY_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "riki",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5142,
        5143,
        5145,
        5144
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1258,
          "key": "riki_innate_backstab",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=32",
          "description": "Every time Riki strikes his enemy from behind, he deals additional bonus damage equal to a multiple of his Agility.",
          "specialValues": [
            {
              "name": "damage_multiplier",
              "values_float": [
                0.55
              ],
              "is_percentage": false,
              "heading_loc": "AGILITY MULTIPLIER:",
              "bonuses": [
                {
                  "name": "special_bonus_unique_riki_1",
                  "value": 0.3,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "ally_multiplier",
              "values_float": [
                30
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "backstab_angle",
              "values_float": [
                105
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "bonus_xp_kill",
              "values_float": [
                0,
                0,
                0,
                0
              ],
              "is_percentage": false,
              "heading_loc": "BONUS XP HERO KILL:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "riki_contract_killer",
                "values": [
                  25,
                  150,
                  250,
                  350
                ],
                "operation": 0
              },
              "required_facet": "riki_contract_killer"
            },
            {
              "name": "bonus_xp_assist",
              "values_float": [
                0,
                0,
                0,
                0
              ],
              "is_percentage": false,
              "heading_loc": "BONUS XP ASSIST:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "riki_contract_killer",
                "values": [
                  25,
                  75,
                  125,
                  175
                ],
                "operation": 0
              },
              "required_facet": "riki_contract_killer"
            },
            {
              "name": "bonus_xp_assist_other",
              "values_float": [
                0,
                0,
                0,
                0
              ],
              "is_percentage": false,
              "heading_loc": "BONUS XP WARD/COURIER KILL:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "riki_contract_killer",
                "values": [
                  25,
                  75,
                  125,
                  175
                ],
                "operation": 0
              },
              "required_facet": "riki_contract_killer"
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1258
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "ACTION_VISIBILITY_V2"
      ]
    }
  },
  {
    "key": "sand_king",
    "definition": {
      "id": "valve_16",
      "registryNumericId": 26,
      "valveHeroId": 16,
      "packKey": "r20_55",
      "name": "沙王",
      "en": "Sand King",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1561,
      "combatHp": 1561,
      "combatMana": 687,
      "attack": 101,
      "move_speed": 232,
      "attack_range": 90,
      "attack_interval_s": 1.1111111111111112,
      "mana_regen": 2.5500000000000003,
      "portrait": "assets/r20_55/sand_king-portrait.png",
      "render": "assets/r20_55/sand_king-render.png",
      "arenaStats": {
        "str": 65.5,
        "agi": 53,
        "int": 51
      },
      "abilities": [
        {
          "id": "sandking_burrowstrike",
          "valveAbilityId": 5102,
          "slot": "S1",
          "name": "掘地穿刺",
          "en": "Burrowstrike",
          "icon": "assets/r20_55/sandking_burrowstrike.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=16",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "Sand King burrows into the ground and tunnels forward, damaging and stunning enemy units above him as he resurfaces. Adds Caustic Finale poison to heroes hit<br><br> Can be put on alt-cast to immediately cast in the desired direction, without walking towards the targeted location.",
            "profile": "level18-base-no-item",
            "semantic": {
              "burrow_width": 150,
              "burrow_duration": 1.8,
              "burrow_speed": 2000,
              "burrow_anim_time": 0.52,
              "AbilityDamage": 290,
              "AbilityCastRange": 775,
              "AbilityManaCost": 130,
              "AbilityCooldown": 11
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 11,
            "mana": 130,
            "range_wu": 426.25000000000006,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "burrow_width": 150,
              "burrow_duration": 1.8,
              "burrow_speed": 2000,
              "burrow_anim_time": 0.52,
              "AbilityDamage": 290,
              "AbilityCastRange": 775,
              "AbilityManaCost": 130,
              "AbilityCooldown": 11
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。直接地下位移，在终点邻域命中；省略沿途碰撞与未实现腐蚀毒。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "move",
                "to": "self",
                "mode": "aim"
              },
              {
                "op": "damage",
                "amount": "AbilityDamage",
                "radius": "burrow_width"
              },
              {
                "op": "status",
                "duration": "burrow_duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong",
                "radius": "burrow_width"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。直接地下位移，在终点邻域命中；省略沿途碰撞与未实现腐蚀毒。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "sandking_sand_storm",
          "valveAbilityId": 5103,
          "slot": "S2",
          "name": "沙尘暴",
          "en": "Sand Storm",
          "icon": "assets/r20_55/sandking_sand_storm.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=16",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "Sand King creates a fearsome sandstorm that damages enemy units and grants Sand King Invisibility while he is in it. The effect ends when Sand King leaves the area.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage_tick_rate": 0.2,
              "sand_storm_radius": 700,
              "sand_storm_damage": 90,
              "fade_delay": 0.7,
              "AbilityDuration": 28,
              "AbilityManaCost": 85,
              "AbilityCooldown": 22
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 22,
            "mana": 85,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "damage_tick_rate": 0.2,
              "sand_storm_radius": 700,
              "sand_storm_damage": 90,
              "fade_delay": 0.7,
              "AbilityDuration": 28,
              "AbilityManaCost": 85,
              "AbilityCooldown": 22
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定中心沙暴；攻击或施法显形，0.7秒无动作后再隐身；离开范围结束沙暴和隐身。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "area",
                "duration": "AbilityDuration",
                "interval": "damage_tick_rate",
                "radius": "sand_storm_radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": {
                      "mul": [
                        "sand_storm_damage",
                        "damage_tick_rate"
                      ]
                    }
                  }
                ],
                "cancelOnLeave": true,
                "conceal": "fade_delay"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定中心沙暴；攻击或施法显形，0.7秒无动作后再隐身；离开范围结束沙暴和隐身。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "sandking_scorpion_strike",
          "valveAbilityId": 1229,
          "slot": "S3",
          "name": "尾刺",
          "en": "Stinger",
          "icon": "assets/r20_55/sandking_scorpion_strike.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=16",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Sand King strikes an area, performing an attack on all enemies in the area of effect, dealing extra damage to each. Enemies within an innermost radius of %inner_radius% take %inner_radius_bonus_damage_pct%%% extra damage. Applies Caustic Finale and a slow to all enemies hit.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 290,
              "inner_radius": 125,
              "inner_radius_bonus_damage_pct": 40,
              "attack_damage": 125,
              "debuff_duration": 5,
              "strike_slow": 16,
              "AbilityCastRange": 200,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 50,
              "AbilityCooldown": 6
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 6,
            "mana": 50,
            "range_wu": 110.00000000000001,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "radius": 290,
              "inner_radius": 125,
              "inner_radius_bonus_damage_pct": 40,
              "attack_damage": 125,
              "debuff_duration": 5,
              "strike_slow": 16,
              "AbilityCastRange": 200,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 50,
              "AbilityCooldown": 6
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。攻击力+固定额外伤害，地面邻域；省略内圈加伤和未接入的腐蚀毒，需整合真实攻击修饰器。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "damage",
                "amount": {
                  "add": [
                    {
                      "stat": "attack"
                    },
                    "attack_damage"
                  ]
                },
                "type": "physical",
                "radius": "radius",
                "center": "aim"
              },
              {
                "op": "status",
                "duration": "debuff_duration",
                "values": {
                  "moveSlow": {
                    "div": [
                      "strike_slow",
                      100
                    ]
                  }
                },
                "radius": "radius",
                "center": "aim"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。攻击力+固定额外伤害，地面邻域；省略内圈加伤和未接入的腐蚀毒，需整合真实攻击修饰器。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "sandking_epicenter",
          "valveAbilityId": 5105,
          "slot": "S4",
          "name": "地震",
          "en": "Epicenter",
          "icon": "assets/r20_55/sandking_epicenter.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=16",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 3,
            "description": "After a cast point of %abilitycastpoint% seconds, Sand King sends a disturbance into the earth, causing it to shudder violently. All enemies caught within range will take damage and become slowed. Each subsequent pulse increases the radius of damage dealt.",
            "profile": "level18-base-no-item",
            "semantic": {
              "epicenter_pulses": 20,
              "epicenter_damage": 80,
              "epicenter_radius_base": 450,
              "epicenter_radius_increment": 13,
              "epicenter_slow": -50,
              "epicenter_slow_as": -50,
              "proc_passively": 0,
              "shard_radius": 0,
              "shard_interval": 3,
              "linger_duration": 3,
              "scepter_explosion_radius_pct": 0,
              "scepter_explosion_min_dist": 0,
              "scepter_explosions_per_pulse": 0,
              "spine_tick_rate": 0,
              "spine_damage_pct": 0,
              "shard_explosions_per_pulse": 0,
              "AbilityDuration": 6,
              "AbilityCastPoint": 2,
              "AbilityManaCost": 300,
              "AbilityCooldown": 100
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 100,
            "mana": 300,
            "range_wu": 0,
            "startup_frames": 120,
            "recovery_frames": 12,
            "params": {
              "epicenter_pulses": 20,
              "epicenter_damage": 80,
              "epicenter_radius_base": 450,
              "epicenter_radius_increment": 13,
              "epicenter_slow": -50,
              "epicenter_slow_as": -50,
              "proc_passively": 0,
              "shard_radius": 0,
              "shard_interval": 3,
              "linger_duration": 3,
              "scepter_explosion_radius_pct": 0,
              "scepter_explosion_min_dist": 0,
              "scepter_explosions_per_pulse": 0,
              "spine_tick_rate": 0,
              "spine_damage_pct": 0,
              "shard_explosions_per_pulse": 0,
              "AbilityDuration": 6,
              "AbilityCastPoint": 2,
              "AbilityManaCost": 300,
              "AbilityCooldown": 100
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。2秒起手后20脉冲，半径递增并跟随施法者，死亡停止。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "area",
                "duration": "AbilityDuration",
                "interval": {
                  "div": [
                    "AbilityDuration",
                    "epicenter_pulses"
                  ]
                },
                "radius": "epicenter_radius_base",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "epicenter_damage"
                  },
                  {
                    "op": "status",
                    "duration": "linger_duration",
                    "values": {
                      "moveSlow": 0.5,
                      "attackSlow": 50
                    }
                  }
                ],
                "follow": true,
                "growth": "epicenter_radius_increment"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。2秒起手后20脉冲，半径递增并跟随施法者，死亡停止。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "sand_king",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5102,
        5103,
        1229,
        5105
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1226,
          "key": "sandking_caustic_finale",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=16",
          "description": "Sand King's attacks inject a venom that causes enemy units to violently explode when they die that does a flat amount of damage and an additional amount based on the dying units max health.",
          "specialValues": [
            {
              "name": "caustic_finale_radius",
              "values_float": [
                400
              ],
              "is_percentage": false,
              "heading_loc": "EXPLODE RADIUS:",
              "bonuses": [
                {
                  "name": "special_bonus_unique_sand_king_caustic_finale_radius",
                  "value": 100,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "caustic_finale_damage_flat",
              "values_float": [
                17
              ],
              "is_percentage": false,
              "heading_loc": "BASE DAMAGE:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "caustic_finale_damage_pct",
              "values_float": [
                2.5
              ],
              "is_percentage": true,
              "heading_loc": "MAX HEALTH DAMAGE:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "caustic_finale_duration",
              "values_float": [
                4.5
              ],
              "is_percentage": false,
              "heading_loc": "DURATION:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1226
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "shadow_shaman",
    "definition": {
      "id": "valve_27",
      "registryNumericId": 30,
      "valveHeroId": 27,
      "packKey": "r20_55",
      "name": "暗影萨满",
      "en": "Shadow Shaman",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1420,
      "combatHp": 1420,
      "combatMana": 1024,
      "attack": 123,
      "move_speed": 228,
      "attack_range": 220.00000000000003,
      "attack_interval_s": 1.187150837988827,
      "mana_regen": 3.9549999999999996,
      "portrait": "assets/r20_55/shadow_shaman-portrait.png",
      "render": "assets/r20_55/shadow_shaman-render.png",
      "arenaStats": {
        "str": 59.099999999999994,
        "agi": 43.2,
        "int": 79.1
      },
      "abilities": [
        {
          "id": "shadow_shaman_ether_shock",
          "valveAbilityId": 5078,
          "slot": "S1",
          "name": "苍穹震击",
          "en": "Ether Shock",
          "icon": "assets/r20_55/shadow_shaman_ether_shock.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=27",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Creates a cone of ethereal energy that strikes multiple enemy units.",
            "profile": "level18-base-no-item",
            "semantic": {
              "start_radius": 200,
              "end_radius": 300,
              "end_distance": 600,
              "targets": 9,
              "damage": 320,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 135,
              "AbilityCooldown": 8
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 8,
            "mana": 135,
            "range_wu": 330,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "start_radius": 200,
              "end_radius": 300,
              "end_distance": 600,
              "targets": 9,
              "damage": 320,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 135,
              "AbilityCooldown": 8
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单对手锥形震击，范围内直接命中；省略多单位分支。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单对手锥形震击，范围内直接命中；省略多单位分支。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "shadow_shaman_voodoo",
          "valveAbilityId": 5079,
          "slot": "S2",
          "name": "妖术",
          "en": "Hex",
          "icon": "assets/r20_55/shadow_shaman_voodoo.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=27",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "Transforms an enemy unit into a harmless creature, disabling their attacks and abilities.",
            "profile": "level18-base-no-item",
            "semantic": {
              "movespeed": 100,
              "duration": 2.9,
              "AbilityCastRange": 550,
              "AbilityManaCost": 190,
              "AbilityCooldown": 12
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 12,
            "mana": 190,
            "range_wu": 302.5,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "movespeed": 100,
              "duration": 2.9,
              "AbilityCastRange": 550,
              "AbilityManaCost": 190,
              "AbilityCooldown": 12
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。变形禁攻禁技能，70%减速为竞技适配；控制1.5秒上限。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "hex": true,
                  "moveSlow": 0.7
                },
                "dispel": "strong"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。变形禁攻禁技能，70%减速为竞技适配；控制1.5秒上限。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "shadow_shaman_shackles",
          "valveAbilityId": 5080,
          "slot": "S3",
          "name": "枷锁",
          "en": "Shackles",
          "icon": "assets/r20_55/shadow_shaman_shackles.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=27",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "CHANNELED - Magically binds an enemy unit so that it cannot move or attack, absorbing their life energy over time.",
            "profile": "level18-base-no-item",
            "semantic": {
              "tick_interval": 0.1,
              "total_damage": 280,
              "channel_time": 4.2,
              "ward_linger_duration": 0,
              "heal_percentage": 100,
              "scepter_shock_pct": 0,
              "scepter_shock_radius": 0,
              "scepter_shock_interval": 0,
              "alt_cast_on_allies": 0,
              "ally_break_range": 0,
              "AbilityCastRange": 450,
              "AbilityChannelTime": 4.2,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 170,
              "AbilityCooldown": 11
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 11,
            "mana": 170,
            "range_wu": 247.50000000000003,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "tick_interval": 0.1,
              "total_damage": 280,
              "channel_time": 4.2,
              "ward_linger_duration": 0,
              "heal_percentage": 100,
              "scepter_shock_pct": 0,
              "scepter_shock_radius": 0,
              "scepter_shock_interval": 0,
              "alt_cast_on_allies": 0,
              "ally_break_range": 0,
              "AbilityCastRange": 450,
              "AbilityChannelTime": 4.2,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 170,
              "AbilityCooldown": 11
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。4.2秒持续施法，280总伤害并按实际伤害自疗；控制保护由核心接管。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "area",
                "duration": "channel_time",
                "interval": "tick_interval",
                "radius": 450,
                "ops": [
                  {
                    "op": "damage",
                    "amount": {
                      "mul": [
                        {
                          "div": [
                            "total_damage",
                            "channel_time"
                          ]
                        },
                        "tick_interval"
                      ]
                    },
                    "healFraction": {
                      "div": [
                        "heal_percentage",
                        100
                      ]
                    }
                  },
                  {
                    "op": "status",
                    "duration": 0.1,
                    "values": {
                      "stun": true
                    },
                    "dispel": "strong"
                  }
                ],
                "follow": true,
                "channel": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。4.2秒持续施法，280总伤害并按实际伤害自疗；控制保护由核心接管。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "shadow_shaman_mass_serpent_ward",
          "valveAbilityId": 5081,
          "slot": "S4",
          "name": "群蛇守卫",
          "en": "Mass Serpent Ward",
          "icon": "assets/r20_55/shadow_shaman_mass_serpent_ward.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=27",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Summons %ward_count% Serpent Wards to attack enemy units and structures. The Wards are immune to magic. Creeps deal half damage to the Serpent Ward.",
            "profile": "level18-base-no-item",
            "semantic": {
              "ward_count": 10,
              "duration": 45,
              "spawn_radius": 150,
              "hits_to_destroy_tooltip": 2,
              "ward_health": 4,
              "ward_damage_tooltip": 120,
              "mega_ward_multiplier_damage": 4,
              "mega_ward_multiplier_health": 4,
              "mega_ward_health_tooltip": 8,
              "mega_ward_damage_tooltip": 480,
              "mega_ward_model_scale_multiplier": 2,
              "AbilityCastRange": 550,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 550,
              "AbilityCooldown": 100
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 100,
            "mana": 550,
            "range_wu": 302.5,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "ward_count": 10,
              "duration": 45,
              "spawn_radius": 150,
              "hits_to_destroy_tooltip": 2,
              "ward_health": 4,
              "ward_damage_tooltip": 120,
              "mega_ward_multiplier_damage": 4,
              "mega_ward_multiplier_health": 4,
              "mega_ward_health_tooltip": 8,
              "mega_ward_damage_tooltip": 480,
              "mega_ward_model_scale_multiplier": 2,
              "AbilityCastRange": 550,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 550,
              "AbilityCooldown": 100
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。10支自主固定蛇棒，每1.5秒攻击600原距离为竞技参数；每棒2次普攻击破、魔免，无手选。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "summon",
                "count": "ward_count",
                "hp": 2,
                "damage": "ward_damage_tooltip",
                "duration": "duration",
                "interval": 1.5,
                "range": 600,
                "speed": 0,
                "hitBased": true,
                "magicImmune": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。10支自主固定蛇棒，每1.5秒攻击600原距离为竞技参数；每棒2次普攻击破、魔免，无手选。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "shadow_shaman",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5078,
        5079,
        5080,
        5081
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1250,
          "key": "shadow_shaman_fowl_play",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=27",
          "description": "When taking lethal damage, Shadow Shaman receives a strong dispel and survives as a 1 HP chicken with increased movement speed. Incoming damage is reduced to zero for a short duration and additional chickens are created to confuse the enemy. Cooldown resets when Shadow Shaman respawns.\n\nDISPEL TYPE: Strong Dispel",
          "specialValues": [
            {
              "name": "hex_duration",
              "values_float": [
                3
              ],
              "is_percentage": false,
              "heading_loc": "DURATION:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "movespeed_bonus_pct",
              "values_float": [
                5
              ],
              "is_percentage": true,
              "heading_loc": "MOVESPEED BONUS:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "total_chickens",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "TOTAL CHICKENS:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "damage_reduction_duration",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "INVULNERABLE TIME:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "damage_reduction_pct",
              "values_float": [
                100
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "levels_per_chicken",
              "values_float": [
                6
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "invuln_duration",
              "values_float": [
                0.1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "ally_chicken_images_take_damage_percent",
              "values_float": [
                200
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "AbilityCooldown",
              "values_float": [
                120
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1250,
        1743
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "skeleton_king",
    "definition": {
      "id": "valve_42",
      "registryNumericId": 41,
      "valveHeroId": 42,
      "packKey": "r20_55",
      "name": "冥魂大帝",
      "en": "Wraith King",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1651,
      "combatHp": 1651,
      "combatMana": 553,
      "attack": 111,
      "move_speed": 248,
      "attack_range": 90,
      "attack_interval_s": 1.2422360248447204,
      "mana_regen": 1.99,
      "portrait": "assets/r20_55/skeleton_king-portrait.png",
      "render": "assets/r20_55/skeleton_king-render.png",
      "arenaStats": {
        "str": 69.6,
        "agi": 44.9,
        "int": 39.8
      },
      "abilities": [
        {
          "id": "skeleton_king_hellfire_blast",
          "valveAbilityId": 5086,
          "slot": "S1",
          "name": "冥火爆击",
          "en": "Wraithfire Blast",
          "icon": "assets/r20_55/skeleton_king_hellfire_blast.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=42",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "Wraith King sears an enemy unit with spectral fire, dealing damage and stunning, then dealing damage over time and slowing the target.",
            "profile": "level18-base-no-item",
            "semantic": {
              "blast_speed": 1200,
              "blast_stun_duration": 1.6,
              "blast_dot_duration": 2,
              "blast_slow": -20,
              "damage": 140,
              "blast_dot_damage": 80,
              "AbilityCastRange": 525,
              "AbilityCastPoint": 0.35,
              "AbilityManaCost": 140,
              "AbilityCooldown": 8
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 8,
            "mana": 140,
            "range_wu": 288.75,
            "startup_frames": 21,
            "recovery_frames": 12,
            "params": {
              "blast_speed": 1200,
              "blast_stun_duration": 1.6,
              "blast_dot_duration": 2,
              "blast_slow": -20,
              "damage": 140,
              "blast_dot_damage": 80,
              "AbilityCastRange": 525,
              "AbilityCastPoint": 0.35,
              "AbilityManaCost": 140,
              "AbilityCooldown": 8
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。140初伤、短晕和2秒80DPS；合并飞行时间。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "duration": "blast_stun_duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong"
              },
              {
                "op": "status",
                "duration": "blast_dot_duration",
                "values": {
                  "moveSlow": 0.2
                },
                "tick": {
                  "interval": 1,
                  "ops": [
                    {
                      "op": "damage",
                      "amount": "blast_dot_damage"
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。140初伤、短晕和2秒80DPS；合并飞行时间。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "skeleton_king_bone_guard",
          "valveAbilityId": 5087,
          "slot": "S2",
          "name": "白骨护卫",
          "en": "Bone Guard",
          "icon": "assets/r20_55/skeleton_king_bone_guard.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=42",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Gains a Charge for every 2 creeps killed and 2 charges per hero killed. Activate to spend all charges, summoning skeletons that respawn once when killed. Skeletons benefit from Vampiric Spirit's lifesteal.",
            "profile": "level18-base-no-item",
            "semantic": {
              "skeleton_duration": 40,
              "max_skeleton_charges": 8,
              "spawn_interval": 0.25,
              "reincarnate_time": 3,
              "gold_bounty": 5,
              "xp_bounty": 5,
              "skeleton_damage_tooltip": 49,
              "talent_skeleton_damage": 15,
              "skeleton_building_damage_reduction": 35,
              "skeleton_bonus_hero_damage": 25,
              "skeleton_charges_per_hero_multiplier": 4,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 100,
              "AbilityCooldown": 42
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 42,
            "mana": 100,
            "range_wu": 0,
            "startup_frames": 6,
            "recovery_frames": 12,
            "params": {
              "skeleton_duration": 40,
              "max_skeleton_charges": 8,
              "spawn_interval": 0.25,
              "reincarnate_time": 3,
              "gold_bounty": 5,
              "xp_bounty": 5,
              "skeleton_damage_tooltip": 49,
              "talent_skeleton_damage": 15,
              "skeleton_building_damage_reduction": 35,
              "skeleton_bonus_hero_damage": 25,
              "skeleton_charges_per_hero_multiplier": 4,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 100,
              "AbilityCooldown": 42
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。消耗当前骷髅资源，召唤自主近战骷髅，每只死亡3秒后复生一次。明确竞技开局默认给予2资源，英雄击杀+2，上限8；不是harness暗中注入。每只200生命/1.5秒攻击为竞技值。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "boneGuard"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。消耗当前骷髅资源，召唤自主近战骷髅，每只死亡3秒后复生一次。明确竞技开局默认给予2资源，英雄击杀+2，上限8；不是harness暗中注入。每只200生命/1.5秒攻击为竞技值。",
            "integrationRequirement": "AUTONOMOUS_UNITS_PREKO_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "skeleton_king_mortal_strike",
          "valveAbilityId": 5088,
          "slot": "S3",
          "name": "本命一击",
          "en": "Mortal Strike",
          "icon": "assets/r20_55/skeleton_king_mortal_strike.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=42",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Wraith King passively deals bonus damage on an attack with a cooldown.",
            "profile": "level18-base-no-item",
            "semantic": {
              "crit_mult": 280,
              "wraith_cd_mult": 1,
              "curse_damage_pct": 0,
              "curse_delay": 0,
              "curse_cooldown": 0,
              "AbilityCooldown": 5
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 5,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "crit_mult": 280,
              "wraith_cd_mult": 1,
              "curse_damage_pct": 0,
              "curse_delay": 0,
              "curse_cooldown": 0,
              "AbilityCooldown": 5
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。每5秒一次额外180%基础攻击伤害，与普攻合计280%；不递归暴击。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。每5秒一次额外180%基础攻击伤害，与普攻合计280%；不递归暴击。",
            "attack": {
              "cooldown": "AbilityCooldown",
              "ops": [
                {
                  "op": "damage",
                  "amount": {
                    "mul": [
                      {
                        "stat": "attack"
                      },
                      {
                        "add": [
                          {
                            "div": [
                              "crit_mult",
                              100
                            ]
                          },
                          -1
                        ]
                      }
                    ]
                  },
                  "type": "physical"
                }
              ]
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "skeleton_king_reincarnation",
          "valveAbilityId": 5089,
          "slot": "S4",
          "name": "绝冥再生",
          "en": "Reincarnation",
          "icon": "assets/r20_55/skeleton_king_reincarnation.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=42",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Wraith King's form regroups after death, allowing him to resurrect when killed in battle.  Upon death, enemy units in a %slow_radius% radius are slowed. Skeletons spawn and attack each nearby enemy hero. Can be self-cast to kill Wraith King instantly.",
            "profile": "level18-base-no-item",
            "semantic": {
              "reincarnate_time": 3,
              "slow_radius": 600,
              "movespeed": -75,
              "attackslow": -75,
              "slow_duration": 4,
              "shard_skeleton_count": 4,
              "AbilityManaCost": 0,
              "AbilityCooldown": 120
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 120,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "reincarnate_time": 3,
              "slow_radius": 600,
              "movespeed": -75,
              "attackslow": -75,
              "slow_duration": 4,
              "shard_skeleton_count": 4,
              "AbilityManaCost": 0,
              "AbilityCooldown": 120
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。存活可按R自杀并重生，普通致命伤也自动检查R冷却与资源。死亡前拦截KO，3秒后满生命魔法恢复、消耗120秒冷却；禁用未闭合幽魂先天，避免复活双触发。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "reincarnation"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。存活可按R自杀并重生，普通致命伤也自动检查R冷却与资源。死亡前拦截KO，3秒后满生命魔法恢复、消耗120秒冷却；禁用未闭合幽魂先天，避免复活双触发。",
            "integrationRequirement": "PRE_KO_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "skeleton_king",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5086,
        5087,
        5088,
        5089
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1283,
          "key": "skeleton_king_vampiric_spirit",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=42",
          "description": "Grants Wraith King Lifesteal. When slain Wraith King turns into a free pathing Wraith with Bonus Attack and Movement Speed for a short duration, delaying his death. Wraith King cannot reincarnate after being a Wraith.",
          "specialValues": [
            {
              "name": "vampiric_aura",
              "values_float": [
                20
              ],
              "is_percentage": true,
              "heading_loc": "LIFESTEAL:",
              "bonuses": [
                {
                  "name": "special_bonus_unique_wraith_king_2",
                  "value": 8,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "duration",
              "values_float": [
                4.25
              ],
              "is_percentage": false,
              "heading_loc": "WRAITH DURATION:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [
                1
              ],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "scepter_attack_speed",
              "values_float": [
                55
              ],
              "is_percentage": false,
              "heading_loc": "BONUS ATTACK SPEED:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "scepter_move_speed_pct",
              "values_float": [
                20
              ],
              "is_percentage": true,
              "heading_loc": "BONUS MOVE SPEED:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "scepter_aura_radius",
              "values_float": [
                0
              ],
              "is_percentage": false,
              "heading_loc": "AURA RADIUS:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [
                1200
              ],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1283
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "AUTONOMOUS_UNITS_PREKO_V2",
        "PRE_KO_V2"
      ]
    }
  },
  {
    "key": "templar_assassin",
    "definition": {
      "id": "valve_46",
      "registryNumericId": 44,
      "valveHeroId": 46,
      "packKey": "r20_55",
      "name": "圣堂刺客",
      "en": "Templar Assassin",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1480,
      "combatHp": 1480,
      "combatMana": 723,
      "attack": 111,
      "move_speed": 252,
      "attack_range": 137.5,
      "attack_interval_s": 0.8849557522123895,
      "mana_regen": 2.7,
      "portrait": "assets/r20_55/templar_assassin-portrait.png",
      "render": "assets/r20_55/templar_assassin-render.png",
      "arenaStats": {
        "str": 61.8,
        "agi": 80.8,
        "int": 54
      },
      "abilities": [
        {
          "id": "templar_assassin_refraction",
          "valveAbilityId": 5194,
          "slot": "S1",
          "name": "折光",
          "en": "Refraction",
          "icon": "assets/r20_55/templar_assassin_refraction.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=46",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Templar Assassin becomes highly elusive, gaining a small barrier and bonus to her damage.  The damage and avoidance effects are separate, and have a limited number of instances. If a barrier is consumed, a new one is created as long as there are charges left. If an instance of damage would deal more damage than the remaining barrier, all of the damage is absorbed.",
            "profile": "level18-base-no-item",
            "semantic": {
              "instances": 6,
              "shield_per_instance": 30,
              "bonus_damage": 60,
              "duration": 17,
              "cast_while_disabled": 0,
              "AbilityManaCost": 95,
              "AbilityCooldown": 14
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 14,
            "mana": 95,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "instances": 6,
              "shield_per_instance": 30,
              "bonus_damage": 60,
              "duration": 17,
              "cast_while_disabled": 0,
              "AbilityManaCost": 95,
              "AbilityCooldown": 14
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。6层独立30点屏障：耗尽某层的超额伤害仍全部吸收；另一独立计数给予6次普攻+60，17秒到期。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "refraction"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。6层独立30点屏障：耗尽某层的超额伤害仍全部吸收；另一独立计数给予6次普攻+60，17秒到期。",
            "integrationRequirement": "POST_MITIGATION_BARRIER_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "templar_assassin_meld",
          "valveAbilityId": 5195,
          "slot": "S2",
          "name": "隐匿",
          "en": "Meld",
          "icon": "assets/r20_55/templar_assassin_meld.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=46",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Templar Assassin conceals herself, becoming invisible as long as she remains still. If Meld's invisibility is broken by attacking an enemy, Lanaya's attack will deal bonus damage to the enemy and reduce their armor for %debuff_duration% seconds. Bonus damage and debuffs from Meld are applied to all enemies in the Psi Blades split range.",
            "profile": "level18-base-no-item",
            "semantic": {
              "bonus_damage": 200,
              "bonus_armor": -8,
              "debuff_duration": 6,
              "AbilityManaCost": 50,
              "AbilityCooldown": 5
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 5,
            "mana": 50,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "bonus_damage": 200,
              "bonus_armor": -8,
              "debuff_duration": 6,
              "AbilityManaCost": 50,
              "AbilityCooldown": 5
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。原地隐身，移动或施法解除；下一命中普攻+200且减8甲6秒，消耗一次，不是常驻伤害加成。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "special",
                "name": "meld"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。原地隐身，移动或施法解除；下一命中普攻+200且减8甲6秒，消耗一次，不是常驻伤害加成。",
            "integrationRequirement": "ATTACK_VISIBILITY_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "templar_assassin_psi_blades",
          "valveAbilityId": 5196,
          "slot": "S3",
          "name": "灵能之刃",
          "en": "Psi Blades",
          "icon": "assets/r20_55/templar_assassin_psi_blades.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=46",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 4,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Templar Assassin's psi blades slice through the attacked unit, splitting and damaging enemy units directly behind it, while gaining bonus attack range. For each unit it damages, the split damage is reduced by a percentage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "bonus_attack_range": 200,
              "attack_spill_range": 700,
              "attack_spill_width": 90,
              "attack_spill_pct": 100,
              "meld_strike_spills": 1
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "bonus_attack_range": 200,
              "attack_spill_range": 700,
              "attack_spill_width": 90,
              "attack_spill_pct": 100,
              "meld_strike_spills": 1
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。增加200原距离攻击范围；单英雄对决无第二目标时不额外造成分裂伤害。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。增加200原距离攻击范围；单英雄对决无第二目标时不额外造成分裂伤害。",
            "stats": {
              "attackRange": {
                "mul": [
                  "bonus_attack_range",
                  0.55
                ]
              }
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "templar_assassin_psionic_trap",
          "valveAbilityId": 5197,
          "slot": "S4",
          "name": "灵能陷阱",
          "en": "Psionic Trap",
          "icon": "assets/r20_55/templar_assassin_psionic_trap.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=46",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Templar Assassin places mystical traps that invisibly monitor enemy movement. When sprung at her command, they exert a slowing influence of %movement_speed_min%%% in a %trap_radius% radius. Trap movement slow charges up to %movement_speed_max%%% after %trap_max_charge_duration% seconds. Deals damage after %trap_max_charge_duration%s.",
            "profile": "level18-base-no-item",
            "semantic": {
              "trap_radius": 400,
              "trap_duration": 5,
              "max_traps": 11,
              "trap_fade_time": 2,
              "movement_speed_min": 20,
              "movement_speed_max": 50,
              "trap_bonus_damage": 400,
              "extra_damage": 400,
              "damage_tick_rate": 0.5,
              "trap_max_charge_duration": 3.5,
              "min_silence_duration": 0,
              "max_silence_duration": 0,
              "bonus_vision": 0,
              "AbilityCastRange": 1800,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 15,
              "AbilityCooldown": 5
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 5,
            "mana": 15,
            "range_wu": 990.0000000000001,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "trap_radius": 400,
              "trap_duration": 5,
              "max_traps": 11,
              "trap_fade_time": 2,
              "movement_speed_min": 20,
              "movement_speed_max": 50,
              "trap_bonus_damage": 400,
              "extra_damage": 400,
              "damage_tick_rate": 0.5,
              "trap_max_charge_duration": 3.5,
              "min_silence_duration": 0,
              "max_silence_duration": 0,
              "bonus_vision": 0,
              "AbilityCastRange": 1800,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 15,
              "AbilityCooldown": 5
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。S4放一个固定陷阱，再按S4引爆；慢速随0–3.5秒蓄力从20%到50%，满蓄力才附加5秒共400伤害。竞技最多同时1个，60秒自动清除，无选单位操作。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "trap"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。S4放一个固定陷阱，再按S4引爆；慢速随0–3.5秒蓄力从20%到50%，满蓄力才附加5秒共400伤害。竞技最多同时1个，60秒自动清除，无选单位操作。",
            "integrationRequirement": "SERIALIZED_RECAST_V2",
            "recast": true
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "templar_assassin",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5194,
        5195,
        5196,
        5197
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1750,
          "key": "templar_assassin_inner_peace",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=46",
          "description": "When remaining stationary and not taking damage for %time_until_meditation%s, Templar Assassin begins meditating, gaining health and mana regeneration, reaching the maximum bonus after %time_until_max_bonus%s of meditating.",
          "specialValues": [
            {
              "name": "max_hp_regen",
              "values_float": [
                2.7
              ],
              "is_percentage": false,
              "heading_loc": "MAX HEALTH REGEN:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "max_mana_regen",
              "values_float": [
                2.2
              ],
              "is_percentage": false,
              "heading_loc": "MAX MANA REGEN:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "time_until_meditation",
              "values_float": [
                0.2
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "time_until_max_bonus",
              "values_float": [
                1.85
              ],
              "is_percentage": false,
              "heading_loc": "MEDITATION TIME UNTIL MAX BONUS:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        7853,
        1750
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "POST_MITIGATION_BARRIER_V2",
        "ATTACK_VISIBILITY_V2",
        "SERIALIZED_RECAST_V2"
      ]
    }
  },
  {
    "key": "tinker",
    "definition": {
      "id": "valve_34",
      "registryNumericId": 35,
      "valveHeroId": 34,
      "packKey": "r20_55",
      "name": "修补匠",
      "en": "Tinker",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1398,
      "combatHp": 1398,
      "combatMana": 1108,
      "attack": 111,
      "move_speed": 244,
      "attack_range": 275,
      "attack_interval_s": 1.2073863636363638,
      "mana_regen": 4.805,
      "portrait": "assets/r20_55/tinker-portrait.png",
      "render": "assets/r20_55/tinker-render.png",
      "arenaStats": {
        "str": 58.099999999999994,
        "agi": 40.8,
        "int": 86.1
      },
      "abilities": [
        {
          "id": "tinker_laser",
          "valveAbilityId": 5150,
          "slot": "S1",
          "name": "激光",
          "en": "Laser",
          "icon": "assets/r20_55/tinker_laser.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=34",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 4,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Fires an intense energy beam, damaging and blinding the target. Blinded targets miss all physical attacks.",
            "profile": "level18-base-no-item",
            "semantic": {
              "miss_rate": 100,
              "duration": 4.5,
              "laser_damage": 300,
              "splash_pct": 100,
              "scepter_bonus_cast_range": 0,
              "scepter_reduction_pct": 0,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 125,
              "AbilityCooldown": 16
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "pure",
            "cooldown_s": 16,
            "mana": 125,
            "range_wu": 330,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "miss_rate": 100,
              "duration": 4.5,
              "laser_damage": 300,
              "splash_pct": 100,
              "scepter_bonus_cast_range": 0,
              "scepter_reduction_pct": 0,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 125,
              "AbilityCooldown": 16
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。纯粹伤害和100%普攻落空；技能伤害不受致盲影响。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "laser_damage",
                "type": "pure"
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "missChance": 1
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。纯粹伤害和100%普攻落空；技能伤害不受致盲影响。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "tinker_march_of_the_machines",
          "valveAbilityId": 5152,
          "slot": "S2",
          "name": "机械行军",
          "en": "March of the Machines",
          "icon": "assets/r20_55/tinker_march_of_the_machines.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=34",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Enlists an army of robotic minions to destroy enemy units in an area around Tinker.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 900,
              "collision_radius": 50,
              "splash_radius": 150,
              "duration": 6,
              "speed": 400,
              "machines_per_sec": 24,
              "distance": 1800,
              "damage": 40,
              "heal_per_second": 0,
              "heal_duration": 0,
              "AbilityCastRange": 300,
              "AbilityCastPoint": 0.53,
              "AbilityManaCost": 160,
              "AbilityCooldown": 29
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 29,
            "mana": 160,
            "range_wu": 165,
            "startup_frames": 32,
            "recovery_frames": 12,
            "params": {
              "radius": 900,
              "collision_radius": 50,
              "splash_radius": 150,
              "duration": 6,
              "speed": 400,
              "machines_per_sec": 24,
              "distance": 1800,
              "damage": 40,
              "heal_per_second": 0,
              "heal_duration": 0,
              "AbilityCastRange": 300,
              "AbilityCastPoint": 0.53,
              "AbilityManaCost": 160,
              "AbilityCooldown": 29
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。每秒24个水平机器从目标区域左端前进，扫掠碰撞一次造成40伤害后消失；6秒生成窗口结束清除机器，省略随机纵深。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "machines"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。每秒24个水平机器从目标区域左端前进，扫掠碰撞一次造成40伤害后消失；6秒生成窗口结束清除机器，省略随机纵深。",
            "integrationRequirement": "SERIALIZED_PROJECTILE_FIELD_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "tinker_deploy_turrets",
          "valveAbilityId": 1744,
          "slot": "S3",
          "name": "部署炮塔",
          "en": "Deploy Turrets",
          "icon": "assets/r20_55/tinker_deploy_turrets.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=34",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Deploys <b>3</b> uncontrollable turrets at the target location. Enemies hit by the impact take damage and are pushed away from the landing point. If Tinker is hit, he also gets pushed by the impact. Once deployed, the turret fires missiles in the direction of the nearest enemy hero.",
            "profile": "level18-base-no-item",
            "semantic": {
              "drop_aoe_radius": 250,
              "turret_placement_radius": 70,
              "drop_delay": 0.5,
              "drop_knockback_duration": 0.1,
              "drop_knockback_duration_tinker": 0.3,
              "drop_knockback_distance": 100,
              "drop_knockback_distance_tinker": 400,
              "drop_count": 1,
              "drop_interval": 0.22,
              "drop_spread_pct": 100,
              "turrets_per_drop": 3,
              "drop_damage": 160,
              "missile_damage": 80,
              "missile_speed": 1350,
              "turret_hp": 160,
              "missile_target_range": 800,
              "missile_range": 900,
              "missile_width": 70,
              "turret_duration": 4.5,
              "missile_spawn_interval": 1.5,
              "missile_attack_rate_tooltip": 20,
              "radius_explosion": 200,
              "splash_pct": 50,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 160,
              "AbilityCooldown": 18
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 18,
            "mana": 160,
            "range_wu": 330,
            "startup_frames": 6,
            "recovery_frames": 12,
            "params": {
              "drop_aoe_radius": 250,
              "turret_placement_radius": 70,
              "drop_delay": 0.5,
              "drop_knockback_duration": 0.1,
              "drop_knockback_duration_tinker": 0.3,
              "drop_knockback_distance": 100,
              "drop_knockback_distance_tinker": 400,
              "drop_count": 1,
              "drop_interval": 0.22,
              "drop_spread_pct": 100,
              "turrets_per_drop": 3,
              "drop_damage": 160,
              "missile_damage": 80,
              "missile_speed": 1350,
              "turret_hp": 160,
              "missile_target_range": 800,
              "missile_range": 900,
              "missile_width": 70,
              "turret_duration": 4.5,
              "missile_spawn_interval": 1.5,
              "missile_attack_rate_tooltip": 20,
              "radius_explosion": 200,
              "splash_pct": 50,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.1,
              "AbilityManaCost": 160,
              "AbilityCooldown": 18
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.5秒落地伤害后3自主炮台，1.5秒80魔法攻击；省略击退和飞弹碰撞。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "delay",
                "delay": "drop_delay",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "drop_damage",
                    "radius": "drop_aoe_radius",
                    "center": "aim"
                  },
                  {
                    "op": "summon",
                    "count": "turrets_per_drop",
                    "hp": "turret_hp",
                    "damage": "missile_damage",
                    "duration": "turret_duration",
                    "interval": "missile_spawn_interval",
                    "range": "missile_target_range",
                    "speed": 0,
                    "type": "magical"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.5秒落地伤害后3自主炮台，1.5秒80魔法攻击；省略击退和飞弹碰撞。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "tinker_rearm",
          "valveAbilityId": 5153,
          "slot": "S4",
          "name": "再装填",
          "en": "Rearm",
          "icon": "assets/r20_55/tinker_rearm.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=34",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "CHANNELED - Resets the cooldown on Tinker's abilities.",
            "profile": "level18-base-no-item",
            "semantic": {
              "AbilityChannelTime": 1.25,
              "AbilityManaCost": 200,
              "AbilityCooldown": 4.5
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 4.5,
            "mana": 200,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "AbilityChannelTime": 1.25,
              "AbilityManaCost": 200,
              "AbilityCooldown": 4.5
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。1.25秒持续施法完成才清空前三技能冷却；自身R冷却保留，中断不刷新。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "channelComplete",
                "duration": "AbilityChannelTime",
                "ops": [
                  {
                    "op": "rearm"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。1.25秒持续施法完成才清空前三技能冷却；自身R冷却保留，中断不刷新。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "tinker",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5150,
        5152,
        1744,
        5153
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1262,
          "key": "tinker_eureka",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=34",
          "description": "Tinker gains %one_percent_tooltip%%% item cooldown reduction per %int_per_one_cdr% Intelligence, up to a maximum of %max_cdr%%%.",
          "specialValues": [
            {
              "name": "int_per_one_cdr",
              "values_float": [
                3
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "one_percent_tooltip",
              "values_float": [
                1
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "max_cdr",
              "values_float": [
                60
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "item_cooldown_tooltip",
              "values_float": [
                0
              ],
              "is_percentage": true,
              "heading_loc": "ITEM COOLDOWN REDUCTION:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        909,
        1262
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "SERIALIZED_PROJECTILE_FIELD_V2"
      ]
    }
  },
  {
    "key": "tiny",
    "definition": {
      "id": "valve_19",
      "registryNumericId": 27,
      "valveHeroId": 19,
      "packKey": "r20_55",
      "name": "小小",
      "en": "Tiny",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 2351,
      "combatHp": 2351,
      "combatMana": 769,
      "attack": 135,
      "move_speed": 220,
      "attack_range": 90,
      "attack_interval_s": 1.7,
      "mana_regen": 2.89,
      "portrait": "assets/r20_55/tiny-portrait.png",
      "render": "assets/r20_55/tiny-render.png",
      "arenaStats": {
        "str": 101.4,
        "agi": 0,
        "int": 57.8
      },
      "abilities": [
        {
          "id": "tiny_avalanche",
          "valveAbilityId": 5106,
          "slot": "S1",
          "name": "山崩",
          "en": "Avalanche",
          "icon": "assets/r20_55/tiny_avalanche.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=19",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "Bombards an area with rocks, continously doing small intervals of damage and stun to enemy units.",
            "profile": "level18-base-no-item",
            "semantic": {
              "radius": 370,
              "tick_interval": 0.3,
              "total_duration": 1.5,
              "tick_count": 5,
              "stun_duration": 0.3,
              "projectile_speed": 1200,
              "avalanche_damage": 360,
              "AbilityCastRange": 600,
              "AbilityManaCost": 150,
              "AbilityCooldown": 14
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 14,
            "mana": 150,
            "range_wu": 330,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "radius": 370,
              "tick_interval": 0.3,
              "total_duration": 1.5,
              "tick_count": 5,
              "stun_duration": 0.3,
              "projectile_speed": 1200,
              "avalanche_damage": 360,
              "AbilityCastRange": 600,
              "AbilityManaCost": 150,
              "AbilityCooldown": 14
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定地面五段伤害与短晕；跳出区域停止后续命中。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "area",
                "duration": "total_duration",
                "interval": "tick_interval",
                "radius": "radius",
                "ops": [
                  {
                    "op": "damage",
                    "amount": {
                      "div": [
                        "avalanche_damage",
                        "tick_count"
                      ]
                    }
                  },
                  {
                    "op": "status",
                    "duration": "stun_duration",
                    "values": {
                      "stun": true
                    },
                    "dispel": "strong"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。固定地面五段伤害与短晕；跳出区域停止后续命中。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "tiny_toss",
          "valveAbilityId": 5107,
          "slot": "S2",
          "name": "投掷",
          "en": "Toss",
          "icon": "assets/r20_55/tiny_toss.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=19",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Grabs the nearest unit in a %grab_radius% radius around Tiny, ally or enemy, and launches it at the target unit or rune to deal damage where they land.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 1.1,
              "grab_radius": 300,
              "radius": 275,
              "toss_damage": 360,
              "toss_land_damage_pct": 0,
              "AbilityCastRange": 1100,
              "AbilityManaCost": 125,
              "AbilityCooldown": 11
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 11,
            "mana": 125,
            "range_wu": 165,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "duration": 1.1,
              "grab_radius": 300,
              "radius": 275,
              "toss_damage": 360,
              "toss_land_damage_pct": 0,
              "AbilityCastRange": 1100,
              "AbilityManaCost": 125,
              "AbilityCooldown": 11
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一敌人须在抓取半径内，原地抛起后落地伤害；不选择队友/符点，不增加未触发Grow伤害。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "stun": true
                },
                "dispel": "strong"
              },
              {
                "op": "delay",
                "delay": "duration",
                "ops": [
                  {
                    "op": "damage",
                    "amount": "toss_damage"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一敌人须在抓取半径内，原地抛起后落地伤害；不选择队友/符点，不增加未触发Grow伤害。",
            "rangeParam": "grab_radius"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "tiny_tree_grab",
          "valveAbilityId": 5108,
          "slot": "S3",
          "name": "抓树",
          "en": "Tree Grab",
          "icon": "assets/r20_55/tiny_tree_grab.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=19",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 3,
            "description": "Grabs a tree and causes Tiny to have bonus range, damage, and a splashing attack for a limited number of attacks.  The tree can be thrown, to deal your attack to a unit at a distance.",
            "profile": "level18-base-no-item",
            "semantic": {
              "attack_count": 8,
              "bonus_damage": 40,
              "bonus_damage_buildings": 60,
              "attack_range": 300,
              "splash_width": 200,
              "splash_range": 400,
              "splash_pct": 100,
              "AbilityCastRange": 200,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 25,
              "AbilityCooldown": 7
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 7,
            "mana": 25,
            "range_wu": 110.00000000000001,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "attack_count": 8,
              "bonus_damage": 40,
              "bonus_damage_buildings": 60,
              "attack_range": 300,
              "splash_width": 200,
              "splash_range": 400,
              "splash_pct": 100,
              "AbilityCastRange": 200,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 25,
              "AbilityCooldown": 7
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。竞技场直接授予8次树击；省略寻树/树投掷和无第二目标的溅射。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "self",
            "ops": [
              {
                "op": "attackBuff",
                "damage": "bonus_damage",
                "range": "attack_range",
                "charges": "attack_count"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。竞技场直接授予8次树击；省略寻树/树投掷和无第二目标的溅射。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "tiny_grow",
          "valveAbilityId": 5109,
          "slot": "S4",
          "name": "长大",
          "en": "Grow",
          "icon": "assets/r20_55/tiny_grow.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=19",
            "jsonPointer": "/result/data/heroes/0/abilities/5",
            "rank": 3,
            "damageTypeCode": 1,
            "immunityCode": 0,
            "dispelCode": 0,
            "description": "Tiny gains craggy mass, increasing his attack damage, movement speed and armor, and toss power while slowing his attack speed.",
            "profile": "level18-base-no-item",
            "semantic": {
              "bonus_armor": 15,
              "bonus_damage": 180,
              "attack_speed_reduction": -35,
              "toss_bonus_damage": 350,
              "move_speed": 30,
              "land_movement_slow": 0,
              "land_attack_slow": 0,
              "land_debuff_duration": 0,
              "land_radius_tooltip": 0,
              "land_toss_damage_tooltip": 0,
              "land_tree_damage_tooltip": 0
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 0,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "bonus_armor": 15,
              "bonus_damage": 180,
              "attack_speed_reduction": -35,
              "toss_bonus_damage": 350,
              "move_speed": 30,
              "land_movement_slow": 0,
              "land_attack_slow": 0,
              "land_debuff_duration": 0,
              "land_radius_tooltip": 0,
              "land_toss_damage_tooltip": 0,
              "land_tree_damage_tooltip": 0
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。持续攻击/护甲/移速与攻速惩罚；被破被动时移除本候选加成；投掷加成列为省略。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。持续攻击/护甲/移速与攻速惩罚；被破被动时移除本候选加成；投掷加成列为省略。",
            "stats": {
              "attackBonus": "bonus_damage",
              "armor": "bonus_armor",
              "moveFlat": "move_speed",
              "attackSpeed": "attack_speed_reduction"
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [
        {
          "id": "tiny_insurmountable",
          "valveAbilityId": 1236,
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=19",
          "level": 18,
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。自动先天：固定18级力量×0.15%慢速抗性与力量×0.10%状态抗性；攻击速度减慢同样受慢抗影响。",
            "stats": {
              "slowResist": {
                "mul": [
                  {
                    "stat": "str"
                  },
                  {
                    "div": [
                      "str_to_slow_resist_pct",
                      10000
                    ]
                  }
                ]
              },
              "statusResist": {
                "mul": [
                  {
                    "stat": "str"
                  },
                  {
                    "div": [
                      "str_to_status_resist_pct",
                      10000
                    ]
                  }
                ]
              }
            }
          },
          "mvp": {
            "passive": true,
            "params": {
              "str_to_slow_resist_pct": 15,
              "str_to_status_resist_pct": 10
            }
          }
        }
      ],
      "activeUnlock": false,
      "key": "tiny",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5106,
        5107,
        5108,
        5109
      ],
      "automaticInnateIds": [
        1236
      ],
      "innateCandidates": [
        {
          "id": 1236,
          "key": "tiny_insurmountable",
          "passive": true,
          "status": "implemented_adapted_fixed18",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=19",
          "description": "Tiny gains Status and Slow Resistance from Strength. Slow Resistance also reduces the impact of Attack Speed slows.",
          "specialValues": [
            {
              "name": "str_to_slow_resist_pct",
              "values_float": [
                15
              ],
              "is_percentage": true,
              "heading_loc": "STRENGTH TO SLOW RESIST:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "str_to_status_resist_pct",
              "values_float": [
                10
              ],
              "is_percentage": true,
              "heading_loc": "STRENGTH TO STATUS RESIST:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        7850,
        1236,
        6937
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "vengefulspirit",
    "definition": {
      "id": "valve_20",
      "registryNumericId": 28,
      "valveHeroId": 20,
      "packKey": "r20_55",
      "name": "复仇之魂",
      "en": "Vengeful Spirit",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1532,
      "combatHp": 1532,
      "combatMana": 609,
      "attack": 105,
      "move_speed": 240,
      "attack_range": 220.00000000000003,
      "attack_interval_s": 0.8620689655172414,
      "mana_regen": 2.225,
      "portrait": "assets/r20_55/vengefulspirit-portrait.png",
      "render": "assets/r20_55/vengefulspirit-render.png",
      "arenaStats": {
        "str": 64.2,
        "agi": 74,
        "int": 44.5
      },
      "abilities": [
        {
          "id": "vengefulspirit_magic_missile",
          "valveAbilityId": 5122,
          "slot": "S1",
          "name": "魔法箭",
          "en": "Magic Missile",
          "icon": "assets/r20_55/vengefulspirit_magic_missile.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=20",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 1,
            "description": "Fires a magic missile at an enemy unit, stunning and dealing damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "magic_missile_speed": 1350,
              "magic_missile_stun": 1.8,
              "magic_missile_damage": 340,
              "bounce_range_pct": 75,
              "AbilityCastRange": 650,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 105,
              "AbilityCooldown": 11
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 11,
            "mana": 105,
            "range_wu": 357.50000000000006,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "magic_missile_speed": 1350,
              "magic_missile_stun": 1.8,
              "magic_missile_damage": 340,
              "bounce_range_pct": 75,
              "AbilityCastRange": 650,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 105,
              "AbilityCooldown": 11
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.25秒可中断/无敌规避的延迟指向飞弹；视觉弹体碰撞由整合者补齐。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "delay",
                "delay": 0.25,
                "ops": [
                  {
                    "op": "damage",
                    "amount": "magic_missile_damage"
                  },
                  {
                    "op": "status",
                    "duration": "magic_missile_stun",
                    "values": {
                      "stun": true
                    },
                    "dispel": "strong"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。0.25秒可中断/无敌规避的延迟指向飞弹；视觉弹体碰撞由整合者补齐。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "vengefulspirit_wave_of_terror",
          "valveAbilityId": 5124,
          "slot": "S2",
          "name": "恐怖波动",
          "en": "Wave of Terror",
          "icon": "assets/r20_55/vengefulspirit_wave_of_terror.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=20",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Vengeful Spirit lets loose a wicked cry, weakening the total attack damage and armor of enemies, and giving vision of the path ahead.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage": 120,
              "wave_speed": 2000,
              "wave_width": 325,
              "armor_reduction": -6,
              "attack_reduction": 25,
              "vision_aoe": 350,
              "vision_duration": 4,
              "AbilityCastRange": 1400,
              "AbilityDuration": 8,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 40,
              "AbilityCooldown": 10
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 10,
            "mana": 40,
            "range_wu": 770.0000000000001,
            "startup_frames": 18,
            "recovery_frames": 12,
            "params": {
              "damage": 120,
              "wave_speed": 2000,
              "wave_width": 325,
              "armor_reduction": -6,
              "attack_reduction": 25,
              "vision_aoe": 350,
              "vision_duration": 4,
              "AbilityCastRange": 1400,
              "AbilityDuration": 8,
              "AbilityCastPoint": 0.3,
              "AbilityManaCost": 40,
              "AbilityCooldown": 10
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一敌人方向即时波命中，降低护甲和总攻击；省略穿透多单位/视野。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "duration": "AbilityDuration",
                "values": {
                  "armor": "armor_reduction",
                  "attackReduction": {
                    "div": [
                      "attack_reduction",
                      100
                    ]
                  }
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。唯一敌人方向即时波命中，降低护甲和总攻击；省略穿透多单位/视野。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "vengefulspirit_command_aura",
          "valveAbilityId": 5123,
          "slot": "S3",
          "name": "复仇光环",
          "en": "Vengeance Aura",
          "icon": "assets/r20_55/vengefulspirit_command_aura.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=20",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 1,
            "dispelCode": 0,
            "description": "Vengeful Spirit's presence increases the damage of nearby friendly heroes. Vengeful Spirit herself receives %self_multiplier%%% extra bonus.",
            "profile": "level18-base-no-item",
            "semantic": {
              "bonus_base_damage": 25,
              "self_multiplier": 25,
              "aura_radius": 1200,
              "scepter_illusion_damage_out_pct": 0,
              "scepter_illusion_damage_in_pct": 0,
              "scepter_illusion_ms_bonus_pct": 0,
              "AbilityCastRange": 1200
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": true,
            "input": "passive",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 0,
            "mana": 0,
            "range_wu": 660,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "bonus_base_damage": 25,
              "self_multiplier": 25,
              "aura_radius": 1200,
              "scepter_illusion_damage_out_pct": 0,
              "scepter_illusion_damage_in_pct": 0,
              "scepter_illusion_ms_bonus_pct": 0,
              "AbilityCastRange": 1200
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自身基础攻击增加25%×1.25；无队友光环。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "passive",
            "ops": [],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。仅自身基础攻击增加25%×1.25；无队友光环。",
            "stats": {
              "attackPct": {
                "mul": [
                  {
                    "div": [
                      "bonus_base_damage",
                      100
                    ]
                  },
                  {
                    "add": [
                      1,
                      {
                        "div": [
                          "self_multiplier",
                          100
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "vengefulspirit_nether_swap",
          "valveAbilityId": 5125,
          "slot": "S4",
          "name": "移形换位",
          "en": "Nether Swap",
          "icon": "assets/r20_55/vengefulspirit_nether_swap.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=20",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 3,
            "dispelCode": 2,
            "description": "Instantaneously swaps positions with a target Hero, friend or enemy. Nether Swap interrupts channeling abilities on the target. Enemy Swapped units take damage. Vengeful Spirit and allied swapped units gain a barrier equal to the damage dealt.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage_reduction_duration": 10,
              "damage": 450,
              "AbilityCastRange": 1100,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 200,
              "AbilityCooldown": 30
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 30,
            "mana": 200,
            "range_wu": 605,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "damage_reduction_duration": 10,
              "damage": 450,
              "AbilityCastRange": 1100,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 200,
              "AbilityCooldown": 30
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。互换横向位置并打断目标施法，自身固定450屏障；屏障按名义伤害适配。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "swap"
              },
              {
                "op": "damage",
                "amount": "damage"
              },
              {
                "op": "status",
                "to": "self",
                "duration": "damage_reduction_duration",
                "values": {
                  "shield": "damage"
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。互换横向位置并打断目标施法，自身固定450屏障；屏障按名义伤害适配。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "vengefulspirit",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5122,
        5124,
        5123,
        5125
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1238,
          "key": "vengefulspirit_retribution",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=20",
          "description": "Vengeful Spirit is considered both a ranged and a melee attacker to gain the respective bonuses.<br><br>When killed by an enemy hero, Vengeful Spirit deals %bonus_damage%%% bonus damage to her killer until their next death. Only one debuff can exist at a time.",
          "specialValues": [
            {
              "name": "bonus_damage",
              "values_float": [
                20
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1238
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "venomancer",
    "definition": {
      "id": "valve_40",
      "registryNumericId": 39,
      "valveHeroId": 40,
      "packKey": "r20_55",
      "name": "剧毒术士",
      "en": "Venomancer",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1323,
      "combatHp": 1323,
      "combatMana": 691,
      "attack": 100,
      "move_speed": 224,
      "attack_range": 247.50000000000003,
      "attack_interval_s": 0.9849362688296639,
      "mana_regen": 2.565,
      "portrait": "assets/r20_55/venomancer-portrait.png",
      "render": "assets/r20_55/venomancer-render.png",
      "arenaStats": {
        "str": 54.7,
        "agi": 72.6,
        "int": 51.3
      },
      "abilities": [
        {
          "id": "venomancer_venomous_gale",
          "valveAbilityId": 5178,
          "slot": "S1",
          "name": "瘴气",
          "en": "Venomous Gale",
          "icon": "assets/r20_55/venomancer_venomous_gale.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=40",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Launches a ball of venom in a line, poisoning enemy units so that they take both initial damage and damage over time, as well as suffering slowed movement.  Venomous Gale deals damage every 3 seconds over its duration.",
            "profile": "level18-base-no-item",
            "semantic": {
              "duration": 15,
              "strike_damage": 100,
              "tick_damage": 100,
              "tick_interval": 3,
              "movement_slow": -50,
              "radius": 125,
              "speed": 1200,
              "create_wards": 0,
              "shard_travel_tooltip": 0,
              "num_created_wards_tooltip": 0,
              "ward_hp_dmg_pct": 0,
              "AbilityCastRange": 800,
              "AbilityManaCost": 125,
              "AbilityCooldown": 18
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 18,
            "mana": 125,
            "range_wu": 440.00000000000006,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "duration": 15,
              "strike_damage": 100,
              "tick_damage": 100,
              "tick_interval": 3,
              "movement_slow": -50,
              "radius": 125,
              "speed": 1200,
              "create_wards": 0,
              "shard_travel_tooltip": 0,
              "num_created_wards_tooltip": 0,
              "ward_hp_dmg_pct": 0,
              "AbilityCastRange": 800,
              "AbilityManaCost": 125,
              "AbilityCooldown": 18
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单敌命中后五次3秒毒跳；基础驱散去除毒和慢速。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "strike_damage"
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "moveSlow": 0.5
                },
                "tick": {
                  "interval": "tick_interval",
                  "ops": [
                    {
                      "op": "damage",
                      "amount": "tick_damage"
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。单敌命中后五次3秒毒跳；基础驱散去除毒和慢速。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "venomancer_snakebite",
          "valveAbilityId": 1749,
          "slot": "S2",
          "name": "毒蛇撕咬",
          "en": "Snakebite",
          "icon": "assets/r20_55/venomancer_snakebite.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=40",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 0,
            "dispelCode": 2,
            "description": "Venomancer summons a Spawn of Aktok to sink its fangs into a target, dealing magic damage and applying a toxin that does damage every second. When the target attacks while infected, they take the initial damage again.",
            "profile": "level18-base-no-item",
            "semantic": {
              "base_damage": 130,
              "tick_damage": 40,
              "duration": 6,
              "damage_interval": 0.5,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 100,
              "AbilityCooldown": 14
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 14,
            "mana": 100,
            "range_wu": 330,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "base_damage": 130,
              "tick_damage": 40,
              "duration": 6,
              "damage_interval": 0.5,
              "AbilityCastRange": 600,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 100,
              "AbilityCooldown": 14
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。130初伤，每秒40毒伤；中毒者发起命中普攻再受130。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "base_damage"
              },
              {
                "op": "status",
                "duration": "duration",
                "values": {
                  "attackPunish": "base_damage"
                },
                "tick": {
                  "interval": "damage_interval",
                  "ops": [
                    {
                      "op": "damage",
                      "amount": {
                        "mul": [
                          "tick_damage",
                          "damage_interval"
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。130初伤，每秒40毒伤；中毒者发起命中普攻再受130。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "venomancer_plague_ward",
          "valveAbilityId": 5180,
          "slot": "S3",
          "name": "瘟疫守卫",
          "en": "Plague Ward",
          "icon": "assets/r20_55/venomancer_plague_ward.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=40",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 1,
            "immunityCode": 3,
            "dispelCode": 0,
            "description": "Summons a plague ward to attack enemy units and structures. The ward is immune to magic. Wards gain the Poison Sting level from Venomancer, dealing 50% of the full damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "gold_bounty_pct": 100,
              "duration": 40,
              "ward_multiplier": 1,
              "ward_model_scale": 1,
              "ward_hp_tooltip": 450,
              "ward_damage_tooltip": 40,
              "AbilityCastRange": 850,
              "AbilityManaCost": 30,
              "AbilityCooldown": 5
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "physical",
            "cooldown_s": 5,
            "mana": 30,
            "range_wu": 467.50000000000006,
            "startup_frames": 0,
            "recovery_frames": 12,
            "params": {
              "gold_bounty_pct": 100,
              "duration": 40,
              "ward_multiplier": 1,
              "ward_model_scale": 1,
              "ward_hp_tooltip": 450,
              "ward_damage_tooltip": 40,
              "AbilityCastRange": 850,
              "AbilityManaCost": 30,
              "AbilityCooldown": 5
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。魔免自主毒棒；间隔1.5、射程600为竞技值；未闭合先天毒刺明确省略。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "summon",
                "count": 1,
                "hp": "ward_hp_tooltip",
                "damage": "ward_damage_tooltip",
                "duration": "duration",
                "interval": 1.5,
                "range": 600,
                "speed": 0,
                "magicImmune": true
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。魔免自主毒棒；间隔1.5、射程600为竞技值；未闭合先天毒刺明确省略。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "venomancer_noxious_plague",
          "valveAbilityId": 1105,
          "slot": "S4",
          "name": "恶性瘟疫",
          "en": "Noxious Plague",
          "icon": "assets/r20_55/venomancer_noxious_plague.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=40",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 0,
            "description": "Infects an enemy with a plague that does damage on application then slows the target and deals damage over time based on their maximum health. When the debuff ends for any reason, all debuffs from Venomancer on the initial target and the plague are spread to nearby targets. Additional spreads beyond the first do not deal impact damage.",
            "profile": "level18-base-no-item",
            "semantic": {
              "debuff_duration": 4,
              "impact_damage": 250,
              "damage_per_second": 4,
              "damage_tick_rate": 0.25,
              "debuff_time_transfer": 100,
              "movement_slow": 50,
              "debuff_radius": 700,
              "spread_count": 2,
              "mres_reduce": 0,
              "impact_damage_reduce": 100,
              "projectile_speed": 1200,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.15,
              "AbilityManaCost": 300,
              "AbilityCooldown": 80
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 80,
            "mana": 300,
            "range_wu": 495.00000000000006,
            "startup_frames": 9,
            "recovery_frames": 12,
            "params": {
              "debuff_duration": 4,
              "impact_damage": 250,
              "damage_per_second": 4,
              "damage_tick_rate": 0.25,
              "debuff_time_transfer": 100,
              "movement_slow": 50,
              "debuff_radius": 700,
              "spread_count": 2,
              "mres_reduce": 0,
              "impact_damage_reduce": 100,
              "projectile_speed": 1200,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.15,
              "AbilityManaCost": 300,
              "AbilityCooldown": 80
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。250初伤与每秒最大生命4%毒伤；单对手无二次传播，基本驱散终止。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "damage",
                "amount": "impact_damage"
              },
              {
                "op": "status",
                "duration": "debuff_duration",
                "values": {
                  "moveSlow": 0.5
                },
                "tick": {
                  "interval": "damage_tick_rate",
                  "ops": [
                    {
                      "op": "damage",
                      "amount": {
                        "mul": [
                          {
                            "stat": "maxHp",
                            "who": "target"
                          },
                          {
                            "div": [
                              "damage_per_second",
                              100
                            ]
                          },
                          "damage_tick_rate"
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。250初伤与每秒最大生命4%毒伤；单对手无二次传播，基本驱散终止。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "venomancer",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5178,
        1749,
        5180,
        1105
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 5179,
          "key": "venomancer_poison_sting",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=40",
          "description": "Venomancer's attacks slow enemies and deal damage over time.",
          "specialValues": [
            {
              "name": "duration",
              "values_float": [
                4.5
              ],
              "is_percentage": false,
              "heading_loc": "DURATION:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "damage",
              "values_float": [
                9
              ],
              "is_percentage": false,
              "heading_loc": "DAMAGE PER SECOND:",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "movement_speed",
              "values_float": [
                8
              ],
              "is_percentage": true,
              "heading_loc": "MOVEMENT SLOW:",
              "bonuses": [
                {
                  "name": "special_bonus_unique_venomancer_2",
                  "value": 10,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "hp_regen_reduction",
              "values_float": [],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [
                {
                  "name": "special_bonus_unique_venomancer_poisonsting_regen_reduction",
                  "value": 15,
                  "operation": 0
                }
              ],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        5179
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2"
      ]
    }
  },
  {
    "key": "warlock",
    "definition": {
      "id": "valve_37",
      "registryNumericId": 37,
      "valveHeroId": 37,
      "packKey": "r20_55",
      "name": "术士",
      "en": "Warlock",
      "role": "四槽竞技候选",
      "color": "#94b8d6",
      "hp": 1502,
      "combatHp": 1502,
      "combatMana": 1007,
      "attack": 110,
      "move_speed": 240,
      "attack_range": 330,
      "attack_interval_s": 1.3385826771653542,
      "mana_regen": 3.8850000000000002,
      "portrait": "assets/r20_55/warlock-portrait.png",
      "render": "assets/r20_55/warlock-render.png",
      "arenaStats": {
        "str": 62.8,
        "agi": 27,
        "int": 77.7
      },
      "abilities": [
        {
          "id": "warlock_fatal_bonds",
          "valveAbilityId": 5162,
          "slot": "S1",
          "name": "致命连接",
          "en": "Fatal Bonds",
          "icon": "assets/r20_55/warlock_fatal_bonds.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=37",
            "jsonPointer": "/result/data/heroes/0/abilities/0",
            "rank": 4,
            "damageTypeCode": 0,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Binds several visible enemy units together, causing a percentage of the damage dealt to one of them to be felt by the others.",
            "profile": "level18-base-no-item",
            "semantic": {
              "count": 6,
              "damage_share_percentage": 24,
              "duration": 18,
              "search_aoe": 700,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 150,
              "AbilityCooldown": 18
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 18,
            "mana": 150,
            "range_wu": 550,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "count": 6,
              "damage_share_percentage": 24,
              "duration": 18,
              "search_aoe": 700,
              "AbilityCastRange": 1000,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 150,
              "AbilityCooldown": 18
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。把敌英雄与附近最多5个敌方自主单位绑定，实际扣血24%分摊，shared标志阻止递归；仅一敌时保留绑定状态且不虚构额外伤害。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "special",
                "name": "bonds"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。把敌英雄与附近最多5个敌方自主单位绑定，实际扣血24%分摊，shared标志阻止递归；仅一敌时保留绑定状态且不虚构额外伤害。",
            "integrationRequirement": "MULTI_UNIT_DAMAGE_EVENTS_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "warlock_shadow_word",
          "valveAbilityId": 5163,
          "slot": "S2",
          "name": "暗言术",
          "en": "Shadow Word",
          "icon": "assets/r20_55/warlock_shadow_word.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=37",
            "jsonPointer": "/result/data/heroes/0/abilities/1",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "Warlock whispers an incantation, casting a spell on a unit that makes it deal damage to nearby enemy units and heal nearby ally units. Target Unit will also heal or be damaged depending on whether they are ally or enemy.",
            "profile": "level18-base-no-item",
            "semantic": {
              "damage": 45,
              "duration": 10,
              "tick_interval": 0.5,
              "spell_aoe": 225,
              "shard_movement_speed_pct": 0,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 140,
              "AbilityCooldown": 12
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 12,
            "mana": 140,
            "range_wu": 440.00000000000006,
            "startup_frames": 12,
            "recovery_frames": 12,
            "params": {
              "damage": 45,
              "duration": 10,
              "tick_interval": 0.5,
              "spell_aoe": 225,
              "shard_movement_speed_pct": 0,
              "AbilityCastRange": 800,
              "AbilityCastPoint": 0.2,
              "AbilityManaCost": 140,
              "AbilityCooldown": 12
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。默认对敌10秒每秒45伤害；省略邻域队友治疗模式。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "enemy",
            "ops": [
              {
                "op": "status",
                "duration": "duration",
                "values": {},
                "tick": {
                  "interval": "tick_interval",
                  "ops": [
                    {
                      "op": "damage",
                      "amount": {
                        "mul": [
                          "damage",
                          "tick_interval"
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。默认对敌10秒每秒45伤害；省略邻域队友治疗模式。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "warlock_upheaval",
          "valveAbilityId": 5164,
          "slot": "S3",
          "name": "剧变",
          "en": "Upheaval",
          "icon": "assets/r20_55/warlock_upheaval.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=37",
            "jsonPointer": "/result/data/heroes/0/abilities/2",
            "rank": 4,
            "damageTypeCode": 2,
            "immunityCode": 4,
            "dispelCode": 2,
            "description": "CHANNELED - A powerful slowing and damaging current that grows stronger as it's channeled. Lasts up to %abilitychanneltime% seconds. Enemies are slowed for %duration% second after leaving the area or the spell ends.",
            "profile": "level18-base-no-item",
            "semantic": {
              "aoe": 650,
              "slow_per_second": 20,
              "duration": 1,
              "max_slow": 100,
              "damage_per_second": 10,
              "max_damage": 110,
              "damage_tick_interval": 1,
              "imps_interval": 2,
              "minor_imp_duration": 15,
              "AbilityCastRange": 800,
              "AbilityChannelTime": 16,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 100,
              "AbilityCooldown": 30
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "magical",
            "cooldown_s": 30,
            "mana": 100,
            "range_wu": 440.00000000000006,
            "startup_frames": 24,
            "recovery_frames": 12,
            "params": {
              "aoe": 650,
              "slow_per_second": 20,
              "duration": 1,
              "max_slow": 100,
              "damage_per_second": 10,
              "max_damage": 110,
              "damage_tick_interval": 1,
              "imps_interval": 2,
              "minor_imp_duration": 15,
              "AbilityCastRange": 800,
              "AbilityChannelTime": 16,
              "AbilityCastPoint": 0.4,
              "AbilityManaCost": 100,
              "AbilityCooldown": 30
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。引导区内按暴露时长增长慢速与伤害，离开重置暴露并保留1秒慢速；被控、沉默、死亡立即停引导。省略未启用先天小恶魔。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "special",
                "name": "upheaval"
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。引导区内按暴露时长增长慢速与伤害，离开重置暴露并保留1秒慢速；被控、沉默、死亡立即停引导。省略未启用先天小恶魔。",
            "integrationRequirement": "CHANNEL_EXPOSURE_V2"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        },
        {
          "id": "warlock_rain_of_chaos",
          "valveAbilityId": 5165,
          "slot": "S4",
          "name": "混乱之祭",
          "en": "Chaotic Offering",
          "icon": "assets/r20_55/warlock_rain_of_chaos.png",
          "official": {
            "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=37",
            "jsonPointer": "/result/data/heroes/0/abilities/4",
            "rank": 3,
            "damageTypeCode": 0,
            "immunityCode": 3,
            "dispelCode": 1,
            "description": "Summons a Golem from the depths, stunning enemies for %stun_duration% seconds. The Golem lives %golem_duration% seconds, takes reduced damage from spells, has increased Slow Resistance, has Permanent Immolation and Flaming Fists on attack.",
            "profile": "level18-base-no-item",
            "semantic": {
              "golem_duration": 60,
              "stun_duration": 0.8,
              "aoe": 600,
              "golem_hp": 3000,
              "golem_dmg": 200,
              "golem_armor": 14,
              "golem_movement_speed": 360,
              "golem_health_regen": 75,
              "golem_gold_bounty": 200,
              "stun_delay": 0.5,
              "number_of_golems_scepter": 0,
              "golem_hp_scepter": 0,
              "golem_dmg_scepter": 0,
              "golem_gold_bounty_scepter": 0,
              "tooltip_golem_armor": 14,
              "bonus_slow_resistance": 60,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 600,
              "AbilityCooldown": 165
            }
          },
          "mvp": {
            "effect": "r20_55_extension",
            "passive": false,
            "input": "tap",
            "damage": 0,
            "damage_type": "none",
            "cooldown_s": 165,
            "mana": 600,
            "range_wu": 495.00000000000006,
            "startup_frames": 30,
            "recovery_frames": 12,
            "params": {
              "golem_duration": 60,
              "stun_duration": 0.8,
              "aoe": 600,
              "golem_hp": 3000,
              "golem_dmg": 200,
              "golem_armor": 14,
              "golem_movement_speed": 360,
              "golem_health_regen": 75,
              "golem_gold_bounty": 200,
              "stun_delay": 0.5,
              "number_of_golems_scepter": 0,
              "golem_hp_scepter": 0,
              "golem_dmg_scepter": 0,
              "golem_gold_bounty_scepter": 0,
              "tooltip_golem_armor": 14,
              "bonus_slow_resistance": 60,
              "AbilityCastRange": 900,
              "AbilityCastPoint": 0.5,
              "AbilityManaCost": 600,
              "AbilityCooldown": 165
            },
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。地狱火自主追击；攻击间隔1.5秒/近战150为竞技值。省略子技能献祭烈焰拳和护甲回复。"
          },
          "recipe": {
            "status": "implemented_adapted",
            "target": "point",
            "ops": [
              {
                "op": "delay",
                "delay": "stun_delay",
                "ops": [
                  {
                    "op": "status",
                    "duration": "stun_duration",
                    "values": {
                      "stun": true
                    },
                    "dispel": "strong",
                    "radius": "aoe",
                    "center": "aim"
                  },
                  {
                    "op": "summon",
                    "count": 1,
                    "hp": "golem_hp",
                    "damage": "golem_dmg",
                    "duration": "golem_duration",
                    "interval": 1.5,
                    "range": 150,
                    "speed": "golem_movement_speed"
                  }
                ]
              }
            ],
            "arenaNote": "二维距离×0.55；英雄单一对手；不包含天赋/神杖/魔晶；控制最长1.5秒。地狱火自主追击；攻击间隔1.5秒/近战150为竞技值。省略子技能献祭烈焰拳和护甲回复。"
          },
          "implementation_status": "implemented_adapted",
          "activeUnlock": false
        }
      ],
      "innates": [],
      "activeUnlock": false,
      "key": "warlock",
      "runtimeReady": false
    },
    "contract": {
      "schemaVersion": 1,
      "baseCommit": "bbdc7a5d2337df79c806a737bde3be4d65515520",
      "selectedAbilityIds": [
        5162,
        5163,
        5164,
        5165
      ],
      "automaticInnateIds": [],
      "innateCandidates": [
        {
          "id": 1274,
          "key": "warlock_eldritch_summoning",
          "passive": true,
          "status": "not_enabled_pending_official_level18_formula_review",
          "source": "https://www.dota2.com/datafeed/herodata?language=english&hero_id=37",
          "description": "Whenever an enemy unit dies while afflicted by one or more of Warlock's abilities, a minor imp is summoned that lasts for %minor_imp_duration% seconds and explodes on death. Imps will automatically seek out nearby units, favoring fatally bonded heroes, and will explode when reaching their prey.",
          "specialValues": [
            {
              "name": "minor_imp_duration",
              "values_float": [
                15
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "imp_health",
              "values_float": [
                5
              ],
              "is_percentage": false,
              "heading_loc": "IMP HEALTH:",
              "bonuses": [],
              "values_shard": [
                80
              ],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "imp_explode",
              "values_float": [
                20
              ],
              "is_percentage": false,
              "heading_loc": "EXPLOSION DAMAGE:",
              "bonuses": [],
              "values_shard": [
                45
              ],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "imp_speed",
              "values_float": [
                297
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            },
            {
              "name": "tooltip_imp_explode_radius",
              "values_float": [
                400
              ],
              "is_percentage": false,
              "heading_loc": "",
              "bonuses": [],
              "values_shard": [],
              "values_scepter": [],
              "facet_bonus": {
                "name": "",
                "values": [],
                "operation": 0
              },
              "required_facet": ""
            }
          ]
        }
      ],
      "explicitlyOmittedIds": [
        1274
      ],
      "profile": "level18-base-no-item",
      "innateRule": "No residual index is enabled. Level18 fixes stats. Only Tiny Strength conversion and Dark Seer Intelligence conversion have enabled official formula mappings; others remain pending.",
      "geometry": "Horizontal distances ×0.55, arena x45..1155. See individual slot notes.",
      "combatStatsFormula": "Source max_health +17*str_gain*22; source max_mana+17*int_gain*12. Explicit arena attack gains; attribute universal coefficient .7 is adaptation, not asserted current official.",
      "death": "Owner units/jobs clean up on death; V2 Wraith King intercepts preKO and revives after3s. Main-engine preKO wiring still required.",
      "dispel": "Basic/strong/none explicit in recipes; numeric official enums retained for audit, not guessed into execution.",
      "reflect": "No core reflection wiring yet; pure runtime respects noReflect/noLifesteal flags. Targeted notification adapter pending.",
      "break": "Passive stat projections and attack procs suppressed by break; innate rules pending.",
      "version": "r20-55-v4",
      "state": "real_engine_adapter_candidate",
      "activeUnlock": false,
      "extensionRequests": [
        "R20_55_EFFECT_CHAIN_V2",
        "MULTI_UNIT_DAMAGE_EVENTS_V2",
        "CHANNEL_EXPOSURE_V2"
      ]
    }
  }
];
