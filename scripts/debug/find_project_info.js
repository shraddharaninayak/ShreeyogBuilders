const fs = require('fs');
const path = require('path');

function searchForProjects(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      searchForProjects(fullPath);
    } else if (/\.(html|js|json|txt|md)$/i.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const keywords = ['bramhand', 'vishwa', 'safalya', 'neelkanth', 'padma', 'anant', 'niwas', 'nath enclave', 'navshakti', 'swarup', 'pandurang', 'nandan', 'venkatesh', 'malhar', 'samruddhi'];
      const found = keywords.filter(k => content.toLowerCase().includes(k));
      if (found.length >= 3) {
        console.log(`File: ${fullPath} (matched: ${found.join(', ')})`);
      }
    }
  }
}

searchForProjects('d:/Shreeyogweb');
