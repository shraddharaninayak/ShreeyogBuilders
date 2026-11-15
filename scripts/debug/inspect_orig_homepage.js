const fs = require('fs');

const origHtml = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');

// Find all top-level sections in main
const mainMatch = origHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (!mainMatch) {
  console.log('No main tag found!');
} else {
  const mainContent = mainMatch[1];
  console.log('Main length:', mainContent.length);
  // Match direct children sections/divs
  const sections = [...mainContent.matchAll(/<section[^>]+class="([^"]*)"[^>]*>/gi)];
  console.log('Sections in orig main:');
  sections.forEach((s, i) => console.log(`${i+1}. class="${s[1]}"`));
}
