# policy-meta-spec

Canonical policy meta semantics shared by `agent-exec-gateway`, `safe-fs-tools`, and `omne-agent`.

## What This Repository Contains

- Canonical field names and immutable semantic meanings.
- JSON Schema contract for cross-repository interoperability.
- Baseline profile presets.
- Migration guidance.
- Minimal Rust types crate for compile-time reuse.
- Versioned documentation site (Next.js + GitHub Pages).

## Documentation

- Primary docs source: `docs-site/content/`
- Local docs app: `docs-site/`
- Core spec file: `SPEC.md`
- Schema: `schema/policy-meta.v1.json`
- Profiles: `profiles/*.yaml`
- Migration guide: `guides/migration-v1.md`

Run docs locally:

```bash
cd docs-site
npm install
npm run dev
```

## GitHub Pages Deployment

GitHub Pages deployment is handled by:

- `.github/workflows/docs-pages.yml`

The workflow builds `docs-site` as static output and publishes `docs-site/out` to GitHub Pages.

## Rust Types

Rust crate path:

- `rust/policy-meta/`

The crate includes canonical enums, serde alias parsing, and normalization tests.
