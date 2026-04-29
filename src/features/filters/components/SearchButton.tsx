import { Button } from '@/shared/ui/Button';
import { useFiltersDraft } from '../state/draftContext';
import { useFiltersUrl } from '../state/useFiltersUrl';
import { useProducts } from '@/features/products/hooks/useProducts';
import { formatNumber } from '@/lib/format';
import { t } from '@/lib/i18n';

interface Props {
  onAfterApply?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SearchButton({ onAfterApply, size, className }: Props) {
  const { draft } = useFiltersDraft();
  const [, setFilters] = useFiltersUrl();
  const { data, isFetching } = useProducts();
  const total = data?.meta.total ?? 0;

  const apply = () => {
    setFilters({
      vehicle: draft.vehicle,
      dealType: draft.dealType,
      mans: { manIds: draft.manIds, modelsByMan: draft.modelsByMan },
      cats: draft.categoryIds,
      priceFrom: draft.priceFrom,
      priceTo: draft.priceTo,
      currency: draft.currency,
      page: 1,
    });
    onAfterApply?.();
  };

  return (
    <Button
      fullWidth
      size={size}
      onClick={apply}
      disabled={isFetching}
      className={className}
    >
      {t.common.searchAction} {formatNumber(total)}
    </Button>
  );
}
