const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(inputPath, outputPath, options = {}) {
  const {
    width = 1200,
    quality = 80,
    format = 'webp'
  } = options;

  try {
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality })
      .toFile(outputPath);

    console.log(`✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error);
  }
}

async function processDirectory(directory) {
  try {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      const inputPath = path.join(directory, file);
      const stats = await fs.stat(inputPath);
      
      if (stats.isDirectory()) {
        await processDirectory(inputPath);
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const outputPath = path.join(
          path.dirname(inputPath),
          `${path.basename(file, path.extname(file))}.webp`
        );
        
        await optimizeImage(inputPath, outputPath);
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

// Configuration for different image types
const imageConfigs = {
  thumbnail: { width: 400, quality: 80 },
  preview: { width: 800, quality: 85 },
  full: { width: 1200, quality: 90 }
};

// Usage
const publicDir = path.join(process.cwd(), 'public');
processDirectory(publicDir)
  .then(() => console.log('✨ Image optimization complete!'))
  .catch(console.error);
