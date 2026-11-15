const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

// Find differences block by block
let pOrig = 0;
let pCurr = 0;
let diffCount = 0;

while (pOrig < origJs.length && pCurr < currJs.length) {
  if (origJs[pOrig] === currJs[pCurr]) {
    pOrig++;
    pCurr++;
  } else {
    diffCount++;
    // find next sync point
    const origSnippet = origJs.slice(pOrig, pOrig + 30);
    const currSnippet = currJs.slice(pCurr, pCurr + 30);
    
    // Look ahead 20 chars in orig to find match in curr
    let syncFound = false;
    for (let oLen = 1; oLen < 500 && !syncFound; oLen++) {
      const needle = origJs.slice(pOrig + oLen, pOrig + oLen + 20);
      const cIdx = currJs.indexOf(needle, pCurr);
      if (cIdx !== -1 && cIdx - pCurr < 1000) {
        console.log(`\n=== Diff #${diffCount} ===`);
        console.log('Orig offset:', pOrig, 'Curr offset:', pCurr);
        console.log('Orig text:', JSON.stringify(origJs.slice(pOrig, pOrig + oLen)));
        console.log('Curr text:', JSON.stringify(currJs.slice(pCurr, cIdx)));
        pOrig += oLen;
        pCurr = cIdx;
        syncFound = true;
        break;
      }
    }
    if (!syncFound) {
      console.log('Could not sync at', pOrig, pCurr);
      console.log('Orig remaining:', origJs.slice(pOrig, pOrig + 200));
      console.log('Curr remaining:', currJs.slice(pCurr, pCurr + 200));
      break;
    }
  }
}
console.log('\nTotal diff blocks found:', diffCount);
