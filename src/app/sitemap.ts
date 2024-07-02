import { getAllPost } from '@/utils/getPost';
import { MetadataRoute } from 'next';

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
const pageRoutes = [`${defaultUrl}`, `${defaultUrl}/blog`, `${defaultUrl}/about`];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPost({
    page: '1',
    limit: '-1'
  });

  const defaultRoutes: MetadataRoute.Sitemap = pageRoutes.map((route) => {
    return {
      url: route,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1
    };
  });

  const postRoutes: MetadataRoute.Sitemap = posts.posts.map((post) => {
    return {
      url: `${defaultUrl}/blog/${post.data.category}/${post.slug}`,
      lastModified: new Date(post.data.date).toISOString(),
      changeFrequency: 'weekly',
      priority: 1
    };
  });

  return [...defaultRoutes, ...postRoutes];
}
