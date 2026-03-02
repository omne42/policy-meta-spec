import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type VersionConfig = {
  id: string;
  label: string;
  channel: "stable" | "legacy" | "draft";
  source: string;
};

export type VersionsFile = {
  defaultVersion: string;
  versions: VersionConfig[];
};

type Frontmatter = {
  title?: string;
  description?: string;
  section?: string;
  section_order?: number;
  order?: number;
};

export type Heading = {
  depth: 2 | 3;
  text: string;
  id: string;
};

export type DocPage = {
  version: string;
  source: string;
  slug: string;
  title: string;
  description: string;
  section: string;
  sectionOrder: number;
  order: number;
  body: string;
  headings: Heading[];
};

export type SidebarSection = {
  name: string;
  order: number;
  items: Array<{
    slug: string;
    title: string;
    description: string;
  }>;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=,./?<>\\|\[\]{}:;'"”“’‘]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split(/\r?\n/);
  const headings: Heading[] = [];
  let inFence = false;

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("```") || line.startsWith("~~~")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }

    const match = line.match(/^(##|###)\s+(.+)$/);
    if (!match) {
      continue;
    }

    const depth = match[1] === "##" ? 2 : 3;
    const text = match[2].replace(/[#`*_]/g, "").trim();
    headings.push({
      depth,
      text,
      id: slugify(text),
    });
  }

  return headings;
}

async function listMarkdownFiles(root: string, relative = ""): Promise<string[]> {
  const dirPath = path.join(root, relative);
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const entryRelative = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      const nested = await listMarkdownFiles(root, entryRelative);
      files.push(...nested);
      continue;
    }

    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(entryRelative);
    }
  }

  return files;
}

export const getVersionsFile = cache(async (): Promise<VersionsFile> => {
  const file = path.join(CONTENT_ROOT, "versions.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as VersionsFile;
});

export const getVersions = cache(async (): Promise<VersionConfig[]> => {
  const cfg = await getVersionsFile();
  return cfg.versions;
});

export const getDefaultVersion = cache(async (): Promise<string> => {
  const cfg = await getVersionsFile();
  return cfg.defaultVersion;
});

export const getVersionById = cache(async (id: string): Promise<VersionConfig | undefined> => {
  const versions = await getVersions();
  return versions.find((version) => version.id === id);
});

export const getDocsForVersion = cache(async (version: string): Promise<DocPage[]> => {
  const versionCfg = await getVersionById(version);
  if (!versionCfg) {
    return [];
  }

  const sourceDir = path.join(CONTENT_ROOT, versionCfg.source);
  const files = await listMarkdownFiles(sourceDir);

  const pages = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(sourceDir, file);
      const raw = await fs.readFile(fullPath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data as Frontmatter;

      const slug = file.replace(/\.(md|mdx)$/i, "").split(path.sep).join("/");
      const title = data.title ?? slug;

      return {
        version,
        source: versionCfg.source,
        slug,
        title,
        description: data.description ?? "",
        section: data.section ?? "Reference",
        sectionOrder: data.section_order ?? 99,
        order: data.order ?? 99,
        body: parsed.content.trim(),
        headings: extractHeadings(parsed.content),
      } satisfies DocPage;
    }),
  );

  pages.sort((a, b) => {
    if (a.sectionOrder !== b.sectionOrder) {
      return a.sectionOrder - b.sectionOrder;
    }
    if (a.section !== b.section) {
      return a.section.localeCompare(b.section);
    }
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.title.localeCompare(b.title);
  });

  return pages;
});

export async function getDoc(version: string, slug: string): Promise<DocPage | undefined> {
  const docs = await getDocsForVersion(version);
  return docs.find((doc) => doc.slug === slug);
}

export async function getDefaultDoc(version: string): Promise<DocPage | undefined> {
  const docs = await getDocsForVersion(version);
  return docs.find((doc) => doc.slug === "introduction") ?? docs[0];
}

export async function getSidebar(version: string): Promise<SidebarSection[]> {
  const docs = await getDocsForVersion(version);
  const sectionMap = new Map<string, SidebarSection>();

  for (const doc of docs) {
    const section = sectionMap.get(doc.section) ?? {
      name: doc.section,
      order: doc.sectionOrder,
      items: [],
    };

    section.items.push({
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
    });

    sectionMap.set(doc.section, section);
  }

  const sections = [...sectionMap.values()];
  sections.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

  return sections;
}

export async function getVersionSlugMap(): Promise<Record<string, string[]>> {
  const versions = await getVersions();
  const map: Record<string, string[]> = {};

  for (const version of versions) {
    const docs = await getDocsForVersion(version.id);
    map[version.id] = docs.map((doc) => doc.slug);
  }

  return map;
}
