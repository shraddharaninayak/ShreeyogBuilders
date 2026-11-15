const fs = require('fs');

['public/index.html', 'pages/index.html'].forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let c = fs.readFileSync(filePath, 'utf8');
  for (let i = 1; i <= 4; i++) {
    const target = 'string-lazy="/images/objects-init/object-' + i + '.webp"';
    const repl = 'src="/images/objects-init/object-' + i + '.webp" string-lazy="/images/objects-init/object-' + i + '.webp" loading="eager"';
    c = c.replace(target, repl);
  }
  fs.writeFileSync(filePath, c, 'utf8');
  console.log('Patched img tags in:', filePath);
});
