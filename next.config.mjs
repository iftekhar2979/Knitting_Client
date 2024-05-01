/** @type {import('next').NextConfig} */
const nextConfig = {
  output:'export',
  experimental: {
        // …
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
      }
};

export default nextConfig;
