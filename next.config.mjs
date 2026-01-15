/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // bypasses proxy 404 issues
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
