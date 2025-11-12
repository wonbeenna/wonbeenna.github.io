import WaveBanner from '@/components/common/WaveBanner';
import { getAllPost, getPost } from '@/utils/getPost';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';
import BlogDetailContainer from '@/components/blog/BlogDetailContainer';

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const data = await getPost(slug);

  return buildMetadata({
    title: data.data.title,
    description: data.data.description ?? '',
    path: `/blog/${slug}`,
    imagesPath: data.data.titleImage,
    faviconPath: '/blog'
  });
};

export const generateStaticParams = async () => {
  const posts = await getAllPost({ limit: -1 });

  return posts.posts.map((post) => {
    return {
      slug: post.slug
    };
  });
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data = await getPost(slug);

  return (
    <>
      <WaveBanner title={data.data.title} type="post" description={data.data.description} date={data.data.date} />
      <BlogDetailContainer content={data.content} prevPost={data.prevPost} nextPost={data.nextPost} />
    </>
  );
};

export default Page;
