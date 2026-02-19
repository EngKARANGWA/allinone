/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure Turbopack resolves the project root correctly (fixes Turbopack root inference)
  turbopack: {
    root: '.'
  }
}

export default nextConfig
