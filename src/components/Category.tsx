import React from 'react';
import Link from 'next/link';

interface CategoryProps {
  categories: {
    title: string;
    count: number;
  }[];
  currentCategory?: string;
}

const Category = ({ categories, currentCategory }: CategoryProps) => {
  return (
    <ul className="relative top-0 flex h-fit min-w-fit flex-row flex-wrap gap-[20px] py-[20px] pl-0 md:sticky md:top-[100px] md:flex-col md:flex-nowrap md:py-0 md:pl-[30px]">
      <h2 className="hidden text-[18px] font-bold md:inline">Category</h2>
      {categories
        ?.toSorted((a, b) => b.count - a.count)
        .map((category) => (
          <li key={category.title}>
            <Link
              className={`${category.title === currentCategory ? 'font-[600] text-black' : 'text-gray700'}`}
              href={`/blog/${category.title}`}
            >{`${category.title} (${category.count})`}</Link>
          </li>
        ))}
    </ul>
  );
};

export default Category;
