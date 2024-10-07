import React from 'react';
import { PostData } from '@/app/page';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps extends PostData {
  path: string;
}
const PostCard = ({ title, titleImage, description, date, category, path }: PostCardProps) => {
  return (
    <li className="mt-[30px] border-b border-b-gray300 pb-[50px] md:mt-[50px] md:pb-[70px]">
      <Link
        className="hover_card flex w-full flex-col items-center justify-between gap-0 md:flex-row md:gap-[40px]"
        href={`/blog/${category}/${path}`}
      >
        <Image className="size-[200px] rounded-[14px]" width={200} height={200} src={titleImage} alt={title} />

        <div className="flex min-h-[160px] w-full flex-col items-center justify-center md:min-h-[200px]">
          <h1 className="my-[12px] overflow-hidden text-ellipsis break-words text-[24px] font-bold text-black md:mt-0 md:text-[34px]">
            {title}
          </h1>
          <p className="mx-[14px] my-[12px] text-ellipsis break-keep text-[14px] text-gray900 md:text-[18px]">
            {description}
          </p>
          <span className="text-gray700">{dayjs(date).format('YYYY-MM-DD')}</span>
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
