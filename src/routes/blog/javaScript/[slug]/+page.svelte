<script>
    import Post from "$lib/components/Posts/Post.svelte";

    export let data;
</script>

<svelte:head>
    <title>{data.title}</title>
</svelte:head>

<Post data={data} />
