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

  // Let's test what enables sticky on seq:
  // Case A: seq.style.setProperty('position', 'sticky', 'important')
  // Case B: w style changes
  // Case C: position: fixed relative to c-objects
  
  // Let's test: why doesn't sticky work inside .-w?
  // Let's test removing display: grid on .-w, or setting grid-row
  const tests = [
    {
      name: 'Test 1: seq align-self stretch, height 100vh',
      fn: () => {
        seq.style.setProperty('position', 'sticky', 'important');
        seq.style.setProperty('top', '0px', 'important');
        seq.style.setProperty('align-self', 'stretch', 'important');
        seq.style.setProperty('height', '100vh', 'important');
      }
    },
    {
      name: 'Test 2: seq grid-row 1 / 3, align-self auto',
      fn: () => {
        seq.style.setProperty('grid-row', '1 / 3', 'important');
        seq.style.setProperty('align-self', 'auto', 'important');
        seq.style.setProperty('position', 'sticky', 'important');
        seq.style.setProperty('top', '0px', 'important');
        seq.style.setProperty('height', '100vh', 'important');
      }
    },
    {
      name: 'Test 3: .-w display block instead of grid',
      fn: () => {
        w.style.setProperty('display', 'block', 'important');
        seq.style.setProperty('position', 'sticky', 'important');
        seq.style.setProperty('top', '0px', 'important');
        seq.style.setProperty('height', '100vh', 'important');
      }
    }
  ];

  const results = [];
  for (const t of tests) {
    t.fn();
    fwin.scrollTo(0, 7500);
    await new Promise(r => setTimeout(r, 300));
    const rSeq = seq.getBoundingClientRect();
    const rW = w.getBoundingClientRect();
    results.push({
      name: t.name,
      seqTop: Math.round(rSeq.top),
      seqHeight: Math.round(rSeq.height),
      wTop: Math.round(rW.top),
      wBottom: Math.round(rW.bottom)
    });
  }

  fetch('http://localhost:3016/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(results)
  });
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-fix-sticky.html', html, 'utf8');

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
    console.log('STICKY FIX EXPERIMENT:');
    console.log(JSON.stringify(JSON.parse(body), null, 2));
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

server.listen(3016, () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  chromeProc = cp.spawn(chromePath, [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-fix-sticky.html'
  ]);
});
let chromeProc;
