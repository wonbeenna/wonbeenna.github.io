<script>
    import {base} from "$app/paths";

    export let categories
</script>

<ul class="category">
    {#each categories as category}
        <li class="category_list">
            <a href="{base}/blog/category/{category.title}">
                {category.title} ({category.count})
            </a>
        </li>
    {/each}
</ul>
