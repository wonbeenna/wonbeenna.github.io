<script>
	import Pagination from "$lib/components/Posts/Pagination.svelte";
	import {postsPerPage} from "$lib/config";
	import PostList from "$lib/components/Posts/PostList.svelte";

	export let data
	const { page, totalPosts, posts } = data

	$: lowerBound = (page * postsPerPage) - (postsPerPage - 1) || 1
	$: upperBound = Math.min(page * postsPerPage, totalPosts)
</script>


<svelte:head>
	<title>Blog - page {page}</title>
</svelte:head>


{#if posts.length}
	<h1>Posts {lowerBound}–{upperBound} of {totalPosts}</h1>
	<PostList posts={data} />

	<Pagination currentPage={page} {totalPosts} />
{:else}
	<h1>Oops!</h1>

	<p>Sorry, no posts to show here.</p>

	<a href="/blog">Back to blog</a>
{/if}
