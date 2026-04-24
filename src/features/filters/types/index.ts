export interface Manufacturer {
  man_id: string;
  man_name: string;
  is_car: string;
  is_moto: string;
  is_spec: string;
  sort_order: string;
  group_title?: string;
}

export interface ManufacturersResponse {
  [key: string]: Manufacturer | unknown;
}

export interface CarModel {
  model_id: number | string;
  model_name: string;
  man_id: number | string;
}

export interface ModelsResponse {
  status: number;
  data: CarModel[];
}

export interface Category {
  category_id: number;
  category_type: number;
  title: string;
  category_name?: string;
  has_icon?: number;
  vehicle_types?: number[];
}

export interface CategoriesResponse {
  status: number;
  data: {
    items: Category[];
  };
}

export type VehicleType = 'car' | 'tractor' | 'moto';

export type DealType = 0 | 1;

export type Period = '' | '1h' | '2h' | '3h' | '1d' | '2d' | '3d' | '1w' | '2w' | '3w';

export interface FiltersState {
  vehicle: VehicleType;
  dealType: DealType;
  manIds: string[];
  modelIds: string[];
  categoryIds: number[];
  priceFrom: string;
  priceTo: string;
  currency: 1 | 2;
  period: Period;
  sortOrder: 1 | 2 | 3 | 4 | 5 | 6;
  page: number;
}
