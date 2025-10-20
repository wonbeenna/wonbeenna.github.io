import React from 'react';
import { getAllPost } from '@/utils/getPost';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';
import SearchPostListContainer from '@/components/search/SearchPostListContainer';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Been blog search',
  description: 'Been dev-note search',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/search`
  },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Been blog - search',
    description: 'Been dev-note - search'
  }
};

const Page = async () => {
  const posts = await getAllPost();

  return <SearchPostListContainer posts={posts} />;
};

export default Page;
