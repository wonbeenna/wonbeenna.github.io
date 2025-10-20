import { getAllPost } from '@/utils/getPost';
import { MetadataRoute } from 'next';
import { getCategories } from '@/utils/getCategories';

export const dynamic = 'force-static';

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
const pageRoutes = [`${defaultUrl}`, `${defaultUrl}/about`];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const posts = await getAllPost({
    page: '1',
    limit: '-1'
  });

  const defaultRoutes: MetadataRoute.Sitemap = pageRoutes.map((route) => {
    return {
      url: route,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1
    };
  });

  const postCategoryRoutes: MetadataRoute.Sitemap = categories.map((category) => {
    return {
      url: `${defaultUrl}/blog/${category.title}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1
    };
  });

  const postRoutes: MetadataRoute.Sitemap = posts.posts.map((post) => {
    return {
      url: `${defaultUrl}/blog/${post.data.category}/${post.slug}`,
      lastModified: new Date(post.data.date).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8
    };
  });

  return [...defaultRoutes, ...postCategoryRoutes, ...postRoutes];
}
