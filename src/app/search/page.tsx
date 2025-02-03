import SearchInput from '@/components/SearchInput';
import { Posts } from '@/app/page';
import PostList from '@/components/PostList';
import React from 'react';
import { getAllPost } from '@/utils/getPost';
import { Metadata } from 'next';
import { defaultOpenGraph } from '@/utils/metadata';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Been blog about',
  openGraph: {
    ...defaultOpenGraph,
    title: 'Been blog - search',
    description: 'Been dev-note - search'
  }
};

interface PageProps {
  searchParams: Promise<{ search: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { search } = await searchParams;
  const posts = getAllPost(
    {
      page: '1',
      limit: '-1'
    },
    undefined,
    search
  );

  return (
    <section>
      <SearchInput />
      <PostList posts={posts as Posts} />
    </section>
  );
};

export default Page;
