---
title: Rust Reference
description: Rust crate model, serde alias behavior, and integration patterns.
section: API Reference
section_order: 3
order: 2
---

Rust types are provided under `rust/policy-meta` for compile-time reuse.

## Enums

The crate includes:

- `RiskProfile`
- `WriteScope`
- `ExecutionIsolation`
- `Decision`

Each enum uses `#[serde(rename_all = "snake_case")]` to match canonical wire tokens.

## Alias Support

Rust serde alias mappings mirror docs behavior:

- `RiskProfile::Danger` accepts alias `yolo`.
- `WriteScope::WorkspaceWrite` accepts `workspace`.
- `WriteScope::FullAccess` accepts `global` and `unrestricted`.

Serialization remains canonical.

## Example

```rust
use policy_meta::{RiskProfile, WriteScope};

let risk: RiskProfile = serde_json::from_str("\"yolo\"")?;
assert_eq!(risk, RiskProfile::Danger);

let scope = WriteScope::FullAccess;
let serialized = serde_json::to_string(&scope)?;
assert_eq!(serialized, "\"full_access\"");
```

## Integration Pattern

Recommended integration pipeline in Rust services:

1. Deserialize inbound values with alias support.
2. Validate object shape (schema-equivalent checks where needed).
3. Re-serialize canonical values for storage/logging.
4. Evaluate runtime behavior using canonical enums only.

## Utility Methods

Enum helpers such as `as_str()` and `allows_write()` reduce duplicated string logic across services.

## Testing Expectations

Existing crate tests cover:

- alias acceptance,
- canonical serialization,
- alias normalization semantics.

Downstream services SHOULD add integration tests to verify boundary inputs map correctly to canonical stored values.
