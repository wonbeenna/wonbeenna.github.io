import { getPostsGroupedByYearMonth } from '@/utils/groupPostsByYearMonth';
import PostList from '@/components/blog/PostList';
import Title from '@/components/common/Title';
import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'blog archive',
  description: 'blog archive',
  path: '/blog',
  imagesPath: '/blog-favicon.png',
  faviconPath: '/blog'
});

export default async function BlogArchivePage() {
  const groupedYears = await getPostsGroupedByYearMonth();

  return (
    <>
      <WaveBanner
        title="Blog Archive"
        description="I've been writing blog posts since I became a front-end developer."
        type="blog"
      />
      <Section>
        <Title className="mb-10" />
        <PostList groupedYears={groupedYears} />
      </Section>
    </>
  );
}
