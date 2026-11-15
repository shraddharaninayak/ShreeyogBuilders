const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const artifactsDir = 'C:\\Users\\supri\\.gemini\\antigravity\\brain\\ff998ab5-1a3d-42c3-84d4-6774c67af56b';

const positions = [
  { name: '01_hero', y: 0, label: 'Hero Section' },
  { name: '02_places_carousel', y: 2200, label: 'Places Carousel' },
  { name: '03_interactive_map', y: 4600, label: 'Interactive Map' },
  { name: '04_objects_split_title', y: 6500, label: 'Objects Split Title (Container 1)' },
  { name: '05_objects_card_1', y: 9200, label: 'Objects Card 1 (Architectural Character)' },
  { name: '06_objects_card_shuffle', y: 10800, label: 'Objects Card Shuffle (Thoughtful Spaces)' },
  { name: '07_objects_card_final', y: 12200, label: 'Objects Card Final (Spaces to Connect)' },
  { name: '08_connection_pedestal', y: 13300, label: 'Connection Pedestal Transition' },
  { name: '09_connection_philosophy', y: 13900, label: 'Shreeyog Philosophy Statement' },
  { name: '10_footer', y: 14500, label: 'Footer & Contact' }
];

const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;overflow:hidden;">
<iframe id="f" src="http://localhost:3000/" style="width:1440px;height:900px;border:none;"></iframe>
<script>
window.addEventListener('load', async () => {
  await new Promise(r => setTimeout(r, 2500));
  const f = document.getElementById('f');
  const fwin = f.contentWindow;
  const fdoc = f.contentDocument;

  // Let's inspect sections and element positions
  const seq = fdoc.querySelector('.c-objects .sequence');
  const seqStyle = fwin.getComputedStyle(seq);

  const results = [];
  const positions = ${JSON.stringify(positions)};

  for (const pos of positions) {
    fwin.scrollTo({ top: pos.y, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 600));

    // Gather DOM status at this scroll
    const seqRect = seq ? seq.getBoundingClientRect() : null;
    const cards = Array.from(fdoc.querySelectorAll('.c-objects .object-wrapper')).map(w => {
      const r = w.getBoundingClientRect();
      const img = w.querySelector('img');
      return {
        cls: w.className,
        style: w.getAttribute('style'),
        top: Math.round(r.top),
        left: Math.round(r.left),
        width: Math.round(r.width),
        height: Math.round(r.height),
        imgSrc: img ? img.src : null,
        imgCls: img ? img.className : null
      };
    });

    const activeTitle = fdoc.querySelector('.c-objects .place-name')?.textContent || '';
    const activeOrder = fdoc.querySelector('.c-objects .order')?.textContent?.replace(/\\s+/g, ' ').trim() || '';

    results.push({
      name: pos.name,
      y: pos.y,
      label: pos.label,
      seqRect: seqRect ? { top: Math.round(seqRect.top), height: Math.round(seqRect.height) } : null,
      activeTitle,
      activeOrder,
      cards
    });
  }

  fetch('http://localhost:3009/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ results })
  });
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-journey.html', html, 'utf8');

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
    const data = JSON.parse(body);
    console.log('=== JOURNEY REPORT ===');
    for (const r of data.results) {
      console.log('[' + r.name + '] y=' + r.y + ' (' + r.label + ')');
      console.log('  Sequence: top=' + r.seqRect?.top + ', height=' + r.seqRect?.height);
      console.log('  Title: "' + r.activeTitle + '" | Order: "' + r.activeOrder + '"');
      for (let i = 0; i < r.cards.length; i++) {
        const c = r.cards[i];
        console.log('    Card ' + i + ': top=' + c.top + ', w=' + c.width + ', h=' + c.height + ', cls="' + c.cls + '", src=' + (c.imgSrc ? c.imgSrc.slice(0, 40) : 'none'));
      }
    }
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

server.listen(3009, () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  chromeProc = cp.spawn(chromePath, [
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:3000/test-journey.html'
  ]);
});
let chromeProc;
