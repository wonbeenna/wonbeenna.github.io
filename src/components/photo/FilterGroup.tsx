import { cn } from '@/utils/cn';

interface FilterGroupProps<T> {
  label: string;
  items: T[];
  value: T | null;
  onChange: (v: T | null) => void;
}

const FilterGroup = <T extends string | number>({ label, items, value, onChange }: FilterGroupProps<T>) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wider">{label}</span>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange(null)}
          className={cn(
            'h-8 rounded-full border px-3 text-xs',
            value == null ? 'bg-black text-white' : 'hover:bg-black/5'
          )}
        >
          All
        </button>
        {items.map((it) => (
          <button
            key={String(it)}
            onClick={() => onChange(it)}
            className={cn(
              'h-8 rounded-full border px-3 text-xs',
              value === it ? 'bg-black text-white' : 'hover:bg-black/5'
            )}
          >
            {String(it)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
