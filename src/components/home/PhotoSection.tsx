import Link from 'next/link';
import Section from '@/components/common/Section';
import Title from '@/components/common/Title';
import RecentPhotoList from '@/components/home/RecentPhotoList';

const PhotoSection = () => {
  return (
    <Section>
      <Link href="/photo" className="inline-block">
        <Title className="mb-10 text-5xl" title="PHOTO" />
      </Link>

      <RecentPhotoList />

      <Link href="/photo" className="btn-learn-more mt-12">
        ALL PHOTO
      </Link>
    </Section>
  );
};

export default PhotoSection;
