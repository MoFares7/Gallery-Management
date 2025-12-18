import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      const originalExternals = config.externals || [];

      config.externals = [
        ...(Array.isArray(originalExternals)
          ? originalExternals
          : originalExternals
          ? [originalExternals]
          : []),
        (
          context: { request?: string },
          callback: (err?: Error | null, result?: string) => void
        ) => {
          const request = context.request;
          if (
            request === "canvas" ||
            request === "konva" ||
            request === "react-konva" ||
            request?.includes("konva/lib/index-node") ||
            request?.includes("konva/lib/_FullInternals")
          ) {
            return callback(null, `commonjs ${request}`);
          }
          callback();
        },
      ];
    } else {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }
    return config;
  },
};

export default nextConfig;
