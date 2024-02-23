/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLOUD_REGION: process.env.CLOUD_REGION,
    PLAN_API_URL: process.env.PLAN_API_URL,
  },
  output: 'standalone',
}

export default nextConfig
