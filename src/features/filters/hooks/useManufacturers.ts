import { useQuery } from '@tanstack/react-query';
import { getManufacturers } from '../api/getManufacturers';

export const useManufacturers = () =>
  useQuery({
    queryKey: ['manufacturers'],
    queryFn: getManufacturers,
    staleTime: 1000 * 60 * 30,
  });
