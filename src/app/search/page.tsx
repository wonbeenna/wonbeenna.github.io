import { getAllPost } from '@/utils/getPost';
import SearchPostListContainer from '@/components/search/SearchPostListContainer';

const Page = async () => {
  const posts = await getAllPost({ limit: -1 });

  return <SearchPostListContainer posts={posts} />;
};

export default Page;
