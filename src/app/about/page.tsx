import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph } from '@/utils/metadata';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Been blog about',
  description: 'Been dev-note about',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`
  },
  openGraph: {
    ...defaultOpenGraph,
    title: 'Been blog - about',
    description: 'Been dev-note - about'
  }
};

const Page = async () => {
  return (
    <>
      <WaveBanner
        title="About"
        type="about"
        description="Welcome to my blog. I love reading, writing, and taking pictures."
      />
      <Section>
        <p className="mb-4 text-lg leading-relaxed text-black dark:text-darkText01">
          사진처럼 선명하고, 책처럼 깊이 있는 인터페이스를 만듭니다.
        </p>

        <div className="space-y-4 text-left leading-relaxed text-black dark:text-darkText01">
          <p>
            안녕하세요 👋 사용자 경험을 중요하게 생각하는 프론트엔드 개발자 <strong>Been</strong>입니다.
          </p>
          <p>
            사진을 찍을 때처럼, 저는 코드에서도 ‘구도’와 ‘빛’을 고민합니다.
            <br />
            불필요한 요소를 덜어내고, 가장 편안한 경험이 드러나는 인터페이스를 만듭니다.
          </p>
          <p>
            독서를 통해 사고의 깊이를 다지고, 기술로 그 생각을 구현합니다.
            <br />
            완성도 높은 인터랙션과 일관된 디자인 시스템을 만드는 데 집중하고 있습니다.
          </p>
          <hr className="border-gray300 dark:border-gray700" />
          <p>
            좋은 코드의 본질은 <em>보이지 않게 잘 작동하는 것</em>이라고 생각합니다. <br />
            기술보다 사람을, 기능보다 경험을 우선합니다. 결국 제품은 ‘사용자 손끝’에서 완성된다고 믿습니다.
          </p>
          <p className="italic text-gray600 dark:text-gray400">
            카메라로 세상을 담고, 책으로 세상을 배웁니다. 그렇게 하루하루, 조금 더 선명한 사람이 되어가고 있습니다.
          </p>
        </div>
      </Section>
    </>
  );
};

export default Page;
