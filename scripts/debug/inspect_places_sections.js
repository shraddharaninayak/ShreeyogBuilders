const fs = require('fs');

const html = fs.readFileSync('d:/Shreeyogweb/public/places/index.html', 'utf8');

// Find all <section> tags in places/index.html
const sectionRegex = /<section[^>]*class="([^"]*)"[^>]*>/g;
let match;
console.log('--- Sections in places/index.html ---');
while ((match = sectionRegex.exec(html)) !== null) {
  console.log('Section class:', match[1]);
}

// Find main headings / h1, h2, titles
const headingRegex = /<(h[1-6]|span|div)[^>]*class="[^"]*(title|headline|label)[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi;
console.log('\n--- Titles / Headlines in places/index.html ---');
let count = 0;
while ((match = headingRegex.exec(html)) !== null && count < 25) {
  const clean = match[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (clean.length > 0 && clean.length < 150) {
    console.log(`[${match[2]}] ${clean}`);
    count++;
  }
}
