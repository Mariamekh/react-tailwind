import { api } from '@/lib/api';

export interface Location {
  location_id: number;
  parent_id?: number;
  title: string;
  location_type?: number;
  is_in_country?: number;
}

export async function getLocations(): Promise<Location[]> {
  const response = await api.get<unknown>('/locs/get');
  const body = response.data;

  let list: unknown[] = [];
  if (Array.isArray(body)) {
    list = body;
  } else if (body && typeof body === 'object') {
    const asRecord = body as Record<string, unknown>;
    const data = asRecord.data;
    if (Array.isArray(data)) {
      list = data;
    } else if (data && typeof data === 'object') {
      const dataRecord = data as Record<string, unknown>;
      if (Array.isArray(dataRecord.items)) {
        list = dataRecord.items;
      } else {
        list = Object.values(dataRecord);
      }
    }
  }

  return list.filter(
    (l): l is Location => !!l && typeof l === 'object' && 'location_id' in l,
  );
}
