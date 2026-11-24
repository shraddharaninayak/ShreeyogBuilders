const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Clean redirects for legacy reference routes to Shreeyog routes
  if (pathname === '/places' || pathname.startsWith('/places/')) {
    res.writeHead(301, { 'Location': '/projects' });
    res.end();
    return;
  }
  if (pathname === '/objects' || pathname.startsWith('/objects/') || pathname === '/services' || pathname.startsWith('/services/')) {
    res.writeHead(301, { 'Location': '/projects' });
    res.end();
    return;
  }
  if (pathname === '/people' || pathname.startsWith('/people/')) {
    res.writeHead(301, { 'Location': '/about' });
    res.end();
    return;
  }

  // Brochure PDF redirects
  const brochureRedirects = {
    '/brochures/shree-bramhand.pdf': '/brochures/shree-bramhand-brochure.pdf',
    '/projects/shree-bramhand/Shree-Bramhand-Brochure.pdf': '/brochures/shree-bramhand-brochure.pdf',
    '/projects/shree-bramhand/brochure/Shree-Bramhand-Brochure.pdf': '/brochures/shree-bramhand-brochure.pdf',
    '/projects/shree-bramhand/brochure/brochure.pdf': '/brochures/shree-bramhand-brochure.pdf',

    '/brochures/shree-vishwa.pdf': '/brochures/shree-vishwa-brochure.pdf',
    '/projects/shree-vishwa/Shree-Vishwa-Brochure.pdf': '/brochures/shree-vishwa-brochure.pdf',
    '/projects/shree-vishwa/brochure/Shree-Vishwa-Brochure.pdf': '/brochures/shree-vishwa-brochure.pdf',
    '/projects/shree-vishwa/brochure/brochure.pdf': '/brochures/shree-vishwa-brochure.pdf',
    '/projects/shree-viswa/brochure': '/projects/shree-vishwa/brochure/',
    '/projects/shree-viswa/brochure/': '/projects/shree-vishwa/brochure/',

    '/brochures/shree-safalya.pdf': '/brochures/shree-safalya-brochure.pdf',
    '/projects/shree-safalya/Shree-Safalya-Brochure.pdf': '/brochures/shree-safalya-brochure.pdf',
    '/projects/shree-safalya/brochure/Shree-Safalya-Brochure.pdf': '/brochures/shree-safalya-brochure.pdf',
    '/projects/shree-safalya/brochure/brochure.pdf': '/brochures/shree-safalya-brochure.pdf',

    '/brochures/shree-samruddhi-park.pdf': '/brochures/shree-samruddhi-park-brochure.pdf',
    '/projects/shree-samruddhi-park/Shree-Samruddhi-Park.pdf': '/brochures/shree-samruddhi-park-brochure.pdf',
    '/projects/shree-samruddhi-park/brochure/Shree-Samruddhi-Park.pdf': '/brochures/shree-samruddhi-park-brochure.pdf',
    '/projects/shree-samruddhi-park/brochure/brochure.pdf': '/brochures/shree-samruddhi-park-brochure.pdf',

    '/brochures/shree-venkatesh-park.pdf': '/brochures/shree-venkatesh-park-brochure.pdf',
    '/brochures/shree-venkatesh.pdf': '/brochures/shree-venkatesh-park-brochure.pdf',
    '/projects/shree-venkatesh-park/Shree-Venkatesh-Park.pdf': '/brochures/shree-venkatesh-park-brochure.pdf',
    '/projects/shree-venkatesh-park/brochure/Shree-Venkatesh-Park.pdf': '/brochures/shree-venkatesh-park-brochure.pdf',
    '/projects/shree-venkatesh/Shree-Venkatesh-Park.pdf': '/brochures/shree-venkatesh-park-brochure.pdf',
    '/projects/shree-venkatesh/brochure/Shree-Venkatesh-Park.pdf': '/brochures/shree-venkatesh-park-brochure.pdf',
    '/projects/shree-venkatesh/brochure': '/projects/shree-venkatesh-park/brochure/',
    '/projects/shree-venkatesh/brochure/': '/projects/shree-venkatesh-park/brochure/',

    '/brochures/shree-nath-enclave.pdf': '/brochures/shree-nath-enclave-brochure.pdf',
    '/projects/shree-nath-enclave/Shree-Nath-Enclave.pdf': '/brochures/shree-nath-enclave-brochure.pdf',
    '/projects/shree-nath-enclave/Shree-Nath-Enclave-Brochure.pdf': '/brochures/shree-nath-enclave-brochure.pdf',
    '/projects/shree-nath-enclave/brochure/Shree-Nath-Enclave-Brochure.pdf': '/brochures/shree-nath-enclave-brochure.pdf',
    '/projects/shree-nath-enclave/brochure/brochure.pdf': '/brochures/shree-nath-enclave-brochure.pdf',

    '/brochures/shree-neelkanth.pdf': '/brochures/shree-neelkanth-brochure.pdf',
    '/projects/shree-neelkanth/Shree-NeelKanth.pdf': '/brochures/shree-neelkanth-brochure.pdf',
    '/projects/shree-neelkanth/Shree-Neelkanth-Brochure.pdf': '/brochures/shree-neelkanth-brochure.pdf',
    '/projects/shree-neelkanth/brochure/Shree-Neelkanth-Brochure.pdf': '/brochures/shree-neelkanth-brochure.pdf',
    '/projects/shree-neelkanth/brochure/brochure.pdf': '/brochures/shree-neelkanth-brochure.pdf',

    '/brochures/shree-pandurang.pdf': '/brochures/shree-pandurang-brochure.pdf',
    '/projects/shree-pandurang/Shree-Pandurang.pdf': '/brochures/shree-pandurang-brochure.pdf',
    '/projects/shree-pandurang/Shree-Pandurag.pdf': '/brochures/shree-pandurang-brochure.pdf',
    '/projects/shree-pandurang/Shree-Pandurang-Brochure.pdf': '/brochures/shree-pandurang-brochure.pdf',
    '/projects/shree-pandurang/brochure/Shree-Pandurang-Brochure.pdf': '/brochures/shree-pandurang-brochure.pdf',
    '/projects/shree-pandurang/brochure/brochure.pdf': '/brochures/shree-pandurang-brochure.pdf',

    '/brochures/shree-malhar.pdf': '/brochures/shree-malhar-brochure.pdf',
    '/projects/shree-malhar/Shree-Malhar.pdf': '/brochures/shree-malhar-brochure.pdf',
    '/projects/shree-malhar/Shree-Malhar-Brochure.pdf': '/brochures/shree-malhar-brochure.pdf',
    '/projects/shree-malhar/brochure/Shree-Malhar-Brochure.pdf': '/brochures/shree-malhar-brochure.pdf',
    '/projects/shree-malhar/brochure/brochure.pdf': '/brochures/shree-malhar-brochure.pdf',

    '/brochures/shree-nandan.pdf': '/brochures/shree-nandan-brochure.pdf',
    '/projects/shree-nandan/Shree-Nandan.pdf': '/brochures/shree-nandan-brochure.pdf',
    '/projects/shree-nandan/Shree-Nandan-Brochure.pdf': '/brochures/shree-nandan-brochure.pdf',
    '/projects/shree-nandan/brochure/Shree-Nandan-Brochure.pdf': '/brochures/shree-nandan-brochure.pdf',
    '/projects/shree-nandan/brochure/brochure.pdf': '/brochures/shree-nandan-brochure.pdf',

    '/brochures/shree-anant.pdf': '/brochures/shree-anant-brochure.pdf',
    '/projects/shree-anant/Shree-Anant.pdf': '/brochures/shree-anant-brochure.pdf',
    '/projects/shree-anant/Shree-Anant-Brochure.pdf': '/brochures/shree-anant-brochure.pdf',
    '/projects/shree-anant/brochure/Shree-Anant-Brochure.pdf': '/brochures/shree-anant-brochure.pdf',
    '/projects/shree-anant/brochure/brochure.pdf': '/brochures/shree-anant-brochure.pdf',

    '/brochures/shree-niwas.pdf': '/brochures/shree-niwas-brochure.pdf',
    '/projects/shree-niwas/Shree-Niwas.pdf': '/brochures/shree-niwas-brochure.pdf',
    '/projects/shree-niwas/Shree-Niwas-Brochure.pdf': '/brochures/shree-niwas-brochure.pdf',
    '/projects/shree-niwas/brochure/Shree-Niwas-Brochure.pdf': '/brochures/shree-niwas-brochure.pdf',
    '/projects/shree-niwas/brochure/brochure.pdf': '/brochures/shree-niwas-brochure.pdf',

    '/brochures/shree-padma.pdf': '/brochures/shree-padma-brochure.pdf',
    '/projects/shree-padma/Shree-Padma.pdf': '/brochures/shree-padma-brochure.pdf',
    '/projects/shree-padma/Shree-Padma-Brochure.pdf': '/brochures/shree-padma-brochure.pdf',
    '/projects/shree-padma/brochure/Shree-Padma-Brochure.pdf': '/brochures/shree-padma-brochure.pdf',
    '/projects/shree-padma/brochure/brochure.pdf': '/brochures/shree-padma-brochure.pdf',

    '/brochures/shree-navashakti.pdf': '/brochures/shree-navashakti-brochure.pdf',
    '/brochures/shree-navshakti.pdf': '/brochures/shree-navashakti-brochure.pdf',
    '/projects/shree-navashakti/Shree-Navashakti.pdf': '/brochures/shree-navashakti-brochure.pdf',
    '/projects/shree-navashakti/Shree-Navashakti-Brochure.pdf': '/brochures/shree-navashakti-brochure.pdf',
    '/projects/shree-navashakti/brochure/Shree-Navashakti-Brochure.pdf': '/brochures/shree-navashakti-brochure.pdf',
    '/projects/shree-navashakti/brochure/brochure.pdf': '/brochures/shree-navashakti-brochure.pdf',
    '/projects/shree-navshakti/Shree-Navshakti.pdf': '/brochures/shree-navashakti-brochure.pdf',
    '/projects/shree-navshakti/Shree-Navshakti-Brochure.pdf': '/brochures/shree-navashakti-brochure.pdf',
    '/projects/shree-navshakti/brochure/Shree-Navshakti-Brochure.pdf': '/brochures/shree-navashakti-brochure.pdf',
    '/projects/shree-navshakti/brochure/brochure.pdf': '/brochures/shree-navashakti-brochure.pdf'
  };

  if (brochureRedirects[pathname]) {
    res.writeHead(301, { 'Location': brochureRedirects[pathname] });
    res.end();
    return;
  }

  let filePath = path.join(PUBLIC_DIR, pathname);

  // Check if directory
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      if (!pathname.endsWith('/')) {
        res.writeHead(301, { 'Location': pathname + '/' + (parsedUrl.search || '') });
        res.end();
        return;
      }
      filePath = path.join(filePath, 'index.html');
    }
  } catch (e) {}

  // If path has no extension and doesn't exist, check for [path]/index.html or [path].html
  const cleanPath = filePath.replace(/[/\\]+$/, '');
  if (!path.extname(cleanPath)) {
    const dirIndex = path.join(cleanPath, 'index.html');
    const htmlFile = cleanPath + '.html';
    if (fs.existsSync(dirIndex)) {
      filePath = dirIndex;
    } else if (fs.existsSync(htmlFile)) {
      filePath = htmlFile;
    }
  }

  // Check if file exists
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // Check if it might be an SPA route, fallback to root index.html
    const fallbackPath = path.join(PUBLIC_DIR, 'index.html');
    if (fs.existsSync(fallbackPath) && !path.extname(pathname)) {
      filePath = fallbackPath;
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const stat = fs.statSync(filePath);
    const totalSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
      const chunkSize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      const stream = fs.createReadStream(filePath, { start, end });
      stream.on('error', (err) => {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Stream Error: ' + err.message);
        }
      });
      res.on('close', () => {
        stream.destroy();
      });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': totalSize,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      const stream = fs.createReadStream(filePath);
      stream.on('error', (err) => {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Stream Error: ' + err.message);
        }
      });
      res.on('close', () => {
        stream.destroy();
      });
      stream.pipe(res);
    }
  } catch (err) {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Server Error: ' + err.message);
    }
  }
});

server.on('error', (err) => {
  console.error('HTTP Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception caught:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection caught:', reason);
});

if (process.env.VERCEL !== '1') {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

module.exports = server;
