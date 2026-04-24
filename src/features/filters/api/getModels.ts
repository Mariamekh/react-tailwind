import { api } from '@/lib/api';
import type { CarModel, ModelsResponse } from '../types';

export async function getModels(manId: string | number): Promise<CarModel[]> {
  const { data } = await api.get<ModelsResponse>('/getManModels', {
    params: { man_id: manId },
  });
  return data?.data ?? [];
}
