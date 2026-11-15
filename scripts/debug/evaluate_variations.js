const CDP = require('./cdp_helper.js');

async function evaluateVariations() {
  const cdp = new CDP(9269);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1500));

    // Let's test the Obsidian look where "About" and "Shreeyog" flank the building or sit nicely above
    // What if "About" is on the left, and "Shreeyog" is on the right, or "About Shreeyog" is a grand title?
    // Let's check what the user specifically asked for:
    // "Display the complete heading: "About Shreeyog".
    // Do not allow the building image to cover or hide any part of the heading.
    // Correct the heading's position, width, height, and alignment.
    // Ensure both words are fully visible without clipping.
    // Adjust the image position so it does not overlap the heading incorrectly.
    // Preserve the original premium serif typography and decorative gold line design."

    const rects = await cdp.eval(`(() => {
      // Let's test:
      // Option 1: Stacked "About" then "Shreeyog"
      // Option 2: Single line "About Shreeyog"
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      return {
        l1Text: l1?.textContent,
        l2Text: l2?.textContent
      };
    })()`);
    console.log(rects);
  } finally {
    await cdp.close();
  }
}

evaluateVariations();
