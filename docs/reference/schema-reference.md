# Schema Reference

Canonical fragment schema file: `schema/policy-meta.v1.json`
Profile schema file: `schema/policy-profile.v1.json`
Related TypeScript binding file: `bindings/policy-meta.d.ts`

Both checked-in schema files are synchronized from the Rust types crate in `rust/policy-meta/`.
Use `cargo run --locked --bin export-artifacts` to refresh generated artifacts and
`cargo run --locked --bin export-artifacts -- --check` to verify they are in sync.

## Schema Identity

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://omne42.dev/schema/policy-meta.v1.json",
  "title": "PolicyMetaV1"
}
```

## Fragment Schema Semantics

- `type: object`
- `additionalProperties: false`
- canonical policy fields are reusable and therefore optional by default
- `version` is allowed as optional artifact metadata with `const: 1`

Unknown keys are invalid.

## Profile Schema Semantics

- builds on `policy-meta.v1.json`
- inherits the fragment property domain and only adds profile-level required fields
- requires `version`
- requires `risk_profile`
- requires `write_scope`
- requires `execution_isolation`

Treat the checked-in JSON files as synchronized artifacts, not independent hand-edited contracts.

## Enum Domains

- `version`: `1`
- `risk_profile`: `safe | standard | proactive | danger`
- `write_scope`: `read_only | workspace_write | full_access`
- `execution_isolation`: `none | best_effort | strict`
- `decision`: `allow | prompt | prompt_strict | deny`

## Important Note

Aliases are parser behavior, not schema enum values.

Example: `workspace` is accepted at parse boundary by some implementations but is invalid under canonical schema enums.
