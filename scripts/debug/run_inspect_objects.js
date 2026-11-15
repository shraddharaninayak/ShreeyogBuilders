const cp = require('child_process');
const fs = require('fs');

const script = `
async function test() {
  const cObjects = document.querySelector('.c-objects');
  const sticky1 = document.querySelector('.c-objects .sticky-container-1');
  const sticky2 = document.querySelector('.c-objects .sticky-container-2');
  const sequence = document.querySelector('.c-objects .sequence');
  const wrappers = document.querySelectorAll('.c-objects .object-wrapper');
  const figures = document.querySelectorAll('.c-objects figure');
  const imgs = document.querySelectorAll('.c-objects img');
  
  const getInfo = (name, el) => {
    if (!el) return { name, exists: false };
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      name,
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      display: style.display,
      visibility: style.visibility,
      opacity: style.opacity,
      position: style.position,
      transform: style.transform,
      zIndex: style.zIndex
    };
  };

  const logState = (label) => {
    console.log('=== ' + label + ' (scrollY: ' + window.scrollY + ') ===');
    console.log(JSON.stringify({
      cObjects: getInfo('cObjects', cObjects),
      sequence: getInfo('sequence', sequence),
      sticky1: getInfo('sticky1', sticky1),
      sticky2: getInfo('sticky2', sticky2),
      wrapper0: getInfo('wrapper0', wrappers[0]),
      fig0: getInfo('fig0', figures[0]),
      img0: imgs[0] ? {
        src: imgs[0].src,
        stringLazy: imgs[0].getAttribute('string-lazy'),
        dataSrc: imgs[0].getAttribute('data-string-lazy-src'),
        cls: imgs[0].className,
        ...getInfo('img0', imgs[0])
      } : null
    }, null, 2));
  };

  logState('INITIAL');

  // Scroll to cObjects top
  const cObjTop = cObjects.getBoundingClientRect().top + window.scrollY;
  console.log('cObjects page top:', cObjTop);

  window.scrollTo(0, cObjTop);
  await new Promise(r => setTimeout(r, 600));
  logState('AT_COBJECTS_TOP');

  // Scroll 1000px down
  window.scrollTo(0, cObjTop + 1000);
  await new Promise(r => setTimeout(r, 600));
  logState('IN_STICKY1_1000');

  // Scroll to sticky2
  const sticky2Top = sticky2.getBoundingClientRect().top + window.scrollY;
  console.log('sticky2 page top:', sticky2Top);
  window.scrollTo(0, sticky2Top);
  await new Promise(r => setTimeout(r, 600));
  logState('AT_STICKY2_TOP');

  // Scroll 1500px into sticky2
  window.scrollTo(0, sticky2Top + 1500);
  await new Promise(r => setTimeout(r, 600));
  logState('IN_STICKY2_1500');

  // Scroll 3000px into sticky2
  window.scrollTo(0, sticky2Top + 3000);
  await new Promise(r => setTimeout(r, 600));
  logState('IN_STICKY2_3000');
}
test();
`;

// Let's create an HTML harness that loads localhost:3000 in an iframe and runs this
const harness = `
<!DOCTYPE html>
<html>
<body>
<iframe id="f" src="http://localhost:3000/" style="width:1440px;height:900px;"></iframe>
<script>
window.addEventListener('load', async () => {
  await new Promise(r => setTimeout(r, 2000));
  const f = document.getElementById('f');
  const fwin = f.contentWindow;
  const fdoc = f.contentDocument;

  const scriptEl = fdoc.createElement('script');
  scriptEl.textContent = ${JSON.stringify(script)};
  fdoc.body.appendChild(scriptEl);
});
</script>
</body>
</html>
`;

fs.writeFileSync('public/test-inspect.html', harness, 'utf8');
console.log('Created test-inspect.html');
