import fs from 'fs';
import path from 'path';
import {
  CategoryAndSlug,
  ContentPostMeta,
  ContentPostModule,
  ContentPostModuleWithAdjacent,
  GetAllPostItem,
  GetAllPostResult,
  PagingOption
} from '@/types/post';

const CONTENTS_ROOT_DIRECTORY_PATH = path.join(process.cwd(), 'src', '_posts');

let cachedCategoryAndSlugList: CategoryAndSlug[] | null = null;
let cachedPostMetaList: ContentPostMeta[] | null = null;

const parseDateToTimestamp = (value: string | Date): number => {
  const timestamp = new Date(value).getTime();

  if (Number.isNaN(timestamp)) {
    return 0;
  }

  return timestamp;
};

const buildCategoryAndSlugIndex = async (): Promise<CategoryAndSlug[]> => {
  if (cachedCategoryAndSlugList !== null) {
    return cachedCategoryAndSlugList;
  }

  const categoryDirectoryEntries = await fs.promises.readdir(CONTENTS_ROOT_DIRECTORY_PATH, {
    withFileTypes: true
  });

  const categoryDirectoryNames = categoryDirectoryEntries
    .filter((directoryEntry) => {
      return directoryEntry.isDirectory();
    })
    .map((directoryEntry) => {
      return directoryEntry.name;
    });

  const categoryAndSlugList: CategoryAndSlug[] = [];

  for (const categoryDirectoryName of categoryDirectoryNames) {
    const categoryDirectoryPath = path.join(CONTENTS_ROOT_DIRECTORY_PATH, categoryDirectoryName);

    const slugDirectoryEntries = await fs.promises.readdir(categoryDirectoryPath, {
      withFileTypes: true
    });

    const slugDirectoryNames = slugDirectoryEntries
      .filter((directoryEntry) => {
        return directoryEntry.isDirectory();
      })
      .map((directoryEntry) => {
        return directoryEntry.name;
      });

    slugDirectoryNames.forEach((slugDirectoryName) => {
      categoryAndSlugList.push({
        category: categoryDirectoryName,
        slug: slugDirectoryName
      });
    });
  }

  cachedCategoryAndSlugList = categoryAndSlugList;

  return categoryAndSlugList;
};

export const getAllSlugs = async (): Promise<string[]> => {
  const categoryAndSlugList = await buildCategoryAndSlugIndex();

  const slugList = categoryAndSlugList.map(({ slug }) => {
    return slug;
  });

  const uniqueSlugSet = new Set(slugList);

  if (uniqueSlugSet.size !== slugList.length) {
    throw new Error('getAllSlugs: slug 값 중복. slug는 모든 category에서 유일해야함.');
  }

  return slugList;
};

export const findCategoryBySlug = async (slug: string): Promise<string> => {
  const categoryAndSlugList = await buildCategoryAndSlugIndex();

  const matchedItem = categoryAndSlugList.find((categoryAndSlug) => {
    return categoryAndSlug.slug === slug;
  });

  if (matchedItem === undefined) {
    throw new Error(`findCategoryBySlug: slug "${slug}" 에 해당하는 category를 찾지 못함.`);
  }

  return matchedItem.category;
};

const buildPostMetaIndex = async (): Promise<ContentPostMeta[]> => {
  if (cachedPostMetaList !== null) {
    return cachedPostMetaList;
  }

  const categoryAndSlugList = await buildCategoryAndSlugIndex();

  const postMetaList: ContentPostMeta[] = [];

  for (const { category, slug } of categoryAndSlugList) {
    const postModule = (await import(`@/_posts/${category}/${slug}/${slug}.mdx`)) as ContentPostModule;

    if (!postModule.metadata) {
      throw new Error(`buildPostMetaIndex: "@/_posts/${category}/${slug}/${slug}.mdx" 에 metadata가 없음.`);
    }

    postMetaList.push({
      category,
      slug,
      metadata: postModule.metadata
    });
  }

  postMetaList.sort((firstPost, secondPost) => {
    const firstPostTimestamp = parseDateToTimestamp(firstPost.metadata.date);
    const secondPostTimestamp = parseDateToTimestamp(secondPost.metadata.date);

    return secondPostTimestamp - firstPostTimestamp;
  });

  cachedPostMetaList = postMetaList;

  return postMetaList;
};

export const getAllPost = async (paging: PagingOption): Promise<GetAllPostResult> => {
  const postMetaList = await buildPostMetaIndex();

  const total = postMetaList.length;

  const rawPageNumber = Number(paging.page ?? 1);
  const rawLimitNumber = Number(paging.limit ?? 10);

  const pageNumber = Number.isFinite(rawPageNumber) && rawPageNumber > 0 ? rawPageNumber : 1;
  const limitNumber = Number.isFinite(rawLimitNumber) ? rawLimitNumber : 10;

  if (limitNumber === -1) {
    const posts: GetAllPostItem[] = postMetaList.map((postMeta) => {
      return {
        slug: postMeta.slug,
        data: postMeta.metadata
      };
    });

    return {
      posts,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: 1,
      hasPreviousPage: pageNumber > 1,
      hasNextPage: false
    };
  }

  const offset = (pageNumber - 1) * limitNumber;

  const slicedMetaList = postMetaList.slice(offset, offset + limitNumber);

  const posts: GetAllPostItem[] = slicedMetaList.map((postMeta) => {
    return {
      slug: postMeta.slug,
      data: postMeta.metadata
    };
  });

  const totalPages = limitNumber > 0 ? Math.max(1, Math.ceil(total / limitNumber)) : 1;

  return {
    posts,
    total,
    totalPages,
    page: pageNumber,
    limit: limitNumber,
    hasPreviousPage: pageNumber > 1,
    hasNextPage: offset + posts.length < total
  };
};

export const importPostModuleBySlug = async (slug: string): Promise<ContentPostModuleWithAdjacent> => {
  const category = await findCategoryBySlug(slug);

  const postModule = (await import(`@/_posts/${category}/${slug}/${slug}.mdx`)) as ContentPostModule;

  const postMetaList = await buildPostMetaIndex();

  const currentPostIndex = postMetaList.findIndex((postMeta) => {
    return postMeta.slug === slug;
  });

  if (currentPostIndex === -1) {
    throw new Error(`importPostModuleBySlug: slug "${slug}" 에 해당하는 포스트를 metadata 인덱스에서 찾지 못함.`);
  }

  const previousPostMeta = postMetaList[currentPostIndex + 1];
  const nextPostMeta = postMetaList[currentPostIndex - 1];

  const prevPost =
    previousPostMeta !== undefined
      ? {
          slug: previousPostMeta.slug,
          title: previousPostMeta.metadata.title,
          category: previousPostMeta.metadata.category
        }
      : undefined;

  const nextPost =
    nextPostMeta !== undefined
      ? {
          slug: nextPostMeta.slug,
          title: nextPostMeta.metadata.title,
          category: nextPostMeta.metadata.category
        }
      : undefined;

  return {
    ...postModule,
    prevPost,
    nextPost
  };
};
