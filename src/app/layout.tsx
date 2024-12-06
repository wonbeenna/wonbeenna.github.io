import { Roboto } from 'next/font/google';
import Layout from '@/layout/Layout';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';
import Script from 'next/script';
import { Providers } from '@/app/providers';
import React from 'react';

const inter = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin']
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
      <body suppressHydrationWarning className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
