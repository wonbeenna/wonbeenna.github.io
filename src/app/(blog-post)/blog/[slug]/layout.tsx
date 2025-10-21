import WaveBanner from '@/components/common/WaveBanner';
import { getAllPost, getPost } from '@/utils/getPost';
import PostProvider from '@/provider/PostProvider';
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

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPost(slug);

  return (
    <PostProvider value={data}>
      <WaveBanner
        title={data.data.title}
        type="post"
        description={data.data.description}
        date={data.data.date}
        size="small"
      />
      {children}
    </PostProvider>
  );
}
