---
title: Migration to v1
description: Breaking rename guidance, compatibility strategy, and rollout checklist.
section: Guides
section_order: 2
order: 4
---

Migration to v1 is intentionally breaking for naming consistency.

## Canonical Renames

| Previous | v1 Canonical |
| --- | --- |
| `workspace_best_effort` | `best_effort` |
| `workspace_strict` | `strict` |
| `danger_full_access` | `full_access` |

## Rollout Strategy

### Phase 1: Parse Compatibility

- Accept old names and documented aliases at input boundary.
- Emit deprecation warnings in logs/telemetry.

### Phase 2: Canonical Persistence

- Rewrite stored policy records into canonical v1 values.
- Block new writes using legacy tokens.

### Phase 3: Strict Enforcement

- Disable legacy parse branches.
- Keep only documented alias behavior where required.

## Data Migration Checklist

- Enumerate all persistence locations containing policy values.
- Backfill canonical values with deterministic mapping.
- Validate with schema and custom invariants.
- Verify analytics dashboards and alerts after rewrite.

## API Compatibility Notes

If public APIs previously accepted legacy tokens:

- publish explicit deprecation timeline,
- provide migration examples,
- include precise error messages with canonical replacements.

## Failure Modes to Prevent

### Silent Coercion Without Audit

Always record when non-canonical input was normalized.

### Mixed Canonical and Legacy Storage

Partial migration causes policy diff and governance confusion.

### Runtime-Specific Interpretation Drift

Ensure all services share one mapping table from legacy to canonical.

## Example Mapping

```json
{
  "workspace_best_effort": "best_effort",
  "workspace_strict": "strict",
  "danger_full_access": "full_access"
}
```
