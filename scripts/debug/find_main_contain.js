const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9470);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const main = document.querySelector('main');
        const rules = [];
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.selectorText && main.matches(rule.selectorText)) {
                if (rule.style.contain) {
                  rules.push({
                    selector: rule.selectorText,
                    contain: rule.style.contain,
                    href: sheet.href || 'inline'
                  });
                }
              }
            }
          } catch (e) {}
        }
        return {
          rules,
          inlineStyle: main.style.contain
        };
      })()
    `);
    console.log('MAIN CONTAIN SOURCE:', JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
