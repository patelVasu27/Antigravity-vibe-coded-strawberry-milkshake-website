const fs = require('fs');
const path = require('path');

// 1x1 Black WebP Base64
const HEADER = "UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
const BUFFER = Buffer.from(HEADER, 'base64');

const TARGET_DIR = path.join(__dirname, '../public/sequence');

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

console.log(`Generating 120 frames in ${TARGET_DIR}...`);

for (let i = 0; i < 120; i++) {
    // Format: 000.webp, 001.webp, ...
    const fileName = i.toString().padStart(3, '0') + '.webp';
    fs.writeFileSync(path.join(TARGET_DIR, fileName), BUFFER);
}

console.log("Done.");
