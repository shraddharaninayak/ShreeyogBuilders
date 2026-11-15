const fs = require('fs');
if (fs.existsSync('scripts/debug/verify_headers_clean.js')) {
  console.log('=== verify_headers_clean.js ===');
  console.log(fs.readFileSync('scripts/debug/verify_headers_clean.js', 'utf8'));
}
if (fs.existsSync('scripts/debug/inspect_places_header_footer.js')) {
  console.log('=== inspect_places_header_footer.js ===');
  console.log(fs.readFileSync('scripts/debug/inspect_places_header_footer.js', 'utf8'));
}
