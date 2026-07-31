/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera um servidor Node.js autossuficiente em .next/standalone/
  // O servidor standalone serve /_next/static/ diretamente, sem depender
  // do LiteSpeed do Hostinger encontrar arquivos em _next/ (com ou sem ponto).
  output: 'standalone',

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
