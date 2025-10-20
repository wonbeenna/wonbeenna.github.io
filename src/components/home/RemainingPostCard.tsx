import Link from 'next/link';
import { PostMetaData } from '@/types/post';
import { formatDateForHumanLong } from '@/utils/formatDateForHumanLong';

interface RemainingPostCardProps {
  post: PostMetaData;
}

const RemainingPostCard = ({ post }: RemainingPostCardProps) => {
  const postDate = formatDateForHumanLong(post.data?.date ?? new Date());

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group transition-colors hover:text-primaryColor">
        <div className="mb-2 text-sm text-gray500">
          <time dateTime={new Date(post.data?.date ?? new Date()).toISOString()}>{postDate}</time>
        </div>

        <h3 className="text-2xl font-extrabold leading-tight tracking-tight">{post.data?.title}</h3>

        {post.data?.description && <p className="mt-2 text-gray600">{post.data.description}</p>}
      </article>
    </Link>
  );
};

export default RemainingPostCard;
