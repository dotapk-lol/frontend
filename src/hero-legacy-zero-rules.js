// legacy-zero-linear-batch20-host/node_modules/@dotapk/heros/rules/legacy-0-9/remaining.js
import { BATTLE_ABI, EMPTY_STATE_SCHEMA } from "./heros-rules.js";

// legacy-zero-linear-batch20-host/node_modules/@dotapk/heros/rules/legacy-0-9/remaining-common.js
import { codeIdentity, defineStateSchema } from "./heros-rules.js";
var EVENT_VERSION = "heros-host-events-1";
var FEATURES = Object.freeze(["legacy-hit-v1", "legacy-linear-v1", "legacy-dot-v1", "legacy-field-v1", "legacy-channel-v1", "legacy-job-v1", "legacy-property-v1", "legacy-passive-v1", "legacy-status-v1", "legacy-contact-v1"]);
function num(v, k, min = 0, max = 1e7) {
  if (!Number.isFinite(v) || v < min || v > max) throw Error("Invalid finite " + k);
  return v;
}
function flag(v, k) {
  if (typeof v !== "boolean") throw Error("Invalid boolean " + k);
  return v;
}
function actor(v) {
  if (v !== 0 && v !== 1) throw Error("Invalid actor ID");
  return v;
}
function handle(v) {
  if (typeof v !== "string" || !v.length || v.length > 128) throw Error("Invalid stable handle");
  return v;
}
function closed(v, keys, name) {
  if (!v || Object.getPrototypeOf(v) !== Object.prototype || Object.keys(v).sort().join(",") !== [...keys].sort().join(",")) throw Error("Invalid closed " + name);
}
function caps(v) {
  if (!Array.isArray(v) || new Set(v).size !== v.length || v.some((x) => !FEATURES.includes(x))) throw Error("Invalid host capabilities");
  return [...v].sort();
}
function admitted(config, e, features) {
  return config.parameters.hostSemantics === EVENT_VERSION && e.legacySemantics === EVENT_VERSION && features.every((x) => config.parameters.hostCapabilities.includes(x) && e.legacyCapabilities?.includes(x));
}
var BASE = ["owner", "target", "abilityId", "slot", "castId", "legacySemantics", "legacyCapabilities"];
function event(config, e, features, keys = []) {
  if (!admitted(config, e, features)) throw Error("GATED: legacy host capability unconfirmed");
  closed(e, [...BASE, ...keys], "legacy event");
  caps(e.legacyCapabilities);
  actor(e.owner);
  actor(e.target);
  if (e.target === e.owner && !keys.includes("source") || e.slot !== config.parameters.slot || e.abilityId !== config.definition.id) throw Error("Wrong legacy identity");
  handle(e.castId);
}
function direction(v) {
  if (v !== 1 && v !== -1) throw Error("Invalid direction");
  return v;
}
function distance(ctx, e) {
  return Math.abs(ctx.actor(e.owner).x - ctx.actor(e.target).x);
}
function near(ctx, e, r, ground = false) {
  return distance(ctx, e) <= r + 22 && (!ground || ctx.actor(e.target).y < 45);
}
function cue(kind, actorId, target, x = 0, y = 0, size = 0, directionValue = 1) {
  return { kind: "cue", cue: kind, actor: actorId, target, x, y, size, direction: directionValue };
}
function status(target, key, duration, values) {
  return { kind: "status.apply", target, key, duration, values };
}
function log(actorId, eventName, values = {}) {
  return { kind: "log", actor: actorId, event: eventName, values };
}
var COMMAND_KEYS = {
  "hit": ["source", "target", "amount", "type", "blockable", "stun", "hitstun", "slowPct", "slowSeconds", "silence", "knockback", "pullDistance", "pullCap", "dot", "passive", "basic", "suppressFiery", "reflected", "projection"],
  "projectile.spawn": ["source", "direction", "x", "y", "speed", "range", "radius", "height", "reflectable", "contact"],
  "effect.spawn": ["owner", "profile", "x", "duration", "interval", "radius", "followSpeed", "replace", "terminal", "ownerDeath"],
  "effect.end": ["owner", "handle", "scope", "reason"],
  "dot.apply": ["source", "target", "duration", "interval", "replace", "rootPolicy", "rootSeconds", "dispel"],
  "channel.begin": ["owner", "target", "direction", "duration", "interval", "profile", "grabStun"],
  "channel.end": ["handle", "target", "reason", "recovery", "recoveryPolicy", "cleanup"],
  "job.spawn": ["owner", "target", "index", "offset", "profile"],
  "motion": ["target", "x"],
  "protect": ["target", "seconds"],
  "status.apply": ["target", "key", "duration", "values"],
  "status.remove": ["target", "key", "handle"],
  "cleanse": ["target", "tier"],
  "mana.debit": ["target", "amount", "attackHandle"],
  "mana.transfer": ["donor", "beneficiary", "amount"],
  "heal": ["target", "amount", "receipt"],
  "self.damage": ["target", "amount", "nonlethal"],
  "slow.replace": ["target", "percentage", "seconds"],
  "counter.mirror": ["target", "count", "receipt"],
  "contribution": ["target", "property", "value"],
  "cue": ["cue", "actor", "target", "x", "y", "size", "direction"],
  "log": ["actor", "event", "values"]
};
var STATUS_VALUES = { aura: ["magicReduction", "debuffImmune", "endDispel", "blocksBasicAttack"], drow_ranger_frost: ["attackBonus", "onAttackSlow", "onAttackSlowSeconds"], deadlyFocus: [], fiery: ["stacks"], helix_cd: [] };
function finiteTree(v, depth = 0) {
  if (depth > 6) throw Error("Command depth");
  if (typeof v === "number") num(v, "command number", -1e7);
  else if (typeof v === "string") {
    if (v.length > 128) throw Error("Command string");
  } else if (typeof v === "boolean" || v === null) {
  } else if (Array.isArray(v)) {
    if (v.length > 128) throw Error("Command array");
    v.forEach((x) => finiteTree(x, depth + 1));
  } else if (v && Object.getPrototypeOf(v) === Object.prototype) {
    if (Object.keys(v).length > 32) throw Error("Command object");
    Object.values(v).forEach((x) => finiteTree(x, depth + 1));
  } else throw Error("Nonfinite command");
}
function program(config, commands, result = {}) {
  for (const c of commands) {
    if (!COMMAND_KEYS[c.kind]) throw Error("Unknown declarative command");
    closed(c, ["kind", ...COMMAND_KEYS[c.kind]], "command " + c.kind);
    finiteTree(c);
    for (const k of ["owner", "source", "target", "actor", "donor", "beneficiary"]) if (k in c) actor(c[k]);
    if (c.kind === "status.apply") {
      if (!STATUS_VALUES[c.key]) throw Error("Unknown named status");
      closed(c.values, STATUS_VALUES[c.key], "status values");
    }
    if (c.kind === "hit" && (!["physical", "magical", "pure"].includes(c.type) || c.reflected !== false)) throw Error("Invalid legacy hit profile");
  }
  finiteTree(result);
  return { draft: true, profile: EVENT_VERSION, abilityId: config.definition.id, commands, result };
}
function hit(config, source, target, patch = {}) {
  const m = config.definition.mvp;
  return { kind: "hit", source, target, amount: m.damage, type: m.damage_type, blockable: m.blockable, stun: m.stun_s, hitstun: m.hitstun_s, slowPct: m.slow_pct, slowSeconds: m.slow_duration_s, silence: m.silence_s || 0, knockback: m.knockback_wu, pullDistance: m.pull_to_distance || 0, pullCap: m.pull_cap_s || 0, dot: false, passive: false, basic: false, suppressFiery: false, reflected: false, projection: null, ...patch };
}
function projectile(config, ctx, e, contact) {
  const m = config.definition.mvp, f = ctx.actor(e.owner);
  return { kind: "projectile.spawn", source: e.owner, direction: direction(e.direction), x: f.x + f.dir * 35, y: f.y + (m.height === "ground" ? 35 : 100), speed: m.projectile_speed_wu_s || 800, range: m.range_wu, radius: Math.max(12, m.radius_wu || 18), height: m.height, reflectable: m.reflectable, contact };
}
function coefficients(m) {
  for (const [k, v] of Object.entries(m)) {
    if (typeof v === "number") num(v, k);
    if (Array.isArray(v) && v.some((x) => typeof x !== "number" || !Number.isFinite(x) || x < 0 || x > 1e7)) throw Error("Invalid vector " + k);
  }
  if (!["physical", "magical", "pure"].includes(m.damage_type)) throw Error("Invalid type");
  for (const v of Object.values(m.officialSemantic || {})) if (typeof v === "number") num(v, "semantic", -1e7);
}
var FILES = ["rules/legacy-0-9/remaining.js", "rules/legacy-0-9/remaining-common.js", "rules/legacy-0-9/remaining-projectiles.js", "rules/legacy-0-9/remaining-effects.js", "rules/legacy-0-9/remaining-channels.js", "rules/legacy-0-9/remaining-passives.js"];
var identity = () => codeIdentity(FILES);
var caches = /* @__PURE__ */ new WeakMap();
var int = (max) => ({ type: "integer", minimum: 0, maximum: max });
var obj = (properties) => ({ type: "object", properties, required: Object.keys(properties), additionalProperties: false });
function ownedSchema(config, kind) {
  let map = caches.get(config.definitions);
  if (!map) caches.set(config.definitions, map = /* @__PURE__ */ new Map());
  if (map.has(kind)) return map.get(kind);
  const maxMana = Math.max(...config.definitions.map((h) => h.combatMana ?? h.mana ?? 1200)), str = { type: "string", minLength: 1, maxLength: 128 }, id = int(1);
  const data = kind === "helix" ? obj({ actors: { type: "array", minItems: 2, maxItems: 2, items: obj({ count: int(2147483647), receipt: { anyOf: [{ type: "null" }, str] } }) } }) : obj({ pending: { type: "array", maxItems: 64, items: obj({ owner: id, target: id, handle: str, burn: { type: "number", minimum: 0, maximum: maxMana } }) } });
  const parameters = kind === "helix" ? { maxCount: 2147483647 } : { maxMana, maxPending: 64 };
  const schema = defineStateSchema({ id: "heros/legacy-0-9/" + kind + "-state", schema: { anyOf: [{ type: "null" }, data] }, parameters, refinement: { id: kind + "-pairing-v1", ...identity(), validate(v) {
    if (v === null) return true;
    if (kind === "helix") return v.actors.every((x) => x.count === 0 === (x.receipt === null));
    return new Set(v.pending.map((x) => x.owner + ":" + x.handle)).size === v.pending.length && v.pending.every((x) => x.target === 1 - x.owner);
  } } });
  map.set(kind, schema);
  return schema;
}

// legacy-zero-linear-batch20-host/node_modules/@dotapk/heros/rules/legacy-0-9/remaining-projectiles.js
var IDS = ["pudge_hook", "sniper_assassinate", "phantom_assassin_dagger", "drow_ranger_gust", "lina_slave", "lion_spike"];
function buildProjectile(config) {
  const id = config.definition.id;
  if (!IDS.includes(id)) return null;
  const features = ["legacy-hit-v1", "legacy-linear-v1"];
  const focus = config.definitions.find((h) => h.registryNumericId === 6).abilities[3].mvp;
  return {
    features,
    requires: [],
    activate(ctx, e) {
      event(config, e, features, ["direction"]);
      return program(config, [projectile(config, ctx, e, "onContact")]);
    },
    onContact(ctx, e) {
      event(config, e, features, ["source", "projectileHandle", "direction", "travel", "reflected"]);
      actor(e.source);
      if (e.target !== 1 - e.source) throw Error("Invalid reflected target");
      handle(e.projectileHandle);
      direction(e.direction);
      num(e.travel, "travel");
      flag(e.reflected, "reflected");
      return program(config, [hit(config, e.source, e.target)], { postHit: id === "phantom_assassin_dagger" ? "onAttack" : null });
    },
    ...id === "phantom_assassin_dagger" ? { onAttack(ctx, e) {
      event(config, e, features, ["source", "projectileHandle", "phase", "landed"]);
      actor(e.source);
      handle(e.projectileHandle);
      flag(e.landed, "landed");
      if (e.phase !== "projectile-hit-return" || e.target !== 1 - e.source) throw Error("Wrong dagger receipt stage");
      return program(config, e.landed && ctx.random() < focus.daggerFocusChance ? [status(e.source, "deadlyFocus", focus.slow_duration_s, {})] : []);
    } } : {}
  };
}

// legacy-zero-linear-batch20-host/node_modules/@dotapk/heros/rules/legacy-0-9/remaining-effects.js
var AREA = ["juggernaut_blade_fury", "juggernaut_healing_ward", "pudge_rot", "sniper_shrapnel"];
var DOT = ["crystal_maiden_frostbite", "axe_hunger"];
function buildEffect(config) {
  const id = config.definition.id, m = config.definition.mvp;
  if (AREA.includes(id)) {
    const features = ["legacy-hit-v1", "legacy-field-v1", "legacy-status-v1"];
    const ward = id === "juggernaut_healing_ward", fury = id === "juggernaut_blade_fury", rot = id === "pudge_rot";
    return {
      features,
      requires: [],
      activate(ctx, e) {
        event(config, e, features, ["aimX", "toggleActive"]);
        num(e.aimX, "aimX", -1e4, 1e4);
        flag(e.toggleActive, "toggleActive");
        const f = ctx.actor(e.owner), commands = [];
        if (rot && e.toggleActive) return program(config, [{ kind: "status.remove", target: e.owner, key: "aura", handle: null }, { kind: "effect.end", owner: e.owner, handle: null, scope: "owner-ability", reason: "toggle" }]);
        if (fury && m.debuffImmune) commands.push({ kind: "cleanse", target: e.owner, tier: "basic" });
        if (fury || rot) commands.push(status(e.owner, "aura", m.duration_s, { magicReduction: m.magic_reduction || 0, debuffImmune: !!m.debuffImmune, endDispel: m.endDispel || "none", blocksBasicAttack: fury }));
        const profile = ward ? "ward" : rot || fury ? "aura" : "ground_dot";
        commands.push({ kind: "effect.spawn", owner: e.owner, profile, x: profile === "ground_dot" ? e.aimX : f.x, duration: m.duration_s, interval: m.tick_interval_s, radius: m.radius_wu, followSpeed: ward ? (m.officialSemantic.ward_move_speed || 325) * 0.55 : 0, replace: ward ? "silent-owner-ward" : "none", terminal: fury || rot ? "marker-required" : "include", ownerDeath: ward || fury || rot ? "end" : "preserve" });
        if (ward) commands.push(log(e.owner, "ward_spawn", { x: f.x, duration: m.duration_s, radius: m.radius_wu }), cue("ward_spawn", e.owner, e.owner, f.x, 190));
        return program(config, commands);
      },
      onStage(ctx, e) {
        event(config, e, features, ["effectHandle", "phase", "x", "remainingLife", "liveDt", "due", "markerActive", "reason", "healed", "healTicks"]);
        handle(e.effectHandle);
        num(e.x, "x", -1e4, 1e4);
        num(e.remainingLife, "remainingLife", -1, 1e3);
        num(e.liveDt, "liveDt", 0, 0.05);
        flag(e.due, "due");
        flag(e.markerActive, "markerActive");
        num(e.healed, "healed");
        num(e.healTicks, "healTicks", 0, 1e7);
        const f = ctx.actor(e.owner), t = ctx.actor(e.target), commands = [];
        if (e.phase === "buff-expiring") {
          if (!fury || e.reason !== "expired") throw Error("Unexpected marker expiry");
          if (m.endDispel) commands.push({ kind: "cleanse", target: e.owner, tier: m.endDispel });
          return program(config, commands);
        }
        if (e.phase === "effect-end") {
          if (!["expired", "owner-dead", "cancelled", "attack", "replace"].includes(e.reason)) throw Error("Invalid effect reason");
          if (ward && e.reason !== "replace") commands.push(log(e.owner, "ward_end", { reason: e.reason === "owner-dead" ? "owner_defeated" : e.reason, attacker: e.reason === "attack" ? e.target : null, healed: e.healed, ticks: e.healTicks }));
          if (ward && e.reason === "attack") commands.push(cue("ward-destroy", e.owner, e.target, e.x, 50));
          return program(config, commands);
        }
        if (e.phase !== "zone-tick" || e.reason !== "none") throw Error("Wrong zone stage");
        if ((ward || fury || rot) && !f.alive) return program(config, [{ kind: "effect.end", owner: e.owner, handle: e.effectHandle, scope: "handle", reason: "owner-dead" }]);
        if ((fury || rot) && !e.markerActive) return program(config, [{ kind: "effect.end", owner: e.owner, handle: e.effectHandle, scope: "handle", reason: "marker-removed" }]);
        if (!e.due) return program(config, []);
        if (ward) {
          if (Math.abs(f.x - e.x) <= m.radius_wu) commands.push({ kind: "heal", target: e.owner, amount: f.maxHp * (m.officialSemantic.heal_max_hp_pct_per_s || 0) / 100 * m.tick_interval_s, receipt: e.effectHandle });
        } else {
          if (Math.abs(t.x - e.x) <= m.radius_wu + 22 && (id !== "sniper_shrapnel" || t.y < 45)) commands.push(hit(config, e.owner, e.target, { dot: true, suppressFiery: true, slowSeconds: m.slow_linger_s ?? Math.min(m.slow_duration_s ?? 1, m.tick_interval_s || 0.2), projection: fury ? "juggernaut_blade_dance" : null }));
          if (m.self_damage_per_tick) commands.push({ kind: "self.damage", target: e.owner, amount: m.self_damage_per_tick, nonlethal: true });
        }
        return program(config, commands);
      }
    };
  }
  if (DOT.includes(id)) {
    const features = ["legacy-hit-v1", "legacy-dot-v1", "legacy-status-v1"];
    return {
      features,
      requires: ["target-route"],
      activate(ctx, e) {
        event(config, e, features, ["reflected"]);
        flag(e.reflected, "reflected");
        const routed = ctx.target.route({ owner: e.owner, target: e.target, abilityId: id, range: m.range_wu, reflectable: true, reflected: e.reflected });
        if (!routed || typeof routed.accepted !== "boolean" || typeof routed.reflected !== "boolean" || routed.originalOwner !== e.owner) throw Error("Missing finite targeted route");
        actor(routed.owner);
        actor(routed.target);
        if (!routed.accepted) return program(config, []);
        const reflected = routed.reflected, t = ctx.actor(routed.target);
        if (!reflected && (!near(ctx, e, m.range_wu) || t.guarding || t.invulnerable)) return program(config, []);
        const commands = [{ kind: "dot.apply", source: routed.owner, target: routed.target, duration: m.duration_s, interval: m.tick_interval_s, replace: !reflected, rootPolicy: id === "crystal_maiden_frostbite" ? reflected ? "unconditional-direct" : "nonimmune-direct" : "none", rootSeconds: id === "crystal_maiden_frostbite" ? m.duration_s : 0, dispel: m.dispelTier }];
        if (reflected) commands.push(cue("reflect", routed.owner, routed.target));
        else if (id === "crystal_maiden_frostbite" && !t.debuffImmune) commands.push(cue("root", routed.owner, routed.target, t.x, t.y + 50, 0));
        return program(config, commands);
      },
      onStage(ctx, e) {
        event(config, e, features, ["source", "dotHandle", "phase", "remainingLife", "elapsed", "due", "reflected"]);
        actor(e.source);
        handle(e.dotHandle);
        if (e.target !== 1 - e.source || e.phase !== "fighter-dot") throw Error("Wrong DOT stage");
        num(e.remainingLife, "remainingLife", -0.05, 1e3);
        num(e.elapsed, "elapsed", 0, 1001);
        flag(e.due, "due");
        flag(e.reflected, "reflected");
        return program(config, e.due ? [hit(config, e.source, e.target, { dot: true, suppressFiery: true, stun: 0, hitstun: 0, slowSeconds: Math.min(m.slow_duration_s ?? 1, Math.max(0, e.remainingLife)) })] : []);
      }
    };
  }
  if (id === "crystal_maiden_nova") {
    const features = ["legacy-hit-v1"];
    return { features, requires: [], activate(ctx, e) {
      event(config, e, features, ["aimX"]);
      num(e.aimX, "aimX", -1e4, 1e4);
      const t = ctx.actor(e.target), commands = [];
      if (Math.abs(t.x - e.aimX) <= m.radius_wu + 22 && t.y < 45) commands.push(hit(config, e.owner, e.target));
      commands.push(cue("pillar", e.owner, e.target, e.aimX, 0, m.radius_wu));
      return program(config, commands);
    } };
  }
  if (id === "juggernaut_omnislash") {
    const features = ["legacy-hit-v1", "legacy-job-v1", "legacy-status-v1", "legacy-contact-v1"];
    return { features, requires: [], activate(ctx, e) {
      event(config, e, features, []);
      if (m.invulnerable_active && !near(ctx, e, m.range_wu)) return program(config, []);
      const commands = m.invulnerable_active ? [{ kind: "cleanse", target: e.owner, tier: "basic" }, { kind: "protect", target: e.owner, seconds: m.duration_s }] : [];
      for (let n = 0; n < m.ticks; n++) commands.push({ kind: "job.spawn", owner: e.owner, target: e.target, index: n, offset: m.tick_offsets_s?.[n] ?? n * m.tick_interval_s, profile: "omnislash" });
      return program(config, commands);
    }, onStage(ctx, e) {
      event(config, e, features, ["phase", "jobHandle", "index", "blocked"]);
      handle(e.jobHandle);
      if (e.phase !== "due-skill-hit" || !Number.isInteger(e.index) || e.index < 0 || e.index >= m.ticks) throw Error("Wrong scheduled hit");
      flag(e.blocked, "blocked");
      const f = ctx.actor(e.owner), t = ctx.actor(e.target);
      if (!f.alive || e.blocked || !near(ctx, e, m.tracking_break_wu || m.range_wu || m.radius_wu)) return program(config, []);
      return program(config, [{ kind: "motion", target: e.owner, x: t.x - f.dir * 75 }, cue("slash", e.owner, e.target, t.x, t.y + 100, 160, f.dir), hit(config, e.owner, e.target, { amount: m.hit_damages?.[e.index] ?? m.damage, basic: true, projection: "juggernaut_blade_dance" })]);
    } };
  }
  return null;
}

// legacy-zero-linear-batch20-host/node_modules/@dotapk/heros/rules/legacy-0-9/remaining-channels.js
var IDS2 = ["crystal_maiden_freezing_field", "pudge_dismember", "drow_ranger_multishot", "lion_drain"];
function buildChannel(config) {
  const id = config.definition.id, m = config.definition.mvp;
  if (!IDS2.includes(id)) return null;
  const features = ["legacy-hit-v1", "legacy-channel-v1", ...id === "drow_ranger_multishot" ? ["legacy-linear-v1"] : []], grab = m.effect === "grab", drain = m.effect === "drain";
  const end = (e, reason, recovery, cleanup) => ({ kind: "channel.end", handle: e.channelHandle, target: e.target, reason, recovery, recoveryPolicy: reason === "interrupt" || reason === "owner-dead" ? "preserve" : reason === "cancel-input" ? "max" : "replace", cleanup });
  return {
    features,
    requires: [],
    activate(ctx, e) {
      event(config, e, features, ["direction"]);
      direction(e.direction);
      const t = ctx.actor(e.target);
      if ((grab || drain) && (!near(ctx, e, m.range_wu) || !t.alive || t.invulnerable || drain && t.debuffImmune)) return program(config, []);
      return program(config, [{ kind: "channel.begin", owner: e.owner, target: e.target, direction: e.direction, duration: m.duration_s, interval: m.tick_interval_s, profile: m.effect, grabStun: grab ? m.duration_s : 0 }], { recovery: 0 });
    },
    onStage(ctx, e) {
      event(config, e, features, ["phase", "channelHandle", "direction", "held", "moving", "blocked", "silenced", "due", "remainingLife"]);
      handle(e.channelHandle);
      direction(e.direction);
      for (const k of ["held", "moving", "blocked", "silenced", "due"]) flag(e[k], k);
      num(e.remainingLife, "remainingLife", -0.05, 1e3);
      if (e.phase !== "fighter-channel") throw Error("Wrong channel stage");
      const f = ctx.actor(e.owner), t = ctx.actor(e.target), commands = [];
      if (e.moving || !e.held || e.blocked || e.silenced || drain && (!t.alive || t.invulnerable || t.debuffImmune)) return program(config, [end(e, "input-or-control", 0.2, grab ? "clear-both" : "preserve")]);
      let rangeBreak = false;
      if (e.due) {
        const range = m.break_range_wu || m.range_wu || m.radius_wu;
        if (distance(ctx, e) <= range + 22) {
          if (drain) {
            const amount = Math.min(t.mp, m.mana_drain_per_tick || 12, f.maxMp - f.mp);
            commands.push({ kind: "mana.transfer", donor: e.target, beneficiary: e.owner, amount }, { kind: "slow.replace", target: e.target, percentage: t.mp - amount <= 0 ? 0.45 : 0.3, seconds: 0.4 }, cue("drain-beam", e.owner, e.target));
          } else if (m.effect === "channel_projectile") commands.push(projectile(config, ctx, e, "onContact"));
          else {
            let lands = true;
            if (m.randomExplosion) {
              const a = ctx.random() * Math.PI * 2, r = m.explosionMin + ctx.random() * (m.explosionMax - m.explosionMin), ex = f.x + Math.cos(a) * r, ez = Math.sin(a) * r;
              commands.push(cue("field-explosion", e.owner, e.target, ex, 0, 35));
              lands = Math.hypot(t.x - ex, ez) < m.explosionRadius;
            }
            if (lands) commands.push(hit(config, e.owner, e.target, { suppressFiery: true }));
            if (m.heal_total) commands.push({ kind: "heal", target: e.owner, amount: m.heal_total / m.ticks, receipt: e.channelHandle });
            commands.push(cue("ring", e.owner, e.target, f.x, 60, m.radius_wu || 90));
          }
        } else rangeBreak = grab || drain;
      }
      if (rangeBreak || e.remainingLife <= 1e-7) commands.push(end(e, rangeBreak ? "range" : "expired", 0.25, "clear-binding"));
      return program(config, commands);
    },
    onInterrupt(ctx, e) {
      event(config, e, features, ["channelHandle", "reason"]);
      handle(e.channelHandle);
      if (!["interrupt", "release", "cancel-input", "owner-dead"].includes(e.reason)) throw Error("Invalid channel interruption");
      return program(config, [end(e, e.reason, e.reason === "release" || e.reason === "cancel-input" ? 0.2 : 0, e.reason === "cancel-input" && grab ? "clear-both" : "preserve")]);
    },
    ...id === "drow_ranger_multishot" ? { onContact(ctx, e) {
      event(config, e, features, ["source", "projectileHandle"]);
      handle(e.projectileHandle);
      if (e.source !== e.owner) throw Error("Nonreflectable multishot source");
      return program(config, [hit(config, e.source, e.target)]);
    } } : {}
  };
}

// legacy-zero-linear-batch20-host/node_modules/@dotapk/heros/rules/legacy-0-9/remaining-passives.js
function buildPassive(config) {
  const id = config.definition.id, m = config.definition.mvp;
  const features = ["legacy-passive-v1", "legacy-status-v1", "legacy-contact-v1", ...id === "axe_helix" ? ["legacy-hit-v1"] : []];
  if (id === "axe_helix") return { features, stateSchema: ownedSchema(config, "helix"), requires: [], onDamage(ctx, e) {
    event(config, e, features, ["phase", "receipt", "basic", "accepted", "cooldownActive", "sequence"]);
    handle(e.receipt);
    for (const k of ["basic", "accepted", "cooldownActive"]) flag(e[k], k);
    num(e.sequence, "sequence", 1, 2147483647);
    if (!Number.isInteger(e.sequence)) throw Error("Noninteger receipt sequence");
    if (e.phase !== "received-basic-before-afterDamage") throw Error("Wrong helix stage");
    if (!e.basic || !e.accepted) return program(config, []);
    const state = structuredClone(ctx.state.read()) ?? { actors: [{ count: 0, receipt: null }, { count: 0, receipt: null }] }, row = state.actors[e.owner];
    if (!Number.isSafeInteger(e.sequence) || e.sequence !== row.count + 1 || row.receipt === e.receipt) throw Error("Duplicate/out-of-order helix receipt");
    if (row.count >= 2147483647) throw Error("Counter exhausted");
    row.count++;
    row.receipt = e.receipt;
    const commands = [{ kind: "counter.mirror", target: e.owner, count: row.count, receipt: e.receipt }];
    if (ctx.actor(e.owner).passivesEnabled && row.count % (m.trigger_every_received_attacks || 3) === 0 && !e.cooldownActive && Math.abs(ctx.actor(e.owner).x - ctx.actor(e.target).x) <= m.radius_wu + 25) commands.push(status(e.owner, "helix_cd", m.internal_cooldown_s || 1, {}), log(e.owner, "passive", { skill: id }), hit(config, e.owner, e.target, { blockable: true, passive: true }), cue("ring", e.owner, e.target, ctx.actor(e.owner).x, ctx.actor(e.owner).y + 60, m.radius_wu));
    const out = program(config, commands);
    ctx.state.write(state);
    return out;
  } };
  if (id === "anti_mage_mana_break") return {
    features,
    stateSchema: ownedSchema(config, "mana-break"),
    requires: [],
    projectAttack(ctx, e) {
      event(config, e, features, ["phase", "attackHandle", "damage", "guarding"]);
      handle(e.attackHandle);
      num(e.damage, "damage");
      flag(e.guarding, "guarding");
      if (e.phase !== "basic-contact-after-guard") throw Error("Wrong mana break projection");
      const state = structuredClone(ctx.state.read()) ?? { pending: [] };
      if (state.pending.some((x) => x.owner === e.owner && x.handle === e.attackHandle) || state.pending.length >= 64) throw Error("Duplicate/overflow attack ledger");
      const t = ctx.actor(e.target), burn = ctx.actor(e.owner).passivesEnabled && !e.guarding ? Math.min(t.mp, m.mana_burn + (m.mana_burn_pct || 0) * t.maxMp) : 0;
      state.pending.push({ owner: e.owner, target: e.target, handle: e.attackHandle, burn });
      const out = program(config, [], { damage: e.damage + burn * m.mana_damage_ratio, burn });
      ctx.state.write(state);
      return out;
    },
    onAttack(ctx, e) {
      event(config, e, features, ["phase", "attackHandle", "landed"]);
      handle(e.attackHandle);
      flag(e.landed, "landed");
      if (e.phase !== "basic-hit-return") throw Error("Wrong mana debit stage");
      const state = structuredClone(ctx.state.read()) ?? { pending: [] }, index = state.pending.findIndex((x) => x.owner === e.owner && x.target === e.target && x.handle === e.attackHandle);
      if (index < 0) throw Error("Unpaired mana receipt");
      const [pending] = state.pending.splice(index, 1);
      const out = program(config, e.landed && pending.burn ? [{ kind: "mana.debit", target: e.target, amount: pending.burn, attackHandle: e.attackHandle }, log(e.owner, "passive", { skill: id })] : []);
      ctx.state.write(state);
      return out;
    }
  };
  if (id === "phantom_assassin_coup") return { features, requires: [], projectAttack(ctx, e) {
    event(config, e, features, ["phase", "damage", "focusHandle"]);
    num(e.damage, "damage");
    if (e.focusHandle !== null) handle(e.focusHandle);
    if (e.phase !== "attack-start") throw Error("Wrong coup stage");
    if (!ctx.actor(e.owner).passivesEnabled) return program(config, [], { damage: e.damage, critical: false });
    if (e.focusHandle !== null) return program(config, [{ kind: "status.remove", target: e.owner, key: "deadlyFocus", handle: e.focusHandle }], { damage: e.damage * m.critMultiplier, critical: true });
    return program(config, ctx.random() < m.focusChance ? [status(e.owner, "deadlyFocus", m.slow_duration_s, {})] : [], { damage: e.damage, critical: false });
  } };
  if (id === "drow_ranger_frost") return {
    features,
    requires: [],
    activate(ctx, e) {
      event(config, e, features, ["toggleActive", "statusHandle"]);
      flag(e.toggleActive, "toggleActive");
      if (e.statusHandle !== null) handle(e.statusHandle);
      if (e.toggleActive) return program(config, [{ kind: "status.remove", target: e.owner, key: id, handle: e.statusHandle }]);
      const f = ctx.actor(e.owner);
      return program(config, [status(e.owner, id, m.duration_s, { attackBonus: m.attack_bonus, onAttackSlow: m.on_attack_slow, onAttackSlowSeconds: m.on_attack_slow_s }), cue("frost-toggle", e.owner, e.owner, f.x, f.y + 70, 100)]);
    },
    projectAttack(ctx, e) {
      event(config, e, features, ["phase", "attackHandle", "damage", "statusHandle"]);
      handle(e.attackHandle);
      num(e.damage, "damage");
      if (e.statusHandle !== null) handle(e.statusHandle);
      if (e.phase !== "basic-contact-before-hit") throw Error("Wrong frost payment stage");
      if (e.statusHandle === null) return program(config, [], { damage: e.damage });
      const enough = ctx.actor(e.owner).mp >= m.perAttackMana;
      return program(config, enough ? [{ kind: "mana.debit", target: e.owner, amount: m.perAttackMana, attackHandle: e.attackHandle }] : [{ kind: "status.remove", target: e.owner, key: id, handle: e.statusHandle }], { damage: e.damage - (enough ? 0 : m.attack_bonus) });
    },
    onAttack(ctx, e) {
      event(config, e, features, ["phase", "landed", "active"]);
      flag(e.landed, "landed");
      flag(e.active, "active");
      if (e.phase !== "basic-hit-return") throw Error("Wrong frost slow stage");
      return program(config, e.landed && e.active ? [{ kind: "slow.replace", target: e.target, percentage: m.on_attack_slow, seconds: m.on_attack_slow_s }] : []);
    }
  };
  if (id === "lina_fiery") return {
    features,
    requires: [],
    onDamage(ctx, e) {
      event(config, e, features, ["phase", "basic", "passive", "suppressFiery", "guard", "accepted", "stacks"]);
      for (const k of ["basic", "passive", "suppressFiery", "guard", "accepted"]) flag(e[k], k);
      num(e.stacks, "stacks", 0, m.max_stacks);
      if (!Number.isInteger(e.stacks) || e.phase !== "landed-spell-effects") throw Error("Wrong fiery receipt");
      if (!e.accepted || e.guard || e.basic || e.passive || e.suppressFiery || !ctx.actor(e.owner).passivesEnabled) return program(config, []);
      const commands = [status(e.owner, "fiery", m.stack_duration_s, { stacks: Math.min(m.max_stacks, e.stacks + 1) })];
      if (e.stacks < m.max_stacks) commands.push(log(e.owner, "passive", { skill: id }));
      return program(config, commands);
    },
    projectInterval(ctx, e) {
      event(config, e, features, ["phase", "stacks"]);
      if (e.phase !== "attack-interval") throw Error("Wrong fiery interval stage");
      num(e.stacks, "stacks", 0, m.max_stacks);
      if (!Number.isInteger(e.stacks)) throw Error("Noninteger stacks");
      const n = ctx.actor(e.owner).passivesEnabled ? e.stacks : 0;
      return program(config, [], { multiplier: 1 / (1 + n * (m.officialSemantic.attack_speed_per_stack / 100)) });
    },
    onStage(ctx, e) {
      event(config, e, features, ["phase", "stacks"]);
      if (e.phase !== "movement-projection") throw Error("Wrong fiery move stage");
      num(e.stacks, "stacks", 0, m.max_stacks);
      if (!Number.isInteger(e.stacks)) throw Error("Noninteger stacks");
      const n = ctx.actor(e.owner).passivesEnabled ? e.stacks : 0;
      return program(config, [{ kind: "contribution", target: e.owner, property: "movement-and-jump", value: 1 + n * (m.officialSemantic.movespeed_pct_per_stack / 100) }]);
    }
  };
  return null;
}

// legacy-zero-linear-batch20-host/node_modules/@dotapk/heros/rules/legacy-0-9/remaining.js
var REMAINING_SLOTS = Object.freeze([[0, 0], [0, 1], [0, 3], [1, 0], [1, 1], [1, 3], [2, 0], [2, 1], [2, 3], [3, 1], [3, 2], [4, 0], [4, 3], [5, 0], [6, 0], [6, 3], [7, 0], [7, 1], [7, 2], [8, 0], [8, 2], [9, 0], [9, 2]].map(Object.freeze));
function remainingLegacyFactory(heroId, slot, { hostSemantics = null, hostCapabilities = [] } = {}) {
  if (!REMAINING_SLOTS.some(([h, s]) => h === heroId && s === slot)) throw Error("Out of owned remaining scope");
  return { abiVersion: BATTLE_ABI, parameters: { heroId, slot, hostSemantics, hostCapabilities: caps(hostCapabilities) }, create(config) {
    const { hero, definition, parameters: p } = config, m = definition.mvp;
    closed(p, ["heroId", "slot", "hostSemantics", "hostCapabilities"], "factory parameters");
    if (hero.registryNumericId !== p.heroId || hero.abilities[p.slot].id !== definition.id) throw Error("Wrong registered owner");
    if (p.hostSemantics !== null && p.hostSemantics !== EVENT_VERSION) throw Error("Unknown event version");
    caps(p.hostCapabilities);
    coefficients(m);
    for (const k of ["focusChance", "daggerFocusChance", "mana_burn_pct", "on_attack_slow", "magic_reduction"]) if (m[k] !== void 0) num(m[k], k, 0, 1);
    if (m.critMultiplier !== void 0) num(m.critMultiplier, "critMultiplier", 1, 100);
    for (const k of ["max_stacks", "trigger_every_received_attacks"]) if (m[k] !== void 0 && (!Number.isInteger(m[k]) || m[k] < 1 || m[k] > 64)) throw Error("Invalid finite count " + k);
    if (m.effect === "multi" && (!Number.isInteger(m.ticks) || m.ticks < 1 || m.ticks > 128)) throw Error("Invalid bounded jobs");
    const built = buildProjectile(config) || buildEffect(config) || buildChannel(config) || buildPassive(config);
    if (!built) throw Error("Missing actual handler");
    const { features, ...impl } = built;
    return {
      behaviorId: "legacy-0-9/remaining/" + definition.id,
      revision: "1.0.0",
      namespace: "heros/legacy-0-9/" + definition.id,
      ...identity(),
      stateSchema: EMPTY_STATE_SCHEMA,
      ...impl,
      planCast(ctx, e) {
        const plan = { manaCost: m.mana, cooldownSeconds: m.cooldown_s, chargeCost: m.charges ? 1 : 0, windupSeconds: m.startup_frames / 60, recoverySeconds: m.recovery_frames / 60, action: "cast" };
        if (!admitted(config, e, features)) return { ...plan, accepted: false, reason: "gated-native-legacy-capabilities" };
        event(config, e, features, ["actionReady", "manaAvailable", "cooldownRemaining", "chargesAvailable", "toggleActive"]);
        for (const k of ["actionReady", "toggleActive"]) flag(e[k], k);
        for (const k of ["manaAvailable", "cooldownRemaining", "chargesAvailable"]) num(e[k], k);
        if (m.passive) return { ...plan, accepted: false, reason: "passive" };
        if (m.toggle && e.toggleActive) return { ...plan, accepted: true, manaCost: 0, cooldownSeconds: 0, chargeCost: 0, windupSeconds: 0, recoverySeconds: 0, action: "toggle-off" };
        const t = ctx.actor(e.target), validDrain = m.effect !== "drain" || near(ctx, e, m.range_wu) && t.alive && !t.invulnerable && !t.debuffImmune;
        return { ...plan, accepted: e.actionReady && e.manaAvailable >= m.mana && e.cooldownRemaining === 0 && (!m.charges || e.chargesAvailable > 0) && validDrain };
      }
    };
  } };
}
export {
  EVENT_VERSION,
  remainingLegacyFactory
};
