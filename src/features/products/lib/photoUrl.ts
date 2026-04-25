import { STATIC_BASE } from '@/lib/api';
import type { Product } from '../types';

type RawProduct = Product & {
  pic?: string | number;
  pic_v?: number;
  pic_number?: number;
  photo_id?: string | number;
};

function getPhotoPath(product: Product): string {
  const p = product as RawProduct;
  const raw = product.photo ?? p.pic ?? p.photo_id;
  if (raw === undefined || raw === null) return '';
  return String(raw);
}

function getPhotoVersion(product: Product): string | number {
  const p = product as RawProduct;
  return product.photo_ver ?? p.pic_v ?? 1;
}

function getPicCount(product: Product): number {
  const p = product as RawProduct;
  return p.pic_number ?? product.pics_count ?? 0;
}

export function hasPhoto(product: Product): boolean {
  const path = getPhotoPath(product);
  if (path.length === 0 || path === '0') return false;
  return getPicCount(product) > 0;
}

export function getPhotoCount(product: Product): number {
  return getPicCount(product);
}

export function getProductPhoto(
  product: Product,
  opts: { size?: 'thumb' | 'large'; index?: number } = {},
): string {
  const { size = 'thumb', index = 1 } = opts;
  const folder = size === 'large' ? 'large' : 'thumbs';
  const path = getPhotoPath(product);
  const version = getPhotoVersion(product);
  const id = product.car_id ?? product.product_id;
  return `${STATIC_BASE}/photos/${path}/${folder}/${id}_${index}.jpg?v=${version}`;
}
