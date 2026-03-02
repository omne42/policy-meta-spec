# Quickstart

## 1. Use Canonical Fields

v1 canonical fields:

- `risk_profile`
- `write_scope`
- `execution_isolation`
- `decision`

## 2. Create a Canonical Policy Object

```yaml
version: 1
risk_profile: standard
write_scope: workspace_write
execution_isolation: best_effort
decision: prompt
```

## 3. Validate with JSON Schema

Use `schema/policy-meta.v1.json` in CI and integration tests.

```bash
npx ajv validate -s schema/policy-meta.v1.json -d policy.json
```

## 4. Normalize Aliases at Parse Boundary Only

Accepted parse aliases:

- `yolo -> danger`
- `workspace -> workspace_write`
- `global -> full_access`
- `unrestricted -> full_access`

Persist and emit canonical values only.

## 5. Fail Closed on Unknown Values

Unknown enum values or unknown object properties should be rejected.

## 6. Verify Profile Defaults

Baseline profile files are in `profiles/`:

- `safe.yaml`
- `standard.yaml`
- `proactive.yaml`
- `danger.yaml`
