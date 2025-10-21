'use client';

import Contents from '@/components/blog/Contents';
import ContentsPage from '@/components/blog/ContentsPage';
import Comment from '@/components/blog/Comment';
import Section from '@/components/common/Section';
import { PostContext } from '@/provider/PostProvider';
import { useContext } from 'react';

const Page = () => {
  const data = useContext(PostContext);

  if (!data) {
    throw new Error('Post data is not available in context.');
  }

  return (
    <Section>
      <div className="prose w-full max-w-none">
        <Contents component={data.content} />
        <ContentsPage prevPost={data.prevPost} nextPost={data.nextPost} />
        <Comment />
      </div>
    </Section>
  );
};

export default Page;
