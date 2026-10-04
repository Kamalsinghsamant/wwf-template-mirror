const fs = require('fs');
const path = require('path');
const https = require('https');

const wpAssets = [
  { url: 'https://donate.wwfindia.org/workplace-giving/images/home.jpg', dest: 'public/workplace-giving/images/home.jpg' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/j-t-g.jpg', dest: 'public/workplace-giving/images/j-t-g.jpg' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/CSR-Target-Achievement.png', dest: 'public/workplace-giving/images/CSR-Target-Achievement.png' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/svgs/project.svg', dest: 'public/workplace-giving/images/svgs/project.svg' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/svgs/social.svg', dest: 'public/workplace-giving/images/svgs/social.svg' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/svgs/science.svg', dest: 'public/workplace-giving/images/svgs/science.svg' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/svgs/country.svg', dest: 'public/workplace-giving/images/svgs/country.svg' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/svgs/member.svg', dest: 'public/workplace-giving/images/svgs/member.svg' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/logo.png', dest: 'public/workplace-giving/images/logo.png' }
];

async function download(item) {
  const fullPath = path.resolve(__dirname, '..', item.dest);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  return new Promise((resolve) => {
    const file = fs.createWriteStream(fullPath);
    https.get(item.url, (res) => {
      if (res.statusCode !== 200) {
        console.log(`Failed ${item.url}: ${res.statusCode}`);
        file.close();
        return resolve();
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved ${item.dest}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  for (const item of wpAssets) {
    await download(item);
  }
  console.log('ALL WORKPLACE ASSETS SAVED SUCCESSFULLY');
}

run();
