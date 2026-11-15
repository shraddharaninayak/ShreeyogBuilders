const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const pStart = html.indexOf('class="c-places"');
const pEnd = html.indexOf('</section>', pStart);
console.log('c-places range:', pStart, pEnd);

const placesHtml = html.substring(pStart - 10, pEnd + 10);
// Find all images in c-places
const imgs = [...placesHtml.matchAll(/<img[^>]+>/g)].map(m => m[0]);
console.log('Images in c-places count:', imgs.length);
imgs.forEach((img, i) => console.log(`${i}: ${img.substring(0, 150)}`));

// Find sequence controller or figures
const figures = [...placesHtml.matchAll(/<figure[^>]+>/g)].map(m => m[0]);
console.log('Figures count:', figures.length);
figures.forEach((fig, i) => console.log(`${i}: ${fig.substring(0, 120)}`));
