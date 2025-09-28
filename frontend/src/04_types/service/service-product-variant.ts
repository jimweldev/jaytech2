import type { ServiceProduct } from './service-product';

export type ServiceProductVariant = {
  id?: number;
  product_id?: number;
  sku?: string;
  price?: number;
  product?: ServiceProduct;
  created_at?: Date;
  updated_at?: Date;
};
