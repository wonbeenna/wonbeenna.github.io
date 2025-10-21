import BlogSection from '@/components/home/BlogSection';
import WaveBanner from '@/components/common/WaveBanner';

export default async function Home() {
  return (
    <>
      <WaveBanner
        title="FrontEnd"
        type="frontend"
        description="Hello, I&#39;m Been! A passionate front-end developer from South Korea, fascinated by photography and an
            avid reader."
      />
      <BlogSection />
    </>
  );
}
