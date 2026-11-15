const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9453);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2500));

    // Inject the CSS
    await cdp.eval(`
      (() => {
        const style = document.createElement('style');
        style.id = 'sticky-fixed-mode';
        style.textContent = \`
          .c-objects .sequence {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 10 !important;
            pointer-events: none !important;
          }
          .c-objects .sequence * {
            pointer-events: auto !important;
          }
          .c-objects .sequence .object-wrapper figure {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            aspect-ratio: 1200 / 1600 !important;
            border-radius: 0.4rem !important;
            overflow: hidden !important;
          }
          .c-objects .sequence .object-wrapper figure img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
        \`;
        document.head.appendChild(style);
      })()
    `);

    // Scroll to 10800
    await cdp.eval('window.scrollTo(0, 10800)');
    await new Promise(r => setTimeout(r, 800));

    const check = await cdp.eval(`
      (() => {
        const seq = document.querySelector('.c-objects .sequence');
        const cards = Array.from(document.querySelectorAll('.c-objects .object-wrapper')).map((w, i) => {
          const r = w.getBoundingClientRect();
          const s = getComputedStyle(w);
          return {
            i,
            cls: w.className,
            rTop: Math.round(r.top),
            rLeft: Math.round(r.left),
            rW: Math.round(r.width),
            rH: Math.round(r.height),
            opacity: s.opacity,
            visibility: s.visibility,
            display: s.display,
            transform: s.transform,
            translate: s.translate,
            scale: s.scale,
            zIndex: s.zIndex
          };
        });
        return {
          scrollY: window.scrollY,
          seqCls: seq.className,
          cards
        };
      })()
    `);
    console.log('At y=10800:', JSON.stringify(check, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
