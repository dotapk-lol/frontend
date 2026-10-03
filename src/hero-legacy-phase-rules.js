// node_modules/@dotapk/heros/rules/legacy-10-19/remaining.js
import { BATTLE_ABI, codeIdentity, EMPTY_STATE_SCHEMA } from "./heros-rules.js";

// node_modules/@dotapk/heros/rules/legacy-10-19/remaining-common.js
var EVENT_VERSION = "heros-host-events-1";
var FEATURE_NAMES = Object.freeze(["legacy-hit-v1", "legacy-linear-v1", "legacy-dot-v1", "legacy-field-v1", "legacy-motion-v1", "legacy-job-v1", "legacy-channel-v1", "legacy-souls-v1", "legacy-property-v1", "legacy-ward-cleave-v1", "legacy-shell-v1", "legacy-status-v1", "legacy-passive-v1"]);
var num = (v, k, min = 0, max = 1e7) => {
  if (typeof v !== "number" || !Number.isFinite(v) || v < min || v > max) throw Error("Invalid legacy fact/coefficient: " + k);
  return v;
};
var flag = (v, k) => {
  if (typeof v !== "boolean") throw Error("Missing legacy boolean: " + k);
  return v;
};
var actor = (v) => {
  if (v !== 0 && v !== 1) throw Error("Invalid legacy actor");
  return v;
};
var handle = (v) => {
  if (typeof v !== "string" || !v || v.length > 128) throw Error("Missing bounded legacy handle");
  return v;
};
function capabilities(values) {
  if (!Array.isArray(values) || values.length > FEATURE_NAMES.length || new Set(values).size !== values.length || values.some((x) => !FEATURE_NAMES.includes(x))) throw Error("Unknown legacy proposed capabilities");
  return [...values].sort();
}
function admitted(config, event, features) {
  return config.parameters.hostSemantics === EVENT_VERSION && event.legacySemantics === EVENT_VERSION && Array.isArray(event.legacyCapabilities) && features.every((f) => config.parameters.hostCapabilities.includes(f) && event.legacyCapabilities.includes(f));
}
function gate(config, event, features) {
  if (!admitted(config, event, features)) throw Error("GATED: missing native legacy capabilities " + features.join(","));
  capabilities(event.legacyCapabilities);
  if (event.slot !== void 0 && event.slot !== config.parameters.slot) throw Error("Wrong originating rule slot");
  actor(event.owner);
  actor(event.target);
}
function near(ctx, e, r, ground = false) {
  const f = ctx.actor(e.owner), t = ctx.actor(e.target);
  return Math.abs(t.x - f.x) <= r + 22 && (!ground || t.y < 45);
}
function hit(definition, source, target, amount = definition.mvp.damage, extra = {}) {
  const m = definition.mvp;
  return { source: actor(source), target: actor(target), abilityId: definition.id, amount: num(amount, "damage"), type: m.damage_type, blockable: m.blockable, stunSeconds: m.stun_s, hitstunSeconds: m.hitstun_s, ...extra };
}
function hitEffects(m) {
  return { profile: "legacy-hit-v1", ...m.slow_pct ? { slow: { percent: m.slow_pct, seconds: m.slow_duration_s ?? 1 } } : {}, ...m.control ? { controlKind: m.control } : {}, ...m.knockback_wu ? { knockbackDistance: m.knockback_wu } : {}, ...m.pull_to_distance ? { pullDistance: m.pull_to_distance, pullStunSeconds: m.pull_cap_s || 0.25 } : {}, ...m.selfReflection ? { selfReflectionFraction: m.selfReflection } : {}, ...m.vulnerability_physical ? { vulnerabilityPhysical: { fraction: m.vulnerability_physical, seconds: m.vulnerability_s, dispel: "basic" } } : {} };
}
function ring(owner, radius, x = null, y = 60, lifeSeconds = 0.65) {
  return { kind: x === null ? "legacy-ring" : "legacy-effect-ring", actor: owner, ...x === null ? {} : { x }, y, radius, lifeSeconds };
}
function status(definition, owner, target, key, duration, values, negative = false, dispel = "none") {
  return { owner, target, abilityId: definition.id, key, duration, polarity: negative ? "negative" : "positive", dispel, pierces: negative, values: { profile: "legacy-v8", ...values } };
}
function ownView(ctx, e, definition, key) {
  const rows = ctx.status.query(actor(e.actor ?? e.owner), key);
  if (!Array.isArray(rows) || rows.length > 1) throw Error("Invalid unique legacy status view");
  return rows.filter((r) => {
    if (r.owner !== e.owner || r.abilityId !== definition.id) return false;
    handle(r.handle);
    num(r.remainingSeconds, "remainingSeconds", 0, 3600);
    flag(r.effective, "effective");
    if (r.values?.profile !== "legacy-v8") throw Error("Wrong legacy source profile");
    return r.remainingSeconds > 1e-8 && r.effective;
  });
}
function dot(definition, owner, target, duration, interval, data, dispel = "none") {
  return status(definition, owner, target, definition.id, duration, { kind: "legacy-dot", intervalSeconds: interval, pulseHandler: "legacy-dot-pulse", originalCancellation: "target-fighter-stage; retain-dead-source", ...data }, true, dispel);
}
function validateCoefficients(m) {
  function visit(v, key = "mvp") {
    if (typeof v === "number") num(v, key, -1e7, 1e7);
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) visit(x, k);
  }
  visit(m);
  for (const [k, v] of Object.entries(m)) if (typeof v === "number") num(v, k);
  for (const k of ["duration_s", "slow_duration_s", "vulnerability_s", "stack_duration_s", "debuff_duration_s", "travelDuration", "tick_interval_s"]) if (m[k] !== void 0) num(m[k], k, 0, 3600);
  for (const k of ["selfReflection", "vulnerability_physical", "self_slow", "block_fraction_cap", "lost_hp_multiplier"]) if (m[k] !== void 0) num(m[k], k, 0, 1);
  if (!["physical", "magical", "pure", "none"].includes(m.damage_type)) throw Error("Invalid legacy damage enum");
  if (m.stun_s !== void 0) num(m.stun_s, "stun_s", 0, 60);
  if (m.hitstun_s !== void 0) num(m.hitstun_s, "hitstun_s", 0, 60);
  if (m.slow_pct !== void 0) num(m.slow_pct, "slow_pct", 0, 100);
  if (m.control !== void 0 && !["fear", "stun", "root", "hex", "taunt"].includes(m.control)) throw Error("Unknown legacy control kind");
  for (const k of ["damage", "radius_wu", "range_wu", "duration_s", "mana", "cooldown_s", "startup_frames", "recovery_frames"]) if (m[k] !== void 0) num(m[k], k);
}

// node_modules/@dotapk/heros/rules/legacy-10-19/remaining-projectiles.js
var IDS = /* @__PURE__ */ new Set(["mirana_arrow", "sven_hammer", "windranger_shackle", "windranger_powershot", "queen_of_pain_shadow_strike", "queen_of_pain_sonic", "witch_doctor_cask", "tidehunter_gush"]);
function buildProjectile(config) {
  const { definition } = config, id = definition.id, m = definition.mvp;
  if (!IDS.has(id)) return null;
  const features = ["legacy-hit-v1", "legacy-linear-v1", ...m.effect === "projectile_dot" || m.damageOverTime ? ["legacy-dot-v1"] : []];
  if (id === "mirana_arrow") {
    for (const k of ["distance_damage_per_100", "damage_cap", "stun_cap_s", "arrowStunRate"]) num(m[k], k);
  }
  if (id === "windranger_powershot") {
    num(m.charge_damage_per_s, "charge_damage_per_s");
    num(m.charge_max_s, "charge_max_s");
    num(m.damage + m.charge_damage_per_s * m.charge_max_s, "derived powershot");
  }
  if (id === "queen_of_pain_sonic") num(m.damageOverTime, "damageOverTime", Number.MIN_VALUE, 3600);
  if (id === "queen_of_pain_shadow_strike") {
    num(m.dot_damage, "dot_damage");
    num(m.tick_interval_s, "tick_interval_s", Number.MIN_VALUE, 3600);
  }
  const pulse = (ctx, e) => {
    gate(config, e, features);
    handle(e.handle);
    if (e.kind !== "legacy-dot-pulse") throw Error("Wrong DOT stage");
    const source = actor(e.effectiveOwner), target = actor(e.target), remaining = num(e.remainingSeconds, "remainingSeconds", -1, 3600);
    const sonic = id === "queen_of_pain_sonic";
    const amount = sonic ? num(e.capturedAmount, "capturedAmount") : m.dot_damage;
    return ctx.damage(hit(definition, source, target, amount, { dot: true, stunSeconds: 0, hitstunSeconds: 0, legacyInfo: { linaDone: true }, legacyEffects: { profile: "legacy-hit-v1", ...sonic ? { chip: flag(e.chip, "chip") } : { slow: { percent: m.slow_pct, seconds: Math.min(m.slow_duration_s ?? 1, Math.max(0, remaining)) } } } }));
  };
  return { features, requires: ["projectile-request", "damage", ...features.includes("legacy-dot-v1") ? ["status"] : []], activate(ctx, cast) {
    gate(config, cast, features);
    const f = ctx.actor(cast.owner);
    const held = id === "windranger_powershot" ? num(cast.heldSeconds, "heldSeconds", 0, m.charge_max_s) : 0;
    const amount = num(m.damage + (m.charge_damage_per_s || 0) * held, "launch damage");
    return { projectileHandle: ctx.projectile({ owner: cast.owner, abilityId: id, castId: handle(cast.castId), direction: cast.direction, speed: m.projectile_speed_wu_s || 800, range: m.range_wu, height: m.height, contactHandler: "legacy-projectile-contact", data: { profile: "legacy-linear-v1", originX: f.x + f.dir * 35, originY: f.y + (m.height === "ground" ? 35 : 100), radius: Math.max(12, m.radius_wu || 18), capturedAmount: amount, reflectionPolicy: "consume-counter; flip-owner-dir; reset-travel; target-offset35", reflectable: m.reflectable, sourceDeathPolicy: "retain", originalOwner: cast.owner } }) };
  }, onContact(ctx, e) {
    gate(config, e, features);
    if (e.kind !== "legacy-projectile-contact") throw Error("Wrong projectile contact");
    handle(e.handle);
    const source = actor(e.effectiveOwner), target = actor(e.target);
    num(e.capturedAmount, "capturedAmount");
    num(e.travelDistance, "travelDistance");
    const reflected = flag(e.reflected, "reflected"), counter = flag(e.counterReflects, "counterReflects");
    if (e.direction !== 1 && e.direction !== -1) throw Error("Wrong projectile direction");
    if (m.reflectable && !reflected && counter) return { projectileRedirect: { handle: e.handle, effectiveOwner: target, target: source, direction: -e.direction, resetTravel: true, offsetFromTarget: -e.direction * 35, consumeCounterHandle: handle(e.counterHandle), reflected: true }, presentation: { kind: "legacy-projectile-reflect", actor: target } };
    let amount = num(e.capturedAmount, "capturedAmount"), stun = m.stun_s;
    const travel = num(e.travelDistance, "travelDistance");
    if (m.distance_damage_per_100) {
      amount = Math.min(m.damage_cap, amount + travel / 100 * m.distance_damage_per_100);
      stun = Math.min(m.stun_cap_s, stun + (m.arrowStunRate || 6e-4) * travel);
    }
    if (m.wall_bind_distance_wu && flag(e.wallBound, "wallBound")) stun = m.wall_bind_stun_s;
    const t = ctx.actor(target), wave = !!m.damageOverTime, guardBefore = !!t.guarding, eligibleBefore = !t.invulnerable;
    const receipt = ctx.damage(hit(definition, source, target, wave ? 0 : amount, { stunSeconds: stun, legacyInfo: { omitReflectedFlag: true }, legacyEffects: hitEffects(m) }));
    if (wave && eligibleBefore) {
      const captured = num(amount / (m.damageOverTime / 0.1) * (guardBefore ? 0.2 : 1), "sonic tick");
      ctx.status.apply(dot(definition, source, target, m.damageOverTime, 0.1, { originalOwner: e.owner, capturedAmount: captured, chip: guardBefore, knockbackDistance: 0, stunSeconds: 0, append: true, admission: "wave-pre-hit-not-invulnerable" }));
    }
    if (m.effect === "projectile_dot" && receipt.landed) ctx.status.apply(dot(definition, source, target, m.duration_s, m.tick_interval_s, { originalOwner: e.owner, capturedAmount: m.dot_damage, append: true, admission: "landed-even-if-lethal" }, m.dispelTier || "none"));
    return { projectileEnd: { handle: e.handle }, receipt };
  }, ...features.includes("legacy-dot-v1") ? { onStage: pulse } : {} };
}

// node_modules/@dotapk/heros/rules/legacy-10-19/remaining-effects.js
function buildEffect(config) {
  const { definition } = config, id = definition.id, m = definition.mvp;
  const build = (features, requires, hooks) => ({ features, requires, ...hooks });
  const requireOverload = (e) => {
    if (e.overloadCommitted !== true) throw Error("GATED: owned Overload commit callback missing");
  };
  if (id === "earthshaker_fissure") return build(["legacy-hit-v1", "legacy-field-v1", "legacy-passive-v1"], ["damage", "legacy-effect"], { activate(ctx, e) {
    gate(config, e, ["legacy-hit-v1", "legacy-field-v1", "legacy-passive-v1"]);
    if (e.aftershockCompleted !== true) throw Error("GATED: owned Aftershock incomplete");
    const x = num(e.aimX, "aimX", 45, 1155);
    const h = ctx.legacyEffect.spawn({ owner: e.owner, abilityId: id, castId: handle(e.castId), kind: "wall", x, radius: m.radius_wu, duration: m.duration_s, data: { profile: "legacy-fissure-wall", height: m.wall_height_wu || 55, width: m.wall_width_wu, movementHalfWidth: 35, sourceDeathPolicy: "retain", initialHitOnly: true } });
    const t = ctx.actor(e.target);
    if (Math.abs(t.x - x) <= m.radius_wu + 22 && t.y < 45) ctx.damage(hit(definition, e.owner, e.target));
    return { effectHandle: h };
  } });
  if (id === "mirana_starstorm") {
    const features = ["legacy-hit-v1", "legacy-job-v1"];
    if (!Number.isInteger(m.ticks) || m.ticks < 1 || m.ticks > 64 || m.hit_damages.length !== m.ticks || m.tick_offsets_s.length !== m.ticks) throw Error("Invalid bounded Starstorm program");
    m.hit_damages.forEach((v) => num(v, "Starstorm hit"));
    m.tick_offsets_s.forEach((v) => num(v, "Starstorm offset", 0, 3600));
    const deliver = (ctx, e) => {
      gate(config, e, features);
      if (e.kind !== "legacy-starstorm-due") throw Error("Wrong Starstorm stage");
      handle(e.handle);
      const f = ctx.actor(e.owner);
      flag(e.blocked, "blocked");
      if (f.alive && !e.blocked && near(ctx, e, num(e.range, "range"))) return ctx.damage(hit(definition, e.owner, e.target, num(e.capturedAmount, "capturedAmount"), { legacyInfo: { linaDone: true } }));
      return { skipped: true };
    };
    return build(features, ["schedule", "damage"], { activate(ctx, e) {
      gate(config, e, features);
      const jobs = [];
      for (let n = 0; n < m.ticks; n++) jobs.push(ctx.schedule({ abilityId: id, owner: e.owner, target: e.target, handler: "legacy-starstorm-hit", delay: num(m.tick_offsets_s[n], "offset"), data: { kind: "legacy-starstorm-due", profile: "legacy-event-stage", capturedAmount: m.hit_damages[n], range: m.tracking_break_wu || m.range_wu || m.radius_wu, owner: e.owner, target: e.target, legacySemantics: e.legacySemantics, legacyCapabilities: e.legacyCapabilities, cancellation: "check-alive-blocked-at-delivery; retain-until-due" } }));
      return { jobs };
    }, scheduledHandlers: { "legacy-starstorm-hit": deliver } });
  }
  if (id === "mirana_leap" || id === "zeus_jump") {
    const features = ["legacy-motion-v1", "legacy-status-v1", ...id === "zeus_jump" ? ["legacy-hit-v1"] : []];
    num(m.range_wu, "range_wu", 0, 8845);
    num(m.travelDuration || 0.55, "travelDuration", Number.MIN_VALUE, 3600);
    num(m.range_wu / (m.travelDuration || 0.55), "leap speed");
    return build(features, ["motion-request", "status", ...id === "zeus_jump" ? ["damage"] : []], { activate(ctx, e) {
      gate(config, e, features);
      if (id === "zeus_jump" && near(ctx, e, m.radius_wu, m.height === "ground")) ctx.damage(hit(definition, e.owner, e.target, m.damage, { legacyEffects: hitEffects(m) }));
      const f = ctx.actor(e.owner);
      const h = ctx.motion({ actor: e.owner, abilityId: id, castId: handle(e.castId), kind: "leap", destinationX: f.x + e.direction * m.range_wu, speed: m.range_wu / (m.travelDuration || 0.55), duration: m.travelDuration || 0.55, profile: "legacy-leap", verticalLaunch: 650, direction: e.direction });
      ctx.status.apply(status(definition, e.owner, e.owner, "leapSpeed", m.duration_s || 2, { kind: "legacy-buff", coefficients: { move_multiplier: m.move_multiplier || 1.1, attack_interval_multiplier: m.attack_interval_multiplier || 1 }, nativeAdmission: "self-even-invulnerable" }));
      return { motionHandle: h };
    } });
  }
  if (id === "shadow_fiend_raze") {
    const features = ["legacy-hit-v1", "legacy-status-v1", "legacy-souls-v1"];
    num(m.stack_damage, "stack_damage");
    num(m.max_stacks, "max_stacks", 0, 1024);
    num(m.stack_duration_s, "stack_duration_s", 0, 3600);
    num(m.damage + 40 + m.stack_damage * 1024, "derived Raze");
    return build(features, ["status", "damage"], { activate(ctx, e) {
      gate(config, e, features);
      const souls = num(e.nativeSouls, "nativeSouls", 0, 20), x = num(e.aimX, "aimX", 45, 1155), t = ctx.actor(e.target);
      if (Math.abs(t.x - x) <= m.radius_wu + 22 && (m.height !== "ground" || t.y < 45)) {
        const rows = ctx.status.query(e.target, "raze");
        if (rows.length > 1) throw Error("Duplicate native Raze key");
        let stacks = 0;
        if (rows.length) {
          handle(rows[0].handle);
          stacks = num(rows[0].values?.stacks, "raze stacks", 0, 1024);
        }
        ctx.status.apply(status(definition, e.owner, e.target, "raze", m.stack_duration_s || 2, { kind: "raze-stack", stacks: Math.min(m.max_stacks, stacks + 1), nativeAdmission: "geometry-before-hit-even-invulnerable-or-dead" }, true));
        ctx.damage(hit(definition, e.owner, e.target, m.damage + souls * 2 + stacks * m.stack_damage));
      }
      return { presentation: { kind: "ground-pillar", aimX: x, radius: m.radius_wu, lifeSeconds: 0.6 } };
    } });
  }
  if (id === "shadow_fiend_feast") {
    const features = ["legacy-status-v1", "legacy-souls-v1", "legacy-property-v1"];
    num(m.souls, "souls", 0, 20);
    const interval = m.officialSemantic?.collection_interval_s || 0.5;
    num(interval, "collection interval", Number.MIN_VALUE, 3600);
    return build(features, ["status"], { activate(ctx, e) {
      gate(config, e, features);
      ctx.status.apply(status(definition, e.owner, e.owner, id, m.duration_s || 2, { kind: "feast", coefficients: { attack_interval_multiplier: m.attack_interval_multiplier, move_multiplier: m.move_multiplier }, collectedSouls: 0, intervalSeconds: interval, pulseHandler: "legacy-feast-collect", expiryHandler: "legacy-feast-expire" }));
      return { presentation: { kind: "legacy-buff-ring", actor: e.owner, yOffset: 70, radius: 100, lifeSeconds: 0.7 } };
    }, onStage(ctx, e) {
      gate(config, e, features);
      if (e.kind === "legacy-movement-properties") {
        const rows = ownView(ctx, e, definition, id);
        return { nativeProperties: rows.length ? rows[0].values.coefficients : {} };
      }
      const souls = num(e.nativeSouls, "nativeSouls", 0, 20), collected = num(e.collectedSouls, "collectedSouls", 0, 20), h = handle(e.handle);
      if (e.kind === "legacy-feast-expire") return { legacySoulUpdate: { actor: e.owner, sourceStatusHandle: h, operation: "feast-expiry", value: Math.max(0, souls - collected) } };
      if (e.kind !== "legacy-feast-collect") throw Error("Wrong Feast stage");
      const remaining = num(e.remainingSeconds, "remainingSeconds", -1, 3600);
      if (remaining <= 1e-7 || collected || !ctx.actor(e.target).alive || !near(ctx, e, m.radius_wu)) return { skipped: true };
      const amount = Math.min(m.souls, 20 - souls);
      return { legacySoulUpdate: { actor: e.owner, sourceStatusHandle: h, operation: "feast-collect", value: souls + amount, collectedSouls: amount }, log: { kind: "souls", actor: e.owner, amount, target: e.target } };
    }, projectAttack(ctx, e) {
      gate(config, e, features);
      if (e.stage !== "legacy-base-attack-souls") throw Error("Wrong soul attack stage");
      return { addAfterAttackBonus: num(e.nativeSouls, "nativeSouls", 0, 20) };
    }, projectInterval(ctx, e) {
      gate(config, e, features);
      const rows = ownView(ctx, e, definition, id);
      return { nativeProperties: rows.length ? rows[0].values.coefficients : {} };
    } });
  }
  if (id === "shadow_fiend_requiem") {
    const features = ["legacy-hit-v1", "legacy-souls-v1"];
    num(m.damage * 3, "derived Requiem");
    return build(features, ["damage"], { activate(ctx, e) {
      gate(config, e, features);
      const souls = num(e.nativeSouls, "nativeSouls", 0, 20);
      if (near(ctx, e, m.radius_wu, m.height === "ground")) ctx.damage(hit(definition, e.owner, e.target, m.damage * Math.max(1, Math.min(3, souls)), { legacyEffects: hitEffects(m) }));
      return { presentation: ring(e.owner, m.radius_wu) };
    } });
  }
  if (id === "storm_spirit_remnant") {
    const features = ["legacy-hit-v1", "legacy-field-v1", "legacy-passive-v1"];
    num(m.walkSpeed, "walkSpeed");
    num(m.arming_s, "arming_s");
    num(m.triggerRadius, "triggerRadius");
    return build(features, ["legacy-effect", "damage"], { activate(ctx, e) {
      gate(config, e, features);
      requireOverload(e);
      return { effectHandle: ctx.legacyEffect.spawn({ owner: e.owner, abilityId: id, castId: handle(e.castId), kind: "trap", x: ctx.actor(e.owner).x, radius: m.radius_wu, duration: m.duration_s, data: { profile: "legacy-walking-remnant", targetX: num(e.aimX, "aimX", 45, 1155), walkSpeed: m.walkSpeed, armingSeconds: m.arming_s, triggerRadius: m.triggerRadius, contactHandler: "legacy-remnant-contact", sourceDeathPolicy: "retain", walkUsesWholeDt: true } }) };
    }, onContact(ctx, e) {
      gate(config, e, features);
      if (e.kind !== "legacy-remnant-contact") throw Error("Wrong Remnant contact");
      handle(e.handle);
      const x = num(e.effectX, "effectX", 0, 1200), age = num(e.ageSeconds, "ageSeconds"), t = ctx.actor(e.target);
      if (age < m.arming_s || t.y >= 45 || Math.abs(t.x - x) > (m.triggerRadius ?? m.radius_wu) + 22) return { skipped: true };
      if (Math.abs(t.x - x) <= m.radius_wu + 22) ctx.damage(hit(definition, e.owner, e.target));
      ctx.legacyEffect.end(e.handle, "contact");
      return { presentation: ring(e.owner, m.radius_wu, x, 50, 0.5) };
    } });
  }
  if (id === "storm_spirit_vortex") {
    const features = ["legacy-hit-v1", "legacy-motion-v1", "legacy-passive-v1"];
    return build(features, ["target-route", "damage", "cue"], { activate(ctx, e) {
      gate(config, e, features);
      requireOverload(e);
      if (!near(ctx, e, m.range_wu, m.height === "ground")) return;
      const r = ctx.target.route({ owner: e.owner, target: e.target, abilityId: id, range: m.range_wu, reflectable: true, reflected: e.reflected });
      if (!r.accepted) return;
      ctx.damage(hit(definition, r.owner, r.target, m.damage, { reflected: r.reflected, legacyEffects: hitEffects(m) }));
      if (r.reflected) {
        ctx.cue({ kind: "reflect", abilityId: id, actor: r.owner, target: r.target });
        return { reflected: true };
      }
    } });
  }
  if (id === "storm_spirit_ball") {
    const features = ["legacy-hit-v1", "legacy-motion-v1", "legacy-passive-v1"];
    num(m.duration_s, "duration_s", Number.MIN_VALUE, 3600);
    num(m.range_wu, "range_wu", Number.MIN_VALUE, 8845);
    num(m.range_wu / m.duration_s, "ball speed");
    return build(features, ["motion-request", "protect", "damage"], { activate(ctx, e) {
      gate(config, e, features);
      requireOverload(e);
      const h = ctx.motion({ actor: e.owner, abilityId: id, castId: handle(e.castId), kind: "dash", destinationX: ctx.actor(e.owner).x + e.direction * m.range_wu, speed: m.range_wu / m.duration_s, duration: m.duration_s, profile: "legacy-ball-contact", direction: e.direction, maxDistance: m.range_wu, contactHandler: "legacy-ball-contact", oneHit: true, trackActualMovement: true });
      ctx.protect({ actor: e.owner, abilityId: id, kind: "invulnerability", duration: m.duration_s });
      return { motionHandle: h };
    }, onContact(ctx, e) {
      gate(config, e, features);
      if (e.kind !== "legacy-ball-contact") throw Error("Wrong Ball contact");
      handle(e.handle);
      const distance = num(e.actualDistance, "actualDistance");
      if (!m.damage) return { motionContactIgnored: true };
      ctx.damage(hit(definition, e.owner, e.target, m.damage * Math.min(1, distance / m.range_wu)));
      return { motionMarkHit: { handle: e.handle } };
    } });
  }
  if (id === "queen_of_pain_scream") {
    const features = ["legacy-hit-v1"];
    num(m.selfReflection, "selfReflection", 0, 1);
    return build(features, ["damage"], { activate(ctx, e) {
      gate(config, e, features);
      if (near(ctx, e, m.radius_wu, m.height === "ground")) ctx.damage(hit(definition, e.owner, e.target, m.damage, { legacyEffects: hitEffects(m) }));
      return { presentation: ring(e.owner, m.radius_wu) };
    } });
  }
  if (id === "witch_doctor_restoration") {
    const features = ["legacy-field-v1", "legacy-status-v1", "legacy-hit-v1"];
    num(m.mana_per_second, "mana_per_second");
    num(m.ticks, "ticks", Number.MIN_VALUE);
    num(m.heal_total / m.ticks, "heal per tick");
    num(m.tick_interval_s, "tick_interval_s", Number.MIN_VALUE, 3600);
    return build(features, ["legacy-effect", "status", "mana", "heal"], { activate(ctx, e) {
      gate(config, e, features);
      if (flag(e.toggleActive, "toggleActive")) {
        for (const r of ownView(ctx, e, definition, id)) ctx.status.remove(r.handle);
        return { legacyRestorationToggleOff: { owner: e.owner, abilityId: id, endAllOwnAreas: true, commitAction: true } };
      }
      ctx.status.apply(status(definition, e.owner, e.owner, id, m.duration_s || 2, { kind: "restoration-marker", interruptOnCC: true }));
      return { effectHandle: ctx.legacyEffect.spawn({ owner: e.owner, abilityId: id, castId: handle(e.castId), kind: "area", x: ctx.actor(e.owner).x, radius: m.radius_wu, duration: m.duration_s, data: { profile: "legacy-restoration", intervalSeconds: m.tick_interval_s, initialTick: m.tick_interval_s, stageHandler: "legacy-restoration-advance", markerKey: id, markerPolicy: "same-key-not-generation-bound", manaDrainUsesWholeDt: true, sourceDeathPolicy: "end-area-retain-native-buff" } }) };
    }, onStage(ctx, e) {
      gate(config, e, features);
      if (e.kind !== "legacy-restoration-advance") throw Error("Wrong restoration zone stage");
      handle(e.handle);
      const dt = num(e.wholeDt, "wholeDt", 0, 1), pulse = flag(e.pulseDue, "pulseDue"), present = flag(e.markerPresent, "markerPresent");
      if (!ctx.actor(e.owner).alive) {
        ctx.legacyEffect.end(e.handle, "owner-dead");
        return { stopped: true };
      }
      ctx.mana({ actor: e.owner, abilityId: id, delta: -m.mana_per_second * dt });
      if (ctx.actor(e.owner).mp <= 0) {
        for (const r of ownView(ctx, e, definition, id)) ctx.status.remove(r.handle);
        ctx.legacyEffect.end(e.handle, "cancelled");
        return { stopped: true, reason: "mana-zero", noPulse: true };
      }
      if (!present) {
        ctx.legacyEffect.end(e.handle, "cancelled");
        return { stopped: true, reason: "marker-absent", noPulse: true };
      }
      if (pulse) return { receipt: ctx.heal({ source: e.owner, target: e.owner, abilityId: id, amount: m.heal_total / m.ticks, legacySource: "heal" }) };
      return { pulse: false };
    } });
  }
  if (id === "witch_doctor_maledict") {
    const features = ["legacy-hit-v1", "legacy-dot-v1"];
    num(m.tick_interval_s, "tick_interval_s", Number.MIN_VALUE, 3600);
    num(m.lost_hp_multiplier, "lost_hp_multiplier");
    num(m.burstInterval, "burstInterval", Number.MIN_VALUE, 3600);
    return build(features, ["status", "damage"], { activate(ctx, e) {
      gate(config, e, features);
      const t = ctx.actor(e.target);
      if (Math.abs(t.x - num(e.aimX, "aimX", 45, 1155)) <= m.radius_wu + 22 && !t.guarding && !t.invulnerable) ctx.status.apply(dot(definition, e.owner, e.target, m.duration_s, m.tick_interval_s, { baselineHp: t.hp, elapsed: 0, nextBurst: m.burstInterval, burstInterval: m.burstInterval, burstHandler: "legacy-maledict-burst", replaceSameId: true, admission: "no-guard-no-invuln; ignore-immunity" }, "none"));
    }, onStage(ctx, e) {
      gate(config, e, features);
      handle(e.handle);
      if (e.kind === "legacy-dot-pulse") return ctx.damage(hit(definition, actor(e.effectiveOwner ?? e.owner), e.target, m.damage, { dot: true, stunSeconds: 0, hitstunSeconds: 0, legacyInfo: { linaDone: true } }));
      if (e.kind !== "legacy-maledict-burst") throw Error("Wrong Maledict stage");
      const baseline = num(e.baselineHp, "baselineHp");
      return ctx.damage(hit(definition, actor(e.effectiveOwner ?? e.owner), e.target, num(Math.max(0, baseline - ctx.actor(e.target).hp) * m.lost_hp_multiplier, "maledict burst"), { dot: true, legacyInfo: { linaDone: false } }));
    } });
  }
  if (id === "witch_doctor_death_ward") {
    const features = ["legacy-channel-v1", "legacy-field-v1", "legacy-hit-v1"];
    num(m.tick_interval_s, "tick_interval_s", Number.MIN_VALUE, 3600);
    return build(features, ["legacy-effect", "damage"], { activate(ctx, e) {
      gate(config, e, features);
      return { effectHandle: ctx.legacyEffect.spawn({ owner: e.owner, abilityId: id, castId: handle(e.castId), kind: "death-ward", x: num(e.aimX, "aimX", 45, 1155), radius: m.radius_wu, duration: m.duration_s, data: { profile: "legacy-death-ward", invulnerable: true, intervalSeconds: m.tick_interval_s, pulseHandler: "legacy-death-ward-pulse", channel: { slot: e.slot, castId: e.castId, duration: m.duration_s + 1 / 60, cancelProfile: "legacy-held; move-control-silence-release", recoveryActive: 0, recoveryCancelled: 0.2, recoveryExpired: 0.25 } } }) };
    }, onStage(ctx, e) {
      gate(config, e, features);
      if (e.kind !== "legacy-death-ward-pulse") throw Error("Wrong death-ward stage");
      handle(e.handle);
      if (!ctx.actor(e.owner).alive || !flag(e.channelValid, "channelValid")) {
        ctx.legacyEffect.end(e.handle, "cancelled");
        return { stopped: true };
      }
      const x = num(e.effectX, "effectX", 0, 1200), t = ctx.actor(e.target);
      if (Math.abs(t.x - x) <= m.radius_wu + 22) {
        ctx.damage(hit(definition, e.owner, e.target, m.damage, { legacyInfo: { linaDone: true } }));
        return { presentation: { kind: "legacy-ward-beam", actor: e.owner, target: e.target, x, y: 80, targetX: t.x, targetY: t.y + 80, lifeSeconds: 0.16 } };
      }
      return { skipped: true };
    } });
  }
  if (id === "tidehunter_ravage") {
    const features = ["legacy-field-v1", "legacy-hit-v1"];
    num(m.wave_speed_wu_s, "wave_speed_wu_s", Number.MIN_VALUE);
    num(m.radius_wu / m.wave_speed_wu_s + 0.1, "derived expansion life", 0, 3600);
    return build(features, ["legacy-effect", "damage"], { activate(ctx, e) {
      gate(config, e, features);
      return { effectHandle: ctx.legacyEffect.spawn({ owner: e.owner, abilityId: id, castId: handle(e.castId), kind: "area", x: ctx.actor(e.owner).x, radius: m.radius_wu, duration: m.radius_wu / m.wave_speed_wu_s + 0.1, data: { profile: "legacy-expanding-ravage", waveSpeed: m.wave_speed_wu_s, oneHit: true, heightPolicy: "ignore", hitboxPadding: 0, contactHandler: "legacy-ravage-contact", sourceDeathPolicy: "retain" } }), presentation: ring(e.owner, m.radius_wu) };
    }, onContact(ctx, e) {
      gate(config, e, features);
      if (e.kind !== "legacy-ravage-contact") throw Error("Wrong Ravage contact");
      handle(e.handle);
      const distance = Math.abs(ctx.actor(e.target).x - num(e.effectX, "effectX", 0, 1200)), age = num(e.ageSeconds, "ageSeconds");
      if (distance > age * m.wave_speed_wu_s || distance > m.radius_wu) return { skipped: true };
      ctx.damage(hit(definition, e.owner, e.target));
      return { effectMarkHit: { handle: e.handle } };
    } });
  }
  return null;
}

// node_modules/@dotapk/heros/rules/legacy-10-19/remaining-passives.js
function buildPassive(config) {
  const { hero, definition } = config, id = definition.id, m = definition.mvp;
  if (id === "earthshaker_aftershock") {
    const features = ["legacy-passive-v1", "legacy-hit-v1"];
    return { features, requires: ["damage"], onStage(ctx, e) {
      gate(config, e, features);
      if (e.kind !== "legacy-skill-activating") throw Error("Wrong Aftershock stage");
      const active = hero.abilities.find((a) => a.id === e.castAbilityId && !a.mvp.passive);
      if (!active) throw Error("Unknown owned activated ability");
      if (e.activatedHeight !== active.mvp.height) throw Error("Wrong Aftershock activated height");
      const enabled = ctx.actor(e.owner).passivesEnabled;
      if (enabled && near(ctx, e, m.radius_wu, active.mvp.height === "ground")) ctx.damage(hit(definition, e.owner, e.target, m.damage, { blockable: true, stunSeconds: m.stun_s, hitstunSeconds: 0, passive: true, legacyInfo: { omitSkill: true, preLog: { kind: "passive", skillId: id } } }));
      return { aftershockCompleted: true };
    } };
  }
  if (id === "sven_cleave") {
    const wardForwardRangeWu = num(config.parameters.wardForwardRangeWu, "wardForwardRangeWu", 0, 1200);
    if (m.damage !== 90 || m.radius_wu !== 385.00000000000006 || m.passive !== true) throw Error("Unsupported Cleave definition override: mvp.damage/radius_wu are display-only and mvp.passive is fixed; use factory wardForwardRangeWu");
    const features = ["legacy-passive-v1", "legacy-ward-cleave-v1"];
    return { features, requires: [], onAttack(ctx, e) {
      gate(config, e, features);
      if (e.kind !== "legacy-basic-hit-completed") throw Error("Wrong Cleave stage");
      flag(e.landed, "landed");
      const enabled = ctx.actor(e.owner).passivesEnabled;
      if (!enabled) return { legacyWardCleave: [] };
      if (!Array.isArray(e.wardCandidates) || e.wardCandidates.length > 256) throw Error("Invalid bounded ward candidates");
      const selected = [];
      for (const w of e.wardCandidates) {
        handle(w.handle);
        actor(w.owner);
        num(w.distanceToTarget, "ward distance");
        flag(w.forwardOfTarget, "ward side");
        if (w.owner !== e.owner && w.forwardOfTarget && w.distanceToTarget < wardForwardRangeWu) selected.push({ handle: w.handle, reason: "attack", attacker: e.owner, presentation: { kind: "legacy-cleave-slash", x: num(w.x, "ward x", 0, 1200), y: 60, size: 120, direction: ctx.actor(e.owner).dir }, logs: ["cleave-ward", "passive"] });
      }
      return { legacyWardCleave: selected };
    } };
  }
  if (id === "shadow_fiend_presence") {
    const features = ["legacy-property-v1"];
    const armor = Math.abs(num(m.officialSemantic.armor_change, "armor_change", -1e3, 0)), fraction = armor * 0.06 / (1 + armor * 0.06);
    return { features, requires: [], projectDamage(ctx, e) {
      gate(config, e, features);
      if (e.stage !== "legacy-physical-vulnerability") throw Error("Wrong Presence stage");
      if (!["physical", "magical", "pure"].includes(e.damageType)) throw Error("Unknown damage type");
      const enabled = ctx.actor(e.owner).passivesEnabled, within = Math.abs(ctx.actor(e.target).x - ctx.actor(e.owner).x) <= m.radius_wu;
      return { nativePhysicalVulnerability: enabled && e.damageType === "physical" && within ? fraction : 0, combine: "max" };
    } };
  }
  if (id === "storm_spirit_overload") {
    const features = ["legacy-passive-v1", "legacy-status-v1", "legacy-hit-v1"];
    return { features, requires: ["status", "damage"], onCastCommitted(ctx, e) {
      gate(config, e, features);
      if (!hero.abilities.some((a) => a.id === e.castAbilityId && !a.mvp.passive)) throw Error("Unknown Storm committed cast");
      handle(e.castId);
      ctx.status.apply(status(definition, e.owner, e.owner, "overload", 4, { kind: "overload-marker", nativeAdmission: "commit-even-if-broken" }));
      return { overloadCommitted: true };
    }, onAttack(ctx, e) {
      gate(config, e, features);
      if (e.kind !== "legacy-basic-hit-completed-before-afterAttack") throw Error("Wrong Overload attack stage");
      flag(e.landed, "landed");
      if (!e.landed || !ctx.actor(e.owner).passivesEnabled) return { consumed: false };
      const rows = ownView(ctx, e, definition, "overload");
      if (!rows.length) return { consumed: false };
      ctx.status.remove(rows[0].handle);
      ctx.damage(hit(definition, e.owner, e.target, m.damage || 30, { type: "magical", blockable: true, stunSeconds: 0, hitstunSeconds: 0, passive: true, legacyInfo: { omitSkill: true, preLog: { kind: "passive", skillId: id } }, legacyEffects: { profile: "legacy-hit-v1", slow: { percent: 80, seconds: 0.8 } } }));
      return { consumed: true };
    } };
  }
  if (id === "tidehunter_shell") {
    const features = ["legacy-shell-v1", "legacy-status-v1", "legacy-property-v1"];
    const s = m.officialSemantic;
    const passiveBlock = num(s.physical_attack_flat_block, "passive block"), threshold = num(s.cleanse_threshold_damage, "cleanse threshold", Number.MIN_VALUE), resetSeconds = num(s.cleanse_counter_reset_s, "cleanse reset");
    num(m.block_flat, "active block");
    num(m.self_slow, "self_slow", 0, 1);
    if (m.cleanse.slice().sort().join(",") !== "silence,slow") throw Error("Unsupported native Shell field cleanse");
    return { features, requires: ["status"], activate(ctx, e) {
      gate(config, e, features);
      ctx.status.apply(status(definition, e.owner, e.owner, id, m.duration_s || 2, { kind: "shell", coefficients: { block_flat: m.block_flat, self_slow: m.self_slow, physical_only: true, block_fraction_cap: m.block_fraction_cap }, genericFlatBlockExcluded: true }));
      return { legacyShellFieldCleanse: { actor: e.owner, slow: 0, silence: 0, preserveSlowPct: true }, presentation: { kind: "legacy-buff-ring", actor: e.owner, yOffset: 70, radius: 100, lifeSeconds: 0.7 } };
    }, projectDamage(ctx, e) {
      gate(config, e, features);
      if (e.stage !== "legacy-pre-armor-shell" || e.target !== e.owner) throw Error("Wrong native shell stage/target");
      const amount = num(e.amount, "amount");
      flag(e.basic, "basic");
      if (!["physical", "magical", "pure"].includes(e.damageType)) throw Error("Unknown damage type");
      const active = ownView(ctx, e, definition, id).length > 0, enabled = ctx.actor(e.owner).passivesEnabled;
      return { amount: enabled && e.basic && e.damageType === "physical" ? Math.max(0, amount - (active ? m.block_flat : passiveBlock)) : amount, genericFlatBlockExcluded: true };
    }, onDamage(ctx, e) {
      gate(config, e, features);
      if (e.kind !== "legacy-cleanse-before-hit-effects" || e.target !== e.owner) throw Error("Wrong cleanse debit stage");
      const total = num(num(e.cleanseDamageBefore, "cleanseDamageBefore") + num(e.resolvedAmount, "resolvedAmount"), "accumulated damage");
      const cleanse = ctx.actor(e.owner).passivesEnabled && total >= threshold;
      if (cleanse) ctx.status.cleanse(e.owner, "strong", id);
      return { legacyCleanseCounter: { actor: e.owner, value: cleanse ? 0 : total }, ...cleanse ? { presentation: { kind: "legacy-strong-cleanse", actor: e.owner } } : {} };
    }, onStage(ctx, e) {
      gate(config, e, features);
      if (e.kind === "legacy-damage-counter-expiry") {
        const elapsed = num(e.secondsSinceLastDamage, "secondsSinceLastDamage");
        return elapsed > resetSeconds ? { legacyCleanseCounter: { actor: e.owner, value: 0 } } : { unchanged: true };
      }
      if (e.kind !== "legacy-movement-properties") throw Error("Wrong shell stage");
      const rows = ownView(ctx, e, definition, id);
      return { nativeProperties: rows.length ? { self_slow: m.self_slow } : {} };
    } };
  }
  return null;
}

// node_modules/@dotapk/heros/rules/legacy-10-19/remaining.js
var REMAINING_SLOTS = Object.freeze([[10, 0], [10, 2], [11, 0], [11, 1], [11, 2], [12, 0], [12, 1], [13, 2], [14, 0], [14, 1], [15, 0], [15, 1], [15, 2], [15, 3], [16, 0], [16, 1], [16, 2], [16, 3], [17, 0], [17, 2], [17, 3], [18, 0], [18, 1], [18, 2], [18, 3], [19, 0], [19, 1], [19, 3]].map(Object.freeze));
var SOURCES = ["rules/legacy-10-19/remaining.js", "rules/legacy-10-19/remaining-common.js", "rules/legacy-10-19/remaining-projectiles.js", "rules/legacy-10-19/remaining-effects.js", "rules/legacy-10-19/remaining-passives.js"];
var CLEAVE_PARAMETER_SUPPORT = Object.freeze({ wardForwardRangeWu: Object.freeze({ role: "arena-ward-selection", default: 330, min: 0, max: 1200, comparison: "distanceToTarget < wardForwardRangeWu" }), "mvp.damage": Object.freeze({ role: "display-only", value: 90, override: "rejected" }), "mvp.radius_wu": Object.freeze({ role: "display-only", value: 385.00000000000006, override: "rejected" }), "mvp.passive": Object.freeze({ role: "fixed-admission", value: true, override: "rejected" }) });
var isCleave = (heroId, slot) => heroId === 12 && slot === 1;
function checkedOptions(options, allowWardRange) {
  if (!options || typeof options !== "object" || Array.isArray(options) || ![Object.prototype, null].includes(Object.getPrototypeOf(options))) throw Error("Invalid remaining factory options");
  const allowed = ["hostSemantics", "hostCapabilities", ...allowWardRange ? ["wardForwardRangeWu"] : []];
  if (Reflect.ownKeys(options).some((k) => !allowed.includes(k))) throw Error("Unsupported remaining factory option; wardForwardRangeWu is Cleave-only; mvp.damage/radius_wu overrides are unsupported");
  if (Object.hasOwn(options, "wardForwardRangeWu")) num(options.wardForwardRangeWu, "wardForwardRangeWu", 0, 1200);
  return options;
}
function remainingLegacyFactory(heroId, slot, options = {}) {
  if (!REMAINING_SLOTS.some(([h, s]) => h === heroId && s === slot)) throw Error("Unsupported remaining legacy identity");
  checkedOptions(options, isCleave(heroId, slot));
  const { hostSemantics = null, hostCapabilities = [] } = options;
  return { abiVersion: BATTLE_ABI, parameters: { heroId, slot, hostSemantics, hostCapabilities: capabilities(hostCapabilities), ...isCleave(heroId, slot) ? { wardForwardRangeWu: options.wardForwardRangeWu ?? 330 } : {} }, create(config) {
    const { hero, definition, parameters } = config, { heroId: heroId2, slot: slot2 } = parameters, m = definition.mvp;
    if (Object.keys(parameters).sort().join(",") !== "heroId,hostCapabilities,hostSemantics,slot" + (isCleave(heroId2, slot2) ? ",wardForwardRangeWu" : "") || hero.registryNumericId !== heroId2 || hero.abilities[slot2].id !== definition.id) throw Error("Wrong remaining legacy factory identity/config");
    if (parameters.hostSemantics !== null && parameters.hostSemantics !== EVENT_VERSION) throw Error("Unknown host event version");
    capabilities(parameters.hostCapabilities);
    validateCoefficients(m);
    const built = buildProjectile(config) || buildEffect(config) || buildPassive(config);
    if (!built) throw Error("No actual remaining handler");
    const { features, ...implementation } = built;
    return {
      behaviorId: "legacy-10-19/remaining/" + definition.id,
      revision: isCleave(heroId2, slot2) ? "1.1.0" : "1.0.0",
      namespace: "heros/legacy-10-19/" + definition.id,
      ...codeIdentity(SOURCES),
      stateSchema: EMPTY_STATE_SCHEMA,
      ...implementation,
      planCast(ctx, facts) {
        const plan = { manaCost: m.mana, cooldownSeconds: m.cooldown_s, chargeCost: m.charges ? 1 : 0, windupSeconds: m.startup_frames / 60, recoverySeconds: m.recovery_frames / 60, action: "cast" };
        if (!admitted(config, facts, features)) return { ...plan, accepted: false, reason: "gated-native-legacy-capabilities" };
        gate(config, facts, features);
        if (m.passive) return { ...plan, accepted: false, reason: "passive" };
        if (definition.id === "witch_doctor_restoration" && flag(facts.toggleActive, "toggleActive")) return { ...plan, accepted: true, manaCost: 0, cooldownSeconds: 0, chargeCost: 0, windupSeconds: 0, recoverySeconds: 0, action: "toggle-off" };
        flag(facts.actionReady, "actionReady");
        num(facts.manaAvailable, "manaAvailable");
        num(facts.cooldownRemaining, "cooldownRemaining");
        num(facts.chargesAvailable, "chargesAvailable");
        const motion = ["leap", "leap_hit", "dash_hit"].includes(m.effect), f = ctx.actor(facts.owner);
        return { ...plan, accepted: facts.actionReady && facts.manaAvailable >= m.mana && facts.cooldownRemaining === 0 && (!m.charges || facts.chargesAvailable > 0) && (!motion || !f.rooted && f.y <= 5) };
      }
    };
  } };
}
function registerRemainingLegacy10To19(registry, parameters = {}) {
  checkedOptions(parameters, true);
  const { wardForwardRangeWu, ...shared } = parameters;
  const entries = REMAINING_SLOTS.map(([h, s]) => [h, s, remainingLegacyFactory(h, s, { ...shared, ...isCleave(h, s) && Object.hasOwn(parameters, "wardForwardRangeWu") ? { wardForwardRangeWu } : {} })]);
  for (const [h, s, factory] of entries) registry.registerFactory(h, s, factory);
  return registry;
}
export {
  CLEAVE_PARAMETER_SUPPORT,
  EVENT_VERSION,
  FEATURE_NAMES,
  REMAINING_SLOTS,
  registerRemainingLegacy10To19,
  remainingLegacyFactory
};
