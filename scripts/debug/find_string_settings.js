const fs = require('fs');

const html = fs.readFileSync('obsidianassembly.com/index.html', 'utf8');

// Find stringTune or settings script
const regex = /string[Tt]une|window\.__STRING/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('Match at', match.index, ':', html.slice(Math.max(0, match.index - 50), Math.min(html.length, match.index + 200)));
}

// Find any inline script with settings
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
while ((match = scriptRegex.exec(html)) !== null) {
  const code = match[1];
  if (code.includes('queries') || code.includes('mobile') || code.includes('breakpoints')) {
    console.log('Script block:', code.slice(0, 300));
  }
}
