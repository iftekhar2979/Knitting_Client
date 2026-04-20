/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    
    formats:['image/webp']
  },
  serverExternalPackages: ['@react-pdf/renderer'],
};

export default nextConfig;

