const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf-8');

// Target 1: IntersectionObserver callback around index 202815
const target1 = 'y.isIntersecting?e.enter():e.leave()';
console.log('Target 1 index:', js.indexOf(target1));

// Target 2: isScrollbarManipulation in Ty.onFrame around index 214876
const target2 = 'if(this.isScrollbarManipulation){this.isScrollbarManipulation=!1,this.context.data.scroll.current=this.context.data.scroll.elementContainer.scrollTop,this.context.data.scroll.target=this.context.data.scroll.elementContainer.scrollTop,this.context.data.scroll.transformedCurrent=this.context.data.scroll.current*this.context.data.viewport.transformScale;return}';
console.log('Target 2 index:', js.indexOf(target2));
