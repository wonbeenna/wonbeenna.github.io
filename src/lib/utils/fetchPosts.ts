const fetchPosts = async () => {
	const posts = await Promise.all(
		Object.entries(import.meta.glob('/src/lib/_posts/*.md')).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const slug = path.split('/').pop().slice(0, -3);
			return { ...metadata, slug };
		})
	);

	const sortedPosts = posts
		.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
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
