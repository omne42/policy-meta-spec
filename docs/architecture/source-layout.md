# Source Layout

## Canonical Artifacts

- `SPEC.md`
  - Human-readable canonical semantic contract.
- `schema/`
  - Checked-in JSON Schema artifacts.
- `bindings/`
  - Checked-in TypeScript bindings.
- `profiles/`
  - Versioned example profile artifacts.

## Implementation Source

- `rust/policy-meta/`
  - Minimal Rust types crate and artifact export logic.

## Documentation

- `docs/`
  - Versioned documentation source.
- `site/`
  - Generated documentation output, not a source of truth.

## Validation

- `scripts/check-docs-system.sh`
  - Repository-level docs entry and structure check.
- `scripts/validate_spec.py`
  - Spec-level validation script.

## Layout Constraint

- Canonical contract files stay at the repository root.
- Generated outputs remain separate from the source of truth.
- Runtime behavior must not be smuggled into this repository as “spec” content.
