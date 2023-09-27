import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'Been blog',
  description: 'Been dev-note',
  other: {
    ['google-site-verification']: 'BirkRt7C7FYMLW96RbXad2EtPdcl0-_ti9xCRkCHa5U',
    ['naver-site-verification']: '58945b2bbe2fe86252fa8c7b204b40f6019920e9'
  }
};

export const defaultOpenGraph = {
  title: 'Been blog',
  description: 'Been dev-note',
  siteName: 'Been blog',
  url: process.env.NEXT_PUBLIC_BASE_URL,
  type: 'website',
  images: [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.png`,
      width: 800,
      height: 600,
      alt: 'Been blog'
    }
  ]
};
