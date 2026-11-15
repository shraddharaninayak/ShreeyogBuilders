const fs = require('fs');

const html = fs.readFileSync('public/contact/index.html', 'utf8');
const m = html.match(/<style id="shreeyog-contact-custom-styles">([\s\S]*?)<\/style>/);
if (m) {
  console.log('Found custom css! Length:', m[1].length);
  fs.writeFileSync('scripts/debug/extracted_contact_css.css', m[1], 'utf8');
  console.log('Saved to scripts/debug/extracted_contact_css.css');
} else {
  console.log('Not found custom styles tag.');
  const styles = html.match(/<style[^>]*>[\s\S]*?<\/style>/g);
  console.log('All styles count:', styles ? styles.length : 0);
  if (styles) {
    styles.forEach((s, idx) => console.log('Style ' + idx + ':', s.slice(0, 100)));
  }
}
