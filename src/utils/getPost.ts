import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { getSerialize } from '@/utils/sirialize';
import type { CompiledPost, Frontmatter, PostMetaData } from '@/types/post';

export const POSTS_PATH = path.join(process.cwd(), '_posts');

const isMdxFile = (fileName: string): boolean => /\.mdx?$/i.test(fileName);

const parseDateToTimestamp = (value: string | Date): number => {
  const t = new Date(value).getTime();
  return Number.isFinite(t) ? t : 0;
};

const sortByDateDescending = (a: PostMetaData, b: PostMetaData): number =>
  parseDateToTimestamp(b.data.date) - parseDateToTimestamp(a.data.date);

const buildPostMetaIndex = async (): Promise<PostMetaData[]> => {
  const fileNames = (await fs.readdir(POSTS_PATH)).filter(isMdxFile);

  const metas = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(POSTS_PATH, fileName);
      const [buf, stat] = await Promise.all([fs.readFile(fullPath), fs.stat(fullPath)]);

      const { data } = matter(buf);
      const slug = fileName.replace(/\.mdx?$/i, '');

      const frontmatter: Frontmatter = {
        ...data,
        title: data?.title ?? '',
        date: data?.date ?? 0
      };

      return {
        slug,
        data: frontmatter,
        modifiedTimeMs: stat.mtimeMs
      } as PostMetaData;
    })
  );

  metas.sort(sortByDateDescending);
  return metas;
};

const escapeRegExpCharacters = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

type PagingOption = { page?: number | string; limit?: number | string };

export const getAllPost = async (pagingOrSearchKeyword?: PagingOption | string, optionalSearchKeyword?: string) => {
  const metaList = await buildPostMetaIndex();

  let paging: PagingOption = { page: 1, limit: 10 };
  let searchKeyword = '';

  if (typeof pagingOrSearchKeyword === 'string') {
    searchKeyword = pagingOrSearchKeyword;
  } else if (pagingOrSearchKeyword && typeof pagingOrSearchKeyword === 'object') {
    paging = { ...paging, ...pagingOrSearchKeyword };
    searchKeyword = optionalSearchKeyword ?? '';
  }

  let filtered = metaList;

  if (searchKeyword.trim()) {
    const reg = new RegExp(escapeRegExpCharacters(searchKeyword.trim()), 'i');
    filtered = filtered.filter((post) => reg.test(String(post.data?.title ?? '')));
  }

  const total = filtered.length;

  const pageNumberRaw = Number(paging.page ?? 1);
  const limitNumberRaw = Number(paging.limit ?? 10);
  const page = Number.isFinite(pageNumberRaw) && pageNumberRaw > 0 ? pageNumberRaw : 1;
  const limit = Number.isFinite(limitNumberRaw) ? limitNumberRaw : 10;

  if (limit === -1) {
    return {
      posts: filtered,
      total,
      page,
      limit,
      totalPages: 1,
      hasPreviousPage: page > 1,
      hasNextPage: false
    };
  }

  const offset = (page - 1) * limit;
  const posts = filtered.slice(offset, offset + limit);

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
  const metaList = await buildPostMetaIndex();
  const index = metaList.findIndex((m) => m.slug === slug);
  if (index === -1) {
    throw new Error(`Post not found: ${slug}`);
  }

  const previousPostMeta = metaList[index + 1];
  const nextPostMeta = metaList[index - 1];

  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const sourceBuffer = await fs.readFile(postFilePath);
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
