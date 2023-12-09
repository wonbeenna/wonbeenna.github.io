// @ts-nocheck
import { getAllPost } from '@/utils/getPost';

export const getCategories = (): {
  title: string;
  count: number;
}[] => {
  const posts = getAllPost(undefined, { page: '1', limit: '-1' });

  let uniqueCategories: any = {};

  posts.posts.forEach((post) => {
    if (uniqueCategories.hasOwnProperty(post.data.category)) {
      uniqueCategories[post.data.category].count += 1;
    } else {
      uniqueCategories[post.data.category] = {
        title: post.data.category,
        count: 1
      };
    }
  });

  return Object.values(uniqueCategories).sort((a, b) => a.title > b.title);
};
