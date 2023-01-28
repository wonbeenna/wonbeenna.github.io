<script>
	import PostCard from '$lib/components/Posts/PostCard.svelte';

	export let posts;
</script>

<ol class="wrapper">
	{#each posts.posts as post}
		<PostCard
			path={post.slug}
			title={post.title}
			description={post.description}
			titleImage={post.titleImage}
			date={post.date}
		/>
	{/each}
</ol>
