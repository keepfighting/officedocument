// scripts/build.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

// Run Vite build
// try {
//     execSync('pnpm vite build', { stdio: 'inherit' });
// } catch (e) {
//     console.error('Build failed!');
//     process.exit(1);
// }

// Inject timestamp
const swPath = path.join('html', 'sw.js');
if (fs.existsSync(swPath)) {
    const timestamp = Math.floor(Date.now() / 1000);
    let content = fs.readFileSync(swPath, 'utf-8');
    content = content.replace(/SW_VERSION_PLACEHOLDER/g, timestamp.toString());
    fs.writeFileSync(swPath, content);
    console.log(`Service Worker version updated with timestamp: ${timestamp}`);
} else {
    console.warn('Warning: html/sw.js not found, skipping version injection.');
}

console.log('Build completed successfully!');