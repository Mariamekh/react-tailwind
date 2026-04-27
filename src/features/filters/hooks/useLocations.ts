export const USA_LOC_ID = 21;
export const IN_TRANSIT_LOC_ID = 23;

const GEORGIA_LOC_IDS = new Set<number>([
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 30, 31, 36, 37, 38, 39, 40, 41, 44, 47, 48,
  52, 53, 54, 55, 56, 57, 58, 59, 61, 62, 63, 64, 66, 71, 72, 74, 75, 76, 77, 78, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 91, 96, 97, 101, 109, 113, 116, 119, 122, 127, 131, 133, 137, 139, 143,
]);

export type LocationFlag = 'georgia' | 'usa' | null;

export function useLocationName(locId: number | string | undefined): {
  flag: LocationFlag;
  isInCountry: boolean;
} {
  if (locId == null) return { flag: null, isInCountry: false };
  const id = Number(locId);

  let flag: LocationFlag = null;
  if (id === USA_LOC_ID) flag = 'usa';
  else if (GEORGIA_LOC_IDS.has(id)) flag = 'georgia';

  return { flag, isInCountry: GEORGIA_LOC_IDS.has(id) };
}
