const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9240);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));
    const menus = await cdp.eval(`(() => {
      const all = Array.from(document.querySelectorAll('*')).filter(el => {
        const text = el.textContent || '';
        return (el.className && typeof el.className === 'string' && el.className.includes('menu')) || text.trim() === 'Menu';
      });
      return all.map(el => {
        const r = el.getBoundingClientRect();
        return { tag: el.tagName, cls: el.className, id: el.id, parentTag: el.parentElement ? el.parentElement.tagName : null, parentCls: el.parentElement ? el.parentElement.className : null, r: { x: r.x, y: r.y, w: r.width, h: r.height } };
      });
    })()`);
    console.log(JSON.stringify(menus, null, 2));
  } finally {
    await cdp.close();
  }
}
test();
