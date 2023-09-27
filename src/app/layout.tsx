import { Roboto } from 'next/font/google';
import Layout from '@/layout/Layout';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import Head from 'next/head';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';

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
    <html lang="ko">
      <Head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" type="image/png" sizes="32x32" />
      </Head>
      <body suppressHydrationWarning className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
