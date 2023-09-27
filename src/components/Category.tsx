import React from 'react';
import Link from 'next/link';

interface CategoryProps {
  categories: {
    title: string;
    count: number;
  }[];
  postCategory?: string;
}

const Category = ({ categories, postCategory }: CategoryProps) => {
  return (
    <ul className="relative top-0 flex h-fit min-w-fit flex-row flex-wrap gap-[20px] py-[20px] pl-0 md:sticky md:top-[100px] md:flex-col md:flex-nowrap md:py-0 md:pl-[30px]">
      {categories?.map((category) => (
        <li key={category.title}>
          <Link href={`/blog/${category.title}`}>{`${category.title} (${category.count})`}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Category;
