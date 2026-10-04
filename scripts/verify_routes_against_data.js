const http = require('http');
const data = require('../Data.json');

function fetch(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

function normalizeText(t) {
  if (!t) return '';
  return t
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

async function verify() {
  console.log('=== STARTING AUTOMATED ROUTE CONTENT VERIFICATION AGAINST DATA.JSON ===\n');
  let allPassed = true;

  const testCases = [
    {
      route: '/',
      pageData: data.pages[0],
      checks: [
        data.pages[0].sections[0].heading, // "HELP US CREATE A BRIGHTER FUTURE FOR NATURE & HUMANS"
        'Magnificent animals like the snow leopard',
        'Donate Now',
        'ban-1home.jpg'
      ]
    },
    {
      route: '/workplace-giving',
      pageData: data.pages[1],
      checks: [
        data.pages[1].sections[0].heading, // "Workplace Giving"
        data.pages[1].sections[0].subheading, // "Bringing nature closer to your workplace"
        '88%',
        '86%+',
        '67%',
        data.pages[1].sections[2].heading, // "What Is Workplace Giving?"
        data.pages[1].sections[2].content.slice(0, 50),
        data.pages[1].sections[3].items[0].text, // "Rediscover your connection to nature"
        data.pages[1].sections[4].heading, // "Why Associate With WWF-INDIA?"
        '13,000+',
        '30M+',
        'Leaders for Change',
        'Corporate Matching',
        data.pages[1].sections[6].items[0].question,
        '/workplace-giving/images/home.jpg',
        '/workplace-giving/images/j-t-g.jpg',
        '/workplace-giving/images/CSR-Target-Achievement.png',
        '/workplace-giving/images/logo.png'
      ]
    },
    {
      route: '/workplace-giving/leaders-for-change',
      pageData: data.pages[1].sections[5].items[0],
      checks: [
        'Leaders for Change',
        'Learning Hub',
        'Ideas Lab',
        'Action Zone',
        '/workplace-giving/images/j-t-g.jpg',
        '/workplace-giving/images/CSR-Target-Achievement.png',
        '/workplace-giving/images/logo.png'
      ]
    },
    {
      route: '/workplace-giving/corporate-matching',
      pageData: data.pages[1].sections[5].items[1],
      checks: [
        'Corporate Matching',
        'Double the impact of your contribution.',
        'Contribute your time and skills in hourly volunteering opportunities.',
        'Engage your employees through custom in-person and virtual events.',
        '/workplace-giving/images/Customied-Corporate-1.png',
        '/workplace-giving/images/CSR-Target-Achievement.png',
        '/workplace-giving/images/logo.png'
      ]
    },
    {
      route: '/donate-to-wwf-india',
      pageData: data.pages[2],
      checks: [
        data.pages[2].title,
        data.pages[2].sections[0].content.slice(0, 40),
        data.pages[2].sections[1].items[0],
        'Only Indian nationals can donate'
      ]
    },
    {
      route: '/join-the-supporter-programme',
      pageData: data.pages[3],
      checks: [
        data.pages[3].title,
        data.pages[3].sections[0].content.slice(0, 40),
        data.pages[3].sections[1].items[0].slice(0, 30)
      ]
    },
    {
      route: '/save-wildlife-from-extinction',
      pageData: data.pages[4],
      checks: [
        data.pages[4].title,
        data.pages[4].sections[0].content.slice(0, 40),
        data.pages[4].sections[1].items[0].slice(0, 30)
      ]
    },
    {
      route: '/fight-climate-change',
      pageData: data.pages[5],
      checks: [
        data.pages[5].title,
        data.pages[5].sections[0].content.slice(0, 40),
        data.pages[5].sections[1].items[0].slice(0, 30)
      ]
    },
    {
      route: '/support-sniffer-dog-programme',
      pageData: data.pages[6],
      checks: [
        data.pages[6].title,
        data.pages[6].sections[0].content.slice(0, 40),
        data.pages[6].sections[1].items[0].slice(0, 30)
      ]
    },
    {
      route: '/support-water-conservation',
      pageData: data.pages[7],
      checks: [
        data.pages[7].title,
        data.pages[7].sections[0].content.slice(0, 40),
        data.pages[7].sections[1].items[0].slice(0, 30)
      ]
    },
    {
      route: '/protect-our-tigers',
      pageData: data.pages[8],
      checks: [
        data.pages[8].title,
        data.pages[8].sections[0].content.slice(0, 40),
        data.pages[8].sections[1].items[0].slice(0, 30)
      ]
    },
    {
      route: '/save-snow-leopard',
      pageData: data.pages[9],
      checks: [
        data.pages[9].title,
        data.pages[9].sections[0].content.slice(0, 40),
        data.pages[9].sections[1].items[0].slice(0, 30)
      ]
    }
  ];

  for (const tc of testCases) {
    try {
      const res = await fetch(tc.route);
      if (res.status !== 200) {
        console.error(`❌ [${tc.route}] HTTP Status ${res.status}`);
        allPassed = false;
        continue;
      }

      const bodyNormalized = normalizeText(res.body);
      const missing = [];
      for (const check of tc.checks) {
        if (!bodyNormalized.includes(normalizeText(check))) {
          missing.push(check);
        }
      }

      if (missing.length === 0) {
        console.log(`✅ [${tc.route}] ALL ${tc.checks.length} Data.json content checks PASSED`);
      } else {
        console.error(`❌ [${tc.route}] Missing ${missing.length} checks:`, missing);
        allPassed = false;
      }
    } catch (err) {
      console.error(`❌ [${tc.route}] Fetch error:`, err.message);
      allPassed = false;
    }
  }

  console.log('\n========================================================');
  if (allPassed) {
    console.log('🎉 ALL 12 ROUTES VERIFIED SUCCESSFULLY AGAINST DATA.JSON');
  } else {
    console.error('⚠️ SOME CONTENT VERIFICATION CHECKS FAILED');
  }
  console.log('========================================================\n');
}

verify();
