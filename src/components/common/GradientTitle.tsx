import { cn } from '@/utils/cn';

export type TextGradientType = 'frontend' | 'blog' | 'about' | 'post';

interface GradientTextProps {
  children: React.ReactNode;
  type?: TextGradientType;
  className?: string;
}

export default function GradientText({ children, type = 'frontend', className }: GradientTextProps) {
  const gradients = {
    frontend:
      'bg-[linear-gradient(108deg,theme(colors.primaryGradient02),theme(colors.primaryGradient03)_33%,theme(colors.primaryGradient04)_66%,theme(colors.primaryGradient05))]',
    blog: 'bg-[linear-gradient(108deg,theme(colors.primaryGradient01),theme(colors.primaryGradient02)_33%,theme(colors.primaryGradient03)_66%,theme(colors.primaryColor))]',
    about:
      'bg-[linear-gradient(108deg,theme(colors.primaryGradient04),theme(colors.primaryGradient03)_33%,theme(colors.primaryGradient05)_66%,theme(colors.primaryGradient02))]',
    post: 'bg-[linear-gradient(108deg,theme(colors.primaryGradient03),theme(colors.primaryGradient02)_40%,theme(colors.primaryColor)_80%)]'
  };

  const sizeClass = type === 'post' ? 'text-5xl' : 'text-7xl';

  return (
    <h1
      className={cn(
        'inline bg-clip-text font-extrabold tracking-tight [-webkit-box-decoration-break:clone] [-webkit-text-fill-color:transparent] [box-decoration-break:clone]',
        gradients[type],
        sizeClass,
        className
      )}
    >
      {children}
    </h1>
  );
}
