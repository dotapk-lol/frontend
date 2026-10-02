# ABI 2.4: cross-pack status queries and spell routing

Additive API for the first21 independent audit findings. Capability names:
`cross-pack-status-query`, `targeted-spell-routing`.

`e.hasEffectiveStatus(f,'silence')` / `api.effectiveStatus(e,f,'silence')` reads
all typed namespaces and existing raw control timers. It excludes author action
locks (for example Lich's own channel preventing another cast). This avoids the
self-cancellation that would result from calling e.isSilenced inside that channel.
Typed hostile effects obey invulnerability/debuff immunity/piercing and removal.
This is an instantaneous query; short hard controls/input cancellation remain
persistent via ABI2.3 action tokens. It does not manufacture visibility or stealth.

`api.canTargetSpell(e,{owner,target,abilityId,range?,rejectDebuffImmune=false,
pierces=false,allowDeadSource=false})` returns `{ok,reason}` with no writes or
resource payment. The range check uses the arena's existing +22 collision margin.
Use during admission before paying mana. Rejecting all damage under debuff immunity
is not the default: damage and negative-status policies remain separate.

`api.routeTargetedSpell(e,{owner,target,abilityId,reflectable=true,reflected=false,
noReflect=false,...admissionOptions})` routes ONCE at activation/delivery, before
applying any damage or status component. Return fields:
`accepted,reason,abilityId,originalOwner,owner,target,reflected,noReflect,noLifesteal`.
The fighter-only route validates the destination, consumes an actual live spell
counter once, swaps owner/target, preserves originalOwner, and disables recursive
reflection/lifesteal. Basic-physical evasion counters are not spell counters.
The reflected destination is checked again; a counter is consumed even if the
original caster is now invulnerable. Use allowDeadSource for a projectile policy
that explicitly survives source death. Do not pass a range again for a homing
projectile that has already validly launched unless its spell defines a leash.

Never route each damage/debuff component separately. Never apply this to an AoE,
self buff, or an already-routed effect. Store any necessary plain flags/profile
under the author's validated schema; do not store live fighter objects/receipts.
Reflected formulas must retain the original committed spell profile (ability,
levels, coefficients, caster-stat snapshot where specified), even though damage
credit now belongs to the reflector. This service deliberately does not recompute
an ability from the reflector's hero, schedule its effects, or debit resources.

The standalone public routing tests cover both sides, read-only admission,
no-cost rejection, counter consumption, immunity, invulnerable reflection targets,
original identity and non-recursion. These API tests do NOT close the reported
Lich/Ogre/Night Stalker findings until their adapters use the shared APIs and the
independent boundary probes pass. All21 new heroes remain publicly locked.
