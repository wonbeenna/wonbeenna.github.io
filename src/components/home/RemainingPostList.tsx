import RemainingPostCard from '@/components/home/RemainingPostCard';
import { GetAllPostItem } from '@/types/post';

interface RemainingPostListProps {
  posts: GetAllPostItem[];
}

const RemainingPostList = ({ posts }: RemainingPostListProps) => {
  return (
    <section className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
      {posts.map((post) => (
        <RemainingPostCard key={post.slug} post={post} />
      ))}
    </section>
  );
};

export default RemainingPostList;
