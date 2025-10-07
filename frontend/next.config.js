/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // Add this for better development experience
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig