import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';
import { ChevronDownIcon } from '@/shared/icons';

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
  const [rect, setRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const updateRect = useCallback(() => {
    if (triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    updateRect();
    const onScroll = () => updateRect();
    const onResize = () => updateRect();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, updateRect]);

  useEffect(() => {
    if (!open) return;
    const mouseHandler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', mouseHandler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', mouseHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [open]);

  const panelStyle: CSSProperties = rect
    ? {
        position: 'fixed',
        top: rect.bottom + 8,
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
          'hover:border-ink-500 transition-colors',
          open && 'border-ink-500',
          triggerClassName,
        )}
      >
        <span className="truncate">{trigger}</span>
        {withChevron !== false && (
          <ChevronDownIcon
            className={cn(
              'h-4 w-4 shrink-0 text-ink-800 transition-transform',
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
