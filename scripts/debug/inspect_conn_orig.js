const fs = require('fs');
const c = fs.readFileSync('obsidianassembly.com/index.html', 'utf8');

const connIdx = c.indexOf('class="c-connection"');
if (connIdx !== -1) {
  const endConn = c.indexOf('</section>', connIdx);
  console.log('--- c-connection in obsidianassembly.com/index.html ---');
  console.log(c.substring(connIdx - 20, endConn + 10));
}

const objIdx = c.indexOf('class="c-objects"');
if (objIdx !== -1) {
  console.log('--- string-copy-from in c-objects ---');
  const objChunk = c.substring(objIdx, objIdx + 4000);
  let m;
  const reg = /string-copy-from=["']([^"']+)["']/g;
  while ((m = reg.exec(objChunk)) !== null) {
    console.log('  copy from:', m[1]);
  }
}
