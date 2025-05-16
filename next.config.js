/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['static.canva.com', 'www.canva.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig
