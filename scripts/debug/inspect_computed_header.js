const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9225);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));
    const info = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      const w = document.querySelector('header .-w');
      const logo = document.querySelector('header .-nl');
      const places = document.querySelector('header .places');
      const csH = window.getComputedStyle(h);
      const csW = window.getComputedStyle(w);
      const csL = window.getComputedStyle(logo);
      const csP = window.getComputedStyle(places);
      return {
        header: {
          pos: csH.position,
          top: csH.top,
          paddingTop: csH.paddingTop,
          paddingBottom: csH.paddingBottom,
          height: csH.height,
          transform: csH.transform,
          bg: csH.backgroundImage || csH.backgroundColor
        },
        w: {
          display: csW.display,
          alignItems: csW.alignItems,
          justifyContent: csW.justifyContent,
          padding: csW.padding,
          transform: csW.transform,
          margin: csW.margin,
          gridTemplateColumns: csW.gridTemplateColumns
        },
        logo: {
          display: csL.display,
          transform: csL.transform,
          height: csL.height,
          width: csL.width
        },
        places: {
          display: csP.display,
          transform: csP.transform,
          height: csP.height,
          width: csP.width
        }
      };
    })()`);
    console.log('Computed styles:\n', JSON.stringify(info, null, 2));
  } finally {
    await cdp.close();
  }
}
test();
