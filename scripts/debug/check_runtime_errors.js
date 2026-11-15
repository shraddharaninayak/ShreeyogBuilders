const { spawn } = require('child_process');
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  let body = [];
  req.on('data', c => body.push(c));
  req.on('end', () => {
    const json = JSON.parse(Buffer.concat(body).toString('utf8'));
    console.log('=== BROWSER LOGS ===');
    json.logs.forEach(l => console.log(`[${l.type}]`, l.text));
    console.log('=== WINDOW STATE ===');
    console.log(json.state);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    setTimeout(() => {
      chromeProc.kill();
      server.close();
      process.exit(0);
    }, 500);
  });
});

server.listen(3008, () => {
  const testHtml = `
<!DOCTYPE html>
<html>
<body>
<iframe id="f" src="http://localhost:3000/" style="width:1440px;height:900px;"></iframe>
<script>
  const logs = [];
  window.addEventListener('message', e => {
    if (e.data && e.data.type === 'log') logs.push(e.data);
  });

  const f = document.getElementById('f');
  f.onload = async () => {
    await new Promise(r => setTimeout(r, 2000));
    try {
      const fwin = f.contentWindow;
      const fdoc = f.contentDocument;

      const state = {
        title: fdoc.title,
        bodyHeight: fdoc.body.scrollHeight,
        sectionCount: fdoc.querySelectorAll('section').length,
        sections: Array.from(fdoc.querySelectorAll('section')).map(s => s.className),
        stringElements: fdoc.querySelectorAll('[string-id], [string]').length,
        initedStringElements: fdoc.querySelectorAll('[string-inited]').length,
        hasStringGlobal: !!fwin.$string,
        hasNuxt: !!fwin.__NUXT__,
        visibleSticky: Array.from(fdoc.querySelectorAll('.sticky, [class*="sticky"]')).map(el => ({
          cls: el.className,
          display: fwin.getComputedStyle(el).display,
          visibility: fwin.getComputedStyle(el).visibility,
          opacity: fwin.getComputedStyle(el).opacity
        }))
      };

      await fetch('http://localhost:3008/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs, state })
      });
    } catch(err) {
      await fetch('http://localhost:3008/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: [{ type: 'error', text: err.stack }], state: {} })
      });
    }
  };
</script>
</body>
</html>
  `;
  require('fs').writeFileSync('public/test-state.html', testHtml, 'utf8');

  chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-state.html'
  ]);
});
let chromeProc;
