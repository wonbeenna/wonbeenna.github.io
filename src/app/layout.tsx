import React from 'react';
import localFont from 'next/font/local';
import Layout from '@/layout/Layout';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';
import Script from 'next/script';
import { Providers } from '@/app/providers';

export const dynamic = 'force-static';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export const metadata: Metadata = {
  ...defaultMetadata,
  openGraph: defaultOpenGraph
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-LFDRQZPCBN" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-LFDRQZPCBN');
        `}
      </Script>
      <body suppressHydrationWarning className={pretendard.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
