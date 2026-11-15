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

  const testProps = [
    { label: 'DEFAULT (current)' },
    { label: 'alignSelf: stretch', style: 'align-self: stretch !important;' },
    { label: 'alignSelf: normal', style: 'align-self: normal !important;' },
    { label: 'alignSelf: auto', style: 'align-self: auto !important;' },
    { label: 'position: fixed when inview', testFixed: true }
  ];

  const results = [];
  const seq = fdoc.querySelector('.c-objects .sequence');

  for (const t of testProps) {
    if (t.style) {
      seq.style.cssText = t.style;
    }
    fwin.scrollTo(0, 9200);
    await new Promise(r => setTimeout(r, 300));
    const rect = seq.getBoundingClientRect();
    results.push({
      label: t.label,
      top: Math.round(rect.top),
      height: Math.round(rect.height),
      computedAlignSelf: fwin.getComputedStyle(seq).alignSelf,
      computedPosition: fwin.getComputedStyle(seq).position
    });
  }

  fetch('http://localhost:3014/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(results)
  });
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-seq-align.html', html, 'utf8');

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
    console.log('ALIGN-SELF TEST RESULTS:');
    console.log(JSON.stringify(JSON.parse(body), null, 2));
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

server.listen(3014, () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  chromeProc = cp.spawn(chromePath, [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-seq-align.html'
  ]);
});
let chromeProc;
