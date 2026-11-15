const fs = require('fs');

const entryPath = 'public/_nuxt/entry.6ece3b7b.js';
const content = fs.readFileSync(entryPath, 'utf8');

// 1. ku definition
const kuIdx = content.indexOf('ku=class extends ze{');
console.log('kuIdx:', kuIdx);
console.log('ku slice:', content.substring(kuIdx, kuIdx + 300));

// 2. wb definition
const wbIdx = content.indexOf('wb=class extends ku{');
console.log('wbIdx:', wbIdx);
console.log('wb slice:', content.substring(wbIdx, wbIdx + 300));

// 3. Ty.onFrame
const onFrameIdx = content.indexOf('if(this.isScrollbarManipulation){');
console.log('onFrameIdx:', onFrameIdx);
console.log('onFrame slice:', content.substring(onFrameIdx - 50, onFrameIdx + 350));

// 4. initObservers
const obsIdx = content.indexOf('y.isIntersecting?e.enter():e.leave()');
console.log('obsIdx:', obsIdx);
console.log('obs slice:', content.substring(obsIdx - 50, obsIdx + 100));
