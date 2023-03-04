import fetchPosts from '$lib/utils/fetchPosts';

export const load = async ({ params, fetch }) => {
	const category = params.category;
	const page = params.page || 1;
	const options = { category, limit: -1 };
	const { posts } = await fetchPosts(options);

	const categoriesRes = await fetch(`/api/posts/category`);
	const categories = await categoriesRes.json();

	return {
		posts,
		category,
		page,
		categories,
		total: posts.length
	};
};
