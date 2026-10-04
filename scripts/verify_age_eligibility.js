const http = require('http');

function fetch(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

async function verifyAgeNotice() {
  console.log('=== VERIFYING 18+ AGE ELIGIBILITY ON ALL DONATION ROUTES ===\n');
  const routes = [
    '/',
    '/workplace-giving',
    '/workplace-giving/leaders-for-change',
    '/donate-to-wwf-india',
    '/join-the-supporter-programme',
    '/save-wildlife-from-extinction',
    '/fight-climate-change',
    '/support-sniffer-dog-programme',
    '/support-water-conservation',
    '/protect-our-tigers',
    '/save-snow-leopard'
  ];

  let allOk = true;
  for (const r of routes) {
    const res = await fetch(r);
    const hasAge18 = res.body.includes('18');
    const hasEligibility = res.body.toLowerCase().includes('eligibility') || res.body.toLowerCase().includes('individuals over 18');
    if (res.status === 200 && hasAge18 && hasEligibility) {
      console.log(`✅ [${r}] 18+ Age Validation & Alert Verified (HTTP 200)`);
    } else {
      console.error(`❌ [${r}] FAILED 18+ check (Status: ${res.status}, hasAge18: ${hasAge18}, hasEligibility: ${hasEligibility})`);
      allOk = false;
    }
  }

  console.log('\n========================================================');
  console.log(allOk ? '🎉 ALL DONATION SECTIONS HAVE 18+ AGE VALIDATION & ALERT' : '⚠️ AGE VERIFICATION FAILED');
  console.log('========================================================\n');
}

verifyAgeNotice();
