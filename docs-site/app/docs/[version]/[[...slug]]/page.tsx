import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  getDefaultDoc,
  getDoc,
  getDocsForVersion,
  getSidebar,
  getVersionById,
  getVersionSlugMap,
  getVersions,
} from "@/lib/docs";

type Params = {
  version: string;
  slug?: string[];
};

function docHref(version: string, slug: string): string {
  if (slug === "introduction") {
    return `/docs/${version}`;
  }
  return `/docs/${version}/${slug}`;
}

export async function generateStaticParams() {
  const versions = await getVersions();
  const params: Array<{ version: string; slug: string[] }> = [];

  for (const version of versions) {
    const docs = await getDocsForVersion(version.id);

    params.push({ version: version.id, slug: [] });
    for (const doc of docs) {
      params.push({
        version: version.id,
        slug: doc.slug.split("/"),
      });
    }
  }

  return params;
}

export default async function DocsPage({ params }: { params: Promise<Params> }) {
  const { version, slug = [] } = await params;
  const versionCfg = await getVersionById(version);

  if (!versionCfg) {
    notFound();
  }

  const requestedSlug = slug.length > 0 ? slug.join("/") : "introduction";
  const doc = (await getDoc(version, requestedSlug)) ?? (await getDefaultDoc(version));

  if (!doc) {
    notFound();
  }

  const versions = await getVersions();
  const sidebar = await getSidebar(version);
  const versionSlugMap = await getVersionSlugMap();

  return (
    <main className="docs-layout">
      <header className="docs-header">
        <div className="docs-header-title">
          <h1>{doc.title}</h1>
          <p>{doc.description}</p>
        </div>
        <VersionSwitcher
          versions={versions}
          currentVersion={version}
          currentSlug={doc.slug}
          versionSlugMap={versionSlugMap}
        />
      </header>

      <div className="docs-grid">
        <aside className="docs-sidebar" aria-label="Sidebar navigation">
          {sidebar.map((section) => (
            <section key={section.name} className="docs-sidebar-section">
              <h2>{section.name}</h2>
              <ul>
                {section.items.map((item) => {
                  const active = item.slug === doc.slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={docHref(version, item.slug)}
                        className={active ? "active" : undefined}
                        aria-current={active ? "page" : undefined}
                      >
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </aside>

        <article className="docs-content">
          <MarkdownContent source={doc.body} version={version} />
        </article>

        <aside className="docs-toc" aria-label="Table of contents">
          <h2>On this page</h2>
          <ul>
            {doc.headings.length === 0 ? <li>No section headings</li> : null}
            {doc.headings.map((heading) => (
              <li key={heading.id} className={`depth-${heading.depth}`}>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
