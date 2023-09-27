import React from 'react';
import { Metadata } from 'next';
import { defaultOpenGraph } from '@/utils/metadata';

export const metadata: Metadata = {
  title: 'Been blog about',
  openGraph: {
    ...defaultOpenGraph,
    title: 'Been blog - about',
    description: 'Been dev-note - about'
  }
};

const Page = async () => {
  return <div>about</div>;
};

export default Page;
