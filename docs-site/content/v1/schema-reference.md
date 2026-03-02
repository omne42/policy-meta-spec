---
title: Schema Reference
description: JSON Schema contract details and validation behavior.
section: API Reference
section_order: 3
order: 1
---

The canonical JSON Schema is located at `schema/policy-meta.v1.json`.

## Schema Identity

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://omne42.dev/schema/policy-meta.v1.json",
  "title": "PolicyMetaV1"
}
```

## Top-Level Behavior

| Key | Value | Meaning |
| --- | --- | --- |
| `type` | `object` | Policy payload is an object. |
| `additionalProperties` | `false` | Unknown keys are invalid. |

## Property Enums

### `risk_profile`

```json
["safe", "standard", "proactive", "danger"]
```

### `write_scope`

```json
["read_only", "workspace_write", "full_access"]
```

### `execution_isolation`

```json
["none", "best_effort", "strict"]
```

### `decision`

```json
["allow", "prompt", "prompt_strict", "deny"]
```

## Required Fields

Current v1 schema does not enforce a `required` array at top level.

Practical recommendation for production systems:

- require the fields your runtime truly depends on,
- document local requiredness in product policy docs,
- keep wire compatibility with canonical enum meanings.

## Validation Examples

### Valid

```json
{
  "risk_profile": "standard",
  "write_scope": "workspace_write",
  "execution_isolation": "best_effort",
  "decision": "prompt"
}
```

### Invalid: unknown property

```json
{
  "risk_profile": "safe",
  "sandbox_mode": "strict"
}
```

Reason: `additionalProperties: false`.

### Invalid: non-canonical enum

```json
{
  "write_scope": "workspace"
}
```

Reason: aliases are parse-layer behavior, not schema enum values.

## Tooling Advice

- Run schema validation in CI.
- Keep schema pinned by path and version.
- Use schema as codegen input only after canonicalization decisions are explicit.
