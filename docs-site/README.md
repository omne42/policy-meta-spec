# policy-meta-spec docs-site

Versioned documentation site for `policy-meta-spec`, built with Next.js App Router and static export.

## Local Development

```bash
cd docs-site
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for Static Hosting

```bash
cd docs-site
npm run build
```

Export output is generated under `docs-site/out`.

## Versioned Content

- Version registry: `content/versions.json`
- Version docs content: `content/<version-source>/*.md`
- Route format: `/docs/<version>/<slug>`

`latest` can point to the same source directory as a pinned version for stable aliases.
