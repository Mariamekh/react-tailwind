import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface Props extends HTMLAttributes<HTMLElement> {
  highlighted?: boolean;
}

export const ProductCardFrame = forwardRef<HTMLElement, Props>(function ProductCardFrame(
  { highlighted, className, children, ...rest },
  ref,
) {
  return (
    <article
      ref={ref}
      className={cn(
        'rounded-[14px] border bg-white p-3 transition-colors md:p-4',
        highlighted
          ? 'border-success-150 bg-success-50'
          : 'border-surface-border',
        className,
      )}
      {...rest}
    >
      {children}
    </article>
  );
});
