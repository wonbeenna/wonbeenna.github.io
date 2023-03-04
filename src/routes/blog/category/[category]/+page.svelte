<script>
	import PostList from '$lib/components/Posts/PostList.svelte';
	import Category from '$lib/components/Posts/Category.svelte';

	export let data;
	const { posts, category, categories } = data;
</script>

<svelte:head>
	<title>Category: {category}</title>
</svelte:head>

<h1>Blog category: {category}</h1>

{#if posts.length}
	<section class="section">
		<PostList posts={data} />
		<Category postCategory={category} {categories} />
	</section>
{:else}
	<p>Sorry, couldn't find any posts in the category "{category}".</p>

	<p><a href="/blog">Back to blog</a></p>
{/if}
