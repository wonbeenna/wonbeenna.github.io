import WaveBanner from '@/components/common/WaveBanner';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Been blog - Not Found',
  description: 'Been dev-note - Not Found',
  openGraph: {
    ...defaultOpenGraph,
    title: 'Been blog - Not Found',
    description: 'Been dev-note - Not Found'
  }
};

export default async function NotFound() {
  return (
    <>
      <WaveBanner title="Not Found" type="error" description="The page you are looking for does not exist." />
    </>
  );
}
