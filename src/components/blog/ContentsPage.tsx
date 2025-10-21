import React from 'react';
import Link from 'next/link';
import { ContentPost } from '@/types/post';

interface PageLinkProps {
  href: string;
  title?: string;
  align?: 'left' | 'right';
}

interface ContentsPageProps {
  prevPost?: ContentPost;
  nextPost?: ContentPost;
}

const PageLink = ({ href, title, align = 'left' }: PageLinkProps) => {
  return (
    <div
      className={`w-1/2 min-w-0 flex-1 rounded-[4px] bg-gray100 dark:bg-darkBg02 ${
        align === 'left' ? 'text-left' : 'text-right'
      }`}
    >
      {title && (
        <Link href={href} className="flex w-full flex-col px-[14px] py-[10px] no-underline">
          <div className="text-[14px] text-gray700">{align === 'left' ? '이전글' : '다음글'}</div>
          <h3 className="m-0 truncate text-[16px] font-bold text-gray900">{title}</h3>
        </Link>
      )}
    </div>
  );
};

const ContentsPage = ({ prevPost, nextPost }: ContentsPageProps) => {
  return (
    <article className="flex items-center justify-between gap-[20px] border-y-2 border-y-gray500 py-[30px]">
      <PageLink href={`/blog/${prevPost?.slug}`} title={prevPost?.title} />
      <PageLink href={`/blog/${nextPost?.slug}`} title={nextPost?.title} align="right" />
    </article>
  );
};

export default ContentsPage;
