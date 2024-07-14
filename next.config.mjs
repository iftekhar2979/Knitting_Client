/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    
    formats:['image/webp']
  },
  experimental: {
  
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
      }
};

export default nextConfig;

