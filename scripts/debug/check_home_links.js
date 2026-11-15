const fs = require('fs');

const homeHtml = fs.readFileSync('public/index.html', 'utf8');
const terms = ['Explore Project', 'Explore Landmark', 'View Project'];
terms.forEach(t => {
  console.log(`Homepage has "${t}":`, homeHtml.includes(t));
});
