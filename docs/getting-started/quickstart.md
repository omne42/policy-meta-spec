# Quickstart

## 1. Use Canonical Fields

v1 canonical fields:

- `risk_profile`
- `write_scope`
- `execution_isolation`
- `decision`

## 2. Create a Versioned Policy Artifact

```yaml
version: 1
risk_profile: standard
write_scope: workspace_write
execution_isolation: best_effort
decision: prompt
```

## 3. Validate with JSON Schema

Use the schema that matches your artifact shape:

- `schema/policy-meta.v1.json` for reusable metadata fragments
- `schema/policy-profile.v1.json` for versioned preset/profile objects
- checked-in schema files are synchronized from `rust/policy-meta/`
- checked-in TypeScript bindings are synchronized to `bindings/policy-meta.d.ts`

```bash
npx ajv validate -s schema/policy-profile.v1.json -d policy.yaml
```

```bash
cd rust/policy-meta
cargo run --locked --bin export-artifacts -- --check
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

Baseline profile files are in `profiles/` and validate against `schema/policy-profile.v1.json`:

- `safe.yaml`
- `standard.yaml`
- `proactive.yaml`
- `danger.yaml`
