const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const framesDir = path.join(__dirname, 'video_frames');
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

// Simple HTTP server to receive frames
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/save-frame')) {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const data = Buffer.concat(body).toString('utf8');
      const json = JSON.parse(data);
      const base64Data = json.image.replace(/^data:image\/jpeg;base64,/, '');
      const filename = `frame_${String(json.frameIndex).padStart(3, '0')}_${json.timeSec.toFixed(1)}s.jpg`;
      fs.writeFileSync(path.join(framesDir, filename), base64Data, 'base64');
      console.log('Saved frame:', filename);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));

      if (json.done) {
        console.log('All frames captured! Closing server and chrome...');
        setTimeout(() => {
          chromeProc.kill();
          server.close();
          process.exit(0);
        }, 1000);
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(3005, () => {
  console.log('Frame receiver listening on 3005');
  launchExtractor();
});

function launchExtractor() {
  const extractorHtml = `
<!DOCTYPE html>
<html>
<body>
<video id="v" src="http://localhost:3000/reference-homepage.mp4" muted playsinline></video>
<canvas id="c"></canvas>
<script>
  const v = document.getElementById('v');
  const c = document.getElementById('c');
  const ctx = c.getContext('2d');

  v.onloadedmetadata = async () => {
    c.width = v.videoWidth || 1280;
    c.height = v.videoHeight || 720;
    const duration = v.duration;
    console.log('Video duration:', duration);
    // Take frames every 1 second
    const step = 1.0;
    let idx = 0;
    for (let t = 0; t <= duration; t += step) {
      await new Promise(resolve => {
        v.currentTime = t;
        v.onseeked = async () => {
          ctx.drawImage(v, 0, 0, c.width, c.height);
          const dataUrl = c.toDataURL('image/jpeg', 0.85);
          await fetch('http://localhost:3005/save-frame', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              frameIndex: idx++,
              timeSec: t,
              image: dataUrl,
              done: (t + step > duration)
            })
          });
          resolve();
        };
      });
    }
  };
</script>
</body>
</html>
  `;

  fs.writeFileSync('public/frame-grabber.html', extractorHtml, 'utf8');

  chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-web-security',
    'http://localhost:3000/frame-grabber.html'
  ]);
}
let chromeProc;
