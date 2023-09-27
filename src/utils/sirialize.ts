import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

export const getSerialize = async (content: string, data: any) => {
  return await serialize(content, {
    mdxOptions: {
      // @ts-ignore
      remarkPlugins: [remarkGfm],
      // @ts-ignore
      rehypePlugins: [rehypePrism]
    },
    scope: data
  });
};
