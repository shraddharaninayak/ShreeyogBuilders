const fs = require('fs');
const path = require('path');

function searchAllDirs(root, maxDepth = 3, currentDepth = 0) {
  if (currentDepth > maxDepth) return;
  try {
    const list = fs.readdirSync(root, { withFileTypes: true });
    for (const item of list) {
      if (item.name === 'node_modules' || item.name === '.git' || item.name.startsWith('$')) continue;
      const full = path.join(root, item.name);
      if (item.isDirectory()) {
        searchAllDirs(full, maxDepth, currentDepth + 1);
      } else {
        if (/\.(mp4|mov|webm|avi|m4v|mkv)$/i.test(item.name) || /recording|obsidian/i.test(item.name)) {
          console.log('Found media/recording:', full, fs.statSync(full).size);
        }
      }
    }
  } catch (e) {}
}

searchAllDirs('d:\\Shreeyogweb');
searchAllDirs('C:\\Users\\supri\\Downloads', 2);
searchAllDirs('C:\\Users\\supri\\Desktop', 2);
