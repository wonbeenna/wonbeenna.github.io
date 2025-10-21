import WaveBanner from '@/components/common/WaveBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WaveBanner title="About" description="" type="about" />
      {children}
    </>
  );
}
