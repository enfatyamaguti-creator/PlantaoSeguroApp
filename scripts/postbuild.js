/**
 * Cria um symlink _next -> .next na raiz do projeto.
 *
 * O LiteSpeed da Hostinger serve arquivos estáticos de /_next/ procurando
 * a pasta `_next/` no diretório raiz. O Next.js gera os assets em `.next/`
 * (com ponto, pasta oculta). O symlink faz o LiteSpeed encontrar os arquivos.
 */
const fs   = require('fs');
const path = require('path');

const root   = process.cwd();
const link   = path.join(root, '_next');
const target = path.join(root, '.next');

try {
  if (fs.existsSync(link)) {
    fs.rmSync(link, { recursive: true, force: true });
  }

  // 'junction' no Windows não exige privilégios de administrador.
  // No Linux (servidor Hostinger) o tipo é ignorado e cria um symlink normal.
  const type = process.platform === 'win32' ? 'junction' : 'dir';
  fs.symlinkSync(target, link, type);

  console.log('[postbuild] _next -> .next symlink criado com sucesso');
} catch (err) {
  // Não bloqueia o deploy — o servidor ainda pode funcionar via proxy Node.js
  console.warn('[postbuild] Não foi possível criar o symlink:', err.message);
}
