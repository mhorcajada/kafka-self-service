import type { NextConfig } from 'next'

// GitHub Pages project site: https://mhorcajada.github.io/kafka-self-service/
const basePath = '/kafka-self-service'

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: {
    // Needed for <img> and icons: basePath is not added to them automatically
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true
  }
}

export default nextConfig
