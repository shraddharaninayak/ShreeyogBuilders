const CDP = require('./cdp_helper.js');

async function inspectLoaderDOM() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3000));

    const res = await cdp.eval(`(() => {
      const pt = document.querySelector('.page-transition');
      if (!pt) return { error: 'no .page-transition in DOM' };
      const cs = window.getComputedStyle(pt);
      return {
        classes: pt.className,
        display: cs.display,
        opacity: cs.opacity,
        visibility: cs.visibility,
        zIndex: cs.zIndex,
        rect: pt.getBoundingClientRect(),
        slats: Array.from(pt.querySelectorAll('.g > span')).map(s => ({
          scale: window.getComputedStyle(s).scale,
          transform: window.getComputedStyle(s).transform
        })),
        textOpacity: window.getComputedStyle(pt.querySelector('.t')).opacity
      };
    })()`);
    console.log('PAGE TRANSITION STATE IN DOM:', JSON.stringify(res, null, 2));

  } finally {
    await cdp.close();
  }
}

inspectLoaderDOM().catch(console.error);
