# Schema Reference

Canonical schema file: `schema/policy-meta.v1.json`

## Schema Identity

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://omne42.dev/schema/policy-meta.v1.json",
  "title": "PolicyMetaV1"
}
```

## Top-Level Rules

- `type: object`
- `additionalProperties: false`

Unknown keys are invalid.

## Enum Domains

- `risk_profile`: `safe | standard | proactive | danger`
- `write_scope`: `read_only | workspace_write | full_access`
- `execution_isolation`: `none | best_effort | strict`
- `decision`: `allow | prompt | prompt_strict | deny`

## Important Note

Aliases are parser behavior, not schema enum values.

Example: `workspace` is accepted at parse boundary by some implementations but is invalid under canonical schema enums.
