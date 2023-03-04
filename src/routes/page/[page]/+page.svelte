<script>
	import Pagination from '$lib/components/Posts/Pagination.svelte';
	import PostList from '$lib/components/Posts/PostList.svelte';
	import Category from '$lib/components/Posts/Category.svelte';

	export let data;
	const { page, totalPosts, posts, categories } = data;
</script>

<svelte:head>
	<title>Blog - page {page}</title>
</svelte:head>

{#if posts.length}
	<h2>Blog {page} page</h2>

	<section class="section">
		<PostList posts={data} />
		<Category {categories} />
	</section>

	<Pagination currentPage={page} {totalPosts} />
{:else}
	<p>Sorry, no posts to show here.</p>

	<a href="/">Back to blog</a>
{/if}
