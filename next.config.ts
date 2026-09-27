import type { NextConfig } from 'next'

// GitHub Pages project site: https://mhorcajada.github.io/kafka-self-service/
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/kafka-self-service',
  images: {
    unoptimized: true
  }
}

export default nextConfig
