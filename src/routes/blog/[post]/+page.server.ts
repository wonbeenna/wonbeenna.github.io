import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const post = await import(`../../../lib/_posts/${params.post}.md`);

		return {
			PostContent: post.default.render().html,
			meta: {
				...post.metadata,
				date: new Intl.DateTimeFormat('ko-KR').format(new Date(post.metadata.date)),
				slug: params.post
			}
		};
	} catch (err) {
		throw error(404, err);
	}
};
