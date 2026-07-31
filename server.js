// Entry point para o Hostinger.
// Delega para o servidor standalone gerado pelo Next.js.
// Configure o Hostinger para iniciar com: node server.js
process.env.NODE_ENV = 'production';
require('./.next/standalone/server.js');
