const CDP = require('./cdp_helper.js');

async function inspectBriefStyles() {
  const cdp = new CDP(9262);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2000));

    const data = await cdp.eval(`(() => {
      const brief = document.querySelector('.c-brief');
      const w = document.querySelector('.c-brief .-w');
      const caption = document.querySelector('.c-brief .-w .caption');
      const indent = document.querySelector('.c-brief .-w .caption .indent');
      const subtitle = document.querySelector('.c-brief .-w .subtitle');
      const p1 = document.querySelector('.c-brief .-w .p-1');
      const figMap = document.querySelector('.c-brief .figure-map');
      const item = document.querySelector('.c-brief .-w .item');
      const lines = document.querySelector('.c-brief .-w .lines');

      function s(el) {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), width: Math.round(r.width), height: Math.round(r.height) },
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          fontFamily: cs.fontFamily,
          padding: cs.padding,
          margin: cs.margin,
          textAlign: cs.textAlign,
          display: cs.display
        };
      }

      return {
        brief: s(brief),
        w: s(w),
        caption: s(caption),
        indentWidth: indent ? window.getComputedStyle(indent).width : null,
        subtitle: s(subtitle),
        p1: s(p1),
        figMap: s(figMap),
        item: s(item),
        lines: s(lines)
      };
    })()`);

    console.log('BRIEF COMPUTED STYLES:');
    console.log(JSON.stringify(data, null, 2));

  } finally {
    await cdp.close();
  }
}

inspectBriefStyles();
