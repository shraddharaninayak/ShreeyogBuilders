const cp = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const cmd = `"${chromePath}" --headless=new --dump-dom "http://localhost:3000/"`;
console.log('Running:', cmd);

const out = cp.execSync(cmd, { maxBuffer: 20 * 1024 * 1024 });
fs.writeFileSync('scripts/debug/chrome_dom.html', out);
console.log('Successfully captured DOM via Chrome, size:', out.length);
