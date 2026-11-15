const fs = require('fs');

const html = fs.readFileSync('public/projects/index.html', 'utf8');

// Find all arch-card opening tags
const cards = html.match(/<a[^>]*class="[^"]*arch-card[^"]*"[^>]*>/gi);
console.log('Total arch-cards:', cards?.length);
cards?.forEach((c, i) => console.log(`[${i}] ${c}`));

const feat = html.match(/<a[^>]*class="[^"]*featured-detail-btn[^"]*"[^>]*>/gi);
console.log('\nFeatured detail btn:', feat);

const sats = html.match(/<a[^>]*class="[^"]*satellite-card[^"]*"[^>]*>/gi);
console.log('\nTotal satellites:', sats?.length);
sats?.forEach((s, i) => console.log(`[${i}] ${s}`));
