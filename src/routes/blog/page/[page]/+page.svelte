<script>
	import Pagination from "$lib/components/Posts/Pagination.svelte";
	import PostList from "$lib/components/Posts/PostList.svelte";
	import {base} from "$app/paths";

	export let data
	const { page, totalPosts, posts } = data
</script>


<svelte:head>
	<title>Blog - page {page}</title>
</svelte:head>


{#if posts.length}
	<h2>Blog {page} page</h2>
	<PostList posts={data} />

	<Pagination currentPage={page} {totalPosts} />
{:else}
	<h1>Oops!</h1>

	<p>Sorry, no posts to show here.</p>

	<a href="{base}/blog">Back to blog</a>
{/if}
