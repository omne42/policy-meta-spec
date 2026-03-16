# TypeScript Reference

Checked-in TypeScript bindings live at `bindings/policy-meta.d.ts`.

This file is synchronized from the Rust types crate in `rust/policy-meta/`; treat it as a generated artifact, not an independent hand-edited contract.

## Exported Types

- `SpecVersion`
- `RiskProfile`
- `WriteScope`
- `ExecutionIsolation`
- `Decision`
- `PolicyMetaV1`
- `PolicyProfileV1`

## Sync Commands

```bash
cd rust/policy-meta
cargo run --locked --bin export-artifacts
cargo run --locked --bin export-artifacts -- --check
```

## Notes

- field names remain canonical `snake_case`
- aliases are parse-time serde behavior and are not reflected as alternate TypeScript field names
- the checked-in binding is intended for consumers that need a stable TS-facing contract without re-deriving it locally
