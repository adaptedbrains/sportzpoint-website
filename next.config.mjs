/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['sportzpoint.s3.ap-south-1.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    path: '/_next/image',
    disableStaticImages: false,
    unoptimized: false,
    quality: 90,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sportzpoint.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeImages: true,
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|otf)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date' },
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=30',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=30',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=30',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize CSS
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'all',
          enforce: true,
        },
      };
    }

    // Enable AVIF and WebP optimization
    config.module.rules.push({
      test: /\.(jpe?g|png)$/i,
      type: 'asset',
      use: {
        loader: 'sharp',
        options: {
          quality: 90,
          animated: true,
          mozjpeg: {
            quality: 90,
            progressive: true,
            optimiseScans: true,
          },
          webp: { 
            quality: 90,
            lossless: true,
            nearLossless: true,
            smartSubsample: true,
          },
          avif: { 
            quality: 90,
            lossless: true,
            effort: 9,
          },
        },
      },
    });

    return config;
  },
}

export default nextConfig;
