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

  const w = fdoc.querySelector('.c-objects .-w');
  const seq = fdoc.querySelector('.c-objects .sequence');
  const cObj = fdoc.querySelector('.c-objects');

  const testScrolls = [0, 5500, 6500, 8000, 9200, 11000, 13000];
  const out = [];

  for (const sy of testScrolls) {
    fwin.scrollTo(0, sy);
    await new Promise(r => setTimeout(r, 200));
    const rW = w.getBoundingClientRect();
    const rSeq = seq.getBoundingClientRect();
    const rCObj = cObj.getBoundingClientRect();
    out.push({
      sy,
      cObjTop: Math.round(rCObj.top),
      wTop: Math.round(rW.top),
      wBottom: Math.round(rW.bottom),
      wHeight: Math.round(rW.height),
      seqTop: Math.round(rSeq.top),
      seqBottom: Math.round(rSeq.bottom),
      seqHeight: Math.round(rSeq.height)
    });
  }

  fetch('http://localhost:3015/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(out)
  });
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-w-scroll.html', html, 'utf8');

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
    console.log('SCROLL TRAJECTORY:');
    console.table(JSON.parse(body));
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

server.listen(3015, () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  chromeProc = cp.spawn(chromePath, [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-w-scroll.html'
  ]);
});
let chromeProc;
