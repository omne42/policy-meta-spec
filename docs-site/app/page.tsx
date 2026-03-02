import Link from "next/link";
import { getDefaultVersion } from "@/lib/docs";

export default async function HomePage() {
  const defaultVersion = await getDefaultVersion();

  return (
    <main className="home">
      <section className="hero">
        <h1>Policy Meta Spec Documentation</h1>
        <p>
          This site is the human-friendly and machine-friendly documentation portal for policy meta semantics
          shared across `agent-exec-gateway`, `safe-fs-tools`, and `omne-agent`.
        </p>
        <div className="hero-actions">
          <Link href={`/docs/${defaultVersion}`} className="primary-link">
            Open Docs
          </Link>
          <Link href={`/docs/${defaultVersion}/schema-reference`} className="secondary-link">
            Open Schema Reference
          </Link>
        </div>
      </section>
      <section className="home-grid">
        <article>
          <h2>For Humans</h2>
          <p>Clear conceptual guidance, migration notes, and profile recommendations with examples.</p>
        </article>
        <article>
          <h2>For Agents</h2>
          <p>Deterministic field definitions, strict canonical values, and parse-time alias behavior.</p>
        </article>
        <article>
          <h2>For Tooling</h2>
          <p>JSON Schema, profile YAML files, and Rust types to support validation and code generation.</p>
        </article>
      </section>
    </main>
  );
}
