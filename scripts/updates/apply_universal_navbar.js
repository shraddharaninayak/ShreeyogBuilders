const fs = require('fs');
const path = require('path');

console.log('=== APPLYING UNIVERSAL SHREEYOG NAVBAR ACROSS ALL PAGES ===');

const navbarCssPath = path.join(__dirname, '../../public/_nuxt/shreeyog-navbar.css');
const navbarCss = fs.readFileSync(navbarCssPath, 'utf8');

// 1. Update default.dc95e376.css, shreeyog-projects.css, shreeyog-contact.css
const cssFiles = [
  'public/_nuxt/default.dc95e376.css',
  'public/_nuxt/shreeyog-projects.css',
  'public/_nuxt/shreeyog-contact.css'
];

cssFiles.forEach(relPath => {
  const fullPath = path.join(__dirname, '../../', relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    const marker = '/* ==========================================================================\n   SHREEYOG NAVBAR';
    const idx = content.indexOf(marker);
    if (idx !== -1) {
      content = content.substring(0, idx) + navbarCss;
    } else {
      content += '\n\n' + navbarCss;
    }
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('✓ Updated CSS file:', relPath);
  }
});

// 2. Standard Header Markup
const standardHeader = `<header class="" data-v-81ce8483><div class="-w" data-v-81ce8483 data-v-e764b164><!--[--><a href="/" class="-nl" data-v-81ce8483><img src="/images/shreeyog/logo-hero.png" alt="Shreeyog Builders &amp; Land Developers" class="shreeyog-brand-logo" data-v-81ce8483></a><!----><!--[--><!----><a href="/projects" class="button -p -m-m -reverse places" aria-label title data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Projects</span><!--[--><!--]--></a><!--]--><span class="sep" data-v-81ce8483></span><!--[--><!----><a href="/about" class="button -p -m-m -reverse objects about" aria-label title data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>About</span><!--[--><!--]--></a><!--]--><!----><div class="menu-wrap" data-v-81ce8483><!--[--><button aria-label="Open Navigation Menu" title="Menu" class="menu button -p -m-m" id="menuToggleBtn" data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Menu</span><!--[--><span class="menu-icon" data-v-81ce8483 data-v-f52f19c3-s></span><!--]--></button><!----><!--]--></div><!--]--></div></header>`;

const navbarCssLink = '<link rel="stylesheet" href="/_nuxt/shreeyog-navbar.css">';
const navbarScriptTag = '<script src="/_nuxt/shreeyog-navbar.js" defer></script>';

// 3. Find all HTML files in public (excluding frame grabbers and debug tools)
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      const base = path.basename(file);
      if (!base.startsWith('frame-grabber') && !base.startsWith('video-inspector') && !base.startsWith('inspect-')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(path.join(__dirname, '../../public'));
console.log(`Found ${htmlFiles.length} HTML files to update.`);

htmlFiles.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace header with standard header
  if (html.includes('<header')) {
    html = html.replace(/<header[\s\S]*?<\/header>/, standardHeader);
    changed = true;
  }

  // Ensure navbar CSS link is in <head>
  if (!html.includes('shreeyog-navbar.css')) {
    if (html.includes('</head>')) {
      html = html.replace('</head>', `  ${navbarCssLink}\n</head>`);
      changed = true;
    }
  }

  // Ensure navbar JS script is before </body>
  if (!html.includes('shreeyog-navbar.js')) {
    if (html.includes('</body>')) {
      html = html.replace('</body>', `  ${navbarScriptTag}\n</body>`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    console.log('✓ Updated HTML page:', path.relative(path.join(__dirname, '../../'), file));
  }
});

// 4. Update build_projects_pages.js so any future rebuild includes standard navbar
const buildScriptPath = path.join(__dirname, 'build_projects_pages.js');
if (fs.existsSync(buildScriptPath)) {
  let buildContent = fs.readFileSync(buildScriptPath, 'utf8');
  if (!buildContent.includes('shreeyog-navbar.css')) {
    buildContent = buildContent.replace('</head>', `  <link rel="stylesheet" href="/_nuxt/shreeyog-navbar.css">\n</head>`);
  }
  if (!buildContent.includes('shreeyog-navbar.js')) {
    buildContent = buildContent.replace('</body>', `  <script src="/_nuxt/shreeyog-navbar.js" defer></script>\n</body>`);
  }
  fs.writeFileSync(buildScriptPath, buildContent, 'utf8');
  console.log('✓ Updated build_projects_pages.js generator script');
}

console.log('=== ALL NAVBAR UPDATES SUCCESSFULLY APPLIED ===');
