export interface Product {
  car_id: number;
  product_id?: number;
  pic_number?: number;
  man_id: number;
  model_id: number;
  category_id: number;
  prod_year: number;
  car_model: string;
  man_name?: string;
  model_name?: string;
  category_name?: string;
  engine_volume: number;
  fuel_type_id: number;
  fuel_type?: string;
  gear_type_id: number;
  gear_type?: string;
  drive_type_id: number;
  drive_type?: string;
  car_run_km: number;
  price: number;
  price_usd: number;
  price_value: number;
  currency_id: number;
  photo: string;
  photo_ver: number;
  pics_count: number;
  views: number;
  vip: number;
  status_id: number;
  has_turbo: number;
  for_rent: number;
  order_date: string;
  customs_passed: number;
  location_id: number;
  location_name?: string;
  client_name?: string | null;
}

export type SortOrder = 1 | 2 | 3 | 4 | 5 | 6;

export type DealType = 0 | 1;

export interface ProductsQueryParams {
  ForRent?: DealType;
  Mans?: string;
  Cats?: string;
  PriceFrom?: number;
  PriceTo?: number;
  Period?: string;
  SortOrder?: SortOrder;
  Page?: number;
  CurrencyID?: 1 | 2;
}

export interface ProductsResponse {
  status: number;
  data: {
    items: Product[];
    meta: {
      total: number;
      page: number;
      pages?: number;
    };
  };
}
