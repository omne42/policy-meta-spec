# Migration to v1

Migration to v1 is intentionally breaking to establish consistent canonical naming.

## Canonical Renames

- `workspace_best_effort -> best_effort`
- `workspace_strict -> strict`
- `danger_full_access -> full_access`

## Parse-Time Compatibility Aliases

- `yolo -> danger`
- `workspace -> workspace_write`
- `global -> full_access`
- `unrestricted -> full_access`

## Recommended Rollout

1. Accept legacy tokens and aliases at boundary with warnings.
2. Rewrite stored records to canonical v1 values.
3. Enforce strict canonical output and reject unknowns.

## Migration Checklist

- enumerate every storage location with policy values,
- apply deterministic mapping,
- validate rewritten records,
- ensure all services share one normalization table.
