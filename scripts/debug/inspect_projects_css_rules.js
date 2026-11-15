const fs = require('fs');
const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

['body', 'main', '\\.page'].forEach(sel => {
  const reg = new RegExp(`(^|\\})([^{}]*${sel}[^{}]*)\\{([^}]+)\\}`, 'g');
  let m;
  while ((m = reg.exec(css)) !== null) {
    console.log(m[2].trim(), '-->', m[3].trim());
  }
});
