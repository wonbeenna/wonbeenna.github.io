<script>
	import Post from "$lib/components/Posts/Post.svelte";
	import {MetaTags} from "svelte-meta-tags";

	export let data;
</script>

<MetaTags
	title={data.meta.title}
	description={data.meta.description}
	openGraph={{
    		url: `https://wonbeenna.github.io/been-blog/blog/${data.meta.slug}`,
    		title: data.meta.title,
    		description: data.meta.description,
    		images: [
    		  {
    		   url: `https://wonbeenna.github.io${data.meta.titleImage}`,
 		       alt: 'titleImage'
 		     },
 		   ],
 		   site_name: `Been-blog ${data.meta.title}`
 		 }}
/>

<Post data={data} />
