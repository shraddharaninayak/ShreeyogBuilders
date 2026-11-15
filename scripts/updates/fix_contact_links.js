const fs = require('fs');

const files = [
  'public/about/index.html',
  'public/contact/index.html',
  'public/imagine-possible-policy/index.html',
  'public/index.html',
  'pages/about.html',
  'pages/contact.html',
  'pages/index.html',
  'public/_nuxt/default.ea02c3da.js',
  'public/_nuxt/MainFooter.a208a2b7.js'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    const countBefore = (c.match(/\/people/g) || []).length;
    // Replace href="/people" -> href="/contact"
    c = c.replace(/href="\/people"/g, 'href="/contact"');
    // Replace to:"/people" -> to:"/contact"
    c = c.replace(/to:"\/people"/g, 'to:"/contact"');
    fs.writeFileSync(f, c, 'utf8');
    const countAfter = (c.match(/\/people/g) || []).length;
    console.log(`Updated ${f}: ${countBefore} -> ${countAfter}`);
  }
});
