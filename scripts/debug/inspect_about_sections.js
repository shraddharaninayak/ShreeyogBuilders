const fs = require('fs');

const about = fs.readFileSync('public/about/index.html', 'utf8');

const secRegex = /<section[^>]*class="([^"]*)"[^>]*>/g;
let m;
while ((m = secRegex.exec(about)) !== null) {
  console.log('Section:', m[1]);
}

// Print main content text snippets
const mainMatch = about.match(/<main[\s\S]*?<\/main>/);
if (mainMatch) {
  const text = mainMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('Main text length:', text.length);
  console.log('Snippet:', text.slice(0, 1000));
}
