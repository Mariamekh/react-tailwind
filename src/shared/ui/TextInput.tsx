import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-lg border border-surface-border bg-white px-3 text-[15px] text-ink',
        'placeholder:text-ink-muted focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20',
        'transition-colors',
        className,
      )}
      {...rest}
    />
  );
});
