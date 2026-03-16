# Core Model

## Canonical Fields

| Field | Allowed Values | Purpose |
| --- | --- | --- |
| `version` | `1` | Optional artifact metadata for versioned persisted/profile objects. |
| `risk_profile` | `safe`, `standard`, `proactive`, `danger` | High-level risk posture label. |
| `write_scope` | `read_only`, `workspace_write`, `full_access` | Filesystem write reach intent. |
| `execution_isolation` | `none`, `best_effort`, `strict` | Strength of execution boundary guarantees. |
| `decision` | `allow`, `prompt`, `prompt_strict`, `deny` | User/agent approval behavior. |

## Semantics

### `risk_profile`

Represents operational risk posture:

- `safe`: conservative restrictions.
- `standard`: balanced default.
- `proactive`: more autonomy with guardrails.
- `danger`: highest-risk posture.

### `write_scope`

Represents intended write scope:

- `read_only`
- `workspace_write`
- `full_access`

`workspace_write` and `full_access` are intentionally explicit for auditability.

### `execution_isolation`

Represents guarantee strength, not backend name:

- `none`
- `best_effort`
- `strict`

### `decision`

Represents approval behavior:

- `allow`
- `prompt`
- `prompt_strict`
- `deny`

## Contract Layers

- `policy-meta.v1.json` is the reusable metadata fragment.
- `policy-profile.v1.json` is the versioned preset/profile contract.
- Embedding APIs may require a subset of fields on top of the fragment.

## Normative Rules

- canonical meanings are immutable,
- aliases are parse-time compatibility only,
- persisted values must remain canonical,
- unknown values must fail closed.
