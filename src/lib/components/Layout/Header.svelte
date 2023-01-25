<script>
    import '$lib/styles/_layout.scss'
    import {base} from "$app/paths";
</script>

<!-- TODO 다크모드-->
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
            <img src={`${base}/icons/github.svg`}
                 alt="github"
                 width={30}
                 height={30}
            />
         </a>
         <a href={'mailto:nwbnwb@naver.com'}>
            <img src={`${base}/icons/mail.svg`}
                 alt="email"
                 width={34}
                 height={34}
            />
         </a>
      </div>
   </section>
</header>
