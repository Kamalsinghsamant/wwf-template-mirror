const https = require('https');

const urls = [
  'https://donate.wwfindia.org/donate-to-wwf-india.php',
  'https://donate.wwfindia.org/protect-our-tigers.php',
  'https://donate.wwfindia.org/save-snow-leopard.php',
  'https://donate.wwfindia.org/fight-climate-change.php',
  'https://donate.wwfindia.org/support-sniffer-dog-programme.php',
  'https://donate.wwfindia.org/support-water-conservation.php',
  'https://donate.wwfindia.org/save-wildlife-from-extinction.php',
  'https://donate.wwfindia.org/join-the-supporter-programme.php'
];

urls.forEach(u => {
  https.get(u, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const regex = /<img[^>]+src=["']([^"']+)["']/gi;
      let m;
      const imgs = [];
      while ((m = regex.exec(body)) !== null) {
        imgs.push(m[1]);
      }
      console.log(u.split('/').pop(), '->', imgs);
    });
  }).on('error', e => console.log(u, e.message));
});
