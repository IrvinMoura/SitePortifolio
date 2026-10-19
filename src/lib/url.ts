/**
 * Caminho canônico de uma página: sem ".html", sem "/index" e sem barra final
 * (o build usa format: 'file'; a Vercel serve /registro a partir de registro.html).
 */
export function canonicalPath(pathname: string): string {
  const clean = pathname
    .replace(/\.html$/, '')
    .replace(/\/index$/, '')
    .replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}
