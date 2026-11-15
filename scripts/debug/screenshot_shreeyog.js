const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const dir = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b/shreeyog_current';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  if (req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const json = JSON.parse(Buffer.concat(body).toString('utf8'));
      const base64Data = json.image.replace(/^data:image\/jpeg;base64,/, '');
      const filename = `scroll_${String(json.index).padStart(2, '0')}_y${json.y}.jpg`;
      fs.writeFileSync(path.join(dir, filename), base64Data, 'base64');
      console.log('Saved screenshot:', filename, 'logs:', json.consoleLogs?.length);
      if (json.consoleLogs && json.consoleLogs.length > 0) {
        console.log('Console logs on page:', json.consoleLogs);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
      if (json.done) {
        chromeProc.kill();
        server.close();
        process.exit(0);
      }
    });
  }
});

server.listen(3007, () => {
  const runnerHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;">
<iframe id="f" src="http://localhost:3000/" style="width:1440px;height:900px;border:none;"></iframe>
<canvas id="c" width="1440" height="900"></canvas>
<script>
  window.addEventListener('load', async () => {
    await new Promise(r => setTimeout(r, 2000));
    const f = document.getElementById('f');
    const fwin = f.contentWindow;
    const fdoc = f.contentDocument;

    // Capture console errors
    const logs = [];
    fwin.addEventListener('error', e => logs.push({ type: 'error', msg: e.message }));

    const maxScroll = fdoc.documentElement.scrollHeight - fwin.innerHeight;
    console.log('Max scroll:', maxScroll);
    const steps = 15;
    const stepSize = Math.floor(maxScroll / steps);

    for (let i = 0; i <= steps; i++) {
      const scrollY = i * stepSize;
      fwin.scrollTo({ top: scrollY, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 400));

      // We need to capture the iframe
      // Since iframe is same origin (localhost:3000), we can't easily draw iframe to canvas directly,
      // but we can report scroll and DOM info!
      const activeSticky = fdoc.querySelectorAll('.sticky, [class*="sticky"]');
      const stickyInfo = Array.from(activeSticky).map(el => ({
        cls: el.className,
        rect: el.getBoundingClientRect(),
        opacity: fwin.getComputedStyle(el).opacity,
        visibility: fwin.getComputedStyle(el).visibility
      }));

      await fetch('http://localhost:3007/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          index: i,
          y: scrollY,
          maxScroll: maxScroll,
          stickyInfo: stickyInfo,
          consoleLogs: logs,
          image: '', // placeholder
          done: (i === steps)
        })
      });
    }
  });
</script>
</body>
</html>
  `;
  fs.writeFileSync('public/test-scroll-runner.html', runnerHtml, 'utf8');

  chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-scroll-runner.html'
  ]);
});
let chromeProc;
