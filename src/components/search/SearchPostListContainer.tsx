'use client';

import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import SearchInput from '@/components/search/SearchInput';
import PostList from '@/components/search/PostList';
import Section from '@/components/common/Section';
import { Posts } from '@/types/post';

interface SearchPostListContainerProps {
  posts: Posts;
}

const SearchPostListContainer = ({ posts }: SearchPostListContainerProps) => {
  const [query, setQuery] = useState<string>('');

  const fuse = useMemo(() => {
    return new Fuse(posts.posts, {
      keys: ['data.title', 'data.category', 'data.description'],
      threshold: 0.4
    });
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) {
      return posts.posts;
    }

    const results = fuse.search(query.trim());
    return results.map((r) => r.item);
  }, [query, fuse, posts]);

  return (
    <Section>
      <SearchInput value={query} onChange={setQuery} />
      {query && <PostList posts={{ posts: filteredPosts, total: posts.total }} />}
    </Section>
  );
};

export default SearchPostListContainer;
