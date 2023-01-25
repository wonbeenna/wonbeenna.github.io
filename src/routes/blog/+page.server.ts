import { postsPerPage } from "$lib/config";
import fetchPosts from "$lib/utils/fetchPosts";

export const load = async ({ url }) => {
	const options = {
		limit: postsPerPage
	}
	const { posts } = await fetchPosts(options)

	const totalRes = await fetch(`${url.origin}/api/posts/count`)
	const total = await totalRes.json()

	return { posts, total };
};
