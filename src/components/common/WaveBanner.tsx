import GradientTitle, { TextGradientType } from '@/components/common/GradientTitle';
import useFormatDate from '@/hooks/useFormatDate';

export type WaveBannerProps = React.HTMLAttributes<HTMLElement> & {
  title: string;
  description?: string;
  date?: string | Date;
  type?: TextGradientType;
};

export default function WaveBanner({ title, description, className, type, date, ...rest }: WaveBannerProps) {
  const { postDate, iso } = useFormatDate(date);

  return (
    <>
      <section className="bg-bannerBg dark:bg-darkBg02" {...rest}>
        <div className="mx-auto my-0 max-w-[970px] px-[16px] py-16">
          {date && (
            <div className="mb-2 text-sm text-gray700">
              <time dateTime={iso}>{postDate}</time>
            </div>
          )}
          <GradientTitle type={type}>{title}</GradientTitle>
          {description && <p className="mt-4 text-lg text-gray900 dark:text-gray300">{description}</p>}
        </div>
      </section>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-16 w-full text-bannerBg dark:text-darkBg02"
      >
        <path
          fill="currentColor"
          d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,64C840,75,960,117,1080,117.3C1200,117,1320,75,1380,53.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>
    </>
  );
}
