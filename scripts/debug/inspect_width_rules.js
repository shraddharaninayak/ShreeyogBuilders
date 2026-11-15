const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/default.dc95e376.css', 'utf8');

// search for body, html, #ImaginePossible, .-w, .page
['body', 'html', '#ImaginePossible', '\\.-w', '\\.page', '\\.home-page'].forEach(sel => {
  const reg = new RegExp(`(^|\\})([^{}]*${sel}[^{}]*)\\{([^}]+)\\}`, 'g');
  let m;
  while ((m = reg.exec(css)) !== null) {
    if (m[3].includes('width') || m[3].includes('max-width') || m[3].includes('columns')) {
      console.log(m[2].trim(), '-->', m[3].trim().substring(0, 100));
    }
  }
});
