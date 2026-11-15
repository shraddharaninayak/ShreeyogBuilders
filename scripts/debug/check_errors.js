const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9525);
  try {
    await cdp.connect('http://localhost:3000/');
    
    // Listen for console logs and exceptions
    await cdp.send('Console.enable');
    await cdp.send('Runtime.enable');

    const logs = [];
    cdp.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data.toString());
      if (msg.method === 'Runtime.consoleAPICalled') {
        logs.push({ type: 'console', text: msg.params.args.map(a => a.value).join(' ') });
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        logs.push({ type: 'exception', desc: msg.params.exceptionDetails.exception.description });
      }
    });

    await new Promise(r => setTimeout(r, 2500));

    const check = await cdp.eval(`
      (() => {
        return {
          readyState: document.readyState,
          htmlClass: document.documentElement.className,
          hasNuxt: !!window.__NUXT__,
          bodyChildCount: document.body.children.length
        };
      })()
    `);

    console.log('PAGE STATUS:', check);
    console.log('CONSOLE LOGS & ERRORS:');
    console.log(logs);

  } finally {
    await cdp.close();
  }
}
main();
