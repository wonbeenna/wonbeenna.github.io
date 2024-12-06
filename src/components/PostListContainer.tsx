import React from 'react';
import PostList from '@/components/PostList';
import { Posts } from '@/app/page';
import Category from '@/components/Category';
import { getCategories } from '@/utils/getCategories';
import { getAllPost } from '@/utils/getPost';

interface PostListContainerProps {
  category?: string;
  page?: string;
}

const PostListContainer = async ({ category, page }: PostListContainerProps) => {
  const categories = getCategories();
  const posts = getAllPost(
    {
      page: page || '1',
      limit: category ? '-1' : '10'
    },
    category
  );

  return (
    <section className="flex flex-col-reverse md:relative md:flex-row">
      <PostList posts={posts as Posts} page={page} category={category} />
      <Category categories={categories} currentCategory={category} />
    </section>
  );
};

export default PostListContainer;
