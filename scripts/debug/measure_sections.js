const cp = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const script = `
const sections = document.querySelectorAll('section, footer');
const list = [];
for (const s of sections) {
  const r = s.getBoundingClientRect();
  list.push({
    cls: s.className,
    id: s.id,
    top: Math.round(r.top + window.scrollY),
    height: Math.round(r.height),
    bottom: Math.round(r.bottom + window.scrollY)
  });
}
console.log('SECTIONS:' + JSON.stringify(list));
`;

// Run Chrome to evaluate this script
const html = `
<!DOCTYPE html>
<html>
<body>
<iframe id="f" src="http://localhost:3000/" style="width:1280px;height:800px;"></iframe>
<script>
window.addEventListener('load', async () => {
  await new Promise(r => setTimeout(r, 3000));
  const f = document.getElementById('f');
  const fwin = f.contentWindow;
  const fdoc = f.contentDocument;

  const sections = fdoc.querySelectorAll('section, footer');
  const list = [];
  for (const s of sections) {
    const r = s.getBoundingClientRect();
    list.push({
      tag: s.tagName,
      cls: s.className,
      id: s.id,
      top: Math.round(r.top + fwin.scrollY),
      height: Math.round(r.height),
      bottom: Math.round(r.bottom + fwin.scrollY)
    });
  }
  
  // also get c-objects children
  const cObj = fdoc.querySelector('.c-objects');
  const cObjChildren = [];
  if (cObj) {
    for (const ch of cObj.querySelectorAll('.sequence, .sticky-container-1, .sticky-container-2, .object-wrapper, .sticky')) {
      const cr = ch.getBoundingClientRect();
      const cs = fwin.getComputedStyle(ch);
      cObjChildren.push({
        cls: ch.className,
        top: Math.round(cr.top + fwin.scrollY),
        height: Math.round(cr.height),
        pos: cs.position,
        topStyle: cs.top,
        alignSelf: cs.alignSelf
      });
    }
  }

  fetch('http://localhost:3008/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sections: list, cObjChildren })
  });
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-sections.html', html, 'utf8');

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
    if (!body) return;
    const data = JSON.parse(body);
    console.log('Sections:');
    console.log(JSON.stringify(data.sections, null, 2));
    console.log('c-objects elements:');
    console.log(JSON.stringify(data.cObjChildren, null, 2));
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

server.listen(3008, () => {
  chromeProc = cp.spawn(chromePath, [
    '--headless=new',
    '--window-size=1280,800',
    'http://localhost:3000/test-sections.html'
  ]);
});
let chromeProc;
