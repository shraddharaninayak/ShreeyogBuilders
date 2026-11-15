const fs = require('fs');

const dir = 'd:/Shreeyogweb/public/images/objects-init';
if (fs.existsSync(dir)) {
  console.log('Files in', dir, ':', fs.readdirSync(dir));
} else {
  console.log(dir, 'does not exist');
}
