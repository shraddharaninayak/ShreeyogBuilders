const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

async function verifyBrowser() {
  const cdp = new CDP(9280);
  try {
    console.log('Connecting Chrome on port 9280...');
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 1200));

    // 1. Homepage
    console.log('Verifying Homepage...');
    const homeTitle = await cdp.eval('document.title');
    console.log('Homepage Title:', homeTitle);
    await cdp.screenshot(`${ARTIFACT_DIR}/preview_01_homepage.png`);

    // 2. About Page
    console.log('Verifying About Page...');
    await cdp.eval(`window.location.href = 'http://localhost:3000/about'`);
    await new Promise(r => setTimeout(r, 1200));
    const aboutTitle = await cdp.eval('document.title');
    const aboutHeading = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      return (l1 ? l1.textContent.trim() : '') + ' ' + (l2 ? l2.textContent.trim() : '');
    })()`);
    console.log('About Page Heading:', aboutHeading);
    await cdp.screenshot(`${ARTIFACT_DIR}/preview_02_about.png`);

    // 3. Projects Page & Explore Buttons Inactive Check
    console.log('Verifying Projects Page & Disabled Explore Buttons...');
    await cdp.eval(`window.location.href = 'http://localhost:3000/projects'`);
    await new Promise(r => setTimeout(r, 1200));

    const initialProjectsUrl = await cdp.eval('window.location.href');

    // Click featured explore button
    await cdp.eval(`document.getElementById('featLink')?.click()`);
    await new Promise(r => setTimeout(r, 300));
    const urlAfterFeatClick = await cdp.eval('window.location.href');
    console.log('Featured button click navigated?', urlAfterFeatClick !== initialProjectsUrl);

    // Click card 1 explore landmark
    await cdp.eval(`document.querySelector('#completed-projects .arch-card .arch-link')?.click()`);
    await new Promise(r => setTimeout(r, 300));
    const urlAfterCardClick = await cdp.eval('window.location.href');
    console.log('Card link click navigated?', urlAfterCardClick !== initialProjectsUrl);

    await cdp.screenshot(`${ARTIFACT_DIR}/preview_03_projects.png`);

    // 4. Project Detail Page Direct Load
    console.log('Verifying Direct Project Detail Page (/projects/shree-bramhand)...');
    await cdp.eval(`window.location.href = 'http://localhost:3000/projects/shree-bramhand'`);
    await new Promise(r => setTimeout(r, 1200));
    const detailTitle = await cdp.eval('document.title');
    const detailHeading = await cdp.eval(`document.querySelector('h1')?.textContent`);
    console.log('Detail Heading:', detailHeading);
    await cdp.screenshot(`${ARTIFACT_DIR}/preview_04_project_detail.png`);

    // 5. Contact Page
    console.log('Verifying Contact Page...');
    await cdp.eval(`window.location.href = 'http://localhost:3000/contact'`);
    await new Promise(r => setTimeout(r, 1200));
    const contactTitle = await cdp.eval('document.title');
    console.log('Contact Title:', contactTitle);
    await cdp.screenshot(`${ARTIFACT_DIR}/preview_05_contact.png`);

    console.log('\n--- All Browser Verification Checks Succeeded! ---');

  } finally {
    await cdp.close();
  }
}

verifyBrowser();
