const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9482);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const testCss = async (cssRules) => {
      await cdp.eval(`
        (() => {
          let el = document.getElementById('debug-override');
          if (!el) {
            el = document.createElement('style');
            el.id = 'debug-override';
            document.head.appendChild(el);
          }
          el.textContent = \`${cssRules}\`;
        })()
      `);

      const scrollPoints = [0, 5588, 6500, 8000, 9200, 10500, 12000, 13000];
      const results = {};
      for (const y of scrollPoints) {
        await cdp.eval(`window.scrollTo(0, ${y})`);
        await new Promise(r => setTimeout(r, 100));
        const data = await cdp.eval(`
          (() => {
            const seq = document.querySelector('.c-objects .sequence');
            const r = seq ? seq.getBoundingClientRect() : null;
            return r ? { top: Math.round(r.top), height: Math.round(r.height), bottom: Math.round(r.bottom) } : null;
          })()
        `);
        results[y] = data;
      }
      return results;
    };

    console.log('--- Test 1: Baseline (current CSS) ---');
    console.log(await testCss(''));

    console.log('--- Test 2: sequence position: sticky, top: 0, grid-row: 1 / span 2 ---');
    console.log(await testCss(`
      .c-objects .-w .sequence {
        position: sticky !important;
        top: 0 !important;
        grid-row: 1 / span 2 !important;
        height: 100vh !important;
      }
    `));

    console.log('--- Test 3: .-w position: relative, sequence position: sticky inside .-w ---');
    console.log(await testCss(`
      .c-objects .-w {
        display: block !important;
        position: relative !important;
      }
      .c-objects .-w .sequence {
        position: sticky !important;
        top: 0 !important;
        height: 100vh !important;
        width: 100% !important;
      }
    `));

  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
