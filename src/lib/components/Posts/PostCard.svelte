<script>
    import '$lib/styles/_post.scss'
    export let title
    export let description
    export let titleImage
    export let date
    export let path
</script>

<li class="card">
    <a class="card_link" href={`/blog/${path}`}>
        <div class="card_image_wrapper">
            <img class="card_image"
                 src={titleImage}
                 sizes="(max-width: 768px) 160px,
                   (max-width: 992px) 200px,
                   200px"
                 alt={title} />
        </div>

        <div class="card_post">
            <h1 class="card_post_title">{title}</h1>
            <h2 class="card_post_description">{description}</h2>
            <span class="card_post_date">
                {date}
            </span>
        </div>
    </a>
</li>
