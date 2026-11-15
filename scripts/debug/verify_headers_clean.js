const fs = require('fs');

const files = [
  'public/index.html',
  'public/projects/index.html',
  'public/contact/index.html',
  'public/about/index.html'
];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const m = html.match(/<header[\s\S]*?<\/header>/);
  console.log(`=== Header in ${f} ===`);
  console.log(m ? m[0] : 'None');
  console.log('Includes send request:', m ? m[0].toLowerCase().includes('send request') : false);
});
