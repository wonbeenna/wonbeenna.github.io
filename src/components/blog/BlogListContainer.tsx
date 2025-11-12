import Section from '@/components/common/Section';
import Title from '@/components/common/Title';
import PostList from '@/components/blog/PostList';
import { getPostsGroupedByYearMonth } from '@/utils/groupPostsByYearMonth';

const BlogListContainer = async () => {
  const groupedYears = await getPostsGroupedByYearMonth();

  return (
    <Section>
      <Title className="mb-10" />
      <PostList groupedYears={groupedYears} />
    </Section>
  );
};

export default BlogListContainer;
