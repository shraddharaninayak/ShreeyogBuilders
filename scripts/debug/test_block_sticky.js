const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9450);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2500));

    // Apply the block flow sticky fix
    const applied = await cdp.eval(`
      (() => {
        const style = document.createElement('style');
        style.id = 'sticky-magic-fix';
        style.textContent = \`
          .c-objects .-w {
            display: block !important;
            position: relative !important;
          }
          .c-objects .-w .sequence {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 0 !important;
            height: calc(var(--vh, 1vh) * 100) !important;
            z-index: 10 !important;
            margin-bottom: calc(var(--vh, 1vh) * -100) !important;
          }
        \`;
        document.head.appendChild(style);
        return true;
      })()
    `);
    console.log('Applied style:', applied);

    // Now test scrolling to 5500, 6500, 8000, 9500, 11000, 12500, 13500!
    const scrolls = [5500, 6500, 8000, 9500, 11000, 12500, 13500];
    const results = [];

    for (const sy of scrolls) {
      await cdp.eval('window.scrollTo(0, ' + sy + ')');
      await new Promise(r => setTimeout(r, 300));

      const step = await cdp.eval(`
        (() => {
          const seq = document.querySelector('.c-objects .sequence');
          const cards = Array.from(document.querySelectorAll('.c-objects .object-wrapper')).map((w, i) => {
            const r = w.getBoundingClientRect();
            return {
              i,
              top: Math.round(r.top),
              left: Math.round(r.left),
              w: Math.round(r.width),
              h: Math.round(r.height),
              visible: r.top >= -100 && r.top <= window.innerHeight
            };
          });
          const rSeq = seq ? seq.getBoundingClientRect() : null;
          const title = document.querySelector('.c-objects .place-name')?.textContent || '';
          const order = document.querySelector('.c-objects .order')?.textContent?.replace(/\\s+/g, ' ').trim() || '';

          return {
            sy: window.scrollY,
            seqTop: rSeq ? Math.round(rSeq.top) : null,
            seqHeight: rSeq ? Math.round(rSeq.height) : null,
            title,
            order,
            cards
          };
        })()
      `);
      results.push(step);
    }

    console.log('BLOCK FLOW STICKY RESULTS:');
    for (const res of results) {
      console.log('sy=' + res.sy + ': seqTop=' + res.seqTop + ', seqH=' + res.seqHeight + ', title="' + res.title + '" (' + res.order + ')');
      for (const c of res.cards) {
        console.log('  card ' + c.i + ': top=' + c.top + ', ' + c.w + 'x' + c.h + ', inView=' + c.visible);
      }
    }

  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
