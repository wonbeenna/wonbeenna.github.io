import { cn } from '@/utils/cn';

interface IconButtonProps {
  label: string;
  onClick: () => void;
  position?: 'left' | 'right' | 'top-right';
}

const IconButton = ({ label, onClick, position }: IconButtonProps) => {
  const classes = position === 'left' ? 'justify-start' : position === 'right' ? 'justify-end' : 'justify-end';
  return (
    <div className={cn('flex w-full', classes)}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-white backdrop-blur hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <span className="text-xs">{label}</span>
      </button>
    </div>
  );
};

export default IconButton;
