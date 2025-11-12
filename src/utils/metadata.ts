import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: 'Been blog',
  description: 'Been dev-note',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL
  },
  other: {
    ['google-site-verification']: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!,
    ['naver-site-verification']: process.env.NEXT_PUBLIC_NAVER_ANALYTICS!
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/favicon/favicon.png', sizes: '32x32', type: 'image/png' }]
  }
};

export const defaultOpenGraph = {
  title: 'Been blog',
  description: 'Been dev-note',
  siteName: 'Been blog',
  url: process.env.NEXT_PUBLIC_BASE_URL,
  type: 'website',
  locale: 'ko_KR'
};

interface BuildMetadataParams {
  title: string;
  description: string;
  path: string;
  imagesPath?: string;
  faviconPath?: string;
}

export const buildMetadata = ({
  title,
  description,
  path,
  imagesPath = '/assets/images/logo.png',
  faviconPath
}: BuildMetadataParams): Metadata => {
  return {
    ...defaultMetadata,
    title: `Been blog - ${title}`,
    description: `Been dev-note - ${description}`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${path}`
    },
    openGraph: {
      ...defaultOpenGraph,
      title: `Been blog - ${title}`,
      description: `Been dev-note - ${description}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${imagesPath}`,
          width: 800,
          height: 600,
          alt: 'Been blog'
        }
      ]
    },
    ...(faviconPath && {
      icons: {
        icon: [
          { url: `/favicon${faviconPath}-favicon.ico`, sizes: 'any' },
          { url: `/favicon${faviconPath}-favicon.png`, sizes: '32x32', type: 'image/png' }
        ],
        apple: [{ url: `/favicon${faviconPath}-favicon.png`, sizes: '32x32', type: 'image/png' }]
      }
    })
  };
};
