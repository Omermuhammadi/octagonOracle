/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable faster navigation
  reactStrictMode: true,
  // Modern Next.js doesn't need swcMinify option
  // swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  // Add allowed development origins for cross-origin requests
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '172.16.0.2'
  ],
  // Configure webpack if needed
  webpack: (config, { isServer }) => {
    // Fix for bcryptjs and other modules in Edge Runtime
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error on build
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        crypto: false,
      };
    }

    return config;
  },
}

export default nextConfig
