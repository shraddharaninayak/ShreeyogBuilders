const fs = require('fs');

const filePath = 'public/_nuxt/default.ea02c3da.js';
let content = fs.readFileSync(filePath, 'utf8');

const target = 'const B=()=>{e&&(e.scrollDesktopMode="disable",e.scrollMobileMode="disable"),_.value=window.scrollY,L.value=!0,s.emit("page-change-call");const r=document.documentElement;let t;clearTimeout(t),t=setTimeout(()=>{if(r.classList.contains("-ready")&&r.classList.remove("-ready"),e){let k;clearTimeout(k),k=setTimeout(()=>{r.classList.contains("-ready")||r.classList.add("-ready"),e.scrollPosition=0,L.value=!1,Q(()=>{e&&(e.canRebuild=!0,e.onResize(!0)),h()}),e.scrollDesktopMode="smooth",e.scrollMobileMode="default"},1200)}},0)};';

const replacement = 'const B=()=>{e&&(e.scrollDesktopMode="disable",e.scrollMobileMode="disable"),_.value=window.scrollY,L.value=!0,s.emit("page-change-call");const r=document.documentElement;let t;clearTimeout(t),t=setTimeout(()=>{let k;clearTimeout(k),k=setTimeout(()=>{r.classList.add("-ready","-loaded"),e&&(e.scrollPosition=0,Q(()=>{e&&(e.canRebuild=!0,e.onResize(!0)),h()}),e.scrollDesktopMode="smooth",e.scrollMobileMode="default"),L.value=!1,r.style.overflowY="auto"},500)},0)};';

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated B() in default.ea02c3da.js');
} else {
  console.error('Target B() NOT found in default.ea02c3da.js');
}
