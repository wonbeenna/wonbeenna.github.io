import React from 'react';

export type ContentPostMetadata = {
  title: string;
  description: string;
  date: string;
  category?: string;
  titleImage?: string;
};

export type ContentPostModule = {
  default: React.ComponentType;
  metadata: ContentPostMetadata;
};

export type CategoryAndSlug = {
  slug: string;
  category: string;
};

export type AdjacentPost = {
  slug: string;
  title: string;
  category?: string;
};

export type ContentPostModuleWithAdjacent = ContentPostModule & {
  prevPost?: AdjacentPost;
  nextPost?: AdjacentPost;
};

export interface ContentPostMeta extends CategoryAndSlug {
  metadata: ContentPostMetadata;
}

export type PagingOption = {
  page?: number | string;
  limit?: number | string;
};

export type GetAllPostItem = {
  slug: string;
  data: ContentPostMetadata;
};

export type GetAllPostResult = {
  posts: GetAllPostItem[];
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
