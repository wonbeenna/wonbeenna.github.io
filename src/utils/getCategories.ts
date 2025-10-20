import { getAllPost } from '@/utils/getPost';

export const getCategories = async () => {
  const { posts } = await getAllPost({ page: '1', limit: '-1' });

  const categoryMap = new Map<string, { title: string; count: number }>();

  for (const post of posts) {
    const category = post.data?.category?.trim();

    if (!category) {
      continue;
    }

    if (categoryMap.has(category)) {
      const current = categoryMap.get(category);
      if (current) {
        current.count += 1;
      }
    } else {
      categoryMap.set(category, {
        title: category,
        count: 1
      });
    }
  }

  return Array.from(categoryMap.values()).sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
};
