import { EngineIcon, TransmissionIcon, MileageIcon, DriveWheelIcon } from '@/shared/icons';
import { formatMileage } from '@/lib/format';
import type { Product } from '../../types';
import { COPY, SPEC_FALLBACK } from './constants';
import { formatEngineLiters } from './helpers';

interface Props {
  product: Product;
}

export function SpecsGrid({ product }: Props) {
  return (
    <div className="grid h-[50px] grid-cols-2 gap-x-4 gap-y-[14px] font-sailec text-[12px] font-medium leading-[18px] text-ink-900 md:w-[396px] md:shrink-0">
      <SpecCell icon={<EngineIcon className="h-4 w-4 shrink-0 text-ink-500" />}>
        {formatEngineLiters(product.engine_volume)} {COPY.engineCapacityUnit}{' '}
        {product.fuel_type ?? SPEC_FALLBACK.fuel}
      </SpecCell>
      <SpecCell icon={<MileageIcon className="h-4 w-4 shrink-0 text-ink-500" />}>
        {formatMileage(product.car_run_km)}
      </SpecCell>
      <SpecCell icon={<TransmissionIcon className="h-4 w-4 shrink-0 text-ink-500" />}>
        {product.gear_type ?? SPEC_FALLBACK.gear}
      </SpecCell>
      <SpecCell icon={<DriveWheelIcon className="h-4 w-4 shrink-0 text-ink-500" />}>
        {product.drive_type ?? SPEC_FALLBACK.driveSideDesktop}
      </SpecCell>
    </div>
  );
}

function SpecCell({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3">
      {icon}
      <span>{children}</span>
    </div>
  );
}
