import { STATIC_BASE } from '@/lib/api';
import type { Product } from '../types';

export function hasPhoto(product: Product): boolean {
  const path = product.photo;
  if (!path || path === '0') return false;
  return getPhotoCount(product) > 0;
}

export function getPhotoCount(product: Product): number {
  return product.pic_number ?? 0;
}

export function getProductPhoto(
  product: Product,
  opts: { size?: 'thumb' | 'large'; index?: number } = {},
): string {
  const { size = 'thumb', index = 1 } = opts;
  const folder = size === 'large' ? 'large' : 'thumbs';
  const id = product.car_id ?? product.product_id;
  return `${STATIC_BASE}/photos/${product.photo}/${folder}/${id}_${index}.jpg?v=${product.photo_ver ?? 1}`;
}
