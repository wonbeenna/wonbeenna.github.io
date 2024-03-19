import { getAllPost } from '@/utils/getPost';

export const getCategories = (): {
  title: string;
  count: number;
}[] => {
  const posts = getAllPost({ page: '1', limit: '-1' });

  let uniqueCategories: {
    [key: string]: { title: string; count: number };
  } = {};

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

  return Object.values(uniqueCategories);
};
