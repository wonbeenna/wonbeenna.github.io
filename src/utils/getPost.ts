import path from 'path';
import * as fs from 'fs';
import matter from 'gray-matter';
import { getSerialize } from '@/utils/sirialize';

export const POSTS_PATH = path.join(process.cwd(), '_posts');

export const postFilePaths = fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
export const getAllPost = (category?: string) => {
  let postsData = postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);
      const slug = filePath.replace(/\.mdx?$/, '');

      return {
        content,
        data,
        slug
      };
    })
    .sort((a, b) => {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    });

  if (category) {
    postsData = postsData.filter((post) => post.data.category === category);
  }

  return postsData;
};

export const getPost = async (slug: string) => {
  const source = fs.readFileSync(path.join(POSTS_PATH, `${slug}.mdx`));

  const { content, data } = matter(source);
  const mdx = await getSerialize(content, data);

  return {
    mdx,
    content,
    data,
    slug
  };
};