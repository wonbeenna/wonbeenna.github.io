import WaveBanner from '@/components/common/WaveBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WaveBanner
        title="Photo"
        type="photo"
        description="A collection of my photography works and visual stories captured through my lens."
      />
      {children}
    </>
  );
}
