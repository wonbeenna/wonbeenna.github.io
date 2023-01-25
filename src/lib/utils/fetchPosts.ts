import {postsPerPage} from "$lib/config";

const fetchPosts = async ({ offset = 0, limit = postsPerPage, category = '' } = {}) => {
	const posts = await Promise.all(
		Object.entries(import.meta.glob('/src/lib/_posts/*.md')).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const slug = path.split('/').pop()?.slice(0, -3);
			return { ...metadata, slug };
		})
	);

	let sortedPosts = posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

	if (category) {
		sortedPosts = sortedPosts.filter(post => post.category === category)
	}

	if (offset) {
		sortedPosts = sortedPosts.slice(offset)
	}

	if (limit && limit < sortedPosts.length && limit != -1) {
		sortedPosts = sortedPosts.slice(0, limit)
	}

	sortedPosts = sortedPosts
		.map((post) => ({
			slug: post.slug,
			title: post.title,
			description: post.description,
			category: post.category,
			titleImage: post.titleImage,
			date: new Intl.DateTimeFormat('ko-KR').format(new Date(post.date))
		}));

	return {
		posts: sortedPosts
	};
};

export default fetchPosts;
