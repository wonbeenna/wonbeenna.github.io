import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Been blog about',
  description: 'Been dev-note about',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`
  },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Been blog - about',
    description: 'Been dev-note - about'
  }
};

const Page = async () => {
  return (
    <>
      <WaveBanner title="About" type="about" />
      <Section>about</Section>
    </>
  );
};

export default Page;
