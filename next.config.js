/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static page generation
  output: 'standalone',

  // Configure image optimization
  images: {
    domains: ['img-cdn.thepublive.com', 'sportzpoint.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  // Configure headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ];
  },

  // Configure redirects
  async redirects() {
    return [];
  },

  // Configure rewrites
  async rewrites() {
    return [];
  },

  // Enable page caching
  experimental: {
    // Enable streaming SSR
    streaming: true,
    // Enable React Server Components
    serverComponents: true,
  },

  // Configure webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize production builds
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    return config;
  },
}

module.exports = nextConfig
