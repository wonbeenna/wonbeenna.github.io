import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { getSerialize } from '@/utils/sirialize';
import type { CompiledPost, Frontmatter, PostMetaData } from '@/types/post';

export const POSTS_PATH = path.join(process.cwd(), '_posts');

const isMdxFile = (name: string): boolean => /\.mdx?$/i.test(name);

const parseDateToTimestamp = (value: string | Date): number => {
  const t = new Date(value).getTime();
  return Number.isFinite(t) ? t : 0;
};

const sortByDateDescending = (a: PostMetaData, b: PostMetaData): number =>
  parseDateToTimestamp(b.data.date) - parseDateToTimestamp(a.data.date);

async function listMdxPathsRecursively(rootDir: string): Promise<string[]> {
  const out: string[] = [];

  async function walk(absDir: string): Promise<void> {
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(absDir, entry.name);
      if (entry.isDirectory()) {
        await walk(abs);
      } else if (isMdxFile(entry.name)) {
        out.push(abs);
      }
    }
  }

  await walk(rootDir);
  return out;
}

const buildIndexAndPathMap = async (): Promise<{
  metaList: PostMetaData[];
  pathMap: Record<string, string>;
}> => {
  const filePaths = await listMdxPathsRecursively(POSTS_PATH);

  const pathMap: Record<string, string> = {};
  const metaList: PostMetaData[] = [];

  for (const abs of filePaths) {
    const base = path.basename(abs);
    const slug = base.replace(/\.mdx?$/i, '');

    if (pathMap[slug]) {
      throw new Error(
        [
          `Duplicate post slug detected: "${slug}"`,
          `- ${pathMap[slug]}`,
          `- ${abs}`,
          `\nSlug is derived from filename only. Make filenames unique across subfolders.`
        ].join('\n')
      );
    }

    pathMap[slug] = abs;

    const [buf, stat] = await Promise.all([fs.readFile(abs), fs.stat(abs)]);
    const { data } = matter(buf);

    const frontmatter: Frontmatter = {
      ...data,
      title: data?.title ?? '',
      date: data?.date ?? 0
    };

    metaList.push({
      slug,
      data: frontmatter,
      modifiedTimeMs: stat.mtimeMs
    });
  }

  metaList.sort(sortByDateDescending);
  return { metaList, pathMap };
};

type PagingOption = { page?: number | string; limit?: number | string };

export const getAllPost = async (paging: PagingOption) => {
  const { metaList } = await buildIndexAndPathMap();

  const total = metaList.length;

  const pageNumberRaw = Number(paging.page ?? 1);
  const limitNumberRaw = Number(paging.limit ?? 10);
  const page = Number.isFinite(pageNumberRaw) && pageNumberRaw > 0 ? pageNumberRaw : 1;
  const limit = Number.isFinite(limitNumberRaw) ? limitNumberRaw : 10;

  if (limit === -1) {
    return {
      total,
      page,
      limit,
      posts: metaList,
      totalPages: 1,
      hasPreviousPage: page > 1,
      hasNextPage: false
    };
  }

  const offset = (page - 1) * limit;
  const posts = metaList.slice(offset, offset + limit);

  const totalPages = limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1;

  return {
    posts,
    total,
    page,
    limit,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: offset + posts.length < total
  };
};

export const getPost = async (slug: string) => {
  const { metaList, pathMap } = await buildIndexAndPathMap();

  const index = metaList.findIndex((m) => m.slug === slug);

  if (index === -1) {
    throw new Error(`Post not found: ${slug}`);
  }

  const previousPostMeta = metaList[index + 1];
  const nextPostMeta = metaList[index - 1];

  const absFilePath = pathMap[slug];
  const sourceBuffer = await fs.readFile(absFilePath);
  const { content, frontmatter } = await getSerialize(sourceBuffer);

  const compiledPost: CompiledPost = {
    content,
    frontmatter: frontmatter as Frontmatter
  };

  return {
    content: compiledPost.content,
    data: compiledPost.frontmatter,
    slug,
    prevPost: previousPostMeta
      ? {
          slug: previousPostMeta.slug,
          title: String(previousPostMeta.data?.title ?? ''),
          category: previousPostMeta.data?.category
        }
      : undefined,
    nextPost: nextPostMeta
      ? {
          slug: nextPostMeta.slug,
          title: String(nextPostMeta.data?.title ?? ''),
          category: nextPostMeta.data?.category
        }
      : undefined
  };
};
