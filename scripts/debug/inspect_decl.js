const fs = require('fs');

const code = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');

const idxU = code.indexOf('PeopleAbout');
if (idxU !== -1) {
  console.log('PeopleAbout context:', code.slice(idxU - 50, idxU + 300));
}

const idxH = code.indexOf('PeopleCTA');
if (idxH !== -1) {
  console.log('PeopleCTA context:', code.slice(idxH - 50, idxH + 300));
}
