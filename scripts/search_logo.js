const https = require('https');

function searchIn(url, term) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let idx = 0;
        const matches = [];
        while ((idx = data.toLowerCase().indexOf(term.toLowerCase(), idx)) !== -1) {
          const start = Math.max(0, idx - 150);
          const end = Math.min(data.length, idx + 150);
          matches.push(data.substring(start, end));
          idx += term.length;
          if (matches.length > 5) break;
        }
        resolve(matches);
      });
    });
  });
}

async function run() {
  const matches = await searchIn('https://donate.wwfindia.org/workplace-giving/assets/index-Bv4GDitt.js', 'logo');
  console.log('index-Bv4GDitt.js logo matches:', matches);
}

run();
