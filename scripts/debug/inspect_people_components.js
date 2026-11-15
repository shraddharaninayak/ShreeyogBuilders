const fs = require('fs');

const code = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');

// Find const component definitions
const defs = code.match(/const [A-Z][A-Za-z0-9_]*=m\(\{[\s\S]*?\}\);/g);
console.log('Definitions found:', defs ? defs.length : 0);
if (defs) {
  defs.forEach(d => {
    const nameMatch = d.match(/__name:"([^"]+)"/);
    console.log('Component:', nameMatch ? nameMatch[1] : 'unknown', 'Length:', d.length);
  });
}
console.log('End of file:');
console.log(code.slice(-1000));
