const fs = require('fs');

const entryPath = 'public/_nuxt/entry.6ece3b7b.js';
let content = fs.readFileSync(entryPath, 'utf8');

// Backup original if not already backed up
if (!fs.existsSync(entryPath + '.orig_bak')) {
  fs.writeFileSync(entryPath + '.orig_bak', content, 'utf8');
  console.log('Created backup:', entryPath + '.orig_bak');
}

// 1. Patch ku class to add enterObject
const oldKu = 'ku=class extends ze{constructor(e){';
const newKu = 'ku=class extends ze{enterObject(e,t){super.enterObject(e,t),this.recomputeProgress(t),this.updateObjectProgress(t)}constructor(e){';

if (content.includes(oldKu)) {
  content = content.replace(oldKu, newKu);
  console.log('✓ Patched ku.enterObject');
} else {
  console.error('X Could not find oldKu in entry.js');
}

// 2. Patch wb class to add enterObject
const oldWb = 'wb=class extends ku{constructor(e){';
const newWb = 'wb=class extends ku{enterObject(e,t){super.enterObject(e,t),t.transformValue=this.calculateParallaxForObject(t),t.htmlElement&&t.transformValue&&(t.htmlElement.style.transform=t.transformValue.transform)}constructor(e){';

if (content.includes(oldWb)) {
  content = content.replace(oldWb, newWb);
  console.log('✓ Patched wb.enterObject');
} else {
  console.error('X Could not find oldWb in entry.js');
}

// 3. Patch Ty.onFrame to call onCalcUpdate on scrollbar manipulation
const oldOnFrame = 'this.context.data.scroll.transformedCurrent=this.context.data.scroll.current*this.context.data.viewport.transformScale;return}';
const newOnFrame = 'this.context.data.scroll.transformedCurrent=this.context.data.scroll.current*this.context.data.viewport.transformScale,this.onCalcUpdate();return}';

if (content.includes(oldOnFrame)) {
  content = content.replace(oldOnFrame, newOnFrame);
  console.log('✓ Patched Ty.onFrame isScrollbarManipulation');
} else {
  console.error('X Could not find oldOnFrame in entry.js');
}

fs.writeFileSync(entryPath, content, 'utf8');
console.log('Successfully saved patched entry.6ece3b7b.js');
