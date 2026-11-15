const CDP = require('./cdp_helper.js');
const fs = require('fs');

const updatedCss = `
header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: auto !important;
  padding: 0 !important;
  z-index: 102 !important;
  pointer-events: none !important;
  background: transparent !important;
  background-image: linear-gradient(180deg,
    rgba(123, 81, 54, 0.65) 0%,
    rgba(123, 81, 54, 0.55) 22%,
    rgba(123, 81, 54, 0.35) 45%,
    rgba(123, 81, 54, 0.15) 70%,
    rgba(123, 81, 54, 0) 100%) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  box-shadow: none !important;
  transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

header.-scrolled-down,
header.-scrolled:not(.-scrolled-up) {
  background: transparent !important;
  background-image: linear-gradient(180deg,
    rgba(123, 81, 54, 0.65) 0%,
    rgba(123, 81, 54, 0.55) 22%,
    rgba(123, 81, 54, 0.35) 45%,
    rgba(123, 81, 54, 0.15) 70%,
    rgba(123, 81, 54, 0) 100%) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  box-shadow: none !important;
}

header.-scrolled-up {
  background: rgba(21, 20, 21, 0.98) !important;
  background-image: none !important;
  backdrop-filter: blur(14px) !important;
  -webkit-backdrop-filter: blur(14px) !important;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.6) !important;
}

header .-w {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  position: relative !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: clamp(14px, 1.6vw, 20px) clamp(20px, 3.2vw, 42px) !important;
  box-sizing: border-box !important;
  height: auto !important;
  min-height: 64px !important;
  grid-template-columns: none !important;
  transform: translate3d(0, 0, 0) !important;
}

header .-w a.-nl {
  display: inline-flex !important;
  align-items: center !important;
  pointer-events: all !important;
  margin-right: auto !important;
  text-decoration: none !important;
  flex-shrink: 0 !important;
  z-index: 2 !important;
  grid-area: auto !important;
}

.shreeyog-brand-logo {
  height: clamp(32px, 3.5vw, 40px) !important;
  width: auto !important;
  max-width: 220px !important;
  object-fit: contain !important;
  display: block !important;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45)) !important;
  transition: transform 0.3s ease, filter 0.3s ease !important;
}

header .-w .sep {
  position: absolute !important;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 1px !important;
  height: 22px !important;
  background-color: rgba(21, 20, 21, 0.5) !important;
  pointer-events: none !important;
  margin: 0 !important;
  padding: 0 !important;
  z-index: 2 !important;
  display: block !important;
}

header.-scrolled-up .-w .sep {
  background-color: rgba(255, 255, 255, 0.3) !important;
}

header .-w .places {
  position: absolute !important;
  right: calc(50% + 14px) !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 36px !important;
  padding: 0.45rem 1.4rem !important;
  border-radius: 0.4rem !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  border-top: 1.5px solid rgba(255, 255, 255, 0.22) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
  border-left: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
  color: var(--c-yellow, #f1eade) !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.74rem !important;
  letter-spacing: 0.16em !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
  pointer-events: all !important;
  box-sizing: border-box !important;
  white-space: nowrap !important;
  z-index: 2 !important;
  margin: 0 !important;
  width: auto !important;
  min-width: 90px !important;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease !important;
}

header .-w .objects,
header .-w .objects.about {
  position: absolute !important;
  left: calc(50% + 14px) !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 36px !important;
  padding: 0.45rem 1.4rem !important;
  border-radius: 0.4rem !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  border-top: 1.5px solid rgba(255, 255, 255, 0.22) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
  border-left: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
  color: var(--c-yellow, #f1eade) !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.74rem !important;
  letter-spacing: 0.16em !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
  pointer-events: all !important;
  box-sizing: border-box !important;
  white-space: nowrap !important;
  z-index: 2 !important;
  margin: 0 !important;
  width: auto !important;
  min-width: 90px !important;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease !important;
}

header .-w .places:hover,
header .-w .objects:hover,
header .-w .objects.about:hover {
  background-color: rgba(255, 255, 255, 0.18) !important;
  border-top-color: rgba(255, 255, 255, 0.35) !important;
}

header .-w .places .text,
header .-w .objects .text,
header .-w .objects.about .text {
  color: var(--c-yellow, #f1eade) !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.74rem !important;
  letter-spacing: 0.16em !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  line-height: 1 !important;
  display: inline-block !important;
  opacity: 1 !important;
  visibility: visible !important;
  translate: 0 0 !important;
  white-space: nowrap !important;
}

header .-w .menu-wrap {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  pointer-events: all !important;
  margin-left: auto !important;
  flex-shrink: 0 !important;
  width: auto !important;
  z-index: 2 !important;
  grid-area: auto !important;
}

header .-w .menu-wrap:before {
  display: none !important;
}

header .-w .menu-wrap .menu.button,
header .-w .menu.button,
header .-w button.menu,
button.menu.button[data-v-f52f19c3] {
  display: inline-flex !important;
  flex-direction: row-reverse !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  padding: 0.45rem 1.25rem 0.45rem 1.05rem !important;
  height: 36px !important;
  min-width: 114px !important;
  width: auto !important;
  white-space: nowrap !important;
  border-radius: 0.4rem !important;
  background-color: var(--c-yellow, #f1eade) !important;
  border: 1px solid rgba(var(--c-yellow-rgb, 241, 234, 222), 0.6) !important;
  cursor: pointer !important;
  position: relative !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  transform: translateZ(0) !important;
  flex-shrink: 0 !important;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease !important;
}

header.-scrolled .-w .menu-wrap .menu.button,
header.-scrolled .-w .menu.button {
  flex-grow: 0 !important;
  width: auto !important;
  min-width: 114px !important;
}

header .-w .menu-wrap .button > * {
  grid-area: auto !important;
  position: static !important;
  left: auto !important;
  translate: none !important;
  margin: 0 !important;
}

header .-w .menu-wrap .menu.button .menu-icon,
header.-scrolled .-w .menu-wrap .button .menu-icon,
header .-w .menu.button .menu-icon {
  position: static !important;
  left: auto !important;
  translate: none !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  gap: 4px !important;
  width: 18px !important;
  height: 10px !important;
  margin: 0 !important;
  padding: 0 !important;
  background: none !important;
  flex-shrink: 0 !important;
  pointer-events: none !important;
}

header .-w .menu-wrap .menu.button .menu-icon:before,
header .-w .menu-wrap .menu.button .menu-icon:after,
header .-w .menu.button .menu-icon:before,
header .-w .menu.button .menu-icon:after {
  content: "" !important;
  display: block !important;
  width: 100% !important;
  height: 1.5px !important;
  background-color: #151415 !important;
  border-radius: 1px !important;
  position: static !important;
  background-image: none !important;
}

header .-w .menu-wrap .menu.button .text,
header.-scrolled .-w .menu-wrap .button .text,
header .-w .menu.button .text,
header .-w .menu.button .text span {
  position: static !important;
  left: auto !important;
  translate: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.74rem !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  color: #151415 !important;
  font-weight: 600 !important;
  line-height: 1 !important;
  margin: 0 !important;
  white-space: nowrap !important;
}

header .-w .menu-wrap .menu.button:hover,
header .-w .menu.button:hover {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2) !important;
  transform: translateY(-1px) !important;
}

header .request,
header .-w .request,
header .-w .button.request {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

@media (max-width: 860px) {
  header .-w .places,
  header .-w .sep,
  header .-w .objects,
  header .-w .objects.about {
    display: none !important;
  }
  header .-w {
    padding: 12px 18px !important;
  }
}
`;

async function test() {
  const cdp = new CDP(9237);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));

    await cdp.eval(`(() => {
      const style = document.createElement('style');
      style.id = 'shreeyog-test-navbar-style';
      style.textContent = ${JSON.stringify(updatedCss)};
      document.head.appendChild(style);
      window.scrollTo(0, 800);
      const h = document.querySelector('header');
      h.classList.add('-scrolled-up');
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const scrollY = await cdp.eval(`window.scrollY`);
    const clip = { x: 0, y: scrollY, width: 1440, height: 75, scale: 1 };
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip });
    fs.writeFileSync('C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b/scrolled_up_black_test.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved scrolled_up_black_test.png');
  } finally {
    await cdp.close();
  }
}
test();
