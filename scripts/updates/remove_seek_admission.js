const fs = require('fs');

console.log('--- Removing SEEK ADMISSION across the entire website ---');

// 1. Update index.html
let indexHtml = fs.readFileSync('D:/Shreeyogweb/obsidianassembly.com/index.html', 'utf8');

// Hero button removal:
const heroButtonRegex = /<!--\[--><button[^>]*class="[^"]*-big button[^"]*"[^>]*><span[^>]*>Seek Admission<\/span><!--\[--><!--\]--><\/button><!----><!--\]-->/g;
const heroMatches = indexHtml.match(heroButtonRegex);
console.log('index.html: Found hero/preview button matches:', heroMatches ? heroMatches.length : 0);
indexHtml = indexHtml.replace(heroButtonRegex, '');

// Update custom style in index.html to adjust .cta .-hp margin-bottom
const ctaStylePatch = `
/* Remove unused spacing when SEEK ADMISSION button is removed */
.c-welcome .-w .cta[data-v-6c6a6d99] {
  text-align: center !important;
  justify-self: center !important;
}
.c-welcome .-w .cta .-hp[data-v-6c6a6d99] {
  margin-bottom: 0 !important;
}
.c-welcome .-w .cta button,
.c-welcome .-w button:has(span:contains("Seek Admission")),
button[data-v-f52f19c3]:has(span.text:contains("Seek Admission")) {
  display: none !important;
}
`;

if (indexHtml.includes('/* Remove unused spacing when SEEK ADMISSION')) {
  // Already patched
} else {
  indexHtml = indexHtml.replace('</style>', ctaStylePatch + '\n</style>');
}

fs.writeFileSync('D:/Shreeyogweb/obsidianassembly.com/index.html', indexHtml, 'utf8');
console.log('index.html updated.');

// 2. Update _nuxt/index.d0184b9b.js
let indexJs = fs.readFileSync('D:/Shreeyogweb/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');

// Match 1: Hero button in index.js:
// r(C,{text:"Seek Admission",big:"",onClick:c[0]||(c[0]=_=>{ue(t).emit("toggle-form")})})
const heroJsTarget = ',r(C,{text:"Seek Admission",big:"",onClick:c[0]||(c[0]=_=>{ue(t).emit("toggle-form")})})';
if (indexJs.includes(heroJsTarget)) {
  indexJs = indexJs.replace(heroJsTarget, '');
  console.log('index.d0184b9b.js: Hero button removed.');
} else {
  console.log('index.d0184b9b.js: Hero button target not found directly, checking variations...');
}

// Match 2: Places preview button in index.js:
// r(l,{text:"Seek Admission",big:"",onClick:n[0]||(n[0]=y=>ue(i).emit("toggle-form"))})
const placesJsTarget = ',r(l,{text:"Seek Admission",big:"",onClick:n[0]||(n[0]=y=>ue(i).emit("toggle-form"))})';
if (indexJs.includes(placesJsTarget)) {
  indexJs = indexJs.replace(placesJsTarget, '');
  console.log('index.d0184b9b.js: Places preview button removed.');
} else {
  console.log('index.d0184b9b.js: Places preview button target not found directly...');
}

// Match 3: Updates cycle card button in index.js:
// {status:"Admission-related",title:"Admission Cycle – Open",description:"A limited admission review period is currently underway.",image:"/images/home/updates/4.webp",isButtonShow:!0,buttonContent:"Seek Admission"}
const updatesJsTarget = '{status:"Admission-related",title:"Admission Cycle – Open",description:"A limited admission review period is currently underway.",image:"/images/home/updates/4.webp",isButtonShow:!0,buttonContent:"Seek Admission"}';
const updatesJsReplacement = '{status:"Admission-related",title:"Admission Cycle – Open",description:"A limited admission review period is currently underway.",image:"/images/home/updates/4.webp",isButtonShow:!1,buttonContent:""}';
if (indexJs.includes(updatesJsTarget)) {
  indexJs = indexJs.replace(updatesJsTarget, updatesJsReplacement);
  console.log('index.d0184b9b.js: Updates card button disabled.');
} else {
  console.log('index.d0184b9b.js: Updates target not found directly...');
}

fs.writeFileSync('D:/Shreeyogweb/obsidianassembly.com/_nuxt/index.d0184b9b.js', indexJs, 'utf8');
console.log('index.d0184b9b.js updated.');

// 3. Update people/index.html
let peopleHtml = fs.readFileSync('D:/Shreeyogweb/obsidianassembly.com/people/index.html', 'utf8');
const peopleMatches = peopleHtml.match(heroButtonRegex);
console.log('people/index.html: Found button matches:', peopleMatches ? peopleMatches.length : 0);
peopleHtml = peopleHtml.replace(heroButtonRegex, '');
fs.writeFileSync('D:/Shreeyogweb/obsidianassembly.com/people/index.html', peopleHtml, 'utf8');
console.log('people/index.html updated.');

// 4. Update _nuxt/people.af477013.js
let peopleJs = fs.readFileSync('D:/Shreeyogweb/obsidianassembly.com/_nuxt/people.af477013.js', 'utf8');
// Match 1: e("div",R,[i(P,{text:"Seek Admission",big:"",onClick:s[0]||(s[0]=Q=>{C(r).emit("toggle-form")})})])
const peopleJsTarget1 = 'e("div",R,[i(P,{text:"Seek Admission",big:"",onClick:s[0]||(s[0]=Q=>{C(r).emit("toggle-form")})})])';
const peopleJsReplacement1 = 'e("div",R,[])';
if (peopleJs.includes(peopleJsTarget1)) {
  peopleJs = peopleJs.replace(peopleJsTarget1, peopleJsReplacement1);
  console.log('people.af477013.js: Welcome button removed.');
}

// Match 2: ,i(t,{text:"Seek Admission",big:"",onClick:o[0]||(o[0]=v=>{C(_).emit("toggle-form")})})
const peopleJsTarget2 = ',i(t,{text:"Seek Admission",big:"",onClick:o[0]||(o[0]=v=>{C(_).emit("toggle-form")})})';
if (peopleJs.includes(peopleJsTarget2)) {
  peopleJs = peopleJs.replace(peopleJsTarget2, '');
  console.log('people.af477013.js: Bottom button removed.');
}
fs.writeFileSync('D:/Shreeyogweb/obsidianassembly.com/_nuxt/people.af477013.js', peopleJs, 'utf8');
console.log('people.af477013.js updated.');

// 5. Update places/index.html
let placesHtml = fs.readFileSync('D:/Shreeyogweb/obsidianassembly.com/places/index.html', 'utf8');
const placesMatches = placesHtml.match(heroButtonRegex);
console.log('places/index.html: Found button matches:', placesMatches ? placesMatches.length : 0);
placesHtml = placesHtml.replace(heroButtonRegex, '');
fs.writeFileSync('D:/Shreeyogweb/obsidianassembly.com/places/index.html', placesHtml, 'utf8');
console.log('places/index.html updated.');

// 6. Update _nuxt/places.b37ae0d8.js
let placesJs = fs.readFileSync('D:/Shreeyogweb/obsidianassembly.com/_nuxt/places.b37ae0d8.js', 'utf8');
// Match: ,H(e,{text:"Seek Admission",big:"",onClick:S[0]||(S[0]=y=>{Je(P).emit("toggle-form")})})
const placesJsTarget1 = ',H(e,{text:"Seek Admission",big:"",onClick:S[0]||(S[0]=y=>{Je(P).emit("toggle-form")})})';
if (placesJs.includes(placesJsTarget1)) {
  placesJs = placesJs.replace(placesJsTarget1, '');
  console.log('places.b37ae0d8.js: Bottom button removed.');
}
fs.writeFileSync('D:/Shreeyogweb/obsidianassembly.com/_nuxt/places.b37ae0d8.js', placesJs, 'utf8');
console.log('places.b37ae0d8.js updated.');

console.log('--- All SEEK ADMISSION instances successfully removed ---');
