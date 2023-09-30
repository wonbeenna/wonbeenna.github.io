import path from 'path';
import * as fs from 'fs';
import matter from 'gray-matter';
import { getSerialize } from '@/utils/sirialize';

export const POSTS_PATH = path.join(process.cwd(), '_posts');

export const postFilePaths = fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));

export const getAllPost = (
  category?: string,
  paging: { page: string; limit?: string } = {
    page: '1',
    limit: '10'
  }
) => {
  let total = postFilePaths.length;
  let posts = postFilePaths
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
    posts = posts.filter((post) => post.data.category === category);
    total = posts.length;
  }

  if (!paging.page) {
    paging.page = '1';
    paging.limit = '10';
  }

  if (paging.limit === '-1') {
    return {
      posts,
      total
    };
  }

  const { page = '1', limit = '10' } = paging;
  const offset = (+page - 1) * +limit;

  posts = posts.slice(offset, offset + +limit);

  return {
    posts,
    total
  };
};

export const getPost = async (slug: string) => {
  const allPost = getAllPost(undefined, {
    page: '1',
    limit: '-1'
  });

  const index = allPost.posts.findIndex((post) => post.slug === slug);
  const prevPost = allPost.posts[index + 1];
  const nextPost = allPost.posts[index - 1];

  const source = fs.readFileSync(path.join(POSTS_PATH, `${slug}.mdx`));

  const { content, data } = matter(source);
  const mdx = await getSerialize(content, data);

  return {
    mdx,
    content,
    data,
    slug,
    prevPost: {
      slug: prevPost?.slug,
      title: prevPost?.data.title,
      category: prevPost?.data.category
    },
    nextPost: {
      slug: nextPost?.slug,
      title: nextPost?.data.title,
      category: nextPost?.data.category
    }
  };
};
