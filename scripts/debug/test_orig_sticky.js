const cp = require('child_process');
const fs = require('fs');

// Let's check references/obsidian_original/obsidianassembly.com/index.html
const html = `
<!DOCTYPE html>
<html>
<body>
<iframe id="f" src="http://localhost:3000/references/obsidian_original/obsidianassembly.com/index.html" style="width:1440px;height:900px;"></iframe>
<script>
window.addEventListener('load', async () => {
  await new Promise(r => setTimeout(r, 2000));
  const f = document.getElementById('f');
  const fwin = f.contentWindow;
  const fdoc = f.contentDocument;

  const seq = fdoc.querySelector('.c-objects .sequence');
  const s2 = fdoc.querySelector('.c-objects .sticky-container-2');
  const sticky = fdoc.querySelector('.c-objects .sticky');

  console.log('Original site test:');
  fwin.scrollTo(0, 9200);
  await new Promise(r => setTimeout(r, 600));

  const seqRect = seq ? seq.getBoundingClientRect() : null;
  const stickyRect = sticky ? sticky.getBoundingClientRect() : null;

  fetch('http://localhost:3013/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scrollY: fwin.scrollY,
      seqRect,
      stickyRect,
      seqStyle: seq ? {
        position: fwin.getComputedStyle(seq).position,
        top: fwin.getComputedStyle(seq).top,
        gridRow: fwin.getComputedStyle(seq).gridRow,
        alignSelf: fwin.getComputedStyle(seq).alignSelf
      } : null
    })
  });
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-orig-check.html', html, 'utf8');

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
    console.log('ORIGINAL SITE TEST RESULT:');
    console.log(body);
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

server.listen(3013, () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  chromeProc = cp.spawn(chromePath, [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-orig-check.html'
  ]);
});
let chromeProc;
