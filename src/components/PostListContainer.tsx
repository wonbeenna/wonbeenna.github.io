import React from 'react';
import PostList from '@/components/PostList';
import { getAllPost } from '@/utils/getPost';

interface PostListContainerProps {
  search?: string;
}

const PostListContainer = async ({ search }: PostListContainerProps) => {
  const posts = await getAllPost(search);

  return (
    <section className="flex flex-col-reverse md:relative md:flex-row">
      <PostList posts={posts} />
    </section>
  );
};

export default PostListContainer;
