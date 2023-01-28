<script>
	import Post from '$lib/components/Posts/Post.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;
	const { title, description, category, slug, titleImage } = data.meta;
</script>

<MetaTags
	{title}
	{description}
	openGraph={{
		url: `https://wonbeenna.github.io/blog/${category}/${slug}`,
		title: title,
		description: description,
		images: [
			{
				url: `https://wonbeenna.github.io${titleImage}`,
				alt: 'titleImage'
			}
		],
		site_name: `Been-blog ${title}`
	}}
/>

<Post {data} />
