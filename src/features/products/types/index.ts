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
  views: number;
  status_id: number;
  has_turbo: boolean;
  for_rent: boolean;
  order_date: string;
  customs_passed: boolean;
  right_wheel?: boolean;
  location_id: number;
  location_name?: string;

  // Promotion / VIP
  paid_add: number;
  prom_color: number;
  is_payd: boolean;
  // 0=regular, 10=VIP, 15=VIP+, 20=S-VIP
  order_number: number;
  // Product of prime sticker IDs assigned to the listing
  stickers: number | null;

  // Condition / inspection drive the chip row
  tech_inspection: boolean;
  inspected_in_greenway: boolean;
  checked: boolean;
  checked_for_duplicates: boolean;

  // Seller (private listings)
  client_name?: string | null;
  client_phone?: string | null;
  user_id?: number;

  // 0 = private seller, 1 = dealer, 2 = autosaloon
  user_type: 0 | 1 | 2 | null;

  // Dealer (commercial listings)
  dealer_user_id: number;
  dealerId: number | null;
  dealer_title: string;
  has_logo: number | null;
  logo_ver: number | null;
  active_ads: number | null;
}

export type SortOrder = 1 | 2 | 3 | 4 | 5 | 6;

export type DealType = 0 | 1;

export interface ProductsQueryParams {
  TypeID?: 0 | 1 | 2;
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

export interface ProductsMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface ProductsResponse {
  status: number;
  data: {
    items: Product[];
    meta: ProductsMeta;
  };
}
