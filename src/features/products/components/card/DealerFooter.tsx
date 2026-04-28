import { ListIcon } from '@/shared/icons';
import { t } from '@/lib/i18n';

interface Props {
  name: string;
  listingCount: number | null;
}

export function DealerFooter({ name, listingCount }: Props) {
  return (
    <div className="-mx-4 mt-3 hidden flex-col gap-2 border-t border-surface-border px-4 pt-3 md:flex">
      <span className="truncate font-helvetica text-[12px] font-medium leading-[13px] text-ink-800">
        {name}
      </span>
      <span className="inline-flex items-center gap-2 font-helvetica text-[11px] font-normal leading-[13px] text-ink-600">
        <ListIcon className="h-3 w-3 text-ink-500" />
        {t.card.allListings}
        {typeof listingCount === 'number' ? ` (${listingCount})` : ''}
      </span>
    </div>
  );
}
