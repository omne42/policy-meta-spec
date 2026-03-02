---
title: Core Model
description: Canonical field semantics and interpretation rules.
section: Guides
section_order: 2
order: 1
---

This page defines the semantic model of each v1 field.

## Field Summary

| Field | Domain | Purpose |
| --- | --- | --- |
| `risk_profile` | `safe | standard | proactive | danger` | High-level risk posture label used for defaults and governance. |
| `write_scope` | `read_only | workspace_write | full_access` | Filesystem write surface allowed by policy intent. |
| `execution_isolation` | `none | best_effort | strict` | Strength of execution boundary guarantees. |
| `decision` | `allow | prompt | prompt_strict | deny` | User/agent decision interaction policy. |

## `risk_profile`

`risk_profile` encodes operational risk tolerance in a concise, human-readable way.

### Values

- `safe`: conservative behavior, strongest default restrictions.
- `standard`: balanced defaults for typical development.
- `proactive`: enables more autonomous behavior with safeguards.
- `danger`: highest-risk posture for unrestricted or emergency workflows.

### Rules

- `risk_profile` SHOULD be present in persisted policies.
- `risk_profile` MUST be canonicalized before storage.
- Aliases MUST NOT be emitted by serializers.

## `write_scope`

`write_scope` describes intended file write reach.

### Values

- `read_only`: no writes.
- `workspace_write`: writes confined to workspace boundary.
- `full_access`: unrestricted writes.

### Notes

- `workspace_write` was chosen to keep scope semantics explicit and auditable.
- `full_access` is explicit and unambiguous for compliance reviews.

## `execution_isolation`

`execution_isolation` describes guarantee strength, not implementation mechanism.

### Values

- `none`: no execution boundary assumptions.
- `best_effort`: boundary attempts with no hard guarantee.
- `strict`: strongest boundary expectation available in runtime.

### Design Intent

Avoid embedding platform-specific implementation names into policy semantics.

## `decision`

`decision` models interaction and approval strictness.

### Values

- `allow`: automatically allow operation.
- `prompt`: require user confirmation on promptable actions.
- `prompt_strict`: stricter prompt behavior for sensitive actions.
- `deny`: reject operation.

### Guidance

- Use `prompt` as a practical default in interactive environments.
- Use `deny` for explicit disallow controls.

## Interpretation Consistency

Implementers SHOULD treat policy objects as declarative intent.

Runtime evaluators MAY combine these fields with additional contextual checks (environment, actor, operation class), but MUST NOT reinterpret canonical field meanings.
