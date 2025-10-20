import PostCard from '@/components/search/PostCard';
import { Posts } from '@/types/post';

interface PostListProps {
  posts: Posts;
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <ol className="relative mx-0 my-[20px] flex w-full  flex-col gap-[40px] p-0">
        {posts.posts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.data.title}
            titleImage={post.data.titleImage}
            description={post.data.description}
            date={post.data.date}
            path={post.slug}
          />
        ))}
      </ol>
    </div>
  );
};

export default PostList;
