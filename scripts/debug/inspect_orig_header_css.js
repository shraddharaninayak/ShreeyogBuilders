const fs = require('fs');
const css = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/default.dc95e376.css', 'utf8');

// Find all rules starting with header or .menu
const rules = css.split('}');
const headerRules = rules.filter(r => r.includes('header') || r.includes('menu-wrap') || r.includes('menu-icon') || r.includes('.button'));
console.log('Original Header Rules:');
headerRules.forEach(r => console.log(r.trim() + '}'));
