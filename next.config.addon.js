/** Add-on seguro (renomeie para next.config.js se precisar) */
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: { appDir: true },
}
module.exports = nextConfig
