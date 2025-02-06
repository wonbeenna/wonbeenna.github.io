import { Posts } from '@/app/page';
import React from 'react';
import { getAllPost } from '@/utils/getPost';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';
import SearchPostListContainer from '@/components/SearchPostListContainer';

export const dynamic = 'force-static';

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
  const posts = getAllPost({
    page: '1',
    limit: '-1'
  });

  return (
    <section>
      <SearchPostListContainer posts={posts as Posts} />
    </section>
  );
};

export default Page;
