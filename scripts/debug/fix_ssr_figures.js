const fs = require('fs');

function fixFigures(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Object 4
  html = html.replace(
    /<figure class="" data-v-99613b87 data-v-ec47b9e2><img[^>]*object-4\.webp[^>]*><!----><\/figure>/,
    '<figure class="" data-v-99613b87 data-v-ec47b9e2><img string="lazy" string-lazy="/images/objects-init/object-4.webp" alt="Shreeyog Builders & Land Developers" data-v-ec47b9e2><!----></figure>'
  );

  // Object 1
  html = html.replace(
    /<figure class="" data-v-99613b87 data-v-ec47b9e2><img[^>]*object-1\.webp[^>]*><!----><\/figure>/,
    '<figure class="" data-v-99613b87 data-v-ec47b9e2><img string="lazy" string-lazy="/images/objects-init/object-1.webp" alt="Shreeyog Builders & Land Developers" data-v-ec47b9e2><!----></figure>'
  );

  // Object 2
  html = html.replace(
    /<figure class="" data-v-99613b87 data-v-ec47b9e2><img[^>]*object-2\.webp[^>]*><!----><\/figure>/,
    '<figure class="" data-v-99613b87 data-v-ec47b9e2><img string="lazy" string-lazy="/images/objects-init/object-2.webp" alt="Shreeyog Builders & Land Developers" data-v-ec47b9e2><!----></figure>'
  );

  // Object 3
  html = html.replace(
    /<figure class="" data-v-99613b87 data-v-ec47b9e2><img[^>]*object-3\.webp[^>]*><!----><\/figure>/,
    '<figure class="" data-v-99613b87 data-v-ec47b9e2><img string="lazy" string-lazy="/images/objects-init/object-3.webp" alt="Shreeyog Builders & Land Developers" data-v-ec47b9e2><!----></figure>'
  );

  // Connection living room
  html = html.replace(
    /<figure class="-fit" string="progress" data-v-f3038ea5 data-v-ec47b9e2><img[^>]*living-room\.webp[^>]*><\/figure>/,
    '<figure class="-fit" string="progress" data-v-f3038ea5 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/living-room.webp" alt="Shreeyog Residential Interior" data-v-ec47b9e2><!----></figure>'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Fixed figures in', filePath);
}

fixFigures('public/index.html');
if (fs.existsSync('pages/index.html')) {
  fixFigures('pages/index.html');
}
