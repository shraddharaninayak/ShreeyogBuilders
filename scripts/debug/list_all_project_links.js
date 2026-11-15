const fs = require('fs');

const html = fs.readFileSync('public/projects/index.html', 'utf8');

// Find all <a> tags
const aTags = [];
const regex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  aTags.push({
    href: m[1],
    text: m[2].replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' '),
    raw: m[0].slice(0, 150)
  });
}

console.log(`Total <a> tags in public/projects/index.html: ${aTags.length}`);
aTags.forEach((a, i) => {
  console.log(`[${i}] href="${a.href}" | text="${a.text}"`);
});
