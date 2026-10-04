const fs = require('fs');
const content = fs.readFileSync('./Data.json', 'utf8');
const regex = /["']([^"']*(?:workplace-giving|images|svgs|assets)[^"']*)["']/g;
let match;
const found = new Set();
while ((match = regex.exec(content)) !== null) {
  found.add(match[1]);
}
console.log(Array.from(found));
