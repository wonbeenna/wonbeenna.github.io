<script>
	import Pagination from "$lib/components/Posts/Pagination.svelte";
	import "$lib/styles/_main.scss"
	import PostList from "$lib/components/Posts/PostList.svelte";
	import Category from "$lib/components/Posts/Category.svelte";
	import {MetaTags} from "svelte-meta-tags";
	export let data
</script>

<MetaTags
		title="Been blog"
		description="Been dev-note"
		canonical="https://wonbeenna.github.io/been-blog/"
		openGraph={{
    		url: 'https://wonbeenna.github.io/been-blog/',
    		title: 'Been blog',
    		description: 'Been dev-not',
    		images: [
    		  {
    		   url: 'https://wonbeenna.github.io/been-blog/favicon.png',
 		       width: 800,
 		       height: 600,
 		       alt: 'Logo'
 		     },
 		     {
 		       url: 'https://wonbeenna.github.io/been-blog/favicon.png',
  		      width: 900,
 		      height: 800,
  		      alt: 'Logo'
 		     }
 		   ],
 		   site_name: 'Been-blog'
 		 }}
/>

<h1>Blog</h1>

<Category categories={data.categories} />

<PostList posts={data} />

<Pagination currentPage={1} totalPosts={data.total} />
