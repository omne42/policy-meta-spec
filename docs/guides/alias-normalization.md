# Alias and Normalization

v1 allows a minimal alias set for parse-time ergonomics.

## Alias Table

| Field | Alias | Canonical |
| --- | --- | --- |
| `risk_profile` | `yolo` | `danger` |
| `write_scope` | `workspace` | `workspace_write` |
| `write_scope` | `global` | `full_access` |
| `write_scope` | `unrestricted` | `full_access` |

## Required Behavior

- parsers may accept documented aliases,
- parsers must normalize aliases immediately,
- serializers must emit canonical values only,
- persisted objects must not contain alias tokens,
- unknown values must fail closed.

## Recommended Pipeline

```text
input -> parse -> alias map -> enum validation -> canonical object -> persistence
```

## Why Boundary-Only Aliases

Alias tokens inside storage create semantic drift, inconsistent querying, and migration complexity.
