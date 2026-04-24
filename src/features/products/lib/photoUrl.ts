import { STATIC_BASE } from '@/lib/api';
import type { Product } from '../types';

export function getProductPhoto(product: Product, size: 'thumb' | 'large' = 'thumb'): string {
  const folder = size === 'large' ? 'large' : 'thumbs';
  return `${STATIC_BASE}/photos/${product.photo}/${folder}/${product.product_id}_1.jpg?v=${product.photo_ver}`;
}
