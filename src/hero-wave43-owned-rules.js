// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/innates.js
import { codeIdentity as codeIdentity2 } from "./heros-rules.js";

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/common.js
import { codeIdentity } from "./heros-rules.js";
import { EMPTY_STATE_SCHEMA, defineStateSchema } from "./heros-rules.js";
var IDS = Object.freeze([25, 31, 45, 100]);
var ADAPT = Object.freeze({ profile: "arena-level18-base-core4", worldScale: 0.55, worldDecimals: 8, contactPadding: 22, statusTick: 0.25, groundHeight: 45, sprintTailFloor: 1e-8, reflectOffset: 40, poisonTickLimit: 6, shieldEpsilon: 1e-8 });
var EPS = 1e-8;
var actor = (id2) => {
  if (id2 !== 0 && id2 !== 1) throw Error("Invalid Core4 actor");
  return id2;
};
var bounded = (v, min = 0, max = 1e7) => {
  if (!Number.isFinite(v) || v < min || v > max) throw Error("Invalid Core4 numeric fact");
  return v;
};
var dt = (e) => bounded(e.liveDt ?? e.dt, 0, 60);
var scale = (n) => Number((n * ADAPT.worldScale).toFixed(ADAPT.worldDecimals));
var number = (max = 1e7, min = 0) => ({ type: "number", minimum: min, maximum: max });
var obj = (properties) => ({ type: "object", properties, required: Object.keys(properties), additionalProperties: false });
var nullable = (s) => ({ anyOf: [{ type: "null" }, s] });
var ownerShape = (s) => obj({ "0": s, "1": s });
var schema = (id2, shape) => defineStateSchema({ id: "heros/core4/" + id2, schema: nullable(shape) });
var live = (ctx, id2) => ctx.actor(actor(id2)).alive;
function validate(config) {
  const p = config.definition.mvp.params;
  if (!p || typeof p !== "object") throw Error("Missing Core4 parameters");
  for (const [key, value] of Object.entries(p)) {
    if (!Number.isFinite(value) || Math.abs(value) > 1e6) throw Error("Invalid Core4 coefficient " + key);
    if (value < 0 && !["crush_extra_slow", "crush_attack_slow_tooltip", "armor_reduction"].includes(key)) throw Error("Invalid Core4 negative coefficient " + key);
  }
  for (const [key, value] of Object.entries(p)) {
    if ((key.includes("duration") || key === "drain_length") && (value < 0 || value > 60)) throw Error("Invalid Core4 duration " + key);
  }
  return p;
}
function positive(p, keys, max = 3600) {
  for (const key of keys) bounded(p[key], 1e-3, max);
}
function percent(p, keys) {
  for (const key of keys) bounded(p[key], 0, 100);
}
function base(config, file, requires2, extra, stateSchema = EMPTY_STATE_SCHEMA) {
  validate(config);
  return { behaviorId: "core4/" + config.definition.id, revision: "1.0.0", ...codeIdentity(["rules/core4/common.js", "rules/core4/innates.js", "rules/core4/index.js", file]), requires: requires2, stateSchema, ...extra };
}
function damage(ctx, c, source, target, amount, type = "magical", flags = {}) {
  bounded(amount);
  if (!live(ctx, target) || amount <= 0) return null;
  return ctx.damage({ source: actor(source), target: actor(target), abilityId: c.definition.id, amount, type, blockable: false, dot: true, ...flags });
}
function status(ctx, c, owner, target, key, duration, values, dispel = "basic", pierces = false, polarity = "negative") {
  bounded(duration, 0, 3600);
  return ctx.status.apply({ owner: actor(owner), target: actor(target), abilityId: c.definition.id, key, duration, values, dispel, pierces, polarity });
}
var rows = (ctx, target, key) => ctx.status.query(actor(target), key);
var effective = (ctx, s) => s.remaining > EPS && (s.pierces || s.polarity === "positive" || !ctx.actor(s.target).debuffImmune);
var enabledRows = (ctx, target, key) => rows(ctx, target, key).filter((s) => effective(ctx, s));
var outputCue = (kind, c, owner, target, extra = {}) => ({ presentation: { kind, abilityId: c.definition.id, actor: actor(owner), ...target === void 0 ? {} : { target: actor(target) }, ...extra } });
function field(ctx, c, cast, profile, radius, duration, data = {}) {
  return ctx.legacyEffect.spawn({ owner: actor(cast.owner), abilityId: c.definition.id, castId: cast.castId, kind: "area", x: ctx.actor(cast.owner).x, radius, duration, data: { profile, ...data } });
}
function missile(ctx, c, cast, profile, speed, range, data = {}) {
  const f = ctx.actor(cast.owner), t = ctx.actor(cast.target);
  return ctx.projectile({ owner: cast.owner, abilityId: c.definition.id, castId: cast.castId, direction: t.x >= f.x ? 1 : -1, speed, range, height: "both", contactHandler: "onContact", data: { profile, originOffsetX: 0, originOffsetY: 100, hitRadius: 18, reflectionOffset: ADAPT.reflectOffset, ...data } });
}
function planning(c, ctx, facts, { targeted = false, toggle = false, borrowed = false } = {}) {
  const m = c.definition.mvp, f = ctx.actor(facts.owner), t = ctx.actor(facts.target), result = { accepted: true, manaCost: m.mana, cooldownSeconds: m.cooldown_s, chargeCost: 0, windupSeconds: m.startup_frames / 60, recoverySeconds: m.recovery_frames / 60, action: "cast" }, reject = (reason) => ({ ...result, accepted: false, reason });
  if (m.passive) return reject("passive");
  if (!f.alive) return reject("dead");
  if (borrowed) {
    if ((facts.activeRemaining ?? 0) > 0 || facts.cooldownRemaining > EPS || facts.automatic && !f.passivesEnabled || !facts.automatic && f.silenced) return reject("borrowed-admission");
    return { ...result, manaCost: 0, windupSeconds: 0 };
  }
  if (!facts.actionReady || f.silenced) return reject("not-ready");
  if (facts.cooldownRemaining > EPS) return reject("cooldown");
  if (toggle) return { ...result, manaCost: 0, cooldownSeconds: 0 };
  if (targeted && (!t.alive || t.invulnerable || ctx.target.distance(facts.owner, facts.target) > m.range_wu + 22)) return reject("target");
  if (facts.manaAvailable < m.mana) return reject("mana");
  return result;
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/innates.js
var INNATES = Object.freeze({ seaborn: Object.freeze({ armor: 5.4, attackMultiplier: 1.222, moveMultiplier: 1.18, regenAmount: 3.125, regenInterval: 0.5 }), predator: Object.freeze({ missingHpDamage: 100, factor: 0.25 }), withering: Object.freeze({ duration: 5, hpThresholdFraction: 0.4, healingMultiplier: 0.665, reduction: 0.335 }) });
function seaborn(config, bash) {
  const p = INNATES.seaborn;
  return { ...bash, ...codeIdentity2(["rules/core4/bash.js", "rules/core4/common.js", "rules/core4/innates.js", "rules/core4/index.js"]), requires: [...bash.requires, "heal"], projectAttack(ctx, e) {
    return { damage: e.water && ctx.actor(e.actor).heroId === config.hero.registryNumericId && ctx.actor(e.actor).passivesEnabled ? e.damage * p.attackMultiplier : e.damage };
  }, projectDamage(ctx, e) {
    if (e.stage === "armor" && e.type === "physical") return { armorAdd: e.water && ctx.actor(e.target).heroId === config.hero.registryNumericId && ctx.actor(e.target).passivesEnabled ? p.armor : 0 };
  }, onStage(ctx, e) {
    if (e.kind === "movement-projection") return { speedMultiplier: e.water && ctx.actor(e.actor).heroId === config.hero.registryNumericId && ctx.actor(e.actor).passivesEnabled ? p.moveMultiplier : 1 };
    if (e.kind === "water-regeneration") {
      if (e.water && ctx.actor(e.actor).heroId === config.hero.registryNumericId && ctx.actor(e.actor).alive && ctx.actor(e.actor).passivesEnabled) return ctx.heal({ source: e.actor, target: e.actor, abilityId: config.definition.id, amount: p.regenAmount });
    }
    if (e.kind === "water-regeneration-profile") return { enabled: e.water && ctx.actor(e.actor).heroId === config.hero.registryNumericId && ctx.actor(e.actor).passivesEnabled, interval: p.regenInterval, resetWhenDisabled: true };
  } };
}
function predator(ctx, e) {
  const target = ctx.actor(e.target);
  if (ctx.actor(e.actor).heroId !== 45 || !e.landed || !target.alive || !ctx.actor(e.actor).passivesEnabled) return;
  bounded(target.maxHp, 1e-3, 1e7);
  bounded(target.hp, 0, target.maxHp);
  return { innateDamage: { effectAlias: "viper_predator", source: actor(e.actor), target: actor(e.target), amount: (1 - target.hp / target.maxHp) * INNATES.predator.missingHpDamage * INNATES.predator.factor, type: "physical", blockable: false, dot: true, passive: true } };
}
function withering(config, ctx, e) {
  if (ctx.actor(e.source).heroId !== config.hero.registryNumericId || e.damage <= 0 || e.source === e.target || !ctx.actor(e.source).alive || !ctx.actor(e.source).passivesEnabled) return;
  return status(ctx, config, e.source, e.target, "withering", INNATES.withering.duration, { healReduction: INNATES.withering.reduction }, "none");
}
function witheringHealing(ctx, e) {
  const f = ctx.actor(e.actor);
  return { amount: enabledRows(ctx, e.actor, "withering").length && f.hp / f.maxHp < INNATES.withering.hpThresholdFraction ? e.amount * INNATES.withering.healingMultiplier : e.amount };
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/index.js
import { BATTLE_ABI } from "./heros-rules.js";

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/razor.js
var FILE = "rules/core4/razor.js";
function createRazor(c) {
  const p = validate(c), id2 = c.definition.id;
  if (id2 === "razor_plasma_field") {
    positive(p, ["total_ability_time", "radius"]);
    percent(p, ["slow_min", "slow_max"]);
    if (p.damage_max < p.damage_min || p.slow_max < p.slow_min) throw Error("Reversed Plasma coefficients");
    return base(c, FILE, ["legacy-effect", "damage", "status"], {
      planCast: (ctx, e) => planning(c, ctx, e),
      activate(ctx, e) {
        return { effect: field(ctx, c, e, "core4-returning-ring", scale(p.radius), p.total_ability_time, { halfTime: p.total_ability_time / 2, contactHandler: "onContact", contactPadding: 22, oneHitPerPhase: true }) };
      },
      onContact(ctx, e) {
        if (!["out", "back"].includes(e.phase)) throw Error("Invalid Plasma phase");
        const fraction = Math.max(0, Math.min(1, bounded(e.distance) / scale(p.radius)));
        damage(ctx, c, e.source, e.target, p.damage_min + (p.damage_max - p.damage_min) * fraction);
        status(ctx, c, e.source, e.target, "plasma_slow", p.slow_duration, { moveSlow: (p.slow_min + (p.slow_max - p.slow_min) * fraction) / 100 }, "basic");
        return outputCue("core4-plasma-contact", c, e.source, e.target, { phase: e.phase, distance: e.distance });
      },
      onStage(ctx, e) {
        if (e.kind === "movement-projection") {
          let slow = 0;
          for (const s of enabledRows(ctx, e.actor, "plasma_slow")) slow = Math.max(slow, s.values.moveSlow);
          return { moveSlow: slow };
        }
      }
    });
  }
  if (id2 === "razor_static_link") {
    positive(p, ["drain_length", "drain_duration"]);
    const link = obj({ handle: { type: "string", minLength: 1, maxLength: 160 }, owner: { type: "integer", minimum: 0, maximum: 1 }, target: { type: "integer", minimum: 0, maximum: 1 }, amount: number(Math.min(1e7, p.drain_rate * p.drain_length)), age: number(p.drain_length), draining: { type: "boolean" } }), st = schema("static-link", obj({ links: { type: "array", maxItems: 32, items: link } }));
    if (p.drain_rate * p.drain_length > 1e7) throw Error("Link bound overflow");
    const read2 = (ctx) => structuredClone(ctx.state.read() ?? { links: [] });
    return base(c, FILE, ["legacy-effect"], {
      planCast: (ctx, e) => planning(c, ctx, e, { targeted: true }),
      activate(ctx, e) {
        if (!ctx.actor(e.target).alive || ctx.target.distance(e.owner, e.target) > c.definition.mvp.range_wu + 22) return;
        const s = read2(ctx);
        if (s.links.length >= 32) throw Error("Core4 link capacity");
        const h = field(ctx, c, e, "core4-static-link", c.definition.mvp.range_wu, p.drain_length + p.drain_duration, { target: e.target, leash: c.definition.mvp.range_wu + scale(p.drain_range_buffer), callback: "onStage" });
        s.links.push({ handle: h, owner: e.owner, target: e.target, amount: 0, age: 0, draining: true });
        ctx.state.write(s);
        return { handle: h };
      },
      onStage(ctx, e) {
        if (e.kind === "link-step") {
          const s = read2(ctx), l = s.links.find((x) => x.handle === e.handle);
          if (!l) return;
          let ended = false;
          const wasDraining = l.draining;
          if (l.draining) {
            if (!ctx.actor(l.owner).alive || !ctx.actor(l.target).alive || ctx.target.distance(l.owner, l.target) > c.definition.mvp.range_wu + scale(p.drain_range_buffer)) {
              l.draining = false;
              ended = true;
            } else {
              const live2 = Math.min(dt(e), p.drain_length - l.age);
              l.age += live2;
              l.amount += p.drain_rate * live2;
              if (l.age >= p.drain_length - EPS) l.draining = false;
            }
          }
          ctx.state.write(s);
          return { amount: l.amount, draining: l.draining, ...wasDraining && !l.draining ? { retainedSeconds: p.drain_duration } : {}, ...ended ? outputCue("core4-link-break", c, l.owner, l.target, { amount: l.amount }) : {} };
        }
        if (e.kind === "link-end") {
          const s = read2(ctx);
          s.links = s.links.filter((l) => l.handle !== e.handle);
          ctx.state.write(s);
        }
        if (e.kind === "moving-attack") {
          return { allowed: read2(ctx).links.some((l) => l.owner === e.actor && l.draining) };
        }
      },
      projectAttack(ctx, e) {
        let value = e.damage;
        for (const l of read2(ctx).links) {
          if (l.owner === e.actor) value += l.amount;
          if (l.target === e.actor) value -= l.amount;
        }
        return { damage: value };
      },
      onDeath(ctx, e) {
        const s = read2(ctx), changed = s.links.filter((l) => l.owner === e.actor || l.target === e.actor);
        for (const l of changed) l.draining = false;
        ctx.state.write(s);
        return { retainLinks: changed.map((l) => ({ handle: l.handle, maxRemaining: p.drain_duration })) };
      }
    }, st);
  }
  if (id2 === "razor_storm_surge") {
    positive(p, ["strike_internal_cd"]);
    percent(p, ["strike_pct_chance", "strike_move_slow_pct"]);
    const st = schema("storm-surge", obj({ cooldowns: ownerShape(number(p.strike_internal_cd)) })), read2 = (ctx) => structuredClone(ctx.state.read() ?? { cooldowns: { "0": 0, "1": 0 } });
    const proc = (ctx, e, targeted) => {
      const source = actor(e.actor), target = actor(e.target), f = ctx.actor(source), t = ctx.actor(target), s = read2(ctx);
      if (f.heroId !== c.hero.registryNumericId || !f.alive || !t.alive || !f.passivesEnabled || s.cooldowns[source] > 0 || ctx.target.distance(source, target) > scale(p.strike_search_radius) + 22 || !targeted && ctx.random() >= p.strike_pct_chance / 100) return;
      s.cooldowns[source] = p.strike_internal_cd;
      ctx.state.write(s);
      damage(ctx, c, source, target, p.strike_damage, "magical", { reflected: true, noReflect: true, noLifesteal: true, passive: true });
      status(ctx, c, source, target, "storm_surge", p.strike_slow_duration, { moveSlow: p.strike_move_slow_pct / 100 });
      return outputCue("core4-storm-surge", c, source, target, { targeted });
    };
    return base(c, FILE, ["damage", "status"], { onTargeted: (ctx, e) => proc(ctx, e, true), onDamage(ctx, e) {
      if (e.damage <= 0 || e.source === e.target || e.reflected || e.noReflect || !e.basic) return;
      return proc(ctx, { actor: e.target, target: e.source }, false);
    }, onStage(ctx, e) {
      if (e.kind === "actor-live") {
        const s = read2(ctx);
        s.cooldowns[actor(e.actor)] = Math.max(0, s.cooldowns[e.actor] - dt(e));
        ctx.state.write(s);
      }
      if (e.kind === "movement-projection") {
        let slow = 0;
        for (const s of enabledRows(ctx, e.actor, "storm_surge")) slow = Math.max(slow, s.values.moveSlow);
        return { moveSlow: slow };
      }
    } }, st);
  }
  if (id2 === "razor_eye_of_the_storm") {
    positive(p, ["duration", "strike_interval"]);
    return base(c, FILE, ["legacy-effect", "damage", "status"], { planCast: (ctx, e) => planning(c, ctx, e), activate(ctx, e) {
      return { effect: field(ctx, c, e, "core4-eye-storm", scale(p.radius), p.duration, { interval: p.strike_interval, firstTick: p.strike_interval, followOwner: true, callback: "onStage", priority: "ward-unless-live-linked-hero" }) };
    }, onStage(ctx, e) {
      if (e.kind === "storm-strike") {
        if (!ctx.actor(e.source).alive) return { end: true };
        if (e.wardChosen) return { endWard: { handle: e.wardHandle, reason: "attack" }, ...outputCue("core4-storm-ward", c, e.source, void 0, { wardX: bounded(e.wardX, 0, 1200) }) };
        const t = ctx.actor(e.target);
        if (!t.alive || t.invulnerable || ctx.target.distance(e.source, e.target) > scale(p.radius) + 22) return;
        damage(ctx, c, e.source, e.target, p.damage, "physical");
        const key = "storm_armor_" + e.handle, old = enabledRows(ctx, e.target, key)[0];
        if (old) return { statusArmorDelta: { handle: old.handle, delta: -p.armor_reduction, preserveTick: true }, ...outputCue("core4-storm-strike", c, e.source, e.target, { stormHandle: e.handle }) };
        status(ctx, c, e.source, e.target, key, Math.max(dt(e), bounded(e.remaining, 0, p.duration)), { armor: -p.armor_reduction }, "none", true);
        return outputCue("core4-storm-strike", c, e.source, e.target, { stormHandle: e.handle });
      }
      if (e.kind === "storm-owner-death") return { removeArmorKey: "storm_armor_" + e.handle };
    }, projectDamage(ctx, e) {
      if (e.type !== "physical" || e.stage !== "armor") return;
      let armor = 0;
      for (const row of e.ownedStormStatuses ?? []) {
        if (row.effective) armor += bounded(row.armor, -1e7, 1e7);
      }
      return { armorAdd: armor };
    } });
  }
  throw Error("Unknown Razor selected slot");
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/slardar.js
var FILE2 = "rules/core4/slardar.js";
function createSlardar(c) {
  const p = validate(c), id2 = c.definition.id;
  if (id2 === "slardar_sprint") {
    positive(p, ["duration", "speed_burst_max_duration"]);
    percent(p, ["bonus_speed", "slow_resistance_tooltip"]);
    if (p.duration <= p.speed_burst_max_duration) throw Error("Invalid sprint tail");
    return base(c, FILE2, ["status"], { planCast: (ctx, e) => ({ ...planning(c, ctx, e), recoverySeconds: 0 }), activate(ctx, e) {
      status(ctx, c, e.owner, e.owner, "sprint", p.duration, { profile: "core4-sprint", speedBonus: p.bonus_speed / 100, burstDuration: p.speed_burst_max_duration, resistance: p.slow_resistance_tooltip / 100 }, "none", true, "positive");
      return { recoverySeconds: 0 };
    }, onStage(ctx, e) {
      if (e.kind !== "movement-projection") return;
      const s = enabledRows(ctx, e.actor, "sprint")[0];
      if (!s) return { speedMultiplier: 1, slowResistance: 0 };
      const age = bounded(s.elapsed, 0, p.duration), remaining = bounded(s.remaining, 0, p.duration), resist = age <= p.speed_burst_max_duration ? p.slow_resistance_tooltip / 100 : Math.max(0, remaining / (p.duration - p.speed_burst_max_duration)) * p.slow_resistance_tooltip / 100;
      return { speedMultiplier: 1 + p.bonus_speed / 100, slowResistance: resist };
    } });
  }
  if (id2 === "slardar_slithereen_crush") {
    positive(p, ["puddle_duration"]);
    return base(c, FILE2, ["legacy-effect", "damage", "control", "status"], { planCast: (ctx, e) => planning(c, ctx, e), activate(ctx, e) {
      const radius = scale(p.crush_radius), h = field(ctx, c, e, "core4-water", scale(p.puddle_radius), p.puddle_duration, { groundOnly: true });
      const t = ctx.actor(e.target);
      if (ctx.target.distance(e.owner, e.target) <= radius + 22 && t.y < 45) {
        damage(ctx, c, e.owner, e.target, p.crush_damage, "physical", { dot: false });
        ctx.control.apply({ owner: e.owner, target: e.target, abilityId: id2, key: "crush", type: "stun", duration: p.stun_duration, pierces: false, dispel: "strong" });
        status(ctx, c, e.owner, e.target, "crush", p.crush_extra_slow_duration + p.stun_duration, { moveSlow: -p.crush_extra_slow / 100, attackSlow: -p.crush_attack_slow_tooltip, delay: p.stun_duration }, "strong");
      }
      return { effect: h, ...outputCue("core4-crush", c, e.owner, void 0, { radius }) };
    }, projectInterval(ctx, e) {
      let attackSlow = 0;
      for (const s of enabledRows(ctx, e.actor, "crush")) if (s.elapsed >= p.stun_duration) attackSlow = Math.max(attackSlow, -p.crush_attack_slow_tooltip);
      return { attackSlowMax: attackSlow };
    }, onStage(ctx, e) {
      if (e.kind === "movement-projection") {
        let moveSlow = 0;
        for (const s of enabledRows(ctx, e.actor, "crush")) if (s.elapsed >= p.stun_duration) moveSlow = Math.max(moveSlow, -p.crush_extra_slow / 100);
        return { moveSlow };
      }
    } });
  }
  if (id2 === "slardar_amplify_damage") {
    positive(p, ["duration", "puddle_duration"]);
    const trail = nullable(obj({ handle: { type: "string", minLength: 1, maxLength: 160 }, owner: { type: "integer", minimum: 0, maximum: 1 }, tick: number(0.15), lastX: number(1200, 0) })), st = schema("haze-trails", obj({ targets: ownerShape(trail) })), read2 = (ctx) => structuredClone(ctx.state.read() ?? { targets: { "0": null, "1": null } });
    return base(c, FILE2, ["status", "legacy-effect"], { planCast: (ctx, e) => planning(c, ctx, e, { targeted: true }), activate(ctx, e) {
      const h = status(ctx, c, e.owner, e.target, "haze", p.duration, { armor: p.armor_reduction, revealed: true }, "basic", true);
      if (h) {
        const s = read2(ctx);
        s.targets[e.target] = { handle: h, owner: e.owner, tick: 0, lastX: ctx.actor(e.target).x };
        ctx.state.write(s);
      }
      return outputCue("core4-haze", c, e.owner, e.target);
    }, projectDamage(ctx, e) {
      if (e.stage !== "armor" || e.type !== "physical") return;
      return { armorAdd: enabledRows(ctx, e.target, "haze").reduce((sum, s) => sum + s.values.armor, 0) };
    }, onStage(ctx, e) {
      if (e.kind === "haze-live") {
        const s = read2(ctx), target = actor(e.target), trail2 = s.targets[target];
        if (!trail2 || trail2.handle !== e.handle) return;
        trail2.tick -= dt(e);
        if (trail2.tick <= 0) {
          trail2.tick = 0.15;
          const x = ctx.actor(target).x;
          if (Math.abs(x - trail2.lastX) >= 20 || e.waterNearby === false) {
            trail2.lastX = x;
            ctx.state.write(s);
            const h = ctx.legacyEffect.spawn({ owner: trail2.owner, abilityId: id2, castId: e.castId, kind: "area", x, radius: scale(p.puddle_radius), duration: p.puddle_duration, data: { profile: "core4-water", groundOnly: true } });
            return { effect: h };
          }
        }
        ctx.state.write(s);
      }
      if (e.kind === "haze-removed") {
        const s = read2(ctx);
        if (s.targets[e.target]?.handle === e.handle) {
          s.targets[e.target] = null;
          ctx.state.write(s);
        }
      }
      if (e.kind === "reveal-projection") return { revealed: enabledRows(ctx, e.actor, "haze").length > 0 };
    }, onDeath(ctx, e) {
      const s = read2(ctx);
      s.targets[actor(e.actor)] = null;
      ctx.state.write(s);
    } }, st);
  }
  throw Error("Unknown Slardar selected slot");
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/viper.js
var FILE3 = "rules/core4/viper.js";
function createViper(c) {
  const p = validate(c), id2 = c.definition.id;
  if (id2 === "viper_poison_attack") {
    positive(p, ["duration"]);
    percent(p, ["movement_speed", "magic_resistance"]);
    if (!Number.isSafeInteger(p.max_stacks) || p.max_stacks < 1 || p.max_stacks > 64) throw Error("Invalid poison stacks");
    const st = schema("poison-toggle", obj({ enabled: ownerShape({ type: "boolean" }) })), read2 = (ctx) => structuredClone(ctx.state.read() ?? { enabled: { "0": false, "1": false } });
    return base(c, FILE3, ["mana", "status", "damage"], { planCast: (ctx, e) => planning(c, ctx, e, { toggle: true }), activate(ctx, e) {
      const s = read2(ctx), i = actor(e.owner);
      s.enabled[i] = !s.enabled[i];
      ctx.state.write(s);
      return { toggle: s.enabled[i], cost: 0, presentation: { kind: "core4-poison-toggle", actor: i, enabled: s.enabled[i] } };
    }, projectAttack(ctx, e) {
      const f = ctx.actor(e.actor);
      if (f.heroId !== c.hero.registryNumericId || !read2(ctx).enabled[e.actor] || f.mp < p.AbilityManaCost) return { damage: e.damage, corePoison: false };
      ctx.mana({ actor: e.actor, abilityId: id2, delta: -p.AbilityManaCost });
      return { damage: e.damage, corePoison: true, attackCost: p.AbilityManaCost };
    }, onAttack(ctx, e) {
      if (ctx.actor(e.actor).heroId !== c.hero.registryNumericId || !e.landed || !e.corePoison || !ctx.actor(e.target).alive || ctx.actor(e.target).debuffImmune) return;
      const h = status(ctx, c, e.actor, e.target, "poison", p.duration, { profile: "core4-poison-stack", stackLimit: p.max_stacks, replacement: "lowest-life", dps: p.damage, moveSlow: p.movement_speed / 100, magicAmplification: p.magic_resistance / 100, interval: 0.25 }, "basic");
      return { handle: h, ...outputCue("core4-poison-stack", c, e.actor, e.target) };
    }, onStage(ctx, e) {
      if (e.kind === "status-periodic" && e.key === "poison") {
        return damage(ctx, c, e.source, e.target, p.damage * 0.25);
      }
      if (e.kind === "movement-projection") {
        const n = ctx.actor(e.actor).debuffImmune ? 0 : rows(ctx, e.actor, "poison").filter((s) => s.remaining > EPS).length;
        return { moveSlow: n * p.movement_speed / 100 };
      }
    }, projectDamage(ctx, e) {
      if (e.type !== "magical" || e.stage !== "core-magical") return;
      const n = ctx.actor(e.target).debuffImmune ? 0 : rows(ctx, e.target, "poison").filter((s) => s.remaining > EPS).length;
      return { damage: e.damage * (1 + n * p.magic_resistance / 100) };
    }, onDeath(ctx, e) {
      const s = read2(ctx);
      s.enabled[actor(e.actor)] = false;
      ctx.state.write(s);
    } }, st);
  }
  if (id2 === "viper_nethertoxin") {
    positive(p, ["max_duration", "duration", "projectile_speed"]);
    if (p.max_damage < p.min_damage || p.max_damage * 60 > 1e7) throw Error("Invalid toxin damage bound");
    const target = obj({ exposure: number(3600), owner: { anyOf: [{ type: "null" }, { type: "integer", minimum: 0, maximum: 1 }] } }), st = schema("toxin-exposure", obj({ targets: ownerShape(target) })), read2 = (ctx) => structuredClone(ctx.state.read() ?? { targets: { "0": { exposure: 0, owner: null }, "1": { exposure: 0, owner: null } } });
    return base(c, FILE3, ["projectile-request", "legacy-effect", "damage"], { planCast: (ctx, e) => planning(c, ctx, e), activate(ctx, e) {
      const f = ctx.actor(e.owner), aim = Math.max(45, Math.min(1155, Math.max(f.x - c.definition.mvp.range_wu, Math.min(f.x + c.definition.mvp.range_wu, bounded(e.aimX, 0, 1200)))));
      return { projectile: missile(ctx, c, e, "core4-toxin-point", scale(p.projectile_speed), 1200, { targetX: aim, originOffsetY: 85, reflectable: false }) };
    }, onContact(ctx, e) {
      return { effect: ctx.legacyEffect.spawn({ owner: e.source, abilityId: id2, castId: e.castId, kind: "area", x: bounded(e.x, 45, 1155), radius: scale(p.radius), duration: p.duration, data: { profile: "core4-toxin", groundHeight: 45, contactPadding: 22, callback: "onStage" } }) };
    }, onStage(ctx, e) {
      if (e.kind !== "toxin-step") return;
      const target2 = actor(e.target), f = ctx.actor(target2), s = read2(ctx), v = s.targets[target2];
      if (e.inside && f.alive && !f.invulnerable && !f.debuffImmune) {
        const before = v.exposure;
        v.exposure += dt(e);
        v.owner = actor(e.source);
        if (v.exposure > 3600) throw Error("Core4 toxin exposure overflow");
        const avg = (Math.min(p.max_duration, before) + Math.min(p.max_duration, v.exposure)) / 2;
        ctx.state.write(s);
        const receipt = damage(ctx, c, v.owner, target2, (p.min_damage + (p.max_damage - p.min_damage) * avg / p.max_duration) * dt(e));
        return { exposure: v.exposure, toxinOwner: v.owner, receipt };
      }
      v.exposure = 0;
      v.owner = null;
      ctx.state.write(s);
      return { exposure: 0, toxinOwner: null };
    }, projectInterval(ctx, e) {
      return { attackSlowMax: read2(ctx).targets[e.actor].exposure > 0 && !ctx.actor(e.actor).debuffImmune ? p.attack_slow : 0 };
    } }, st);
  }
  if (id2 === "viper_corrosive_skin") {
    positive(p, ["duration"]);
    percent(p, ["bonus_magic_resistance"]);
    return base(c, FILE3, ["status", "damage"], { onAttack: predator, projectDamage(ctx, e) {
      if (e.stage === "core-magical" && e.type === "magical") return { damage: e.damage * (ctx.actor(e.target).heroId === c.hero.registryNumericId && ctx.actor(e.target).passivesEnabled ? 1 - p.bonus_magic_resistance / 100 : 1) };
    }, onDamage(ctx, e) {
      const f = ctx.actor(e.target);
      if (f.heroId !== c.hero.registryNumericId || e.damage <= 0 || e.source === e.target || e.reflected || e.noReflect || !f.alive || !f.passivesEnabled || ctx.target.distance(e.source, e.target) > scale(p.max_range)) return;
      return { handle: status(ctx, c, e.target, e.source, "skin", p.duration, { dps: p.damage, attackSlow: p.bonus_attack_speed, reflected: true, interval: 0.25 }, "basic") };
    }, onStage(ctx, e) {
      if (e.kind === "status-periodic" && e.key === "skin") return damage(ctx, c, e.source, e.target, p.damage * 0.25, "magical", { reflected: true, noReflect: true, noLifesteal: true });
    }, projectInterval(ctx, e) {
      let value = 0;
      for (const s of enabledRows(ctx, e.actor, "skin")) value = Math.max(value, s.values.attackSlow);
      return { attackSlowMax: value };
    } });
  }
  if (id2 === "viper_viper_strike") {
    positive(p, ["duration", "projectile_speed"]);
    percent(p, ["bonus_movement_speed"]);
    return base(c, FILE3, ["projectile-request", "status", "damage"], { planCast: (ctx, e) => planning(c, ctx, e, { targeted: true }), activate(ctx, e) {
      return { projectile: missile(ctx, c, e, "core4-counter-missile", scale(p.projectile_speed), scale(p.AbilityCastRange) + 22, { kind: "viper_strike", reflectionRange: scale(p.AbilityCastRange) + 22 }) };
    }, onContact(ctx, e) {
      return { handle: status(ctx, c, e.source, e.target, "viper_strike", p.duration, { interval: 0.25, doesBreak: p.does_break === 1, dps: p.damage }, "none", true) };
    }, onStage(ctx, e) {
      if (e.kind === "status-periodic" && e.key === "viper_strike") return damage(ctx, c, e.source, e.target, p.damage * 0.25);
      if (e.kind === "movement-projection") {
        let slow = 0;
        for (const s of enabledRows(ctx, e.actor, "viper_strike")) slow = Math.max(slow, p.bonus_movement_speed / 100 * s.remaining / p.duration);
        return { moveSlow: slow };
      }
      if (e.kind === "break-projection") return { broken: rows(ctx, e.actor, "viper_strike").some((s) => s.remaining > EPS) };
    }, projectInterval(ctx, e) {
      let slow = 0;
      for (const s of enabledRows(ctx, e.actor, "viper_strike")) slow = Math.max(slow, p.bonus_attack_speed * s.remaining / p.duration);
      return { attackSlowMax: slow };
    } });
  }
  throw Error("Unknown Viper selected slot");
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/abaddon.js
var FILE4 = "rules/core4/abaddon.js";
function createAbaddon(c) {
  const p = validate(c), id2 = c.definition.id;
  if (id2 === "abaddon_death_coil") {
    positive(p, ["missile_speed"]);
    percent(p, ["self_damage", "self_damage_enemy_target"]);
    const cost = p.damage_heal * p.self_damage / 100;
    if (cost > 1e7) throw Error("Coil cost overflow");
    const finish = (ctx, e) => {
      if (e.selfTarget) {
        ctx.heal({ source: e.owner, target: e.owner, abilityId: id2, amount: p.damage_heal });
        return outputCue("core4-coil-self", c, e.owner);
      }
      return { projectile: missile(ctx, c, e, "core4-counter-missile", scale(p.missile_speed), c.definition.mvp.range_wu + 22, { kind: "mist_coil", reflectionRange: c.definition.mvp.range_wu + 22 }) };
    };
    return base(c, FILE4, ["heal", "self-damage", "status", "projectile-request", "damage"], { planCast: (ctx, e) => planning(c, ctx, e, { targeted: e.selfTarget !== true }), activate(ctx, e) {
      if (rows(ctx, e.owner, "borrowed_time").some((s) => s.remaining > 0)) ctx.heal({ source: e.owner, target: e.owner, abilityId: id2, amount: cost });
      else ctx.selfDamage({ actor: e.owner, abilityId: id2, amount: cost, nonlethal: true });
      return { automaticBorrowCheckpoint: { actor: e.owner, continuation: "coil-after-self-cost", cast: { owner: e.owner, target: e.target, castId: e.castId, selfTarget: e.selfTarget === true } }, ...outputCue("core4-coil-cost", c, e.owner, void 0, { nominal: cost, nonlethal: true }) };
    }, onStage(ctx, e) {
      if (e.kind === "coil-after-self-cost") return finish(ctx, e.cast);
    }, onContact(ctx, e) {
      return damage(ctx, c, e.source, e.target, p.damage_heal, "magical", { dot: false, reflected: !!e.reflected, noLifesteal: !!e.reflected });
    } });
  }
  if (id2 === "abaddon_aphotic_shield") {
    positive(p, ["duration"]);
    const record = nullable(obj({ amount: number(p.damage_absorb), life: number(p.duration) })), st = schema("aphotic-shield", obj({ owners: ownerShape(record) })), read2 = (ctx) => structuredClone(ctx.state.read() ?? { owners: { "0": null, "1": null } });
    const burst = (ctx, owner, reason) => {
      const s = read2(ctx), old = s.owners[owner];
      if (!old) return null;
      s.owners[owner] = null;
      ctx.state.write(s);
      const target = 1 - owner;
      if (ctx.actor(owner).alive && ctx.target.distance(owner, target) <= scale(p.radius) + 22) damage(ctx, c, owner, target, p.damage_absorb);
      return outputCue("core4-shield-end", c, owner, void 0, { reason, absorbed: p.damage_absorb - old.amount, radius: scale(p.radius) });
    };
    return base(c, FILE4, ["status", "damage"], { planCast: (ctx, e) => planning(c, ctx, e), activate(ctx, e) {
      const replaced = burst(ctx, e.owner, "replaced");
      ctx.status.cleanse(e.owner, "strong", id2);
      const s = read2(ctx);
      s.owners[e.owner] = { amount: p.damage_absorb, life: p.duration };
      ctx.state.write(s);
      return { replaced, ...outputCue("core4-shield-start", c, e.owner, void 0, { amount: p.damage_absorb, life: p.duration }) };
    }, projectDamage(ctx, e) {
      if (e.stage !== "shield") return;
      const s = read2(ctx), i = actor(e.target), shield = s.owners[i];
      if (!shield || e.damage <= 0) return { damage: e.damage };
      bounded(e.damage);
      const absorbed = Math.min(e.damage, shield.amount);
      shield.amount -= absorbed;
      ctx.state.write(s);
      const receipt = { damage: e.damage - absorbed, absorbed, remaining: shield.amount, presentation: { kind: "core4-shield-absorb", actor: i, amount: absorbed, remaining: shield.amount } };
      if (shield.amount <= EPS) return { ...receipt, burst: burst(ctx, i, "damage") };
      return receipt;
    }, onStage(ctx, e) {
      if (e.kind === "actor-live") {
        const s = read2(ctx), i = actor(e.actor), shield = s.owners[i];
        if (!shield) return;
        shield.life -= dt(e);
        if (shield.life <= EPS) return burst(ctx, i, "expired");
        ctx.state.write(s);
      }
      if (e.kind === "shield-projection") return { shield: read2(ctx).owners[actor(e.actor)] };
    }, onDeath(ctx, e) {
      const s = read2(ctx);
      s.owners[actor(e.actor)] = null;
      ctx.state.write(s);
    } }, st);
  }
  if (id2 === "abaddon_frostmourne") {
    positive(p, ["curse_duration"]);
    percent(p, ["curse_slow"]);
    return base(c, FILE4, ["status", "damage"], { onDamage: (ctx, e) => withering(c, ctx, e), projectHealing: witheringHealing, onAttack(ctx, e) {
      if (ctx.actor(e.actor).heroId !== c.hero.registryNumericId || !e.landed || !ctx.actor(e.actor).passivesEnabled) return;
      return { handle: status(ctx, c, e.actor, e.target, "curse", p.curse_duration, { dps: p.curse_dps, moveSlow: p.curse_slow / 100, attackBonus: p.curse_attack_speed, interval: 0.25 }, "basic") };
    }, onStage(ctx, e) {
      if (e.kind === "status-periodic" && e.key === "curse") return damage(ctx, c, e.source, e.target, p.curse_dps * 0.25);
      if (e.kind === "movement-projection") {
        let slow = 0;
        for (const s of enabledRows(ctx, e.actor, "curse")) slow = Math.max(slow, s.values.moveSlow);
        return { moveSlow: slow };
      }
    }, projectInterval(ctx, e) {
      const t = enabledRows(ctx, e.target, "curse").find((s) => s.owner === e.actor);
      return { attackSpeedBonus: t ? p.curse_attack_speed : 0 };
    } });
  }
  if (id2 === "abaddon_borrowed_time") {
    positive(p, ["duration"]);
    const st = schema("borrowed-time", obj({ remaining: ownerShape(number(p.duration)) })), read2 = (ctx) => structuredClone(ctx.state.read() ?? { remaining: { "0": 0, "1": 0 } });
    const admit = (ctx, e) => planning(c, ctx, { ...e, activeRemaining: read2(ctx).remaining[e.owner] }, { borrowed: true });
    return base(c, FILE4, ["status", "heal"], { planCast: admit, activate(ctx, e) {
      const s = read2(ctx), i = actor(e.owner);
      if (s.remaining[i] > 0 || !ctx.actor(i).alive || e.automatic && !ctx.actor(i).passivesEnabled || !e.automatic && ctx.actor(i).silenced) return { accepted: false };
      s.remaining[i] = p.duration;
      ctx.state.write(s);
      ctx.status.cleanse(i, "strong", id2);
      status(ctx, c, i, i, "borrowed_time", p.duration, { convertIncomingDamage: true }, "none", true, "positive");
      return { accepted: true, cancelCast: true, cancelSkillBuffer: true, preserveRecovery: true, ...outputCue("core4-borrowed-time", c, i, void 0, { automatic: !!e.automatic, duration: p.duration }) };
    }, projectDamage(ctx, e) {
      if (e.stage !== "borrowed") return;
      const i = actor(e.target), f = ctx.actor(i);
      if (!f.alive || read2(ctx).remaining[i] <= 0) return { damage: e.damage };
      bounded(e.damage);
      ctx.heal({ source: i, target: i, abilityId: id2, amount: e.damage });
      return { damage: 0, converted: e.damage, healingSource: e.source };
    }, onStage(ctx, e) {
      if (e.kind === "actor-live") {
        const s = read2(ctx), i = actor(e.actor);
        s.remaining[i] = Math.max(0, s.remaining[i] - dt(e));
        ctx.state.write(s);
        return { borrowedRemaining: s.remaining[i] };
      }
      if (e.kind === "automatic-borrow-check") {
        const i = actor(e.actor), f = ctx.actor(i), s = read2(ctx);
        if (f.heroId === c.hero.registryNumericId && f.alive && f.hp < p.hp_threshold && f.passivesEnabled && s.remaining[i] <= 0 && bounded(e.cooldownRemaining, 0, 3600) <= EPS) return { automaticCastRequested: true, actor: i, slot: 3, cost: 0 };
        return { automaticCastRequested: false };
      }
      if (e.kind === "borrowed-projection") return { remaining: read2(ctx).remaining[actor(e.actor)] };
    }, onDeath(ctx, e) {
      const s = read2(ctx);
      s.remaining[actor(e.actor)] = 0;
      ctx.state.write(s);
    } }, st);
  }
  throw Error("Unknown Abaddon selected slot");
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/bash.js
import { codeIdentity as codeIdentity3 } from "./heros-rules.js";
import { defineStateSchema as defineStateSchema2 } from "./heros-rules.js";
function createBash({ definition, hero }) {
  const p = definition.mvp.params, threshold = p.attack_count + 1;
  if (!Number.isSafeInteger(threshold) || threshold < 1 || threshold > 64 || ![p.bonus_damage, p.duration].every((n) => Number.isFinite(n) && n >= 0) || p.bonus_damage > 1e7 || p.duration > 60) throw Error("Invalid Core4 Bash coefficients");
  const schema2 = defineStateSchema2({ id: "heros/core4/slardar-bash", schema: { anyOf: [{ type: "null" }, { type: "object", properties: { counts: { type: "object", properties: { "0": { type: "integer", minimum: 0, maximum: threshold - 1 }, "1": { type: "integer", minimum: 0, maximum: threshold - 1 } }, required: [], additionalProperties: false } }, required: ["counts"], additionalProperties: false }] } });
  return {
    behaviorId: "core4/slardar-bash",
    revision: "1.0.0",
    ...codeIdentity3(["rules/core4/bash.js"]),
    requires: ["damage", "control", "cue"],
    stateSchema: schema2,
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

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/core4/index.js
var createSlardarPassive = (config) => seaborn(config, createBash(config));
function core4Factory(heroId, slot) {
  if (!IDS.includes(heroId) || !Number.isInteger(slot) || slot < 0 || slot > 3) throw Error("Out of Core4 ownership");
  const create4 = heroId === 31 && slot === 2 ? createSlardarPassive : heroId === 25 ? createRazor : heroId === 31 ? createSlardar : heroId === 45 ? createViper : createAbaddon;
  return { abiVersion: BATTLE_ABI, parameters: { ...ADAPT, innates: INNATES }, create: create4 };
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/c/common.js
import { codeIdentity as codeIdentity5 } from "./heros-rules.js";

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/c/state.js
import { defineStateSchema as defineStateSchema3 } from "./heros-rules.js";
import { codeIdentity as codeIdentity4 } from "./heros-rules.js";
var exact = (value, keys) => !!value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).sort().join(",") === keys.slice().sort().join(",");
var number2 = (v, max = 1e9) => Number.isFinite(v) && v >= 0 && v <= max;
var actor2 = (id2) => id2 === 0 || id2 === 1;
var handle = (v) => typeof v === "string" && v.length > 0 && v.length <= 160;
var defaultOwner = () => ({ revision: 0, channel: null, windup: null, stampede: null, barriers: [], charges: [], luminosity: 0, gunslinger: true, deathSeen: false, dead: false, effects: [], jobs: [], statuses: [] });
var freezeLists = (value) => Object.freeze(Object.fromEntries(Object.entries(value).map(([k, v]) => [k, Object.freeze(v)])));
var JOB_OPS = freezeLists({ centaur_hoof_stomp: ["stomp"], ember_spirit_sleight_of_fist: ["sleight"], ember_spirit_fire_remnant: ["remnant"], abyssal_underlord_dark_portal: ["gate"], void_spirit_dissimilate: ["phase"], dawnbreaker_fire_wreath: ["star"], dawnbreaker_celestial_hammer: ["hammer_out", "hammer_return"], dawnbreaker_solar_guardian: ["solar_pulse", "solar_fly", "solar_land"], muerta_dead_shot: ["deadshot"], muerta_pierce_the_veil: ["veil"] });
var ops = Object.values(JOB_OPS).flat();
var FIELD_MODES = Object.freeze({ skywrath_mage_mystic_flare: ["flare"], ember_spirit_fire_remnant: ["remnant"], abyssal_underlord_firestorm: ["storm"], abyssal_underlord_pit_of_malice: ["pit"], abyssal_underlord_dark_portal: ["gate"], void_spirit_aether_remnant: ["aether"], dawnbreaker_celestial_hammer: ["hammer_burn"], muerta_the_calling: ["calling"] });
var statusKeys = /* @__PURE__ */ new Set(["seal", "concussive_slow", "stampede_slow", ...["x_chains", "x_flame", "x_fireburn", "x_atrophy_gain", "x_pulse", "x_voidmark", "x_shortslow", "x_hammer_slow", "x_deadslow", "x_call_slow", "x_call_silence", "x_veil"].flatMap((k) => [k + "_0", k + "_1"])]);
function validateState(value) {
  if (value === null) return true;
  if (!exact(value, ["version", "owners"]) || value.version !== 1 || !Array.isArray(value.owners) || value.owners.length !== 2) return false;
  return value.owners.every((s) => exact(s, Object.keys(defaultOwner())) && Number.isSafeInteger(s.revision) && s.revision >= 0 && s.revision < 1e9 && Number.isInteger(s.luminosity) && s.luminosity >= 0 && s.luminosity < 4 && ["gunslinger", "deathSeen", "dead"].every((k) => typeof s[k] === "boolean") && (s.channel === null || exact(s.channel, ["kind", "startX", "until", "flight", "revision"]) && ["sleight", "gate", "phase", "star", "solar"].includes(s.channel.kind) && Number.isFinite(s.channel.startX) && number2(s.channel.until) && typeof s.channel.flight === "boolean" && Number.isInteger(s.channel.revision) && s.channel.revision <= s.revision) && (s.windup === null || exact(s.windup, ["until"]) && number2(s.windup.until)) && (s.stampede === null || exact(s.stampede, ["until", "hit"]) && number2(s.stampede.until) && Array.isArray(s.stampede.hit) && s.stampede.hit.length <= 1 && s.stampede.hit.every(actor2)) && Array.isArray(s.barriers) && s.barriers.length <= 64 && s.barriers.every((b) => exact(b, ["amount", "until"]) && number2(b.amount, 13.5) && number2(b.until)) && Array.isArray(s.charges) && s.charges.length <= 4 && s.charges.every((c) => exact(c, ["abilityId", "count", "max", "restore", "pending"]) && handle(c.abilityId) && Number.isInteger(c.count) && Number.isInteger(c.max) && c.count >= 0 && c.max > 0 && c.count <= c.max && c.max <= 16 && number2(c.restore) && c.restore > 0 && Array.isArray(c.pending) && c.pending.length <= c.max && c.pending.every((n, i) => number2(n) && (!i || n >= c.pending[i - 1]))) && Array.isArray(s.effects) && s.effects.length <= 16 && new Set(s.effects.map((x) => x.handle)).size === s.effects.length && s.effects.every((f) => exact(f, ["handle", "abilityId", "mode", "x", "from", "face", "startedAt"]) && handle(f.handle) && handle(f.abilityId) && FIELD_MODES[f.abilityId]?.includes(f.mode) && Number.isFinite(f.x) && Number.isFinite(f.from) && [1, -1].includes(f.face) && number2(f.startedAt)) && Array.isArray(s.jobs) && s.jobs.length <= 128 && new Set(s.jobs.map((x) => x.handle)).size === s.jobs.length && s.jobs.every((j) => exact(j, ["handle", "abilityId", "op"]) && handle(j.handle) && handle(j.abilityId) && JOB_OPS[j.abilityId]?.includes(j.op)) && Array.isArray(s.statuses) && s.statuses.length <= 128 && s.statuses.every((t) => exact(t, ["handle", "key", "target", "source"]) && handle(t.handle) && statusKeys.has(t.key) && actor2(t.target) && actor2(t.source)));
}
var object = (properties) => ({ type: "object", additionalProperties: false, required: Object.keys(properties), properties });
var num = { type: "number", minimum: 0, maximum: 1e9 };
var coord = { type: "number", minimum: 45, maximum: 1155 };
var str = { type: "string", minLength: 1, maxLength: 160 };
var id = { type: "integer", minimum: 0, maximum: 1 };
var bool = { type: "boolean" };
var nullable2 = (s) => ({ anyOf: [{ type: "null" }, s] });
var array = (items, maxItems, minItems = 0) => ({ type: "array", items, minItems, maxItems });
var ownerSchema = object({
  revision: { type: "integer", minimum: 0, maximum: 999999999 },
  channel: nullable2(object({ kind: { enum: ["sleight", "gate", "phase", "star", "solar"] }, startX: coord, until: num, flight: bool, revision: { type: "integer", minimum: 0, maximum: 999999999 } })),
  windup: nullable2(object({ until: num })),
  stampede: nullable2(object({ until: num, hit: array(id, 1) })),
  barriers: array(object({ amount: { type: "number", minimum: 0, maximum: 13.5 }, until: num }), 64),
  charges: array(object({ abilityId: str, count: { type: "integer", minimum: 0, maximum: 16 }, max: { type: "integer", minimum: 1, maximum: 16 }, restore: { type: "number", minimum: 1e-6, maximum: 1e6 }, pending: array(num, 16) }), 4),
  luminosity: { type: "integer", minimum: 0, maximum: 3 },
  gunslinger: bool,
  deathSeen: bool,
  dead: bool,
  effects: array(object({ handle: str, abilityId: str, mode: { enum: ["flare", "remnant", "storm", "pit", "gate", "aether", "hammer_burn", "calling"] }, x: coord, from: coord, face: { enum: [-1, 1] }, startedAt: num }), 16),
  jobs: array(object({ handle: str, abilityId: str, op: { enum: ops } }), 128),
  statuses: array(object({ handle: str, key: { enum: [...statusKeys] }, target: id, source: id }), 128)
});
function createCStateSchema() {
  return defineStateSchema3({ id: "heros/c/v6-state", version: "1.0.0", schema: nullable2(object({ version: { const: 1 }, owners: array(ownerSchema, 2, 2) })), parameters: { roster: [94, 99, 104, 106, 117, 121, 124], poolCap: 64, scionPool: 13.5, effectRefCap: 16, jobRefCap: 128, statusRefCap: 128 }, refinement: { id: "c-v6-correlations", ...codeIdentity4(["rules/c/state.js"]), validate: validateState } });
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/c/common.js
var IDS2 = Object.freeze([94, 99, 104, 106, 117, 121, 124]);
var EXTRA_IDS = Object.freeze([104, 106, 117, 121, 124]);
var SCALE = 0.55;
var EPS2 = 1e-8;
var caches = /* @__PURE__ */ new WeakMap();
var baselines = /* @__PURE__ */ new WeakMap();
var ops2 = Object.values(JOB_OPS).flat();
function group(definitions) {
  let result = caches.get(definitions);
  if (!result) {
    const coefficients = new Map(definitions.map((h) => [h.registryNumericId, h]));
    result = Object.freeze({ coefficients, schema: createCStateSchema(), view: Object.freeze({ get: (id2) => coefficients.get(id2) }) });
    caches.set(definitions, result);
  }
  return result;
}
var lookup = (definitions) => group(definitions).view;
function coefficient(definition, key) {
  const value = definition.official?.params?.[key];
  if (!Number.isFinite(value)) throw Error("Missing C coefficient " + definition.id + "." + key);
  return value;
}
var REQUIRED = Object.freeze({
  centaur_hoof_stomp: ["radius", "stomp_damage", "stun_duration", "windup_time"],
  centaur_double_edge: ["edge_damage", "strength_damage"],
  centaur_return: ["return_damage", "return_damage_str"],
  centaur_stampede: ["duration", "strength_damage", "slow_duration", "radius", "slow_movement_speed"],
  skywrath_mage_arcane_bolt: ["bolt_damage", "int_multiplier", "bolt_speed"],
  skywrath_mage_concussive_shot: ["damage", "speed", "slow_duration", "movement_speed_pct"],
  skywrath_mage_ancient_seal: ["resist_debuff", "seal_duration"],
  skywrath_mage_mystic_flare: ["radius", "duration", "damage", "damage_interval"],
  ember_spirit_searing_chains: ["radius", "duration", "damage_per_second"],
  ember_spirit_sleight_of_fist: ["attack_interval", "radius", "bonus_hero_damage"],
  ember_spirit_flame_guard: ["duration", "absorb_amount", "damage_per_second", "tick_interval", "radius", "shield_pct_absorb"],
  ember_spirit_fire_remnant: ["damage", "radius", "AbilityCharges", "AbilityChargeRestoreTime"],
  abyssal_underlord_firestorm: ["radius", "wave_damage", "burn_damage", "burn_duration", "burn_interval", "wave_interval", "wave_count"],
  abyssal_underlord_pit_of_malice: ["radius", "pit_duration", "pit_interval", "pit_damage", "ensnare_duration"],
  abyssal_underlord_atrophy_aura: ["radius", "damage_reduction_pct", "bonus_damage_from_hero", "bonus_damage_duration"],
  abyssal_underlord_dark_portal: ["minimum_distance", "warp_channel_duration", "duration"],
  void_spirit_aether_remnant: ["duration", "activation_delay", "remnant_watch_radius", "remnant_watch_distance", "pull_destination", "impact_damage", "pull_duration"],
  void_spirit_dissimilate: ["phase_duration", "first_ring_distance_offset", "damage_radius", "AbilityDamage"],
  void_spirit_resonant_pulse: ["base_absorb_amount", "radius", "damage", "absorb_per_hero_hit", "buff_duration"],
  void_spirit_astral_step: ["min_travel_distance", "max_travel_distance", "radius", "movement_slow_pct", "pop_damage_delay", "pop_damage", "AbilityCharges", "AbilityChargeRestoreTime"],
  dawnbreaker_fire_wreath: ["swipe_radius", "swipe_damage", "smash_stun_duration"],
  dawnbreaker_celestial_hammer: ["hammer_damage", "projectile_speed", "burn_damage", "move_slow", "pause_duration"],
  dawnbreaker_luminosity: ["bonus_damage", "heal_pct"],
  dawnbreaker_solar_guardian: ["base_heal", "radius", "base_damage", "land_damage", "land_stun_duration", "max_offset_distance", "airtime_duration", "AbilityChannelTime", "pulse_interval"],
  muerta_dead_shot: ["damage", "speed", "impact_slow_duration", "impact_slow_percent"],
  muerta_the_calling: ["duration", "aura_movespeed_slow", "dead_zone_distance", "hit_radius", "damage", "silence_duration"],
  muerta_gunslinger: ["double_shot_chance"],
  muerta_pierce_the_veil: ["duration", "transform_duration", "base_damage_percent"]
});
function validateConfig({ hero, definition }) {
  const signed = /* @__PURE__ */ new Set(["resist_debuff", "impact_slow_percent", "aura_movespeed_slow", "swipe_slow", "rotation_direction"]);
  const params = definition.official?.params;
  if (!params || typeof params !== "object" || !REQUIRED[definition.id]) throw Error("Missing C coefficient schema");
  for (const key of REQUIRED[definition.id]) if (!Number.isFinite(params[key])) throw Error("Missing C coefficient " + definition.id + "." + key);
  for (const [key, value] of Object.entries(params)) if (!Number.isFinite(value) || Math.abs(value) > 1e6 || !signed.has(key) && value < 0) throw Error("Invalid C coefficient " + definition.id + "." + key);
  for (const key of ["duration", "damage_interval", "tick_interval", "wave_interval", "burn_interval", "AbilityChargeRestoreTime", "attack_interval", "phase_duration", "projectile_speed", "speed", "bolt_speed", "pulse_interval"]) if (key in params && params[key] <= 0) throw Error("Invalid C positive interval " + definition.id + "." + key);
  for (const key of ["shield_pct_absorb", "double_shot_chance", "movement_speed_pct", "damage_reduction_pct", "movement_slow_pct", "move_slow", "slow_movement_speed"]) if (key in params && (params[key] < 0 || params[key] > 100)) throw Error("Invalid C percentage " + definition.id + "." + key);
  for (const key of ["impact_slow_percent", "aura_movespeed_slow"]) if (key in params && (params[key] < -100 || params[key] > 0)) throw Error("Invalid C signed slow " + definition.id + "." + key);
  if ("AbilityCharges" in params && (!Number.isInteger(params.AbilityCharges) || params.AbilityCharges > 16)) throw Error("Invalid C charges");
  if (!hero.attributes18 || ["str", "agi", "int"].some((k) => !Number.isFinite(hero.attributes18[k]) || hero.attributes18[k] < 0 || hero.attributes18[k] > 1e6) || hero.move_speed <= 0) throw Error("Invalid C hero attributes");
}
var clamp = (x) => Math.max(45, Math.min(1155, x));
var near = (a, b, r) => Math.abs(a.x - b.x) <= r * SCALE + 22 && Math.abs(a.y - b.y) < 130;
var effective2 = (ctx, record) => record.effective !== false && (!record.pierces && record.polarity === "negative" ? !ctx.actor(record.target).debuffImmune : true);
var statusRows = (ctx, target, key) => ctx.status.query(target, key).filter((r) => effective2(ctx, r));
function sumStatus(ctx, target, name) {
  let sum = 0;
  for (const owner of [0, 1]) for (const row of statusRows(ctx, target, "x_atrophy_gain_" + owner)) sum += row.values[name] ?? 0;
  return sum;
}
var hasVeil = (ctx, owner) => [0, 1].some((i) => statusRows(ctx, owner, "x_veil_" + i).some((r) => r.values.veil));
function power(ctx, id2, definitions, attackBonus) {
  if (!Number.isFinite(attackBonus) || attackBonus < 0) throw Error("Missing or invalid C host fact attackBonus");
  return lookup(definitions).get(ctx.actor(id2).heroId).attack + attackBonus + sumStatus(ctx, id2, "bonusDamage");
}
function jsonToken(v, depth = 0) {
  return depth < 6 && (v === null || typeof v === "boolean" || typeof v === "string" && v.length <= 160 || Number.isFinite(v) || Array.isArray(v) && v.length <= 16 && v.every((x) => jsonToken(x, depth + 1)) || v && typeof v === "object" && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype && Object.keys(v).length <= 16 && Object.entries(v).every(([k, x]) => k.length <= 64 && jsonToken(x, depth + 1)));
}
function read(ctx, definitions) {
  const value = ctx.state.read() ?? { version: 1, owners: [defaultOwner(), defaultOwner()] };
  const copy = structuredClone(value);
  baselines.set(copy, structuredClone(value));
  for (const i of [0, 1]) {
    const h = lookup(definitions).get(ctx.actor(i).heroId);
    if (!h || !EXTRA_IDS.includes(h.registryNumericId)) continue;
    for (const a of h.abilities) {
      const max = a.official?.params?.AbilityCharges;
      if (max > 0 && !copy.owners[i].charges.some((c) => c.abilityId === a.id)) copy.owners[i].charges.push({ abilityId: a.id, count: max, max, restore: coefficient(a, "AbilityChargeRestoreTime"), pending: [] });
    }
  }
  return copy;
}
function write(ctx, state) {
  const before = baselines.get(state);
  if (!before) throw Error("Unowned C state write");
  const next = structuredClone(ctx.state.read() ?? { version: 1, owners: [defaultOwner(), defaultOwner()] });
  for (const id2 of [0, 1]) for (const key of Object.keys(state.owners[id2])) {
    const old = before.owners[id2][key], value = state.owners[id2][key];
    if (JSON.stringify(old) === JSON.stringify(value)) continue;
    if (["jobs", "effects", "statuses"].includes(key)) {
      const removed = new Set(old.filter((x) => !value.some((y) => y.handle === x.handle)).map((x) => x.handle));
      let merged = next.owners[id2][key].filter((x) => !removed.has(x.handle));
      for (const row of value) {
        const previous = old.find((x) => x.handle === row.handle);
        if (!previous || JSON.stringify(previous) !== JSON.stringify(row)) {
          merged = merged.filter((x) => x.handle !== row.handle);
          merged.push(row);
        }
      }
      next.owners[id2][key] = merged;
    } else next.owners[id2][key] = value;
  }
  ctx.state.write(next);
  baselines.set(state, structuredClone(state));
}
function refreshCharges(ctx, state) {
  for (const s of state.owners) for (const c of s.charges) while (c.pending.length && c.pending[0] <= ctx.now + EPS2) {
    c.pending.shift();
    c.count = Math.min(c.max, c.count + 1);
  }
}
function cancelChannel(s) {
  if (s.channel?.kind === "solar" && s.channel.flight) return;
  s.revision++;
  s.channel = null;
}
function channel(ctx, state, owner, kind, duration) {
  const s = state.owners[owner];
  s.revision++;
  s.channel = { kind, startX: ctx.actor(owner).x, until: ctx.now + duration, flight: false, revision: s.revision };
  return s.revision;
}
function job(ctx, state, definition, cast, op, delay, data = {}, revision = null, reasons = []) {
  if (state.owners[cast.owner].jobs.length >= 128) throw Error("C own scheduled metadata limit");
  const token = reasons.length ? ctx.action.token(cast.owner, reasons) : null;
  const payload = { owner: cast.owner, target: cast.target, castId: cast.castId, op, revision, token, ...data };
  if (!jsonToken(token)) throw Error("Invalid action token");
  const h = ctx.schedule({ abilityId: definition.id, owner: cast.owner, handler: "dispatch", delay, token, data: payload });
  state.owners[cast.owner].jobs.push({ handle: h, abilityId: definition.id, op });
  return h;
}
function removeJobs(ctx, s, opsToRemove) {
  s.jobs = s.jobs.filter((j) => {
    if (!opsToRemove.includes(j.op)) return true;
    ctx.cancelJob(j.handle);
    return false;
  });
}
function field2(ctx, state, definition, cast, mode, x, duration, from = x, profile = {}) {
  const s = state.owners[cast.owner], same = s.effects.filter((f) => f.mode === mode);
  while (same.length >= 2) {
    const old = same.shift();
    ctx.legacyEffect.end(old.handle, "cancelled");
    s.effects = s.effects.filter((f) => f.handle !== old.handle);
  }
  const h = ctx.legacyEffect.spawn({ owner: cast.owner, abilityId: definition.id, castId: cast.castId, kind: "area", x, radius: profile.radius ?? 0, duration, data: { profile: "c-v6-field", mode, callback: "onStage", ...profile } });
  s.effects.push({ handle: h, abilityId: definition.id, mode, x, from, face: ctx.actor(cast.owner).dir, startedAt: ctx.now });
  return h;
}
function apply(ctx, state, definition, owner, target, key, duration, values, polarity = "negative", interval = 0, origin = owner) {
  const fullKey = key === "seal" || key === "concussive_slow" || key === "stampede_slow" ? key : key + "_" + origin;
  const spec = { owner, target, abilityId: definition.id, key: fullKey, duration, polarity, dispel: "basic", pierces: false, values: { ...values, ...interval ? { $pulse: { handler: "pulse", interval, data: { owner, target, key: fullKey } } } : {}, $origin: origin } };
  const h = ctx.status.apply(spec);
  if (h !== null) {
    for (const s of state.owners) s.statuses = s.statuses.filter((x) => x.target !== target || x.key !== fullKey);
    state.owners[origin].statuses.push({ handle: h, key: fullKey, target, source: owner });
  }
  return h;
}
function damage2(ctx, definition, owner, target, amount, type = definition.official.damageType, flags = {}) {
  return ctx.damage({ source: owner, target, abilityId: definition.id, amount, type, blockable: false, dot: true, reflected: !!flags.reflected, noReflect: !!(flags.noReflect || flags.reflected), noLifesteal: !!flags.reflected, ...flags });
}
function control(ctx, definition, owner, target, type, duration, dispel = "strong") {
  return ctx.control.apply({ owner, target, abilityId: definition.id, key: "r91:" + definition.id, type, duration, pierces: false, dispel });
}
var teleport = (ctx, definition, cast, id2, x) => ctx.motion({ actor: id2, abilityId: definition.id, castId: cast.castId, kind: "blink", destinationX: clamp(x), speed: 0, duration: 0 });
function housekeeping(ctx, state, event) {
  if (event.kind === "before-status") {
    refreshCharges(ctx, state);
    for (const s of state.owners) if (s.channel && s.channel.until < ctx.now - 1e-7) s.channel = null;
  }
  if (event.kind === "after-status") {
    for (const s of state.owners) {
      s.barriers = s.barriers.filter((b) => b.until > ctx.now + EPS2 && b.amount > EPS2);
      if (s.windup && s.windup.until <= ctx.now + EPS2) s.windup = null;
    }
  }
  if (event.kind === "end-step") for (const id2 of [0, 1]) {
    const s = state.owners[id2];
    if (ctx.actor(id2).alive) {
      s.dead = false;
      continue;
    }
    if (!s.dead) {
      s.dead = true;
      s.barriers = [];
      s.windup = null;
      s.stampede = null;
    }
    s.channel = null;
    removeJobs(ctx, s, ops2);
    for (const f of s.effects) ctx.legacyEffect.end(f.handle, "owner-dead");
    s.effects = [];
    for (const own of state.owners) {
      own.statuses = own.statuses.filter((t) => {
        if (t.target !== id2 && !(t.source === id2 && t.key.startsWith("x_"))) return true;
        ctx.status.remove(t.handle);
        return false;
      });
    }
  }
}
var SOURCE_FILES = Object.freeze(["rules/c/index.js", "rules/c/common.js", "rules/c/state.js", "rules/c/centaur.js", "rules/c/skywrath.js", "rules/c/extra.js", "contract/registry.js", "contract/code-identity.js", "contract/state-schema.js", "contract/value.js", "contract/definition-schema.js", "content/index.js", "content/heroes.json", "rules/legacy-three.js", "index.js"]);
function base2(config, extra) {
  return { behaviorId: "c/v6/" + config.definition.id, revision: "1.0.0", ...codeIdentity5(SOURCE_FILES), namespace: "heros/c/v6", stateSchema: group(config.definitions).schema, requires: extra.requires, ...extra };
}
function planning2(config, ctx, facts) {
  const a = config.definition, m = a.mvp, s = read(ctx, config.definitions);
  refreshCharges(ctx, s);
  const f = ctx.actor(facts.owner), t = ctx.actor(facts.target), owner = s.owners[facts.owner], charge = owner.charges.find((x) => x.abilityId === a.id);
  const result = { accepted: true, manaCost: m.mana, cooldownSeconds: m.cooldown_s, chargeCost: charge ? 1 : 0, windupSeconds: m.startup_frames / 60, recoverySeconds: a.id === "centaur_hoof_stomp" ? 0 : m.recovery_frames / 60, action: "cast" };
  const reject = (reason) => ({ ...result, accepted: false, reason });
  if (m.passive) return reject("passive");
  if (["ember_spirit_sleight_of_fist", "void_spirit_astral_step", "dawnbreaker_fire_wreath"].includes(a.id) && (!Number.isFinite(facts.attackBonus) || facts.attackBonus < 0)) return reject("missing-host-attack-bonus");
  if (!f.alive) return reject("dead");
  if (!facts.actionReady || f.silenced) return reject("not-ready");
  if (facts.cooldownRemaining > EPS2 || facts.manaAvailable < m.mana) return reject("resources");
  if (charge && !charge.count) return reject("charges");
  if (facts.selfTarget && a.id !== "centaur_stampede") return reject("invalid-self");
  if (owner.channel?.kind === "solar" && owner.channel.flight) return reject("solar-flight");
  if (owner.channel?.kind === "star" && ["dawnbreaker_celestial_hammer", "dawnbreaker_solar_guardian"].includes(a.id)) return reject("star-channel");
  if (a.id === "dawnbreaker_fire_wreath" && owner.jobs.some((j) => j.op === "hammer_return")) return reject("hammer-return");
  if (f.rooted && ["ember_spirit_fire_remnant", "void_spirit_dissimilate", "void_spirit_astral_step", "abyssal_underlord_dark_portal", "dawnbreaker_solar_guardian"].includes(a.id)) return reject("rooted");
  const targeted = ["centaur_double_edge", "skywrath_mage_arcane_bolt", "skywrath_mage_concussive_shot", "skywrath_mage_ancient_seal", "muerta_dead_shot"];
  if (targeted.includes(a.id) && (!t.alive || t.invulnerable || Math.abs(t.x - f.x) > m.range_wu + 22)) return reject("target");
  const point = ["skywrath_mage_mystic_flare", "ember_spirit_sleight_of_fist", "ember_spirit_fire_remnant", "abyssal_underlord_firestorm", "abyssal_underlord_pit_of_malice", "void_spirit_aether_remnant", "void_spirit_astral_step", "dawnbreaker_celestial_hammer", "muerta_the_calling"];
  if (point.includes(a.id) && (!Number.isFinite(facts.aimX) || facts.aimX < 45 || facts.aimX > 1155 || Math.abs(facts.aimX - f.x) > m.range_wu + 22)) return reject("aim");
  if (a.id === "abyssal_underlord_dark_portal") {
    const x = facts.explicitAim ? facts.aimX : f.x < 600 ? 1155 : 45;
    if (!Number.isFinite(x) || x < 45 || x > 1155 || Math.abs(x - f.x) < coefficient(a, "minimum_distance") * SCALE) return reject("gate-distance");
  }
  if (a.id === "dawnbreaker_solar_guardian" && facts.explicitAim && (!Number.isFinite(facts.aimX) || facts.aimX < 45 || facts.aimX > 1155 || Math.abs(facts.aimX - f.x) > coefficient(a, "max_offset_distance") * SCALE)) return reject("solar-offset");
  if (a.id === "void_spirit_dissimilate" && facts.explicitAim && !Number.isFinite(facts.aimX)) return reject("aim");
  return result;
}
function committed(config, ctx, event) {
  const state = read(ctx, config.definitions), s = state.owners[event.owner];
  refreshCharges(ctx, state);
  if (EXTRA_IDS.includes(config.hero.registryNumericId)) cancelChannel(s);
  const charge = s.charges.find((x) => x.abilityId === config.definition.id);
  if (charge) {
    if (!charge.count) throw Error("Host committed without admitted charge");
    charge.count--;
    charge.pending.push(Math.max(ctx.now, charge.pending.at(-1) ?? ctx.now) + charge.restore);
  }
  write(ctx, state);
}
function interrupted(config, ctx, event) {
  const state = read(ctx, config.definitions), s = state.owners[event.owner];
  if (["control", "input-cancel", "action"].includes(event.reason) && s.windup) {
    s.windup = null;
    removeJobs(ctx, s, ["stomp"]);
  }
  if (EXTRA_IDS.includes(config.hero.registryNumericId) && ["control", "input-cancel", "movement", "action", "blocked", "silence", "manual-move", "manual-attack"].includes(event.reason)) cancelChannel(s);
  write(ctx, state);
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/c/centaur.js
var baseRequires = ["status", "schedule", "legacy-effect"];
function create(config) {
  validateConfig(config);
  const { definition: a, hero, definitions } = config;
  const requires2 = [...baseRequires, "damage", ...a.id === "centaur_hoof_stomp" ? ["control", "action-token"] : [], ...a.id === "centaur_double_edge" ? ["self-damage", "target-route"] : []];
  return base2(config, {
    requires: requires2,
    planCast: (ctx, e) => planning2(config, ctx, e),
    onCastCommitted: (ctx, e) => committed(config, ctx, e),
    onInterrupt: (ctx, e) => interrupted(config, ctx, e),
    activate(ctx, c) {
      const s = read(ctx, definitions), f = ctx.actor(c.owner);
      if (a.mvp.passive) return;
      if (a.id === "centaur_hoof_stomp") {
        s.owners[c.owner].windup = { until: ctx.now + coefficient(a, "windup_time") };
        job(ctx, s, a, c, "stomp", coefficient(a, "windup_time"), {}, null, ["control", "input-cancel", "action"]);
      } else if (a.id === "centaur_double_edge") {
        const r = ctx.target.route({ owner: c.owner, target: c.target, abilityId: a.id, range: a.mvp.range_wu, reflectable: true, reflected: c.reflected });
        if (!r.accepted) return;
        const t = ctx.actor(r.target);
        if (!t.alive || Math.abs(f.x - t.x) > a.mvp.range_wu + 22) return;
        const amount = coefficient(a, "edge_damage") + hero.attributes18.str * coefficient(a, "strength_damage") / 100;
        damage2(ctx, a, r.owner, r.target, amount, "magical", { reflected: r.owner !== c.owner });
        ctx.selfDamage({ actor: c.owner, abilityId: a.id, amount, nonlethal: true });
      } else if (a.id === "centaur_stampede") s.owners[c.owner].stampede = { until: ctx.now + coefficient(a, "duration"), hit: [] };
      write(ctx, s);
    },
    scheduledHandlers: a.id === "centaur_hoof_stomp" ? { dispatch(ctx, d) {
      if (ctx.actor(d.owner).heroId !== hero.registryNumericId) throw Error("Invalid Centaur scheduled owner");
      const s = read(ctx, definitions), own = s.owners[d.owner];
      own.jobs = own.jobs.filter((j) => j.handle !== d.jobHandle);
      if (d.op !== "stomp") throw Error("Unknown Centaur job");
      const f = ctx.actor(d.owner), t = ctx.actor(d.target);
      if (!f.alive || d.token !== null && !ctx.action.valid(d.token)) {
        write(ctx, s);
        return;
      }
      if (Math.abs(f.x - t.x) <= coefficient(a, "radius") * SCALE + 22 && t.y < 45) {
        damage2(ctx, a, d.owner, d.target, coefficient(a, "stomp_damage"), "magical");
        control(ctx, a, d.owner, d.target, "stun", coefficient(a, "stun_duration"));
      }
      write(ctx, s);
    } } : {},
    onAttack(ctx, e) {
      if (a.id !== "centaur_return" || !e.landed || e.attacker === e.target || e.target !== e.owner || !ctx.actor(e.owner).alive || !ctx.actor(e.owner).passivesEnabled) return;
      damage2(ctx, a, e.owner, e.attacker, coefficient(a, "return_damage") + hero.attributes18.str * coefficient(a, "return_damage_str") / 100, "physical", { reflected: true });
    },
    projectInterval(ctx, e) {
      if (a.id !== "centaur_stampede" || e.kind !== "movement") return;
      const s = read(ctx, definitions).owners[e.owner], f = ctx.actor(e.owner);
      let speed = hero.move_speed;
      if (f.passivesEnabled) speed += hero.attributes18.str * 0.4 * SCALE;
      if (s.stampede) speed = Math.max(speed, 330);
      return { multiplier: speed / hero.move_speed, disarmed: !!s.windup };
    },
    onStage(ctx, e) {
      const s = read(ctx, definitions);
      housekeeping(ctx, s, e);
      if (a.id === "centaur_stampede" && e.kind === "contact-check") {
        const own = s.owners[e.owner], stamp = own.stampede, f = ctx.actor(e.owner), t = ctx.actor(1 - e.owner);
        if (stamp) {
          if (f.alive && t.alive && !t.invulnerable && !stamp.hit.includes(t.id) && Math.abs(f.x - t.x) <= coefficient(a, "radius") * SCALE + 22) {
            stamp.hit.push(t.id);
            damage2(ctx, a, e.owner, t.id, hero.attributes18.str * coefficient(a, "strength_damage"), "magical");
            apply(ctx, s, a, e.owner, t.id, "stampede_slow", coefficient(a, "slow_duration"), { moveSlow: coefficient(a, "slow_movement_speed") / 100 });
          }
          if (stamp.until <= ctx.now + 1e-8) own.stampede = null;
        }
      }
      write(ctx, s);
    }
  });
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/c/skywrath.js
var baseRequires2 = ["status", "schedule", "legacy-effect"];
function create2(config) {
  validateConfig(config);
  const { definition: a, hero, definitions } = config;
  const requires2 = [...baseRequires2, ...a.id === "skywrath_mage_ancient_seal" ? ["target-route"] : ["damage"], ...["skywrath_mage_arcane_bolt", "skywrath_mage_concussive_shot"].includes(a.id) ? ["projectile-request", "target-route"] : []];
  return base2(config, {
    requires: requires2,
    planCast: (ctx, e) => planning2(config, ctx, e),
    onCastCommitted: (ctx, e) => committed(config, ctx, e),
    onInterrupt: (ctx, e) => interrupted(config, ctx, e),
    activate(ctx, c) {
      const s = read(ctx, definitions), f = ctx.actor(c.owner), t = ctx.actor(c.target);
      if (a.id === "skywrath_mage_arcane_bolt" || a.id === "skywrath_mage_concussive_shot") {
        if (!t.alive) return;
        const bolt = a.id === "skywrath_mage_arcane_bolt", amount = bolt ? coefficient(a, "bolt_damage") + hero.attributes18.int * coefficient(a, "int_multiplier") : coefficient(a, "damage");
        ctx.projectile({ owner: c.owner, abilityId: a.id, castId: c.castId, direction: c.direction, speed: coefficient(a, bolt ? "bolt_speed" : "speed") * SCALE, range: 0, height: "both", contactHandler: "onContact", data: { profile: "c-v6-homing", target: c.target, origin: c.owner, damage: amount, lifetime: 8, startYOffset: 100, reflected: false, slow: bolt ? null : { duration: coefficient(a, "slow_duration"), amount: coefficient(a, "movement_speed_pct") / 100 } } });
      } else if (a.id === "skywrath_mage_ancient_seal") {
        const r = ctx.target.route({ owner: c.owner, target: c.target, abilityId: a.id, range: a.mvp.range_wu, reflectable: true, reflected: c.reflected });
        if (r.accepted) apply(ctx, s, a, r.owner, r.target, "seal", coefficient(a, "seal_duration"), { magicAmp: -coefficient(a, "resist_debuff") / 100, silence: true }, "negative", 0, c.owner);
      } else if (a.id === "skywrath_mage_mystic_flare") field2(ctx, s, a, c, "flare", Math.max(45, Math.min(1155, c.aimX)), coefficient(a, "duration"), c.aimX, { radius: coefficient(a, "radius") * SCALE, pulseInterval: coefficient(a, "damage_interval"), pulseLimit: coefficient(a, "duration") / coefficient(a, "damage_interval"), heightLimit: 100 });
      write(ctx, s);
    },
    onContact(ctx, e) {
      if (!["skywrath_mage_arcane_bolt", "skywrath_mage_concussive_shot"].includes(a.id)) return;
      const d = e.data, source = e.projectileOwner ?? e.owner;
      const bolt = a.id === "skywrath_mage_arcane_bolt", expectedDamage = bolt ? coefficient(a, "bolt_damage") + hero.attributes18.int * coefficient(a, "int_multiplier") : coefficient(a, "damage");
      if (!d || d.origin !== e.owner || d.damage !== expectedDamage || typeof d.reflected !== "boolean" || source !== (d.reflected ? 1 - e.owner : e.owner) || d.target !== (d.reflected ? e.owner : 1 - e.owner) || !bolt && (d.slow?.duration !== coefficient(a, "slow_duration") || d.slow?.amount !== coefficient(a, "movement_speed_pct") / 100) || bolt && d.slow !== null) throw Error("Invalid C homing profile");
      if (d.profile !== "c-v6-homing" || !ctx.actor(source).alive || !ctx.actor(d.target).alive) return { end: true };
      const r = ctx.target.route({ owner: source, target: d.target, abilityId: a.id, range: 1110, reflectable: !d.reflected, reflected: d.reflected });
      if (!r.accepted) return { end: true };
      if (!d.reflected && r.reflected) return { redirect: { owner: r.owner, target: r.target, reflected: true } };
      const s = read(ctx, definitions);
      damage2(ctx, a, source, d.target, d.damage, "magical", { reflected: d.reflected });
      if (d.slow) apply(ctx, s, a, source, d.target, "concussive_slow", d.slow.duration, { moveSlow: d.slow.amount }, "negative", 0, d.origin);
      write(ctx, s);
      return { end: true };
    },
    projectDamage(ctx, e) {
      if (a.id === "skywrath_mage_ancient_seal" && e.phase === "modify" && e.type === "magical") {
        const amp = statusRows(ctx, e.target, "seal").reduce((n, r) => Math.max(n, r.values.magicAmp ?? 0), 0);
        return { amount: e.amount * (1 + amp) };
      }
      if (a.id === "skywrath_mage_arcane_bolt" && e.phase === "before-shields" && e.target === e.owner && e.type === "magical") {
        const s = read(ctx, definitions);
        let amount = e.amount;
        for (const b of s.owners[e.owner].barriers) {
          const take = Math.min(b.amount, amount);
          b.amount -= take;
          amount -= take;
        }
        write(ctx, s);
        return { amount };
      }
    },
    onDamage(ctx, e) {
      if (a.id !== "skywrath_mage_arcane_bolt" || e.attacker !== e.owner || e.actual <= 0 || e.attacker === e.target || e.reflected || e.type !== "magical" || !e.abilityIdOfDamage?.startsWith("skywrath_mage_") || !ctx.actor(e.owner).passivesEnabled) return;
      const s = read(ctx, definitions), list = s.owners[e.owner].barriers;
      if (list.length >= 64) list.shift();
      list.push({ amount: 13.5, until: ctx.now + 12 });
      write(ctx, s);
    },
    onStage(ctx, e) {
      const s = read(ctx, definitions);
      housekeeping(ctx, s, e);
      if (a.id === "skywrath_mage_mystic_flare" && e.kind === "field") {
        const f = s.owners[e.owner].effects.find((x) => x.handle === e.handle && x.abilityId === a.id), view = f && ctx.legacyEffect.view(f.handle), t = ctx.actor(1 - e.owner);
        if (view?.alive) {
          const n = e.pulses;
          if (!Number.isInteger(n) || n < 0 || n > 20) throw Error("Invalid Flare pulse fact");
          for (let i = 0; i < n; i++) if (t.alive && Math.abs(t.x - view.x) <= coefficient(a, "radius") * SCALE + 22 && t.y < 100) damage2(ctx, a, e.owner, t.id, coefficient(a, "damage") / (coefficient(a, "duration") / coefficient(a, "damage_interval")), "magical");
        } else s.owners[e.owner].effects = s.owners[e.owner].effects.filter((x) => x.handle !== e.handle);
      }
      write(ctx, s);
    }
  });
}

// ../a-gaze-death-batch41-host/node_modules/@dotapk/heros/rules/c/extra.js
var requires = ["damage", "heal", "control", "status", "target-route", "motion-request", "protect", "legacy-effect", "schedule", "action-token"];
function create3(config) {
  validateConfig(config);
  const { definition: a, hero, definitions } = config, id2 = a.id;
  function dispatch(ctx, d) {
    if (!JOB_OPS[id2]?.includes(d.op) || ctx.actor(d.owner).heroId !== hero.registryNumericId || d.target !== 1 - d.owner || typeof d.castId !== "string" || !d.castId || d.op === "star" && (!Number.isInteger(d.part) || d.part < 0 || d.part > 2) || ["sleight", "remnant", "gate", "phase", "hammer_out", "hammer_return", "solar_pulse", "solar_land"].includes(d.op) && (!Number.isFinite(d.x) || d.x < 45 || d.x > 1155)) throw Error("Invalid C scheduled delivery");
    const state = read(ctx, definitions), s = state.owners[d.owner], f = ctx.actor(d.owner), t = ctx.actor(d.target), cast = { owner: d.owner, target: d.target, castId: d.castId };
    s.jobs = s.jobs.filter((j) => j.handle !== d.jobHandle);
    if (!f.alive || d.revision !== null && d.revision !== s.revision || d.token !== null && !(s.channel?.kind === "solar" && s.channel.flight) && !ctx.action.valid(d.token)) {
      write(ctx, state);
      return;
    }
    const attack = () => power(ctx, d.owner, definitions, d.attackBonus);
    switch (d.op) {
      case "sleight":
        if (t.alive && Math.abs(t.x - d.x) <= coefficient(a, "radius") * SCALE + 22) damage2(ctx, a, d.owner, d.target, attack() + coefficient(a, "bonus_hero_damage"), "physical");
        break;
      case "remnant":
        teleport(ctx, a, cast, d.owner, d.x);
        if (near(ctx.actor(d.owner), t, coefficient(a, "radius"))) damage2(ctx, a, d.owner, d.target, coefficient(a, "damage"), "magical");
        break;
      case "gate":
        teleport(ctx, a, cast, d.owner, d.x);
        break;
      case "phase":
        teleport(ctx, a, cast, d.owner, d.x);
        if (near(ctx.actor(d.owner), t, coefficient(a, "damage_radius"))) damage2(ctx, a, d.owner, d.target, coefficient(a, "AbilityDamage"), "magical");
        break;
      case "star":
        if (near(f, t, coefficient(a, "swipe_radius"))) {
          damage2(ctx, a, d.owner, d.target, attack() + coefficient(a, "swipe_damage"), "physical");
          if (d.part === 2) control(ctx, a, d.owner, d.target, "stun", coefficient(a, "smash_stun_duration"));
          else apply(ctx, state, a, d.owner, d.target, "x_shortslow", 0.12, { moveSlow: 1 });
        }
        break;
      case "hammer_out":
      case "hammer_return":
        if (t.x >= Math.min(d.from, d.x) - 110 && t.x <= Math.max(d.from, d.x) + 110 && t.y < 130) damage2(ctx, a, d.owner, d.target, coefficient(a, "hammer_damage"), "magical");
        if (d.op === "hammer_return") field2(ctx, state, a, cast, "hammer_burn", d.x, 4, d.from, { pulseInterval: 0.5, pulseLimit: 8 });
        break;
      case "solar_pulse":
        ctx.heal({ source: d.owner, target: d.owner, abilityId: a.id, amount: coefficient(a, "base_heal") });
        if (Math.abs(t.x - d.x) <= coefficient(a, "radius") * SCALE + 22 && t.y < 130) damage2(ctx, a, d.owner, d.target, coefficient(a, "base_damage"), "magical");
        break;
      case "solar_fly":
        ctx.protect({ actor: d.owner, abilityId: a.id, kind: "invulnerability", duration: coefficient(a, "airtime_duration") });
        if (s.channel) s.channel.flight = true;
        break;
      case "solar_land":
        teleport(ctx, a, cast, d.owner, d.x);
        if (near(ctx.actor(d.owner), t, coefficient(a, "radius"))) {
          damage2(ctx, a, d.owner, d.target, coefficient(a, "land_damage"), "magical");
          control(ctx, a, d.owner, d.target, "stun", coefficient(a, "land_stun_duration"));
        }
        break;
      case "deadshot": {
        const r = ctx.target.route({ owner: d.owner, target: d.target, abilityId: a.id, range: 1110, reflectable: true, reflected: false });
        if (r.accepted) {
          const receipt = damage2(ctx, a, r.owner, r.target, coefficient(a, "damage"), "magical", { reflected: r.reflected, noReflect: r.noReflect });
          if (receipt.accepted) apply(ctx, state, a, r.owner, r.target, "x_deadslow", coefficient(a, "impact_slow_duration"), { moveSlow: -coefficient(a, "impact_slow_percent") / 100 }, "negative", 0, d.owner);
        }
        break;
      }
      case "veil":
        apply(ctx, state, a, d.owner, d.owner, "x_veil", coefficient(a, "duration"), { physicalImmune: true, veil: true }, "positive");
        break;
      default:
        throw Error("Unknown C named job");
    }
    if (s.channel && d.revision !== null && ["sleight", "gate", "phase", "solar_land"].includes(d.op)) s.channel = null;
    write(ctx, state);
  }
  function pulse(ctx, d) {
    const prefix = { ember_spirit_searing_chains: "x_chains", ember_spirit_flame_guard: "x_flame", abyssal_underlord_firestorm: "x_fireburn", void_spirit_astral_step: "x_voidmark" }[id2];
    if (!prefix || ctx.actor(d.owner).heroId !== hero.registryNumericId || d.key !== prefix + "_" + d.owner || (id2 === "ember_spirit_flame_guard" ? d.target !== d.owner : d.target !== 1 - d.owner)) throw Error("Invalid C status pulse");
    const rows2 = statusRows(ctx, d.target, d.key);
    if (!rows2.length || !ctx.actor(d.owner).alive || !ctx.actor(d.target).alive) return;
    const row = rows2.find((r) => r.owner === d.owner);
    if (!row) return;
    if (id2 === "ember_spirit_searing_chains") damage2(ctx, a, d.owner, d.target, coefficient(a, "damage_per_second") * 0.25, "magical");
    else if (id2 === "abyssal_underlord_firestorm") damage2(ctx, a, d.owner, d.target, ctx.actor(d.target).maxHp * coefficient(a, "burn_damage") / 100, "magical");
    else if (id2 === "void_spirit_astral_step") damage2(ctx, a, d.owner, d.target, coefficient(a, "pop_damage"), "magical");
    else if (id2 === "ember_spirit_flame_guard" && row.values.amount > 0 && near(ctx.actor(d.target), ctx.actor(1 - d.target), coefficient(a, "radius"))) damage2(ctx, a, d.target, 1 - d.target, coefficient(a, "damage_per_second") * coefficient(a, "tick_interval"), "magical");
  }
  function fieldStage(ctx, state, e) {
    const own = state.owners[e.owner], f = own.effects.find((x) => x.handle === e.handle && x.abilityId === a.id);
    if (!f) return;
    const view = ctx.legacyEffect.view(f.handle);
    if (!view?.alive) {
      own.effects = own.effects.filter((x) => x.handle !== e.handle);
      return;
    }
    const source = ctx.actor(e.owner), t = ctx.actor(1 - e.owner);
    if (!source.alive) {
      ctx.legacyEffect.end(f.handle, "owner-dead");
      own.effects = own.effects.filter((x) => x.handle !== e.handle);
      return;
    }
    if (!Number.isFinite(e.ageSeconds) || e.ageSeconds < 0 || !Number.isInteger(e.pulses ?? 0) || (e.pulses ?? 0) < 0 || (e.pulses ?? 0) > 20) throw Error("Invalid bounded field fact");
    if (f.mode === "storm") {
      for (let i = 0; i < e.pulses; i++) if (Math.abs(t.x - view.x) <= coefficient(a, "radius") * SCALE + 22 && t.y < 130) {
        damage2(ctx, a, e.owner, t.id, coefficient(a, "wave_damage"), "magical");
        apply(ctx, state, a, e.owner, t.id, "x_fireburn", coefficient(a, "burn_duration"), { percent: coefficient(a, "burn_damage") / 100 }, "negative", coefficient(a, "burn_interval"));
      }
    } else if (f.mode === "pit") {
      if (t.alive && Math.abs(t.x - view.x) <= coefficient(a, "radius") * SCALE + 22 && t.y < 130 && ctx.now >= (e.nextEligibleTime ?? 0)) {
        damage2(ctx, a, e.owner, t.id, coefficient(a, "pit_damage"), "magical");
        control(ctx, a, e.owner, t.id, "root", coefficient(a, "ensnare_duration"), "basic");
        return { rearmAt: ctx.now + coefficient(a, "pit_interval") };
      }
    } else if (f.mode === "aether") {
      const dx = (t.x - view.x) * f.face;
      if (e.ageSeconds >= coefficient(a, "activation_delay") && t.alive && !t.invulnerable && !t.debuffImmune && dx >= -coefficient(a, "remnant_watch_radius") * SCALE && dx <= coefficient(a, "remnant_watch_distance") * SCALE && t.y < 130) {
        teleport(ctx, a, { castId: "effect:" + f.handle }, t.id, view.x + f.face * coefficient(a, "pull_destination") * SCALE);
        damage2(ctx, a, e.owner, t.id, coefficient(a, "impact_damage"), "magical");
        control(ctx, a, e.owner, t.id, "stun", coefficient(a, "pull_duration"));
        ctx.legacyEffect.end(f.handle, "contact");
        own.effects = own.effects.filter((x) => x.handle !== f.handle);
      }
    } else if (f.mode === "hammer_burn") {
      for (let i = 0; i < e.pulses; i++) if (t.x >= Math.min(f.from, view.x) - 110 && t.x <= Math.max(f.from, view.x) + 110 && t.y < 130) {
        damage2(ctx, a, e.owner, t.id, coefficient(a, "burn_damage") * 0.5, "magical");
        apply(ctx, state, a, e.owner, t.id, "x_hammer_slow", 0.6, { moveSlow: coefficient(a, "move_slow") / 100 });
      }
    } else if (f.mode === "calling") {
      if (t.alive && Math.abs(t.x - view.x) <= 460 * SCALE && t.y < 130) {
        apply(ctx, state, a, e.owner, t.id, "x_call_slow", 0.2, { moveSlow: -coefficient(a, "aura_movespeed_slow") / 100 });
        const touch = [0, 1, 2, 3].some((i) => Math.abs(t.x - (view.x + coefficient(a, "dead_zone_distance") * SCALE * Math.cos(e.ageSeconds * Math.PI / 2 + i * Math.PI / 2))) <= coefficient(a, "hit_radius") * SCALE);
        if (touch && ctx.now >= (e.nextEligibleTime ?? 0)) {
          damage2(ctx, a, e.owner, t.id, coefficient(a, "damage"), "magical");
          apply(ctx, state, a, e.owner, t.id, "x_call_silence", coefficient(a, "silence_duration"), { silence: true });
          return { rearmAt: ctx.now + 1 };
        }
      }
    }
  }
  return base2(config, {
    requires,
    planCast: (ctx, e) => planning2(config, ctx, e),
    onCastCommitted: (ctx, e) => committed(config, ctx, e),
    onInterrupt: (ctx, e) => interrupted(config, ctx, e),
    scheduledHandlers: { ...JOB_OPS[id2] ? { dispatch } : {}, ...["ember_spirit_searing_chains", "ember_spirit_flame_guard", "abyssal_underlord_firestorm", "void_spirit_astral_step"].includes(id2) ? { pulse } : {} },
    activate(ctx, c) {
      if (a.mvp.passive) return;
      const state = read(ctx, definitions), s = state.owners[c.owner], f = ctx.actor(c.owner), t = ctx.actor(c.target), aim = c.aimX;
      switch (id2) {
        case "ember_spirit_searing_chains":
          if (near(f, t, coefficient(a, "radius"))) {
            apply(ctx, state, a, c.owner, c.target, "x_chains", coefficient(a, "duration"), { dps: coefficient(a, "damage_per_second") }, "negative", 0.25);
            control(ctx, a, c.owner, c.target, "root", coefficient(a, "duration"), "basic");
          }
          break;
        case "ember_spirit_sleight_of_fist": {
          const duration = coefficient(a, "attack_interval"), rev = channel(ctx, state, c.owner, "sleight", duration);
          ctx.protect({ actor: c.owner, abilityId: a.id, kind: "invulnerability", duration });
          job(ctx, state, a, c, "sleight", duration, { x: aim }, rev, ["control", "input-cancel", "movement", "action"]);
          break;
        }
        case "ember_spirit_flame_guard":
          apply(ctx, state, a, c.owner, c.owner, "x_flame", coefficient(a, "duration"), { amount: coefficient(a, "absorb_amount"), dps: coefficient(a, "damage_per_second") }, "positive", coefficient(a, "tick_interval"));
          break;
        case "ember_spirit_fire_remnant":
          field2(ctx, state, a, c, "remnant", aim, 1);
          job(ctx, state, a, c, "remnant", 1, { x: aim });
          break;
        case "abyssal_underlord_firestorm":
          field2(ctx, state, a, c, "storm", aim, 6.000001, aim, { radius: coefficient(a, "radius") * SCALE, pulseInterval: coefficient(a, "wave_interval"), pulseLimit: coefficient(a, "wave_count") });
          break;
        case "abyssal_underlord_pit_of_malice":
          field2(ctx, state, a, c, "pit", aim, coefficient(a, "pit_duration"), aim, { radius: coefficient(a, "radius") * SCALE, eachFrame: true, rearm: coefficient(a, "pit_interval") });
          break;
        case "abyssal_underlord_dark_portal": {
          const x = c.explicitAim ? aim : f.x < 600 ? 1155 : 45, rev = channel(ctx, state, c.owner, "gate", coefficient(a, "warp_channel_duration"));
          field2(ctx, state, a, c, "gate", f.x, coefficient(a, "duration"), x);
          field2(ctx, state, a, c, "gate", x, coefficient(a, "duration"), f.x);
          job(ctx, state, a, c, "gate", coefficient(a, "warp_channel_duration"), { x }, rev, ["control", "input-cancel", "movement", "action"]);
          break;
        }
        case "void_spirit_aether_remnant":
          field2(ctx, state, a, c, "aether", aim, coefficient(a, "duration"), aim, { eachFrame: true, activationDelay: coefficient(a, "activation_delay") });
          break;
        case "void_spirit_dissimilate": {
          const duration = coefficient(a, "phase_duration"), x = clamp(f.x + Math.sign(aim - f.x) * coefficient(a, "first_ring_distance_offset") * SCALE), rev = channel(ctx, state, c.owner, "phase", duration);
          ctx.protect({ actor: c.owner, abilityId: a.id, kind: "invulnerability", duration });
          job(ctx, state, a, c, "phase", duration, { x }, rev, ["control", "input-cancel", "movement", "action"]);
          break;
        }
        case "void_spirit_resonant_pulse": {
          let amount = coefficient(a, "base_absorb_amount");
          if (near(f, t, coefficient(a, "radius")) && damage2(ctx, a, c.owner, c.target, coefficient(a, "damage")).accepted) amount += coefficient(a, "absorb_per_hero_hit");
          apply(ctx, state, a, c.owner, c.owner, "x_pulse", coefficient(a, "buff_duration"), { amount }, "positive");
          break;
        }
        case "void_spirit_astral_step": {
          const direction = Math.sign(aim - f.x) || f.dir, x = clamp(f.x + direction * Math.max(coefficient(a, "min_travel_distance") * SCALE, Math.min(coefficient(a, "max_travel_distance") * SCALE, Math.abs(aim - f.x))));
          teleport(ctx, a, c, c.owner, x);
          if (near(ctx.actor(c.owner), t, coefficient(a, "radius"))) {
            damage2(ctx, a, c.owner, c.target, power(ctx, c.owner, definitions, c.attackBonus), "physical");
            apply(ctx, state, a, c.owner, c.target, "x_voidmark", coefficient(a, "pop_damage_delay"), { moveSlow: coefficient(a, "movement_slow_pct") / 100, pop: coefficient(a, "pop_damage") }, "negative", coefficient(a, "pop_damage_delay"));
          }
          break;
        }
        case "dawnbreaker_fire_wreath": {
          const rev = channel(ctx, state, c.owner, "star", 1.1);
          for (let part = 0; part < 3; part++) job(ctx, state, a, c, "star", (part + 1) * 1.1 / 3, { part }, rev, ["control", "input-cancel", "movement", "action"]);
          break;
        }
        case "dawnbreaker_celestial_hammer": {
          const travel = Math.abs(aim - f.x) / (coefficient(a, "projectile_speed") * SCALE);
          job(ctx, state, a, c, "hammer_out", travel, { from: f.x, x: aim });
          job(ctx, state, a, c, "hammer_return", travel * 2 + coefficient(a, "pause_duration"), { from: f.x, x: aim });
          break;
        }
        case "dawnbreaker_solar_guardian": {
          const x = c.explicitAim ? aim : f.x, rev = channel(ctx, state, c.owner, "solar", coefficient(a, "AbilityChannelTime") + coefficient(a, "airtime_duration"));
          removeJobs(ctx, s, ["hammer_out", "hammer_return"]);
          for (let i = 1; i <= 3; i++) job(ctx, state, a, c, "solar_pulse", i * coefficient(a, "pulse_interval"), { x }, rev, ["control", "input-cancel", "movement", "action"]);
          job(ctx, state, a, c, "solar_fly", coefficient(a, "AbilityChannelTime"), { x }, rev, ["control", "input-cancel", "movement", "action"]);
          job(ctx, state, a, c, "solar_land", coefficient(a, "AbilityChannelTime") + coefficient(a, "airtime_duration"), { x }, rev, ["control", "input-cancel", "movement", "action"]);
          break;
        }
        case "muerta_the_calling":
          field2(ctx, state, a, c, "calling", aim, coefficient(a, "duration"), aim, { eachFrame: true });
          break;
        case "muerta_dead_shot":
          job(ctx, state, a, c, "deadshot", Math.abs(t.x - f.x) / (coefficient(a, "speed") * SCALE));
          break;
        case "muerta_gunslinger":
          s.gunslinger = !s.gunslinger;
          break;
        case "muerta_pierce_the_veil":
          job(ctx, state, a, c, "veil", coefficient(a, "transform_duration"));
          break;
        default:
          throw Error("Unimplemented C V6 slot " + id2);
      }
      write(ctx, state);
    },
    projectInterval(ctx, e) {
      if (config.hero.abilities[0].id !== id2 || e.kind !== "movement") return;
      const s = read(ctx, definitions).owners[e.owner];
      return { multiplier: s.channel ? 0 : 1, disarmed: !!s.channel };
    },
    projectAttack(ctx, e) {
      if (id2 === "abyssal_underlord_atrophy_aura") {
        let amount = e.amount;
        amount += sumGain(ctx, e.attacker);
        const enemy = ctx.actor(1 - e.attacker);
        if (enemy.heroId === 106 && enemy.alive && enemy.passivesEnabled && near(ctx.actor(e.attacker), enemy, coefficient(a, "radius"))) amount = Math.max(0, amount - lookup(definitions).get(ctx.actor(e.attacker).heroId).attack * coefficient(a, "damage_reduction_pct") / 100);
        return { amount };
      }
      if (id2 === "muerta_pierce_the_veil" && hasVeil(ctx, e.attacker)) return { amount: e.amount + lookup(definitions).get(ctx.actor(e.attacker).heroId).attack * coefficient(a, "base_damage_percent") / 100, type: "magical" };
    },
    projectDamage(ctx, e) {
      if (e.phase === "modify") {
        if (id2 === "muerta_pierce_the_veil" && e.type === "physical" && hasVeil(ctx, e.target)) return { amount: 0 };
        if (id2 === "dawnbreaker_luminosity" && e.attacker === e.owner && e.basic && !e.reflected && ctx.actor(e.owner).passivesEnabled && read(ctx, definitions).owners[e.owner].luminosity === 3) return { amount: e.amount * coefficient(a, "bonus_damage") / 100 };
      }
      if (e.phase === "before-shields" && ["ember_spirit_flame_guard", "void_spirit_resonant_pulse"].includes(id2)) {
        const flame = id2 === "ember_spirit_flame_guard";
        if (e.type !== (flame ? "magical" : "physical")) return;
        const rows2 = [0, 1].flatMap((i) => statusRows(ctx, e.target, (flame ? "x_flame_" : "x_pulse_") + i));
        let amount = e.amount;
        const statusDebits = [];
        for (const row of rows2) {
          const take = Math.min(row.values.amount, amount * (flame ? coefficient(a, "shield_pct_absorb") / 100 : 1)), remainingAmount = row.values.amount - take;
          amount -= take;
          statusDebits.push({ handle: row.handle, amountField: "amount", remainingAmount, removeWhenEmpty: true });
        }
        return { amount, statusDebits };
      }
    },
    onAttack(ctx, e) {
      if (id2 === "dawnbreaker_luminosity" && e.attacker === e.owner) {
        const state = read(ctx, definitions), s = state.owners[e.owner];
        if (e.landed && ctx.actor(e.owner).passivesEnabled) {
          s.luminosity = (s.luminosity + 1) % 4;
          if (s.luminosity === 0 && e.receipt?.attackId === e.attackId) ctx.heal({ source: e.owner, target: e.owner, abilityId: a.id, amount: e.receipt.actual * coefficient(a, "heal_pct") / 100 });
        }
        write(ctx, state);
      }
      if (id2 === "muerta_gunslinger" && e.attacker === e.owner) {
        const s = read(ctx, definitions).owners[e.owner], f = ctx.actor(e.owner), t = ctx.actor(e.target);
        if (f.alive && s.gunslinger && e.landed && f.passivesEnabled && t.alive && ctx.random() < coefficient(a, "double_shot_chance") / 100) {
          const veil = hasVeil(ctx, e.owner);
          damage2(ctx, a, e.owner, e.target, power(ctx, e.owner, definitions, e.attackBonus) + (veil ? hero.attack * coefficient(lookup(definitions).get(ctx.actor(e.owner).heroId).abilities.find((x) => x.id === "muerta_pierce_the_veil"), "base_damage_percent") / 100 : 0), veil ? "magical" : "physical");
        }
      }
    },
    onDeath(ctx, e) {
      if (id2 !== "abyssal_underlord_atrophy_aura") return;
      const state = read(ctx, definitions), s = state.owners[e.owner], f = ctx.actor(e.owner), t = ctx.actor(e.actor);
      if (t.id !== f.id && f.alive && !s.deathSeen && f.passivesEnabled && near(f, t, coefficient(a, "radius"))) {
        apply(ctx, state, a, e.owner, e.owner, "x_atrophy_gain", coefficient(a, "bonus_damage_duration"), { bonusDamage: coefficient(a, "bonus_damage_from_hero") }, "positive");
        s.deathSeen = true;
      }
      write(ctx, state);
    },
    onStage(ctx, e) {
      const state = read(ctx, definitions);
      housekeeping(ctx, state, e);
      const result = e.kind === "field" ? fieldStage(ctx, state, e) : void 0;
      write(ctx, state);
      return result;
    }
  });
}
function sumGain(ctx, id2) {
  return [0, 1].flatMap((i) => statusRows(ctx, id2, "x_atrophy_gain_" + i)).reduce((n, r) => n + (r.values.bonusDamage ?? 0), 0);
}
export {
  INNATES,
  create as centaurFactory,
  core4Factory,
  create3 as extraFactory,
  create2 as skywrathFactory
};
