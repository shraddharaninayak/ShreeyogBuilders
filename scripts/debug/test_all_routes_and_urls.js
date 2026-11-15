const http = require('http');

const BASE_URL = 'http://localhost:3000';

function fetchUrl(pathname) {
  return new Promise((resolve, reject) => {
    http.get(BASE_URL + pathname, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          length: data.length
        });
      });
    }).on('error', reject);
  });
}

const tests = [
  // Core pages
  { path: '/', expectedCode: 200, name: 'Homepage' },
  { path: '/about', expectedCode: 200, name: 'About Page' },
  { path: '/projects', expectedCode: 200, name: 'Projects Page' },
  { path: '/contact', expectedCode: 200, name: 'Contact Page' },
  { path: '/imagine-possible-policy', expectedCode: 200, name: 'Policy Page' },

  // All 15 individual project detail pages
  { path: '/projects/shree-anant', expectedCode: 200, name: 'Detail: Shree Anant' },
  { path: '/projects/shree-bramhand', expectedCode: 200, name: 'Detail: Shree Bramhand' },
  { path: '/projects/shree-malhar', expectedCode: 200, name: 'Detail: Shree Malhar' },
  { path: '/projects/shree-nandan', expectedCode: 200, name: 'Detail: Shree Nandan' },
  { path: '/projects/shree-nath-enclave', expectedCode: 200, name: 'Detail: Shree Nath Enclave' },
  { path: '/projects/shree-navshakti', expectedCode: 200, name: 'Detail: Shree Navshakti' },
  { path: '/projects/shree-neelkanth', expectedCode: 200, name: 'Detail: Shree Neelkanth' },
  { path: '/projects/shree-niwas', expectedCode: 200, name: 'Detail: Shree Niwas' },
  { path: '/projects/shree-padma', expectedCode: 200, name: 'Detail: Shree Padma' },
  { path: '/projects/shree-pandurang', expectedCode: 200, name: 'Detail: Shree Pandurang' },
  { path: '/projects/shree-safalya', expectedCode: 200, name: 'Detail: Shree Safalya' },
  { path: '/projects/shree-samruddhi-park', expectedCode: 200, name: 'Detail: Shree Samruddhi Park' },
  { path: '/projects/shree-swarup', expectedCode: 200, name: 'Detail: Shree Swarup' },
  { path: '/projects/shree-venkatesh', expectedCode: 200, name: 'Detail: Shree Venkatesh' },
  { path: '/projects/shree-vishwa', expectedCode: 200, name: 'Detail: Shree Vishwa' },

  // Legacy redirects
  { path: '/places', expectedCode: 301, expectedLocation: '/projects', name: 'Redirect: /places' },
  { path: '/people', expectedCode: 301, expectedLocation: '/about', name: 'Redirect: /people' },
  { path: '/objects', expectedCode: 301, expectedLocation: '/projects', name: 'Redirect: /objects' },
  { path: '/services', expectedCode: 301, expectedLocation: '/projects', name: 'Redirect: /services' },

  // Key assets
  { path: '/_nuxt/default.dc95e376.css', expectedCode: 200, name: 'Asset: default.css' },
  { path: '/_nuxt/shreeyog-projects.css', expectedCode: 200, name: 'Asset: projects.css' },
  { path: '/images/shreeyog/logo-hero.png', expectedCode: 200, name: 'Asset: logo-hero.png' },
  { path: '/images/about/shreeyog-landmark.webp', expectedCode: 200, name: 'Asset: landmark.webp' },
  { path: '/favicon.ico', expectedCode: 200, name: 'Asset: favicon.ico' }
];

async function runAll() {
  console.log('--- Running Route & Asset Verification ---');
  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    try {
      const res = await fetchUrl(t.path);
      const codeMatch = res.statusCode === t.expectedCode;
      let locMatch = true;
      if (t.expectedLocation) {
        locMatch = res.headers.location === t.expectedLocation;
      }

      if (codeMatch && locMatch) {
        console.log(`[PASS] ${t.name} (${t.path}) -> ${res.statusCode} ${t.expectedLocation ? '-> ' + res.headers.location : ''} (${res.length} bytes)`);
        passed++;
      } else {
        console.error(`[FAIL] ${t.name} (${t.path}) -> got ${res.statusCode}, expected ${t.expectedCode}`);
        failed++;
      }
    } catch (e) {
      console.error(`[ERROR] ${t.name} (${t.path}): ${e.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed out of ${tests.length} tests.`);
}

runAll();
