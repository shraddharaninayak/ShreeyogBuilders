const fs = require('fs');
const path = require('path');

const results = {
  corePages: {},
  projectDetailPages: [],
  assets: {}
};

// Check core pages
const core = [
  'public/index.html',
  'public/about/index.html',
  'public/projects/index.html',
  'public/contact/index.html',
  'public/imagine-possible-policy/index.html'
];

core.forEach(file => {
  const exists = fs.existsSync(file);
  const size = exists ? fs.statSync(file).size : 0;
  results.corePages[file] = { exists, size };
});

// Check 15 project detail pages
const projectSlugs = [
  'shree-anant',
  'shree-bramhand',
  'shree-malhar',
  'shree-nandan',
  'shree-nath-enclave',
  'shree-navshakti',
  'shree-neelkanth',
  'shree-niwas',
  'shree-padma',
  'shree-pandurang',
  'shree-safalya',
  'shree-samruddhi-park',
  'shree-swarup',
  'shree-venkatesh',
  'shree-vishwa'
];

projectSlugs.forEach(slug => {
  const dirIndex = `public/projects/${slug}/index.html`;
  const flatHtml = `public/projects/${slug}.html`;
  results.projectDetailPages.push({
    slug,
    dirIndexExists: fs.existsSync(dirIndex),
    dirIndexSize: fs.existsSync(dirIndex) ? fs.statSync(dirIndex).size : 0,
    flatHtmlExists: fs.existsSync(flatHtml),
    flatHtmlSize: fs.existsSync(flatHtml) ? fs.statSync(flatHtml).size : 0
  });
});

// Check asset directories
const assetDirs = ['public/_nuxt', 'public/images', 'public/fonts'];
assetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    results.assets[dir] = { exists: true, count: files.length };
  } else {
    results.assets[dir] = { exists: false, count: 0 };
  }
});

console.log(JSON.stringify(results, null, 2));
