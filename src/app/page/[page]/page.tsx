import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';
import { getAllPost } from '@/utils/getPost';
import PostListContainer from '@/components/PostListContainer';

export const generateMetadata = async ({ params }: { params: Promise<{ page: string }> }) => {
  const { page } = await params;

  return {
    ...defaultMetadata,
    title: `Been blog - ${page}`,
    description: `Been dev-note - ${page}`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/page/${page}`
    },
    openGraph: {
      ...defaultOpenGraph,
      title: `Been blog - ${page}`,
      description: `Been dev-note - ${page}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/page/${page}`
    }
  };
};

export const generateStaticParams = async () => {
  const posts = await getAllPost({
    page: '1',
    limit: '-1'
  });

  return Array.from({ length: Math.ceil(posts.total / 10) }, (_, i) => {
    return {
      page: (i + 1).toString()
    };
  });
};

const Page = async ({ params }: { params: Promise<{ page: string }> }) => {
  const { page } = await params;

  return <PostListContainer page={page} />;
};

export default Page;
