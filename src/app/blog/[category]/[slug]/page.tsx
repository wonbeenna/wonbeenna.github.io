import React from 'react';
import { getPost } from '@/utils/getPost';
import Contents from '@/components/Contents';
import PostCardHeader from '@/components/PostCardHeader';

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await getPost(slug);

  return (
    <div className="prose w-full max-w-none">
      <PostCardHeader title={data.data.title} description={data.data.description} date={data.data.date} />
      <Contents {...data.mdx} />
    </div>
  );
};

export default Page;
