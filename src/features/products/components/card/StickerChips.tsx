import { cn } from '@/lib/cn';
import type { StickerInfo } from './stickers';

interface Props {
  chips: StickerInfo[];
  variant: 'mobile' | 'desktop';
  highlighted?: boolean;
}

export function StickerChips({ chips, variant, highlighted }: Props) {
  if (chips.length === 0) return null;

  if (variant === 'mobile') {
    return (
      <div className="-mx-4 mt-3 flex items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chips.map((info) => (
          <Chip key={info.label} info={info} background="bg-chip-blue" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        '-mx-4 -mb-4 mt-3 hidden flex-wrap items-center gap-2 rounded-b-[14px] px-4 py-[10px] md:flex',
        highlighted && 'border-t border-success-150',
      )}
    >
      {chips.map((info) => (
        <Chip key={info.label} info={info} background={highlighted ? 'bg-white' : 'bg-chip-gray'} />
      ))}
    </div>
  );
}

function Chip({ info, background }: { info: StickerInfo; background: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-[100px] pb-[6px] pl-[6px] pr-2 pt-[5px] font-sailec text-[12px] font-medium leading-[13px] tracking-normal text-ink-700',
        background,
      )}
    >
      <info.Icon className={cn('h-3.5 w-3.5', info.iconClass)} />
      {info.label}
    </span>
  );
}
