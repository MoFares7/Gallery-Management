import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        konva: "commonjs konva",
        "react-konva": "commonjs react-konva",
      });
    } else {
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
    }
    return config;
  },
};

export default nextConfig;
