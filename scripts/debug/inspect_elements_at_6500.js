const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9445);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3000));

    // Scroll to 6500
    await cdp.eval('window.scrollTo(0, 6500)');
    await new Promise(r => setTimeout(r, 800));

    const data = await cdp.eval(`
      (() => {
        const cObj = document.querySelector('.c-objects');
        if (!cObj) return { error: 'No .c-objects' };
        
        const allDescendants = Array.from(cObj.querySelectorAll('*')).map(el => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return {
            tag: el.tagName,
            cls: el.className,
            text: el.children.length === 0 ? el.textContent.trim().slice(0, 30) : undefined,
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            width: Math.round(r.width),
            height: Math.round(r.height),
            opacity: s.opacity,
            visibility: s.visibility,
            display: s.display,
            transform: s.transform !== 'none' ? s.transform.slice(0, 40) : 'none'
          };
        }).filter(item => item.width > 0 && item.height > 0);

        return {
          scrollY: window.scrollY,
          descendantCount: allDescendants.length,
          visibleDescendants: allDescendants
        };
      })()
    `);

    console.log('Visible elements at y=6500:');
    for (const d of data.visibleDescendants) {
      console.log(`${d.tag}.${d.cls} [${d.left}, ${d.top}, ${d.width}x${d.height}] op:${d.opacity} vis:${d.visibility} d:${d.display} ${d.text ? '"' + d.text + '"' : ''}`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
