<!-- This file handles any /blog/page/x route for pagination -->
<script>

  import { postsPerPage } from '$lib/config'
  import Pagination from "$lib/components/Posts/Pagination.svelte";
  import PostCard from "$lib/components/Posts/PostCard.svelte";

	export let data
	const { page, totalPosts, posts } = data

	$: lowerBound = (page * postsPerPage) - (postsPerPage - 1) || 1
	$: upperBound = Math.min(page * postsPerPage, totalPosts)
</script>


<svelte:head>
	<title>Been blog - page {page}</title>
</svelte:head>

{#if posts.length}
	<h1>Posts {lowerBound}–{upperBound} of {totalPosts}</h1>
	<Pagination currentPage={page} {totalPosts} />

	{#each data.posts as post}
		<PostCard
				path={post.slug}
				title={post.title}
				description={post.description}
				titleImage={post.titleImage}
				date={post.date}
				category={post.category}
		/>
	{/each}

	<Pagination currentPage={page} {totalPosts} />
{:else}
	<p>Sorry, no posts to show here.</p>
	<a href="/">Back to blog</a>
{/if}
