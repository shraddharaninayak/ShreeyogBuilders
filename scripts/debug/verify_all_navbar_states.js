const CDP = require('./cdp_helper.js');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function testPage(url, pageName, port) {
  console.log(`\n==============================================`);
  console.log(`TESTING NAVBAR ON: ${pageName} (${url})`);
  console.log(`==============================================`);

  const cdp = new CDP(port);
  try {
    await cdp.connect(url);
    // Poll until header element exists
    for (let i = 0; i < 30; i++) {
      const hasH = await cdp.eval(`!!document.querySelector('header')`);
      if (hasH) break;
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 2000));

    // 1. TOP STATE (scrollY = 0)
    let topMetrics = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      const b = h ? h.getBoundingClientRect() : null;
      const l = document.querySelector('header .-nl');
      const lr = l ? l.getBoundingClientRect() : null;
      const p = document.querySelector('header .places');
      const pr = p ? p.getBoundingClientRect() : null;
      const s = document.querySelector('header .sep');
      const sr = s ? s.getBoundingClientRect() : null;
      const o = document.querySelector('header .objects');
      const or = o ? o.getBoundingClientRect() : null;
      const m = document.querySelector('header .menu-wrap');
      const mr = m ? m.getBoundingClientRect() : null;

      const cs = window.getComputedStyle(h);
      return {
        scrollY: window.scrollY,
        headerClass: h.className,
        headerBg: cs.backgroundImage || cs.backgroundColor,
        viewportW: window.innerWidth,
        headerBox: b ? { x: b.x, y: b.y, w: b.width, h: b.height } : null,
        logo: lr ? { x: lr.x, y: lr.y, w: lr.width, h: lr.height } : null,
        sep: sr ? { x: sr.x, y: sr.y, w: sr.width, h: sr.height, centerPercent: ((sr.x + sr.width/2) / window.innerWidth * 100).toFixed(1) + '%' } : null,
        places: pr ? { x: pr.x, y: pr.y, w: pr.width, h: pr.height } : null,
        objects: or ? { x: or.x, y: or.y, w: or.width, h: or.height } : null,
        menu: mr ? { x: mr.x, y: mr.y, w: mr.width, h: mr.height } : null
      };
    })()`);
    console.log(`${pageName} Top State:`, JSON.stringify(topMetrics, null, 2));

    const topShot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1440, height: 80, scale: 1 } });
    fs.writeFileSync(path.join(ARTIFACT_DIR, `navbar_${pageName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_01_top.png`), Buffer.from(topShot.data, 'base64'));

    // 2. SCROLL DOWN STATE
    await cdp.eval(`(() => {
      window.scrollTo({ top: 1200, behavior: 'smooth' });
    })()`);
    await new Promise(r => setTimeout(r, 1200));

    let downMetrics = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      const cs = window.getComputedStyle(h);
      return {
        scrollY: window.scrollY,
        headerClass: h.className,
        headerBg: cs.backgroundImage || cs.backgroundColor
      };
    })()`);
    console.log(`${pageName} Scroll Down State:`, downMetrics);

    const downShot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: Math.round(downMetrics.scrollY), width: 1440, height: 80, scale: 1 } });
    fs.writeFileSync(path.join(ARTIFACT_DIR, `navbar_${pageName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_02_down.png`), Buffer.from(downShot.data, 'base64'));

    // 3. SCROLL BACK UP STATE (TURNS SOLID BLACK)
    await cdp.eval(`(() => {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    })()`);
    await new Promise(r => setTimeout(r, 1200));

    let upMetrics = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      const cs = window.getComputedStyle(h);
      return {
        scrollY: window.scrollY,
        headerClass: h.className,
        headerBgColor: cs.backgroundColor,
        headerBoxShadow: cs.boxShadow,
        headerBackdropBlur: cs.backdropFilter
      };
    })()`);
    console.log(`${pageName} Scroll Up State (Black):`, upMetrics);

    const upShot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: Math.round(upMetrics.scrollY), width: 1440, height: 80, scale: 1 } });
    fs.writeFileSync(path.join(ARTIFACT_DIR, `navbar_${pageName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_03_up_black.png`), Buffer.from(upShot.data, 'base64'));

    // 4. SCROLL BACK TO VERY TOP
    await cdp.eval(`(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })()`);
    await new Promise(r => setTimeout(r, 1200));

    let backToTopMetrics = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      const cs = window.getComputedStyle(h);
      return {
        scrollY: window.scrollY,
        headerClass: h.className,
        headerBg: cs.backgroundImage || cs.backgroundColor
      };
    })()`);
    console.log(`${pageName} Back At Top:`, backToTopMetrics);

    const backShot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1440, height: 80, scale: 1 } });
    fs.writeFileSync(path.join(ARTIFACT_DIR, `navbar_${pageName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_04_back_at_top.png`), Buffer.from(backShot.data, 'base64'));

    console.log(`✓ Completed all state tests for ${pageName}`);
  } finally {
    await cdp.close();
  }
}

async function run() {
  await testPage('http://localhost:3000/', 'Homepage', 9245);
  await testPage('http://localhost:3000/about', 'About', 9246);
  await testPage('http://localhost:3000/projects', 'Projects', 9247);
  await testPage('http://localhost:3000/contact', 'Contact', 9248);
  await testPage('http://localhost:3000/projects/shree-venkatesh.html', 'Project_Detail_Venkatesh', 9249);
  console.log('\n==============================================');
  console.log('ALL VERIFICATION RUNS COMPLETED SUCCESSFULLY!');
  console.log('==============================================');
}

run();
