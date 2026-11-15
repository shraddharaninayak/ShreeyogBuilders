const fs = require('fs');
const path = require('path');

const dir = 'public/_nuxt';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.css'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('.c-welcome') || line.includes('line-1-m') || line.includes('line-2-m') || line.includes('span.line-1')) {
      console.log(`[${file}:${idx + 1}] ${line.substring(0, 150)}`);
    }
  });
}
