import React from 'react';
import { getAllPost, getPost } from '@/utils/getPost';
import Contents from '@/components/Contents';
import PostCardHeader from '@/components/PostCardHeader';
import { getCategories } from '@/utils/getCategories';

export const generateStaticParams = async () => {
  const posts = await getAllPost();
  const categories = await getCategories();

  return posts.map((post) => {
    return {
      slug: post.slug,
      category: post.data.category
    };
  });
};

const Page = async ({ params }: { params: { category: string; slug: string } }) => {
  const data = await getPost(params.slug);

  return (
    <div className="prose w-full max-w-none">
      <PostCardHeader title={data.data.title} description={data.data.description} date={data.data.date} />
      <Contents {...data.mdx} />
    </div>
  );
};

export default Page;
