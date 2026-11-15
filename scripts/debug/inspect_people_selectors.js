const fs = require('fs');

const content = fs.readFileSync('public/_nuxt/people.39d410f5.css', 'utf8');

// Parse rules or find lines that look like selectors (ends with {)
const lines = content.split('\n');
lines.forEach((line, i) => {
  const trimmed = line.trim();
  if (trimmed.endsWith('{') && !trimmed.startsWith('@') && !trimmed.includes('.people-page') && !trimmed.includes('body:has(.people-page)')) {
    console.log(`Line ${i+1}: ${trimmed}`);
  }
});
