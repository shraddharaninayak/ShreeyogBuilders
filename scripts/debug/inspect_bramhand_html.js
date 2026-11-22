const fs = require('fs');

const html = fs.readFileSync('references/brochures/bramhand.html', 'utf8');

const imgs = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Images in bramhand.html:', [...new Set(imgs)]);

const links = [...html.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
console.log('\nLinks in bramhand.html:', [...new Set(links)]);

const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
console.log('\nNumber of script tags:', scripts.length);
scripts.forEach((s, i) => console.log(`Script ${i} length:`, s[1].length));
