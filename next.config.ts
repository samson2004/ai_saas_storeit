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
};

export default nextConfig;
