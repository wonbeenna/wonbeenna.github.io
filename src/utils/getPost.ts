import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import matter from 'gray-matter';
import { getSerialize } from '@/utils/sirialize';

const readFileAsync = promisify(fs.readFile);
const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir);

export const POSTS_PATH = path.join(process.cwd(), '_posts');

type Frontmatter = {
  title: string;
  date: string | Date;
  category?: string;
  [key: string]: any;
};

type PostMetaData = {
  slug: string;
  data: Frontmatter;
  modifiedTimeMs: number;
};

type CompiledPost = {
  content: React.ReactElement;
  frontmatter: Frontmatter;
};

type PagingOption = { page?: string; limit?: string };

const isDevelopmentMode = process.env.NODE_ENV !== 'production';

let postMetaCache: {
  metaDataList: PostMetaData[];
  directorySignature: string;
} | null = null;

const compiledPostCache = new Map<string, { compiledPost: CompiledPost; modifiedTimeMs: number }>();

const isMdxFile = (fileName: string): boolean => {
  return /\.mdx?$/.test(fileName);
};

const parseDateToTimestamp = (dateValue: string | Date): number => {
  const timestamp = new Date(dateValue).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const escapeRegExpCharacters = (text: string): string => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const sortByDateDescending = (a: PostMetaData, b: PostMetaData): number => {
  return parseDateToTimestamp(b.data.date) - parseDateToTimestamp(a.data.date);
};

const computeDirectorySignature = async (): Promise<string> => {
  const fileNames = (await readdirAsync(POSTS_PATH)).filter(isMdxFile);
  const fileSignatures = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileStat = await statAsync(path.join(POSTS_PATH, fileName));
      return `${fileName}:${fileStat.mtimeMs}`;
    })
  );
  return fileSignatures.sort().join('|');
};

const buildPostMetaIndex = async (): Promise<PostMetaData[]> => {
  const fileNames = (await readdirAsync(POSTS_PATH)).filter(isMdxFile);

  const metaDataList = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(POSTS_PATH, fileName);
      const [fileContent, fileStat] = await Promise.all([readFileAsync(fullPath), statAsync(fullPath)]);

      const { data } = matter(fileContent);
      const slug = fileName.replace(/\.mdx?$/, '');

      const frontmatter: Frontmatter = {
        ...data,
        title: data?.title ?? '',
        date: data?.date ?? 0
      };

      return {
        slug,
        data: frontmatter,
        modifiedTimeMs: fileStat.mtimeMs
      } as PostMetaData;
    })
  );

  metaDataList.sort(sortByDateDescending);
  return metaDataList;
};

const ensurePostMetaIndex = async (): Promise<PostMetaData[]> => {
  const directorySignature = await computeDirectorySignature();

  if (!postMetaCache || postMetaCache.directorySignature !== directorySignature) {
    const metaDataList = await buildPostMetaIndex();
    postMetaCache = { metaDataList, directorySignature };
  }

  return postMetaCache.metaDataList;
};

const getPostMetaList = async (): Promise<PostMetaData[]> => {
  if (isDevelopmentMode) {
    return ensurePostMetaIndex();
  }

  if (!postMetaCache) {
    const metaDataList = await buildPostMetaIndex();
    const directorySignature = await computeDirectorySignature();
    postMetaCache = { metaDataList, directorySignature };
  }

  return postMetaCache!.metaDataList;
};

export const getAllPost = async (
  paging: PagingOption = { page: '1', limit: '10' },
  category?: string,
  searchKeyword?: string
) => {
  const postMetaList = await getPostMetaList();

  const currentPage = Number(paging.page ?? '1') || 1;
  const limitPerPage = Number(paging.limit ?? '10') || 10;

  let filteredPosts = postMetaList;

  if (searchKeyword && searchKeyword.trim()) {
    const searchRegExp = new RegExp(escapeRegExpCharacters(searchKeyword.trim()), 'i');
    filteredPosts = filteredPosts.filter((post) => searchRegExp.test(String(post.data?.title ?? '')));
  }

  if (category && category.trim()) {
    filteredPosts = filteredPosts.filter((post) => String(post.data?.category ?? '') === category);
  }

  const totalCount = filteredPosts.length;

  if (String(limitPerPage) === '-1') {
    return {
      posts: filteredPosts.map((post) => ({
        slug: post.slug,
        data: post.data
      })),
      total: totalCount
    };
  }

  const offset = (currentPage - 1) * limitPerPage;
  const paginatedPosts = filteredPosts.slice(offset, offset + limitPerPage).map((post) => ({
    slug: post.slug,
    data: post.data
  }));

  return {
    posts: paginatedPosts,
    total: totalCount
  };
};

export const getPost = async (slug: string) => {
  const postMetaList = await getPostMetaList();

  const postIndex = postMetaList.findIndex((postMetaData) => postMetaData.slug === slug);

  if (postIndex === -1) {
    throw new Error(`Post not found: ${slug}`);
  }

  const previousPostMeta = postMetaList[postIndex + 1];
  const nextPostMeta = postMetaList[postIndex - 1];

  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const postStat = await statAsync(postFilePath);
  const currentModifiedTime = postStat.mtimeMs;

  const cachedPost = compiledPostCache.get(slug);
  let compiledPost: CompiledPost;

  if (cachedPost && cachedPost.modifiedTimeMs === currentModifiedTime) {
    compiledPost = cachedPost.compiledPost;
  } else {
    const sourceBuffer = await readFileAsync(postFilePath);
    const { content, frontmatter } = await getSerialize(sourceBuffer);

    compiledPost = {
      content,
      frontmatter: frontmatter as Frontmatter
    };

    compiledPostCache.set(slug, {
      compiledPost,
      modifiedTimeMs: currentModifiedTime
    });

    if (!isDevelopmentMode && compiledPostCache.size > 200) {
      const firstKey = compiledPostCache.keys().next().value as string;
      compiledPostCache.delete(firstKey);
    }
  }

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
