import type { ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/docs";

function toPlainText(node: ReactNode): string {
  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number" || typeof node === "boolean" || node === null || node === undefined) {
    return "";
  }

  if (Array.isArray(node)) {
    return node.map((item) => toPlainText(item)).join(" ");
  }

  if (typeof node === "object" && "props" in node) {
    const maybeProps = (node as { props?: { children?: ReactNode } }).props;
    return toPlainText(maybeProps?.children);
  }

  return "";
}

function toDocLink(version: string, href: string): string {
  const normalized = href.replace(/^\.\//, "").replace(/\/+$/, "");
  if (normalized === "" || normalized === "introduction") {
    return `/docs/${version}`;
  }
  return `/docs/${version}/${normalized}`;
}

export function MarkdownContent({ source, version }: { source: string; version: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href = "", children }) => {
          if (href.startsWith("#")) {
            return <a href={href}>{children}</a>;
          }
          if (/^(https?:|mailto:)/i.test(href)) {
            return (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            );
          }
          return <Link href={toDocLink(version, href)}>{children}</Link>;
        },
        h2: ({ children }) => {
          const text = toPlainText(children).trim();
          return <h2 id={slugify(text)}>{children}</h2>;
        },
        h3: ({ children }) => {
          const text = toPlainText(children).trim();
          return <h3 id={slugify(text)}>{children}</h3>;
        },
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
