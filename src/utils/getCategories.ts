import { getAllPost } from '@/utils/getPost';

export const getCategories = async (): Promise<
  {
    title: string;
    count: number;
  }[]
> => {
  const posts = await getAllPost();

  let uniqueCategories: any = {};

  posts.forEach((post) => {
    if (uniqueCategories.hasOwnProperty(post.data.category)) {
      uniqueCategories[post.data.category].count += 1;
    } else {
      uniqueCategories[post.data.category] = {
        title: post.data.category,
        count: 1
      };
    }
  });

  // @ts-ignore
  return Object.values(uniqueCategories).sort((a, b) => a.title > b.title);
};
