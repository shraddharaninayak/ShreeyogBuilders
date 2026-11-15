const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

// Find occurrences of "send request" or ".request"
const idx = js.indexOf('send request');
if (idx !== -1) {
  console.log('Context of send request in default.ea02c3da.js:');
  console.log(js.slice(Math.max(0, idx - 400), idx + 400));
} else {
  console.log('send request not found directly in default.ea02c3da.js');
}

// Find header component definition
const headerIdx = js.indexOf('data-v-81ce8483');
if (headerIdx !== -1) {
  console.log('\nHeader context:');
  console.log(js.slice(headerIdx - 200, headerIdx + 400));
}
