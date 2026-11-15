const fs = require('fs');

const origHtml = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');
const pubHtml = fs.readFileSync('public/index.html', 'utf8');

// Find all HTML tags in orig with 'string' attribute
const origTags = [...origHtml.matchAll(/<([a-z0-9-]+)[^>]*\bstring(-[a-z0-9-]+)?(\s*=\s*"[^"]*")?[^>]*>/gi)];
console.log('Total elements with string attribute in Orig:', origTags.length);

const pubTags = [...pubHtml.matchAll(/<([a-z0-9-]+)[^>]*\bstring(-[a-z0-9-]+)?(\s*=\s*"[^"]*")?[^>]*>/gi)];
console.log('Total elements with string attribute in Pub:', pubTags.length);

// Let's inspect sections in orig vs pub
const getSections = (html) => {
  const re = /<(section|div)[^>]+class="([^"]*(?:c-[a-z0-9-]+|hero|banner|footer|sticky|sequence)[^"]*)"[^>]*>/gi;
  const sections = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    sections.push({ tag: m[1], class: m[2] });
  }
  return sections;
};

console.log('\n--- Orig Key Elements ---');
console.log(getSections(origHtml).map(s => `${s.tag}.${s.class}`).slice(0, 30));

console.log('\n--- Pub Key Elements ---');
console.log(getSections(pubHtml).map(s => `${s.tag}.${s.class}`).slice(0, 30));
