#!/usr/bin/env node
/**
 * Asset optimization script for jetq.kz
 * Re-encodes videos and compresses images without changing visuals.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import ffmpegStatic from "ffmpeg-static";
import sharp from "sharp";

const projectRoot = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(projectRoot, "public");

// Minimum horizontal resolution for background videos (1280px width = 720p for 16:9).
const MIN_VIDEO_WIDTH = 1280;

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
}

function run(cmd, args, opts = {}) {
  console.log(`  $ ${cmd} ${args.join(" ")}`);
  execFileSync(cmd, args, { stdio: "inherit", ...opts });
}

async function optimizeVideo(input, output, options = {}) {
  const {
    scale = MIN_VIDEO_WIDTH,
    fps = 24,
    videoBitrate = "1500k",
    maxrate = "2000k",
    bufsize = "4000k",
  } = options;

  const args = [
    "-y",
    "-i", input,
    "-vf", `scale=${scale}:-2:flags=lanczos,fps=${fps}`,
    "-c:v", "libx264",
    "-profile:v", "high",
    "-level", "4.2",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an",
    "-b:v", videoBitrate,
    "-maxrate", maxrate,
    "-bufsize", bufsize,
  ];

  args.push(output);
  run(ffmpegStatic, args);
}

async function optimizeWebM(input, output, options = {}) {
  const { scale = MIN_VIDEO_WIDTH, fps = 24, videoBitrate = "1500k" } = options;
  const args = [
    "-y",
    "-i", input,
    "-vf", `scale=${scale}:-2:flags=lanczos,fps=${fps}`,
    "-c:v", "libvpx-vp9",
    "-b:v", videoBitrate,
    "-deadline", "good",
    "-cpu-used", "2",
    "-row-mt", "1",
    "-an",
  ];
  args.push(output);
  run(ffmpegStatic, args);
}

async function optimizeImage(input, output, options = {}) {
  const { quality = 80, width = 1920 } = options;
  const ext = path.extname(output).toLowerCase();
  let pipeline = sharp(input).rotate().resize({
    width,
    withoutEnlargement: true,
    fit: "inside",
  });

  if (ext === ".webp") {
    pipeline = pipeline.webp({ quality, effort: 6 });
  } else if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true });
  } else if (ext === ".png") {
    pipeline = pipeline.png({ quality, effort: 7, compressionLevel: 9 });
  } else {
    throw new Error(`Unsupported output format: ${ext}`);
  }

  await pipeline.toFile(output);
}

async function convertImage(inputName, outputName, options) {
  const inputPath = path.join(publicDir, inputName);
  const outputPath = path.join(publicDir, outputName);
  if (!fs.existsSync(inputPath)) {
    console.log(`Skipping ${inputName}: file not found`);
    return;
  }
  const before = fs.statSync(inputPath).size;
  await optimizeImage(inputPath, outputPath, options);
  const after = fs.statSync(outputPath).size;
  console.log(`Converted ${inputName} -> ${outputName}: ${formatBytes(before)} -> ${formatBytes(after)} (${((after / before) * 100).toFixed(1)}%)`);
}

async function main() {
  console.log("Optimizing assets...\n");

  // 1. Background videos: strip audio, scale to at least 720p width, create WebM fallback.
  const videosDir = path.join(publicDir, "videos");
  const tmpDir = path.join(projectRoot, ".asset-opt-tmp");
  fs.mkdirSync(tmpDir, { recursive: true });

  if (fs.existsSync(videosDir)) {
    const videoFiles = fs.readdirSync(videosDir).filter((f) => f.endsWith(".mp4"));
    for (const file of videoFiles) {
      const videoInput = path.join(videosDir, file);
      const baseName = path.basename(file, ".mp4");
      const tmpMp4 = path.join(tmpDir, `${baseName}.opt.mp4`);
      const tmpWebm = path.join(tmpDir, `${baseName}.opt.webm`);
      const videoOutput = path.join(videosDir, file);
      const webmOutput = path.join(videosDir, `${baseName}.webm`);

      const before = fs.statSync(videoInput).size;
      console.log(`Re-encoding ${file} (min ${MIN_VIDEO_WIDTH}px width)...`);
      await optimizeVideo(videoInput, tmpMp4, {
        scale: MIN_VIDEO_WIDTH,
        fps: 24,
      });

      console.log(`Creating WebM fallback for ${file}...`);
      try {
        await optimizeWebM(videoInput, tmpWebm, {
          scale: MIN_VIDEO_WIDTH,
          fps: 24,
        });
      } catch (err) {
        console.warn(`WebM fallback failed for ${file} (VP9 encoder may be missing):`, err.message);
      }

      fs.renameSync(tmpMp4, videoOutput);
      if (fs.existsSync(tmpWebm)) fs.renameSync(tmpWebm, webmOutput);

      const after = fs.statSync(videoOutput).size;
      console.log(`Video optimized: ${formatBytes(before)} -> ${formatBytes(after)} (${((after / before) * 100).toFixed(1)}%)`);
      if (fs.existsSync(webmOutput)) {
        console.log(`WebM fallback: ${formatBytes(fs.statSync(webmOutput).size)}`);
      }
    }
  }

  // 2. Convert large photo PNGs to WebP
  console.log("\nConverting large gallery PNGs to WebP...");
  await convertImage("images/placeholder-2.png", "images/placeholder-2.webp", { quality: 82, width: 1600 });
  await convertImage("images/placeholder-3.png", "images/placeholder-3.webp", { quality: 82, width: 1600 });

  // 3. Convert car PNGs to WebP
  console.log("\nConverting car PNGs to WebP...");
  const carsDir = path.join(publicDir, "images/cars");
  const carFiles = fs.readdirSync(carsDir).filter((f) => f.endsWith(".png"));
  for (const file of carFiles) {
    await convertImage(`images/cars/${file}`, `images/cars/${file.replace(/\.png$/, ".webp")}`, {
      quality: 85,
      width: 1200,
    });
  }

  // 4. Clean up original PNGs after converting
  console.log("\nRemoving original PNGs that were converted to WebP...");
  for (const file of carFiles) {
    const pngPath = path.join(carsDir, file);
    fs.rmSync(pngPath, { force: true });
    console.log(`  Removed ${pngPath}`);
  }
  fs.rmSync(path.join(publicDir, "images/placeholder-2.png"), { force: true });
  fs.rmSync(path.join(publicDir, "images/placeholder-3.png"), { force: true });

  // 5. Clean up temp dir
  fs.rmSync(path.join(projectRoot, ".asset-opt-tmp"), { recursive: true, force: true });

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
