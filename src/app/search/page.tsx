import { getAllPost } from '@/utils/getPosts';
import SearchPostListContainer from '@/components/search/SearchPostListContainer';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';
import WaveBanner from '@/components/common/WaveBanner';

export const metadata: Metadata = buildMetadata({
  title: 'search',
  description: 'search',
  path: '/search'
});

const Page = async () => {
  const posts = await getAllPost({ limit: -1 });

  return (
    <>
      <WaveBanner title="Search" type="search" description="Search blog posts by title keywords." />
      <SearchPostListContainer posts={posts} />
    </>
  );
};

export default Page;
