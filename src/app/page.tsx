import React from 'react';
import PostListContainer from '@/components/PostListContainer';

export type PostData = {
  title: string;
  date: string;
  description: string;
  category: string;
  titleImage: string;
};

export type Post = {
  content: string;
  data: PostData;
  slug: string;
};

export interface Posts {
  posts: Post[];
  total: number;
}

export default async function Home({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;

  return <PostListContainer page={page} />;
}
