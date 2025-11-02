import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import fg from 'fast-glob';
import sharp from 'sharp';
import exifReader, { Exif } from 'exif-reader';
import { customAlphabet } from 'nanoid';
import { format, isDate } from 'date-fns';
import type { PhotoItem } from '@/types/photo';
import { formatAperture, formatShutterSpeed } from '@/utils/exifFormat';

const SOURCE_DIR = path.resolve(process.cwd(), '../public/assets/photos-origin');
const OUTPUT_DIR = path.resolve(process.cwd(), '../public/assets/photos');
const OUTPUT_JSON_PATH = path.join(OUTPUT_DIR, 'photos.json');

const TARGET_WIDTHS = [640, 960, 1280, 1600, 1920, 2560];
const MASTER_LONG_EDGE = 2560;
const WEBP_QUALITY = 80;

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

type PhotoJson = {
  total: number;
  photos: PhotoItem[];
};

const toPublicRelativePath = (absPath: string): string => {
  return '/' + path.relative(path.join(process.cwd(), '../public'), absPath).replace(/\\/g, '/');
};

const removeExtension = (filename: string): string => filename.replace(/\.[^.]+$/, '');

const toISODate = (date?: Date): string | undefined => {
  if (isDate(date)) {
    return format(date, 'yyyy-MM-dd');
  }
  return undefined;
};

const loadExistingPhotoMap = async (): Promise<Map<string, PhotoItem>> => {
  const map = new Map<string, PhotoItem>();
  if (!fsSync.existsSync(OUTPUT_JSON_PATH)) {
    return map;
  }

  try {
    const jsonText = await fs.readFile(OUTPUT_JSON_PATH, 'utf-8');
    const parsed: PhotoJson = JSON.parse(jsonText);

    if (Array.isArray(parsed.photos)) {
      for (const record of parsed.photos) {
        const baseName = path.basename(record.formats.original || '');
        if (baseName) map.set(baseName, record);
      }
    }
    console.log(`캐시 로드: ${map.size}건`);
  } catch (err) {
    console.warn('기존 JSON 파싱 실패, 무시함:', err);
  }
  return map;
};

const findSourceImages = async (): Promise<string[]> => {
  const entries = await fg(['**/*.{jpg,jpeg,png,webp,tif,tiff,heic,avif}'], {
    cwd: SOURCE_DIR,
    onlyFiles: true,
    caseSensitiveMatch: false
  });
  return entries;
};

const extractSemanticMeta = (exifMeta: Exif) => {
  const date = toISODate(exifMeta?.Image?.DateTime);
  const cameraMake = exifMeta?.Image?.Make;
  const cameraModel = exifMeta?.Image?.Model;
  const lensModel = exifMeta?.Photo?.LensModel;
  const iso = exifMeta?.Photo?.ISOSpeedRatings;
  const aperture = formatAperture(exifMeta?.Photo?.ApertureValue);
  const shutterSpeed = formatShutterSpeed(exifMeta?.Photo?.ShutterSpeedValue);

  return {
    date,
    cameraSettings: {
      cameraMake,
      cameraModel,
      lensModel,
      iso,
      shutterSpeed,
      aperture
    }
  };
};

const readExifFromOriginal = async (buffer: Buffer): Promise<Exif | {}> => {
  try {
    const meta = await sharp(buffer).metadata();
    return meta.exif ? exifReader(meta.exif) : {};
  } catch {
    return {};
  }
};

const processOneImage = async (relativePathFromSource: string): Promise<PhotoItem | null> => {
  const absSource = path.join(SOURCE_DIR, relativePathFromSource);
  const baseName = path.basename(relativePathFromSource);
  const fileStem = removeExtension(baseName);

  const buffer = await fs.readFile(absSource);

  const exifMeta = (await readExifFromOriginal(buffer)) as Exif;
  const { date, cameraSettings } = extractSemanticMeta(exifMeta);

  const oriented = sharp(buffer).rotate().withMetadata();
  const meta = await oriented.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  const id = `${fileStem}-${nanoid()}`;
  const outputDir = path.join(OUTPUT_DIR, fileStem);
  await fs.mkdir(outputDir, { recursive: true });

  const blurBuf = await oriented
    .clone()
    .resize(16, 16, { fit: 'inside', withoutEnlargement: true })
    .blur(5)
    .toFormat('webp', { quality: 40 })
    .toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString('base64')}`;

  let resizeWidth = 0;
  let resizeHeight = 0;

  const longEdge = Math.max(width, height);

  for (const target of TARGET_WIDTHS) {
    const effective = Math.min(target, longEdge, MASTER_LONG_EDGE);

    const out = path.join(outputDir, `${fileStem}-${effective}.webp`);
    if (fsSync.existsSync(out)) {
      console.log(`스킵: ${path.basename(out)}`);
      continue;
    }

    const imageInfo = await oriented
      .clone()
      .resize({ width: effective, withoutEnlargement: true })
      .toFormat('webp', { quality: WEBP_QUALITY })
      .toFile(out);
    console.log(`변환: ${path.basename(out)}`);

    resizeWidth = imageInfo.width > resizeWidth ? imageInfo.width : resizeWidth;
    resizeHeight = imageInfo.height > resizeHeight ? imageInfo.height : resizeHeight;
  }

  const loaderBase = path.join(outputDir, `${fileStem}.webp`);
  const loaderBasePublic = toPublicRelativePath(loaderBase);

  const originalPublic = toPublicRelativePath(absSource);

  const record: PhotoItem = {
    id,
    date,
    cameraSettings,
    title: fileStem,
    formats: {
      blurDataURL,
      webp: loaderBasePublic,
      original: originalPublic
    },
    meta: {
      width,
      height,
      resizeWidth,
      resizeHeight
    }
  };

  return record;
};

const mergeAndSortRecords = (existing: Map<string, PhotoItem>, newRecords: PhotoItem[]): PhotoItem[] => {
  const merged = new Map(existing);

  for (const record of newRecords) {
    const base = path.basename(record.formats.original || '');
    if (base) merged.set(base, record);
  }

  const list = Array.from(merged.values());
  list.sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')));
  return list;
};

const main = async (): Promise<void> => {
  console.log('CWD:', process.cwd());
  console.log('SOURCE_DIR:', SOURCE_DIR);
  console.log('OUTPUT_DIR:', OUTPUT_DIR);

  if (!fsSync.existsSync(SOURCE_DIR)) {
    console.error('입력 폴더가 없습니다. 경로를 확인하세요.');
    process.exit(1);
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const existing = await loadExistingPhotoMap();
  const sources = await findSourceImages();

  console.log(`원본 이미지 수: ${sources.length}`);

  if (sources.length === 0) {
    await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify({ total: 0, photos: [] }, null, 2), 'utf-8');
    console.log('ℹ폴더가 비었습니다.');
    return;
  }

  const records: PhotoItem[] = [];

  for (const rel of sources) {
    const base = path.basename(rel);

    if (existing.has(base)) {
      console.log(`스킵(캐시): ${base}`);
      const exist = existing.get(base);
      if (exist) records.push(exist);
      continue;
    }

    console.log('처리:', base);

    try {
      const rec = await processOneImage(rel);
      if (rec) records.push(rec);
    } catch (err: any) {
      console.error('⚠처리 실패:', base, err?.message || err);
    }
  }

  const final = mergeAndSortRecords(existing, records);
  const json: PhotoJson = { total: final.length, photos: final };

  await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify(json, null, 2), 'utf-8');
  console.log(`완료 → ${OUTPUT_JSON_PATH}`);
};

main().catch((err) => {
  console.error('스크립트 실패:', err);
  process.exit(1);
});
