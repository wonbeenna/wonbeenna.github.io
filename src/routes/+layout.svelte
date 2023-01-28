<script>
	import Header from '$lib/components/Layout/Header.svelte';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import '@fontsource/roboto';
	import '$lib/styles/reset.scss';
	import '$lib/styles/_main.scss';
	import { fade } from 'svelte/transition';

	export let data;
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" href="/rss.xml" />
	<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
</svelte:head>

<Header />

{#key data.currentRoute}
	<main in:fade={{ duration: 100, delay: 100 }} out:fade={{ duration: 100 }}>
		<slot />
	</main>
{/key}

<Footer />
