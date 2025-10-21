import { getAllPost } from '@/utils/getPost';
import SearchPostListContainer from '@/components/search/SearchPostListContainer';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';
import WaveBanner from '@/components/common/WaveBanner';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Been blog search',
  description: 'Been dev-note search',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/search`
  },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Been blog - search',
    description: 'Been dev-note - search'
  }
};

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
