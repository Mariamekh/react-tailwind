const FLAT_FEES_GEL = {
  customs: 150,
  expert: 30,
  declaration: 50,
} as const;

const SERVICE_FEE_GEL = {
  car: 200,
  moto: 145,
} as const;

const DEFAULT_TRANSIT_FEE_GEL = 50;

const AGE_THRESHOLD = {
  HIGH_EXCISE: 6,
  ANTIQUE: 30,
} as const;

export type FuelType = 'gas' | 'electric' | 'hybrid' | 'diesel' | (string & {});
export type WheelType = 'left' | 'right';

export interface ClearanceInput {
  prodYear: number;
  engineVolume: number;
  fuelType?: FuelType;
  wheelType?: WheelType;
  transitFee?: number;
  isMoto?: boolean;
}

function calculateExcise({
  prodYear,
  engineVolume,
  fuelType = 'gas',
  wheelType = 'left',
}: ClearanceInput): number {
  const currentYear = new Date().getFullYear();
  const age = currentYear - prodYear;
  const isRight = wheelType === 'right';
  const isOld = age > AGE_THRESHOLD.HIGH_EXCISE;
  const cc = engineVolume;

  if (age > AGE_THRESHOLD.ANTIQUE) return isRight ? 3 * cc : cc;
  if (fuelType === 'electric') return isRight ? 3000 : 0;
  if (isRight) return cc * (isOld ? 13.5 : 4.5);
  if (fuelType === 'hybrid') return cc * (isOld ? 4.5 : 0.6);
  return cc * (isOld ? 4.5 : 1.5);
}

function calculateImport({
  prodYear,
  engineVolume,
  fuelType,
  wheelType,
  isMoto,
}: ClearanceInput): number {
  const isElectric = fuelType === 'electric';
  const isRight = wheelType === 'right';
  if (isMoto || (isElectric && !isRight)) return 0;

  const age = new Date().getFullYear() - prodYear;
  return Math.round(0.05 * engineVolume + engineVolume * age * 0.0025);
}

function fuelFromId(id: number | undefined): FuelType {
  if (id === 8) return 'electric';
  if (id === 7 || id === 11) return 'hybrid';
  return 'gas';
}

export function calculateClearanceFeeForProduct(product: {
  prod_year: number;
  engine_volume: number;
  fuel_type_id?: number;
  right_wheel?: boolean;
}): number {
  return calculateClearanceFee({
    prodYear: product.prod_year,
    engineVolume: product.engine_volume,
    fuelType: fuelFromId(product.fuel_type_id),
    wheelType: product.right_wheel ? 'right' : 'left',
  });
}

export function calculateClearanceFee(input: ClearanceInput): number {
  if (!input.engineVolume || !input.prodYear) return 0;

  const excise = Math.round(calculateExcise(input));
  const importFee = calculateImport(input);
  const serviceFee = input.isMoto ? SERVICE_FEE_GEL.moto : SERVICE_FEE_GEL.car;
  const transitFee = input.transitFee ?? DEFAULT_TRANSIT_FEE_GEL;

  return (
    excise +
    importFee +
    FLAT_FEES_GEL.customs +
    FLAT_FEES_GEL.expert +
    FLAT_FEES_GEL.declaration +
    serviceFee +
    transitFee
  );
}
