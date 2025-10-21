import WaveBanner from '@/components/common/WaveBanner';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Been blog search',
  description: 'Been dev-note search',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/search`
  },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Been blog - search',
    description: 'Been dev-note - search'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WaveBanner title="Search" type="search" description="Search blog posts by title keywords." />
      {children}
    </>
  );
}
