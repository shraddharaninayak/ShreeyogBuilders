const cp = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = cp.spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9333',
  '--window-size=1440,900',
  'http://localhost:3000/'
]);

async function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
async function getJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

async function run() {
  await wait(3000);
  try {
    const list = await getJSON('http://127.0.0.1:9333/json');
    console.log('Pages:', list.length, list[0].url);
    const target = list[0];
    
    // We can use simple fetch with CDP protocol via websocket or evaluate script via CDP HTTP endpoint
    // Actually Chrome provides /json/protocol, but let's connect via standard ws or WebSocket in node
    const WebSocket = require('ws'); // let's see if ws is available in global or node
  } catch (e) {
    console.error('Err:', e.message);
  } finally {
    chrome.kill();
  }
}
run();
