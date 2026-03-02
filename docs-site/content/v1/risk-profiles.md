---
title: Risk Profiles
description: Preset profiles, recommended use-cases, and mapping guidance.
section: Guides
section_order: 2
order: 2
---

`profiles/*.yaml` provide baseline presets to accelerate safe adoption.

## Built-In Presets

| Profile | `risk_profile` | `write_scope` | `execution_isolation` |
| --- | --- | --- | --- |
| `safe` | `safe` | `read_only` | `strict` |
| `standard` | `standard` | `workspace_write` | `best_effort` |
| `proactive` | `proactive` | `workspace_write` | `best_effort` |
| `danger` | `danger` | `full_access` | `none` |

## Selection Guidance

### `safe`

Best for:

- Compliance-sensitive environments.
- Untrusted input-heavy sessions.
- Read-mostly tooling.

### `standard`

Best for:

- Typical software development workflows.
- Balanced productivity and guardrails.

### `proactive`

Best for:

- Semi-autonomous agents with human oversight.
- Automation-heavy but still constrained workflows.

### `danger`

Best for:

- Explicitly authorized emergency tasks.
- Controlled environments with strong external governance.

## Suggested Decision Pairings

While profile YAML files currently focus on core execution fields, teams often pair `decision` this way:

| Profile | Typical `decision` |
| --- | --- |
| `safe` | `prompt_strict` or `deny` |
| `standard` | `prompt` |
| `proactive` | `allow` or `prompt` |
| `danger` | `allow` |

These are recommendations, not schema constraints.

## Custom Profiles

Organizations MAY define custom profile bundles outside this repository.

If you do:

- Keep canonical field semantics unchanged.
- Document rationale in repo-level governance notes.
- Keep migration path back to official presets clear.

## Operational Advice

Start conservative and escalate intentionally:

1. Launch with `standard`.
2. Track blocked workflows.
3. Increase scope only for proven productivity bottlenecks.
4. Keep rollback path to safer profile.
