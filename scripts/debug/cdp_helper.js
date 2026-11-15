const cp = require('child_process');
const http = require('http');

class CDP {
  constructor(port = 9222) {
    this.port = port;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect(url = 'http://localhost:3000/') {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    this.proc = cp.spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=${this.port}`,
      '--window-size=1440,900',
      url
    ]);

    // Wait for Chrome to start
    for (let i = 0; i < 30; i++) {
      try {
        const list = await this.getJSON(`http://127.0.0.1:${this.port}/json`);
        if (list && list.length > 0) {
          const wsUrl = list[0].webSocketDebuggerUrl;
          this.ws = new WebSocket(wsUrl);
          await new Promise((resolve, reject) => {
            this.ws.onopen = resolve;
            this.ws.onerror = reject;
          });
          this.ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id && this.callbacks.has(msg.id)) {
              const { resolve, reject } = this.callbacks.get(msg.id);
              this.callbacks.delete(msg.id);
              if (msg.error) reject(new Error(msg.error.message));
              else resolve(msg.result);
            }
          };
          return;
        }
      } catch (e) {
        await new Promise(r => setTimeout(r, 200));
      }
    }
    throw new Error('Could not connect to Chrome debugging port');
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description || 'Eval error');
    }
    return res.result?.value;
  }

  async screenshot(filePath) {
    const fs = require('fs');
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    return filePath;
  }

  async close() {
    try { if (this.ws) this.ws.close(); } catch (e) {}
    try { if (this.proc) this.proc.kill(); } catch (e) {}
  }

  getJSON(url) {
    return new Promise((resolve, reject) => {
      http.get(url, res => {
        let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
      }).on('error', reject);
    });
  }
}

module.exports = CDP;
