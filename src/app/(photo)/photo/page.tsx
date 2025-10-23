import WaveBanner from '@/components/common/WaveBanner';
import Section from '@/components/common/Section';
import Folder from '@/components/photo/Folder';
import Image from 'next/image';

const mockImages = [
  {
    src: '/assets/photos/city-night.jpg',
    alt: 'City Night'
  },
  {
    src: '/assets/photos/forest.jpg',
    alt: 'Forest'
  },
  {
    src: '/assets/photos/mountain.jpg',
    alt: 'Mountain'
  },
  {
    src: '/assets/photos/sea-sunset.jpg',
    alt: 'Sea Sunset'
  },
  {
    src: '/assets/photos/street-portrait.jpg',
    alt: 'Street Portrait'
  }
];

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

          <Folder
            items={mockImages.map((image, i) => (
              <Image
                key={image.src}
                width={300}
                height={300}
                src={image.src}
                alt={image.alt}
                className="size-full rounded-lg object-cover"
              />
            ))}
          />
        </div>
      </Section>
    </>
  );
};

export default Page;
