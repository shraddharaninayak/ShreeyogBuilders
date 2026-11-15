const fs = require('fs');

const files = [
  'public/index.html',
  'public/about/index.html',
  'public/contact/index.html',
  'public/objects/index.html',
  'public/people/index.html',
  'public/imagine-possible-policy/index.html',
  'public/projects/index.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const placesHrefs = text.match(/href=["'][^"']*places[^"']*["']/g);
    const projectsHrefs = text.match(/href=["'][^"']*projects[^"']*["']/g);
    console.log(f, '=> places:', placesHrefs, '| projects count:', projectsHrefs ? projectsHrefs.length : 0);
  }
});
