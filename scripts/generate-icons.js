import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_ICON = path.resolve(__dirname, '../src/assets/images/logo.png');
const OUTPUT_DIR = path.resolve(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Define icon sizes
const ICONS = [
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-16x16.png', size: 16 }
];

// Generate each icon
async function generateIcons() {
  try {
    // Check if source exists
    if (!fs.existsSync(SOURCE_ICON)) {
      console.error(`Source icon not found: ${SOURCE_ICON}`);
      console.log('Creating a default green icon instead...');
      
      // Create a default green square
      for (const icon of ICONS) {
        await sharp({
          create: {
            width: icon.size,
            height: icon.size,
            channels: 4,
            background: { r: 76, g: 175, b: 80, alpha: 1 } // #4CAF50
          }
        })
        .png()
        .toFile(path.join(OUTPUT_DIR, icon.name));
        console.log(`Created ${icon.name}`);
      }
      return;
    }

    // Process existing icon
    for (const icon of ICONS) {
      await sharp(SOURCE_ICON)
        .resize(icon.size, icon.size)
        .png()
        .toFile(path.join(OUTPUT_DIR, icon.name));
      console.log(`Generated ${icon.name}`);
    }

    // Also generate favicon.ico with multiple sizes
    console.log('Generated all icons successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 