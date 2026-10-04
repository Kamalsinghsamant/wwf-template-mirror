const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  { url: 'https://donate.wwfindia.org/images/logo.webp', dest: 'public/images/logo.webp' },
  { url: 'https://donate.wwfindia.org/images/home-abnner.webp', dest: 'public/images/home-abnner.webp' },
  { url: 'https://donate.wwfindia.org/images/wwf-india.jpg', dest: 'public/images/wwf-india.jpg' },
  { url: 'https://donate.wwfindia.org/images/ti.webp', dest: 'public/images/ti.webp' },
  { url: 'https://donate.wwfindia.org/images/sl.webp', dest: 'public/images/sl.webp' },
  { url: 'https://donate.wwfindia.org/images/Save%20Wildlife.webp', dest: 'public/images/save-wildlife.webp' },
  { url: 'https://donate.wwfindia.org/images/UD.png', dest: 'public/images/climate.png' },
  { url: 'https://donate.wwfindia.org/images/Untitled%20design%20(23).png', dest: 'public/images/sniffer-dog.png' },
  { url: 'https://donate.wwfindia.org/images/swc.png', dest: 'public/images/swc.png' },
  { url: 'https://donate.wwfindia.org/images/suppoter.webp', dest: 'public/images/supporter.webp' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/Patronage.png', dest: 'public/workplace-giving/images/Patronage.png' },
  { url: 'https://donate.wwfindia.org/workplace-giving/images/Customied-Corporate-1.png', dest: 'public/workplace-giving/images/Customied-Corporate-1.png' },
  { url: 'https://donate.wwfindia.org/images/Snow%20Leopard-ic.png', dest: 'public/images/icons/snow-leopard.png' },
  { url: 'https://donate.wwfindia.org/images/Tiger-ic.png', dest: 'public/images/icons/tiger.png' },
  { url: 'https://donate.wwfindia.org/images/Sniffer%20Dogs.png', dest: 'public/images/icons/sniffer-dogs.png' },
  { url: 'https://donate.wwfindia.org/images/Human%20Wildlife%20Conflict.png', dest: 'public/images/icons/conflict.png' },
  { url: 'https://donate.wwfindia.org/images/Poaching-Illegal%20Trade.png', dest: 'public/images/icons/poaching.png' },
  { url: 'https://donate.wwfindia.org/images/Metal%20Detectors.png', dest: 'public/images/icons/metal-detectors.png' },
  { url: 'https://donate.wwfindia.org/images/Forensic%20Field%20Kit.png', dest: 'public/images/icons/forensic-kit.png' },
  { url: 'https://donate.wwfindia.org/images/Research.png', dest: 'public/images/icons/research.png' },
  { url: 'https://donate.wwfindia.org/images/Training.png', dest: 'public/images/icons/training.png' },
  { url: 'https://donate.wwfindia.org/images/Awareness.png', dest: 'public/images/icons/awareness.png' },
  { url: 'https://donate.wwfindia.org/images/Aquatic%20Animal.png', dest: 'public/images/icons/aquatic.png' },
  { url: 'https://donate.wwfindia.org/images/Plastic%20Pollution.png', dest: 'public/images/icons/plastic.png' },
  { url: 'https://donate.wwfindia.org/images/Education%20(1).png', dest: 'public/images/icons/education.png' }
];

async function download(url, destPath) {
  const fullPath = path.resolve(__dirname, '..', destPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(fullPath);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.log(`Failed ${url}: ${res.statusCode}`);
        file.close();
        return resolve();
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${destPath}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error ${url}: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  for (const item of images) {
    await download(item.url, item.dest);
  }
  console.log('ALL DOWNLOADS COMPLETED');
}

run();
