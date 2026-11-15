const fs = require('fs');

const pubHtml = fs.readFileSync('public/index.html', 'utf8');
const sections = [...pubHtml.matchAll(/<(section|footer)[^>]*class="([^"]*)"[^>]*>/gi)];
console.log('Pub all sections/footers:');
sections.forEach((s, i) => {
  console.log(`${i+1}. <${s[1]} class="${s[2]}">`);
});
