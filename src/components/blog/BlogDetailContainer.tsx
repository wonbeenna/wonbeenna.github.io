import Contents from '@/components/blog/Contents';
import ContentsPage from '@/components/blog/ContentsPage';
import Comment from '@/components/blog/Comment';
import Section from '@/components/common/Section';
import { type CompiledPost, ContentPost } from '@/types/post';
import React from 'react';

interface BlogDetailContainerProps {
  content: CompiledPost['content'];
  prevPost?: ContentPost;
  nextPost?: ContentPost;
}

const BlogDetailContainer = ({ content, prevPost, nextPost }: BlogDetailContainerProps) => {
  return (
    <Section>
      <div className="prose flex w-full max-w-none flex-col">
        <Contents component={content} />
        <ContentsPage prevPost={prevPost} nextPost={nextPost} />
        <Comment />
      </div>
    </Section>
  );
};

export default BlogDetailContainer;
