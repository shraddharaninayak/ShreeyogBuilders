const CDP = require('./cdp_helper.js');

async function testPage(url, pageName) {
  const cdp = new CDP(9230);
  try {
    await cdp.connect(url);
    await new Promise(r => setTimeout(r, 2000));
    const before = await cdp.eval(`(() => {
      const menuBtn = document.querySelector('header .menu.button') || document.getElementById('menuToggleBtn');
      const drawer = document.querySelector('.full-screen-menu') || document.getElementById('projects-menu-overlay');
      return {
        hasBtn: !!menuBtn,
        hasDrawer: !!drawer,
        drawerDisplay: drawer ? window.getComputedStyle(drawer).display : 'none'
      };
    })()`);
    console.log(pageName, 'before click:', before);

    // Click menu button
    await cdp.eval(`(() => {
      const menuBtn = document.querySelector('header .menu.button') || document.getElementById('menuToggleBtn');
      if (menuBtn) menuBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 500));

    const after = await cdp.eval(`(() => {
      const drawer = document.querySelector('.full-screen-menu') || document.getElementById('projects-menu-overlay');
      return {
        drawerDisplay: drawer ? window.getComputedStyle(drawer).display : 'none',
        drawerVisibility: drawer ? window.getComputedStyle(drawer).visibility : 'none',
        htmlClass: document.documentElement.className
      };
    })()`);
    console.log(pageName, 'after click:', after);
  } finally {
    await cdp.close();
  }
}

async function run() {
  await testPage('http://localhost:3000/', 'Homepage');
  await testPage('http://localhost:3000/about', 'About');
  await testPage('http://localhost:3000/projects', 'Projects');
  await testPage('http://localhost:3000/contact', 'Contact');
  await testPage('http://localhost:3000/projects/shree-venkatesh.html', 'Project Detail');
}
run();
