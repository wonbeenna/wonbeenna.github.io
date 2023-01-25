import { postsPerPage } from '$lib/config'
import fetchPosts from '$lib/utils/fetchPosts'
import { redirect } from '@sveltejs/kit'
import {base} from "$app/paths";

export const load = async ({ params, fetch }) => {
  const page = parseInt(params.page) || 1

  if (page <= 1) {
    throw redirect(301, `${base}/blog`)
  }

  const offset = (page * postsPerPage) - postsPerPage

  const { posts } = await fetchPosts({ offset })

  const totalPostsRes = await fetch(`${base}/api/posts/count`)
  const total = await totalPostsRes.json()

  return {
    posts,
    page,
    totalPosts: total
  }
}
