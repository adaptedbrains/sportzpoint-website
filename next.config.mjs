/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img-cdn.thepublive.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sportzpoint.s3.ap-south-1.amazonaws.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
