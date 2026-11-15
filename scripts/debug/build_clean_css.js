const fs = require('fs');
const origCss = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.a596e4a8.css', 'utf8');
const appended = fs.readFileSync('scripts/debug/appended_css.css', 'utf8');
const lines = appended.split('\n');

// lines 0 to 302 (1-based lines 1 to 302)
const keepAppended = lines.slice(0, 303).join('\n');

const cardCleanCss = `
/* --- Shreeyog The Art of Living Building Cards Presentation --- */
.c-objects .-w .sequence .object-wrapper figure {
  border-radius: .4rem;
  overflow: hidden;
}
.c-objects .-w .sequence .object-wrapper figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
`;

const cleanCss = origCss + '\n' + keepAppended.trim() + '\n' + cardCleanCss.trim() + '\n';
fs.writeFileSync('scripts/debug/clean_index.css', cleanCss, 'utf8');
console.log('Original CSS length:', origCss.length);
console.log('Cleaned CSS length:', cleanCss.length);
