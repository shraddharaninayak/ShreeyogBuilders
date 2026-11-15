const CDP = require('./cdp_helper');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\supri\\.gemini\\antigravity\\brain\\ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function main() {
  const cdp = new CDP(9535);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 1000));

    // Wait for page ready
    for (let i = 0; i < 40; i++) {
      const cls = await cdp.eval('document.documentElement.className');
      if (cls && cls.includes('-ready') && cls.includes('-loaded')) break;
      await new Promise(r => setTimeout(r, 100));
    }

    // Scroll gradually down so lazy engine triggers
    const keypoints = [
      { name: '01_hero', y: 0 },
      { name: '02_places_carousel', y: 2500 },
      { name: '03_interactive_map', y: 5000 },
      { name: '04_objects_the_art_of_living', y: 6500 },
      { name: '05_card_1_arch_character', y: 9200 },
      { name: '06_card_2_thoughtful_spaces', y: 10200 },
      { name: '07_card_3_everyday_comfort', y: 11200 },
      { name: '08_card_4_spaces_to_connect', y: 12200 },
      { name: '09_connection_docking', y: 13200 },
      { name: '10_philosophy_card', y: 13800 },
      { name: '11_marble_footer', y: 14800 }
    ];

    let currentY = 0;
    for (const kp of keypoints) {
      while (currentY < kp.y) {
        currentY = Math.min(kp.y, currentY + 400);
        await cdp.eval(`window.scrollTo(0, ${currentY})`);
        await new Promise(r => setTimeout(r, 40));
      }
      await new Promise(r => setTimeout(r, 400));

      const file = path.join(ARTIFACT_DIR, `final_verified_${kp.name}.png`);
      await cdp.screenshot(file);
      console.log(`Captured: final_verified_${kp.name}.png at y=${kp.y}`);
    }

    // Reverse scroll back up
    console.log('Testing reverse scroll back to top...');
    while (currentY > 0) {
      currentY = Math.max(0, currentY - 600);
      await cdp.eval(`window.scrollTo(0, ${currentY})`);
      await new Promise(r => setTimeout(r, 30));
    }
    await new Promise(r => setTimeout(r, 500));

    const reverseFile = path.join(ARTIFACT_DIR, 'final_verified_12_reverse_back_at_top.png');
    await cdp.screenshot(reverseFile);
    console.log('Captured: final_verified_12_reverse_back_at_top.png at y=0');
    console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');

  } finally {
    await cdp.close();
  }
}
main();
