const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9489);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const found = [];
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.cssText && rule.cssText.includes('overflow')) {
                found.push({
                  href: sheet.href || 'inline <style>',
                  selector: rule.selectorText,
                  cssText: rule.cssText
                });
              }
            }
          } catch (e) {}
        }
        return found;
      })()
    `);
    console.log('ALL OVERFLOW RULES IN STYLESHEETS:');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
