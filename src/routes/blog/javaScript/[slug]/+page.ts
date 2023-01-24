export async function load({ params }: { params: { slug: string }}) {
	const post = await import(`../../../../lib/_posts/javaScript/${params.slug}.md`);

	const { title, date, category, description } = post.metadata;
	let content;

	if (post.default) {
		content = post.default;
	}

	return {
		title,
		description,
		category,
		date:  new Intl.DateTimeFormat('ko-KR').format(new Date(date)),
		content
	};
}
