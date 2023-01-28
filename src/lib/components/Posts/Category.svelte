<script>
	export let categories;
</script>

<ul class="category">
	{#each categories as category}
		<li class="category_list">
			<a href="/blog/category/{category.title}">
				{category.title} ({category.count})
			</a>
		</li>
	{/each}
</ul>
