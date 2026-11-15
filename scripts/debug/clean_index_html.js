const fs = require('fs');

function cleanHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const initialLength = html.length;

  // 1. Remove <style id="shreeyog-homepage-flow-css">...</style>
  html = html.replace(/<style id="shreeyog-homepage-flow-css"[\s\S]*?<\/style>\s*/gi, '');

  // 2. Remove <script id="shreeyog-homepage-guardian">...</script>
  html = html.replace(/<script id="shreeyog-homepage-guardian"[\s\S]*?<\/script>\s*/gi, '');

  // 3. Remove duplicate Script 3 (initShreeyogMap)
  html = html.replace(/<script>\s*\(function\(\)\s*\{\s*function initShreeyogMap\(\)[\s\S]*?<\/script>\s*/gi, '');

  // Backup file
  fs.writeFileSync(filePath + '.bak', fs.readFileSync(filePath, 'utf8'), 'utf8');
  fs.writeFileSync(filePath, html, 'utf8');

  console.log(`Cleaned ${filePath}: ${initialLength} -> ${html.length}`);
}

cleanHtml('public/index.html');
if (fs.existsSync('pages/index.html')) {
  cleanHtml('pages/index.html');
}
