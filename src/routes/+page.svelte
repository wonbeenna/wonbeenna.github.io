<script>
	import "$lib//styles/_main.scss"
	import PostCard from "$lib/components/Posts/PostCard.svelte";
	export let data
</script>

<section>
	<ol class="wrapper">
		{#each data.posts as post}
			<PostCard
					path={post.slug}
					title={post.title}
					description={post.description}
					titleImage={post.titleImage}
					date={post.date}
			/>
		{/each}
	</ol>
</section>
