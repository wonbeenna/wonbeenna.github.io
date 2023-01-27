<script>
    import Header from "$lib/components/Layout/Header.svelte";
    import Footer from "$lib/components/Layout/Footer.svelte";
    import "@fontsource/roboto";
    import '$lib/styles/reset.scss'
    import '$lib/styles/_main.scss'
    import { fade } from 'svelte/transition'
    import {base} from "$app/paths";
    export let data
</script>

<svelte:head>
    <link rel="alternate" type="application/rss+xml" title="RSS" href="{base}/rss.xml" />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="{base}/sitemap.xml" />
</svelte:head>

<Header />

{#key data.currentRoute}
    <main in:fade={{ duration: 100, delay: 100 }} out:fade={{ duration: 100 }}>
        <slot />
    </main>
{/key}

<Footer />

