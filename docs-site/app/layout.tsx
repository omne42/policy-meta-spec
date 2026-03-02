import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Policy Meta Spec Docs",
  description:
    "Versioned documentation for the Policy Meta Spec used by agent-exec-gateway, safe-fs-tools, and omne-agent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="site-title">
              policy-meta-spec
            </Link>
            <p className="site-subtitle">Canonical policy semantics for agent runtime interoperability.</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
