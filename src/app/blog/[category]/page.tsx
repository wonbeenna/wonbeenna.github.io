import PostListContainer from '@/components/PostListContainer';
import { getCategories } from '@/utils/getCategories';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';

export const generateMetadata = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  return {
    ...defaultMetadata,
    title: `Been blog - ${category}`,
    description: `Been dev-note - ${category}`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${category}`
    },
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

  return <PostListContainer limit="-1" category={category} />;
};

export default Page;
