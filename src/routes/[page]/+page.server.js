import { postsPerPage } from '$lib/config'
import { redirect } from '@sveltejs/kit'
import fetchPosts from "$lib/utils/fetchPosts";

export const load = async ({ url, params, fetch }) => {
  const page = parseInt(params.page) || 1

  if (page <= 1) {
    throw redirect(301, '/')
  }

  let offset = (page * postsPerPage) - postsPerPage

  const totalPostsRes = await fetch(`${url.origin}/api/posts/count`)
  const total = await totalPostsRes.json()
  const { posts } = await fetchPosts({ offset, page })

  return {
    posts,
    page,
    totalPosts: total
  }
}
