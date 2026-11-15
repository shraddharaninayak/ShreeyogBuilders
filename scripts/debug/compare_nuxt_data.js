const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const origHtml = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');

function getNuxtData(h) {
  const m = h.match(/<script type="application\/json" id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  return m ? m[1] : null;
}

console.log('Orig Nuxt Data length:', getNuxtData(origHtml)?.length);
console.log('Curr Nuxt Data length:', getNuxtData(html)?.length);
console.log('Equal:', getNuxtData(origHtml) === getNuxtData(html));
