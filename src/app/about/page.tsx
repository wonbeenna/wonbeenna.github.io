import WaveBanner from '@/components/common/WaveBanner';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';
import AboutContainer from '@/components/about/AboutContainer';

export const metadata: Metadata = buildMetadata({
  title: 'about',
  description: 'about',
  path: '/about',
  imagesPath: '/favicon/about-favicon.png',
  faviconPath: '/about'
});

const Page = async () => {
  return (
    <>
      <WaveBanner
        title="About"
        type="about"
        description="Welcome to my blog. I love reading, writing, and taking pictures."
      />
      <AboutContainer />
    </>
  );
};

export default Page;
