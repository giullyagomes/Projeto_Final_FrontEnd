/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.motor1.com',
      },
    ],
  },
};

export default nextConfig;
