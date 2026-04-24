import { api } from '@/lib/api';
import type { CategoriesResponse, Category } from '../types';

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<CategoriesResponse>('/cats/get');
  return data?.data?.items ?? [];
}
