const fs = require('fs');
const transcript = fs.readFileSync('C:/Users/supri/.gemini/antigravity/brain/89593eea-e8c2-4d6c-9260-30bc2a80253a/.system_generated/logs/transcript_full.jsonl', 'utf8');

const lines = transcript.split('\n').filter(Boolean);
for (const line of lines) {
  const obj = JSON.parse(line);
  if (obj.step_index >= 270 && obj.step_index <= 275 && obj.type === 'PLANNER_RESPONSE') {
    console.log(`Step ${obj.step_index}:`, obj.tool_calls[0].args.script);
  }
}
