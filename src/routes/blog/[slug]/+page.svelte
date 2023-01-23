<script>
    import Content from "$lib/components/Posts/Content.svelte";

    export let data;

</script>

<svelte:head>
    <title>{data.title}</title>
</svelte:head>

<article>
        <aside>
            <h1>{data.title}</h1>
            <h3>{data.description}</h3>
            <Content
                    content={data.content}
            />
        </aside>
</article>
