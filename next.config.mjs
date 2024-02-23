/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS_REGION: process.env.AWS_REGION,
    NEW_PLAN_API_URL: process.env.NEW_PLAN_API_URL,
  },
  output: 'standalone',
}

export default nextConfig
