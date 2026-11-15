const cp = require('child_process');
const fs = require('fs');

const html = `
<!DOCTYPE html>
<html>
<body>
<iframe id="f" src="http://localhost:3000/" style="width:1440px;height:900px;"></iframe>
<script>
window.addEventListener('load', async () => {
  await new Promise(r => setTimeout(r, 2000));
  const f = document.getElementById('f');
  const fwin = f.contentWindow;
  const fdoc = f.contentDocument;

  const seq = fdoc.querySelector('.c-objects .sequence');
  let curr = seq;
  const chain = [];
  while (curr) {
    const cs = fwin.getComputedStyle(curr);
    chain.push({
      tag: curr.tagName,
      cls: curr.className,
      id: curr.id,
      overflow: cs.overflow,
      overflowX: cs.overflowX,
      overflowY: cs.overflowY,
      contain: cs.contain,
      transform: cs.transform,
      perspective: cs.perspective,
      filter: cs.filter,
      willChange: cs.willChange,
      height: cs.height,
      position: cs.position
    });
    curr = curr.parentElement;
  }
  console.log('ANCESTOR CHAIN:', JSON.stringify(chain, null, 2));
  fetch('http://localhost:3010/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chain)
  });
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-sticky-ancestors.html', html, 'utf8');

const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    res.writeHead(200);
    res.end('ok');
    const chain = JSON.parse(body);
    console.log('ANCESTOR CHAIN:');
    for (const c of chain) {
      console.log(c.tag + ' .' + c.cls + (c.id ? '#' + c.id : ''));
      console.log('  position: ' + c.position + ', height: ' + c.height);
      console.log('  overflow: ' + c.overflow + ' (x:' + c.overflowX + ', y:' + c.overflowY + ')');
      console.log('  contain: ' + c.contain + ', transform: ' + c.transform);
    }
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

server.listen(3010, () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  chromeProc = cp.spawn(chromePath, [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-sticky-ancestors.html'
  ]);
});
let chromeProc;
