const { execSync } = require('child_process');

try {
  const output = execSync('powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead(\'C:\\Users\\supri\\Downloads\\obsidianassembly.com.zip\').Entries | ForEach-Object { $_.FullName } | Where-Object { $_ -match \'(place|project|record|video)\' }"').toString();
  console.log('Zip matching entries:\n', output.substring(0, 2000));
} catch (e) {
  console.error('Error reading zip:', e.message);
}
