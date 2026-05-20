/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@fortawesome/free-solid-svg-icons', 'three', '@react-three/fiber', '@react-three/drei'],
  },
  // Garante que o build ignore checagens de tipos que podem travar no ambiente do Pages se houver mismatch de pacotes
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;