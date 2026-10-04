const https = require('https');

https.get('https://donate.wwfindia.org/workplace-giving/assets/index-B5jb4OhY.css', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    // find header / navbar classes or background-image
    const matches = d.match(/[^{}]*(?:header|navbar|banner)[^{}]*\{[^}]*\}/gi);
    console.log('CSS matches:', (matches || []).slice(0, 10));
  });
});
