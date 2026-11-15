const fs = require('fs');

const html = fs.readFileSync('obsidianassembly.com/contact/index.html', 'utf8');

// Find the main or app container
const bodyStart = html.indexOf('<body');
const bodyEnd = html.indexOf('</body>');
const body = html.substring(bodyStart, bodyEnd + 7);

// Print body without large scripts or styles
const cleanBody = body
  .replace(/<style[\s\S]*?<\/style>/gi, '<!-- STYLE -->')
  .replace(/<script[\s\S]*?<\/script>/gi, '<!-- SCRIPT -->');

console.log(cleanBody.substring(0, 4000));
if (cleanBody.length > 4000) {
  console.log('\n... CONTINUED ...\n');
  console.log(cleanBody.substring(4000, 8000));
}
if (cleanBody.length > 8000) {
  console.log('\n... CONTINUED 2 ...\n');
  console.log(cleanBody.substring(8000, 12000));
}
