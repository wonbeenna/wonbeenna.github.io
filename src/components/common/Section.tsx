import { cn } from '@/utils/cn';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Section = ({ children, className, ...rest }: SectionProps) => {
  return (
    <section className={cn('mx-auto my-0 max-w-[970px] p-4 pb-40', className)} {...rest}>
      {children}
    </section>
  );
};

export default Section;
