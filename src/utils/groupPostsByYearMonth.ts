import { getAllPost } from '@/utils/getPost';

export type GroupedMonth = {
  monthNumber: number;
  posts: Array<{
    slug: string;
    title: string;
    category?: string;
    dateISO: string;
  }>;
};

export type GroupedYear = {
  yearNumber: number;
  months: GroupedMonth[];
};

export const getPostsGroupedByYearMonth = async (): Promise<GroupedYear[]> => {
  const { posts } = await getAllPost({ limit: -1 });

  const normalizedPosts = posts.map(
    (
      post
    ): {
      slug: string;
      title: string;
      category?: string;
      date: Date;
    } => {
      const rawDate = post.data?.date ?? 0;
      const parsedDate = new Date(rawDate);
      const safeDate = Number.isFinite(parsedDate.getTime()) ? parsedDate : new Date(0);

      return {
        slug: post.slug,
        title: String(post.data?.title ?? post.slug),
        category: post.data?.category ? String(post.data.category) : undefined,
        date: safeDate
      };
    }
  );

  normalizedPosts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  const yearMap = new Map<number, Map<number, GroupedMonth>>();

  for (const post of normalizedPosts) {
    const yearNumber = post.date.getFullYear();
    const monthNumber = post.date.getMonth() + 1;

    if (!yearMap.has(yearNumber)) {
      yearMap.set(yearNumber, new Map<number, GroupedMonth>());
    }

    const monthMap = yearMap.get(yearNumber)!;

    if (!monthMap.has(monthNumber)) {
      monthMap.set(monthNumber, {
        monthNumber: monthNumber,
        posts: []
      });
    }

    const monthBucket = monthMap.get(monthNumber)!;
    monthBucket.posts.push({
      slug: post.slug,
      title: post.title,
      category: post.category,
      dateISO: post.date.toISOString()
    });
  }

  return Array.from(yearMap.entries())
    .map(([yearNumber, monthMap]) => {
      const monthsArray: GroupedMonth[] = Array.from(monthMap.entries())
        .map(([, groupedMonth]) => {
          return groupedMonth;
        })
        .sort((a, b) => {
          return b.monthNumber - a.monthNumber;
        });

      return {
        yearNumber: yearNumber,
        months: monthsArray
      };
    })
    .sort((a, b) => {
      return b.yearNumber - a.yearNumber;
    });
};
