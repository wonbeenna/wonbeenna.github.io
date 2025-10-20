'use client';

import SearchInput from '@/components/search/SearchInput';
import PostList from '@/components/search/PostList';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Posts } from '@/types/post';
import Section from '@/components/common/Section';

interface SearchPostListContainerProps {
  posts: Posts;
}

const SearchPostListContainer = ({ posts }: SearchPostListContainerProps) => {
  const [searchPosts, setSearchPosts] = useState<Posts | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    if (search) {
      const searchReg = new RegExp(search, 'i');

      setSearchPosts({
        posts: posts.posts.filter((post) => searchReg.test(post.data.title)),
        total: posts.posts.length
      });
    }
  }, [search]);

  return (
    <Section>
      <SearchInput />
      {searchPosts && <PostList posts={searchPosts} />}
    </Section>
  );
};

export default SearchPostListContainer;
