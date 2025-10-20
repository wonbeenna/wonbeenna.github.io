import { cn } from '@/utils/cn';
import { HTMLAttributes } from 'react';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  title?: string;
}

const Title = ({ title, className, ...rest }: TitleProps) => {
  return (
    <h1
      id={`${title}-heading`}
      className={cn('text-3xl font-extrabold tracking-tight text-black', className)}
      {...rest}
    >
      {title}
    </h1>
  );
};

export default Title;
