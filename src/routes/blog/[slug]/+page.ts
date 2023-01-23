export async function load({ params }) {
	const post = await import(`../../../lib/_posts/${params.slug}.md`);

	const { title, date, description } = post.metadata;
	let content;
	if (post.default) {
		content = post.default;
	}

	return {
		title,
		description,
		date,
		content
	};
}
