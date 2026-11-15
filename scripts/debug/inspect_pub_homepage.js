const fs = require('fs');

const pubHtml = fs.readFileSync('public/index.html', 'utf8');

const mainMatch = pubHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (!mainMatch) {
  console.log('No main tag found in public/index.html!');
} else {
  const mainContent = mainMatch[1];
  console.log('Main length:', mainContent.length);
  const sections = [...mainContent.matchAll(/<section[^>]+class="([^"]*)"[^>]*>/gi)];
  console.log('Sections in pub main:');
  sections.forEach((s, i) => console.log(`${i+1}. class="${s[1]}"`));
}
