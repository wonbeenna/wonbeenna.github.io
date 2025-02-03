import React from 'react';
import PostList from '@/components/PostList';
import { Posts } from '@/app/page';
import Category from '@/components/Category';
import { getCategories } from '@/utils/getCategories';
import { getAllPost } from '@/utils/getPost';

interface PostListContainerProps {
  category?: string;
  page?: string;
  limit?: string;
  search?: string;
}

const PostListContainer = async ({ category, limit, page, search }: PostListContainerProps) => {
  const categories = getCategories();
  const posts = getAllPost(
    {
      page: page || '1',
      limit: limit || '10'
    },
    category,
    search
  );

  return (
    <section className="flex flex-col-reverse md:relative md:flex-row">
      <PostList isPagination posts={posts as Posts} page={page} />
      <Category categories={categories} currentCategory={category} />
    </section>
  );
};

export default PostListContainer;
