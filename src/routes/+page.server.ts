import { postsPerPage } from '$lib/config';
import fetchPosts from '$lib/utils/fetchPosts';

export const load = async ({ fetch }) => {
	const options = {
		limit: postsPerPage
	};
	const { posts } = await fetchPosts(options);

	const totalRes = await fetch(`/api/posts/count`);
	const total = await totalRes.json();

	const categoriesRes = await fetch(`/api/posts/category`);
	const categories = await categoriesRes.json();

	return { posts, total, categories };
};
