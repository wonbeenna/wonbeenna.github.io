import fetchPosts from "$lib/utils/fetchPosts"
import {json} from "@sveltejs/kit";

export const prerender = true

export const GET = async () => {
    const options = { limit: -1 }
    const { posts } = await fetchPosts(options)

    const uniqueCategories = {}

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

    return json(sortedUniqueCategories)
}
