<script>
	import Pagination from '$lib/components/Posts/Pagination.svelte';
	import '$lib/styles/_main.scss';
	import PostList from '$lib/components/Posts/PostList.svelte';
	import Category from '$lib/components/Posts/Category.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { seoMeta, seoOg } from '$lib/config';
	export let data;
</script>

<MetaTags {...seoMeta} openGraph={{ ...seoOg }} />

<h1>Blog</h1>

<Category categories={data.categories} />

<PostList posts={data} />

<Pagination currentPage={1} totalPosts={data.total} />
