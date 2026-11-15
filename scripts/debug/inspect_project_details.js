const fs = require('fs');

const contactHtml = fs.readFileSync('d:/Shreeyogweb/public/contact/index.html', 'utf8');

const idx = contactHtml.indexOf('PROJECT');
if (idx !== -1) {
  console.log('--- In contact/index.html ---');
  console.log(contactHtml.substring(idx - 100, idx + 2000));
}

// Also check Bramhand brochure for details
const bHtml = fs.readFileSync('d:/Shreeyogweb/references/brochures/bramhand.html', 'utf8');
console.log('\n--- In bramhand.html sections ---');
const h2s = bHtml.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi) || [];
console.log('Headings in bramhand.html:', h2s.map(h => h.replace(/<[^>]+>/g, ' ').trim()));
