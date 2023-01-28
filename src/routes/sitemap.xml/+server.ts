import fetchPosts from '$lib/utils/fetchPosts';

export const prerender = true;

export const GET = async () => {
	const { posts } = await fetchPosts({ limit: -1 });
	const links = posts.map(
		(p) => `
    <url>
      <loc>https://wonbeenna.github.io/blog/${p.category}/${p.slug}</loc>
      <lastmod>${new Date(p.date).toISOString()}</lastmod>
      <priority>1.0</priority>
    </url>
  `
	);
	const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
        <url>
            <loc>https://wonbeenna.github.io/</loc>
            <priority>1.0</priority>
        </url>
        
        <url>
            <loc>https://wonbeenna.github.io/about</loc>
            <priority>1.0</priority>
        </url>
        
    ${links.join('')}
    </urlset>
  `.trim();
	return new Response(xml, { headers: { 'Content-Type': 'text/xml; charset=utf-8' } });
};
