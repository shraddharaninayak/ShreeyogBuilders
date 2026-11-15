const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9510);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const testFetch = await cdp.eval(`
      (async () => {
        try {
          const res = await fetch('/images/objects-init/object-1.webp');
          const blob = await res.blob();
          return {
            status: res.status,
            ok: res.ok,
            type: blob.type,
            size: blob.size
          };
        } catch (e) {
          return { error: e.message };
        }
      })()
    `);
    console.log('FETCH /images/objects-init/object-1.webp:', testFetch);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
