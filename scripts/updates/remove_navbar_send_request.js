const fs = require('fs');
const path = require('path');

console.log('=== REMOVING "SEND REQUEST" NAVBAR BUTTON ACROSS SHREEYOG WEBSITE ===');

// =========================================================================
// 1. UPDATE VUE / NUXT RUNTIME LAYOUT: public/_nuxt/default.ea02c3da.js
// =========================================================================
const defaultJsPath = 'public/_nuxt/default.ea02c3da.js';
let defaultJs = fs.readFileSync(defaultJsPath, 'utf8');

const targetJsButton = 'm(I,{extraClass:"request",text:"send request",reverse:"",onClick:t[0]||(t[0]=l=>C(s).emit("toggle-form"))})';
if (defaultJs.includes(targetJsButton)) {
  defaultJs = defaultJs.replace(targetJsButton, 'P("",!0)');
  fs.writeFileSync(defaultJsPath, defaultJs, 'utf8');
  console.log('✓ Successfully removed Send Request button from Vue layout: default.ea02c3da.js');
} else {
  console.log('Notice: Exact targetJsButton not found, searching with regex...');
  const regex = /m\(I,\{extraClass:"request",text:"send request"[^}]*onClick:[^}]*\}\)/;
  if (regex.test(defaultJs)) {
    defaultJs = defaultJs.replace(regex, 'P("",!0)');
    fs.writeFileSync(defaultJsPath, defaultJs, 'utf8');
    console.log('✓ Successfully removed Send Request button with regex: default.ea02c3da.js');
  } else {
    console.log('Warning: Send Request button not found in default.ea02c3da.js');
  }
}

// =========================================================================
// 2. UPDATE CSS FOR NAVBAR SPACING & REMOVAL: default.dc95e376.css
// =========================================================================
const navbarFixCss = `
/* ==========================================================================
   SHREEYOG NAVBAR - REMOVE SEND REQUEST & BALANCE LAYOUT
   ========================================================================== */
header .-w .request,
header .-w .button.request,
header .-w [data-v-81ce8483].request,
header .-w [data-v-f52f19c3].request,
header .request {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

header .-w[data-v-81ce8483] .menu-wrap {
  --left: 11 !important;
  --width: 2 !important;
  grid-column: 11 / span 2 !important;
  justify-self: end !important;
}

header.-scrolled .-w .menu-wrap[data-v-81ce8483]:before {
  flex-grow: 0 !important;
  padding-right: 0 !important;
}

header.-scrolled .-w .menu-wrap[data-v-81ce8483] .button .text,
header .-w .menu-wrap[data-v-81ce8483] .button .text {
  opacity: 1 !important;
  translate: 0 0 !important;
}

header.-scrolled .-w .menu-wrap[data-v-81ce8483] .button .menu-icon,
header .-w .menu-wrap[data-v-81ce8483] .button .menu-icon {
  left: 0 !important;
  translate: calc(var(--g-gap) / 2) !important;
}
`;

const defaultCssPath = 'public/_nuxt/default.dc95e376.css';
let defaultCss = fs.readFileSync(defaultCssPath, 'utf8');
const cssMarker = '/* SHREEYOG NAVBAR - REMOVE SEND REQUEST & BALANCE LAYOUT */';
if (defaultCss.includes(cssMarker)) {
  const parts = defaultCss.split(cssMarker);
  defaultCss = parts[0] + navbarFixCss;
} else {
  defaultCss += '\n' + navbarFixCss;
}
fs.writeFileSync(defaultCssPath, defaultCss, 'utf8');
console.log('✓ Updated public/_nuxt/default.dc95e376.css');

// Also append to shreeyog-projects.css and shreeyog-contact.css
['public/_nuxt/shreeyog-projects.css', 'public/_nuxt/shreeyog-contact.css'].forEach(cssFile => {
  if (fs.existsSync(cssFile)) {
    let content = fs.readFileSync(cssFile, 'utf8');
    if (!content.includes(cssMarker)) {
      content += '\n' + navbarFixCss;
      fs.writeFileSync(cssFile, content, 'utf8');
      console.log('✓ Appended navbar rules to ' + cssFile);
    }
  }
});

// =========================================================================
// 3. UPDATE build_projects_pages.js AND REGENERATE PROJECT PAGES
// =========================================================================
const buildScriptPath = 'scripts/updates/build_projects_pages.js';
if (fs.existsSync(buildScriptPath)) {
  let buildScript = fs.readFileSync(buildScriptPath, 'utf8');
  // Remove the <a href="/contact" class="-reverse request button ...>Send Request</a>
  const oldRequestInBuild = /<a href="\/contact" class="-reverse request button -p -m-m" data-v-f52f19c3>[\s\S]*?<\/a>\s*/;
  if (oldRequestInBuild.test(buildScript)) {
    buildScript = buildScript.replace(oldRequestInBuild, '');
    fs.writeFileSync(buildScriptPath, buildScript, 'utf8');
    console.log('✓ Removed Send Request from scripts/updates/build_projects_pages.js');
  }
}

// Run build_projects_pages.js
console.log('Running build_projects_pages.js to regenerate all 18 project HTML pages...');
require('./build_projects_pages.js');

// =========================================================================
// 4. CLEAN ALL REMAINING HTML FILES
// =========================================================================
function getAllHtmlFiles(dir) {
  let results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) {
      if (d.name !== 'node_modules' && d.name !== '.git') {
        results = results.concat(getAllHtmlFiles(full));
      }
    } else if (d.name.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const allHtmlFiles = getAllHtmlFiles('.');
let cleanedCount = 0;

allHtmlFiles.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Pattern 1: Button with send request in header
  // <!--[--><button aria-label="" title="" class="-reverse request button -p -m-m" data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>send request</span><!--[--><!--]--></button><!----><!--]-->
  const btnPattern = /<!--\[--><button[^>]*class="[^"]*request[^"]*"[^>]*>[\s\S]*?send request[\s\S]*?<\/button><!----><!--\]-->/gi;
  if (btnPattern.test(html)) {
    html = html.replace(btnPattern, '<!---->');
    changed = true;
  }

  // Pattern 2: Naked button or anchor in header with request class
  const anchorPattern = /<a[^>]*class="[^"]*request[^"]*"[^>]*>[\s\S]*?send request[\s\S]*?<\/a>/gi;
  if (anchorPattern.test(html)) {
    html = html.replace(anchorPattern, '');
    changed = true;
  }

  // Pattern 3: Any remaining header button with class -reverse request
  const headerBtnPattern = /<button[^>]*class="[^"]*request[^"]*"[^>]*>[\s\S]*?<\/button>/gi;
  // Only replace if inside <header>
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/);
  if (headerMatch && headerMatch[0].includes('request')) {
    const newHeader = headerMatch[0]
      .replace(btnPattern, '<!---->')
      .replace(headerBtnPattern, '')
      .replace(anchorPattern, '');
    html = html.replace(headerMatch[0], newHeader);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    cleanedCount++;
    console.log('✓ Removed Send Request from header in: ' + file);
  }
});

console.log(`\n=== ALL DONE: Removed Send Request button from ${cleanedCount} HTML files and Vue/CSS assets ===`);
