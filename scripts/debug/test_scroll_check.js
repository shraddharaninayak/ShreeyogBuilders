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

  const stickyEl = fdoc.querySelector('.c-objects .sticky');
  const seqEl = fdoc.querySelector('.c-objects .sequence');

  console.log('Testing scroll at 9200:');
  fwin.scrollTo(0, 9200);
  await new Promise(r => setTimeout(r, 600));

  const stickyRect = stickyEl ? stickyEl.getBoundingClientRect() : null;
  const seqRect = seqEl ? seqEl.getBoundingClientRect() : null;

  fetch('http://localhost:3011/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scrollY: fwin.scrollY,
      docScrollTop: fdoc.documentElement.scrollTop,
      bodyScrollTop: fdoc.body.scrollTop,
      stickyRect,
      seqRect
    })
  });
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-scroll-check.html', html, 'utf8');

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
    console.log('Scroll Check Result:', body);
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

server.listen(3011, () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  chromeProc = cp.spawn(chromePath, [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-scroll-check.html'
  ]);
});
let chromeProc;
