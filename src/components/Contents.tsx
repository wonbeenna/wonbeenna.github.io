'use client';
import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import '../styles/prism.css';
import Image, { ImageProps } from 'next/image';
import * as mdx from '@mdx-js/react';

const Contents = (props: MDXRemoteSerializeResult) => {
  const components = {
    img: (props: ImageProps) => <Image {...props} width={100} height={100} layout="responsive" loading="lazy" />
  } as React.ComponentProps<typeof mdx.MDXProvider>['components'];

  return <MDXRemote {...props} components={components} />;
};

export default Contents;
