import React from 'react';
import dayjs from 'dayjs';

interface PostCardHeaderProps {
  title: string;
  description: string;
  date: string;
}

const PostCardHeader = ({ title, description, date }: PostCardHeaderProps) => {
  return (
    <div className="border-b-2 border-b-gray500">
      <h1 className="my-[12px] overflow-hidden text-ellipsis break-words text-[24px] font-bold text-black md:mt-0 md:text-[34px]">
        {title}
      </h1>
      <h2 className="my-[12px] text-ellipsis break-keep text-[14px] text-gray900 md:text-[18px]">{description}</h2>
      <p className="text-[12px] text-gray700 md:text-[16px]">{dayjs(date).format('YYYY-MM-DD')}</p>
    </div>
  );
};

export default PostCardHeader;
