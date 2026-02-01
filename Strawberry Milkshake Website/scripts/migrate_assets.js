const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:/Users/tbc21/OneDrive/Desktop/Website Practices/S1/Strawberry Milkshake Website/images/converted.images';
const TARGET_DIR = path.join(__dirname, '../public/sequence');

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Clean existing
console.log(`Cleaning ${TARGET_DIR}...`);
fs.readdirSync(TARGET_DIR).forEach(f => fs.unlinkSync(path.join(TARGET_DIR, f)));

// Get source files and sort them numerically by frame number
const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => f.endsWith('.jpg'))
    .sort((a, b) => {
        // Extract frame number "frame_000" -> 0
        const nA = parseInt(a.match(/frame_(\d+)/)[1]);
        const nB = parseInt(b.match(/frame_(\d+)/)[1]);
        return nA - nB;
    });

console.log(`Found ${files.length} images.`);

files.forEach((file, index) => {
    // 000.jpg, 001.jpg
    const newName = index.toString().padStart(3, '0') + '.jpg';
    fs.copyFileSync(path.join(SOURCE_DIR, file), path.join(TARGET_DIR, newName));
});

console.log(`Migrated ${files.length} frames to ${TARGET_DIR}`);
