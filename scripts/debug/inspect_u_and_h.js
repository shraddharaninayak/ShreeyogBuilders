const fs = require('fs');

const code = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');

// Find U (PeopleAbout)
const uMatch = code.match(/const U=m\(\{[\s\S]*?\}\);const z=u\(U,/);
if (uMatch) {
  console.log('U length:', uMatch[0].length);
  console.log(uMatch[0].slice(0, 300));
} else {
  console.log('U match not found');
}

// Find H (PeopleCTA)
const hMatch = code.match(/const H=m\(\{[\s\S]*?\}\);const J=u\(H,/);
if (hMatch) {
  console.log('H length:', hMatch[0].length);
  console.log(hMatch[0].slice(0, 300));
} else {
  console.log('H match not found');
}
