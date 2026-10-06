// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/legacy-0-9/next/status-skills.js
import { BATTLE_ABI } from "./heros-rules.js";

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/legacy-0-9/next/common.js
import { codeIdentity, EMPTY_STATE_SCHEMA } from "./heros-rules.js";
function finite(value, name, max = 1e7, min = 0) {
  if (!Number.isFinite(value) || value < min || value > max) throw Error("Invalid draft coefficient/fact: " + name);
  return value;
}
function closed(value, keys, name) {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join(",") !== [...keys].sort().join(",")) throw Error("Invalid closed draft " + name);
}
function recipeShape(m, extraKeys = []) {
  closed(m, ["damage", "damage_type", "cooldown_s", "mana", "duration_s", "range_wu", "radius_wu", "startup_frames", "recovery_frames", "active_frames", "input", "effect", "ticks", "tick_interval_s", "stun_s", "slow_pct", "slow_duration_s", "buff_value", "knockback_wu", "passive", "height", "blockable", "reflectable", "interruptible", "projectile_speed_wu_s", "hitstun_s", "officialSemantic", "charges", "charge_restore_s", "toggle", ...extraKeys], "recipe");
  if (m.toggle || m.passive) throw Error("Draft does not admit toggle/passive cast family");
}
function castFacts(event, definition, slot) {
  closed(event, ["owner", "target", "abilityId", "slot", "castId", "direction", "aimX", "heldSeconds", "reflected"], "cast");
  if (![0, 1].includes(event.owner) || event.target !== 1 - event.owner || event.abilityId !== definition.id || event.slot !== slot || ![-1, 1].includes(event.direction) || typeof event.castId !== "string" || !event.castId.length || event.castId.length > 128 || typeof event.reflected !== "boolean") throw Error("Invalid draft cast identity");
  finite(event.aimX, "aimX", 1e4, -1e4);
  finite(event.heldSeconds, "heldSeconds", 60);
}
function metadata(definition, file, requires) {
  return { behaviorId: "legacy-0-9-next/" + definition.id, revision: "0.1.0", ...codeIdentity(["rules/legacy-0-9/next/common.js", "rules/legacy-0-9/next/" + file]), stateSchema: EMPTY_STATE_SCHEMA, requires };
}
function grant(ctx, owner, definition, key, values, duration) {
  return ctx.status.apply({ owner, target: owner, abilityId: definition.id, key, duration, polarity: "positive", dispel: "none", pierces: false, values });
}
function near(ctx, cast, radius, height, parameters) {
  const f = ctx.actor(cast.owner), t = ctx.actor(cast.target);
  return Math.abs(t.x - f.x) <= radius + parameters.bodyPadding && (height !== "ground" || t.y < parameters.groundCutoff);
}
function geometry(parameters, extras = []) {
  closed(parameters, ["bodyPadding", "groundCutoff", ...extras], "execution parameters");
  finite(parameters.bodyPadding, "bodyPadding", 100);
  finite(parameters.groundCutoff, "groundCutoff", 1e3);
}
function damageRecipe(m) {
  if (!["physical", "magical", "pure"].includes(m.damage_type)) throw Error("Unsupported draft damage enum");
  finite(m.damage, "damage");
  finite(m.range_wu, "range_wu");
  finite(m.radius_wu, "radius_wu");
  finite(m.stun_s, "stun_s", 60);
  finite(m.hitstun_s, "hitstun_s", 60);
  for (const key of ["root_s", "silence_s", "slow_pct", "knockback_wu", "pull_to_distance", "vulnerability_physical", "attack_damage_debuff", "selfReflection", "missing_mana_multiplier", "execute_threshold_pct", "chip"]) if (m[key]) throw Error("Unimplemented draft dependent effect: " + key);
}
function damage(ctx, definition, source, target, reflected = false) {
  const m = definition.mvp;
  return ctx.damage({ source, target, abilityId: definition.id, amount: m.damage, type: m.damage_type, blockable: m.blockable, stunSeconds: m.stun_s, hitstunSeconds: m.hitstun_s, reflected });
}
function route(ctx, cast, definition) {
  const m = definition.mvp;
  return ctx.target.route({ owner: cast.owner, target: cast.target, abilityId: definition.id, range: m.range_wu || m.radius_wu, reflectable: true, reflected: cast.reflected });
}
function reflectedHit(ctx, definition, routed) {
  damage(ctx, definition, routed.owner, routed.target, true);
  ctx.cue({ kind: "reflect", abilityId: definition.id, actor: routed.owner, target: routed.target });
  return { reflected: true };
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/legacy-0-9/next/status-skills.js
var selected = [[2, 2, "pudge_meat_shield", "buff"], [4, 2, "sniper_take_aim", "buff"], [5, 2, "anti_mage_counterspell", "counter"]];
function legacyStatusDraftFactory() {
  return { abiVersion: BATTLE_ABI, parameters: {}, create({ hero, definition, parameters }) {
    closed(parameters, [], "status parameters");
    const row = selected.find(([id2, , ability, effect]) => hero.registryNumericId === id2 && definition.id === ability && definition.mvp.effect === effect);
    if (!row) throw Error("Unsupported draft status identity");
    const slot = row[1], m = definition.mvp, id = definition.id;
    finite(m.duration_s, "duration_s", 60);
    recipeShape(m, id === "pudge_meat_shield" ? ["block_flat", "block_fraction_cap"] : id === "sniper_take_aim" ? ["attack_range_bonus", "self_slow", "headshotGuaranteed"] : []);
    function activation(values, key = id) {
      return (ctx, event) => {
        castFacts(event, definition, slot);
        grant(ctx, event.owner, definition, key, values, m.duration_s);
        ctx.cue({ kind: "cast", abilityId: id, actor: event.owner });
      };
    }
    if (id === "pudge_meat_shield") {
      finite(m.block_flat, "block_flat");
      finite(m.block_fraction_cap, "block_fraction_cap", 1);
      return { ...metadata(definition, "status-skills.js", ["status", "cue"]), activate: activation({ block_flat: m.block_flat, block_fraction_cap: m.block_fraction_cap }), projectDamage(ctx, event) {
        closed(event, ["owner", "type", "damage"], "Meat Shield projection");
        finite(event.damage, "incoming damage");
        if (!["physical", "magical", "pure"].includes(event.type)) throw Error("Invalid incoming damage type");
        const entries = ctx.status.query(event.owner, id);
        if (!Array.isArray(entries) || entries.length > 1) throw Error("Host must expose one replacement Meat Shield status");
        if (!entries.length) return { damage: event.damage };
        const status = entries[0];
        if (status.abilityId !== id || status.key !== id || status.target !== event.owner) throw Error("Cross-status projection fact");
        finite(status.duration, "live status duration", 60, Number.MIN_VALUE);
        closed(status.values, ["block_flat", "block_fraction_cap"], "Meat Shield values");
        const flat = finite(status.values.block_flat, "live block_flat"), cap = finite(status.values.block_fraction_cap, "live block_fraction_cap", 1) || 0.4;
        return { damage: event.damage - (flat ? Math.min(flat, event.damage * cap) : 0) };
      } };
    }
    if (id === "sniper_take_aim") {
      finite(m.attack_range_bonus, "attack_range_bonus");
      finite(m.self_slow, "self_slow", 1);
      if (typeof m.headshotGuaranteed !== "boolean") throw Error("Invalid guarantee coefficient");
      return { ...metadata(definition, "status-skills.js", ["status", "cue"]), activate: activation({ attack_range_bonus: m.attack_range_bonus, self_slow: m.self_slow, headshotGuaranteed: m.headshotGuaranteed }) };
    }
    const resistance = finite(m.officialSemantic?.passive_magic_resistance_pct, "passive magic resistance percent", 100) / 100;
    return { ...metadata(definition, "status-skills.js", ["status", "cue"]), activate: activation({ mode: "spell" }, "counter"), projectDamage(ctx, event) {
      closed(event, ["owner", "type", "magicReduction"], "Counterspell reduction projection");
      finite(event.magicReduction, "existing magical reduction", 1);
      if (!["physical", "magical", "pure"].includes(event.type)) throw Error("Invalid incoming damage type");
      return { magicReduction: event.type === "magical" ? Math.max(event.magicReduction, ctx.actor(event.owner).passivesEnabled ? resistance : 0) : event.magicReduction };
    } };
  } };
}
function registerLegacyStatusDrafts(registry) {
  for (const [heroId, slot] of selected) registry.registerFactory(heroId, slot, legacyStatusDraftFactory());
  return registry;
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/legacy-0-9/next/active-skills.js
import { BATTLE_ABI as BATTLE_ABI2 } from "./heros-rules.js";
var selected2 = [[3, 0, "axe_call", "taunt"], [6, 1, "phantom_assassin_strike", "blink_strike"], [8, 1, "lina_array", "ground"], [9, 3, "lion_finger", "hit"]];
function legacyActiveDraftFactory(kind, parameters = kind === "lion_finger" ? { bodyPadding: 22, groundCutoff: 45, worldScale: 0.55 } : { bodyPadding: 22, groundCutoff: 45 }) {
  return { abiVersion: BATTLE_ABI2, parameters, create({ hero, definition, parameters: p }) {
    const row = selected2.find(([id2, , ability, effect]) => hero.registryNumericId === id2 && definition.id === ability && kind === ability && definition.mvp.effect === effect);
    if (!row) throw Error("Unsupported draft active identity");
    const m = definition.mvp, slot = row[1], id = definition.id;
    recipeShape(m, id === "axe_call" ? ["physical_reduction"] : id === "phantom_assassin_strike" ? ["buff_duration_s", "attack_interval_multiplier"] : []);
    geometry(p, id === "lion_finger" ? ["worldScale"] : []);
    finite(m.range_wu, "range_wu");
    finite(m.radius_wu, "radius_wu");
    if (id === "axe_call") {
      finite(m.duration_s, "duration_s", 60);
      finite(m.physical_reduction, "physical_reduction", 1);
      return { ...metadata(definition, "active-skills.js", ["control", "status"]), activate(ctx, event) {
        castFacts(event, definition, slot);
        if (!near(ctx, event, m.radius_wu, m.height, p) || ctx.actor(event.target).guarding) return;
        ctx.control.apply({ owner: event.owner, target: event.target, abilityId: id, key: "taunt", type: "taunt", duration: m.duration_s, pierces: false, dispel: "none" });
        grant(ctx, event.owner, definition, id, { physical_reduction: m.physical_reduction }, m.duration_s);
      } };
    }
    damageRecipe(m);
    if (id === "phantom_assassin_strike") {
      finite(m.buff_duration_s, "buff_duration_s", 60);
      finite(m.attack_interval_multiplier, "attack_interval_multiplier", 100);
      return { ...metadata(definition, "active-skills.js", ["target-route", "motion-request", "damage", "status", "cue"]), activate(ctx, event) {
        castFacts(event, definition, slot);
        if (!near(ctx, event, m.range_wu, m.height, p)) return;
        const routed = route(ctx, event, definition);
        if (!routed.accepted) return;
        if (routed.reflected) return reflectedHit(ctx, definition, routed);
        const target = ctx.actor(event.target);
        ctx.motion({ actor: event.owner, abilityId: id, castId: event.castId, kind: "blink", destinationX: target.x - event.direction * 70, speed: 0, duration: 0 });
        damage(ctx, definition, event.owner, event.target);
        grant(ctx, event.owner, definition, id, { attack_interval_multiplier: m.attack_interval_multiplier }, m.buff_duration_s || 2);
      } };
    }
    if (id === "lina_array") return { ...metadata(definition, "active-skills.js", ["damage", "cue"]), activate(ctx, event) {
      castFacts(event, definition, slot);
      const t = ctx.actor(event.target);
      if (Math.abs(t.x - event.aimX) <= m.radius_wu + p.bodyPadding && (m.height !== "ground" || t.y < p.groundCutoff)) damage(ctx, definition, event.owner, event.target);
      ctx.cue({ kind: "hit", abilityId: id, actor: event.owner, target: event.target });
    } };
    finite(p.worldScale, "worldScale", 1);
    finite(m.duration_s, "form duration", 60);
    const semantic = m.officialSemantic;
    const form = { attack_range_override: finite(semantic?.punch_attack_range, "form range") * p.worldScale, attack_bonus: finite(semantic?.punch_bonus_damage, "form attack bonus"), move_bonus: finite(semantic?.punch_bonus_movespeed, "form move bonus") * p.worldScale, melee: true };
    return { ...metadata(definition, "active-skills.js", ["target-route", "damage", "status", "cue"]), activate(ctx, event) {
      castFacts(event, definition, slot);
      const inRange = near(ctx, event, m.range_wu || m.radius_wu, m.height, p);
      let routed = null;
      if (inRange) {
        routed = route(ctx, event, definition);
        if (!routed.accepted) return;
        if (routed.reflected) return reflectedHit(ctx, definition, routed);
      }
      grant(ctx, event.owner, definition, "lionForm", form, m.duration_s);
      if (inRange) {
        damage(ctx, definition, event.owner, event.target);
        ctx.cue({ kind: "targeted-hit", abilityId: id, actor: event.owner, target: event.target });
      }
    } };
  } };
}
function registerLegacyActiveDrafts(registry) {
  for (const [heroId, slot, id] of selected2) registry.registerFactory(heroId, slot, legacyActiveDraftFactory(id));
  return registry;
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/legacy-0-9/next/index.js
function registerLegacyNextDrafts(registry) {
  return registerLegacyActiveDrafts(registerLegacyStatusDrafts(registry));
}
export {
  legacyActiveDraftFactory,
  legacyStatusDraftFactory,
  registerLegacyActiveDrafts,
  registerLegacyNextDrafts,
  registerLegacyStatusDrafts
};
