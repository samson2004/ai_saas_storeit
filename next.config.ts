import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*',
        permanent: true,
      },
    ];
  },
  // This serves the uploaded files as static assets
  staticPageGenerationTimeout: 60,

  experimental: {
    // Ensure you're supporting middleware if using experimental features
    middlewarePrefetch: 'strict',
  },
};

export default nextConfig;
