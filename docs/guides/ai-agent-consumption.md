# AI and Agent Consumption

AI/agent systems benefit from strict and explicit policy token contracts.

## Integration Pattern

```text
human or system input
-> parse aliases
-> canonical object
-> schema validation
-> runtime policy evaluation
-> structured audit output
```

## Recommendations

- pass canonical values to model/tool context,
- include explicit spec version in persisted/profile artifacts,
- reject free-form synonyms not in canonical/alias tables,
- log raw token and normalized token for traceability.

## Error Message Style

Use strict corrective messages.

Example:

```text
Invalid write_scope: workspace
Use canonical value: workspace_write
```

## Safe Defaults for Autonomous Contexts

- prefer `safe` or `standard`,
- avoid `full_access` without explicit escalation,
- require intentional transitions to higher-risk profiles.
