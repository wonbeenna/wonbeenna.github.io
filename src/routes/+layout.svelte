<script>
    import Header from "$lib/components/Layout/Header.svelte";
    import Footer from "$lib/components/Layout/Footer.svelte";
    import "@fontsource/roboto";
    import '$lib/styles/reset.scss'
    import '$lib/styles/_main.scss'
    import { fade } from 'svelte/transition'

    export let data
</script>

<Header />

{#key data.currentRoute}
    <main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
        <slot />
    </main>
{/key}

<Footer />

