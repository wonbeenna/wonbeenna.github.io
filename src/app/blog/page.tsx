import { getPostsGroupedByYearMonth } from '@/utils/groupPostsByYearMonth';
import PostList from '@/components/blog/PostList';
import Title from '@/components/common/Title';

export default async function BlogArchivePage() {
  const groupedYears = await getPostsGroupedByYearMonth();

  return (
    <>
      <Title title="Blog Archive" />
      <PostList groupedYears={groupedYears} />
    </>
  );
}
