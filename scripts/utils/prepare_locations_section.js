const fs = require('fs');
const path = require('path');

const basePath = 'D:/Shreeyogweb/obsidianassembly.com';

// ==========================================
// 1. UPDATE _nuxt/index.d0184b9b.js
// ==========================================
const jsPath = path.join(basePath, '_nuxt/index.d0184b9b.js');
let js = fs.readFileSync(jsPath, 'utf8');

// Replace title vnode in PlacesAfter
const oldJsTitle = 'n[1]||(n[1]=s("span",{class:"title -h1 -m-h3"},[s("span",null,"You Won’t"),s("span",null,"Find Them"),s("span",null,"on a Map")],-1))';
const newJsTitle = 'n[1]||(n[1]=s("span",{class:"title -h1 -m-h3"},[s("span",null,"Rooted in Place."),s("span",null,"Built for Life.")],-1))';

if (js.includes(oldJsTitle)) {
  js = js.replace(oldJsTitle, newJsTitle);
  console.log('✓ JS replaced PlacesAfter title');
} else {
  console.log('Warning: oldJsTitle not found in JS');
}

// Replace subtitle vnode in PlacesAfter
const oldJsSubtitle = 'n[2]||(n[2]=s("p",{class:"subtitle -p-h6",string:"split","string-split":"line"},"These places aren’t broadly announced.",-1))';
const newJsSubtitle = 'n[2]||(n[2]=s("p",{class:"subtitle -p-h6",string:"split","string-split":"line"},"A Growing Presence Across Places.",-1))';

if (js.includes(oldJsSubtitle)) {
  js = js.replace(oldJsSubtitle, newJsSubtitle);
  console.log('✓ JS replaced PlacesAfter subtitle');
} else {
  console.log('Warning: oldJsSubtitle not found in JS');
}

// Replace caption vnode in PlacesAfter
const oldJsCaption = 'n[3]||(n[3]=s("p",{class:"caption -m",string:"split","string-split":"line"},[W(" There are "),s("span",{class:"-h5"},"7"),W(" in operation at the moment, each established within a specific context and maintained with discretion. Their presence is intentional, shaped by location rather than visibility. Access is considered, not assumed. ")],-1))';
const newJsCaption = 'n[3]||(n[3]=s("p",{class:"caption -m",string:"split","string-split":"line"},[W("Every Shreeyog development begins with a thoughtful choice of location. Discover our residential projects across "),s("span",{class:"-h5"},"Nashik & Ghoti"),W(", each created to bring together comfortable living, thoughtful design and lasting value.")],-1))';

if (js.includes(oldJsCaption)) {
  js = js.replace(oldJsCaption, newJsCaption);
  console.log('✓ JS replaced PlacesAfter caption');
} else {
  console.log('Warning: oldJsCaption not found in JS');
}

// Replace cta-label vnode in PlacesAfter
const oldJsCta = 'n[4]||(n[4]=s("span",{class:"cta-label -hp -a-to-top",string:""},[s("span",null,"See if"),s("span",null,"Nearby /")],-1))';
const newJsCta = 'n[4]||(n[4]=s("span",{class:"cta-label -hp -a-to-top",string:""},[s("span",null,"Explore"),s("span",null,"Locations /")],-1))';

if (js.includes(oldJsCta)) {
  js = js.replace(oldJsCta, newJsCta);
  console.log('✓ JS replaced PlacesAfter cta-label');
} else {
  console.log('Warning: oldJsCta not found in JS');
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Saved updated index.d0184b9b.js');


// ==========================================
// 2. UPDATE index.html
// ==========================================
const htmlPath = path.join(basePath, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace title in index.html
const oldHtmlTitle = '<span class="title -h1 -m-h3" data-v-e539f811><span data-v-e539f811>You Won’t</span><span data-v-e539f811>Find Them</span><span data-v-e539f811>on a Map</span></span>';
const newHtmlTitle = '<span class="title -h1 -m-h3" data-v-e539f811><span data-v-e539f811>Rooted in Place.</span><span data-v-e539f811>Built for Life.</span></span>';

if (html.includes(oldHtmlTitle)) {
  html = html.replace(oldHtmlTitle, newHtmlTitle);
  console.log('✓ HTML replaced PlacesAfter title');
}

// Replace subtitle in index.html
const oldHtmlSubtitle = '<p class="subtitle -p-h6" string="split" string-split="line" data-v-e539f811>These places aren’t broadly announced.</p>';
const newHtmlSubtitle = '<p class="subtitle -p-h6" string="split" string-split="line" data-v-e539f811>A Growing Presence Across Places.</p>';

if (html.includes(oldHtmlSubtitle)) {
  html = html.replace(oldHtmlSubtitle, newHtmlSubtitle);
  console.log('✓ HTML replaced PlacesAfter subtitle');
}

// Replace caption in index.html
const oldHtmlCaption = '<p class="caption -m" string="split" string-split="line" data-v-e539f811> There are <span class="-h5" data-v-e539f811>7</span> in operation at the moment, each established within a specific context and maintained with discretion. Their presence is intentional, shaped by location rather than visibility. Access is considered, not assumed. </p>';
const newHtmlCaption = '<p class="caption -m" string="split" string-split="line" data-v-e539f811>Every Shreeyog development begins with a thoughtful choice of location. Discover our residential projects across <span class="-h5" data-v-e539f811>Nashik &amp; Ghoti</span>, each created to bring together comfortable living, thoughtful design and lasting value.</p>';

if (html.includes(oldHtmlCaption)) {
  html = html.replace(oldHtmlCaption, newHtmlCaption);
  console.log('✓ HTML replaced PlacesAfter caption');
}

// Replace cta-label in index.html
const oldHtmlCta = '<span class="cta-label -hp -a-to-top" string data-v-e539f811><span data-v-e539f811>See if</span><span data-v-e539f811>Nearby /</span></span>';
const newHtmlCta = '<span class="cta-label -hp -a-to-top" string data-v-e539f811><span data-v-e539f811>Explore</span><span data-v-e539f811>Locations /</span></span>';

if (html.includes(oldHtmlCta)) {
  html = html.replace(oldHtmlCta, newHtmlCta);
  console.log('✓ HTML replaced PlacesAfter cta-label');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved updated index.html');
