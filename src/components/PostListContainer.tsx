import React from 'react';
import PostList from '@/components/PostList';
import { Posts } from '@/app/page';
import Category from '@/components/Category';
import { getCategories } from '@/utils/getCategories';
import { getAllPost } from '@/utils/getPost';

const PostListContainer = async ({ category }: { category?: string }) => {
  const categories = await getCategories();
  const posts = getAllPost(category);

  return (
    <section className="flex flex-col-reverse md:relative md:flex-row">
      <PostList posts={posts as Posts[]} />
      <Category categories={categories} />
    </section>
  );
};

export default PostListContainer;
