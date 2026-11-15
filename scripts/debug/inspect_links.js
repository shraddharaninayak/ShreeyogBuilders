const fs = require('fs');

const files = [
  'public/index.html',
  'public/about/index.html',
  'public/contact/index.html',
  'public/projects/index.html',
  'public/projects/shree-venkatesh.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const html = fs.readFileSync(f, 'utf8');
    const links = html.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || [];
    console.log('===', f, '===');
    links.forEach(l => console.log('  ', l));
  }
});
