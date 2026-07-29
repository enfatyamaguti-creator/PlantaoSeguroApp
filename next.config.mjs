/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Impede cache de páginas autenticadas (evita RSC payload cacheado pelo LiteSpeed)
        source: '/dashboard/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' }],
      },
    ];
  },
};

export default nextConfig;
