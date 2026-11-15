const fs = require('fs');
const path = require('path');

function checkLinks(file) {
  const content = fs.readFileSync(file, 'utf8');
  const projectLinkRegex = /href=["'](\/projects\/[a-z0-9-]+)["']/gi;
  const matches = [];
  let m;
  while ((m = projectLinkRegex.exec(content)) !== null) {
    if (!matches.includes(m[1]) && m[1] !== '/projects') {
      matches.push(m[1]);
    }
  }

  const exploreRegex = /(?:Explore|View Project|Explore Landmark)/gi;
  const exploreMatches = content.match(exploreRegex);

  return {
    file,
    projectDetailLinks: matches,
    exploreCount: exploreMatches ? exploreMatches.length : 0
  };
}

const filesToCheck = [
  'public/index.html',
  'public/about/index.html',
  'public/contact/index.html',
  'public/projects/index.html'
];

filesToCheck.forEach(f => {
  console.log(checkLinks(f));
});
