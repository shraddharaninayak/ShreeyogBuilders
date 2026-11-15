const fs = require('fs');

const about = fs.readFileSync('public/about/index.html', 'utf8');

console.log('Title:', about.match(/<title>([^<]*)<\/title>/)?.[1]);
console.log('h1/h2 headings:', about.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g));

// Check for Obsidian Assembly in about
const obsidianMatches = about.match(/Obsidian[A-Za-z0-9\s]*/gi);
console.log('Obsidian matches in public/about/index.html:', obsidianMatches);
