'use client';

import { createContext } from 'react';
import type { CompiledPost, ContentPost, Frontmatter } from '@/types/post';

export type LoadedPostData = {
  content: CompiledPost['content'];
  data: Frontmatter;
  slug: string;
  prevPost?: ContentPost;
  nextPost?: ContentPost;
};

export const PostContext = createContext<LoadedPostData | null>(null);

interface PostProviderProps {
  children: React.ReactNode;
  value: LoadedPostData;
}

const PostProvider = ({ children, value }: PostProviderProps) => {
  return <PostContext value={value}>{children}</PostContext>;
};

export default PostProvider;
