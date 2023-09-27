import { Roboto } from 'next/font/google';
import Layout from '@/layout/Layout';
import '../styles/tailwind.css';
import { Metadata } from 'next';

const inter = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Been blog',
  description: 'Been dev-note'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" type="image/png" sizes="32x32" />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
