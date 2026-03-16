# Rust Reference

Rust crate path: `rust/policy-meta/`

The Rust crate is the authoritative source for shared policy types.
Checked-in JSON Schema and TypeScript artifacts are generated from these Rust types and kept in sync via `export-artifacts`.

## Types

- `SpecVersion`
- `RiskProfile`
- `WriteScope`
- `ExecutionIsolation`
- `Decision`
- `PolicyMetaV1`
- `PolicyProfileV1`

Enums use `serde(rename_all = "snake_case")` to preserve canonical wire tokens.
`SpecVersion` serializes as integer `1`.

## Alias Support in Serde

- `RiskProfile::Danger` accepts `yolo`
- `WriteScope::WorkspaceWrite` accepts `workspace`
- `WriteScope::FullAccess` accepts `global`, `unrestricted`

Serialization remains canonical.

## Example

```rust
use policy_meta::{ExecutionIsolation, PolicyProfileV1, RiskProfile, WriteScope};

let profile = PolicyProfileV1::new(
    RiskProfile::Standard,
    WriteScope::WorkspaceWrite,
    ExecutionIsolation::BestEffort,
);
assert_eq!(serde_json::to_string(&profile)?, r#"{"version":1,"risk_profile":"standard","write_scope":"workspace_write","execution_isolation":"best_effort"}"#);
# Ok::<(), Box<dyn std::error::Error>>(())
```

`PolicyMetaV1` provides fluent fragment builders such as `with_execution_isolation(...)`,
and `PolicyProfileV1` can be projected back into the reusable fragment with
`PolicyMetaV1::from(&profile)`.

## Integration Guidance

1. parse with alias support,
2. normalize to canonical enums or `PolicyMetaV1` / `PolicyProfileV1`,
3. persist canonical values only,
4. evaluate runtime logic on canonical values.

## Schema Sync

```bash
cd rust/policy-meta
cargo run --locked --bin export-artifacts
cargo run --locked --bin export-artifacts -- --check
```
