<script>
	import PostList from '$lib/components/Posts/PostList.svelte';
	import { base } from '$app/paths';

	export let data;
	const { page, posts, category, total } = data;
</script>

<svelte:head>
	<title>Category: {category}</title>
</svelte:head>

<h1>Blog category: {category}</h1>

{#if posts.length}
	<PostList posts={data} />
{:else}
	<p><strong>Ope!</strong> Sorry, couldn't find any posts in the category "{category}".</p>

	<p><a href="{base}/blog">Back to blog</a></p>
{/if}
