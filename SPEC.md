# Policy Meta Spec v1

## Goal

Unify policy naming and semantics across repositories while keeping implementation details decoupled.

## Canonical Fields

- `risk_profile`: `safe | standard | proactive | danger`
- `write_scope`: `read_only | workspace_write | full_access`
- `execution_isolation`: `none | best_effort | strict`
- `decision`: `allow | prompt | prompt_strict | deny`

## Naming Rationale

- `workspace_write` keeps the developer mental model explicit.
- `full_access` is clear and audit-friendly for high-risk mode.
- `execution_isolation` describes guarantee strength, not a specific sandbox implementation.

## Input Aliases (parse-time only)

- `risk_profile`:
  - `yolo` -> `danger`
- `write_scope`:
  - `workspace` -> `workspace_write`
  - `global` -> `full_access`
  - `unrestricted` -> `full_access`

Aliases are accepted only at parse boundary for DX. Persisted values must be canonical.

## Stability Rules

- Existing canonical values are immutable in meaning.
- Backward-incompatible rename/removal requires major version bump.
- Additive evolution is preferred (new fields/new enum values).

## Out of Scope

- Runtime policy decision engine.
- Transport APIs / network service.
- Platform-specific sandbox implementation details.
