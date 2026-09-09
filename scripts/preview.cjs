// Prévia somente local, sem dependências e sem acesso a arquivos fora da lista.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const raiz = path.resolve(__dirname, '..');
const arquivos = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/style.css', ['style.css', 'text/css; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/assets/hamburguer.png', ['assets/hamburguer.png', 'image/png']],
  ['/assets/batata.png', ['assets/batata.png', 'image/png']],
  ['/assets/suco.png', ['assets/suco.png', 'image/png']],
]);
const servidor = http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  const arquivo = arquivos.get(req.url.split('?')[0]);
  if (!arquivo) { res.writeHead(404).end(); return; }
  try {
    const conteudo = await fs.readFile(path.join(raiz, arquivo[0]));
    res.writeHead(200, { 'Content-Type': arquivo[1], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : conteudo);
  } catch { res.writeHead(500).end('Não foi possível abrir a prévia.'); }
});
servidor.listen(0, '127.0.0.1', () => console.log(`Cardápio Digital: http://127.0.0.1:${servidor.address().port}`));
