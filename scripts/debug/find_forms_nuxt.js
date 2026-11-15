const fs = require('fs');

const dir = 'obsidianassembly.com/_nuxt';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
for (const f of files) {
  const content = fs.readFileSync(dir + '/' + f, 'utf8');
  if (content.includes('form') || content.includes('input') || content.includes('BaseInput')) {
    console.log(f, 'has form/input reference');
  }
}
