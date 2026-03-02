# policy-meta-spec

Canonical policy meta semantics shared by `agent-exec-gateway`, `safe-fs-tools`, and `omne-agent`.

## What This Repository Contains

- Canonical field names and immutable semantic meanings.
- JSON Schema contract for cross-repository interoperability.
- Baseline profile presets.
- Migration guidance.
- Minimal Rust types crate for compile-time reuse.
- Fully automated versioned documentation deployment to GitHub Pages.

## Core Artifacts

- Spec: `SPEC.md`
- Schema: `schema/policy-meta.v1.json`
- Profiles: `profiles/*.yaml`
- Migration guide: `guides/migration-v1.md`
- Rust crate: `rust/policy-meta/`

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
