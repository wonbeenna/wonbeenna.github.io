import { getAllPost, getPost } from '@/utils/getPost';
import Contents from '@/components/blog/Contents';
import PostCardHeader from '@/components/blog/PostCardHeader';
import ContentsPage from '@/components/blog/ContentsPage';
import Comment from '@/components/blog/Comment';
import { defaultMetadata } from '@/utils/metadata';

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
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
    <div className="prose w-full max-w-none">
      <PostCardHeader
        title={data.data.title as string}
        description={data.data.description as string}
        date={data.data.date as string}
      />
      <Contents component={data.content} />
      <ContentsPage prevPost={data.prevPost} nextPost={data.nextPost} />
      <Comment />
    </div>
  );
};

export default Page;
