/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/email_validator/frontend',
  assetPrefix: '/email_validator/frontend',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
