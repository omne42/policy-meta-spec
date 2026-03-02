# Migration to Policy Meta v1

This migration is intentionally breaking for semantic consistency.

## Canonical Renames

- `workspace_best_effort` -> `best_effort`
- `workspace_strict` -> `strict`
- `danger_full_access` -> `full_access`

## Accepted Parse Aliases

- `yolo` -> `danger`
- `workspace` -> `workspace_write`
- `global` -> `full_access`
- `unrestricted` -> `full_access`

## Migration Strategy

### Phase 1: Parse Compatibility

- Accept legacy values and aliases at input boundaries.
- Emit deprecation warnings for non-canonical inputs.

### Phase 2: Canonical Persistence

- Normalize all stored values to canonical v1 tokens.
- Block creation of new non-canonical values.

### Phase 3: Strict Mode

- Remove legacy token acceptance where no longer required.
- Keep only documented parse aliases if needed for UX.

## Guidance

- Normalize all persisted config output to canonical values.
- Keep alias support at input boundary only.
- Fail closed for unknown values.
- Add regression tests for alias parsing and canonical serialization.
