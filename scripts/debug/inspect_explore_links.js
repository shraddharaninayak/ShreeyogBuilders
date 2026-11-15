const fs = require('fs');

function inspectProjects() {
  const html = fs.readFileSync('public/projects/index.html', 'utf8');
  console.log('Total length of public/projects/index.html:', html.length);

  // Search for Explore / Explore Landmark / View Project
  const terms = ['Explore', 'Explore Landmark', 'View Project'];
  terms.forEach(t => {
    let count = 0;
    let idx = 0;
    while ((idx = html.indexOf(t, idx)) !== -1) {
      count++;
      idx += t.length;
    }
    console.log(`Found "${t}": ${count} times`);
  });

  // Let's find some anchor tags or buttons around these terms
  const regex = /<a[^>]*>(?:(?!<\/a>)[\s\S])*(?:Explore|View Project)[\s\S]*?<\/a>/gi;
  const matches = html.match(regex);
  if (matches) {
    console.log(`\nFound ${matches.length} matching <a> tags:`);
    matches.slice(0, 5).forEach((m, i) => console.log(`[${i}] ${m}`));
  } else {
    console.log('No <a> tags matching Explore found directly');
  }
}

inspectProjects();
