// Copia site/ para dist/ trocando __SITE_URL__ pelo endereço do site.
// Na Vercel o endereço vem sozinho: o domínio próprio, se já estiver
// configurado, ou o endereço .vercel.app. Para forçar um, defina SITE_URL.
import { cpSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = (process.env.SITE_URL || (host ? `https://${host}` : 'http://localhost:4173')).replace(/\/+$/, '');

rmSync('dist', { recursive: true, force: true });
cpSync('site', 'dist', { recursive: true });
for (const file of ['index.html', 'robots.txt', 'sitemap.xml']) {
  const path = `dist/${file}`;
  writeFileSync(path, readFileSync(path, 'utf8').replaceAll('__SITE_URL__', siteUrl));
}
console.log(`Site gerado em dist/ com endereço ${siteUrl}`);
