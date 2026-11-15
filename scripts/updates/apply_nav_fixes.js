const fs = require('fs');

console.log('=== APPLYING NAVIGATION FIXES & REMOVING SERVICES ===');

// 1. Update default.ea02c3da.js (Navbar & Menu overlay)
let defaultJs = fs.readFileSync('obsidianassembly.com/_nuxt/default.ea02c3da.js', 'utf8');

// 1.1 Fix Navbar About button
const oldNavAbout = 'C(S)?P("",!0):(x(),j(I,{key:4,extraClass:"objects",text:"About",reverse:"",routeurl:"objects"}))';
const newNavAbout = 'C(S)?P("",!0):(x(),j(I,{key:4,extraClass:"objects about",text:"About",reverse:"",routeurl:"about"}))';

if (defaultJs.includes(oldNavAbout)) {
  defaultJs = defaultJs.replace(oldNavAbout, newNavAbout);
  console.log('Fixed Navbar About button routeurl in default.ea02c3da.js');
} else {
  console.warn('oldNavAbout not matched in default.ea02c3da.js');
}

// 1.2 Update Full-Screen Menu overlay in default.ea02c3da.js
// Look for menu nav links snippet
const oldMenuNavRegex = /m\(k,\{class:"-h0 -mid-h1 -m-h2 -nl back-home"[\s\S]*?m\(k,\{class:"-h0 -mid-h1 -m-h2 -nl people"[\s\S]*?\}\)\]\)/;

const newMenuNav = `m(k,{class:"-h0 -mid-h1 -m-h2 -nl back-home",style:{"--l-delay":"0"},to:"/",string:"split","string-split":"char",onClick:t[5]||(t[5]=l=>_())},{default:A(()=>[...t[19]||(t[19]=[z("Home",-1)])]),_:1}),m(k,{class:"-h0 -mid-h1 -m-h2 -nl about",style:{"--l-delay":"1"},to:"/about",string:"split","string-split":"char",onClick:t[8]||(t[8]=l=>_())},{default:A(()=>[...t[22]||(t[22]=[z("About",-1)])]),_:1}),m(k,{class:"-h0 -mid-h1 -m-h2 -nl places",style:{"--l-delay":"2"},to:"/places",string:"split","string-split":"char",onClick:t[6]||(t[6]=l=>_())},{default:A(()=>[...t[20]||(t[20]=[z("Projects",-1)])]),_:1}),m(k,{class:"-h0 -mid-h1 -m-h2 -nl people",style:{"--l-delay":"3"},to:"/people",string:"split","string-split":"char",onClick:t[10]||(t[10]=l=>_())},{default:A(()=>[...t[23]||(t[23]=[z("Contact",-1)])]),_:1})])`;

if (oldMenuNavRegex.test(defaultJs)) {
  defaultJs = defaultJs.replace(oldMenuNavRegex, newMenuNav);
  console.log('Updated Full-Screen Menu overlay links in default.ea02c3da.js');
} else {
  console.warn('oldMenuNavRegex not matched in default.ea02c3da.js');
}

fs.writeFileSync('obsidianassembly.com/_nuxt/default.ea02c3da.js', defaultJs, 'utf8');

// 2. Update default.dc95e376.css for menu & navbar
let defaultCss = fs.readFileSync('obsidianassembly.com/_nuxt/default.dc95e376.css', 'utf8');

const navCssUpdates = `
/* --- Navigation Updates: 4-Item Menu & Navbar --- */
header .-w[data-v-81ce8483] .about {
  --left: 4 !important;
}
@media (min-width: 1024px) {
  header .-w[data-v-81ce8483] .about {
    --left: 7 !important;
  }
}

/* Full screen menu 4-item grid */
.full-screen-menu .oy .-w nav a.back-home[data-v-81ce8483] {
  grid-column-end: 6 !important;
  grid-column-start: 2 !important;
  grid-row-end: 3 !important;
  grid-row-start: 2 !important;
}
.full-screen-menu .oy .-w nav a.about[data-v-81ce8483] {
  grid-column-end: 6 !important;
  grid-column-start: 2 !important;
  grid-row-end: 4 !important;
  grid-row-start: 3 !important;
}
.full-screen-menu .oy .-w nav a.places[data-v-81ce8483] {
  grid-column-end: 5 !important;
  grid-column-start: 1 !important;
  grid-row-end: 5 !important;
  grid-row-start: 4 !important;
}
.full-screen-menu .oy .-w nav a.people[data-v-81ce8483] {
  grid-column-end: 7 !important;
  grid-column-start: 2 !important;
  grid-row-end: 6 !important;
  grid-row-start: 5 !important;
}

@media (min-width: 1024px) {
  .full-screen-menu .oy .-w nav[data-v-81ce8483] {
    grid-template-rows: 2fr auto auto auto auto 2fr !important;
  }
  .full-screen-menu .oy .-w nav a.back-home[data-v-81ce8483] {
    grid-column-end: 5 !important;
    grid-column-start: 1 !important;
    grid-row-end: 3 !important;
    grid-row-start: 2 !important;
  }
  .full-screen-menu .oy .-w nav a.about[data-v-81ce8483] {
    grid-column-end: 6 !important;
    grid-column-start: 2 !important;
    grid-row-end: 4 !important;
    grid-row-start: 3 !important;
  }
  .full-screen-menu .oy .-w nav a.places[data-v-81ce8483] {
    grid-column-end: 8 !important;
    grid-column-start: 4 !important;
    grid-row-end: 5 !important;
    grid-row-start: 4 !important;
  }
  .full-screen-menu .oy .-w nav a.people[data-v-81ce8483] {
    grid-column-end: 7 !important;
    grid-column-start: 3 !important;
    grid-row-end: 6 !important;
    grid-row-start: 5 !important;
  }
}
`;

if (!defaultCss.includes('Navigation Updates: 4-Item Menu & Navbar')) {
  defaultCss += '\n' + navCssUpdates;
  fs.writeFileSync('obsidianassembly.com/_nuxt/default.dc95e376.css', defaultCss, 'utf8');
  console.log('Appended navigation CSS to default.dc95e376.css');
}

// 3. Update MainFooter.a208a2b7.js (Footer Navigation)
let footerJs = fs.readFileSync('obsidianassembly.com/_nuxt/MainFooter.a208a2b7.js', 'utf8');

const oldFooterNavRegex = /t\("nav",null,\[n\(o,\{class:"-h0 -mid-h1 -m-h2 -nl places"[\s\S]*?n\(o,\{class:"-h0 -mid-h1 -m-h2 -nl people"[\s\S]*?\}\)\]\)/;

const newFooterNav = `t("nav",null,[n(o,{class:"-h0 -mid-h1 -m-h2 -nl places",to:"/",string:"split","string-split":"char"},{default:a(()=>[...s[0]||(s[0]=[i("Home",-1)])]),_:1}),n(o,{class:"-h0 -mid-h1 -m-h2 -nl objects",to:"/about",string:"split","string-split":"char"},{default:a(()=>[...s[1]||(s[1]=[i("About",-1)])]),_:1}),n(o,{class:"-h0 -mid-h1 -m-h2 -nl about",to:"/places",string:"split","string-split":"char"},{default:a(()=>[...s[2]||(s[2]=[i("Projects",-1)])]),_:1}),n(o,{class:"-h0 -mid-h1 -m-h2 -nl people",to:"/people",string:"split","string-split":"char"},{default:a(()=>[...s[3]||(s[3]=[i("Contact",-1)])]),_:1})])`;

if (oldFooterNavRegex.test(footerJs)) {
  footerJs = footerJs.replace(oldFooterNavRegex, newFooterNav);
  console.log('Updated 4-item Footer navigation in MainFooter.a208a2b7.js');
} else {
  console.warn('oldFooterNavRegex not matched in MainFooter.a208a2b7.js');
}

fs.writeFileSync('obsidianassembly.com/_nuxt/MainFooter.a208a2b7.js', footerJs, 'utf8');

// 4. Update MainFooter.8675ce94.css (Hide Services, position Contact on row 4)
let footerCss = fs.readFileSync('obsidianassembly.com/_nuxt/MainFooter.8675ce94.css', 'utf8');

const footerNavCss = `
/* --- 4-Item Footer Navigation Rules --- */
footer .-w.block nav a.contacts[data-v-a41b36d1] {
  display: none !important;
}
footer .-w.block nav a.people[data-v-a41b36d1] {
  grid-column-start: 3 !important;
  grid-row-end: 5 !important;
  grid-row-start: 4 !important;
}
@media (min-width: 1024px) {
  footer .-w.block nav a.people[data-v-a41b36d1] {
    grid-column-start: 3 !important;
    grid-row-end: 5 !important;
    grid-row-start: 4 !important;
  }
}
`;

if (!footerCss.includes('4-Item Footer Navigation Rules')) {
  footerCss += '\n' + footerNavCss;
  fs.writeFileSync('obsidianassembly.com/_nuxt/MainFooter.8675ce94.css', footerCss, 'utf8');
  console.log('Appended 4-item footer CSS to MainFooter.8675ce94.css');
}

// 5. Update router in entry.6ece3b7b.js
let entryJs = fs.readFileSync('obsidianassembly.com/_nuxt/entry.6ece3b7b.js', 'utf8');
// Remove alias:["/services"]
if (entryJs.includes('alias:["/services"]')) {
  entryJs = entryJs.replace('alias:["/services"]', 'alias:[]');
  fs.writeFileSync('obsidianassembly.com/_nuxt/entry.6ece3b7b.js', entryJs, 'utf8');
  console.log('Removed /services alias from entry.6ece3b7b.js router');
}

// 6. Update all HTML files
const htmlFiles = [
  'obsidianassembly.com/index.html',
  'obsidianassembly.com/about/index.html',
  'obsidianassembly.com/places/index.html',
  'obsidianassembly.com/people/index.html',
  'obsidianassembly.com/projects/index.html',
  'obsidianassembly.com/contact/index.html',
  'obsidianassembly.com/imagine-possible-policy/index.html'
];

for (const file of htmlFiles) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix Navbar About href
    content = content.replace(
      /<a href="\/objects" class="button -p -m-m -reverse objects"[^>]*><span class="text -mm -up"[^>]*>About<\/span><!--\[--><!--\]--><\/a>/g,
      '<a href="/about" class="button -p -m-m -reverse objects about" aria-label title data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>About</span><!--[--><!--]--></a>'
    );
    
    // Remove Services from footer nav
    content = content.replace(
      /<a[^>]*class="[^"]*contacts[^"]*"[^>]*>Services<\/a>/g,
      ''
    );
    content = content.replace(
      /<a href="\/(?:services|objects)" class="-h0 -mid-h1 -m-h2 -nl contacts"[^>]*>Services<\/a>/g,
      ''
    );
    
    // Ensure CSS styles are present
    if (!content.includes('4-Item Footer Navigation Rules')) {
      content = content.replace('</style>', footerNavCss.trim() + '\n' + navCssUpdates.trim() + '\n</style>');
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated HTML: ${file}`);
  }
}

// 7. Remove obsidianassembly.com/services folder if exists
if (fs.existsSync('obsidianassembly.com/services')) {
  fs.rmSync('obsidianassembly.com/services', { recursive: true, force: true });
  console.log('Removed obsidianassembly.com/services directory');
}

// 8. Update server.js to redirect any /services requests to /
let serverJs = fs.readFileSync('server.js', 'utf8');
if (!serverJs.includes('// Services redirect')) {
  const insertMarker = 'const parsedUrl = url.parse(req.url);';
  const redirectCode = `const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Services redirect: Services page removed
  if (pathname === '/services' || pathname === '/services/' || pathname === '/objects' || pathname === '/objects/') {
    res.writeHead(301, { 'Location': '/' });
    res.end();
    return;
  }`;
  serverJs = serverJs.replace(insertMarker + '\n  let pathname = decodeURIComponent(parsedUrl.pathname);', redirectCode);
  fs.writeFileSync('server.js', serverJs, 'utf8');
  console.log('Updated server.js to redirect /services to /');
}

console.log('=== FINISHED APPLYING NAVIGATION FIXES ===');
