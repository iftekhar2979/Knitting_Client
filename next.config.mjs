/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    
    formats:['image/webp']
  },
  experimental: {
  
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
      }
};

export default nextConfig;

