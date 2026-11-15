const CDP = require('./cdp_helper.js');

async function testDesktopVariations() {
  const cdp = new CDP(9268);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1500));

    // Test Approach A: Text in front (z-index: 30 on text, z-index: 10 on figure)
    await cdp.eval(`(() => {
      let s = document.getElementById('test-variation');
      if (!s) {
        s = document.createElement('style');
        s.id = 'test-variation';
        document.head.appendChild(s);
      }
      s.textContent = \`
        @media (min-width: 1024px) {
          .c-welcome .-w span.line-3 { display: none !important; }
          .c-welcome .-w { z-index: 25 !important; }
          .c-welcome .-w span.title { z-index: 25 !important; pointer-events: none; }
          .c-welcome > figure { z-index: 10 !important; }
        }
      \`;
    })()`);
    await new Promise(r => setTimeout(r, 500));
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/variation_A_text_in_front.png');
    console.log('Saved variation_A_text_in_front.png');

    // Test Approach B: Building positioned below the heading with balanced spacing
    await cdp.eval(`(() => {
      const s = document.getElementById('test-variation');
      s.textContent = \`
        @media (min-width: 1024px) {
          .c-welcome .-w span.line-3 { display: none !important; }
          .c-welcome {
            min-height: 105vh !important;
            padding-top: 120px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .c-welcome .-w {
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            z-index: 20 !important;
            margin: 0 auto !important;
          }
          .c-welcome .-w span.line-1 {
            font-size: clamp(4.5rem, 7vw, 7.5rem) !important;
            line-height: 1.05 !important;
            text-align: center !important;
            margin: 0 !important;
          }
          .c-welcome .-w span.line-2 {
            font-size: clamp(4.5rem, 7vw, 7.5rem) !important;
            line-height: 1.05 !important;
            text-align: center !important;
            margin: 0 0 30px 0 !important;
            transform: none !important;
          }
          .c-welcome > figure {
            position: relative !important;
            inset: auto !important;
            margin: 0 auto !important;
            width: clamp(380px, 38vw, 540px) !important;
            height: auto !important;
            aspect-ratio: 1024 / 931 !important;
            border-radius: 20px !important;
            overflow: hidden !important;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15) !important;
            z-index: 10 !important;
            transform: none !important;
          }
          .c-welcome > figure img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            border-radius: 19px !important;
          }
        }
      \`;
    })()`);
    await new Promise(r => setTimeout(r, 500));
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/variation_B_vertical_stack.png');
    console.log('Saved variation_B_vertical_stack.png');

    // Test Approach C: Refined original Obsidian composition (Grid with building lower / text above)
    await cdp.eval(`(() => {
      const s = document.getElementById('test-variation');
      s.textContent = \`
        @media (min-width: 1024px) {
          .c-welcome {
            min-height: 110vh !important;
            position: relative !important;
          }
          .c-welcome .-w span.line-3 { display: none !important; }
          .c-welcome .-w {
            min-height: 85vh !important;
            grid-template-rows: 1fr auto auto 1fr !important;
            z-index: 25 !important;
          }
          .c-welcome .-w span.line-1 {
            --top: 2 !important;
            --left: 4 !important;
            --width: 10 !important;
            font-size: clamp(6rem, 9vw, 10rem) !important;
            line-height: 0.95 !important;
            justify-self: center !important;
            text-align: center !important;
          }
          .c-welcome .-w span.line-2 {
            --top: 3 !important;
            --left: 2 !important;
            --width: 10 !important;
            font-size: clamp(6rem, 9vw, 10rem) !important;
            line-height: 0.95 !important;
            justify-self: center !important;
            text-align: center !important;
            margin-top: 10px !important;
            transform: none !important;
          }
          .c-welcome > figure {
            position: absolute !important;
            bottom: -5% !important;
            top: auto !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: clamp(380px, 35vw, 500px) !important;
            height: auto !important;
            aspect-ratio: 1024 / 931 !important;
            border-radius: 20px !important;
            overflow: hidden !important;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16) !important;
            z-index: 10 !important;
          }
          .c-welcome > figure img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            border-radius: 19px !important;
          }
        }
      \`;
    })()`);
    await new Promise(r => setTimeout(r, 500));
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/variation_C_refined_grid.png');
    console.log('Saved variation_C_refined_grid.png');

  } finally {
    await cdp.close();
  }
}

testDesktopVariations();
