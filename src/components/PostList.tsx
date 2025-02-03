'use client';

import React, { useEffect, useState } from 'react';
import { Posts } from '@/app/page';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/navigation';

interface PostListProps {
  posts: Posts;
  page?: string;
  isPagination?: boolean;
}

const PostList = ({ posts, page, isPagination }: PostListProps) => {
  const navigate = useRouter();
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    navigate.push(`/page/${selectedPage}`);
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(+page);
    } else {
      setCurrentPage(1);
    }
  }, [page]);

  return (
    <div className="flex flex-1 flex-col">
      <ol className="relative mx-0 my-[20px] flex w-full  flex-col gap-[40px] p-0">
        {posts.posts.map((post) => (
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

      {isPagination && (
        <Pagination
          totalCount={posts.total}
          pageSize={10}
          siblingCount={2}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PostList;
