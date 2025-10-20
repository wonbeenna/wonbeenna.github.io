import { getPostsGroupedByYearMonth } from '@/utils/groupPostsByYearMonth';
import PostList from '@/components/blog/PostList';
import Title from '@/components/common/Title';
import Section from '@/components/common/Section';

export default async function BlogArchivePage() {
  const groupedYears = await getPostsGroupedByYearMonth();

  return (
    <Section>
      <Title title="Blog Archive" />
      <PostList groupedYears={groupedYears} />
    </Section>
  );
}
