import React from 'react';
import PostListContainer from '@/components/PostListContainer';

const Page = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  return <PostListContainer category={category} />;
};

export default Page;
