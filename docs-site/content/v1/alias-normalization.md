---
title: Alias and Normalization
description: Parse-time aliases, canonical persistence rules, and failure behavior.
section: Guides
section_order: 2
order: 3
---

v1 intentionally supports a small alias set for operator and developer ergonomics.

## Alias Table

| Field | Alias | Canonical |
| --- | --- | --- |
| `risk_profile` | `yolo` | `danger` |
| `write_scope` | `workspace` | `workspace_write` |
| `write_scope` | `global` | `full_access` |
| `write_scope` | `unrestricted` | `full_access` |

## Normative Rules

- Parsers MAY accept listed aliases.
- Parsers MUST normalize aliases immediately.
- Serializers MUST output only canonical values.
- Persisted objects MUST NOT contain alias tokens.
- Unknown aliases or values MUST fail closed.

## Why Boundary-Only Aliases

Boundary-only alias handling avoids long-term semantic drift.

If aliases leak into storage:

- query behavior becomes inconsistent,
- audit logic needs extra normalization,
- migration complexity increases,
- cross-language consumers diverge.

## Recommended Parser Flow

```text
input -> parse -> alias map -> enum validation -> canonical object -> persistence
```

## Pseudocode

```ts
function normalizeWriteScope(input: string): "read_only" | "workspace_write" | "full_access" {
  const aliases: Record<string, string> = {
    workspace: "workspace_write",
    global: "full_access",
    unrestricted: "full_access",
  };

  const canonical = aliases[input] ?? input;
  if (!["read_only", "workspace_write", "full_access"].includes(canonical)) {
    throw new Error(`unknown write_scope: ${input}`);
  }

  return canonical as "read_only" | "workspace_write" | "full_access";
}
```

## Testing Requirements

Minimum tests for each alias-enabled field:

- alias input parses correctly,
- canonical input parses correctly,
- serialization emits canonical value,
- unknown value returns deterministic failure.
