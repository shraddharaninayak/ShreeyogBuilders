const http = require('http');
const cp = require('child_process');
const fs = require('fs');

// Launch chrome with remote debugging
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = cp.spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--window-size=1280,800',
  'http://localhost:3000/'
]);

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  await wait(2000);
  try {
    const list = await getJSON('http://127.0.0.1:9222/json');
    console.log('Pages:', list.length);
    const target = list[0];
    const wsUrl = target.webSocketDebuggerUrl;
    console.log('WS URL:', wsUrl);

    const WebSocket = require('ws'); // let's see if ws exists or use simple cdp
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    chrome.kill();
  }
}

run();
