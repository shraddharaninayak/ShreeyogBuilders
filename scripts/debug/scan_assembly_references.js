const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  let results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) {
      if (d.name !== 'node_modules' && d.name !== '.git') {
        results = results.concat(scanDir(full));
      }
    } else if (/\.(html|js|json|css)$/i.test(d.name)) {
      results.push(full);
    }
  });
  return results;
}

const files = scanDir('public');
const findings = [];
const regex = /\bassembly\b/gi;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  let matches = [];
  while ((match = regex.exec(content)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(content.length, match.index + 60);
    matches.push(content.slice(start, end).replace(/\s+/g, ' '));
    if (matches.length >= 5) break;
  }
  if (matches.length > 0) {
    findings.push({ file: f, matches });
  }
});

console.log(`Found ${findings.length} files with 'assembly' references:`);
findings.forEach(f => {
  console.log(`\n--- ${f.file} (${f.matches.length} occurrences) ---`);
  f.matches.forEach(m => console.log('  ...', m, '...'));
});
