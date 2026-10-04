const http = require('http');

http.get('http://localhost:3000/workplace-giving', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    const imgs = [];
    while ((match = regex.exec(data)) !== null) {
      imgs.push(match[1]);
    }
    console.log('Rendered images on /workplace-giving:');
    console.log(imgs);
  });
}).on('error', (err) => console.error(err));
