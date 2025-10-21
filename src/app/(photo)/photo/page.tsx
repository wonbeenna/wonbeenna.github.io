import WaveBanner from '@/components/common/WaveBanner';

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <>
      <WaveBanner
        title="Photo"
        type="photo"
        description="A collection of my photography works and visual stories captured through my lens."
      />
    </>
  );
};

export default Page;
