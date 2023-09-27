import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'Been blog',
  description: 'Been dev-note',
  other: {
    name: 'google-site-verification',
    content: 'BirkRt7C7FYMLW96RbXad2EtPdcl0-_ti9xCRkCHa5U'
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
