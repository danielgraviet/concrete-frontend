import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    // Pages renamed when the site was repositioned around practice.
    return [
      { source: "/notes", destination: "/material", permanent: true },
      { source: "/review", destination: "/flashcards", permanent: true },
    ];
  },
  turbopack: {
    // A stray lockfile in the home directory would otherwise be picked as the workspace root.
    root: __dirname,
  },
};

export default nextConfig;
