---
title: Governance and Versioning
description: Stability guarantees, change policies, and release expectations.
section: API Reference
section_order: 3
order: 3
---

This project treats semantic stability as a hard requirement.

## Stability Guarantees

- Existing canonical values are immutable in meaning.
- Backward-incompatible rename/removal requires a major version change.
- Additive evolution is preferred whenever possible.

## Versioning Model

### Spec Version

Spec versions describe semantic contracts (for example `v1`).

### Docs Version

Docs site supports version navigation to keep rollout communication explicit.

### Schema Version

Schema file names include explicit spec version (`policy-meta.v1.json`).

## Change Types

| Change Type | Compatibility | Typical Action |
| --- | --- | --- |
| New field | additive | minor release + docs update |
| New enum value | additive but behavior-sensitive | minor release + integration warning |
| Rename/removal | breaking | major version + migration guide |
| Alias addition | parse-only compatibility improvement | minor release |

## Release Checklist

- Spec text updated.
- Schema updated and validated.
- Profiles reviewed for consistency.
- Rust crate updated and tested.
- Migration note added when needed.
- Docs version selector updated.

## Governance Advice for Consumers

Consumers SHOULD pin to a known spec version in production and upgrade intentionally.

Recommended pattern:

1. Pin current version in runtime config.
2. Validate new version in staging with real traces.
3. Upgrade production with rollback-ready deployment.
