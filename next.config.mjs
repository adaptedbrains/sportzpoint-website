/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img-cdn.thepublive.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dmpsza32x691.cloudfront.net',
                // hostname: 'sportzpoint.s3.ap-south-1.amazonaws.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
