<script>
    import '$lib/styles/_layout.scss'
    import {base} from "$app/paths";
    import { onMount } from 'svelte';

    $: currentTheme = 'light';

    const setTheme = (theme) => {
       currentTheme = theme;
      document.documentElement.dataset.theme = theme;
      document.cookie = `siteTheme=${theme};max-age=31536000;path='/'`;
    }

    onMount(() => {
       currentTheme = document.documentElement.dataset.theme;
    });
</script>

<header class="header">
   <section class="header_section">
      <div class="header_box">
         <a href="{base}/">
            <img src={`${base}/icons/been-logo.svg`} width="60" height="56" alt="logo" />
         </a>
         <div class="header_box">
            <a href="{base}/blog">
               <h3>Blog</h3>
            </a>
         </div>
         <div class="header_box">
            <a href="{base}/about">
               <h3>About</h3>
            </a>
         </div>
      </div>
      <div class="header_box">
         <a href={'https://github.com/wonbeenna'} target="_blank" rel="noopener noreferrer">
            <img src={currentTheme === 'dark' ? `${base}/icons/github-light.svg` : `${base}/icons/github.svg`}
                 alt="github"
                 width={30}
                 height={30}
            />
         </a>
         <a href={'mailto:nwbnwb@naver.com'}>
            <img src={currentTheme === 'dark' ? `${base}/icons/mail-light.svg` : `${base}/icons/mail.svg`}
                 alt="email"
                 width={34}
                 height={34}
            />
         </a>
         <button  on:click={() => setTheme(currentTheme === 'dark' ? "light" : 'dark')}>
            {#if currentTheme === 'dark'}
               <img src="{`${base}/icons/sun.svg`}" alt="밝은 테마" width={30} height={30} />
            {:else}
               <img src="{`${base}/icons/moon.svg`}" alt="어두운 테마" width={30} height={30} />
            {/if}
         </button>
      </div>
   </section>
</header>
