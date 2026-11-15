const fs = require('fs');

const html = fs.readFileSync('public/contact/index.html', 'utf8');

// Find all sections or major blocks
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (bodyMatch) {
  const body = bodyMatch[1];
  // extract sections
  const sections = [];
  const secRegex = /<section[^>]*class="([^"]*)"[^>]*>/g;
  let match;
  while ((match = secRegex.exec(body)) !== null) {
    sections.push({ class: match[1], index: match.index });
  }
  console.log('Sections found:', sections);
}
