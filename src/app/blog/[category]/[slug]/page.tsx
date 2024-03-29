import React from 'react';
import { getAllPost, getPost } from '@/utils/getPost';
import Contents from '@/components/Contents';
import PostCardHeader from '@/components/PostCardHeader';
import dynamic from 'next/dynamic';
import ContentsPage from '@/components/ContentsPage';

export const generateMetadata = async ({ params }: { params: { category: string; slug: string } }) => {
  const data = await getPost(params.slug);

  return {
    title: `Been blog - ${data.data.title}`,
    description: data.data.description,
    openGraph: {
      title: `Been blog - ${data.data.title}`,
      description: data.data.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.category}/${params.slug}`,
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
  const posts = getAllPost({
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

const Comment = dynamic(() => import('../../../../components/Comment'), { ssr: false });

const Page = async ({ params }: { params: { category: string; slug: string } }) => {
  const data = await getPost(params.slug);

  return (
    <div className="prose w-full max-w-none">
      <PostCardHeader title={data.data.title} description={data.data.description} date={data.data.date} />
      <Contents {...data.mdx} />
      <ContentsPage prevPost={data.prevPost} nextPost={data.nextPost} />
      <Comment />
    </div>
  );
};

export default Page;
