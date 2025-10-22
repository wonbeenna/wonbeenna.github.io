import WaveBanner from '@/components/common/WaveBanner';
import Section from '@/components/common/Section';

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <>
      <WaveBanner
        title="Photo"
        type="photo"
        description="A collection of my photography works and visual stories captured through my lens."
      />
      <Section>
        <div className="text-center">
          <p>Photography gallery is under construction. Please check back later! 😶‍🌫️</p>
        </div>
      </Section>
    </>
  );
};

export default Page;
