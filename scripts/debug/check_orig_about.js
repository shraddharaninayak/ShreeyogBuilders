const fs = require('fs');

// Check test-orig or any references
const origAboutPath = 'public/test-orig/about/index.html';
if (fs.existsSync(origAboutPath)) {
  console.log('Found test-orig/about/index.html');
} else {
  console.log('Not in test-orig');
}
