---
title: AI and Agent Consumption
description: Practical patterns for LLM agents and automation systems consuming the spec.
section: Guides
section_order: 2
order: 5
---

This page provides direct implementation guidance for agentic systems.

## Why Agents Need Explicit Semantics

LLM-based systems are sensitive to wording drift and ambiguous labels.

Canonical policy metadata reduces this risk by providing:

- fixed token vocabulary,
- deterministic alias normalization,
- explicit failure behavior for unknown inputs.

## Prompt and Tooling Contract

When passing policy data into an agent runtime:

- provide canonical values only,
- avoid natural-language synonyms,
- include schema-validated object as structured context,
- include the active docs/spec version.

## Recommended Runtime Pipeline

```text
human/tool input
-> parse aliases
-> canonical object
-> schema validation
-> policy enforcement
-> structured audit event
```

## Audit Event Shape

Include at least:

- raw input token,
- canonical normalized value,
- parser version,
- spec version,
- enforcement result.

This enables deterministic debugging of agent behavior.

## Safe Defaults for Autonomous Tasks

For unattended or batched agent runs:

- start with `risk_profile: safe` or `standard`,
- prefer `write_scope: read_only` unless write is required,
- use `decision: deny` or `prompt_strict` in unknown contexts,
- require explicit escalation path for `full_access`.

## Error Message Guidance

Agent-facing error messages should be strict and corrective.

Example:

```text
Invalid write_scope: workspace
Use canonical value: workspace_write
```

## Interoperability Tips

- Keep one canonical normalization module per language.
- Generate test vectors shared by all services.
- Validate policy payloads at every process boundary.
- Avoid hidden defaults that bypass explicit policy fields.
