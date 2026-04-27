import { cn } from '@/lib/cn';
import { CarIcon, MotoIcon, TractorIcon } from '@/shared/icons';
import { useFiltersStore } from '../store/useFiltersStore';
import type { VehicleType } from '../types';

const tabs: Array<{ value: VehicleType; Icon: typeof CarIcon }> = [
  { value: 'car', Icon: CarIcon },
  { value: 'tractor', Icon: TractorIcon },
  { value: 'moto', Icon: MotoIcon },
];

export function VehicleTypeTabs() {
  const vehicle = useFiltersStore((s) => s.draft.vehicle);
  const setVehicle = useFiltersStore((s) => s.setDraftVehicle);

  return (
    <div className="grid grid-cols-3 border-b border-surface-border">
      {tabs.map(({ value, Icon }, i) => {
        const active = vehicle === value;
        return (
          <button
            key={value}
            onClick={() => setVehicle(value)}
            aria-label={value}
            aria-pressed={active}
            className={cn(
              'relative flex items-center justify-center px-[11px] py-2 transition-colors',
              i > 0 && 'border-l border-surface-border',
              active
                ? 'bg-white text-brand-orange'
                : 'bg-[#F9F9FB] text-ink-500 hover:text-ink-600',
            )}
          >
            <Icon width={62} height={32} />
            {active && <span className="absolute -bottom-px left-0 right-0 h-px bg-brand-orange" />}
          </button>
        );
      })}
    </div>
  );
}
