const fs = require('fs');

let css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const logoCss = `
/* Shreeyog Brand Logo Styles */
.shreeyog-brand-logo {
  height: clamp(38px, 4.5vw, 54px) !important;
  width: auto !important;
  max-width: 240px !important;
  object-fit: contain !important;
  display: block !important;
  margin-top: -2px !important;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45)) !important;
  transition: transform 0.3s ease, filter 0.3s ease !important;
}

.shreeyog-brand-logo:hover {
  transform: scale(1.02) !important;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.55)) !important;
}

@media (max-width: 900px) {
  .shreeyog-brand-logo {
    height: 44px !important;
    max-width: 180px !important;
  }
}

@media (max-width: 600px) {
  .shreeyog-brand-logo {
    height: 38px !important;
    max-width: 150px !important;
  }
}

.footer-shreeyog-brand-logo {
  width: clamp(170px, 18vw, 225px) !important;
  height: auto !important;
  max-width: 100% !important;
  object-fit: contain !important;
  display: block !important;
  filter: brightness(1.18) contrast(1.12) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6)) !important;
  transition: opacity 0.3s ease !important;
}
`;

if (!css.includes('.shreeyog-brand-logo')) {
  css += '\n' + logoCss;
  fs.writeFileSync('public/_nuxt/shreeyog-projects.css', css, 'utf8');
  console.log('Appended brand logo styles to public/_nuxt/shreeyog-projects.css');
} else {
  console.log('Already present');
}
