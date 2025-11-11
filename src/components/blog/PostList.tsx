import Link from 'next/link';
import { GroupedYear } from '@/utils/groupPostsByYearMonth';
import { monthNames } from '@/constants/monthNames';

interface PostListProps {
  groupedYears: GroupedYear[];
}

const PostList = ({ groupedYears }: PostListProps) => {
  return (
    <div className="space-y-16">
      {groupedYears.map((yearGroup) => (
        <section key={yearGroup.yearNumber} aria-labelledby={`heading-year-${yearGroup.yearNumber}`}>
          <h2 id={`heading-year-${yearGroup.yearNumber}`} className="mb-6 text-4xl font-extrabold text-gray900">
            {yearGroup.yearNumber}
          </h2>

          <div className="space-y-10">
            {yearGroup.months.map((monthGroup) => (
              <div
                key={`${yearGroup.yearNumber}-${monthGroup.monthNumber}`}
                className="grid grid-cols-1 gap-x-16 sm:grid-cols-[120px_1fr]"
              >
                <div className="mb-2 text-lg font-medium text-gray700 sm:mb-0 sm:self-start">
                  {monthNames[monthGroup.monthNumber - 1]}
                </div>

                <ul className="space-y-2 sm:space-y-2 sm:pl-6">
                  {monthGroup.posts.map((postItem) => (
                    <li key={postItem.slug} className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <Link
                          href={`/blog/${postItem.slug}`}
                          className="text-xl font-semibold tracking-tight text-black transition-colors hover:text-primaryColor md:text-2xl"
                        >
                          {postItem.title}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PostList;
