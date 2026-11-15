const fs = require('fs');

function scopeFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  console.log(`Processing ${filePath}...`);

  // 1. Scope .c-welcome rules to .people-page .c-welcome
  content = content.replace(/\.c-welcome\b/g, '.people-page .c-welcome');

  // Fix any accidental double prefix if .people-page was already before it
  content = content.replace(/\.people-page\s+\.people-page\s+\.c-welcome/g, '.people-page .c-welcome');

  // 2. Scope .c-about rules to .people-page .c-about
  content = content.replace(/\.c-about\b/g, '.people-page .c-about');
  content = content.replace(/\.people-page\s+\.people-page\s+\.c-about/g, '.people-page .c-about');

  // 3. Scope .c-cta to .people-page .c-cta
  content = content.replace(/\.c-cta\b/g, '.people-page .c-cta');
  content = content.replace(/\.people-page\s+\.people-page\s+\.c-cta/g, '.people-page .c-cta');

  // 4. Scope header rules at the end of the file to .people-page header
  // Lines that start with header or header.-scrolled or header .-w
  // But wait: header is a sibling of <main class="people-page">, or child of #ImaginePossible!
  // In contact page HTML:
  // <body class="-imagine-possible"><div id="ImaginePossible"><main class="page people-page">...</main><header>...
  // So body:has(.people-page) header or .-imagine-possible header:
  content = content.replace(/(?:\r?\n)(header(?:[^{]*)\{)/g, '\nbody:has(.people-page) $1');
  // Fix double body:has(.people-page)
  content = content.replace(/body:has\(\.people-page\)\s+body:has\(\.people-page\)/g, 'body:has(.people-page)');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully scoped ${filePath}`);
}

scopeFile('public/_nuxt/people.39d410f5.css');
scopeFile('public/_nuxt/shreeyog-contact.css');
