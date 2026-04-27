export { USA_LOC_ID, IN_TRANSIT_LOC_ID } from '@/features/filters/hooks/useLocations';

export const CUSTOMS_FEE_GEL = 2176;

export const VIP_THRESHOLD = {
  S_VIP: 20,
  VIP_PLUS: 15,
  VIP: 10,
} as const;

export const SPEC_FALLBACK = {
  category: 'სედანი',
  fuel: 'ბენზინი',
  driveSide: 'მარცხნივ',
  driveSideDesktop: 'მარცხენა',
  gear: 'ავტომატიკა',
} as const;

export const COPY = {
  views: 'ნახვა',
  customsPassed: 'განბაჟებული',
  customsDue: 'განბაჟება',
  steeringPrefix: 'საჭე',
  engineCapacityUnit: 'დატ.',
  georgia: 'საქართველო',
  usa: 'ა.შ.შ.',
  inTransit: 'გზაში',
  allListings: 'ყველა განცხადება',
} as const;
