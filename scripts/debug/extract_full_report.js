const fs = require('fs');
const fullPath = 'C:/Users/supri/.gemini/antigravity/brain/89593eea-e8c2-4d6c-9260-30bc2a80253a/.system_generated/logs/transcript_full.jsonl';
if (!fs.existsSync(fullPath)) {
  console.log('Not found:', fullPath);
  process.exit(1);
}
const lines = fs.readFileSync(fullPath, 'utf8').split('\n').filter(Boolean);
for (let i = lines.length - 1; i >= 0; i--) {
  const obj = JSON.parse(lines[i]);
  if (obj.tool_calls) {
    for (const tc of obj.tool_calls) {
      if (tc.name === 'send_message') {
        fs.writeFileSync('scripts/debug/subagent_full_report.md', tc.args.Message, 'utf8');
        console.log('Wrote subagent_full_report.md, length:', tc.args.Message.length);
        process.exit(0);
      }
    }
  }
}
