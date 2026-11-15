const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places_snippet.js', 'utf8');

// Find where E is defined in the render function or imports of c-places
const renderMatch = orig.match(/\(f,\s*p\)\s*=>\s*\{([\s\S]*?)\}\s*\}\s*;\s*const/);
if (renderMatch) {
  console.log('Render function of c-places:');
  console.log(renderMatch[1].substring(0, 500));
} else {
  // search for const ... in c-places
  console.log('Looking for E in snippet:');
  const idx = orig.indexOf('options:ie');
  console.log(orig.substring(idx - 150, idx + 100));
}
