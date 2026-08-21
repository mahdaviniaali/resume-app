/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/api/**': ['./prisma/deploy.db'],
    },
  },
}

module.exports = nextConfig
