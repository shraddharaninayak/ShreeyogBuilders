const CDP = require('./cdp_helper.js');

async function inspectMatchedRules() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`(() => {
      const stone = document.querySelector('.c-welcome .-w .stone');
      const places = document.querySelector('.c-welcome .-w .places');
      
      // Let's get all matched CSS rules from document.styleSheets
      function getMatchingRules(el) {
        const matched = [];
        for (const sheet of document.styleSheets) {
          try {
            const rules = sheet.cssRules || sheet.rules;
            for (const r of rules) {
              if (r.selectorText && el.matches(r.selectorText)) {
                matched.push({
                  selector: r.selectorText,
                  cssText: r.cssText
                });
              }
            }
          } catch (e) {}
        }
        return matched;
      }

      return {
        stoneRules: getMatchingRules(stone),
        placesRules: getMatchingRules(places)
      };
    })()`);
    console.log('STONE MATCHING RULES:');
    res.stoneRules.forEach(r => console.log(r.selector, '->', r.cssText));

    console.log('\nPLACES MATCHING RULES:');
    res.placesRules.forEach(r => console.log(r.selector, '->', r.cssText));

  } finally {
    await cdp.close();
  }
}

inspectMatchedRules().catch(console.error);
