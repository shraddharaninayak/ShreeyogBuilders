const fs = require('fs');

let html = fs.readFileSync('D:/Shreeyogweb/obsidianassembly.com/index.html', 'utf8');

const target = `/* Remove unused spacing when SEEK ADMISSION button is removed */
.c-welcome .-w .cta[data-v-6c6a6d99] {
  text-align: center !important;
  justify-self: center !important;
}
.c-welcome .-w .cta .-hp[data-v-6c6a6d99] {
  margin-bottom: 0 !important;
}
.c-welcome .-w .cta button,
.c-welcome .-w button:has(span:contains("Seek Admission")),
button[data-v-f52f19c3]:has(span.text:contains("Seek Admission")) {
  display: none !important;
}`;

const cleanCss = `/* Clean hero CTA caption layout without CTA button */
.c-welcome .-w .cta[data-v-6c6a6d99] {
  text-align: center !important;
  justify-self: center !important;
}
.c-welcome .-w .cta .-hp[data-v-6c6a6d99] {
  margin-bottom: 0 !important;
}
.c-welcome .-w .cta button {
  display: none !important;
}`;

if (html.includes(target)) {
  html = html.replace(target, cleanCss);
  fs.writeFileSync('D:/Shreeyogweb/obsidianassembly.com/index.html', html, 'utf8');
  console.log('Cleaned CSS in index.html');
} else {
  console.log('Target CSS not found in index.html');
}
