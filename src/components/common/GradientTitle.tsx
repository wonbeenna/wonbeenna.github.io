import { cn } from '@/utils/cn';

interface GradientTextProps {
  children: React.ReactNode;
  type?: 'frontend' | 'blog' | 'about';
  className?: string;
}

export default function GradientText({ children, type = 'frontend', className }: GradientTextProps) {
  const gradients = {
    frontend:
      'bg-[linear-gradient(108deg,theme(colors.primaryGradient02),theme(colors.primaryGradient03)_33%,theme(colors.primaryGradient04)_66%,theme(colors.primaryGradient05))]',
    blog: 'bg-[linear-gradient(108deg,theme(colors.primaryGradient01),theme(colors.primaryGradient02)_33%,theme(colors.primaryGradient03)_66%,theme(colors.primaryColor))]',
    about:
      'bg-[linear-gradient(108deg,theme(colors.primaryGradient04),theme(colors.primaryGradient03)_33%,theme(colors.primaryGradient05)_66%,theme(colors.primaryGradient02))]'
  };

  return (
    <span
      className={cn(
        'inline bg-clip-text [-webkit-box-decoration-break:clone] [-webkit-text-fill-color:transparent] [box-decoration-break:clone]',
        gradients[type],
        className
      )}
    >
      {children}
    </span>
  );
}

// inline
// bg-[linear-gradient(108deg,#0090f7,#ba62fc_33%,#f2416b_66%,#f55600)]
// bg-clip-text
// text-transparent
