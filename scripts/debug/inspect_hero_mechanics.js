const CDP = require('./cdp_helper.js');

async function inspectHeroMechanics() {
  const cdp = new CDP(9266);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1500));

    const analysis = await cdp.eval(`(() => {
      const welcome = document.querySelector('.c-welcome');
      const w = document.querySelector('.c-welcome .-w');
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const fig = document.querySelector('.c-welcome > figure');
      const img = document.querySelector('.c-welcome > figure img');
      const svg = document.querySelector('.c-welcome svg.about-welcome-path');

      function styles(el, props) {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        const res = {};
        props.forEach(p => res[p] = cs[p]);
        return res;
      }

      const checkProps = [
        'position', 'top', 'bottom', 'left', 'right', 'zIndex', 'display',
        'width', 'height', 'margin', 'padding', 'transform', 'overflow',
        'fontSize', 'lineHeight', 'gridTemplateColumns', 'gridTemplateRows'
      ];

      return {
        welcome: styles(welcome, checkProps),
        w: styles(w, checkProps),
        l1: styles(l1, checkProps),
        l2: styles(l2, checkProps),
        l3: styles(l3, checkProps),
        fig: styles(fig, checkProps),
        img: styles(img, ['width', 'height', 'objectFit', 'position']),
        svg: styles(svg, checkProps),
        scrollTrigger: window.ScrollTrigger ? window.ScrollTrigger.getAll().map(st => ({
          id: st.vars.id,
          trigger: st.trigger?.className,
          start: st.start,
          end: st.end
        })) : 'No ScrollTrigger global'
      };
    })()`);

    console.log(JSON.stringify(analysis, null, 2));
  } finally {
    await cdp.close();
  }
}

inspectHeroMechanics();
