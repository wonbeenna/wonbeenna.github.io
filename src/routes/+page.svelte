<script>
	import PostCard from "$lib/components/Posts/PostCard.svelte";
	import "$lib/styles/_main.scss"
	export let data
</script>

<svelte:head>
	<title>Been blog</title>
</svelte:head>

<h1>Blog</h1>

<ol class="wrapper">
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
</ol>
