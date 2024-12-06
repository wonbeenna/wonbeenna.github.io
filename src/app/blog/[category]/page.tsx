import PostListContainer from '@/components/PostListContainer';
import { getCategories } from '@/utils/getCategories';
import { defaultOpenGraph } from '@/utils/metadata';

export const generateMetadata = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  return {
    title: `Been blog - ${category}`,
    openGraph: {
      ...defaultOpenGraph,
      title: `Been blog - ${category}`,
      description: `Been dev-note - ${category}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${category}`
    }
  };
};

export const generateStaticParams = async () => {
  const categories = getCategories();

  return categories.map((category) => {
    return {
      category: category.title
    };
  });
};

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  return <PostListContainer category={category} />;
};

export default Page;
