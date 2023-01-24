export const load = async ({ url, fetch }) => {
	const res = await fetch(`${url.origin}/api/posts.json`)
	let posts = await res.json()

	let uniqueCategories = {}

	posts.forEach(post => {
			if (uniqueCategories.hasOwnProperty(post.category)) {
				uniqueCategories[post.category].count += 1
			} else {
				uniqueCategories[post.category] = {
					title: post.category,
					count: 1
				}
			}
	})

	const sortedUniqueCategories =
		Object.values(uniqueCategories)
			.sort((a, b) => a.title > b.title)

	return {
		uniqueCategories: sortedUniqueCategories
	}
}
