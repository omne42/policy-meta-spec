# Migration to Policy Meta v1

This migration is intentionally breaking.

## Canonical Renames

- `workspace_best_effort` -> `best_effort`
- `workspace_strict` -> `strict`
- `danger_full_access` -> `full_access`

## Accepted Parse Aliases

- `yolo` -> `danger`
- `workspace` -> `workspace_write`
- `global` -> `full_access`
- `unrestricted` -> `full_access`

## Guidance

- Normalize all persisted config output to canonical values.
- Keep alias support at input boundary only.
- Fail closed for unknown values.
