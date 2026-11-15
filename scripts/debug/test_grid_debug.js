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
  const s1 = fdoc.querySelector('.c-objects .sticky-container-1');
  const s2 = fdoc.querySelector('.c-objects .sticky-container-2');

  const csW = fwin.getComputedStyle(w);
  const csSeq = fwin.getComputedStyle(seq);
  const csS1 = fwin.getComputedStyle(s1);
  const csS2 = fwin.getComputedStyle(s2);

  fetch('http://localhost:3012/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      w: {
        display: csW.display,
        gridTemplateColumns: csW.gridTemplateColumns,
        gridTemplateRows: csW.gridTemplateRows,
        gridAutoRows: csW.gridAutoRows,
        height: csW.height
      },
      seq: {
        gridRowStart: csSeq.gridRowStart,
        gridRowEnd: csSeq.gridRowEnd,
        gridColumnStart: csSeq.gridColumnStart,
        gridColumnEnd: csSeq.gridColumnEnd,
        position: csSeq.position,
        top: csSeq.top,
        height: csSeq.height,
        alignSelf: csSeq.alignSelf,
        transform: csSeq.transform
      },
      s1: {
        gridRowStart: csS1.gridRowStart,
        gridRowEnd: csS1.gridRowEnd,
        height: csS1.height,
        position: csS1.position
      },
      s2: {
        gridRowStart: csS2.gridRowStart,
        gridRowEnd: csS2.gridRowEnd,
        height: csS2.height,
        position: csS2.position
      }
    })
  });
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-grid-debug.html', html, 'utf8');

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
    console.log('Grid computed properties:');
    console.log(JSON.stringify(JSON.parse(body), null, 2));
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

server.listen(3012, () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  chromeProc = cp.spawn(chromePath, [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-grid-debug.html'
  ]);
});
let chromeProc;
