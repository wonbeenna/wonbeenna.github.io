import { Feed } from 'feed';
import fetchPosts from '$lib/utils/fetchPosts';

export const prerender = true;

export const GET = async () => {
	const { posts } = await fetchPosts({ limit: -1 });
	const feed = new Feed({
		title: 'Been blog',
		description: 'Been dev-note',
		id: 'https://wonbeenna.github.io',
		link: 'https://wonbeenna.github.io',
		language: 'ko',
		copyright: 'Copyright ©Been',
		author: {
			name: 'Been',
			email: 'nwbnwb@naver.com',
			link: 'wonbeenna'
		}
	});
	posts.forEach((p) => {
		feed.addItem({
			title: p.title,
			id: p.slug,
			guid: `https://wonbeenna.github.io/blog/${p.category}/${p.slug}`,
			link: `https://wonbeenna.github.io/blog/${p.category}/${p.slug}`,
			description: p.description,
			date: new Date(p.date)
		});
	});

	return new Response(feed.rss2(), { headers: { 'Content-Type': 'text/xml; charset=utf-8' } });
};
