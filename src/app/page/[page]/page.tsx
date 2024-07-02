import { defaultOpenGraph } from '@/utils/metadata';
import { getAllPost } from '@/utils/getPost';
import PostListContainer from '@/components/PostListContainer';

export const generateMetadata = async ({ params }: { params: { page: string } }) => {
  return {
    title: `Been blog - ${params.page}`,
    openGraph: {
      ...defaultOpenGraph,
      title: `Been blog - ${params.page}`,
      description: `Been dev-note - ${params.page}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/page/${params.page}`
    }
  };
};

export const generateStaticParams = async () => {
  const posts = getAllPost({
    page: '1',
    limit: '-1'
  });

  return Array.from({ length: Math.ceil(posts.total / 10) }, (_, i) => {
    return {
      page: (i + 1).toString()
    };
  });
};

const Page = ({ params }: { params: { page: string } }) => {
  return <PostListContainer page={params.page} />;
};

export default Page;
