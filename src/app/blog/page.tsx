import { getPostsGroupedByYearMonth } from '@/utils/groupPostsByYearMonth';
import Link from 'next/link';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const Page = async () => {
  const groupedYears = await getPostsGroupedByYearMonth();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-12 text-3xl font-extrabold tracking-tight">Blog Archive</h1>

      <div className="space-y-16">
        {groupedYears.map((yearGroup) => (
          <section key={yearGroup.yearNumber}>
            <h2 className="mb-6 text-4xl font-extrabold text-gray900">{yearGroup.yearNumber}</h2>

            <div className="space-y-10">
              {yearGroup.months.map((monthGroup) => (
                <div
                  key={`${yearGroup.yearNumber}-${monthGroup.monthNumber}`}
                  className="grid grid-cols-[120px_1fr] gap-x-8"
                >
                  <div className="text-lg font-medium text-gray700">{monthNames[monthGroup.monthNumber - 1]}</div>

                  <ul className="space-y-2">
                    {monthGroup.posts.map((post) => (
                      <li key={post.slug} className="flex items-center gap-2">
                        <span className="text-primaryColor">✽</span>
                        <Link
                          href={`/blog/${post.category ?? 'uncategorized'}/${post.slug}`}
                          className="font-semibold tracking-tight transition-colors hover:text-primaryGradient02"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Page;
