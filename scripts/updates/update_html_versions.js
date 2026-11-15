const fs = require('fs');
const path = require('path');

function findHtml(dir) {
  let res = [];
  for (let f of fs.readdirSync(dir, { withFileTypes: true })) {
    let p = path.join(dir, f.name);
    if (f.isDirectory()) res.push(...findHtml(p));
    else if (f.name.endsWith('.html')) res.push(p);
  }
  return res;
}

const htmlFiles = findHtml('public');

htmlFiles.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;

  if (c.includes('href="/_nuxt/shreeyog-navbar.css"')) {
    c = c.replace(/href="\/_nuxt\/shreeyog-navbar\.css"/g, 'href="/_nuxt/shreeyog-navbar.css?v=2.2"');
    changed = true;
  } else if (c.includes('href="/_nuxt/shreeyog-navbar.css?v=')) {
    c = c.replace(/href="\/_nuxt\/shreeyog-navbar\.css\?v=[^"]*"/g, 'href="/_nuxt/shreeyog-navbar.css?v=2.2"');
    changed = true;
  }

  if (c.includes('src="/_nuxt/shreeyog-navbar.js"')) {
    c = c.replace(/src="\/_nuxt\/shreeyog-navbar\.js"/g, 'src="/_nuxt/shreeyog-navbar.js?v=2.2"');
    changed = true;
  } else if (c.includes('src="/_nuxt/shreeyog-navbar.js?v=')) {
    c = c.replace(/src="\/_nuxt\/shreeyog-navbar\.js\?v=[^"]*"/g, 'src="/_nuxt/shreeyog-navbar.js?v=2.2"');
    changed = true;
  }

  if (c.includes('src="/_nuxt/entry.6ece3b7b.js"')) {
    c = c.replace(/src="\/_nuxt\/entry\.6ece3b7b\.js"/g, 'src="/_nuxt/entry.6ece3b7b.js?v=2.2"');
    changed = true;
  } else if (c.includes('src="/_nuxt/entry.6ece3b7b.js?v=')) {
    c = c.replace(/src="\/_nuxt\/entry\.6ece3b7b\.js\?v=[^"]*"/g, 'src="/_nuxt/entry.6ece3b7b.js?v=2.2"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, c, 'utf8');
    console.log('Updated cache query in:', f);
  }
});

console.log('Finished updating HTML cache busting queries.');
