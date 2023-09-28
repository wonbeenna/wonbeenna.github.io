import React from 'react';
import { getAllPost, getPost } from '@/utils/getPost';
import Contents from '@/components/Contents';
import PostCardHeader from '@/components/PostCardHeader';

export const generateMetadata = async ({ params }: { params: { category: string; slug: string } }) => {
  const data = await getPost(params.slug);

  return {
    title: `Been blog - ${data.data.title}`,
    description: data.data.description,
    openGraph: {
      title: `Been blog - ${data.data.title}`,
      description: data.data.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${params.category}/${params.slug}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${data.data.titleImage}`,
          width: 800,
          height: 600,
          alt: data.data.title
        }
      ]
    }
  };
};

export const generateStaticParams = async () => {
  const posts = getAllPost(undefined, {
    page: '1',
    limit: '-1'
  });

  return posts.posts.map((post) => {
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
