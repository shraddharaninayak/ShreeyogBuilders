const fs = require('fs');
let raw = fs.readFileSync('scripts/debug/subagent_report.txt', 'utf8');

if (raw.startsWith('"') && raw.endsWith('"')) {
  raw = raw.slice(1, -1);
}
let cleaned = raw
  .replace(/\\r\\n/g, '\n')
  .replace(/\\n/g, '\n')
  .replace(/\\"/g, '"')
  .replace(/\\\\/g, '\\');

fs.writeFileSync('scripts/debug/subagent_report_clean.txt', cleaned, 'utf8');
console.log('Done cleaning, length:', cleaned.length);
