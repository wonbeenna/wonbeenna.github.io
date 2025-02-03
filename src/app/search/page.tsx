import { Posts } from '@/app/page';
import React from 'react';
import { getAllPost } from '@/utils/getPost';
import { Metadata } from 'next';
import { defaultOpenGraph } from '@/utils/metadata';
import SearchPostListContainer from '@/components/SearchPostListContainer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Been blog search',
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
