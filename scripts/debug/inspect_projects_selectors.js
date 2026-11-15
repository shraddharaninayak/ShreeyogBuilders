const fs = require('fs');

const content = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const lines = content.split('\n');
lines.forEach((line, i) => {
  const trimmed = line.trim();
  if (trimmed.endsWith('{') && !trimmed.startsWith('@') && !trimmed.includes('.page-projects') && !trimmed.includes('.c-projects') && !trimmed.includes('.highlighted') && !trimmed.includes('.directory') && !trimmed.includes('header') && !trimmed.includes('.shreeyog-brand-logo') && !trimmed.includes('.menu')) {
    console.log(`Line ${i+1}: ${trimmed}`);
  }
});
