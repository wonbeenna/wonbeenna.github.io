'use client';
import React from 'react';
import Giscus from '@giscus/react';

const Comment = () => {
  return (
    <div className="py-[50px]">
      <Giscus
        id="comments"
        repo="wonbeenna/wonbeenna.github.io"
        repoId="R_kgDOKY4BEA="
        category="Announcements"
        categoryId="DIC_kwDOKY4BEM4CZuWW"
        mapping="og:title"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        strict="0"
        emitMetadata="0"
        inputPosition="top"
        theme="light_tritanopia"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
};

export default Comment;
