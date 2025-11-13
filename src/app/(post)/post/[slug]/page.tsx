import React from 'react';
import Section from '@/components/common/Section';
import Comment from '@/components/blog/Comment';
import WaveBanner from '@/components/common/WaveBanner';
import ContentsPage from '@/components/blog/ContentsPage';
import '@/styles/prism.css';
import { getAllSlugs, importPostModuleBySlug } from '@/utils/getContents';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

  const { default: Post, metadata } = await importPostModuleBySlug(slug);

  return (
    <>
      <WaveBanner title={metadata.title} type="post" description={metadata.description} date={metadata.date} />
      <Section>
        <div className="prose flex w-full max-w-none flex-col">
          <Post />
          <ContentsPage />
          <Comment />
        </div>
      </Section>
    </>
  );
}
