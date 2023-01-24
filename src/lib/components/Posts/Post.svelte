<script>
    import Content from "$lib/components/Posts/Content.svelte";
    import '$lib/styles/_post.scss'
    export let data;
</script>

<article>
    <aside>
        <div class="post_title_wrapper">
            <h1 class="post_title">{data.title}</h1>
            <h2 class="card_post_description">{data.description}</h2>
            <p class="card_post_date">{data.date}</p>
        </div>
        <Content
                content={data.content}
        />
    </aside>
</article>
