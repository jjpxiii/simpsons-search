import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    ignoreIssue: [{ path: "tailwind.config.ts", title: /^Module not found/i }],
  },
};

export default nextConfig;
