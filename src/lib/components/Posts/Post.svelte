<script>
	import Content from '$lib/components/Posts/Content.svelte';
	import '$lib/styles/_post.scss';
	export let data;

	const { title, description, date } = data.meta;
</script>

<article>
	<aside>
		<div class="post_title_wrapper">
			<h1 class="post_title">{title}</h1>
			<h2 class="card_post_description">{description}</h2>
			<p class="card_post_date">{date}</p>
		</div>
		<Content content={data.PostContent} />
	</aside>
</article>
