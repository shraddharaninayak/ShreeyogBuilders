const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

// Search for places-gallery or c-places styles in index.html
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
for (let i = 0; i < styles.length; i++) {
  if (styles[i].includes('c-places') || styles[i].includes('sticky-container') || styles[i].includes('places-story')) {
    console.log(`Style ${i} has c-places: length ${styles[i].length}`);
    const matches = [...styles[i].matchAll(/[^{}]*c-places[^{]*\{[^}]*\}/gi)].map(m => m[0]);
    console.log(matches.slice(0, 10));
  }
}

// Also check _nuxt CSS files
const nuxtCssDir = 'public/_nuxt';
fs.readdirSync(nuxtCssDir).filter(f => f.endsWith('.css')).forEach(f => {
  const css = fs.readFileSync(nuxtCssDir + '/' + f, 'utf8');
  if (css.includes('c-places') || css.includes('sequence-container')) {
    console.log(`Nuxt CSS ${f} has c-places`);
  }
});
