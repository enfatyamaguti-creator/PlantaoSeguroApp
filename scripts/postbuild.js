/**
 * Prepara o output standalone do Next.js para deploy no Hostinger.
 *
 * O `output: 'standalone'` gera um servidor em .next/standalone/ que
 * serve tudo — incluindo /_next/static/ — sem depender do LiteSpeed.
 * Mas o standalone não inclui os arquivos estáticos por padrão;
 * precisamos copiá-los manualmente para dentro da pasta standalone.
 */
const fs   = require('fs');
const path = require('path');

const root       = process.cwd();
const standalone = path.join(root, '.next', 'standalone');

if (!fs.existsSync(standalone)) {
  console.error('[postbuild] .next/standalone não encontrado. Verifique se output: "standalone" está no next.config.mjs e o build concluiu.');
  process.exit(1);
}

// 1. Copia .next/static → .next/standalone/.next/static
copy(
  path.join(root, '.next', 'static'),
  path.join(standalone, '.next', 'static')
);

// 2. Copia public/ → .next/standalone/public/
const publicDir = path.join(root, 'public');
if (fs.existsSync(publicDir)) {
  copy(publicDir, path.join(standalone, 'public'));
}

console.log('[postbuild] ✓ Standalone pronto para deploy');

function copy(src, dst) {
  if (!fs.existsSync(src)) return;
  if (fs.existsSync(dst)) fs.rmSync(dst, { recursive: true, force: true });
  fs.cpSync(src, dst, { recursive: true });
  console.log(`[postbuild]   ${path.relative(root, src)} → ${path.relative(root, dst)}`);
}
