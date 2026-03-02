# Policy Meta Spec v1

## Goal

Unify policy naming and semantics across repositories while keeping implementation details decoupled.

This specification is the canonical semantic contract for policy metadata used by:

- `agent-exec-gateway`
- `safe-fs-tools`
- `omne-agent`

## Canonical Fields

- `risk_profile`: `safe | standard | proactive | danger`
- `write_scope`: `read_only | workspace_write | full_access`
- `execution_isolation`: `none | best_effort | strict`
- `decision`: `allow | prompt | prompt_strict | deny`

Canonical values are case-sensitive snake_case tokens.

## Naming Rationale

- `workspace_write` keeps workspace-scoped write intent explicit.
- `full_access` is clear and auditable for high-risk operations.
- `execution_isolation` describes guarantee strength, not implementation mechanism.

## Parse-Time Aliases

Aliases are accepted only at parse boundary for ergonomics.

### `risk_profile`

- `yolo` -> `danger`

### `write_scope`

- `workspace` -> `workspace_write`
- `global` -> `full_access`
- `unrestricted` -> `full_access`

### Alias Rules

- Parsers MAY accept documented aliases.
- Parsers MUST normalize aliases immediately.
- Persisted output MUST contain only canonical values.
- Unknown values MUST fail closed.

## Stability Rules

- Existing canonical values are immutable in meaning.
- Backward-incompatible rename/removal requires major version bump.
- Additive evolution is preferred (new fields/new enum values).

## Out of Scope

- Runtime policy decision engine behavior.
- Transport API protocol definitions.
- Platform-specific sandbox implementation details.

## Normative Artifacts

- JSON Schema: `schema/policy-meta.v1.json`
- Profiles: `profiles/*.yaml`
- Migration guide: `guides/migration-v1.md`
- Rust types: `rust/policy-meta/`
- Versioned docs site: `docs-site/`
