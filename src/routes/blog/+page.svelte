<script>
    export let data
</script>

<h1>Blog</h1>

<ul>
    {#each data.posts as post}
        <li>
            <h2>
                <a href={post.path}>
                    {post.title}
                </a>
            </h2>
            {post.date}
        </li>
    {/each}
</ul>
