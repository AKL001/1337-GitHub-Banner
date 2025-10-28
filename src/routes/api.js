const express = require('express');
const router = express.Router();
const api42Client = require('../api42Client');

// Get user data from 42 API
router.get('/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const userData = await api42Client.getUserData(username);
    res.json(userData);
  } catch (error) {
    console.error('Error in /api/user/:username:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Generate banner HTML
router.post('/generate-banner', async (req, res) => {
  try {
    const { username, theme } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const userData = await api42Client.getUserData(username);
    const bannerURL = `${req.protocol}://${req.get('host')}/api/banner/${username}`;
    
    const htmlCode = `<div align="center">
  <img src="${bannerURL}" alt="${userData.displayname}'s 1337 Banner" />
</div>`;

    const markdownCode = `![${userData.displayname}'s 1337 Banner](${bannerURL})`;

    res.json({
      userData,
      htmlCode,
      markdownCode,
      bannerURL
    });
  } catch (error) {
    console.error('Error in /api/generate-banner:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Serve banner as SVG
router.get('/banner/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const userData = await api42Client.getUserData(username);
    
    // Generate SVG banner
    const svg = generateBannerSVG(userData);
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  } catch (error) {
    console.error('Error generating banner:', error.message);
    
    // Return error SVG
    const errorSvg = `
      <svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="200" fill="#1a1a1a"/>
        <text x="400" y="100" font-family="Arial" font-size="20" fill="#ff0000" text-anchor="middle">
          Error: ${error.message}
        </text>
      </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(errorSvg);
  }
});

function generateBannerSVG(userData) {
  const width = 800;
  const height = 250;
  
  // Calculate level progress
  const levelProgress = (userData.level % 1) * 100;
  const currentLevel = Math.floor(userData.level);
  
  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0f23;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00d9ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00ff88;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <clipPath id="circleClip">
      <circle cx="80" cy="125" r="50"/>
    </clipPath>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  
  <!-- Animated background pattern -->
  <g opacity="0.1">
    <circle cx="100" cy="50" r="80" fill="#00d9ff">
      <animate attributeName="r" values="80;100;80" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="700" cy="200" r="60" fill="#00ff88">
      <animate attributeName="r" values="60;80;60" dur="3s" repeatCount="indefinite"/>
    </circle>
  </g>
  
  <!-- Border -->
  <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="url(#levelGradient)" stroke-width="2" rx="10"/>
  
  <!-- User Image -->
  <circle cx="80" cy="125" r="52" fill="none" stroke="url(#levelGradient)" stroke-width="3" filter="url(#glow)"/>
  <image x="30" y="75" width="100" height="100" href="${userData.image}" clip-path="url(#circleClip)" preserveAspectRatio="xMidYMid slice"/>
  
  <!-- User Info -->
  <text x="160" y="80" font-family="'Courier New', monospace" font-size="28" font-weight="bold" fill="#ffffff" filter="url(#glow)">
    ${userData.displayname}
  </text>
  
  <text x="160" y="110" font-family="'Courier New', monospace" font-size="16" fill="#00d9ff">
    ${userData.login}
  </text>
  
  <text x="160" y="135" font-family="'Courier New', monospace" font-size="14" fill="#aaaaaa">
    📧 ${userData.email || 'N/A'}
  </text>
  
  <text x="160" y="160" font-family="'Courier New', monospace" font-size="14" fill="#aaaaaa">
    🏫 ${userData.campus}
  </text>
  
  <text x="160" y="185" font-family="'Courier New', monospace" font-size="14" fill="${userData.coalitionColor}">
    ⚔️ ${userData.coalition}
  </text>
  
  <!-- Level Section -->
  <g transform="translate(160, 200)">
    <text x="0" y="0" font-family="'Courier New', monospace" font-size="16" fill="#ffffff">
      Level ${currentLevel}
    </text>
    
    <!-- Progress Bar Background -->
    <rect x="100" y="-12" width="500" height="20" rx="10" fill="#2a2a3e"/>
    
    <!-- Progress Bar Fill -->
    <rect x="100" y="-12" width="${levelProgress * 5}" height="20" rx="10" fill="url(#levelGradient)">
      <animate attributeName="width" from="0" to="${levelProgress * 5}" dur="1s" fill="freeze"/>
    </rect>
    
    <!-- Progress Text -->
    <text x="620" y="2" font-family="'Courier New', monospace" font-size="14" fill="#00ff88" text-anchor="end">
      ${levelProgress.toFixed(1)}%
    </text>
  </g>
  
  <!-- Stats -->
  <g transform="translate(650, 80)">
    <text x="0" y="0" font-family="'Courier New', monospace" font-size="14" fill="#ffffff" text-anchor="end">
      💰 ${userData.wallet} ₳
    </text>
    <text x="0" y="25" font-family="'Courier New', monospace" font-size="14" fill="#ffffff" text-anchor="end">
      🎯 ${userData.correctionPoint} CP
    </text>
  </g>
  
  <!-- 1337 Branding -->
  <text x="${width - 10}" y="${height - 10}" font-family="'Courier New', monospace" font-size="12" fill="#666666" text-anchor="end">
    1337 GitHub Banner
  </text>
</svg>
  `.trim();
}

module.exports = router;
