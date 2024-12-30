import type { NextConfig } from "next";

const nextConfig = {
  output: 'standalone',
  experimental: {
      serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
};

export default nextConfig;
