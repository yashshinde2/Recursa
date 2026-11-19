import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('public/journey');
const SQ_DIR = path.resolve('public/journey/sq');
const FULL_DIR = path.resolve('public/journey/full');

// Ensure destination directories exist
fs.mkdirSync(SQ_DIR, { recursive: true });
fs.mkdirSync(FULL_DIR, { recursive: true });

// Match exact pattern: ^(prefix)(\d+)\.(jpg|jpeg|png|webp)$
// Prefixes: sgu, dkte, sih, chandigarhsecond, chandigarh, hackoutsav
// Order matters: check chandigarhsecond before chandigarh
const PHOTO_REGEX = /^(sgu|dkte|sih|chandigarhsecond|chandigarh|hackoutsav)(\d+)\.(jpg|jpeg|png|webp)$/i;

async function run() {
  const entries = fs.readdirSync(SOURCE_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name);

  const matched = [];
  const warnings = [];

  for (const file of files) {
    const match = file.match(PHOTO_REGEX);
    if (!match) {
      // Check if it looks like an image or unsupported format
      if (/\.(heic|avif|gif|tiff|bmp)$/i.test(file)) {
        warnings.push(`Unsupported or warning image format: ${file}`);
      }
      continue;
    }
    const prefix = match[1].toLowerCase();
    const num = match[2];
    const baseName = `${prefix}${num}`;
    matched.push({ file, baseName });
  }

  // Sort matched files predictably: by prefix then numeric index
  matched.sort((a, b) => {
    return a.baseName.localeCompare(b.baseName, undefined, { numeric: true });
  });

  console.log(`\nFound ${matched.length} journey photos to process.\n`);
  const results = [];

  for (const item of matched) {
    const srcPath = path.join(SOURCE_DIR, item.file);
    const sqPath = path.join(SQ_DIR, `${item.baseName}.webp`);
    const fullPath = path.join(FULL_DIR, `${item.baseName}.webp`);

    try {
      // Get source metadata
      const srcMeta = await sharp(srcPath).metadata();
      const origDim = `${srcMeta.width}x${srcMeta.height}`;

      // 1. Square: 1200x1200 with attention strategy crop, quality 80
      await sharp(srcPath)
        .rotate()
        .resize(1200, 1200, {
          fit: 'cover',
          position: sharp.strategy.attention,
        })
        .webp({ quality: 80 })
        .toFile(sqPath);

      // 2. Full: max 2000px longest side, fit inside, uncropped, quality 80
      await sharp(srcPath)
        .rotate()
        .resize({
          width: 2000,
          height: 2000,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toFile(fullPath);

      const sqStat = fs.statSync(sqPath);
      const fullStat = fs.statSync(fullPath);

      results.push({
        name: item.baseName,
        source: item.file,
        origDim,
        sqSize: `${Math.round(sqStat.size / 1024)} KB`,
        fullSize: `${Math.round(fullStat.size / 1024)} KB`,
        status: 'OK',
      });
    } catch (err) {
      warnings.push(`Error processing ${item.file}: ${err.message}`);
      results.push({
        name: item.baseName,
        source: item.file,
        origDim: '?',
        sqSize: 'FAILED',
        fullSize: 'FAILED',
        status: 'ERROR',
      });
    }
  }

  // Print results table
  console.table(results, ['name', 'source', 'origDim', 'sqSize', 'fullSize', 'status']);

  if (warnings.length > 0) {
    console.warn('\nWarnings:');
    warnings.forEach((w) => console.warn(`  - ${w}`));
  }

  console.log(`\nProcessed ${results.filter((r) => r.status === 'OK').length} of ${matched.length} photos successfully.\n`);
}

run().catch((err) => {
  console.error('Fatal error in prepare-journey-photos:', err);
  process.exit(1);
});
