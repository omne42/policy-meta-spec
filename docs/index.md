# Introduction

`policy-meta-spec` is the canonical semantic contract for policy metadata shared by:

- `omne-execution-gateway`
- `safe-fs-tools`
- `omne-agent`

It defines stable naming, strict canonical values, alias normalization rules, baseline profiles, and machine-readable schema and TypeScript artifacts.

## Why This Spec Exists

Distributed agent systems often diverge on policy token naming and meaning. Once divergence happens, interoperability and auditability break down quickly.

This repository is the single source of truth for policy metadata semantics.

The source of truth has two contract layers:

- `policy-meta.v1.json`: reusable canonical metadata fragment
- `policy-profile.v1.json`: versioned preset/profile contract

Checked-in JSON Schema and TypeScript artifacts are synchronized from the Rust types crate.

## Audience

This docs set is designed for all three consumers:

- Humans: conceptual clarity and migration guidance.
- Agents: deterministic tokens and strict normalization rules.
- Tools: schema contract and versioned compatibility expectations.

## Scope

In scope:

- canonical field names and enum values,
- parse-time alias handling,
- schema-level interoperability contract,
- baseline profile presets,
- migration and stability rules.

Out of scope:

- runtime policy engine internals,
- transport API definitions,
- platform-specific sandbox implementation details.

## Start Here

1. [Quickstart](getting-started/quickstart.md)
2. [Core Model](guides/core-model.md)
3. [Risk Profiles](guides/risk-profiles.md)
4. [Schema Reference](reference/schema-reference.md)
