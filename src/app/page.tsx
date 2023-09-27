import React from 'react';
import PostListContainer from '@/components/PostListContainer';

export type PostData = {
  title: string;
  date: string;
  description: string;
  category: string;
  titleImage: string;
};
export interface Posts {
  content: string;
  data: PostData;
  slug: string;
}

export default async function Home() {
  return <PostListContainer />;
}
