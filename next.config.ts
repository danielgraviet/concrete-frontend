import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // A stray lockfile in the home directory would otherwise be picked as the workspace root.
    root: __dirname,
  },
};

export default nextConfig;
