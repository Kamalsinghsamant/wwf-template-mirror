const https = require('https');

https.get('https://donate.wwfindia.org/workplace-giving/assets/Home-DyypLRrF.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // find usages of images
    const imgMatches = ['home.jpg', 'j-t-g.jpg', 'CSR-Target-Achievement.png', 'Patronage.png', 'Customied-Corporate-1.png'];
    for (const img of imgMatches) {
      let idx = 0;
      console.log(`\n\n================ IMAGE: ${img} ================`);
      while ((idx = data.indexOf(img, idx)) !== -1) {
        const start = Math.max(0, idx - 200);
        const end = Math.min(data.length, idx + 200);
        console.log('--- match ---');
        console.log(data.substring(start, end));
        idx += img.length;
      }
    }
  });
});
