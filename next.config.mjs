/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'img-cdn.thepublive.com',
              port: '', // Leave empty for default ports (80 for HTTP, 443 for HTTPS)
              pathname: '/**', // Matches all paths
            },
          ],
      },
};

export default nextConfig;
