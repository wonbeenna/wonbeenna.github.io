// @ts-nocheck
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

export const getSerialize = (content: string, data: any) => {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism]
    },
    scope: data
  });
};
