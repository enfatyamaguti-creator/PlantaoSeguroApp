/**
 * Copia .next/static para _next/static na raiz do projeto.
 *
 * O LiteSpeed da Hostinger tenta servir /_next/static/ como arquivo estático
 * buscando a pasta `_next/` no diretório raiz. O Next.js gera os assets em
 * `.next/static/` (pasta oculta com ponto). Como o LiteSpeed não segue
 * symlinks de forma confiável, copiamos os arquivos para `_next/static/`
 * diretamente, garantindo que o LiteSpeed os encontre.
 */
const fs   = require('fs');
const path = require('path');

const root = process.cwd();
const src  = path.join(root, '.next', 'static');
const dst  = path.join(root, '_next', 'static');

try {
  if (!fs.existsSync(src)) {
    console.error('[postbuild] .next/static não encontrado — o build falhou?');
    process.exit(0);
  }

  if (fs.existsSync(path.join(root, '_next'))) {
    fs.rmSync(path.join(root, '_next'), { recursive: true, force: true });
  }

  fs.cpSync(src, dst, { recursive: true });

  const count = countFiles(dst);
  console.log(`[postbuild] ✓ ${count} arquivos copiados para _next/static/ (Hostinger LiteSpeed fix)`);
} catch (err) {
  console.error('[postbuild] Erro ao copiar arquivos estáticos:', err.message);
  process.exit(1);
}

function countFiles(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) total += countFiles(path.join(dir, entry.name));
    else total++;
  }
  return total;
}
