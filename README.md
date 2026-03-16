# policy-meta-spec

Canonical policy meta semantics shared by `agent-exec-gateway`, `safe-fs-tools`, and `omne-agent`.

## What This Repository Contains

- Canonical field names and immutable semantic meanings.
- JSON Schema contracts for cross-repository interoperability.
- Checked-in TypeScript bindings for TS-facing consumers.
- Baseline profile presets.
- Migration guidance.
- Minimal Rust types crate for compile-time reuse.
- Fully automated versioned documentation deployment to GitHub Pages.

## Core Artifacts

- Spec: `SPEC.md`
- Canonical fragment schema: `schema/policy-meta.v1.json`
- Profile schema: `schema/policy-profile.v1.json`
- TypeScript bindings: `bindings/policy-meta.d.ts`
- Profiles: `profiles/*.yaml`
- Migration guide: `guides/migration-v1.md`
- Rust crate: `rust/policy-meta/`

Checked-in schema files and TypeScript bindings are synchronized from the Rust types crate.

## Documentation (Automated)

- Docs source: `docs/`
- MkDocs config: `mkdocs.yml`
- Auto deployment workflow: `.github/workflows/docs-pages.yml`

GitHub Pages publishing is fully automated via GitHub Actions with version selector support powered by `mike` (`latest`, `v1`, ...).

## Local Docs Build

```bash
pip install mkdocs mkdocs-material mike pymdown-extensions
mkdocs build --strict
```

## Local Validation

```bash
(cd rust/policy-meta && cargo run --locked --bin export-artifacts)
(cd rust/policy-meta && cargo run --locked --bin export-artifacts -- --check)
(cd rust/policy-meta && cargo test --locked)
pip install jsonschema PyYAML
python scripts/validate_spec.py
```
