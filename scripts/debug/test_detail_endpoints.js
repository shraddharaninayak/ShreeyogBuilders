const http = require('http');

const testSlugs = [
  '/projects/shree-bramhand',
  '/projects/shree-vishwa',
  '/projects/shree-safalya',
  '/projects/shree-malhar',
  '/projects/shree-swarup'
];

(async () => {
  for (const u of testSlugs) {
    http.get('http://localhost:3000' + u, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        console.log(`[${res.statusCode}] ${u} (${d.length} bytes, hasFooter: ${d.includes('main-footer-index')}, isReady: ${d.includes('-ready -loaded')})`);
      });
    });
  }
})();
