const fs = require('fs');

['public/index.html', 'pages/index.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(f);
  console.log('  guardian present:', content.includes('shreeyog-homepage-guardian'));
  console.log('  flow-css present:', content.includes('shreeyog-homepage-flow-css'));
  console.log('  initShreeyogMap present:', content.includes('initShreeyogMap'));
  console.log('  map interactive script present:', content.includes('shreeyog-map-interactive-script'));
});
