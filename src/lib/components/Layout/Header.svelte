<script>
    import '$lib/styles/_layout.scss'

    let logo = '/icons/been-logo.svg'
    let github = '/icons/github.svg'
    let mail = '/icons/mail.svg'
</script>

<!-- TODO 다크모드-->
<header class="header">
   <section class="header_section">
      <div class="header_box">
         <a href="/">
            <img src={logo} width="60" height="56" alt="logo" />
         </a>
         <div class="header_box">
            <a href="/blog">
               <h3>Blog</h3>
            </a>
         </div>
         <div class="header_box">
            <a href="/about">
               <h3>About</h3>
            </a>
         </div>
      </div>
      <div class="header_box">
         <a href={'https://github.com/wonbeenna'} target="_blank" rel="noopener noreferrer">
            <img src={github}
                 alt="github"
                 width={30}
                 height={30}
            />
         </a>
         <a href={'mailto:nwbnwb@naver.com'}>
            <img src={mail}
                 alt="email"
                 width={34}
                 height={34}
            />
         </a>
      </div>
   </section>
</header>
