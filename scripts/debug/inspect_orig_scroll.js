const CDP = require('./cdp_helper');
const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\supri\\.gemini\\antigravity\\brain\\ff998ab5-1a3d-42c3-84d4-6774c67af56b\\orig_screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function main() {
  const cdp = new CDP(9454);
  try {
    await cdp.connect('http://localhost:3000/test-orig/');
    console.log('Connected to test-orig!');
    await new Promise(r => setTimeout(r, 2500));

    // Capture console errors
    await cdp.send('Console.enable');
    await cdp.send('Runtime.enable');

    const totalHeight = await cdp.eval('document.documentElement.scrollHeight');
    console.log('Total document height:', totalHeight);

    // Scroll through the page in 10 steps
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const y = Math.round(i * (totalHeight - 800) / steps);
      await cdp.eval(`window.scrollTo(0, ${y})`);
      await new Promise(r => setTimeout(r, 600));

      const file = path.join(dir, `step_${String(i).padStart(2, '0')}_y${y}.png`);
      await cdp.screenshot(file);
      
      const info = await cdp.eval(`
        (() => {
          const activeSections = Array.from(document.querySelectorAll('section, footer')).map(s => {
            const r = s.getBoundingClientRect();
            return {
              cls: s.className,
              top: Math.round(r.top),
              bottom: Math.round(r.bottom),
              h: Math.round(r.height)
            };
          }).filter(s => s.bottom > 0 && s.top < window.innerHeight);

          return { activeSections };
        })()
      `);
      console.log(`Step ${i} (y=${y}):`, info.activeSections.map(s => `${s.cls} [${s.top}..${s.bottom}]`).join(', '));
    }
    console.log('Finished capturing test-orig!');
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
