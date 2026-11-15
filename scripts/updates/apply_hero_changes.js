const fs = require('fs');
const path = require('path');

const basePath = 'D:/Shreeyogweb/obsidianassembly.com';

// 1. Update stone.b614bd04.js
const stoneJsPath = path.join(basePath, '_nuxt/stone.b614bd04.js');
let stoneJs = fs.readFileSync(stoneJsPath, 'utf-8');
stoneJs = stoneJs.replace('images/home/stone.webp', 'images/shreeyog/building-hero.webp');
fs.writeFileSync(stoneJsPath, stoneJs, 'utf-8');
console.log('Updated stone.b614bd04.js');

// 2. Update default.ea02c3da.js (Header)
const defaultJsPath = path.join(basePath, '_nuxt/default.ea02c3da.js');
let defaultJs = fs.readFileSync(defaultJsPath, 'utf-8');

// Logo in default.ea02c3da.js
// Both instances of the logo spans:
const oldLogoSpans = '[o("span",{class:"-h5 the"},"The",-1),o("span",{class:"-h5 obsidian"},"Obsidian",-1),o("span",{class:"-h5 assembly"},"Assembly",-1),o("span",{class:"-mm"},"Imagine Possible",-1)]';
const newLogoSpans = '[o("img",{src:"/images/shreeyog/logo-hero.png",alt:"Shreeyog Builders & Land Developers",class:"shreeyog-brand-logo"},null,-1),o("span",{class:"-mm"},"Spaces. Stories. Legacies.",-1)]';

defaultJs = defaultJs.split(oldLogoSpans).join(newLogoSpans);

// Header button text: Places -> Projects, Objects -> About
defaultJs = defaultJs.replace('text:"Places"', 'text:"Projects"');
defaultJs = defaultJs.replace('text:"Objects"', 'text:"About"');

fs.writeFileSync(defaultJsPath, defaultJs, 'utf-8');
console.log('Updated default.ea02c3da.js');

// 3. Update index.d0184b9b.js (Welcome component)
const indexJsPath = path.join(basePath, '_nuxt/index.d0184b9b.js');
let indexJs = fs.readFileSync(indexJsPath, 'utf-8');

// Headline: Nothing -> Beyond Spaces, / Shown -> We Build / First -> Legacies.
indexJs = indexJs.replace('"Nothing",-1', '"Beyond Spaces,",-1');
indexJs = indexJs.replace('"Shown",-1', '"We Build",-1');
indexJs = indexJs.replace('"First",-1', '"Legacies.",-1');

// Subtitles
indexJs = indexJs.replace('[W("Coordinates"),s("br"),W("Withheld")]', '[W("Crafted for"),s("br"),W("Generations.")]');
indexJs = indexJs.replace('[W("A Private Assembly"),s("br"),W("for Makers")]', '[W("Thoughtfully Designed."),s("br"),W("Timelessly Built.")]');

// Bottom text: Commitment Precedes Entry / -> Where Every Detail Has a Purpose.
indexJs = indexJs.replace(
  '[s("span",null,"Commitment"),s("span",null,"Precedes"),s("span",null,"Entry /")]',
  '[s("span",null,"Where Every"),s("span",null,"Detail Has"),s("span",null,"a Purpose.")]'
);

// Floating images
indexJs = indexJs.replace('/images/offices/6.webp', '/images/shreeyog/exterior-detail.webp');
indexJs = indexJs.replace('/images/offices/7.webp', '/images/shreeyog/interior-detail.webp');

fs.writeFileSync(indexJsPath, indexJs, 'utf-8');
console.log('Updated index.d0184b9b.js');

// 4. Update index.html
const indexHtmlPath = path.join(basePath, 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf-8');

// A. Header Logo & Tag
const oldHeaderLogo = '<a href="/" class="-nl" data-v-81ce8483><span class="-h5 the" data-v-81ce8483>The</span><span class="-h5 obsidian" data-v-81ce8483>Obsidian</span><span class="-h5 assembly" data-v-81ce8483>Assembly</span><span class="-mm" data-v-81ce8483>Imagine Possible</span></a>';
const newHeaderLogo = '<a href="/" class="-nl" data-v-81ce8483><img src="/images/shreeyog/logo-hero.png" alt="Shreeyog Builders &amp; Land Developers" class="shreeyog-brand-logo" data-v-81ce8483><span class="-mm" data-v-81ce8483>Spaces. Stories. Legacies.</span></a>';

html = html.replace(oldHeaderLogo, newHeaderLogo);

// B. Header Buttons: Places -> Projects, Objects -> About
html = html.replace(
  '<a href="/places" class="button -p -m-m -reverse places" aria-label title data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Places</span>',
  '<a href="/places" class="button -p -m-m -reverse places" aria-label title data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Projects</span>'
);

html = html.replace(
  '<a href="/objects" class="button -p -m-m -reverse objects" aria-label title data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Objects</span>',
  '<a href="/objects" class="button -p -m-m -reverse objects" aria-label title data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>About</span>'
);

// C. Hero Headline
html = html.replace(
  '<span class="-lrg title line-1" aria-hidden="true" string="split" string-split="char[random(0,10)]" data-v-6c6a6d99>Nothing</span>',
  '<span class="-lrg title line-1" aria-hidden="true" string="split" string-split="char[random(0,10)]" data-v-6c6a6d99>Beyond Spaces,</span>'
);

html = html.replace(
  '<span class="-lrg title line-2" aria-hidden="true" string="split" string-copy-from="welcome" string-split="char[random(0,10)]" data-v-6c6a6d99>Shown</span>',
  '<span class="-lrg title line-2" aria-hidden="true" string="split" string-copy-from="welcome" string-split="char[random(0,10)]" data-v-6c6a6d99>We Build</span>'
);

html = html.replace(
  '<span class="-lrg title line-3" aria-hidden="true" string="split" string-copy-from="welcome" string-split="char[random(0,10)]" data-v-6c6a6d99>First</span>',
  '<span class="-lrg title line-3" aria-hidden="true" string="split" string-copy-from="welcome" string-split="char[random(0,10)]" data-v-6c6a6d99>Legacies.</span>'
);

// D. Hero Subtitles
html = html.replace(
  '<p class="-mm line-1-m -a-to-top" style="--l-delay:0.3;" string data-v-6c6a6d99>Coordinates<br data-v-6c6a6d99>Withheld</p>',
  '<p class="-mm line-1-m -a-to-top" style="--l-delay:0.3;" string data-v-6c6a6d99>Crafted for<br data-v-6c6a6d99>Generations.</p>'
);

html = html.replace(
  '<p class="-mm line-2-m -a-to-top" style="--l-delay:0.45;" string data-v-6c6a6d99>A Private Assembly<br data-v-6c6a6d99>for Makers</p>',
  '<p class="-mm line-2-m -a-to-top" style="--l-delay:0.45;" string data-v-6c6a6d99>Thoughtfully Designed.<br data-v-6c6a6d99>Timelessly Built.</p>'
);

// E. Bottom CTA Label
html = html.replace(
  '<span class="cta-label -hp" data-v-6c6a6d99><span data-v-6c6a6d99>Commitment</span><span data-v-6c6a6d99>Precedes</span><span data-v-6c6a6d99>Entry /</span></span>',
  '<span class="cta-label -hp" data-v-6c6a6d99><span data-v-6c6a6d99>Where Every</span><span data-v-6c6a6d99>Detail Has</span><span data-v-6c6a6d99>a Purpose.</span></span>'
);

// F. Central Stone Image -> Shreeyog Building
html = html.replace(
  '<img src="/images/home/stone.webp" alt="ImaginePossible" data-v-6c6a6d99>',
  '<img src="/images/shreeyog/building-hero.webp" alt="Shreeyog Residential Project" data-v-6c6a6d99>'
);

// G. Left Floating Image
html = html.replace(
  '<img string="lazy" string-lazy="/images/offices/6.webp" alt="ImaginePossible" data-v-ec47b9e2>',
  '<img string="lazy" string-lazy="/images/shreeyog/exterior-detail.webp" src="/images/shreeyog/exterior-detail.webp" alt="Shreeyog Architectural Exterior" data-v-ec47b9e2>'
);

// H. Right Floating Image
html = html.replace(
  '<img string="lazy" string-lazy="/images/offices/7.webp" alt="ImaginePossible" data-v-ec47b9e2>',
  '<img string="lazy" string-lazy="/images/shreeyog/interior-detail.webp" src="/images/shreeyog/interior-detail.webp" alt="Shreeyog Premium Interior" data-v-ec47b9e2>'
);

// I. Inject custom CSS for shreeyog hero styling
const customHeroCss = `
<style id="shreeyog-hero-custom">
.c-welcome .-w .stone[data-v-6c6a6d99] {
  -webkit-mask-image: none !important;
  mask-image: none !important;
  background-color: transparent !important;
}
.c-welcome .-w .stone .hover-1[data-v-6c6a6d99],
.c-welcome .-w .stone .hover-2[data-v-6c6a6d99] {
  display: none !important;
}
.shreeyog-brand-logo {
  height: 48px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
  display: block;
  margin-top: -4px;
}
@media (max-width: 1024px) {
  .shreeyog-brand-logo {
    height: 38px;
    max-width: 120px;
  }
}
</style>
`;

if (!html.includes('shreeyog-hero-custom')) {
  html = html.replace('</head>', `${customHeroCss}\n</head>`);
}

fs.writeFileSync(indexHtmlPath, html, 'utf-8');
console.log('Updated index.html');
