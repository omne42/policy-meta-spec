---
title: Quickstart
description: Build and validate your first canonical policy object.
section: Getting Started
section_order: 1
order: 2
---

This guide gives you the fastest safe path to adopt `policy-meta-spec`.

## Step 1: Choose a Baseline Profile

Use one of the built-in profile presets first:

- `safe`
- `standard`
- `proactive`
- `danger`

Recommended default for general engineering workflows: `standard`.

## Step 2: Express Canonical Fields

Start with explicit canonical values only.

```yaml
version: 1
risk_profile: standard
write_scope: workspace_write
execution_isolation: best_effort
decision: prompt
```

Do not persist aliases such as `workspace` or `global`.

## Step 3: Validate Against JSON Schema

Use `schema/policy-meta.v1.json` during CI and pre-merge checks.

Validation rules in v1:

- `type` is `object`.
- Unknown properties are rejected (`additionalProperties: false`).
- Field enums are strict.

```bash
# Example with ajv-cli
npx ajv validate \
  -s schema/policy-meta.v1.json \
  -d policy.yaml
```

## Step 4: Normalize Input Aliases

Accept aliases only at user/system input boundaries.

```text
yolo -> danger
workspace -> workspace_write
global -> full_access
unrestricted -> full_access
```

After parsing, always serialize canonical values.

## Step 5: Fail Closed

Unknown value behavior should be deterministic:

- Reject unknown enum values.
- Reject unknown properties.
- Return explicit error location and expected values.

## Minimal Integration Checklist

- Parser supports documented aliases.
- Serializer outputs canonical values only.
- Validation runs in CI.
- Logs include normalized policy data.
- Unknown inputs fail closed.

## Common Mistakes

### Storing Alias Values

If you persist aliases, future tooling cannot rely on a single normalized contract.

### Treating `risk_profile` as Runtime Decision

`risk_profile` is a policy posture descriptor. Runtime authorization may still use additional logic.

### Skipping Explicit `decision`

If your product semantics require user approval behavior, set `decision` explicitly to avoid hidden defaults.
