const fs = require('fs');

const html = fs.readFileSync('obsidianassembly.com/index.html', 'utf8');

for (let n = 1; n <= 6; n++) {
  const marker = `class="-fit i i-${n}"`;
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    const endFig = html.indexOf('</figure>', idx);
    console.log(`[i-${n}]:`, html.slice(idx, endFig + 9));
  } else {
    console.log(`[i-${n}] not found`);
  }
}
