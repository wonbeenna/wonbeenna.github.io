import { postsPerPage } from '$lib/config';
import fetchPosts from '$lib/utils/fetchPosts';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
	const page = parseInt(params.page) || 1;

	if (page <= 1) {
		throw redirect(301, `/`);
	}

	const offset = page * postsPerPage - postsPerPage;

	const { posts } = await fetchPosts({ offset });

	const totalPostsRes = await fetch(`/api/posts/count`);
	const total = await totalPostsRes.json();

	const categoriesRes = await fetch(`/api/posts/category`);
	const categories = await categoriesRes.json();

	return {
		posts,
		page,
		categories,
		totalPosts: total
	};
};
