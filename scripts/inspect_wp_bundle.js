const https = require('https');

function checkFile(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /["']([^"']*\.(?:png|jpg|jpeg|webp|svg))["']/g;
        let match;
        const results = new Set();
        while ((match = regex.exec(data)) !== null) {
          results.add(match[1]);
        }
        resolve({ url, results: Array.from(results) });
      });
    }).on('error', (err) => resolve({ url, error: err.message }));
  });
}

async function run() {
  const urls = [
    'https://donate.wwfindia.org/workplace-giving/assets/Home-DyypLRrF.js',
    'https://donate.wwfindia.org/workplace-giving/assets/index-Bv4GDitt.js',
    'https://donate.wwfindia.org/workplace-giving/assets/Footer-DcojWq9s.js',
    'https://donate.wwfindia.org/workplace-giving/assets/Tabs-DwRaQI25.js'
  ];
  for (const u of urls) {
    const res = await checkFile(u);
    console.log('=== ' + u + ' ===');
    console.log(res.results);
  }
}

run();
