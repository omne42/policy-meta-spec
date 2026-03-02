# Rust Reference

Rust crate path: `rust/policy-meta/`

## Enums

- `RiskProfile`
- `WriteScope`
- `ExecutionIsolation`
- `Decision`

All use `serde(rename_all = "snake_case")` to preserve canonical wire tokens.

## Alias Support in Serde

- `RiskProfile::Danger` accepts `yolo`
- `WriteScope::WorkspaceWrite` accepts `workspace`
- `WriteScope::FullAccess` accepts `global`, `unrestricted`

Serialization remains canonical.

## Example

```rust
use policy_meta::{RiskProfile, WriteScope};

let risk: RiskProfile = serde_json::from_str("\"yolo\"")?;
assert_eq!(risk, RiskProfile::Danger);

let scope = WriteScope::FullAccess;
assert_eq!(serde_json::to_string(&scope)?, "\"full_access\"");
# Ok::<(), Box<dyn std::error::Error>>(())
```

## Integration Guidance

1. parse with alias support,
2. normalize to canonical enums,
3. persist canonical values only,
4. evaluate runtime logic on canonical enums.
