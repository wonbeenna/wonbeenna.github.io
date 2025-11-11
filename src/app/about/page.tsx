import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';
import Image from 'next/image';

export const metadata: Metadata = buildMetadata({
  title: 'about',
  description: 'about',
  path: '/about',
  imagesPath: '/about-favicon.png',
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
      <Section>
        <div className="mx-auto max-w-5xl">
          <article className="prose prose-lg max-w-none dark:prose-invert">
            <Image
              src="/assets/images/me.png"
              alt="Been profile"
              priority
              width={420}
              height={420}
              className="shape-outside float-right mb-4 ml-8 block h-full w-[280px] object-cover object-center md:w-[380px] lg:w-[420px]"
            />

            <div className="space-y-5 leading-relaxed">
              <p>
                안녕하세요! 프론트엔드 개발자 <strong>Been</strong>입니다! <br />
                사용자가 “어떻게 써야 하는지”를 배우지 않아도 자연스럽게 이해하고 사용할 수 있는 인터페이스, 그런 제품을
                만드는 것을 좋아합니다.
              </p>
              <p>
                저는 사진 찍는것을 좋아합니다. 찰나의 순간, 사람의 표정, 거리의 공기까지 한 장에 담아낼 수 있는 카메라의
                매력에 빠져 있습니다.
              </p>
              <p>
                또 책을 읽는것도 좋아합니다. 타인의 경험, 지식과 생각을 빌려 새로운 시각으로 세상을 바라보는 법을
                배웁니다. 최근에는 철학과 우주 과학에 관련된 책을 즐겨 읽고 있습니다.
              </p>

              <hr className="my-6 border-gray300 dark:border-gray700" />

              <p>
                좋은 코드의 본질은 <em>보이지 않게 잘 작동하는 것</em>이라고 생각합니다. <br />
                기술보다 사람을, 기능보다 경험을 우선합니다. 결국 제품은 ‘사용자 손끝’에서 완성된다고 생각합니다.
              </p>
              <p className="italic text-gray600 dark:text-gray400">
                카메라로 세상을 담고, 책으로 세상을 배웁니다. 그렇게 하루하루, 조금 더 선명한 사람이 되어가고 있습니다.
              </p>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
};

export default Page;
