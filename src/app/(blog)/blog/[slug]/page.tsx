import Contents from '@/components/blog/Contents';
import ContentsPage from '@/components/blog/ContentsPage';
import Comment from '@/components/blog/Comment';
import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import { getAllPost, getPost } from '@/utils/getPost';
import { Metadata } from 'next';
import { defaultMetadata } from '@/utils/metadata';

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const data = await getPost(slug);

  return {
    ...defaultMetadata,
    title: `Been blog - ${data.data.title}`,
    description: data.data.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`
    },
    openGraph: {
      title: `Been blog - ${data.data.title}`,
      description: data.data.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${data.data.titleImage}`,
          width: 800,
          height: 600,
          alt: data.data.title
        }
      ]
    }
  };
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
      <Section>
        <div className="prose flex w-full max-w-none flex-col">
          <Contents component={data.content} />
          <ContentsPage prevPost={data.prevPost} nextPost={data.nextPost} />
          <Comment />
        </div>
      </Section>
    </>
  );
};

export default Page;
