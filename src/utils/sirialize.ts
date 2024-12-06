import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

export const getSerialize = (source: Buffer<ArrayBufferLike>) => {
  return compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism]
      }
    }
  });
};
