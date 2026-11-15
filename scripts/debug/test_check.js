const fs = require('fs');
const origHtml = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');
const pubHtml = fs.readFileSync('public/index.html', 'utf8');
console.log('Orig has scroll="progress":', origHtml.includes('scroll="progress"'));
console.log('Orig has string="progress":', origHtml.includes('string="progress"'));
console.log('Pub has scroll="progress":', pubHtml.includes('scroll="progress"'));
console.log('Pub has string="progress":', pubHtml.includes('string="progress"'));

const origScrollMatches = (origHtml.match(/\bscroll\b/g) || []).length;
const origStringMatches = (origHtml.match(/\bstring\b/g) || []).length;
const pubScrollMatches = (pubHtml.match(/\bscroll\b/g) || []).length;
const pubStringMatches = (pubHtml.match(/\bstring\b/g) || []).length;
console.log('Orig scroll count:', origScrollMatches, 'string count:', origStringMatches);
console.log('Pub scroll count:', pubScrollMatches, 'string count:', pubStringMatches);
