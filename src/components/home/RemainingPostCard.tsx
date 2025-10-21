import Link from 'next/link';
import { PostMetaData } from '@/types/post';
import useFormatDate from '@/hooks/useFormatDate';

interface RemainingPostCardProps {
  post: PostMetaData;
}

const RemainingPostCard = ({ post }: RemainingPostCardProps) => {
  const { postDate, iso } = useFormatDate(post.data.date);

  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="group block transition-colors">
        <div className="mb-2 text-sm text-gray500">
          <time dateTime={iso}>{postDate}</time>
        </div>

        <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-black transition-colors group-hover:text-primaryColor">
          {post.data.title}
        </h3>

        {post.data?.description && <p className="mt-2 text-gray600 transition-colors">{post.data.description}</p>}
      </Link>
    </article>
  );
};

export default RemainingPostCard;
