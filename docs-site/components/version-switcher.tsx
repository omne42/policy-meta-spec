"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { VersionConfig } from "@/lib/docs";

type Props = {
  versions: VersionConfig[];
  currentVersion: string;
  currentSlug: string;
  versionSlugMap: Record<string, string[]>;
};

function getDocHref(version: string, slug: string): string {
  if (slug === "introduction") {
    return `/docs/${version}`;
  }
  return `/docs/${version}/${slug}`;
}

export function VersionSwitcher({ versions, currentVersion, currentSlug, versionSlugMap }: Props) {
  const router = useRouter();

  const options = useMemo(
    () =>
      versions.map((version) => ({
        ...version,
        hasCurrentSlug: versionSlugMap[version.id]?.includes(currentSlug) ?? false,
      })),
    [versions, versionSlugMap, currentSlug],
  );

  return (
    <label className="version-switcher">
      <span>Version</span>
      <select
        aria-label="Select docs version"
        value={currentVersion}
        onChange={(event) => {
          const targetVersion = event.target.value;
          const hasCurrentSlug = versionSlugMap[targetVersion]?.includes(currentSlug) ?? false;
          const targetSlug = hasCurrentSlug ? currentSlug : "introduction";
          router.push(getDocHref(targetVersion, targetSlug));
        }}
      >
        {options.map((version) => (
          <option key={version.id} value={version.id}>
            {version.label}
          </option>
        ))}
      </select>
    </label>
  );
}
