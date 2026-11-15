const fs = require('fs');

const contactCss = fs.readFileSync('public/_nuxt/shreeyog-contact.css', 'utf8');

// Ensure clean two-column suite on desktop and robust width
const updatedCss = contactCss
  // Fix .c-about .-w to ensure it spans full container width
  .replace(/\.c-about \.-w\s*\{[\s\S]*?\}/, `.c-about .-w {
  display: block !important;
  width: 100% !important;
  max-width: 1360px !important;
  margin: 0 auto !important;
  padding: 0 clamp(1.5rem, 4vw, 3.5rem) !important;
  box-sizing: border-box !important;
  position: relative !important;
  z-index: 10 !important;
}`)
  // Ensure .shreeyog-contact-two-column-suite uses full width
  .replace(/\.shreeyog-contact-two-column-suite\s*\{[\s\S]*?\}/, `.shreeyog-contact-two-column-suite {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr) !important;
  gap: clamp(2.5rem, 5vw, 5rem) !important;
  align-items: start !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}`)
  // Ensure form fields use 100% width and do not clip
  .replace(/\.contact-glass-card\s*\{[\s\S]*?\}/, `.contact-glass-card {
  background: rgba(28, 27, 28, 0.72) !important;
  border: 1px solid rgba(198, 167, 106, 0.28) !important;
  border-radius: 0.75rem !important;
  padding: clamp(2rem, 3.5vw, 3rem) !important;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(198, 167, 106, 0.08) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}`);

fs.writeFileSync('public/_nuxt/shreeyog-contact.css', updatedCss);
if (fs.existsSync('obsidianassembly.com/_nuxt/shreeyog-contact.css')) {
  fs.writeFileSync('obsidianassembly.com/_nuxt/shreeyog-contact.css', updatedCss);
}
console.log('✓ Successfully refined shreeyog-contact.css');
