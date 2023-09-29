import React from 'react';

const Comment = () => {
  return (
    <div className="border-t-2 border-t-gray500 py-[50px]">
      <script
        src="https://giscus.app/client.js"
        data-repo="wonbeenna/wonbeenna.github.io"
        data-repo-id="R_kgDOKY4BEA"
        data-category="Announcements"
        data-category-id="DIC_kwDOKY4BEM4CZuWW"
        data-mapping="og:title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light_tritanopia"
        data-lang="ko"
        data-loading="lazy"
        crossOrigin="anonymous"
        async
      ></script>
      <div className="giscus" />
    </div>
  );
};

export default Comment;
