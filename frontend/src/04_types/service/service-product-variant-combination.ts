import type { ServiceProductVariant } from './service-product-variant';
import type { ServiceProductVariantValue } from './service-product-variant-value';

export type ServiceProductVariantCombination = {
  id?: number;
  service_product_variant_id?: number;
  service_product_variant_value_id?: number;
  service_product_variant?: ServiceProductVariant;
  service_product_variant_value?: ServiceProductVariantValue;
  created_at?: Date;
  updated_at?: Date;
};
