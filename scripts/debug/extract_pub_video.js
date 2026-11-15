const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const framesDir = path.join(__dirname, 'video_frames_pub');
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const json = JSON.parse(Buffer.concat(body).toString('utf8'));
      const base64Data = json.image.replace(/^data:image\/jpeg;base64,/, '');
      const filename = `pub_frame_${String(json.frameIndex).padStart(3, '0')}_${json.timeSec.toFixed(1)}s.jpg`;
      fs.writeFileSync(path.join(framesDir, filename), base64Data, 'base64');
      console.log('Saved pub frame:', filename, 'duration:', json.duration);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
      if (json.done) {
        chromeProc.kill();
        server.close();
        process.exit(0);
      }
    });
    return;
  }
});

server.listen(3006, () => {
  const extractorHtml = `
<!DOCTYPE html>
<html>
<body>
<video id="v" src="http://localhost:3000/homepage.mp4" muted playsinline></video>
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
    const step = 2.0;
    let idx = 0;
    for (let t = 0; t <= duration; t += step) {
      await new Promise(resolve => {
        v.currentTime = t;
        v.onseeked = async () => {
          ctx.drawImage(v, 0, 0, c.width, c.height);
          await fetch('http://localhost:3006/save-frame', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              frameIndex: idx++,
              timeSec: t,
              duration: duration,
              image: c.toDataURL('image/jpeg', 0.85),
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
  fs.writeFileSync('public/frame-grabber-pub.html', extractorHtml, 'utf8');

  chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-web-security',
    'http://localhost:3000/frame-grabber-pub.html'
  ]);
});
let chromeProc;
