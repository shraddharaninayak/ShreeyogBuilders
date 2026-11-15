const http = require('http');

const urls = [
  '/',
  '/projects',
  '/places',
  '/_nuxt/places.b37ae0d8.js',
  '/_nuxt/default.ea02c3da.js',
  '/_nuxt/entry.6ece3b7b.js',
  '/_nuxt/shreeyog-projects.css'
];

async function checkUrl(u) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + u, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url: u, status: res.statusCode, length: data.length });
      });
    }).on('error', err => reject(err));
  });
}

(async () => {
  for (const u of urls) {
    try {
      const res = await checkUrl(u);
      console.log(`[${res.status}] ${res.url} (${res.length} bytes)`);
    } catch (e) {
      console.error(`ERROR fetching ${u}:`, e.message);
    }
  }
})();
