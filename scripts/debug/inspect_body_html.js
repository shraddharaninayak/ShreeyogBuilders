const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9487);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const getRules = el => {
          const rules = [];
          for (const sheet of document.styleSheets) {
            try {
              for (const rule of sheet.cssRules) {
                if (rule.selectorText && el.matches(rule.selectorText)) {
                  rules.push({
                    selector: rule.selectorText,
                    cssText: rule.cssText
                  });
                }
              }
            } catch (e) {}
          }
          return rules;
        };

        return {
          htmlRules: getRules(document.documentElement),
          bodyRules: getRules(document.body),
          htmlComputed: {
            overflow: getComputedStyle(document.documentElement).overflow,
            overflowX: getComputedStyle(document.documentElement).overflowX,
            overflowY: getComputedStyle(document.documentElement).overflowY,
            height: getComputedStyle(document.documentElement).height
          },
          bodyComputed: {
            overflow: getComputedStyle(document.body).overflow,
            overflowX: getComputedStyle(document.body).overflowX,
            overflowY: getComputedStyle(document.body).overflowY,
            height: getComputedStyle(document.body).height
          }
        };
      })()
    `);
    console.log('HTML / BODY STYLES:');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
