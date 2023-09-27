import React from 'react';
import { Posts } from '@/app/page';
import PostCard from '@/components/PostCard';

interface PostListProps {
  posts: Posts[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ol className="relative mx-0 my-[20px] flex w-full flex-col gap-[40px] p-0">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.data.title}
          titleImage={post.data.titleImage}
          category={post.data.category}
          description={post.data.description}
          date={post.data.date}
          path={post.slug}
        />
      ))}
    </ol>
  );
};

export default PostList;
