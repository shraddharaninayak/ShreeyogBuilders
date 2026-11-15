const fs = require('fs');

const p = 'scripts/updates/apply_balanced_contact_page.js';
if (fs.existsSync(p)) {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/\/\* 1\. HERO SECTION \(\.c-welcome\) \*\/\r?\n\.c-welcome\s*\{/g, '/* 1. HERO SECTION (.people-page .c-welcome) */\n.people-page .c-welcome {');
  c = c.replace(/\.c-welcome\s+\.figure-sculpture/g, '.people-page .c-welcome .figure-sculpture');
  c = c.replace(/\.c-welcome\s+-w/g, '.people-page .c-welcome -w');
  c = c.replace(/\.c-welcome\s+\.people-welcome-path/g, '.people-page .c-welcome .people-welcome-path');
  c = c.replace(/\.c-about\b/g, '.people-page .c-about');
  c = c.replace(/\.people-page\s+\.people-page\s+\.c-about/g, '.people-page .c-about');
  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated apply_balanced_contact_page.js template.');
}
