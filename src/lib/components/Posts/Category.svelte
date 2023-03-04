<script>
	export let categories;
	export let postCategory = null;
</script>

<ul class="category">
	{#each categories as category}
		<li class={category.title === postCategory ? 'category_list selected' : 'category_list'}>
			<a href="/blog/category/{category.title}">
				{category.title} ({category.count})
			</a>
		</li>
	{/each}
</ul>
