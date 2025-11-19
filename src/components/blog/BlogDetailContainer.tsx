import React from 'react';
import ContentsPage from '@/components/blog/ContentsPage';
import Comment from '@/components/blog/Comment';
import Section from '@/components/common/Section';
import { AdjacentPost } from '@/types/post';

interface BlogDetailContainerProps {
  children: React.ReactNode;
  prevPost?: AdjacentPost;
  nextPost?: AdjacentPost;
}

const BlogDetailContainer = ({ children, prevPost, nextPost }: BlogDetailContainerProps) => {
  return (
    <Section>
      <div className="prose flex w-full max-w-none flex-col">
        {children}
        <ContentsPage prevPost={prevPost} nextPost={nextPost} />
        <Comment />
      </div>
    </Section>
  );
};

export default BlogDetailContainer;
