import React from 'react';
import WaveBanner from '@/components/common/WaveBanner';
import '@/styles/prism.css';
import { getAllSlugs, importPostModuleBySlug } from '@/utils/getPosts';
import BlogDetailContainer from '@/components/blog/BlogDetailContainer';
import { buildMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const { metadata } = await importPostModuleBySlug(slug);

  return buildMetadata({
    title: metadata.title,
    description: metadata.description ?? '',
    path: `/blog/${slug}`,
    imagesPath: metadata.titleImage,
    faviconPath: '/blog'
  });
};

export async function generateStaticParams() {
  const slugList = await getAllSlugs();

  return slugList.map((slug) => {
    return {
      slug
    };
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const { default: Post, metadata, prevPost, nextPost } = await importPostModuleBySlug(slug);

  return (
    <>
      <WaveBanner title={metadata.title} type="post" description={metadata.description} date={metadata.date} />
      <BlogDetailContainer prevPost={prevPost} nextPost={nextPost}>
        <Post />
      </BlogDetailContainer>
    </>
  );
}
