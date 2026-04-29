import { useDealType } from '@/features/filters/state/useFiltersUrl';
import { BreadcrumbChevronIcon } from '@/shared/icons';
import { t } from '@/lib/i18n';

export function Breadcrumbs() {
  const [dealType] = useDealType();
  const dealLabel = dealType === 1 ? t.filters.forRent : t.filters.forSale;

  return (
    <nav className="font-sans flex h-[16px] items-center gap-1 text-[12px] font-normal leading-[14px]">
      <a href="#" className="text-ink-600 hover:text-ink-900">
        {t.common.home}
      </a>
      <Chevron />
      <a href="#" className="text-ink-600 hover:text-ink-900">
        {t.common.search}
      </a>
      <Chevron />
      <span className="text-brand-orange">{dealLabel}</span>
    </nav>
  );
}

function Chevron() {
  return <BreadcrumbChevronIcon aria-hidden className="h-4 w-[11px] shrink-0 text-ink-600" />;
}
