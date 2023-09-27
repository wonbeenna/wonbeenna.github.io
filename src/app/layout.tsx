import { Roboto } from 'next/font/google';
import Layout from '@/layout/Layout';
import '../styles/tailwind.css';

const inter = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
