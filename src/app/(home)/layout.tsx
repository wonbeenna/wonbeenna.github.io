import WaveBanner from '@/components/common/WaveBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WaveBanner
        title="FrontEnd"
        type="frontend"
        description="Hello, I&#39;m Been! A passionate front-end developer from South Korea, fascinated by photography and an
            avid reader."
      />
      {children}
    </>
  );
}
