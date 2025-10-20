import Link from 'next/link';
import { PostMetaData } from '@/types/post';
import { formatDateForHumanLong } from '@/utils/formatDateForHumanLong';

interface FeaturedPostCardProps {
  post: PostMetaData;
}

const FeaturedPostCard = ({ post }: FeaturedPostCardProps) => {
  const featuredDate = formatDateForHumanLong(post.data?.date ?? new Date());

  return (
    <Link href={`/blog/${post.slug}`}>
      <section className="mt-10  transition-colors hover:text-primaryColor md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-2 text-sm text-gray500">
            <span aria-hidden="true" className="mr-1">
              🕊️
            </span>
            <time dateTime={new Date(post.data?.date ?? new Date()).toISOString()}>{featuredDate}</time>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight">{post.data?.title}</h2>

          {post.data?.description && (
            <p className="mt-3 text-lg leading-relaxed text-gray600">{post.data.description}</p>
          )}
        </div>
      </section>
    </Link>
  );
};

export default FeaturedPostCard;
