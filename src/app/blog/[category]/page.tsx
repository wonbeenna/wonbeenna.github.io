import React from 'react';
import PostListContainer from '@/components/PostListContainer';
import { getCategories } from '@/utils/getCategories';

export const generateStaticParams = async () => {
  const categories = await getCategories();

  return categories.map((category) => {
    return {
      category: category.title
    };
  });
};

const Page = async ({ params }: { params: { category: string } }) => {
  return <PostListContainer category={params.category} />;
};

export default Page;
