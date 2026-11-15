const fs = require('fs');

const pages = [
  'd:/Shreeyogweb/public/index.html',
  'd:/Shreeyogweb/public/about/index.html',
  'd:/Shreeyogweb/public/contact/index.html',
  'd:/Shreeyogweb/pages/index.html',
  'd:/Shreeyogweb/pages/about.html',
  'd:/Shreeyogweb/pages/contact.html'
];

for (const p of pages) {
  if (fs.existsSync(p)) {
    let html = fs.readFileSync(p, 'utf8');
    // Replace navbar / footer links pointing to /places with /projects
    const updated = html
      .replace(/href="\/places"/g, 'href="/projects"')
      .replace(/routeurl:"places"/g, 'routeurl:"projects"');
    if (updated !== html) {
      fs.writeFileSync(p, updated, 'utf8');
      console.log('Updated links in:', p);
    }
  }
}
