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
        'w-full max-w-[780px] px-4 pb-[14px] pt-4 transition-colors md:pb-4',
        highlighted
          ? 'overflow-hidden rounded-[16px] border border-success-200 bg-success-50 md:rounded-[14px]'
          : bordered === 'subtle'
            ? 'md:overflow-hidden md:rounded-[14px] md:border md:border-[#EEF2F7] md:bg-white'
            : bordered === 'default'
              ? 'md:overflow-hidden md:rounded-[14px] md:border md:border-surface-border md:bg-white'
              : 'md:overflow-hidden md:rounded-[14px] md:bg-white',
        className,
      )}
      {...rest}
    >
      {children}
    </article>
  );
});
