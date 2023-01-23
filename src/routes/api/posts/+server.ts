import { json } from '@sveltejs/kit';
import fetchPosts from '../../../lib/utils/fetchPosts';

export const prerender = true;

export const GET = async () => {
	const { posts } = await fetchPosts();

	return json(posts);
};
