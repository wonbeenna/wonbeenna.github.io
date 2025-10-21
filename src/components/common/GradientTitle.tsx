import { cn } from '@/utils/cn';

export type TextGradientType = 'frontend' | 'blog' | 'about' | 'post' | 'search' | 'photo';
export type TextGradientSize = 'small' | 'medium' | 'large';

interface GradientTextProps {
  children: React.ReactNode;
  type?: TextGradientType;
  className?: string;
  size?: TextGradientSize;
}

export default function GradientText({ children, type = 'frontend', className, size = 'medium' }: GradientTextProps) {
  const gradients = {
    frontend:
      'bg-[linear-gradient(108deg,theme(colors.primaryGradient02),theme(colors.primaryGradient03)_33%,theme(colors.primaryGradient04)_66%,theme(colors.primaryGradient05))]',
    blog: 'bg-[linear-gradient(108deg,theme(colors.primaryGradient01),theme(colors.primaryGradient02)_33%,theme(colors.primaryGradient03)_66%,theme(colors.primaryColor))]',
    about:
      'bg-[linear-gradient(108deg,theme(colors.primaryGradient04),theme(colors.primaryGradient03)_33%,theme(colors.primaryGradient05)_66%,theme(colors.primaryGradient02))]',
    post: 'bg-[linear-gradient(108deg,theme(colors.primaryGradient03),theme(colors.primaryGradient02)_40%,theme(colors.primaryColor)_80%)]',
    search:
      'bg-[linear-gradient(108deg,theme(colors.primaryGradient02),theme(colors.primaryGradient03)_50%,theme(colors.primaryColor)_90%)]',
    photo:
      'bg-[linear-gradient(120deg,theme(colors.primaryGradient02),theme(colors.primaryGradient03)_30%,theme(colors.primaryGradient04)_65%,theme(colors.primaryGradient05)_90%)]'
  };

  const sizeClass = {
    small: 'text-5xl',
    medium: 'text-6xl',
    large: 'text-7xl'
  };

  return (
    <h1
      className={cn(
        'inline bg-clip-text font-extrabold tracking-tight [-webkit-box-decoration-break:clone] [-webkit-text-fill-color:transparent] [box-decoration-break:clone]',
        gradients[type],
        sizeClass[size],
        className
      )}
    >
      {children}
    </h1>
  );
}
