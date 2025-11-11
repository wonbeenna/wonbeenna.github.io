import { cn } from '@/utils/cn';

type IconProps = React.SVGProps<SVGSVGElement> & { strokeWidth?: number };

export const ArrowLeftIcon = ({ strokeWidth = 2.5, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const ArrowRightIcon = ({ strokeWidth = 2.5, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const CloseIcon = ({ strokeWidth = 2.5, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

interface IconButtonProps {
  label?: string;
  onClick: () => void;
  position?: 'left' | 'right' | 'top-right';
}

const IconButton = ({ label, onClick, position }: IconButtonProps) => {
  const classes = position === 'left' ? 'justify-start' : position === 'right' ? 'justify-end' : 'justify-end';
  const Icon = position === 'left' ? ArrowLeftIcon : position === 'right' ? ArrowRightIcon : CloseIcon;

  return (
    <div className={cn('flex', classes)}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label={label || (position === 'left' ? '이전' : position === 'right' ? '다음' : '닫기')}
        className="inline-flex items-center justify-center rounded-full p-2 backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <Icon className="size-6" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default IconButton;
