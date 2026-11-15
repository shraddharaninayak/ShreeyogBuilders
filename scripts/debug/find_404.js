const fs = require('fs');
const transcript = fs.readFileSync('C:/Users/supri/.gemini/antigravity/brain/89593eea-e8c2-4d6c-9260-30bc2a80253a/.system_generated/logs/transcript_full.jsonl', 'utf8');

const lines = transcript.split('\n').filter(Boolean);
for (const line of lines) {
  if (line.includes('404') || line.includes('ERR_ABORTED')) {
    console.log(line.slice(0, 300));
  }
}
