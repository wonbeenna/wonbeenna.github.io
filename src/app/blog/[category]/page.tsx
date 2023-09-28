import React from 'react';
import PostListContainer from '@/components/PostListContainer';
import { getCategories } from '@/utils/getCategories';
import { defaultOpenGraph } from '@/utils/metadata';

export const generateMetadata = async ({ params }: { params: { category: string } }) => {
  return {
    title: `Been blog - ${params.category}`,
    openGraph: {
      ...defaultOpenGraph,
      title: `Been blog - ${params.category}`,
      description: `Been dev-note - ${params.category}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${params.category}`
    }
  };
};

export const generateStaticParams = async () => {
  const categories = getCategories();

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
