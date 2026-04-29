import { type CSSProperties, type ReactNode, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';
import { ChevronDownIcon } from '@/shared/icons';
import { useAnchorRect } from '@/shared/hooks/useAnchorRect';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useEscapeKey } from '@/shared/hooks/useEscapeKey';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode | ((ctx: { close: () => void }) => ReactNode);
  align?: 'left' | 'right';
  panelClassName?: string;
  triggerClassName?: string;
  chevronClassName?: string;
  label?: string;
  withChevron?: boolean;
  fullWidth?: boolean;
  matchTriggerWidth?: boolean;
}

export function Dropdown({
  trigger,
  children,
  align = 'left',
  panelClassName,
  triggerClassName,
  chevronClassName,
  withChevron,
  fullWidth,
  matchTriggerWidth,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const rect = useAnchorRect(triggerRef, open);
  useClickOutside([triggerRef, panelRef], close, open);
  useEscapeKey(close, open);

  const panelStyle: CSSProperties = rect
    ? {
        position: 'fixed',
        top: rect.bottom + 4,
        ...(align === 'right'
          ? { right: Math.max(0, window.innerWidth - rect.right) }
          : { left: rect.left }),
        ...(matchTriggerWidth ? { width: rect.width } : {}),
      }
    : {};

  return (
    <div className={cn('relative', fullWidth ? 'block w-full' : 'inline-block')}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex h-11 items-center gap-2 rounded-lg border border-surface-border bg-white px-3 text-[14px] text-ink-800',
          'transition-colors hover:border-ink-500',
          open && 'border-ink-500',
          triggerClassName,
        )}
      >
        <span>{trigger}</span>
        {withChevron !== false && (
          <ChevronDownIcon
            className={cn(
              'h-6 w-6 shrink-0 text-ink-800 transition-transform',
              open && 'rotate-180',
              chevronClassName,
            )}
          />
        )}
      </button>
      {open &&
        rect &&
        createPortal(
          <div
            ref={panelRef}
            style={panelStyle}
            className={cn(
              'z-50 rounded-xl border border-surface-border bg-white p-1 shadow-dropdown',
              panelClassName,
            )}
          >
            {typeof children === 'function' ? children({ close }) : children}
          </div>,
          document.body,
        )}
    </div>
  );
}
