import fs from 'fs';
import path from 'path';
import React from 'react';

const CONTENTS_ROOT_DIRECTORY_PATH = path.join(process.cwd(), 'src', 'contents');

export type ContentPostMetadata = {
  title: string;
  description: string;
  date: string;
};

export type ContentPostModule = {
  default: React.ComponentType;
  metadata: ContentPostMetadata;
};

export type CategoryAndSlug = {
  category: string;
  slug: string;
};

let cachedCategoryAndSlugList: CategoryAndSlug[] | null = null;

async function buildCategoryAndSlugIndex(): Promise<CategoryAndSlug[]> {
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
}

export async function getAllCategoryAndSlugList(): Promise<CategoryAndSlug[]> {
  const categoryAndSlugList = await buildCategoryAndSlugIndex();

  return categoryAndSlugList;
}

export async function getAllSlugs(): Promise<string[]> {
  const categoryAndSlugList = await buildCategoryAndSlugIndex();

  const slugList = categoryAndSlugList.map(({ slug }) => {
    return slug;
  });

  const uniqueSlugSet = new Set(slugList);

  if (uniqueSlugSet.size !== slugList.length) {
    throw new Error('getAllSlugs: slug 값이 중복됩니다. slug는 모든 category에서 유일해야 합니다.');
  }

  return slugList;
}

export async function findCategoryBySlug(slug: string): Promise<string> {
  const categoryAndSlugList = await buildCategoryAndSlugIndex();

  const matchedItem = categoryAndSlugList.find((categoryAndSlug) => {
    return categoryAndSlug.slug === slug;
  });

  if (matchedItem === undefined) {
    throw new Error(`findCategoryBySlug: slug "${slug}" 에 해당하는 category를 찾지 못했습니다.`);
  }

  return matchedItem.category;
}

export async function importPostModuleBySlug(slug: string): Promise<ContentPostModule> {
  const category = await findCategoryBySlug(slug);

  const postModule = await import(`@/contents/${category}/${slug}/${slug}.mdx`);

  return postModule as ContentPostModule;
}
