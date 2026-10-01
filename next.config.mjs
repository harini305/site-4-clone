/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Required by Next.js 16 — the quality values next/image may request.
    qualities: [75],
    localPatterns: [{ pathname: '/images/**' }],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
