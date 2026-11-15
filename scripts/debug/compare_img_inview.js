const CDP = require('./cdp_helper');

async function testPage(url, name) {
  const cdp = new CDP(9518);
  try {
    await cdp.connect(url);
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to 9200
    for (let y = 0; y <= 9200; y += 1000) {
      await cdp.eval(`window.scrollTo(0, ${y})`);
      await new Promise(r => setTimeout(r, 100));
    }
    await new Promise(r => setTimeout(r, 1000));

    const data = await cdp.eval(`
      (() => {
        const imgs = Array.from(document.querySelectorAll('.c-objects .object-wrapper img')).map((img, i) => {
          const wrapper = img.closest('.object-wrapper');
          return {
            i,
            imgClasses: img.className,
            wrapperClasses: wrapper ? wrapper.className : '',
            imgSrc: img.src ? img.src.slice(0, 30) : '',
            imgOffsetTop: img.getBoundingClientRect().top + window.scrollY,
            wrapperOffsetTop: wrapper ? wrapper.getBoundingClientRect().top + window.scrollY : null
          };
        });
        const section = document.querySelector('.c-objects');
        return {
          sectionOffsetTop: section ? section.getBoundingClientRect().top + window.scrollY : null,
          imgs
        };
      })()
    `);
    console.log(name, JSON.stringify(data, null, 2));
  } finally {
    await cdp.close();
  }
}

async function main() {
  await testPage('http://localhost:3000/test-orig/', 'ORIGINAL:');
  await testPage('http://localhost:3000/', 'SHREEYOG:');
}
main();
