import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { CheckIcon } from '@/shared/icons';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { className, label, checked, ...rest },
  ref,
) {
  return (
    <label
      className={cn(
        'group inline-flex cursor-pointer select-none items-center gap-2.5 text-[14px] text-ink-900',
        className,
      )}
    >
      <span className="relative inline-flex h-[18px] w-[18px] items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          className="peer sr-only"
          {...rest}
        />
        <span
          className={cn(
            'h-[18px] w-[18px] rounded-[5px] border border-surface-border bg-white transition-colors',
            'peer-checked:border-brand-orange peer-checked:bg-brand-orange',
            'group-hover:border-ink-500 peer-checked:group-hover:border-brand-orange',
          )}
        />
        <CheckIcon
          className={cn(
            'pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity',
            checked && 'opacity-100',
          )}
        />
      </span>
      {label && <span className="truncate">{label}</span>}
    </label>
  );
});
