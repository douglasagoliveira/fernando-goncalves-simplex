import sharp from 'sharp';
import path from 'node:path';

import { writeFile, readFile } from 'node:fs/promises';

async function gradeImage(inputPath, outputPath, options = {}) {
  const {
    saturation = 0.89,
    hue = 4,
    brightness = 0.98,
    width = null,
  } = options;

  console.log(`Processing ${inputPath} -> ${outputPath}`);

  const inputBuffer = await readFile(inputPath);
  let pipeline = sharp(inputBuffer)
    .modulate({
      saturation,
      hue,
      brightness,
    })
    .linear([1.02, 1.02, 1.06], [-2, -2, 3]);

  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }

  const buffer = await pipeline
    .webp({ quality: 92, effort: 6 })
    .toBuffer();

  await writeFile(outputPath, buffer);
  console.log(`Successfully graded: ${outputPath}`);
}

async function main() {
  const targetFiles = [
    {
      in: 'src/imports/optimized/fernando-palestrando-960.webp',
      out: 'src/imports/optimized/fernando-palestrando-graded-960.webp',
    },
    {
      in: 'src/imports/optimized/fernando-palestrando-480.webp',
      out: 'src/imports/optimized/fernando-palestrando-graded-480.webp',
    },
    {
      in: 'src/imports/optimized/fernando-retrato-960.webp',
      out: 'src/imports/optimized/fernando-retrato-graded-960.webp',
    },
    {
      in: 'src/imports/optimized/fernando-retrato-480.webp',
      out: 'src/imports/optimized/fernando-retrato-graded-480.webp',
    },
    {
      in: 'src/imports/fernando-goncalves-simplex-retrato.png',
      out: 'src/imports/optimized/fernando-simplex-retrato-graded-1024.webp',
      width: 1024,
    },
    {
      in: 'src/imports/fernando-goncalves-simplex-retrato.png',
      out: 'src/imports/optimized/fernando-simplex-retrato-graded-640.webp',
      width: 640,
    },
    {
      in: 'src/imports/equipe-motivada.jpg',
      out: 'src/imports/optimized/equipe-motivada-1200.webp',
      width: 1200,
    },
    {
      in: 'src/imports/equipe-motivada.jpg',
      out: 'src/imports/optimized/equipe-motivada-640.webp',
      width: 640,
    },
  ];

  for (const f of targetFiles) {
    await gradeImage(f.in, f.out, {
      saturation: 0.89,
      hue: 4,
      brightness: 0.98,
      width: f.width,
    });
  }
}

main().catch(console.error);
