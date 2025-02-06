import { getAllPost, getPost } from '@/utils/getPost';
import Contents from '@/components/Contents';
import PostCardHeader from '@/components/PostCardHeader';
import ContentsPage from '@/components/ContentsPage';
import Comment from '@/components/Comment';
import { defaultMetadata } from '@/utils/metadata';

export const dynamic = 'force-static';

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string; category: string }> }) => {
  const { slug, category } = await params;
  const data = await getPost(slug);

  return {
    ...defaultMetadata,
    title: `Been blog - ${data.data.title}`,
    description: data.data.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${category}/${slug}`
    },
    openGraph: {
      title: `Been blog - ${data.data.title}`,
      description: data.data.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${category}/${slug}`,
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
  const posts = getAllPost({
    page: '1',
    limit: '-1'
  });

  return posts.posts.map((post) => {
    return {
      slug: post.slug,
      category: post.data.category
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
