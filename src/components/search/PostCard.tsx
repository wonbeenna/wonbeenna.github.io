import React from 'react';
import Link from 'next/link';
import { Frontmatter } from '@/types/post';
import useFormatDate from '@/hooks/useFormatDate';

interface PostCardProps extends Frontmatter {}

const PostCard = ({ title, date, slug, category }: PostCardProps) => {
  const { postDate, iso } = useFormatDate(date);

  return (
    <li className="group border-b border-b-gray300 p-2 last:border-b-0">
      <Link
        className="hover_card flex w-full flex-col items-center justify-between gap-0 md:flex-row md:gap-[40px]"
        href={`/blog/${slug}`}
      >
        <div className="flex w-full flex-col justify-center">
          <p className="text-[14px] text-gray700 transition-colors">{category}</p>

          <h3 className="text-xl font-extrabold leading-tight tracking-tight text-black transition-colors group-hover:text-primaryColor">
            {title}
          </h3>

          <time dateTime={iso} className="text-[14px] text-gray700">
            {postDate}
          </time>
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
