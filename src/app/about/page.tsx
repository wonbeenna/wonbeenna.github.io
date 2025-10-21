import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';
import Section from '@/components/common/Section';

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
  return <Section>about</Section>;
};

export default Page;
