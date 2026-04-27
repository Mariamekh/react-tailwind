import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}

export function IconBtn({ children, onClick, ariaLabel }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex h-4 w-4 items-center justify-center text-ink-500 transition-colors hover:text-ink-900"
    >
      {children}
    </button>
  );
}
