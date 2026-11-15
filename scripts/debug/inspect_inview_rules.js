const fs = require('fs');

function findInviewRules(filePath) {
  if (!fs.existsSync(filePath)) return;
  const css = fs.readFileSync(filePath, 'utf8');
  console.log('=== Inview rules in', filePath, '===');
  const regex = /[^{}]*-inview[^{}]*\{[^}]*\}/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    if (match[0].includes('welcome') || match[0].includes('stone') || match[0].includes('line-') || match[0].includes('places') || match[0].includes('items')) {
      console.log(match[0]);
    }
  }
}

findInviewRules('public/_nuxt/index.a596e4a8.css');
findInviewRules('public/_nuxt/default.dc95e376.css');
findInviewRules('public/index.html');
findInviewRules('references/obsidian_original/obsidianassembly.com/_nuxt/index.a596e4a8.css');
