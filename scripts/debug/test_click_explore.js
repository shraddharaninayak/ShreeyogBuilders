const CDP = require('./cdp_helper.js');

async function testExploreClicks() {
  const cdp = new CDP(9276);
  try {
    console.log('Connecting to http://localhost:3000/projects...');
    await cdp.connect('http://localhost:3000/projects');
    await new Promise(r => setTimeout(r, 1500));

    // Get initial URL
    const initialUrl = await cdp.eval('window.location.href');
    console.log('Initial URL:', initialUrl);

    // Test 1: Click the featured "Explore Project" button
    console.log('\n--- Test 1: Click Featured "Explore Project" button ---');
    const featClickResult = await cdp.eval(`(() => {
      const btn = document.getElementById('featLink');
      if (!btn) return { error: 'featLink not found' };
      btn.click();
      return {
        clicked: true,
        text: btn.textContent.trim(),
        href: btn.getAttribute('href'),
        dataHref: btn.getAttribute('data-project-href')
      };
    })()`);
    console.log('featLink click result:', featClickResult);
    await new Promise(r => setTimeout(r, 800));

    let urlAfterFeat = await cdp.eval('window.location.href');
    console.log('URL after clicking featLink:', urlAfterFeat);
    if (urlAfterFeat === initialUrl) {
      console.log('PASS: URL did not navigate!');
    } else {
      console.error('FAIL: URL changed to', urlAfterFeat);
    }

    // Test 2: Click a Satellite Card (e.g. Sat-1)
    console.log('\n--- Test 2: Click Satellite Card 1 ---');
    const satClickResult = await cdp.eval(`(() => {
      const sat = document.querySelector('.satellite-card.sat-1');
      if (!sat) return { error: 'sat-1 not found' };
      const oldFeatName = document.getElementById('featName')?.textContent;
      sat.click();
      return {
        clicked: true,
        oldFeatName: oldFeatName,
        href: sat.getAttribute('href')
      };
    })()`);
    console.log('sat-1 click result:', satClickResult);
    await new Promise(r => setTimeout(r, 500));

    const newFeatName = await cdp.eval(`document.getElementById('featName')?.textContent`);
    console.log('New Featured Name in showcase:', newFeatName);

    let urlAfterSat = await cdp.eval('window.location.href');
    console.log('URL after clicking satellite:', urlAfterSat);
    if (urlAfterSat === initialUrl) {
      console.log('PASS: URL did not navigate! Switched showcase smoothly.');
    } else {
      console.error('FAIL: URL changed to', urlAfterSat);
    }

    // Test 3: Click "Explore Landmark ↗" in Completed Projects
    console.log('\n--- Test 3: Click "Explore Landmark ↗" on Completed Card 1 ---');
    const completedClickResult = await cdp.eval(`(() => {
      const card = document.querySelector('#completed-projects .arch-card');
      const link = card ? card.querySelector('.arch-link') : null;
      if (!link) return { error: 'arch-link in completed projects not found' };
      link.click();
      return {
        clicked: true,
        cardTitle: card.querySelector('.arch-title')?.textContent,
        href: card.getAttribute('href'),
        dataHref: card.getAttribute('data-project-href')
      };
    })()`);
    console.log('Completed card click result:', completedClickResult);
    await new Promise(r => setTimeout(r, 800));

    let urlAfterComp = await cdp.eval('window.location.href');
    console.log('URL after clicking completed Explore link:', urlAfterComp);
    if (urlAfterComp === initialUrl) {
      console.log('PASS: URL did not navigate!');
    } else {
      console.error('FAIL: URL changed to', urlAfterComp);
    }

    // Test 4: Click Ongoing Project card
    console.log('\n--- Test 4: Click Ongoing Project Card ---');
    const ongoingClickResult = await cdp.eval(`(() => {
      const card = document.querySelector('#ongoing-projects .arch-card');
      if (!card) return { error: 'arch-card in ongoing projects not found' };
      card.click();
      return {
        clicked: true,
        cardTitle: card.querySelector('.arch-title')?.textContent,
        href: card.getAttribute('href'),
        dataHref: card.getAttribute('data-project-href')
      };
    })()`);
    console.log('Ongoing card click result:', ongoingClickResult);
    await new Promise(r => setTimeout(r, 800));

    let urlAfterOng = await cdp.eval('window.location.href');
    console.log('URL after clicking ongoing card:', urlAfterOng);
    if (urlAfterOng === initialUrl) {
      console.log('PASS: URL did not navigate!');
    } else {
      console.error('FAIL: URL changed to', urlAfterOng);
    }

    // Test 5: Verify Cursor and Styling
    console.log('\n--- Test 5: Verify Cursor and Styling ---');
    const stylingCheck = await cdp.eval(`(() => {
      const featBtn = document.getElementById('featLink');
      const card = document.querySelector('.arch-card');
      const link = document.querySelector('.arch-link');
      const sat = document.querySelector('.satellite-card');

      return {
        featBtnCursor: window.getComputedStyle(featBtn).cursor,
        cardCursor: window.getComputedStyle(card).cursor,
        linkCursor: window.getComputedStyle(link).cursor,
        satCursor: window.getComputedStyle(sat).cursor,
        featBtnText: featBtn.textContent.trim(),
        cardLinkText: link.textContent.trim()
      };
    })()`);
    console.log('Styling check:', stylingCheck);

    // Capture screenshot of projects page showing hover / cards
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/projects_explore_disabled_check.png');
    console.log('Saved projects_explore_disabled_check.png');

  } finally {
    await cdp.close();
  }
}

testExploreClicks();
