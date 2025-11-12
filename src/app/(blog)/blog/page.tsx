import WaveBanner from '@/components/common/WaveBanner';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';
import BlogListContainer from '@/components/blog/BlogListContainer';

export const metadata: Metadata = buildMetadata({
  title: 'blog archive',
  description: 'blog archive',
  path: '/blog',
  imagesPath: '/favicon/blog-favicon.png',
  faviconPath: '/blog'
});

export default function BlogArchivePage() {
  return (
    <>
      <WaveBanner
        title="Blog Archive"
        description="I've been writing blog posts since I became a front-end developer."
        type="blog"
      />
      <BlogListContainer />
    </>
  );
}
