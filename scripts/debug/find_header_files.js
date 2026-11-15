const fs = require('fs');

const nuxtFiles = fs.readdirSync('public/_nuxt').filter(f => f.endsWith('.js'));
nuxtFiles.forEach(f => {
  const content = fs.readFileSync('public/_nuxt/' + f, 'utf8');
  if (content.includes('send request') || content.includes('data-v-81ce8483') || content.includes('TheHeader') || content.includes('MainHeader')) {
    console.log('Found in JS:', f);
  }
});

const cssFiles = fs.readdirSync('public/_nuxt').filter(f => f.endsWith('.css'));
cssFiles.forEach(f => {
  const content = fs.readFileSync('public/_nuxt/' + f, 'utf8');
  if (content.includes('.request') || content.includes('data-v-81ce8483')) {
    console.log('Found in CSS:', f);
  }
});
