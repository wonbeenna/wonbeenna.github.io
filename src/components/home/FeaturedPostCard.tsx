import Link from 'next/link';
import { PostMetaData } from '@/types/post';
import { formatDateForHumanLong } from '@/utils/formatDateForHumanLong';

interface FeaturedPostCardProps {
  post: PostMetaData;
}

const FeaturedPostCard = ({ post }: FeaturedPostCardProps) => {
  const featuredDate = formatDateForHumanLong(post.data?.date ?? new Date());
  const iso = new Date(post.data?.date ?? new Date()).toISOString();

  return (
    <section className="md:grid-cols-2 md:items-center">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div>
          <div className="mb-2 text-sm text-gray500">
            <span aria-hidden="true" className="mr-1">
              🕊️
            </span>
            <time dateTime={iso}>{featuredDate}</time>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-black transition-colors group-hover:text-primaryColor">
            {post.data?.title}
          </h2>

          {post.data?.description && (
            <p className="mt-3 text-lg leading-relaxed text-gray600 transition-colors">{post.data.description}</p>
          )}
        </div>
      </Link>
    </section>
  );
};

export default FeaturedPostCard;
