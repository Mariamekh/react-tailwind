import { GeorgiaFlag, USAFlag } from '@/shared/icons';
import type { LocationFlag } from '@/features/filters/hooks/useLocations';

interface Props {
  label: string;
  flag: LocationFlag;
  className?: string;
}

export function LocationLabel({ label, flag, className }: Props) {
  if (!label) return null;
  return (
    <span className={className}>
      {flag === 'georgia' && <GeorgiaFlag className="h-4 w-4 shrink-0" />}
      {flag === 'usa' && <USAFlag className="h-4 w-4 shrink-0" />}
      <span>{label}</span>
    </span>
  );
}
