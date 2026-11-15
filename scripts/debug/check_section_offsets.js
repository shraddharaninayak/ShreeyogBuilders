const cp = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const script = `
const sections = document.querySelectorAll('section');
const res = Array.from(sections).map(s => {
  const rect = s.getBoundingClientRect();
  return {
    className: s.className,
    top: rect.top + window.scrollY,
    height: rect.height
  };
});
console.log(JSON.stringify(res, null, 2));
`;

// Let's run a script inside Chrome or check via Node
