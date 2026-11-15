const CDP = require('./cdp_helper.js');

async function inspectFooterStyles() {
  const cdp = new CDP(9252);
  try {
    await cdp.connect('http://localhost:3000/');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    for (let i = 0; i < 30; i++) {
      const ready = await cdp.eval(`!!(document.documentElement && document.documentElement.classList.contains('-ready'))`);
      if (ready) break;
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 1500));

    // Scroll to bottom
    await cdp.eval('window.scrollTo(0, document.documentElement.scrollHeight)');
    await new Promise(r => setTimeout(r, 1000));

    const info = await cdp.eval(`(() => {
      const footer = document.querySelector('footer.page-footer');
      const underlay = document.querySelector('footer .underlay');
      const block = document.querySelector('footer .-w.block');
      const after = document.querySelector('footer .-w.after');
      const stone3 = document.querySelector('footer .stone-3');

      function getCssRules(el) {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
          height: cs.height,
          minHeight: cs.minHeight,
          maxHeight: cs.maxHeight,
          padding: cs.padding,
          margin: cs.margin,
          overflow: cs.overflow,
          position: cs.position,
          top: cs.top,
          bottom: cs.bottom
        };
      }

      return {
        windowHeight: window.innerHeight,
        bodyScrollHeight: document.body.scrollHeight,
        docScrollHeight: document.documentElement.scrollHeight,
        footer: getCssRules(footer),
        underlay: getCssRules(underlay),
        block: getCssRules(block),
        after: getCssRules(after),
        stone3: getCssRules(stone3)
      };
    })()`);

    console.log('FOOTER COMPUTED STYLES:');
    console.log(JSON.stringify(info, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}

inspectFooterStyles();
