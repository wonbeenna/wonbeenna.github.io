<script>
	import { postsPerPage } from '$lib/config'

	export let currentPage
	export let totalPosts

	let pagesAvailable
	$: pagesAvailable = Math.ceil(totalPosts / postsPerPage)

	const isCurrentPage = (page) => page === currentPage
</script>

{#key currentPage}
	{#if pagesAvailable > 1}
		<nav aria-label="Pagination navigation">
			<ul>
				{#each Array.from({length: pagesAvailable}, (_, i) => i + 1) as page}
					<li>
						<a href="/{page}" aria-current="{isCurrentPage(page)}">
							<span>
								{#if isCurrentPage(page)}
									Current page:
								{:else}
									Go to page
								{/if}
							</span>
							{page}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
{/key}
