import { Button } from '@/shared/ui/Button';
import { useFiltersStore } from '../store/useFiltersStore';
import { useProducts } from '@/features/products/hooks/useProducts';
import { formatNumber } from '@/lib/format';
import { t } from '@/lib/i18n';

interface Props {
  onAfterApply?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SearchButton({ onAfterApply, size, className }: Props) {
  const applyDraft = useFiltersStore((s) => s.applyDraft);
  const { data, isFetching } = useProducts();
  const total = data?.meta.total ?? 0;

  return (
    <Button
      fullWidth
      size={size}
      onClick={() => {
        applyDraft();
        onAfterApply?.();
      }}
      disabled={isFetching}
      className={className}
    >
      {t.common.searchAction} {formatNumber(total)}
    </Button>
  );
}
