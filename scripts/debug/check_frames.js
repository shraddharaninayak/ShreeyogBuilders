const fs = require('fs');

// Check byte contents of frame_000 vs frame_001
const f0 = fs.readFileSync('scripts/debug/video_frames/frame_000_0.0s.jpg');
const f1 = fs.readFileSync('scripts/debug/video_frames/frame_001_2.0s.jpg');
console.log('f0 equals f1:', f0.equals(f1));
console.log('f0 length:', f0.length);
