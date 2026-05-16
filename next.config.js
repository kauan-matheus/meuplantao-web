/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@fortawesome/free-solid-svg-icons', 'three', '@react-three/fiber', '@react-three/drei'],
  },
};

module.exports = nextConfig;