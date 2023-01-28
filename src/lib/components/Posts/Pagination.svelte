<script>
	import { postsPerPage } from '$lib/config.ts';
	import { base } from '$app/paths';

	export let currentPage;
	export let totalPosts;
	export let path = `/page`;

	let pagesAvailable;
	$: pagesAvailable = Math.ceil(totalPosts / postsPerPage);
</script>

{#key currentPage}
	{#if pagesAvailable > 1}
		<nav class="pagination" aria-label="Pagination navigation">
			<ul class="pagination_list_wrapper">
				<li>
					<a href="{base}{path}/{currentPage <= 1 ? currentPage : currentPage - 1}"> 이전 페이지 </a>
				</li>
				<li>
					<a href="{base}{path}/{currentPage >= pagesAvailable ? currentPage : currentPage + 1}"> 다음 페이지 </a>
				</li>
			</ul>
		</nav>
	{/if}
{/key}
