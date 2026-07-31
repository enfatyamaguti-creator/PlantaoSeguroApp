/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Impede que o LiteSpeed do Hostinger sirva HTML cacheado de builds anteriores.
        // Aplica a todas as rotas HTML exceto assets estáticos (que têm hash no nome).
        source: '/((?!_next/static|_next/image|favicon\\.ico|logo\\.png|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.webp).*)',
        headers: [{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' }],
      },
    ];
  },
};

export default nextConfig;
