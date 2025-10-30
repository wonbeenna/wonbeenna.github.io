import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import fg from 'fast-glob';
import sharp from 'sharp';
import exifReader from 'exif-reader';
import { customAlphabet } from 'nanoid';

const SOURCE_DIR = path.resolve(process.cwd(), '../public/assets/blog/javaScript');
const OUTPUT_DIR = path.resolve(process.cwd(), '../public/assets/photos');
const OUTPUT_JSON_PATH = path.join(OUTPUT_DIR, 'photos.json');

const TARGET_WIDTHS = [800, 1200, 1600];
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 60;

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

type PhotoRecord = {
  id: string;
  src: string;
  width: number;
  height: number;
  title?: string;
  date?: string;
  location?: string;
  formats: {
    avif: string[];
    webp: string[];
    original: string;
  };
};

type PhotoJson = {
  total: number;
  photos: PhotoRecord[];
};

const toPublicRelativePath = (absPath: string): string => {
  return '/' + path.relative(path.join(process.cwd(), '../public'), absPath).replace(/\\/g, '/');
};

const removeExtension = (filename: string): string => {
  return filename.replace(/\.[^.]+$/, '');
};

const loadExistingPhotoMap = async (): Promise<Map<string, PhotoRecord>> => {
  const map = new Map<string, PhotoRecord>();

  if (!fsSync.existsSync(OUTPUT_JSON_PATH)) {
    return map;
  }

  try {
    const jsonText = await fs.readFile(OUTPUT_JSON_PATH, 'utf-8');
    const parsed: PhotoJson = JSON.parse(jsonText);

    if (Array.isArray(parsed.photos)) {
      for (const record of parsed.photos) {
        const baseName = path.basename(record.formats.original || '');
        if (baseName) {
          map.set(baseName, record);
        }
      }
    }

    console.log(`📦 캐시 로드: ${map.size}건`);
  } catch (err) {
    console.warn('⚠️ 기존 JSON 파싱 실패, 무시함:', err);
  }

  return map;
};

const findSourceImages = async (): Promise<string[]> => {
  const patterns = ['**/*.{jpg,jpeg,png,webp,tif,tiff,heic,avif}'];
  const entries = await fg(patterns, {
    cwd: SOURCE_DIR,
    onlyFiles: true,
    caseSensitiveMatch: false
  });
  return entries;
};

const extractSemanticMeta = (exifMeta: any, fallbackTitle: string) => {
  const title =
    exifMeta?.xmp?.['dc:title']?.[0] ||
    exifMeta?.exif?.ImageDescription ||
    exifMeta?.iptc?.headline ||
    fallbackTitle.replace(/[_-]/g, ' ');

  const rawDate =
    exifMeta?.exif?.DateTimeOriginal ||
    exifMeta?.exif?.CreateDate ||
    exifMeta?.iptc?.dateCreated ||
    exifMeta?.xmp?.CreateDate;

  const date = (() => {
    if (!rawDate) {
      return undefined;
    }
    const value = Array.isArray(rawDate) ? rawDate[0] : rawDate;
    const dt = new Date(value);
    return Number.isFinite(dt.getTime()) ? dt.toISOString().slice(0, 10) : String(value);
  })();

  const city = exifMeta?.iptc?.city;
  const subLoc = exifMeta?.iptc?.['sub-location'];
  const country = exifMeta?.iptc?.country_or_primary_location_name;
  const location = [subLoc, city, country].filter(Boolean).join(', ') || undefined;

  return { title, date, location };
};

const readImageMetadata = async (buffer: Buffer) => {
  const meta = await sharp(buffer).metadata();
  let exifMeta: any = {};
  try {
    exifMeta = meta.exif ? exifReader(meta.exif) : {};
  } catch {
    exifMeta = {};
  }
  return { meta, exifMeta };
};

const processOneImage = async (relativePathFromSource: string): Promise<PhotoRecord | null> => {
  const absoluteSourcePath = path.join(SOURCE_DIR, relativePathFromSource);
  const baseName = path.basename(relativePathFromSource);
  const fileStem = removeExtension(baseName);

  const buffer = await fs.readFile(absoluteSourcePath);
  const { meta, exifMeta } = await readImageMetadata(buffer);

  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const id = `${fileStem}-${nanoid()}`;
  const { title, date, location } = extractSemanticMeta(exifMeta, fileStem);

  const outputDir = path.join(OUTPUT_DIR, fileStem);
  await fs.mkdir(outputDir, { recursive: true });

  const avifPaths: string[] = [];
  const webpPaths: string[] = [];

  for (const targetWidth of TARGET_WIDTHS) {
    const effectiveWidth = Math.min(targetWidth, width);
    const pipeline = sharp(buffer).resize({ width: effectiveWidth, withoutEnlargement: true });

    const avifOut = path.join(outputDir, `${fileStem}-${targetWidth}.avif`);
    const webpOut = path.join(outputDir, `${fileStem}-${targetWidth}.webp`);

    if (fsSync.existsSync(avifOut) && fsSync.existsSync(webpOut)) {
      console.log(`  ⏩ 변환 스킵(${targetWidth}px): 이미 존재`);
    } else {
      await Promise.all([
        pipeline.clone().toFormat('avif', { quality: AVIF_QUALITY }).toFile(avifOut),
        pipeline.clone().toFormat('webp', { quality: WEBP_QUALITY }).toFile(webpOut)
      ]);
      console.log(`  ✅ 변환 완료(${targetWidth}px)`);
    }

    avifPaths.push(toPublicRelativePath(avifOut));
    webpPaths.push(toPublicRelativePath(webpOut));
  }

  const representativeSrc = webpPaths[webpPaths.length - 1];
  const originalPublicPath = toPublicRelativePath(absoluteSourcePath);

  return {
    id,
    src: representativeSrc,
    width,
    height,
    title,
    date,
    location,
    formats: {
      avif: avifPaths,
      webp: webpPaths,
      original: originalPublicPath
    }
  };
};

const mergeAndSortRecords = (existingMap: Map<string, PhotoRecord>, newRecords: PhotoRecord[]): PhotoRecord[] => {
  const merged = new Map<string, PhotoRecord>();

  for (const [baseName, record] of existingMap) {
    merged.set(baseName, record);
  }

  for (const record of newRecords) {
    const baseName = path.basename(record.formats.original || '');
    if (baseName) {
      merged.set(baseName, record);
    }
  }

  const result = Array.from(merged.values());
  result.sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')));
  return result;
};

const main = async (): Promise<void> => {
  console.log('CWD:', process.cwd());
  console.log('SOURCE_DIR:', SOURCE_DIR);
  console.log('OUTPUT_DIR:', OUTPUT_DIR);

  if (!fsSync.existsSync(SOURCE_DIR)) {
    console.error('❌ 입력 폴더가 없습니다. 경로를 확인하세요.');
    process.exit(1);
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const existingMap = await loadExistingPhotoMap();
  const sourceFiles = await findSourceImages();

  console.log(`🔎 발견한 원본 수: ${sourceFiles.length}`);

  if (sourceFiles.length === 0) {
    console.log('ℹ️ 폴더가 비었습니다.');
    await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify({ total: 0, photos: [] }, null, 2), 'utf-8');
    return;
  }

  const newRecords: PhotoRecord[] = [];

  for (const rel of sourceFiles) {
    const baseName = path.basename(rel);

    if (existingMap.has(baseName)) {
      console.log(`⏩ 스킵: ${baseName}`);
      newRecords.push(existingMap.get(baseName)!);
      continue;
    }

    console.log('🖼️ 처리:', baseName);

    try {
      const record = await processOneImage(rel);
      if (record) {
        newRecords.push(record);
      }
    } catch (err: any) {
      console.error('⚠️ 처리 실패:', baseName, err?.message || err);
    }
  }

  const finalList = mergeAndSortRecords(existingMap, newRecords);
  const json: PhotoJson = { total: finalList.length, photos: finalList };

  await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify(json, null, 2), 'utf-8');
  console.log(`✅ 완료. JSON 갱신 → ${OUTPUT_JSON_PATH}`);
};

main().catch((err) => {
  console.error('💥 스크립트 실패:', err);
  process.exit(1);
});
