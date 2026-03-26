# Docs System Map

## Entry Roles

- `README.md`
  - External overview and local validation commands.
- `AGENTS.md`
  - Short executor map.
- `SPEC.md`
  - Canonical semantic contract.
- `docs/`
  - Versioned explanatory and reference material.

## Directory Responsibilities

- `docs/getting-started/`
  - Quick adoption path.
- `docs/guides/`
  - Core model, alias normalization, risk profiles, migration.
- `docs/reference/`
  - Schema, Rust, TypeScript and versioning reference.
- `docs/architecture/`
  - Repository boundary and source layout maps.

## Freshness Rules

- Semantic contract changes update `SPEC.md` first.
- Schema / bindings / Rust artifact layout changes update `docs/architecture/source-layout.md`.
- Scope or ownership changes update `docs/architecture/system-boundaries.md`.
- Generated `site/` output is not a source of truth.
- `scripts/check-docs-system.sh` mechanically checks repository-level doc entrypoints.
