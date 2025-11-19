import PostCard from '@/components/search/PostCard';
import { GetAllPostResult } from '@/types/post';

interface PostListProps {
  posts: GetAllPostResult;
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <ol className="relative mx-0 my-5 flex w-full flex-col p-0">
        {posts.posts.map((post) => (
          <PostCard key={post.slug} slug={post.slug} {...post.data} />
        ))}
      </ol>
    </div>
  );
};

export default PostList;
