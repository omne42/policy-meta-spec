---
title: Introduction
description: What Policy Meta Spec is, why it exists, and how to use this documentation effectively.
section: Getting Started
section_order: 1
order: 1
---

`policy-meta-spec` defines the canonical policy metadata vocabulary shared by multiple runtime and tooling repositories.

It exists to solve a specific interoperability problem: different services and clients were using similar policy ideas with inconsistent names, weak normalization rules, and incompatible defaults.

This documentation is intentionally written for three audiences at the same time:

- Humans who need fast conceptual understanding and safe defaults.
- Agents that must parse deterministic semantics without ambiguity.
- Tooling pipelines that require stable machine-readable contracts.

## Scope

This project is the source of truth for:

- Canonical field names and canonical enum values.
- Parse-time aliases accepted at input boundaries.
- JSON Schema validation contract for portable config.
- Baseline risk profile presets.
- Migration guidance for breaking normalization updates.
- Minimal Rust type definitions for compile-time reuse.

## Non-Goals

This project does not define:

- A full runtime policy engine implementation.
- Platform-specific sandbox internals.
- Transport-specific API schemas.
- Product-specific policy UI workflows.

## Reading Path

Use this path if you are new:

1. Read [Quickstart](quickstart) to get a working policy object in minutes.
2. Read [Core Model](core-model) to understand field semantics.
3. Read [Risk Profiles](risk-profiles) to select default operational posture.
4. Read [Alias and Normalization](alias-normalization) before implementing parsers.
5. Use [Schema Reference](schema-reference) for validation and codegen.

## Normative Language

This docs set uses RFC-style terms for clarity:

- `MUST`: mandatory requirement.
- `SHOULD`: strong recommendation unless you have a specific reason.
- `MAY`: optional behavior.

## Canonical Field Set

The canonical fields in v1 are:

- `risk_profile`
- `write_scope`
- `execution_isolation`
- `decision`

All canonical values are snake_case ASCII tokens and are case-sensitive.

## Design Principles

### Stable Meanings Over Clever Names

Names prioritize auditability and long-term stability over shorter wording.

### Parse Flexibility, Persisted Strictness

Aliases are accepted only at parse boundary, then normalized to canonical values before storage or transmission.

### Additive Evolution by Default

New fields and values are preferred over reinterpreting existing semantics.

### Cross-Language Predictability

Schema, YAML presets, and Rust types intentionally align on the same semantic model.

## Repository Map

- `schema/policy-meta.v1.json`: JSON Schema contract.
- `profiles/*.yaml`: opinionated baseline profiles.
- `guides/migration-v1.md`: v1 migration guidance.
- `rust/policy-meta/`: Rust enums + serde alias behavior.

## Quick Example

```yaml
version: 1
risk_profile: standard
write_scope: workspace_write
execution_isolation: best_effort
decision: prompt
```

The object above is canonical. It is suitable for persistence, audit logs, and service-to-service transport.
