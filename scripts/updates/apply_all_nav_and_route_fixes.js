const fs = require('fs');
const path = require('path');

function backupAndReplace(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return false;
  }
  const backup = filePath + '.bak';
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(filePath, backup);
    console.log('Backed up:', filePath, '-> .bak');
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let totalReplaced = 0;

  for (const { search, replace } of replacements) {
    if (content.includes(search)) {
      content = content.replace(search, replace);
      totalReplaced++;
      console.log('Replaced in', filePath, ':', search.substring(0, 40) + '...');
    } else {
      console.warn('Target NOT found in', filePath, ':', search.substring(0, 60));
    }
  }

  if (totalReplaced > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated', filePath, 'with', totalReplaced, 'replacements.');
    return true;
  } else {
    console.warn('No replacements made in', filePath);
    return false;
  }
}

// 1. default.ea02c3da.js
console.log('--- Updating default.ea02c3da.js ---');
backupAndReplace('public/_nuxt/default.ea02c3da.js', [
  {
    search: 'extraClass:"places",text:"Projects",reverse:"",routeurl:"places"',
    replace: 'extraClass:"places",text:"Projects",reverse:"",routeurl:"/projects"'
  },
  {
    search: 'class:"-h0 -mid-h1 -m-h2 -nl places",style:{"--l-delay":"3"},to:"/places"',
    replace: 'class:"-h0 -mid-h1 -m-h2 -nl places",style:{"--l-delay":"3"},to:"/projects"'
  }
]);

// 2. MainFooter.a208a2b7.js
console.log('\n--- Updating MainFooter.a208a2b7.js ---');
backupAndReplace('public/_nuxt/MainFooter.a208a2b7.js', [
  {
    search: 'class:"-h0 -mid-h1 -m-h2 -nl about",to:"/places"',
    replace: 'class:"-h0 -mid-h1 -m-h2 -nl about",to:"/projects"'
  }
]);

// 3. entry.6ece3b7b.js
console.log('\n--- Updating entry.6ece3b7b.js ---');
backupAndReplace('public/_nuxt/entry.6ece3b7b.js', [
  {
    search: '{name:"places",path:"/places",meta:{},alias:["/projects"]',
    replace: '{name:"projects",path:"/projects",meta:{},alias:["/places"]'
  }
]);

// 4. index.d0184b9b.js
console.log('\n--- Updating index.d0184b9b.js ---');
backupAndReplace('public/_nuxt/index.d0184b9b.js', [
  {
    search: 'text:"EXPLORE OUR APPROACH",big:"",routeurl:"places"',
    replace: 'text:"EXPLORE OUR APPROACH",big:"",routeurl:"/projects"'
  }
]);

// 5. HTML files
const htmlFiles = [
  'public/objects/index.html',
  'public/people/index.html',
  'public/imagine-possible-policy/index.html',
  'pages/index.html'
];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let text = fs.readFileSync(file, 'utf8');
    if (text.includes('href="/places"')) {
      text = text.replaceAll('href="/places"', 'href="/projects"');
      fs.writeFileSync(file, text, 'utf8');
      console.log('Updated href="/places" -> "/projects" in', file);
    }
  }
});

// 6. Ensure shreeyog-projects.css is in public/index.html <head>
console.log('\n--- Ensuring shreeyog-projects.css preloaded in public/index.html ---');
let indexHtml = fs.readFileSync('public/index.html', 'utf8');
if (!indexHtml.includes('shreeyog-projects.css')) {
  indexHtml = indexHtml.replace('</head>', '  <link rel="stylesheet" href="/_nuxt/shreeyog-projects.css">\n</head>');
  fs.writeFileSync('public/index.html', indexHtml, 'utf8');
  console.log('Added shreeyog-projects.css to public/index.html');
} else {
  console.log('shreeyog-projects.css already in public/index.html');
}
