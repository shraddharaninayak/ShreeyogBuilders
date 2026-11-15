const fs = require('fs');

const updateFiles = fs.readdirSync('scripts/updates');
updateFiles.forEach(f => {
  const content = fs.readFileSync('scripts/updates/' + f, 'utf8');
  if (content.includes('send request') || content.includes('Send Request') || content.includes('button.request')) {
    console.log('Script includes request button:', f);
  }
});
