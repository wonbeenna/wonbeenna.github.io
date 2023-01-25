<script>
	import { postsPerPage } from '$lib/config.js'
	import { page } from '$lib/utils/store'

	export let currentPage
	export let totalPosts
	export let path = '/blog/page'

	let postPage;

	page.subscribe(value => {
		postPage = value;
	})

	let pagesAvailable
	$: pagesAvailable = Math.ceil(totalPosts / postsPerPage)

	const handlePrevPage = () => {
		if(postPage <= 1){
			return;
		}
		page.update(n => n - 1);
	}

	const handleNextPage = () => {
		if(postPage >= pagesAvailable){
			return;
		}
		page.update(n => n + 1);
	}
</script>

{#key currentPage}
	{#if pagesAvailable > 1}
		<nav class="pagination" aria-label="Pagination navigation">
			<ul class="pagination_list_wrapper">
				<li>
					<a href="{path}/{postPage}" on:click={handlePrevPage}>
						이전 페이지
					</a>
				</li>
				<li>
					<a href="{path}/{postPage}" on:click={handleNextPage}>
						다음 페이지
					</a>
				</li>
			</ul>
		</nav>
	{/if}
{/key}
