const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const origSection = origJs.slice(27300, 33779);
const currSection = currJs.slice(27300, 34345);

console.log('Orig section length:', origSection.length);
console.log('Curr section length:', currSection.length);

// Compare them
let pO = 0;
let pC = 0;
let diffId = 0;

while (pO < origSection.length && pC < currSection.length) {
  if (origSection[pO] === currSection[pC]) {
    pO++;
    pC++;
  } else {
    diffId++;
    // find next match of 15 chars
    let found = false;
    for (let oLen = 1; oLen < 600 && !found; oLen++) {
      const target = origSection.slice(pO + oLen, pO + oLen + 15);
      const cIdx = currSection.indexOf(target, pC);
      if (cIdx !== -1 && cIdx - pC < 1000) {
        console.log(`\n--- Diff ${diffId} ---`);
        console.log('Orig:', origSection.slice(pO, pO + oLen));
        console.log('Curr:', currSection.slice(pC, cIdx));
        pO += oLen;
        pC = cIdx;
        found = true;
        break;
      }
    }
    if (!found) {
      console.log('Could not sync at pO:', pO, 'pC:', pC);
      console.log('Orig:', origSection.slice(pO, pO + 100));
      console.log('Curr:', currSection.slice(pC, pC + 100));
      break;
    }
  }
}
