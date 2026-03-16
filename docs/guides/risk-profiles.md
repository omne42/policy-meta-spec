# Risk Profiles

Preset profiles are stored in `profiles/*.yaml` and validate against `schema/policy-profile.v1.json`.

## Built-In Presets

| Profile | `risk_profile` | `write_scope` | `execution_isolation` |
| --- | --- | --- | --- |
| `safe` | `safe` | `read_only` | `strict` |
| `standard` | `standard` | `workspace_write` | `best_effort` |
| `proactive` | `proactive` | `workspace_write` | `best_effort` |
| `danger` | `danger` | `full_access` | `none` |

## Selection Guidance

- `safe`: compliance-sensitive and untrusted-input-heavy contexts.
- `standard`: typical engineering default.
- `proactive`: semi-autonomous workflows with oversight.
- `danger`: explicitly authorized high-risk scenarios.

## Operational Recommendation

Start at `standard`, measure friction and risk, then escalate scope intentionally.

## Decision Pairing (Guideline)

| Profile | Common `decision` |
| --- | --- |
| `safe` | `prompt_strict` or `deny` |
| `standard` | `prompt` |
| `proactive` | `prompt` or `allow` |
| `danger` | `allow` |

These pairings are guidance, not schema constraints.
