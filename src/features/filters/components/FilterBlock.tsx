import type { ReactNode } from 'react';

export function FilterBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-sailec text-[12px] font-medium leading-[12px] text-ink-800">{label}</div>
      {children}
    </div>
  );
}
