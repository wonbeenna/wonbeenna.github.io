import { getAllPost } from '@/utils/getPost';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
const pageRoutes = [`${defaultUrl}`, `${defaultUrl}/blog`, `${defaultUrl}/about`, `${defaultUrl}/search`];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPost({ limit: -1 });

  const defaultRoutes: MetadataRoute.Sitemap = pageRoutes.map((route) => {
    return {
      url: route,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1
    };
  });

  const postRoutes: MetadataRoute.Sitemap = posts.posts.map((post) => {
    return {
      url: `${defaultUrl}/blog/${post.slug}`,
      lastModified: new Date(post.data.date).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8
    };
  });

  return [...defaultRoutes, ...postRoutes];
}
