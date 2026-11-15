const fs = require('fs');

const origHtml = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');
const pubHtml = fs.readFileSync('public/index.html', 'utf8');

const origIdx = origHtml.indexOf('<section class="c-objects');
const origEnd = origHtml.indexOf('</section>', origIdx);
const origChunk = origHtml.slice(origIdx, origEnd + 10);

const pubIdx = pubHtml.indexOf('<section class="c-objects');
const pubEnd = pubHtml.indexOf('</section>', pubIdx);
const pubChunk = pubHtml.slice(pubIdx, pubEnd + 10);

console.log('Original c-objects length:', origChunk.length);
console.log('Public c-objects length:', pubChunk.length);

// Let's inspect the tags / structure
function getTagStructure(html) {
  const matches = html.match(/<[a-zA-Z0-9\-]+[^>]*>/g) || [];
  return matches.map(m => {
    const tagName = m.match(/<([a-zA-Z0-9\-]+)/)[1];
    const classMatch = m.match(/class="([^"]*)"/);
    const idMatch = m.match(/string-id="([^"]*)"/);
    const stringMatch = m.match(/string(?:="([^"]*)")?/);
    return `${tagName} class="${classMatch ? classMatch[1] : ''}" id="${idMatch ? idMatch[1] : ''}"`;
  });
}

const origTags = getTagStructure(origChunk);
const pubTags = getTagStructure(pubChunk);

console.log('Original tags count:', origTags.length);
console.log('Public tags count:', pubTags.length);

for (let i = 0; i < Math.max(origTags.length, pubTags.length); i++) {
  if (origTags[i] !== pubTags[i]) {
    console.log(`Diff at ${i}:`);
    console.log('  ORIG:', origTags[i]);
    console.log('  PUB: ', pubTags[i]);
  }
}
