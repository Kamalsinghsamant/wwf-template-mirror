const https = require('https');

https.get('https://donate.wwfindia.org/workplace-giving/assets/Footer-DcojWq9s.js', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    // print the navbar code
    const idx = d.indexOf('navbar-brand');
    console.log(d.substring(Math.max(0, idx - 400), Math.min(d.length, idx + 800)));
  });
});
