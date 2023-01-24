<script>
	import Pagination from "$lib/components/Posts/Pagination.svelte";
	import "$lib/styles/_main.scss"
	import PostList from "$lib/components/Posts/PostList.svelte";
	export let data
</script>

<svelte:head>
	<title>Been blog</title>
</svelte:head>

<h1>Blog</h1>

<PostList posts={data} />

<Pagination currentPage={1} totalPosts={data.total} />
