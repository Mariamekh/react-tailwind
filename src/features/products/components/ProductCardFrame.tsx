import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface Props extends HTMLAttributes<HTMLElement> {
  highlighted?: boolean;
  bordered?: 'default' | 'subtle' | false;
}

export const ProductCardFrame = forwardRef<HTMLElement, Props>(function ProductCardFrame(
  { highlighted, bordered, className, children, ...rest },
  ref,
) {
  return (
    <article
      ref={ref}
      className={cn(
        'min-h-[172px] w-full max-w-[780px] rounded-[14px] p-4 transition-colors',
        highlighted
          ? 'border border-success-150 bg-success-50'
          : bordered === 'subtle'
            ? 'border border-[#EEF2F7] bg-white'
            : bordered === 'default'
              ? 'border border-surface-border bg-white'
              : 'bg-white',
        className,
      )}
      {...rest}
    >
      {children}
    </article>
  );
});
